"use client";

import { type ChangeEvent, useRef, useState } from "react";
import { Download, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Summary = {
  toImport: number;
  duplicates: number;
  invalid: { row: number; reason: string }[];
  invalidCount: number;
  ignoredColumns: string[];
  imported?: number;
  error?: string;
};

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`;

async function sendImport(csv: string, dryRun: boolean): Promise<Summary> {
  const response = await fetch("/api/admin/registrations/import", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ csv, dryRun }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok && result.imported === undefined) throw new Error(result.error || "We couldn’t import that file.");
  return result;
}

/** Export and import for event registrations. Contact messages are never exported or created here. */
export function RegistrationTransfer({ onImported }: { onImported: () => void }) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<{ name: string; csv: string } | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function reset() {
    setFile(null);
    setSummary(null);
    setError("");
    if (fileInput.current) fileInput.current.value = "";
  }

  async function choose(event: ChangeEvent<HTMLInputElement>) {
    const chosen = event.target.files?.[0];
    if (!chosen) return;
    reset();
    setBusy(true);
    try {
      const csv = await chosen.text();
      setFile({ name: chosen.name, csv });
      setSummary(await sendImport(csv, true));
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn’t read that file.");
    } finally {
      setBusy(false);
    }
  }

  async function confirm() {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const result = await sendImport(file.csv, false);
      setSummary(result);
      if (result.error) setError(result.error);
      onImported();
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn’t import that file.");
    } finally {
      setBusy(false);
    }
  }

  const done = summary?.imported !== undefined;

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button asChild variant="outline" size="xs" className="gap-2 px-3">
          <a href="/api/admin/registrations/export" download><Download aria-hidden="true" className="size-3.5" />Export registrations</a>
        </Button>
        <Button variant="outline" size="xs" className="gap-2 px-3" disabled={busy} onClick={() => fileInput.current?.click()}>
          <Upload aria-hidden="true" className="size-3.5" />{busy && !summary ? "Reading…" : "Import registrations"}
        </Button>
        <input ref={fileInput} type="file" accept=".csv,text/csv" className="sr-only" tabIndex={-1} aria-hidden="true" onChange={(event) => void choose(event)} />
      </div>

      {(summary || error) && (
        <section aria-label="Import registrations" className="basis-full rounded-xl border border-deep-blue-600/10 bg-white p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-lg">{done ? "Import complete" : "Review import"}</h3>
              {file && <p className="mt-0.5 truncate text-xs text-deep-blue-400">{file.name}</p>}
            </div>
            <Button variant="ghost" size="xs" className="p-1.5 text-deep-blue-400 hover:bg-aero-100" aria-label="Close import" onClick={reset}><X className="size-4" /></Button>
          </div>
          {summary && (
            <ul role="status" className="mt-4 grid gap-1.5 text-sm leading-6">
              <li>{done ? `${plural(summary.imported ?? 0, "registration")} added.` : summary.toImport ? `${plural(summary.toImport, "new registration")} will be added.` : "There are no new registrations in this file."}</li>
              {summary.duplicates > 0 && <li className="text-deep-blue-400">{plural(summary.duplicates, "row")} skipped: already registered.</li>}
              {summary.invalidCount > 0 && <li className="text-orange-900">{plural(summary.invalidCount, "row")} skipped: missing details.</li>}
              {summary.ignoredColumns.length > 0 && <li className="text-deep-blue-400">Columns not imported: {summary.ignoredColumns.join(", ")}.</li>}
              {!done && summary.toImport > 0 && <li className="text-deep-blue-400">They’ll join this event. Anyone without a ticket email can be sent one with <strong className="font-medium">Send all tickets</strong>.</li>}
            </ul>
          )}
          {summary && summary.invalid.length > 0 && (
            <details className="mt-3 text-xs text-deep-blue-400">
              <summary className="cursor-pointer">Show skipped rows</summary>
              <ul className="mt-2 grid gap-1">
                {summary.invalid.map((item) => <li key={item.row}>Row {item.row}: {item.reason}</li>)}
                {summary.invalidCount > summary.invalid.length && <li>…and {summary.invalidCount - summary.invalid.length} more.</li>}
              </ul>
            </details>
          )}
          {error && <p role="alert" className="mt-4 rounded-lg bg-orange-100 px-4 py-3 text-sm leading-6 text-orange-900">{error}</p>}
          <div className="mt-5 flex flex-wrap gap-2">
            {!done && summary && summary.toImport > 0 && (
              <Button size="xs" variant="secondary" className="px-4 py-2.5" disabled={busy} onClick={() => void confirm()}>
                {busy ? "Importing…" : `Import ${plural(summary.toImport, "registration")}`}
              </Button>
            )}
            <Button size="xs" variant="outline" className="px-4" onClick={reset}>{done ? "Done" : "Cancel"}</Button>
          </div>
        </section>
      )}
    </>
  );
}
