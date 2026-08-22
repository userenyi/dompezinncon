export type ProviderSendResult = {
  accepted: boolean;
  providerMessageId?: string;
  status: "SENT" | "FAILED";
  error?: string;
};

type SendSmsInput = {
  to: string;
  message: string;
};

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

export async function sendWithSendSMSGate(
  input: SendSmsInput
): Promise<ProviderSendResult> {
  const endpoint = getRequiredEnv("SENDSMS_GATE_API_URL");
  const username = getRequiredEnv("SENDSMS_GATE_USERNAME");
  const password = getRequiredEnv("SENDSMS_GATE_PASSWORD");
  const senderId = getRequiredEnv("SMS_SENDER_ID");

  /*
   * Keep the SendSMSGate-specific HTTP implementation isolated here.
   *
   * The endpoint and credentials are configuration-driven.
   *
   * The exact request fields should be confirmed against the
   * SendSMSGate API documentation/account before production use.
   */
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      from: senderId,
      to: input.to,
      text: input.message,
    }),
    cache: "no-store",
  });

  const raw = await response.text();

  if (!response.ok) {
    return {
      accepted: false,
      status: "FAILED",
      error: `SendSMSGate HTTP ${response.status}: ${raw.slice(0, 1000)}`,
    };
  }

  let data: unknown = raw;

  try {
    data = JSON.parse(raw);
  } catch {
    // Some SMS gateways return plain text.
  }

  let providerMessageId: string | undefined;

  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;

    const candidate =
      record.id ??
      record.messageId ??
      record.message_id ??
      record.smsId ??
      record.sms_id;

    if (candidate !== undefined && candidate !== null) {
      providerMessageId = String(candidate);
    }
  }

  return {
    accepted: true,
    status: "SENT",
    providerMessageId,
  };
}
