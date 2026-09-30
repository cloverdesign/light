"use client";

import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import type QrScanner from "qr-scanner";
import { BookOpen, Camera, CameraOff, CheckCircle2, CircleAlert, Keyboard, TriangleAlert, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { CheckInResult } from "@/lib/check-in";
import { campusNotListed, igniteEvent, lighthouseCampuses } from "@/lib/events";

type Stats = { registered: number; checkedIn: number };
type Panel = "manual" | "walk-in" | "guide" | null;
type Outcome = CheckInResult | { status: "error"; ticketCode: string; message: string };

const REPEAT_SCAN_MS = 4000;
const VALID_DISMISS_MS = 2500;
// Same field styling as the public registration form.
const fieldClass = "grid gap-2 text-sm font-medium text-aero-100";
const inputClass = "font-normal focus-within:border-aero-500 focus-within:ring-2 focus-within:ring-aero-100";
const card = "rounded-2xl border border-aero-100/10 bg-deep-blue-500/50";
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
  const tone = !outcome ? "" : outcome.status === "valid" ? "bg-emerald-600 text-white" : outcome.status === "already_checked_in" ? "bg-yellow-600 text-yellow-1100" : "bg-orange-600 text-white";
  const statusColour = (status: Outcome["status"]) => status === "valid" ? "text-emerald-300" : status === "already_checked_in" ? "text-yellow-400" : "text-orange-400";

  return (
    <main className="min-h-[calc(100svh-88px)] bg-deep-blue-600 px-6 pb-16 pt-8 font-body text-aero-100">
      <div className="mx-auto max-w-lg">
        <header className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
          <div>
            <h1 className="text-5xl leading-none sm:text-6xl">Gate scanner</h1>
            <p className="mt-2 text-sm text-aero-200">{igniteEvent.title} · {igniteEvent.date}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button size="xs" variant="ghost" className="gap-1.5 px-3 py-2 text-aero-200 hover:bg-deep-blue-500 hover:text-aero-100" aria-pressed={panel === "guide"} onClick={() => setPanel(panel === "guide" ? null : "guide")}><BookOpen aria-hidden="true" className="size-4" />Guide</Button>
            <Button size="xs" variant="outline" className="border-aero-100/30 px-3 py-2 text-aero-100 hover:bg-deep-blue-500" aria-pressed={standby} onClick={toggleStandby}>{standby ? "Resume" : "Standby"}</Button>
          </div>
        </header>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <div className={`${card} px-5 py-4`}>
            <p className="text-xs font-medium text-aero-300">Checked in</p>
            <p className="mt-1 font-heading text-5xl leading-none text-yellow-600 tabular-nums">{stats.checkedIn}<span className="font-body text-base text-aero-300"> / {stats.registered}</span></p>
            <p className="mt-1.5 text-xs text-aero-300">{passesChecked} on this device</p>
          </div>
          <div className={`${card} px-5 py-4`}>
            <p className="text-xs font-medium text-aero-300">Gate status</p>
            <p className={`mt-1 font-heading text-4xl uppercase leading-[1.2] ${standby ? "text-aero-300" : "text-aero-600"}`}>{standby ? "Standby" : "Active"}</p>
            <p className="mt-1.5 text-xs text-aero-300">{cameraOn ? "Camera scanning" : "Camera off"}</p>
          </div>
        </div>

        {panel === "guide" && (
          <section aria-label="Scanner guide" className={`${card} mt-4 p-5 text-sm leading-6 text-aero-200`}>
            <ol className="list-decimal space-y-1.5 pl-5">
              <li>Tap <strong className="text-aero-100">Start camera scanner</strong> and allow camera access.</li>
              <li>Hold the attendee’s QR code inside the frame. The phone buzzes and the screen shows the result.</li>
              <li><span className="text-emerald-300">Green</span>: let them in. <span className="text-yellow-400">Yellow</span>: this ticket was already used; check with a team lead. <span className="text-orange-400">Orange</span>: no matching ticket.</li>
              <li>No QR code? Use <strong className="text-aero-100">Enter ticket code manually</strong> with the code from their email.</li>
              <li>Not registered? Use <strong className="text-aero-100">Express walk-in registration</strong>. They’re checked in straight away.</li>
              <li>Tap <strong className="text-aero-100">Standby</strong> between waves to turn the camera off and save battery.</li>
            </ol>
          </section>
        )}

        <div className={`${card} relative mt-4 aspect-square overflow-hidden p-2`}>
          <div className="relative size-full overflow-hidden rounded-xl bg-deep-blue-800">
            <video ref={videoRef} muted playsInline className={`size-full object-cover ${cameraOn ? "" : "invisible"}`} />
            {!cameraOn && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center text-sm text-aero-300">
                {standby ? <><CameraOff aria-hidden="true" className="size-8" />Gate is on standby.</> : cameraError ? <><CircleAlert aria-hidden="true" className="size-8 text-orange-400" /><span role="alert" className="text-aero-200">{cameraError}</span></> : <><Camera aria-hidden="true" className="size-8" />Camera is off.</>}
              </div>
            )}
          </div>
          {outcome && (
            <div role="alert" className={`absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center ${tone}`}>
              {outcome.status === "valid" ? <CheckCircle2 aria-hidden="true" className="size-16" /> : outcome.status === "already_checked_in" ? <TriangleAlert aria-hidden="true" className="size-16" /> : <CircleAlert aria-hidden="true" className="size-16" />}
              <p className="font-heading text-5xl uppercase leading-none">
                {outcome.status === "valid" ? "Welcome in" : outcome.status === "already_checked_in" ? "Already checked in" : outcome.status === "error" ? "Couldn’t check" : "Ticket not found"}
              </p>
              {"name" in outcome && <p className="text-xl font-semibold">{outcome.name}</p>}
              {campus && <p className="text-sm opacity-90">{campus}</p>}
              <p className="text-sm leading-6 opacity-90">
                {outcome.status === "already_checked_in" ? `This ticket was used at ${timeOf(outcome.checkedInAt)}.`
                  : outcome.status === "not_found" ? "No registration has this code. Check the code or register them as a walk-in."
                  : outcome.status === "invalid" ? "This QR code isn’t an event ticket."
                  : outcome.status === "error" ? outcome.message : ""}
              </p>
              <p className="font-mono text-sm tracking-widest opacity-80">{outcome.ticketCode}</p>
              <Button size="xs" variant="outline" className="mt-2 border-current px-6 text-current hover:bg-white/15" onClick={dismiss}>
                {outcome.status === "valid" ? "Next" : "Scan next"}
              </Button>
            </div>
          )}
        </div>

        {!standby && (
          <div className="mt-5 grid gap-3">
            <Button className="w-full gap-2" onClick={() => cameraOn ? stopCamera() : void startCamera()}>
              {cameraOn ? <><CameraOff aria-hidden="true" className="size-4" />Stop camera</> : <><Camera aria-hidden="true" className="size-4" />Start camera scanner</>}
            </Button>
            <Button variant="secondary-juicy" className="w-full gap-2" aria-expanded={panel === "manual"} onClick={() => setPanel(panel === "manual" ? null : "manual")}>
              <Keyboard aria-hidden="true" className="size-4" />Enter ticket code manually
            </Button>
            {panel === "manual" && <ManualEntry onCheck={(code) => { setPanel(null); void check(code); }} />}
            <Button variant="tertiary" className="w-full gap-2 text-deep-blue-600" aria-expanded={panel === "walk-in"} onClick={() => setPanel(panel === "walk-in" ? null : "walk-in")}>
              <Zap aria-hidden="true" className="size-4" />Express walk-in registration
            </Button>
            {panel === "walk-in" && <WalkIn onDone={(result) => { setPanel(null); busyRef.current = true; show(result); void refreshStats(); }} onClose={() => setPanel(null)} />}
          </div>
        )}

        {recent.length > 0 && (
          <section aria-labelledby="recent-heading" className="mt-8">
            <h2 id="recent-heading" className="text-2xl">Recent on this device</h2>
            <ul className={`${card} mt-3 divide-y divide-aero-100/10`}>
              {recent.map((item, index) => (
                <li key={index} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
                  <span className="min-w-0 truncate">{"name" in item ? item.name : item.ticketCode || "Unknown code"}</span>
                  <span className={`shrink-0 text-xs font-medium ${statusColour(item.status)}`}>
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
    <form className={`${card} flex items-end gap-2 p-4`} onSubmit={(event) => { event.preventDefault(); if (code.trim()) onCheck(code); }}>
      <label className={`${fieldClass} min-w-0 flex-1`} htmlFor="manual-code">Ticket code
        <Input id="manual-code" icon="ticket" autoFocus autoCapitalize="characters" autoComplete="off" spellCheck={false} value={code} onChange={(event) => setCode(event.target.value)} placeholder="TKT-XXXX-XXXX" className={`${inputClass} font-mono tracking-widest`} />
      </label>
      <Button type="submit" className="shrink-0 px-6">Check</Button>
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
    <form onSubmit={submit} className={`${card} p-5`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl">Walk-in</h2>
        <Button type="button" size="xs" variant="ghost" className="p-1.5 text-aero-200 hover:bg-deep-blue-500 hover:text-aero-100" aria-label="Close walk-in registration" onClick={onClose}><X className="size-4" /></Button>
      </div>
      <fieldset disabled={saving} className="grid min-w-0 gap-4">
        <label className={fieldClass} htmlFor="walk-in-name">Full name<Input id="walk-in-name" icon="user-round" name="fullName" required maxLength={120} autoComplete="off" placeholder="Their full name" className={inputClass} /></label>
        <label className={fieldClass} htmlFor="walk-in-phone">Phone number<Input id="walk-in-phone" icon="smartphone" name="phone" type="tel" required maxLength={40} autoComplete="off" placeholder="Their contact number" className={inputClass} /></label>
        <label className={fieldClass} htmlFor="walk-in-email">Email address <span className="-mt-1 font-normal text-aero-300">Optional</span><Input id="walk-in-email" icon="mail" name="email" type="email" maxLength={254} autoComplete="off" placeholder="name@example.com" className={inputClass} /></label>
        <label className={fieldClass} htmlFor="walk-in-campus">Lighthouse campus
          <Select id="walk-in-campus" name="lighthouseCampus" required value={campus} onChange={(event) => setCampus(event.target.value)}>
            <option value="" disabled>Select campus</option>
            {lighthouseCampuses.map((name) => <option key={name}>{name}</option>)}
            <option>{campusNotListed}</option>
          </Select>
        </label>
        {campus === campusNotListed && <label className={fieldClass} htmlFor="walk-in-other-campus">Which campus?<Input id="walk-in-other-campus" icon="map-pin" name="otherCampus" required maxLength={160} placeholder="Type the name of their campus" className={inputClass} /></label>}
        {error && <p role="alert" className="rounded-lg bg-orange-100 px-4 py-3 text-sm leading-6 text-orange-900">{error}</p>}
        <Button type="submit" className="mt-1 w-full">{saving ? "Saving…" : "Register & check in"}</Button>
      </fieldset>
    </form>
  );
}
