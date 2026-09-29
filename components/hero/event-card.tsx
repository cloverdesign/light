import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventDetails } from "@/components/events/event-details";
import { igniteEvent } from "@/lib/events";

export function EventCard() {
  return (
    <article className="grid overflow-hidden rounded-3xl border border-aero-200 bg-white md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <Link href={igniteEvent.registrationUrl} className="block focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-yellow-600" aria-label={`Register for ${igniteEvent.title}`}>
        <Image src={igniteEvent.poster} alt={igniteEvent.posterAlt} width={1280} height={1600} sizes="(min-width: 1280px) 500px, (min-width: 768px) 45vw, 100vw" className="h-auto w-full" />
      </Link>
      <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
        <h3 className="text-4xl leading-tight sm:text-5xl lg:text-6xl">{igniteEvent.title}</h3>
        <p className="mt-3 text-xl text-deep-blue-500">{igniteEvent.theme}.</p>
        <p className="mt-5 text-sm leading-7 text-deep-blue-400">Join {igniteEvent.organiser} at {igniteEvent.venue}, {igniteEvent.location}. We look forward to welcoming you.</p>
        <EventDetails className="my-8 border-y border-aero-100 py-6" />
        <Button asChild className="w-full gap-3 sm:w-fit"><Link href={igniteEvent.registrationUrl}>Register now <ArrowRight aria-hidden="true" className="size-4" /></Link></Button>
      </div>
    </article>
  );
}
