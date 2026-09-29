import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import lighthouseWordmark from "@/assets/icons/logo2.svg";
import { headers } from "next/headers";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const hostname = requestHeaders.get("host") ?? "";
  const configuredAdminHost = process.env.ADMIN_HOSTNAME?.toLowerCase();
  const adminHost = hostname.toLowerCase().split(":")[0] === configuredAdminHost
    ? configuredAdminHost
    : hostname.toLowerCase().startsWith("admin.")
      ? hostname.split(":")[0].toLowerCase()
      : "";
  const publicHost = adminHost ? adminHost.replace(/^[^.]+\./, "") + (hostname.includes(":") ? `:${hostname.split(":")[1]}` : "") : "";
  const protocol = requestHeaders.get("x-forwarded-proto") || (publicHost.includes("localhost") ? "http" : "https");
  const siteHref = process.env.NEXT_PUBLIC_SITE_URL || (publicHost ? `${protocol}://${publicHost}` : "/");

  return (
    <div className="min-h-screen bg-background font-body text-deep-blue-600">
      <header className="sticky top-0 z-30 border-b border-deep-blue-600/10 bg-background/95 backdrop-blur">
        <div className="mx-auto flex min-h-[88px] max-w-7xl items-center justify-between gap-5 px-6 md:px-10">
          <div className="flex items-center gap-5 md:gap-10">
            <Link href={siteHref} aria-label="Lighthouse home" className="shrink-0">
              <Image src={lighthouseWordmark} alt="BLW Lighthouse" priority className="h-auto w-[100px]" />
            </Link>
          </div>

          <nav aria-label="Admin navigation" className="flex items-center gap-1 md:gap-2">
            <Button asChild variant="outline" className="px-4 text-xs sm:text-sm">
              <Link href={siteHref}>Back to website <span aria-hidden="true" className="ml-2">↗</span></Link>
            </Button>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
