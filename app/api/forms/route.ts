import { NextResponse } from "next/server";
import { markTicketEmailed, saveSubmission, type SubmissionType } from "@/lib/submissions";
import { createTicketCode, sendTicketEmail } from "@/lib/tickets";
import { campusNotListed, igniteEvent, lighthouseCampuses, registrationAgeGroups } from "@/lib/events";

const text = (value: unknown, max = 500) => typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const type: SubmissionType = body.type;
    if (type === "contact") {
      const data = {
        name: text(body.name, 120), email: text(body.email, 254), phone: text(body.phone, 40),
        reason: text(body.reason, 80), message: text(body.message, 3000),
      };
      if (!data.name || !data.email || !data.message || !/^\S+@\S+\.\S+$/.test(data.email)) {
        return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
      }
      await saveSubmission(type, data);
    } else if (type === "event_registration") {
      const studentChoice = text(body.isStudent, 20);
      const prayerChoice = text(body.hasPrayerRequest, 20);
      const isStudent = studentChoice === "Yes";
      const hasPrayerRequest = prayerChoice === "Yes";
      const lighthouseCampus = text(body.lighthouseCampus, 80);
      const campusUnlisted = lighthouseCampus === campusNotListed;
      const data = {
        eventId: igniteEvent.id,
        eventName: igniteEvent.title,
        ticketCode: createTicketCode(),
        fullName: text(body.fullName, 120), email: text(body.email, 254), phone: text(body.phone, 40),
        ageGroup: text(body.ageGroup, 40), isStudent: studentChoice,
        campus: isStudent ? text(body.campus, 160) : "",
        lighthouseCampus, otherCampus: campusUnlisted ? text(body.otherCampus, 160) : "",
        area: text(body.area, 160),
        needsTransport: text(body.needsTransport, 20), firstTimer: text(body.firstTimer, 20),
        hasPrayerRequest: prayerChoice,
        prayerRequest: hasPrayerRequest ? text(body.prayerRequest, 3000) : "",
      };
      if (!data.fullName || !data.email || !/^\S+@\S+\.\S+$/.test(data.email) || !data.phone || !registrationAgeGroups.some((group) => group === data.ageGroup) || !data.area || !["Yes", "No"].includes(data.isStudent) || !["Yes", "No"].includes(data.needsTransport) || !["Yes", "No"].includes(data.firstTimer) || !["Yes", "No"].includes(data.hasPrayerRequest) || (isStudent && !data.campus) || (!campusUnlisted && !lighthouseCampuses.some((name) => name === lighthouseCampus)) || (campusUnlisted && !data.otherCampus) || (hasPrayerRequest && !data.prayerRequest)) {
        return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
      }
      await saveSubmission(type, data);
      const emailSent = await sendTicketEmail(data).then(() => true, (error) => {
        console.error("Ticket email failed", data.ticketCode, error);
        return false;
      });
      if (emailSent) await markTicketEmailed(data.ticketCode).catch((error) => console.error("Could not record ticket email", data.ticketCode, error));
      return NextResponse.json({ ok: true, ticketCode: data.ticketCode, emailSent });
    } else {
      return NextResponse.json({ error: "Unknown form." }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "We could not send your response. Please try again." }, { status: 500 });
  }
}
