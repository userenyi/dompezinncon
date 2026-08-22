import { STAFF_COOKIE_NAME } from "./staff-auth";

async function createExpectedToken() {
  const secret = process.env.STAFF_SESSION_SECRET;

  if (!secret) {
    return null;
  }

  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode("dompez-staff-authenticated")
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function isValidStaffEdgeToken(token: string | undefined) {
  if (!token) return false;

  const expected = await createExpectedToken();

  if (!expected || token.length !== expected.length) {
    return false;
  }

  let result = 0;

  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }

  return result === 0;
}

export { STAFF_COOKIE_NAME };
