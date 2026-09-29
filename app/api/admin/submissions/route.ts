import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSubmissions } from "@/lib/submissions";

export async function GET() {
  const password = process.env.ADMIN_PASSWORD;
  const session = (await cookies()).get("lighthouse_admin")?.value;
  if (!password || !session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const expected = Buffer.from(createHmac("sha256", password).update(`lighthouse-admin:${password}`).digest("hex"));
  const actual = Buffer.from(session);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json({ submissions: await getSubmissions() });
  } catch {
    return NextResponse.json({ error: "Could not load submissions. Check Supabase configuration." }, { status: 503 });
  }
}
