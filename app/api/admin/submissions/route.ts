import { NextResponse } from "next/server";
import { isAdmin, unauthorized } from "@/lib/admin-auth";
import { getSubmissions } from "@/lib/submissions";

export async function GET() {
  if (!(await isAdmin())) return unauthorized();
  try {
    return NextResponse.json({ submissions: await getSubmissions() });
  } catch {
    return NextResponse.json({ error: "Could not load submissions. Check Supabase configuration." }, { status: 503 });
  }
}
