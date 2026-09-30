import { headers } from "next/headers";
import { AdminHeader } from "@/components/admin/admin-header";

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
      <AdminHeader siteHref={siteHref} />
      {children}
    </div>
  );
}
