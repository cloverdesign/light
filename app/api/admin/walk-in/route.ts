import { NextResponse } from "next/server";
import { isAdmin, unauthorized } from "@/lib/admin-auth";
import type { CheckInResult } from "@/lib/check-in";
import { igniteEvent, institutionOther, institutions } from "@/lib/events";
import { insertSubmissions } from "@/lib/submissions";
import { createTicketCode } from "@/lib/tickets";

const text = (value: unknown, max = 500) => typeof value === "string" ? value.trim().slice(0, max) : "";

/** Registers someone at the gate and checks them in straight away. */
export async function POST(request: Request) {
  if (!(await isAdmin())) return unauthorized();
  const body = await request.json().catch(() => ({}));
  const institution = text(body.institution, 120);
  const institutionUnlisted = institution === institutionOther;
  const data = {
    eventId: igniteEvent.id,
    eventName: igniteEvent.title,
    ticketCode: createTicketCode(),
    fullName: text(body.fullName, 120), email: text(body.email, 254), phone: text(body.phone, 40),
    isStudent: institution ? "Yes" : "",
    institution, otherInstitution: institutionUnlisted ? text(body.otherInstitution, 160) : "",
    source: "Walk-in",
  };
  if (!data.fullName || !data.phone || (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) || (institution && !institutionUnlisted && !institutions.some((name) => name === institution)) || (institutionUnlisted && !data.otherInstitution)) {
    return NextResponse.json({ error: "Please add a name and phone number." }, { status: 400 });
  }
  const checkedInAt = new Date().toISOString();
  try {
    await insertSubmissions([{ type: "event_registration", data, checked_in_at: checkedInAt }]);
  } catch {
    return NextResponse.json({ error: "We couldn’t save this walk-in. Check your connection and try again." }, { status: 503 });
  }
  return NextResponse.json({
    status: "valid", ticketCode: data.ticketCode, name: data.fullName, campus: data.otherInstitution || data.institution, checkedInAt,
  } satisfies CheckInResult);
}
