import { NextResponse } from "next/server";
import { isAdmin, unauthorized } from "@/lib/admin-auth";
import { registrationsToCsv } from "@/lib/registration-csv";
import { getAllRegistrations } from "@/lib/submissions";

/** Event registrations only; contact messages are never included. */
export async function GET() {
  if (!(await isAdmin())) return unauthorized();
  try {
    const csv = registrationsToCsv(await getAllRegistrations());
    const date = new Date().toISOString().slice(0, 10);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="lighthouse-registrations-${date}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Could not export registrations. Check Supabase configuration." }, { status: 503 });
  }
}
