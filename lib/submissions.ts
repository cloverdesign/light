export type SubmissionType = "contact" | "event_registration";

export type SubmissionData = Record<string, string | boolean>;

export type Submission = {
  id: string;
  type: SubmissionType;
  data: SubmissionData;
  created_at: string;
  ticket_emailed_at: string | null;
  checked_in_at: string | null;
};

export type NewSubmission = {
  type: SubmissionType;
  data: SubmissionData;
  created_at?: string;
  ticket_emailed_at?: string | null;
  checked_in_at?: string | null;
};

const supabaseUrl = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;
const columns = "id,type,data,created_at,ticket_emailed_at,checked_in_at";

async function rest(query: string | URLSearchParams, init: RequestInit = {}) {
  if (!supabaseUrl || !secretKey) throw new Error("Submission storage is not configured");
  const response = await fetch(`${supabaseUrl}/rest/v1/form_submissions?${query}`, {
    ...init,
    headers: { apikey: secretKey, "Content-Type": "application/json", ...init.headers },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Submission storage request failed (${response.status})`);
  return response;
}

const registrationQuery = (filters: Record<string, string> = {}) =>
  new URLSearchParams({ select: columns, type: "eq.event_registration", ...filters });

export async function saveSubmission(type: SubmissionType, data: SubmissionData) {
  await insertSubmissions([{ type, data }]);
}

export async function insertSubmissions(rows: NewSubmission[]) {
  if (!rows.length) return;
  await rest("", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify(rows) });
}

export async function getSubmissions(): Promise<Submission[]> {
  const response = await rest(`select=${columns}&order=created_at.desc&limit=500`);
  return response.json();
}

/** Every registration, oldest first, paged past PostgREST's row limit. */
export async function getAllRegistrations(): Promise<Submission[]> {
  const all: Submission[] = [];
  const pageSize = 1000;
  for (let offset = 0; ; offset += pageSize) {
    const query = registrationQuery({ order: "created_at.asc", limit: String(pageSize), offset: String(offset) });
    const page: Submission[] = await (await rest(query)).json();
    all.push(...page);
    if (page.length < pageSize) return all;
  }
}

export async function getRegistration(id: string): Promise<Submission | null> {
  const [row] = await (await rest(registrationQuery({ id: `eq.${id}` }))).json();
  return row ?? null;
}

export async function findRegistrationByTicket(ticketCode: string, eventId: string): Promise<Submission | null> {
  const query = registrationQuery({ "data->>ticketCode": `eq.${ticketCode}`, "data->>eventId": `eq.${eventId}` });
  const [row] = await (await rest(query)).json();
  return row ?? null;
}

/** Registrations with an email address whose ticket has not been emailed and who have not checked in yet. */
export async function getUnsentRegistrations(limit: number, excludeIds: string[] = []): Promise<{ rows: Submission[]; remaining: number }> {
  const query = registrationQuery({
    ticket_emailed_at: "is.null", checked_in_at: "is.null", "data->>email": "neq.",
    order: "created_at.asc", limit: String(limit),
  });
  if (excludeIds.length) query.set("id", `not.in.(${excludeIds.join(",")})`);
  const response = await rest(query, { headers: { Prefer: "count=exact" } });
  const total = Number(response.headers.get("content-range")?.split("/")[1] ?? 0);
  const rows: Submission[] = await response.json();
  return { rows, remaining: Math.max(0, total - rows.length) };
}

export async function updateSubmission(id: string, patch: Partial<Pick<Submission, "data" | "ticket_emailed_at" | "checked_in_at">>) {
  await rest(`id=eq.${encodeURIComponent(id)}`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify(patch) });
}

export async function markTicketEmailed(ticketCode: string) {
  const query = new URLSearchParams({ type: "eq.event_registration", "data->>ticketCode": `eq.${ticketCode}` });
  await rest(query, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ ticket_emailed_at: new Date().toISOString() }) });
}

/**
 * Checks a ticket in with a single conditional update, so two gates scanning the
 * same ticket at once cannot both admit it.
 */
export async function checkInTicket(ticketCode: string, eventId: string): Promise<{ status: "valid" | "already_checked_in"; registration: Submission } | { status: "not_found" }> {
  const query = registrationQuery({ "data->>ticketCode": `eq.${ticketCode}`, "data->>eventId": `eq.${eventId}`, checked_in_at: "is.null" });
  const response = await rest(query, { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify({ checked_in_at: new Date().toISOString() }) });
  const [updated]: Submission[] = await response.json();
  if (updated) return { status: "valid", registration: updated };
  const existing = await findRegistrationByTicket(ticketCode, eventId);
  return existing ? { status: "already_checked_in", registration: existing } : { status: "not_found" };
}

async function count(filters: Record<string, string>) {
  const query = new URLSearchParams({ select: "id", type: "eq.event_registration", limit: "1", ...filters });
  const response = await rest(query, { headers: { Prefer: "count=exact" } });
  return Number(response.headers.get("content-range")?.split("/")[1] ?? 0);
}

export async function getCheckInStats(eventId: string) {
  const [registered, checkedIn] = await Promise.all([
    count({ "data->>eventId": `eq.${eventId}` }),
    count({ "data->>eventId": `eq.${eventId}`, checked_in_at: "not.is.null" }),
  ]);
  return { registered, checkedIn };
}
