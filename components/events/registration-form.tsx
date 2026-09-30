"use client";

import { type FormEvent, useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { campusNotListed, igniteEvent, lighthouseCampuses, registrationAgeGroups } from "@/lib/events";

const fieldClass = "grid gap-2 text-sm font-medium";
const inputClass = "font-normal focus-within:border-aero-500 focus-within:ring-2 focus-within:ring-aero-100";

export function RegistrationForm() {
  const [campus, setCampus] = useState("");
  const [prayer, setPrayer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState<{ code: string; emailSent: boolean } | null>(null);
  const inFlight = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    inFlight.current = true;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, type: "event_registration" }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Please try again.");
      form.reset();
      setCampus("");
      setPrayer("");
      setTicket({ code: result.ticketCode, emailSent: result.emailSent });
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn’t save your registration. Please try again.");
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  }

  if (ticket) return (
    <section role="status" className="rounded-2xl border border-aero-200 bg-white p-8 sm:p-10">
      <CheckCircle2 aria-hidden="true" className="size-10 text-aero-800" />
      <h2 tabIndex={-1} ref={(heading) => { heading?.focus(); }} className="mt-6 text-4xl outline-none">You’re registered!</h2>
      <p className="mt-4 text-sm leading-7 text-deep-blue-400">We’ve received your registration for {igniteEvent.title}. We look forward to seeing you at {igniteEvent.venue} on {igniteEvent.date} at {igniteEvent.time}.</p>
      <div className="mt-6 rounded-xl bg-aero-100/60 px-5 py-4 text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-deep-blue-400">Ticket code</p>
        <p className="mt-1 font-mono text-2xl font-semibold tracking-widest text-deep-blue-600">{ticket.code}</p>
      </div>
      <p className="mt-4 text-sm leading-7 text-deep-blue-400">{ticket.emailSent ? "Your ticket and QR code are on their way to your inbox. Please bring it with you to the entrance." : "We couldn’t email your ticket right now. Please save or screenshot this code and present it at the entrance."}</p>
      <Button variant="outline" className="mt-8" onClick={() => setTicket(null)}>Register someone else</Button>
    </section>
  );

  return (
    <form onSubmit={submit} aria-busy={loading} className="rounded-2xl border border-aero-200 bg-white p-6 sm:p-9">
      <fieldset disabled={loading} className="min-w-0">
        <legend className="font-heading text-3xl uppercase">Your details</legend>
        <p className="mt-2 text-sm leading-6 text-deep-blue-400">Tell us a little about yourself. All fields are required.</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className={`${fieldClass} sm:col-span-2`} htmlFor="full-name">Full name<Input id="full-name" className={inputClass} icon="user-round" name="fullName" autoComplete="name" maxLength={120} placeholder="Your full name" required /></label>
          <label className={fieldClass} htmlFor="email">Email address<Input id="email" className={inputClass} icon="mail" name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" required /></label>
          <label className={fieldClass} htmlFor="phone">Phone number<Input id="phone" className={inputClass} icon="smartphone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Your contact number" required /></label>
          <label className={fieldClass} htmlFor="age-group">Age group<Select id="age-group" name="ageGroup" defaultValue="" required><option value="" disabled>Select age group</option>{registrationAgeGroups.map((group) => <option key={group}>{group}</option>)}</Select></label>
          <label className={fieldClass} htmlFor="is-student">Are you a student?<Select id="is-student" name="isStudent" defaultValue="" required><option value="" disabled>Select an option</option><option>Yes</option><option>No</option></Select></label>
          <label className={`${fieldClass} sm:col-span-2`} htmlFor="lighthouse-campus">Lighthouse campus<Select id="lighthouse-campus" name="lighthouseCampus" value={campus} onChange={(event) => setCampus(event.target.value)} required><option value="" disabled>Select your campus</option>{lighthouseCampuses.map((name) => <option key={name}>{name}</option>)}<option>{campusNotListed}</option></Select></label>
          {campus === campusNotListed && <label className={`${fieldClass} sm:col-span-2`} htmlFor="other-campus">Which campus are you from?<Input id="other-campus" className={inputClass} icon="map-pin" name="otherCampus" maxLength={160} placeholder="Type the name of your campus" required /></label>}
        </div>
      </fieldset>

      <div className="my-8 border-t border-aero-100" />
      <fieldset disabled={loading} className="min-w-0">
        <legend className="font-heading text-3xl uppercase">Plan your visit</legend>
        <p className="mt-2 text-sm leading-6 text-deep-blue-400">Help us prepare to welcome you.</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className={`${fieldClass} sm:col-span-2`} htmlFor="area">Area / suburb of residence<Input id="area" className={inputClass} icon="map-pin" name="area" maxLength={160} placeholder="Where do you live?" required /></label>
          <label className={fieldClass} htmlFor="transport">Do you need transport?<Select id="transport" name="needsTransport" defaultValue="" required><option value="" disabled>Select an option</option><option>Yes</option><option>No</option></Select></label>
          <label className={fieldClass} htmlFor="first-timer">Is this your first time at Lighthouse?<Select id="first-timer" name="firstTimer" defaultValue="" required><option value="" disabled>Select an option</option><option>Yes</option><option>No</option></Select></label>
        </div>
      </fieldset>

      <div className="my-8 border-t border-aero-100" />
      <fieldset disabled={loading} className="min-w-0">
        <legend className="font-heading text-3xl uppercase">How can we pray for you?</legend>
        <div className="mt-6 grid gap-5">
          <label className={fieldClass} htmlFor="has-prayer-request">Would you like to share a prayer request?<Select id="has-prayer-request" name="hasPrayerRequest" value={prayer} onChange={(event) => setPrayer(event.target.value)} required><option value="" disabled>Select an option</option><option>Yes</option><option>No</option></Select></label>
          {prayer === "Yes" && <Textarea id="prayer-request" label="Prayer request details" className={inputClass} name="prayerRequest" rows={5} maxLength={3000} placeholder="Share your prayer request with us" required />}
        </div>
      </fieldset>

      {error && <p role="alert" className="mt-6 rounded-lg bg-orange-100 px-4 py-3 text-sm leading-6 text-orange-900">{error}</p>}
      <Button type="submit" disabled={loading} className="mt-8 w-full gap-3">{loading ? "Submitting…" : "Register for Ignite Con ’26"}<ArrowRight aria-hidden="true" className="size-4" /></Button>
      <p role="status" className="sr-only">{loading ? "Submitting your registration. Please wait." : ""}</p>
    </form>
  );
}
