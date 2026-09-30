import type { Submission } from "@/lib/submissions";

export type CheckInResult =
  | { status: "valid" | "already_checked_in"; ticketCode: string; name: string; campus: string; checkedInAt: string }
  | { status: "not_found" | "invalid"; ticketCode: string };

export function describeAttendee(registration: Submission) {
  const { data } = registration;
  return {
    ticketCode: String(data.ticketCode || ""),
    name: String(data.fullName || data.name || "Guest"),
    campus: String(data.otherCampus || data.lighthouseCampus || ""),
    checkedInAt: registration.checked_in_at ?? "",
  };
}
