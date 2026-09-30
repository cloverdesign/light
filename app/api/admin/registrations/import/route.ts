import { NextResponse } from "next/server";
import { isAdmin, unauthorized } from "@/lib/admin-auth";
import { planImport } from "@/lib/registration-csv";
import { getAllRegistrations, insertSubmissions } from "@/lib/submissions";

const MAX_BYTES = 5 * 1024 * 1024;
const CHUNK = 500;

/**
 * { csv, dryRun: true } reports what an import would do; { csv } performs it.
 * Rows always become event registrations, so an import can't touch contact messages.
 */
export async function POST(request: Request) {
  if (!(await isAdmin())) return unauthorized();
  const body = await request.json().catch(() => ({}));
  if (typeof body.csv !== "string" || !body.csv.trim()) return NextResponse.json({ error: "Choose a CSV file to import." }, { status: 400 });
  if (body.csv.length > MAX_BYTES) return NextResponse.json({ error: "That file is too large. Import up to 5 MB at a time." }, { status: 413 });
  let plan;
  try {
    plan = planImport(body.csv, await getAllRegistrations());
  } catch (error) {
    const message = error instanceof Error && !error.message.startsWith("Submission storage") ? error.message : "Could not read existing registrations.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
  const summary = { toImport: plan.rows.length, duplicates: plan.duplicates, invalid: plan.invalid.slice(0, 50), invalidCount: plan.invalid.length, ignoredColumns: plan.ignoredColumns };
  if (body.dryRun) return NextResponse.json(summary);
  let imported = 0;
  try {
    for (let start = 0; start < plan.rows.length; start += CHUNK) {
      await insertSubmissions(plan.rows.slice(start, start + CHUNK));
      imported += Math.min(CHUNK, plan.rows.length - start);
    }
  } catch {
    return NextResponse.json({ ...summary, imported, error: `Import stopped after ${imported} registrations. Import the same file again to add the rest; rows already added will be skipped.` }, { status: 503 });
  }
  return NextResponse.json({ ...summary, imported });
}
