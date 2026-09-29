import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { igniteEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

export function EventDetails({ className }: { className?: string }) {
  return (
    <dl className={cn("grid gap-5 text-sm", className)}>
      <div className="flex items-start gap-3">
        <CalendarDays aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-aero-800" />
        <div><dt className="sr-only">Date</dt><dd className="leading-6"><time dateTime={igniteEvent.dateTime}>{igniteEvent.date}</time></dd></div>
      </div>
      <div className="flex items-start gap-3">
        <Clock3 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-aero-800" />
        <div><dt className="sr-only">Time</dt><dd className="leading-6">{igniteEvent.time}</dd></div>
      </div>
      <div className="flex items-start gap-3">
        <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-aero-800" />
        <div><dt className="sr-only">Venue</dt><dd className="leading-6">{igniteEvent.venue}<span className="block text-deep-blue-400">{igniteEvent.location}</span></dd></div>
      </div>
    </dl>
  );
}
