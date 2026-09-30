import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const ADMIN_COOKIE = "lighthouse_admin";

export function adminToken(password: string) {
  return createHmac("sha256", process.env.ADMIN_PASSWORD || "").update(`lighthouse-admin:${password}`).digest("hex");
}

export async function isAdmin() {
  const password = process.env.ADMIN_PASSWORD;
  const session = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!password || !session) return false;
  const expected = Buffer.from(adminToken(password));
  const actual = Buffer.from(session);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });
