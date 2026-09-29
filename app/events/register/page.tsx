import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventDetails } from "@/components/events/event-details";
import { RegistrationForm } from "@/components/events/registration-form";
import { igniteEvent } from "@/lib/events";

export const metadata: Metadata = {
  title: "Register for Ignite Con ’26 | Lighthouse",
  description: "Join BLW Lighthouse Group for Ignite Con ’26 on Saturday, 10 October 2026 at 12 PM, at The Barnyard Theatre, Menlyn Park.",
};

export default function EventRegistration() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-36 font-body md:px-10">
      <Link href="/#events" className="inline-flex items-center gap-2 text-sm text-deep-blue-400 hover:text-orange-600"><ArrowLeft aria-hidden="true" className="size-4" />Back to events</Link>
      <div className="mb-10 mt-8 max-w-3xl">
        <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl">Register for {igniteEvent.title}</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-deep-blue-400">We can’t wait to welcome you. Fill in your details below to register and let us know how we can help you plan your visit.</p>
        <Button asChild variant="outline" className="mt-5 gap-2 lg:hidden"><Link href="#registration">Go to registration <ArrowDown aria-hidden="true" className="size-4" /></Link></Button>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-12">
        <aside aria-label="Event information" className="min-w-0">
          <figure>
            <Image src={igniteEvent.poster} alt={igniteEvent.posterAlt} width={1280} height={1600} priority sizes="(min-width: 1280px) 425px, (min-width: 1024px) 38vw, (min-width: 640px) 384px, 100vw" className="mx-auto h-auto w-full max-w-sm rounded-2xl lg:max-w-none" />
            <figcaption className="mt-5 text-center text-sm leading-6 text-deep-blue-400 lg:text-left">{igniteEvent.theme} · {igniteEvent.scripture}</figcaption>
          </figure>
          <div className="mt-7 border-t border-aero-200 pt-7">
            <EventDetails />
            <p className="mt-6 text-sm leading-6 text-deep-blue-400">Hosted by {igniteEvent.organiser}<span className="block">@{igniteEvent.socialHandle}</span></p>
          </div>
        </aside>
        <div id="registration" className="min-w-0 scroll-mt-32"><RegistrationForm /></div>
      </div>
    </main>
  );
}
