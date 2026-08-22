import { createHmac, timingSafeEqual } from "crypto";

export const STAFF_COOKIE_NAME = "dompez_staff_session";

function getSecret() {
  const secret = process.env.STAFF_SESSION_SECRET;

  if (!secret) {
    throw new Error("STAFF_SESSION_SECRET is not configured.");
  }

  return secret;
}

export function getStaffToken() {
  return createHmac("sha256", getSecret())
    .update("dompez-staff-authenticated")
    .digest("hex");
}

export function isValidStaffToken(token: string | undefined) {
  if (!token) return false;

  const expected = getStaffToken();

  const receivedBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expected);

  if (receivedBuffer.length != expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(receivedBuffer, expectedBuffer);
}
