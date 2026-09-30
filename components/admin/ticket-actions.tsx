"use client";

import { useState } from "react";
import { MailCheck, Send, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Submission } from "@/lib/submissions";

const formatTime = (value: string) => new Date(value).toLocaleString(undefined, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export function ticketStatus(item: Submission) {
  if (item.checked_in_at) return { label: "Checked in", tone: "text-aero-900 bg-aero-100" };
  if (item.ticket_emailed_at) return { label: "Ticket sent", tone: "text-deep-blue-500 bg-deep-blue-100/60" };
  return { label: item.data.email ? "Ticket not sent" : "No email", tone: "text-orange-900 bg-orange-100" };
}

export const isUnsent = (item: Submission) =>
  item.type === "event_registration" && !item.ticket_emailed_at && !item.checked_in_at && Boolean(item.data.email);

async function post(body: object) {
  const response = await fetch("/api/admin/tickets", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "We couldn’t send the ticket. Please try again.");
  return result;
}

export function TicketDetails({ item, onChange }: { item: Submission; onChange: () => void }) {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);
  const code = String(item.data.ticketCode || "");
  const email = String(item.data.email || "");

  async function send() {
    setSending(true);
    setMessage(null);
    try {
      await post({ id: item.id });
      setMessage({ text: `Ticket sent to ${email}.` });
      onChange();
    } catch (err) {
      setMessage({ text: err instanceof Error ? err.message : "We couldn’t send the ticket.", error: true });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-lg bg-background/70 px-4 py-3">
      <div className="flex items-center gap-2">
        <Ticket aria-hidden="true" className="size-4 text-deep-blue-400" />
        <span className="font-mono text-sm font-semibold tracking-wider">{code || "No ticket code yet"}</span>
      </div>
      <p className="text-xs leading-5 text-deep-blue-400">
        {item.checked_in_at ? `Checked in ${formatTime(item.checked_in_at)}` : "Not checked in"}
        {" · "}
        {item.ticket_emailed_at ? `Emailed ${formatTime(item.ticket_emailed_at)}` : "Ticket not emailed"}
      </p>
      {email && (
        <Button variant="outline" size="xs" className="gap-2 px-3 sm:ml-auto" disabled={sending} onClick={() => void send()}>
          <Send aria-hidden="true" className="size-3.5" />{sending ? "Sending…" : item.ticket_emailed_at ? "Resend ticket" : "Send ticket"}
        </Button>
      )}
      {message && <p role={message.error ? "alert" : "status"} className={`basis-full text-xs ${message.error ? "text-orange-900" : "text-aero-900"}`}>{message.text}</p>}
    </div>
  );
}

export function UnsentTicketsBanner({ count, onChange }: { count: number; onChange: () => void }) {
  const [progress, setProgress] = useState<{ sent: number; running: boolean } | null>(null);
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);

  async function sendAll() {
    setMessage(null);
    const failed: string[] = [];
    let sent = 0;
    setProgress({ sent, running: true });
    try {
      for (;;) {
        const result = await post({ unsent: true, exclude: failed });
        sent += result.sent;
        failed.push(...result.failed);
        setProgress({ sent, running: true });
        if (!result.remaining || (!result.sent && result.failed.length === 0)) break;
      }
      setMessage(failed.length
        ? { text: `Sent ${sent} ticket${sent === 1 ? "" : "s"}. ${failed.length} couldn’t be sent — check the email addresses and try again.`, error: true }
        : { text: `Sent ${sent} ticket${sent === 1 ? "" : "s"}.` });
    } catch (err) {
      setMessage({ text: `${sent ? `Sent ${sent} before stopping. ` : ""}${err instanceof Error ? err.message : "Sending stopped."}`, error: true });
    } finally {
      setProgress(null);
      onChange();
    }
  }

  if (!count && !message) return null;
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-orange-200 bg-orange-100/50 px-5 py-4">
      <MailCheck aria-hidden="true" className="size-5 shrink-0 text-orange-800" />
      <p className="min-w-0 flex-1 text-sm leading-6 text-deep-blue-600">
        {progress ? `Sending tickets… ${progress.sent} sent so far.`
          : count ? `${count} registration${count === 1 ? " hasn’t" : "s haven’t"} received a ticket email yet.`
          : message?.text}
      </p>
      {count > 0 && <Button variant="outline" size="xs" className="gap-2 bg-white px-3" disabled={Boolean(progress)} onClick={() => void sendAll()}>
        <Send aria-hidden="true" className="size-3.5" />{progress ? "Sending…" : "Send all tickets"}
      </Button>}
      {message && count > 0 && !progress && <p role={message.error ? "alert" : "status"} className={`basis-full text-xs ${message.error ? "text-orange-900" : "text-aero-900"}`}>{message.text}</p>}
      <p role="status" className="sr-only">{progress ? `${progress.sent} tickets sent` : ""}</p>
    </div>
  );
}
