import { cookies } from "next/headers";
import { createHash } from "crypto";

const COOKIE_NAME = "emma_admin";
const SALT = "emma-nails-admin-2026";

function getExpectedToken(): string {
  const password = process.env.ADMIN_PASSWORD || "emma2026";
  return createHash("sha256").update(password + SALT).digest("hex");
}

export function generateAdminToken(): string {
  return getExpectedToken();
}

export function verifyAdminToken(token: string): boolean {
  return token === getExpectedToken();
}

export function isAdminAuthenticated(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return verifyAdminToken(token);
  } catch {
    return false;
  }
}

export function getAdminCookieName(): string {
  return COOKIE_NAME;
}
