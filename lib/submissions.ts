export type SubmissionType = "contact" | "event_registration";

export type Submission = {
  id: string;
  type: SubmissionType;
  data: Record<string, string | boolean>;
  created_at: string;
};

const supabaseUrl = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

export async function saveSubmission(type: SubmissionType, data: Record<string, string | boolean>) {
  if (!supabaseUrl || !secretKey) throw new Error("Submission storage is not configured");
  const response = await fetch(`${supabaseUrl}/rest/v1/form_submissions`, {
    method: "POST",
    headers: {
      apikey: secretKey,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ type, data }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Unable to save submission");
}

export async function getSubmissions(): Promise<Submission[]> {
  if (!supabaseUrl || !secretKey) throw new Error("Submission storage is not configured");
  const response = await fetch(`${supabaseUrl}/rest/v1/form_submissions?select=id,type,data,created_at&order=created_at.desc&limit=500`, {
    headers: { apikey: secretKey },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Unable to load submissions");
  return response.json();
}
