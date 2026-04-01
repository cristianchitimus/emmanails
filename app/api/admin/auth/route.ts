import { NextResponse } from "next/server";
import { generateAdminToken, getAdminCookieName } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const { password } = await req.json();
  const expected = process.env.ADMIN_PASSWORD || "emma2026";

  if (password !== expected) {
    return NextResponse.json({ error: "Parolă incorectă" }, { status: 401 });
  }

  const token = generateAdminToken();
  const res = NextResponse.json({ success: true });
  res.cookies.set(getAdminCookieName(), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(getAdminCookieName());
  return res;
}
