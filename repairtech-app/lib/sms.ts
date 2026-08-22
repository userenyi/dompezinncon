import { pool } from "./db";
import { normalizePhoneNumber } from "./phone";
import { sendWithSendSMSGate } from "./sms/providers/sendmsgate";
import { sendWithSmsTo } from "./sms/providers/smsto";

export type SmsEvent = "BOOKING_CREATED" | "REPAIR_READY";

type SendSmsInput = {
  to: string;
  message: string;
  event: SmsEvent;
  repairId: string;
};

function getProvider(): string {
  return process.env.SMS_PROVIDER || "sendmsgate";
}

export async function sendSMS(input: SendSmsInput) {
  const provider = getProvider();
  const phone = normalizePhoneNumber(input.to);

  /*
   * Database-level idempotency:
   *
   * If this repair/event already has an SMS record, do not send
   * another SMS.
   */
  const existing = await pool.query(
    `
      SELECT
        id,
        status,
        provider_message_id AS "providerMessageId"
      FROM sms_notifications
      WHERE repair_id = $1
        AND event = $2
      LIMIT 1
    `,
    [input.repairId, input.event]
  );

  if (existing.rows.length > 0) {
    return {
      sent: false,
      duplicate: true,
      status: existing.rows[0].status,
      providerMessageId: existing.rows[0].providerMessageId,
    };
  }

  const inserted = await pool.query(
    `
      INSERT INTO sms_notifications (
        repair_id,
        event,
        phone,
        provider,
        status
      )
      VALUES ($1, $2, $3, $4, 'PENDING')
      ON CONFLICT (repair_id, event) DO NOTHING
      RETURNING id
    `,
    [input.repairId, input.event, phone, provider]
  );

  if (inserted.rows.length === 0) {
    return {
      sent: false,
      duplicate: true,
    };
  }

  const notificationId = inserted.rows[0].id;

  try {
    let result;

    switch (provider) {
      case "sendmsgate":
        result = await sendWithSendSMSGate({
          to: phone,
          message: input.message,
        });
        break;

      case "smsto":
        result = await sendWithSmsTo({
          to: phone,
          message: input.message,
        });
        break;

      default:
        throw new Error(`Unsupported SMS provider: ${provider}`);
    }

    await pool.query(
      `
        UPDATE sms_notifications
        SET
          status = $1,
          provider_message_id = $2,
          error = $3,
          updated_at = NOW()
        WHERE id = $4
      `,
      [
        result.status,
        result.providerMessageId ?? null,
        result.error ?? null,
        notificationId,
      ]
    );

    return {
      sent: result.accepted,
      duplicate: false,
      status: result.status,
      providerMessageId: result.providerMessageId,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);

    console.error("SMS provider error:", {
      provider,
      event: input.event,
      repairId: input.repairId,
      error: errorMessage,
    });

    await pool.query(
      `
        UPDATE sms_notifications
        SET
          status = 'FAILED',
          error = $1,
          updated_at = NOW()
        WHERE id = $2
      `,
      [errorMessage, notificationId]
    );

    return {
      sent: false,
      duplicate: false,
      status: "FAILED" as const,
      error: errorMessage,
    };
  }
}

export function buildRepairSmsMessage(
  event: SmsEvent,
  repairId: string
): string {
  switch (event) {
    case "BOOKING_CREATED":
      return `DOMPEZ INNCON: Your repair booking #${repairId} has been registered successfully. We will notify you when it is ready for collection.`;

    case "REPAIR_READY":
      return `DOMPEZ INNCON: Your repair #${repairId} is complete and ready for collection. Thank you for choosing DOMPEZ INNCON.`;
  }
}
