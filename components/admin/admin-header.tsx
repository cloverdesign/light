"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import lighthouseWordmark from "@/assets/icons/logo2.svg";

/** Light like the dashboard, or dark like the site's /live page on the gate scanner. */
export function AdminHeader({ siteHref }: { siteHref: string }) {
  const dark = usePathname() === "/admin/scanner";
  return (
    <header className={`sticky top-0 z-30 border-b backdrop-blur ${dark ? "border-aero-100/10 bg-deep-blue-600 text-aero-100" : "border-deep-blue-600/10 bg-background/95"}`}>
      <div className="mx-auto flex min-h-[88px] max-w-7xl items-center justify-between gap-5 px-6 md:px-10">
        <Link href={siteHref} aria-label="Lighthouse home" className="shrink-0">
          <Image src={lighthouseWordmark} alt="BLW Lighthouse" priority className={`h-auto w-[100px] ${dark ? "brightness-0 invert" : ""}`} />
        </Link>
        <nav aria-label="Admin navigation" className="flex items-center gap-1 md:gap-2">
          {dark && (
            <Button asChild variant="ghost" className="px-4 text-xs text-aero-200 hover:bg-deep-blue-500 hover:text-aero-100 sm:text-sm">
              <Link href="/admin">Dashboard</Link>
            </Button>
          )}
          <Button asChild variant="outline" className={`px-4 text-xs sm:text-sm ${dark ? "border-aero-100/30 text-aero-100 hover:bg-deep-blue-500" : ""}`}>
            <Link href={siteHref}>{dark ? <><span className="sm:hidden">Website</span><span className="hidden sm:inline">Back to website</span></> : "Back to website"} <span aria-hidden="true" className="ml-2">↗</span></Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
