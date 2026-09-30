"use client";

import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import type QrScanner from "qr-scanner";
import { BookOpen, Camera, CameraOff, CheckCircle2, CircleAlert, Keyboard, TriangleAlert, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CheckInResult } from "@/lib/check-in";
import { campusNotListed, igniteEvent, lighthouseCampuses } from "@/lib/events";

type Stats = { registered: number; checkedIn: number };
type Panel = "manual" | "walk-in" | "guide" | null;
type Outcome = CheckInResult | { status: "error"; ticketCode: string; message: string };

const REPEAT_SCAN_MS = 4000;
const VALID_DISMISS_MS = 2500;
const panelInput = "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-base text-white placeholder:text-white/40 focus-visible:border-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40";
const panelLabel = "grid gap-1.5 text-sm font-medium text-white/80";
const timeOf = (value: string) => value ? new Date(value).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }) : "";

function feedback(ok: boolean) {
  navigator.vibrate?.(ok ? 80 : [200, 100, 200]);
  try {
    const audio = new AudioContext();
    const tone = audio.createOscillator();
    const gain = audio.createGain();
    tone.frequency.value = ok ? 880 : 220;
    gain.gain.setValueAtTime(0.15, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + (ok ? 0.15 : 0.4));
    tone.connect(gain).connect(audio.destination);
    tone.start();
    tone.stop(audio.currentTime + 0.4);
    tone.onended = () => void audio.close();
  } catch { /* sound is a nicety; vibration and the screen still signal the result */ }
}

async function postJson(url: string, body: object) {
  const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const result = await response.json().catch(() => ({}));
  if (response.status === 401) throw new Error("Your session has expired. Reload the page and sign in again.");
  if (!response.ok) throw new Error(result.error || "Something went wrong. Please try again.");
  return result;
}

export function GateScanner({ initialStats, onUnauthorized }: { initialStats: Stats; onUnauthorized: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const busyRef = useRef(false);
  const lastScanRef = useRef({ code: "", at: 0 });
  const dismissTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [stats, setStats] = useState(initialStats);
  const [passesChecked, setPassesChecked] = useState(0);
  const [standby, setStandby] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [recent, setRecent] = useState<Outcome[]>([]);
  const [panel, setPanel] = useState<Panel>(null);

  const refreshStats = useCallback(async () => {
    const response = await fetch("/api/admin/check-in", { cache: "no-store" }).catch(() => null);
    if (response?.status === 401) return onUnauthorized();
    if (response?.ok) setStats(await response.json());
  }, [onUnauthorized]);

  // Other gates check people in too, so keep the totals current.
  useEffect(() => {
    const timer = setInterval(() => void refreshStats(), 30_000);
    return () => clearInterval(timer);
  }, [refreshStats]);

  const dismiss = useCallback(() => {
    clearTimeout(dismissTimer.current);
    busyRef.current = false;
    setOutcome(null);
  }, []);

  const show = useCallback((result: Outcome) => {
    const ok = result.status === "valid";
    feedback(ok);
    setOutcome(result);
    setRecent((items) => [result, ...items].slice(0, 5));
    if (result.status !== "error") setPassesChecked((count) => count + 1);
    if (ok) {
      setStats((current) => ({ ...current, checkedIn: current.checkedIn + 1 }));
      dismissTimer.current = setTimeout(dismiss, VALID_DISMISS_MS);
    }
  }, [dismiss]);

  const check = useCallback(async (code: string) => {
    if (busyRef.current) return;
    busyRef.current = true;
    try {
      show(await postJson("/api/admin/check-in", { code }));
    } catch (err) {
      show({ status: "error", ticketCode: code, message: err instanceof Error ? err.message : "Could not check this ticket." });
    }
  }, [show]);

  const stopCamera = useCallback(() => {
    scannerRef.current?.destroy();
    scannerRef.current = null;
    setCameraOn(false);
  }, []);

  async function startCamera() {
    if (!videoRef.current || scannerRef.current) return;
    setCameraError("");
    try {
      const { default: Scanner } = await import("qr-scanner");
      const scanner = new Scanner(videoRef.current, ({ data }) => {
        const now = Date.now();
        if (data === lastScanRef.current.code && now - lastScanRef.current.at < REPEAT_SCAN_MS) return;
        if (busyRef.current) return;
        lastScanRef.current = { code: data, at: now };
        void check(data);
      }, { preferredCamera: "environment", highlightScanRegion: true, highlightCodeOutline: true, maxScansPerSecond: 8, returnDetailedScanResult: true });
      scannerRef.current = scanner;
      await scanner.start();
      setCameraOn(true);
    } catch {
      stopCamera();
      setCameraError("We couldn’t open the camera. Allow camera access for this site in your browser settings, or enter codes manually.");
    }
  }

  useEffect(() => stopCamera, [stopCamera]);

  function toggleStandby() {
    if (!standby) { stopCamera(); setPanel(null); }
    setStandby(!standby);
  }

  const campus = outcome && "campus" in outcome ? outcome.campus : "";
  const tone = !outcome ? "" : outcome.status === "valid" ? "bg-emerald-600" : outcome.status === "already_checked_in" ? "bg-yellow-600 text-yellow-1100" : "bg-red-700";

  return (
    <main className="min-h-[calc(100svh-88px)] bg-deep-blue-900 px-4 pb-10 pt-5 text-white sm:px-6">
      <div className="mx-auto max-w-lg">
        <header className="flex items-center justify-between gap-3">
          <h1 className="flex items-center gap-2 font-heading text-3xl uppercase leading-none sm:text-4xl">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-yellow-600 text-lg text-deep-blue-900">’26</span>Gate scanner
          </h1>
          <div className="flex gap-2">
            <Button size="xs" variant="ghost" className="gap-1.5 border border-yellow-600/40 px-3 py-2 text-yellow-500 hover:bg-yellow-600/10" aria-pressed={panel === "guide"} onClick={() => setPanel(panel === "guide" ? null : "guide")}><BookOpen aria-hidden="true" className="size-4" />Guide</Button>
            <Button size="xs" variant="ghost" className="border border-white/15 px-3 py-2 text-white/70 hover:bg-white/10" aria-pressed={standby} onClick={toggleStandby}>{standby ? "Resume" : "Standby"}</Button>
          </div>
        </header>
        <p className="mt-2 text-xs text-white/50">{igniteEvent.title} · {igniteEvent.date}</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 border-t-4 border-t-orange-600 bg-white/[0.03] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60">Checked in</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-yellow-500">{stats.checkedIn}<span className="text-base font-normal text-white/40"> / {stats.registered}</span></p>
            <p className="text-[11px] text-white/40">{passesChecked} scanned on this device</p>
          </div>
          <div className={`rounded-xl border border-white/10 border-t-4 bg-white/[0.03] px-4 py-3 ${standby ? "border-t-white/20" : "border-t-emerald-500"}`}>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60">Gate status</p>
            <p className={`mt-1 text-2xl font-semibold ${standby ? "text-white/50" : "text-emerald-400"}`}>{standby ? "Standby" : "Active"}</p>
            <p className="text-[11px] text-white/40">{cameraOn ? "Camera scanning" : "Camera off"}</p>
          </div>
        </div>

        {panel === "guide" && (
          <section aria-label="Scanner guide" className="mt-4 rounded-xl border border-yellow-600/30 bg-yellow-600/5 p-4 text-sm leading-6 text-white/80">
            <ol className="list-decimal space-y-1 pl-5">
              <li>Tap <strong>Start camera scanner</strong> and allow camera access.</li>
              <li>Hold the attendee’s QR code inside the frame. The phone buzzes and the screen shows the result.</li>
              <li><span className="text-emerald-400">Green</span>: let them in. <span className="text-yellow-500">Yellow</span>: this ticket was already used; check with a team lead. <span className="text-red-400">Red</span>: no matching ticket.</li>
              <li>No QR code? Use <strong>Enter ticket code manually</strong> with the code from their email.</li>
              <li>Not registered? Use <strong>Express walk-in registration</strong>. They’re checked in straight away.</li>
              <li>Tap <strong>Standby</strong> between waves to turn the camera off and save battery.</li>
            </ol>
          </section>
        )}

        <div className="relative mt-4 aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black p-2">
          <div className="relative size-full overflow-hidden rounded-xl border border-orange-600/40">
            <video ref={videoRef} muted playsInline className={`size-full object-cover ${cameraOn ? "" : "invisible"}`} />
            {!cameraOn && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center text-sm text-white/50">
                {standby ? <><CameraOff aria-hidden="true" className="size-8" />Gate is on standby.</> : cameraError ? <><CircleAlert aria-hidden="true" className="size-8 text-orange-500" /><span role="alert">{cameraError}</span></> : <><Camera aria-hidden="true" className="size-8" />Camera is off.</>}
              </div>
            )}
          </div>
          {outcome && (
            <div role="alert" className={`absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center ${tone}`}>
              {outcome.status === "valid" ? <CheckCircle2 aria-hidden="true" className="size-16" /> : outcome.status === "already_checked_in" ? <TriangleAlert aria-hidden="true" className="size-16" /> : <CircleAlert aria-hidden="true" className="size-16" />}
              <p className="font-heading text-4xl uppercase leading-none">
                {outcome.status === "valid" ? "Welcome in" : outcome.status === "already_checked_in" ? "Already checked in" : outcome.status === "error" ? "Couldn’t check" : "Ticket not found"}
              </p>
              {"name" in outcome && <p className="text-xl font-semibold">{outcome.name}</p>}
              {campus && <p className="text-sm opacity-90">{campus}</p>}
              <p className="text-sm opacity-90">
                {outcome.status === "already_checked_in" ? `This ticket was used at ${timeOf(outcome.checkedInAt)}.`
                  : outcome.status === "not_found" ? "No registration has this code. Check the code or register them as a walk-in."
                  : outcome.status === "invalid" ? "This QR code isn’t an event ticket."
                  : outcome.status === "error" ? outcome.message : ""}
              </p>
              <p className="font-mono text-sm tracking-widest opacity-80">{outcome.ticketCode}</p>
              <Button size="xs" variant="ghost" className="mt-2 border border-current/40 px-5 py-3 text-current hover:bg-white/15" onClick={dismiss}>
                {outcome.status === "valid" ? "Next" : "Scan next"}
              </Button>
            </div>
          )}
        </div>

        {!standby && (
          <div className="mt-4 grid gap-3">
            <Button className="w-full bg-orange-600 py-4 font-heading text-xl uppercase text-white hover:bg-orange-500" onClick={() => cameraOn ? stopCamera() : void startCamera()}>
              {cameraOn ? "Stop camera" : "Start camera scanner"}
            </Button>
            <Button variant="ghost" className="w-full gap-2 border border-orange-600/40 py-3.5 text-white hover:bg-white/5" aria-expanded={panel === "manual"} onClick={() => setPanel(panel === "manual" ? null : "manual")}>
              <Keyboard aria-hidden="true" className="size-4" />Enter ticket code manually
            </Button>
            {panel === "manual" && <ManualEntry onCheck={(code) => { setPanel(null); void check(code); }} />}
            <Button variant="ghost" className="w-full gap-2 border border-emerald-500/40 bg-emerald-500/5 py-3.5 text-emerald-400 hover:bg-emerald-500/10" aria-expanded={panel === "walk-in"} onClick={() => setPanel(panel === "walk-in" ? null : "walk-in")}>
              <Zap aria-hidden="true" className="size-4" />Express walk-in registration
            </Button>
            {panel === "walk-in" && <WalkIn onDone={(result) => { setPanel(null); busyRef.current = true; show(result); void refreshStats(); }} onClose={() => setPanel(null)} />}
          </div>
        )}

        {recent.length > 0 && (
          <section aria-labelledby="recent-heading" className="mt-6">
            <h2 id="recent-heading" className="text-xs font-semibold uppercase tracking-wide text-white/50">Recent on this device</h2>
            <ul className="mt-2 divide-y divide-white/10 rounded-xl border border-white/10">
              {recent.map((item, index) => (
                <li key={index} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                  <span className="min-w-0 truncate">{"name" in item ? item.name : item.ticketCode || "Unknown code"}</span>
                  <span className={`shrink-0 text-xs ${item.status === "valid" ? "text-emerald-400" : item.status === "already_checked_in" ? "text-yellow-500" : "text-red-400"}`}>
                    {item.status === "valid" ? "Checked in" : item.status === "already_checked_in" ? "Already used" : item.status === "error" ? "Error" : "Not found"}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}

function ManualEntry({ onCheck }: { onCheck: (code: string) => void }) {
  const [code, setCode] = useState("");
  return (
    <form className="flex gap-2" onSubmit={(event) => { event.preventDefault(); if (code.trim()) onCheck(code); }}>
      <label className="sr-only" htmlFor="manual-code">Ticket code</label>
      <input id="manual-code" autoFocus autoCapitalize="characters" autoComplete="off" spellCheck={false} value={code} onChange={(event) => setCode(event.target.value)} placeholder="TKT-XXXX-XXXX" className={`${panelInput} font-mono tracking-widest`} />
      <Button type="submit" className="shrink-0 bg-orange-600 px-5 text-white hover:bg-orange-500">Check</Button>
    </form>
  );
}

function WalkIn({ onDone, onClose }: { onDone: (result: CheckInResult) => void; onClose: () => void }) {
  const [campus, setCampus] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      onDone(await postJson("/api/admin/walk-in", Object.fromEntries(new FormData(event.currentTarget))));
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn’t save this walk-in.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-emerald-500/30 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Walk-in registration</h2>
        <Button type="button" size="xs" variant="ghost" className="p-1.5 text-white/60 hover:bg-white/10" aria-label="Close walk-in registration" onClick={onClose}><X className="size-4" /></Button>
      </div>
      <fieldset disabled={saving} className="grid gap-3">
        <label className={panelLabel}>Full name<input name="fullName" required maxLength={120} autoComplete="off" className={panelInput} /></label>
        <label className={panelLabel}>Phone number<input name="phone" type="tel" required maxLength={40} autoComplete="off" className={panelInput} /></label>
        <label className={panelLabel}>Email <span className="font-normal text-white/40">(optional)</span><input name="email" type="email" maxLength={254} autoComplete="off" className={panelInput} /></label>
        <label className={panelLabel}>Lighthouse campus
          <select name="lighthouseCampus" required value={campus} onChange={(event) => setCampus(event.target.value)} className={panelInput}>
            <option value="" disabled>Select campus</option>
            {lighthouseCampuses.map((name) => <option key={name}>{name}</option>)}
            <option>{campusNotListed}</option>
          </select>
        </label>
        {campus === campusNotListed && <label className={panelLabel}>Which campus?<input name="otherCampus" required maxLength={160} className={panelInput} /></label>}
        {error && <p role="alert" className="rounded-lg bg-red-700/30 px-3 py-2 text-sm text-red-100">{error}</p>}
        <Button type="submit" className="mt-1 w-full bg-emerald-600 py-3.5 text-white hover:bg-emerald-500">{saving ? "Saving…" : "Register & check in"}</Button>
      </fieldset>
    </form>
  );
}
