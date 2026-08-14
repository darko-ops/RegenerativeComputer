import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "rc_admin";

/** Deterministic session token derived from the admin password. */
export function adminToken(secret: string) {
  return createHmac("sha256", secret)
    .update("regenerative-admin-v1")
    .digest("hex");
}

export function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export async function isAuthenticated() {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;

  const cookie = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!cookie) return false;

  return safeEqual(cookie, adminToken(secret));
}
