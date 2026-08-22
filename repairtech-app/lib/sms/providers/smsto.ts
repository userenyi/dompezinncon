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

export async function sendWithSmsTo(
  input: SendSmsInput
): Promise<ProviderSendResult> {
  const apiKey = getRequiredEnv("SMSTO_API_KEY");
  const senderId = getRequiredEnv("SMS_SENDER_ID");

  const response = await fetch("https://api.sms.to/sms/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      message: input.message,
      to: input.to,
      sender_id: senderId,
    }),
    cache: "no-store",
  });

  const raw = await response.text();

  let data: unknown = raw;

  try {
    data = JSON.parse(raw);
  } catch {
    // SMS.to may return non-JSON content for some errors.
  }

  if (!response.ok) {
    return {
      accepted: false,
      status: "FAILED",
      error: `SMS.to HTTP ${response.status}: ${raw.slice(0, 1000)}`,
    };
  }

  let providerMessageId: string | undefined;

  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;

    const candidate =
      record.id ??
      record.message_id ??
      record.messageId ??
      record.sms_id ??
      record.smsId;

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
