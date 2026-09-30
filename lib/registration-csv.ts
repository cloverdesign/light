import { igniteEvent, institutionOther, institutions } from "@/lib/events";
import type { NewSubmission, Submission } from "@/lib/submissions";
import { createTicketCode, normaliseTicketCode } from "@/lib/tickets";

/** Registration fields kept in `data`, in export order. Headers double as the import format. */
const dataColumns = [
  ["ticketCode", "Ticket code"], ["fullName", "Full name"], ["email", "Email address"], ["phone", "Phone number"],
  ["ageGroup", "Age group"], ["isStudent", "Student"],
  ["institution", "Institution of learning"], ["otherInstitution", "Institution (other)"], ["area", "Area / suburb"],
  ["needsTransport", "Transport needed"], ["firstTimer", "First time"], ["hasPrayerRequest", "Prayer request"],
  ["prayerRequest", "Prayer request details"], ["source", "Source"], ["eventName", "Event"],
  // Earlier versions of the form asked these; kept so older registrations export in full.
  ["campus", "Campus / university"], ["lighthouseCampus", "Lighthouse campus"], ["otherCampus", "Campus (not listed)"],
] as const;
const timeColumns = [
  ["created_at", "Registered at"], ["ticket_emailed_at", "Ticket emailed at"], ["checked_in_at", "Checked in at"],
] as const;
const yesNoFields = new Set(["isStudent", "needsTransport", "firstTimer", "hasPrayerRequest"]);

export const MAX_IMPORT_ROWS = 5000;

// Spreadsheet apps run cells starting with these as formulas; prefix them so exported data stays inert.
const formulaStart = /^[=+\-@\t\r]/;

function csvCell(value: unknown) {
  let text = value == null ? "" : String(value);
  if (formulaStart.test(text)) text = `'${text}`;
  return /[",\r\n;]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function registrationsToCsv(rows: Submission[]) {
  const header = [...dataColumns, ...timeColumns].map(([, label]) => label);
  const lines = rows.map((row) => [
    ...dataColumns.map(([key]) => row.data[key]),
    ...timeColumns.map(([key]) => row[key]),
  ].map(csvCell).join(","));
  // The BOM makes Excel read the file as UTF-8, so names with accents survive.
  return `﻿${[header.join(","), ...lines].join("\r\n")}\r\n`;
}

/** RFC 4180 parser. Detects comma, semicolon (Excel in some locales) or tab delimiters. */
export function parseCsv(input: string): string[][] {
  const text = input.replace(/^﻿/, "");
  const firstLine = text.slice(0, text.search(/\r?\n|$/));
  const delimiter = [",", ";", "\t"].sort((a, b) => firstLine.split(b).length - firstLine.split(a).length)[0];
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (char === '"') quoted = false;
      else cell += char;
    } else if (char === '"' && cell === "") quoted = true;
    else if (char === delimiter) { row.push(cell); cell = ""; }
    else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += char;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((cells) => cells.some((value) => value.trim()));
}

const normaliseHeader = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
const headerLookup = new Map<string, string>(
  [...dataColumns, ...timeColumns].flatMap(([key, label]) => [[normaliseHeader(label), key], [normaliseHeader(key), key]]),
);

function clean(value: string, max = 500) {
  const text = value.trim();
  return (text.startsWith("'") && formulaStart.test(text.slice(1)) ? text.slice(1) : text).slice(0, max);
}

function yesNo(value: string) {
  const lower = value.toLowerCase();
  return ["yes", "y", "true"].includes(lower) ? "Yes" : ["no", "n", "false"].includes(lower) ? "No" : value;
}

function isoOrUndefined(value: string) {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date.toISOString() : undefined;
}

export type ImportPlan = {
  rows: NewSubmission[];
  duplicates: number;
  invalid: { row: number; reason: string }[];
  ignoredColumns: string[];
};

/**
 * Turns a CSV (in the export format, or any sheet with matching headers) into
 * registrations for the current event. Skips rows whose ticket code, or whose
 * name with email (or phone), already exists, including repeats within the file.
 */
export function planImport(csv: string, existing: Submission[]): ImportPlan {
  const [header = [], ...records] = parseCsv(csv);
  const keys = header.map((label) => headerLookup.get(normaliseHeader(label)));
  const ignoredColumns = header.filter((label, index) => label.trim() && !keys[index]);
  if (!keys.includes("fullName")) throw new Error("The file needs a “Full name” column. Export registrations first to see the expected columns.");
  if (records.length > MAX_IMPORT_ROWS) throw new Error(`Import up to ${MAX_IMPORT_ROWS} registrations at a time.`);

  // The same person: same name plus the same email, or the same phone when there's no email.
  const identity = (data: Record<string, unknown>) => {
    const contact = String(data.email || "").trim().toLowerCase() || String(data.phone || "").replace(/[^\d+]/g, "");
    return contact ? `${String(data.fullName || "").trim().toLowerCase()}|${contact}` : "";
  };
  const seenCodes = new Set(existing.map((row) => String(row.data.ticketCode || "")).filter(Boolean));
  const seenPeople = new Set(existing.map((row) => identity(row.data)).filter(Boolean));
  const plan: ImportPlan = { rows: [], duplicates: 0, invalid: [], ignoredColumns };
  const importedAt = new Date().toISOString();

  records.forEach((cells, index) => {
    const rowNumber = index + 2;
    const values: Record<string, string> = {};
    keys.forEach((key, column) => { if (key) values[key] = clean(cells[column] ?? "", key === "prayerRequest" ? 3000 : 254); });

    const data: Record<string, string> = { eventId: igniteEvent.id, eventName: igniteEvent.title, source: values.source || "Import" };
    for (const [key] of dataColumns) {
      if (key === "eventName" || key === "source" || !values[key]) continue;
      data[key] = yesNoFields.has(key) ? yesNo(values[key]) : values[key];
    }
    if (!data.fullName) return plan.invalid.push({ row: rowNumber, reason: "Missing full name" });
    if (!data.email && !data.phone) return plan.invalid.push({ row: rowNumber, reason: "Needs an email address or phone number" });
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) return plan.invalid.push({ row: rowNumber, reason: `“${data.email}” isn’t a valid email address` });

    if (data.institution) {
      const listed = institutions.find((name) => name.toLowerCase() === data.institution.toLowerCase());
      if (listed) data.institution = listed;
      else if (data.institution.toLowerCase() !== institutionOther.toLowerCase()) {
        data.otherInstitution ||= data.institution;
        data.institution = institutionOther;
      } else data.institution = institutionOther;
    }

    const suppliedCode = normaliseTicketCode(values.ticketCode);
    const person = identity(data);
    if ((suppliedCode && seenCodes.has(suppliedCode)) || seenPeople.has(person)) { plan.duplicates++; return; }
    let ticketCode = suppliedCode;
    while (!ticketCode || seenCodes.has(ticketCode)) ticketCode = createTicketCode();
    data.ticketCode = ticketCode;
    seenCodes.add(ticketCode);
    seenPeople.add(person);

    plan.rows.push({
      type: "event_registration",
      data,
      // Every row carries every key: PostgREST bulk inserts require matching keys.
      created_at: isoOrUndefined(values.created_at) ?? importedAt,
      ticket_emailed_at: isoOrUndefined(values.ticket_emailed_at) ?? null,
      checked_in_at: isoOrUndefined(values.checked_in_at) ?? null,
    });
  });
  return plan;
}
