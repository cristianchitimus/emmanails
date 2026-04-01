import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE = "emma_admin";
const SALT = "emma-nails-admin-2026";

async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── Admin routes protection ────────────────────
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const password = process.env.ADMIN_PASSWORD || "emma2026";
    const expected = await sha256(password + SALT);

    if (!token || token !== expected) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // ─── Admin API protection ───────────────────────
  if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth") && !pathname.startsWith("/api/admin/seed")) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const password = process.env.ADMIN_PASSWORD || "emma2026";
    const expected = await sha256(password + SALT);

    if (!token || token !== expected) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // ─── Client account routes protection ───────────
  if (pathname.startsWith("/cont") && !pathname.startsWith("/cont/autentificare") && !pathname.startsWith("/cont/inregistrare")) {
    const sessionToken = request.cookies.get("next-auth.session-token")?.value
      || request.cookies.get("__Secure-next-auth.session-token")?.value;
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/cont/autentificare", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/cont", "/cont/comenzi/:path*"],
};
