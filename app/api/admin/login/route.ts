import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken as token } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredPassword) return NextResponse.json({ error: "Admin access is not configured." }, { status: 503 });
  const body = await request.json().catch(() => ({}));
  const candidate = typeof body.password === "string" ? body.password : "";
  const expected = Buffer.from(token(configuredPassword));
  const actual = Buffer.from(token(candidate));
  if (!timingSafeEqual(expected, actual)) return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token(configuredPassword), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 60 * 60 * 12,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(ADMIN_COOKIE);
  return response;
}
