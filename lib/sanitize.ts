export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";
  
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export function validateRequiredString(
  value: unknown,
  maxLength: number = 1000
): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error("Value is required and must be a non-empty string");
  }
  if (value.length > maxLength) {
    throw new Error(`Value exceeds maximum length of ${maxLength}`);
  }
  return value.trim();
}
