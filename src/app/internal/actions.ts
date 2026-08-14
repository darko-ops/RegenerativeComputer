"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, adminToken, safeEqual } from "@/lib/auth";

export type LoginState = { error?: string };

export async function logIn(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    return { error: "ADMIN_PASSWORD is not configured for this deployment." };
  }

  const supplied = String(formData.get("password") ?? "");
  if (!supplied || !safeEqual(supplied, secret)) {
    return { error: "Incorrect password." };
  }

  (await cookies()).set(ADMIN_COOKIE, adminToken(secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  revalidatePath("/internal");
  return {};
}

export async function logOut() {
  (await cookies()).delete(ADMIN_COOKIE);
  revalidatePath("/internal");
}
