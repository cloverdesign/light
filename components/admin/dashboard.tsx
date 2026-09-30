"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CalendarDays, FileText, LayoutDashboard,
  LogOut, Mail, MessageSquare, Phone, RefreshCw, ScanLine, Search,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import type { Submission } from "@/lib/submissions";
import { RegistrationTransfer } from "@/components/admin/registration-transfer";
import { isUnsent, TicketDetails, ticketStatus, UnsentTicketsBanner } from "@/components/admin/ticket-actions";

type Filter = "all" | "contact" | "event_registration";
type View = "overview" | "submissions";

const PAGE_SIZE = 8;
const fieldLabels: Record<string, string> = {
  eventName: "Event", eventId: "Event ID", ticketCode: "Ticket code",
  name: "Full name", fullName: "Full name", email: "Email address", phone: "Phone number",
  reason: "Message type", message: "Message", ageGroup: "Age group", isStudent: "Student",
  campus: "Campus / university", lighthouseCampus: "Lighthouse campus", otherCampus: "Campus (not listed)", area: "Area / suburb", needsTransport: "Transport needed",
  firstTimer: "First time", hasPrayerRequest: "Prayer request", prayerRequest: "Prayer request details", source: "Source",
};

type DashboardProps = {
  submissions: Submission[];
  loading: boolean;
  error: string;
  onRefresh: () => void;
  onSignOut: () => Promise<void>;
};

export default function Dashboard({ submissions, loading, error, onRefresh, onSignOut }: DashboardProps) {
  const [view, setView] = useState<View>("overview");
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");
  const counts = useMemo(() => ({
    all: submissions.length,
    contact: submissions.filter((item) => item.type === "contact").length,
    event_registration: submissions.filter((item) => item.type === "event_registration").length,
  }), [submissions]);
  const unsentCount = useMemo(() => submissions.filter(isUnsent).length, [submissions]);
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return submissions.filter((item) =>
      (filter === "all" || item.type === filter) &&
      (!search || Object.values(item.data).some((value) => String(value).toLowerCase().includes(search))),
    );
  }, [submissions, query, filter]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);
  const hasFilters = query.trim() !== "" || filter !== "all";

  function selectFilter(value: Filter) {
    setFilter(value);
    setPage(1);
  }

  async function signOut() {
    setSigningOut(true);
    setSignOutError("");
    try { await onSignOut(); }
    catch { setSignOutError("We couldn’t sign you out. Please try again."); }
    finally { setSigningOut(false); }
  }

  return (
    <div className="mx-auto grid min-h-[calc(100svh-88px)] max-w-7xl lg:grid-cols-[208px_minmax(0,1fr)]">
      <aside className="border-b border-deep-blue-600/10 px-6 py-4 lg:border-r lg:border-b-0 lg:py-8 lg:pl-10 lg:pr-5">
        <div className="flex items-center justify-between gap-3 lg:sticky lg:top-28 lg:min-h-[calc(100svh-144px)] lg:flex-col lg:items-stretch">
          <nav aria-label="Workspace navigation" className="flex gap-1 lg:flex-col lg:gap-2">
            {[
              { value: "overview" as const, label: "Overview", Icon: LayoutDashboard },
              { value: "submissions" as const, label: "Submissions", Icon: FileText },
            ].map(({ value, label, Icon }) => (
              <Button key={value} variant={view === value ? "secondary" : "ghost"} size="xs"
                className={`justify-start gap-2 px-3 py-2.5 text-xs sm:text-sm ${view !== value ? "text-deep-blue-400 hover:bg-aero-100" : ""}`}
                aria-pressed={view === value} onClick={() => { setView(value); selectFilter("all"); setQuery(""); }}>
                <Icon aria-hidden="true" className="size-4 shrink-0" />{label}
              </Button>
            ))}
            <Button asChild variant="ghost" size="xs" className="justify-start gap-2 px-3 py-2.5 text-xs text-deep-blue-400 hover:bg-aero-100 sm:text-sm">
              <Link href="/admin/scanner"><ScanLine aria-hidden="true" className="size-4 shrink-0" />Gate scanner</Link>
            </Button>
          </nav>
          <div>
            <Button variant="ghost" size="xs" className="gap-2 px-3 py-2.5 text-deep-blue-400 hover:bg-aero-100 lg:w-full lg:justify-start" disabled={signingOut} onClick={() => void signOut()}>
              <LogOut aria-hidden="true" className="size-4" /><span className="hidden sm:inline">{signingOut ? "Signing out…" : "Sign out"}</span><span className="sr-only sm:hidden">Sign out</span>
            </Button>
            {signOutError && <p role="alert" className="mt-2 max-w-40 text-xs text-orange-900">{signOutError}</p>}
          </div>
        </div>
      </aside>

      <main className="min-w-0 px-6 py-8 md:px-10 lg:py-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl leading-tight sm:text-5xl">{view === "overview" ? "Overview" : "Submissions"}</h1>
            <p className="mt-2 text-sm leading-6 text-deep-blue-400">{view === "overview" ? "Your Lighthouse website at a glance." : "Every response, in one place."}</p>
          </div>
          <Button variant="outline" size="xs" className="gap-2 px-3 py-2.5" onClick={onRefresh} disabled={loading}>
            <RefreshCw aria-hidden="true" className={`size-4 ${loading ? "animate-spin motion-reduce:animate-none" : ""}`} />
            <span className="hidden sm:inline">{loading ? "Refreshing…" : "Refresh"}</span><span className="sr-only sm:hidden">Refresh submissions</span>
          </Button>
        </div>

        {view === "overview" && (
          <section aria-label="Submission overview" className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { value: "all" as const, label: "Total submissions", Icon: FileText, colour: "text-yellow-900 bg-yellow-100" },
              { value: "contact" as const, label: "Contact messages", Icon: MessageSquare, colour: "text-aero-900 bg-aero-100" },
              { value: "event_registration" as const, label: "Event registrations", Icon: CalendarDays, colour: "text-orange-900 bg-orange-100" },
            ].map(({ value, label, Icon, colour }) => (
              <div key={value} className="rounded-xl border border-deep-blue-600/10 bg-white p-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium leading-5 text-deep-blue-400">{label}</p>
                  <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${colour}`}><Icon aria-hidden="true" className="size-4" /></span>
                </div>
                <p className="mt-3 text-4xl font-medium tracking-tight tabular-nums">{counts[value]}</p>
                <Button variant="link" size="xs" className="mt-3 gap-1.5 px-0 text-xs text-deep-blue-400 hover:text-deep-blue-600" onClick={() => { setView("submissions"); selectFilter(value); setQuery(""); }}>
                  View submissions <ArrowRight aria-hidden="true" className="size-3.5" />
                </Button>
              </div>
            ))}
          </section>
        )}

        <section aria-labelledby="submissions-title" className="mt-9">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 id="submissions-title" className="text-2xl">{view === "overview" ? "Latest submissions" : "All responses"}</h2>
              <p className="mt-1 text-xs leading-5 text-deep-blue-400">Select a response to view its details.</p>
            </div>
            <Input aria-label="Search submissions" icon="search" placeholder="Search name, email or response…" value={query}
              onChange={(event) => { setQuery(event.target.value); setPage(1); }}
              className="w-full py-3 text-sm focus-within:border-aero-500 sm:w-72" />
          </div>

          <div role="group" aria-label="Filter submissions" className="mb-4 flex flex-wrap gap-2">
            {[
              { value: "all" as const, label: "All" },
              { value: "contact" as const, label: "Contact" },
              { value: "event_registration" as const, label: "Registrations" },
            ].map(({ value, label }) => (
              <Button key={value} size="xs" variant={filter === value ? "secondary" : "ghost"}
                className="gap-2 px-3 py-2 text-xs hover:bg-aero-100" aria-pressed={filter === value} onClick={() => selectFilter(value)}>
                {label}<span className="font-normal text-deep-blue-400 tabular-nums">{counts[value]}</span>
              </Button>
            ))}
          </div>

          {filter !== "contact" && <div className="mb-4 flex flex-wrap gap-3"><RegistrationTransfer onImported={onRefresh} /></div>}
          {filter !== "contact" && <UnsentTicketsBanner count={unsentCount} onChange={onRefresh} />}

          {error && <p role="alert" className="mb-4 rounded-lg bg-orange-100 px-4 py-3 text-sm text-orange-900">{error}</p>}

          <div className="overflow-hidden rounded-xl border border-deep-blue-600/10 bg-white" aria-busy={loading}>
            <div aria-hidden="true" className="hidden grid-cols-[minmax(0,1fr)_150px_108px_20px] gap-4 border-b border-deep-blue-600/10 bg-background/60 px-5 py-3 text-xs font-medium text-deep-blue-400 md:grid">
              <span>Name</span><span>Form</span><span>Received</span><span />
            </div>
            <Accordion type="single" collapsible>
              {visible.map((item) => {
                const name = String(item.data.name || item.data.fullName || "Website submission");
                const email = String(item.data.email || "");
                const phone = String(item.data.phone || "");
                const isContact = item.type === "contact";
                const details = Object.entries(item.data).filter(([key, value]) => value !== "" && !["name", "fullName", "eventId", "ticketCode"].includes(key));
                const status = isContact ? null : ticketStatus(item);
                return (
                  <AccordionItem key={item.id} value={item.id} className="border-b border-deep-blue-600/10 last:border-b-0">
                    <AccordionTrigger className="gap-4 border-0 px-5 py-5 font-body normal-case hover:bg-aero-100/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-aero-600 lg:px-5 [&>svg]:size-4 [&>svg]:rotate-90 [&[data-state=open]>svg]:rotate-180">
                      <span className="grid min-w-0 flex-1 items-center gap-x-4 gap-y-2 md:grid-cols-[minmax(0,1fr)_150px_108px]">
                        <span className="flex min-w-0 items-center gap-3">
                          <span aria-hidden="true" className={`flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${isContact ? "bg-aero-100 text-aero-900" : "bg-yellow-100 text-yellow-900"}`}>{name.split(/\s+/).slice(0, 2).map((word) => word[0]).join("")}</span>
                          <span className="min-w-0"><span className="block truncate text-sm font-semibold">{name}</span><span className="mt-0.5 block truncate text-xs font-normal text-deep-blue-400">{email || phone || "No contact details"}</span></span>
                        </span>
                        <span className="flex flex-wrap items-center gap-2 pl-12 text-xs font-normal text-deep-blue-400 md:pl-0">{isContact ? "Contact message" : "Event registration"}{status && <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${status.tone}`}>{status.label}</span>}</span>
                        <time className="hidden text-xs font-normal text-deep-blue-400 md:block" dateTime={item.created_at} title={new Date(item.created_at).toLocaleString()}>{new Date(item.created_at).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}</time>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="border-x-0 border-t border-deep-blue-600/10 px-2 py-6 lg:px-0">
                      {!isContact && <TicketDetails item={item} onChange={onRefresh} />}
                      <div className="mb-6 flex flex-wrap gap-2">
                        {email && <Button asChild variant="outline" size="xs" className="gap-2 px-3"><a href={`mailto:${email}`}><Mail aria-hidden="true" className="size-3.5" />Email</a></Button>}
                        {phone && <Button asChild variant="outline" size="xs" className="gap-2 px-3"><a href={`tel:${phone}`}><Phone aria-hidden="true" className="size-3.5" />Call</a></Button>}
                        <time className="self-center text-xs text-deep-blue-400 sm:ml-auto" dateTime={item.created_at}>{new Date(item.created_at).toLocaleString()}</time>
                      </div>
                      <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                        {details.map(([key, value]) => (
                          <div key={key} className={key === "message" || key === "prayerRequest" ? "sm:col-span-2" : ""}>
                            <dt className="text-xs text-deep-blue-400">{fieldLabels[key] || key}</dt>
                            <dd className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-deep-blue-600">{String(value)}</dd>
                          </div>
                        ))}
                      </dl>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

            {!visible.length && (
              <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
                {hasFilters ? <Search aria-hidden="true" className="size-7 text-deep-blue-300" /> : <FileText aria-hidden="true" className="size-7 text-deep-blue-300" />}
                <h3 className="mt-5 text-2xl">{loading ? "Loading responses…" : hasFilters ? "No matching responses" : "Ready for your first response"}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-deep-blue-400">{hasFilters ? "Try another search or clear your filters." : "Contact messages and event registrations will appear here as they arrive."}</p>
                {hasFilters && <Button variant="outline" size="xs" className="mt-5 px-4" onClick={() => { setQuery(""); selectFilter("all"); }}>Clear filters</Button>}
              </div>
            )}

            {filtered.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-deep-blue-600/10 px-5 py-4">
                <p role="status" className="text-xs text-deep-blue-400">Showing {start + 1}–{Math.min(start + PAGE_SIZE, filtered.length)} of {filtered.length}</p>
                <Pagination className="mx-0 w-auto">
                  <PaginationContent className="gap-2">
                    <PaginationItem><Button variant="outline" size="xs" disabled={currentPage === 1} aria-label="Previous page" onClick={() => setPage(currentPage - 1)}><ArrowLeft className="size-4" /></Button></PaginationItem>
                    <PaginationItem><span className="px-2 text-xs text-deep-blue-400">{currentPage} / {pageCount}</span></PaginationItem>
                    <PaginationItem><Button variant="outline" size="xs" disabled={currentPage === pageCount} aria-label="Next page" onClick={() => setPage(currentPage + 1)}><ArrowRight className="size-4" /></Button></PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
          {submissions.length === 500 && <p className="mt-3 text-xs text-deep-blue-400">Showing the latest 500 submissions. Overview totals cover these responses.</p>}
        </section>
      </main>
    </div>
  );
}
