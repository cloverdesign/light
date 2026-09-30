import { NextResponse } from "next/server";
import { isAdmin, unauthorized } from "@/lib/admin-auth";
import { describeAttendee, type CheckInResult } from "@/lib/check-in";
import { igniteEvent } from "@/lib/events";
import { checkInTicket, getCheckInStats } from "@/lib/submissions";
import { normaliseTicketCode } from "@/lib/tickets";

export async function GET() {
  if (!(await isAdmin())) return unauthorized();
  try {
    return NextResponse.json(await getCheckInStats(igniteEvent.id));
  } catch {
    return NextResponse.json({ error: "Could not load check-in totals." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return unauthorized();
  const body = await request.json().catch(() => ({}));
  const ticketCode = normaliseTicketCode(body.code);
  if (!ticketCode) return NextResponse.json({ status: "invalid", ticketCode: String(body.code ?? "").slice(0, 40) } satisfies CheckInResult);
  try {
    const result = await checkInTicket(ticketCode, igniteEvent.id);
    const payload: CheckInResult = result.status === "not_found"
      ? { status: "not_found", ticketCode }
      : { status: result.status, ...describeAttendee(result.registration) };
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ error: "Could not check this ticket. Check your connection and try again." }, { status: 503 });
  }
}
