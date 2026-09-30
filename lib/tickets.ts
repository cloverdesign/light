import { randomBytes } from "node:crypto";
import QRCode from "qrcode";
import { igniteEvent } from "@/lib/events";
import { markTicketEmailed, updateSubmission, type Submission } from "@/lib/submissions";

const resendKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.TICKET_EMAIL_FROM;

export const ticketEmailConfigured = () => Boolean(resendKey && fromAddress);

export function createTicketCode() {
  const hex = randomBytes(4).toString("hex").toUpperCase();
  return `TKT-${hex.slice(0, 4)}-${hex.slice(4)}`;
}

/** Accepts a scanned or typed code ("tkt 50e1 e8c3", "50E1E8C3") and returns it as TKT-XXXX-XXXX, or "" if it isn't one. */
export function normaliseTicketCode(value: unknown) {
  const hex = typeof value === "string" ? value.toUpperCase().replace(/^\s*TKT/, "").replace(/[\s-]/g, "") : "";
  return /^[0-9A-F]{8}$/.test(hex) ? `TKT-${hex.slice(0, 4)}-${hex.slice(4)}` : "";
}

const escape = (value: string) => value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

function ticketHtml(fullName: string, ticketCode: string) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${igniteEvent.venue}, ${igniteEvent.location}`)}`;
  const row = (label: string, value: string) => `<tr><td style="padding:6px 16px 6px 0;font-weight:600;vertical-align:top">${label}:</td><td style="padding:6px 0">${value}</td></tr>`;
  return `<!doctype html>
<html><body style="margin:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;color:#1f2937">
  <div style="max-width:560px;margin:0 auto;padding:24px 16px">
    <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;padding:28px 24px">
      <h1 style="margin:0 0 20px;font-size:22px">${escape(igniteEvent.title)}</h1>
      <p style="margin:0 0 12px;font-size:15px">Hello <strong>${escape(fullName)}</strong>,</p>
      <p style="margin:0 0 20px;font-size:15px;line-height:1.5">Your registration is confirmed. Please find your event entry pass attached to this email.</p>
      <div style="background:#f1f4f8;border-radius:8px;padding:20px;text-align:center">
        <p style="margin:0 0 6px;font-size:13px;letter-spacing:0.05em;color:#6b7280">TICKET CODE</p>
        <p style="margin:0 0 16px;font-family:'Courier New',monospace;font-size:28px;font-weight:700;letter-spacing:0.12em">${ticketCode}</p>
        <img src="cid:ticket-qr" width="200" height="200" alt="QR code for ticket ${ticketCode}" style="display:block;margin:0 auto 12px;border:0" />
        <p style="margin:0;font-size:13px;font-weight:600;color:#6b7280">Present this QR code at the entrance.</p>
      </div>
      <table role="presentation" style="margin-top:20px;font-size:15px;border-collapse:collapse">
        ${row("Date", escape(igniteEvent.date))}
        ${row("Time", escape(igniteEvent.time))}
        ${row("Venue", `<a href="${mapsUrl}" style="color:#2563eb">${escape(`${igniteEvent.venue}, ${igniteEvent.location}`)}</a>`)}
      </table>
      <hr style="margin:24px 0 16px;border:0;border-top:1px solid #e5e7eb" />
      <p style="margin:0;font-size:13px;color:#6b7280">${escape(igniteEvent.organiser)} · @${escape(igniteEvent.socialHandle)}</p>
    </div>
  </div>
</body></html>`;
}

export async function sendTicketEmail({ email, fullName, ticketCode }: { email: string; fullName: string; ticketCode: string }, { resend = false } = {}) {
  if (!resendKey || !fromAddress) throw new Error("Ticket email is not configured");
  const qr = await QRCode.toBuffer(ticketCode, { type: "png", width: 400, margin: 2, errorCorrectionLevel: "M" });
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
      // Guards against double-sends on registration; an admin resend is deliberate, so it skips the key.
      ...(resend ? {} : { "Idempotency-Key": `ticket-${ticketCode}` }),
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [email],
      subject: `Your ${igniteEvent.title} ticket – ${ticketCode}`,
      html: ticketHtml(fullName, ticketCode),
      text: `Hello ${fullName},\n\nYour registration for ${igniteEvent.title} is confirmed.\n\nTicket code: ${ticketCode}\nPresent the attached QR code at the entrance.\n\nDate: ${igniteEvent.date}\nTime: ${igniteEvent.time}\nVenue: ${igniteEvent.venue}, ${igniteEvent.location}`,
      attachments: [{ filename: `${ticketCode}.png`, content: qr.toString("base64"), content_id: "ticket-qr" }],
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Unable to send ticket email (${response.status})`);
}

/** Emails a registration its ticket, assigning a ticket code first for registrations made before tickets existed. */
export async function deliverTicket(registration: Submission, { resend = false } = {}) {
  const email = String(registration.data.email || "");
  if (!email) throw new Error("Registration has no email address");
  let ticketCode = String(registration.data.ticketCode || "");
  if (!ticketCode) {
    ticketCode = createTicketCode();
    await updateSubmission(registration.id, { data: { ...registration.data, ticketCode } });
  }
  await sendTicketEmail({ email, fullName: String(registration.data.fullName || ""), ticketCode }, { resend });
  await markTicketEmailed(ticketCode);
  return ticketCode;
}
