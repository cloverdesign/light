import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  const configuredAdminHost = process.env.ADMIN_HOSTNAME?.toLowerCase();
  const isAdminHost = configuredAdminHost
    ? hostname === configuredAdminHost
    : hostname.startsWith("admin.");

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const requestHeaders = new Headers(request.headers);

  if (isAdminHost && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    requestHeaders.set("x-admin-route", "true");
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }
  if (isAdminRoute) {
    requestHeaders.set("x-admin-route", "true");
    return NextResponse.next({ request: { headers: requestHeaders } });
  }
  return NextResponse.next();
}

export const config = { matcher: ["/:path*"] };
