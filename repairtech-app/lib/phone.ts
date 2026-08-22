export function normalizePhoneNumber(phone: string): string {
  const value = String(phone ?? "").trim();

  if (!value) {
    throw new Error("Phone number is required.");
  }

  // Keep digits only.
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    throw new Error("Phone number contains no digits.");
  }

  // Equatorial Guinea country code: +240.
  if (digits.startsWith("240")) {
    return `+${digits}`;
  }

  // Local Equatorial Guinea mobile numbers.
  if (digits.length == 9) {
    return `+240${digits}`;
  }

  throw new Error("Invalid Equatorial Guinea phone number.");
}
