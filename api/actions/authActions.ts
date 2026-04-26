"use server";

import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "vitem2025";
const SESSION_COOKIE = "vitem_admin_session";
const SESSION_VALUE = "authenticated";

export async function loginAdmin(password: string): Promise<{ success: boolean; error?: string }> {
  if (password !== ADMIN_PASSWORD) {
    return { success: false, error: "Unauthorized" };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return { success: true };
}

export async function logoutAdmin(): Promise<{ success: boolean }> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return { success: true };
}
