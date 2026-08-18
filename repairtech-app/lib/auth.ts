import { createHmac, timingSafeEqual } from "crypto";

export const COOKIE_NAME = "dompez_admin_session";

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured.");
  }

  return secret;
}

export function getAdminToken() {
  return createHmac("sha256", getSecret())
    .update("dompez-admin-authenticated")
    .digest("hex");
}

export function isValidAdminToken(token: string | undefined) {
  if (!token) return false;

  const expected = getAdminToken();

  const receivedBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expected);

  if (receivedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(receivedBuffer, expectedBuffer);
}
