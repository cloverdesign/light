import { NextResponse } from "next/server";
import { isAdmin, unauthorized } from "@/lib/admin-auth";
import { getRegistration, getUnsentRegistrations } from "@/lib/submissions";
import { deliverTicket, ticketEmailConfigured } from "@/lib/tickets";

export const maxDuration = 60;

// Resend allows a few requests per second; stay comfortably under it.
const SEND_GAP_MS = 600;
const BATCH_SIZE = 10;
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * { id } emails one registration its ticket (a resend if it was already sent).
 * { unsent: true, exclude?: string[] } emails the next batch of unsent tickets; the
 * dashboard calls it repeatedly until `remaining` is 0, passing back ids that failed.
 */
export async function POST(request: Request) {
  if (!(await isAdmin())) return unauthorized();
  if (!ticketEmailConfigured()) return NextResponse.json({ error: "Ticket email isn’t set up yet. Add RESEND_API_KEY and TICKET_EMAIL_FROM, then try again." }, { status: 503 });
  const body = await request.json().catch(() => ({}));
  try {
    if (typeof body.id === "string") {
      const registration = await getRegistration(body.id);
      if (!registration) return NextResponse.json({ error: "Registration not found." }, { status: 404 });
      if (!registration.data.email) return NextResponse.json({ error: "This registration has no email address." }, { status: 400 });
      const ticketCode = await deliverTicket(registration, { resend: Boolean(registration.ticket_emailed_at) });
      return NextResponse.json({ ok: true, ticketCode });
    }
    if (body.unsent === true) {
      const exclude = Array.isArray(body.exclude) ? body.exclude.filter((id: unknown) => typeof id === "string" && /^[0-9a-f-]{36}$/.test(id)).slice(0, 500) : [];
      const { rows, remaining } = await getUnsentRegistrations(BATCH_SIZE, exclude);
      const failed: string[] = [];
      for (const [index, registration] of rows.entries()) {
        if (index) await wait(SEND_GAP_MS);
        await deliverTicket(registration).catch((error) => {
          console.error("Ticket email failed", registration.id, error);
          failed.push(registration.id);
        });
      }
      return NextResponse.json({ sent: rows.length - failed.length, failed, remaining });
    }
    return NextResponse.json({ error: "Nothing to send." }, { status: 400 });
  } catch (error) {
    console.error("Ticket send failed", error);
    return NextResponse.json({ error: "We couldn’t send the ticket. Please try again." }, { status: 502 });
  }
}
