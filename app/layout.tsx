import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import SmoothScroll from "@/components/layout/smooth-scroll";
import Providers from "./providers";
import Preloader from "@/components/ui/preloader";
import LiveButton from "@/components/live/liveBtn";
import { headers } from "next/headers";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const championGothic = localFont({
  src: "../public/fonts/championGothic.woff2",
  variable: "--font-champion-sans",
});

export const metadata: Metadata = {
  title: "Lighthouse",
  description: "Empowering the next generation of leaders through faith, education, and community.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const hostname = requestHeaders.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  const configuredAdminHost = process.env.ADMIN_HOSTNAME?.toLowerCase();
  const isAdminHost = configuredAdminHost
    ? hostname === configuredAdminHost
    : hostname.startsWith("admin.");
  const isAdminRoute = isAdminHost || requestHeaders.get("x-admin-route") === "true";

  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${championGothic.variable} antialiased relative transition-discrete`}
      >
        {!isAdminRoute && <><Navbar /><SmoothScroll /><Preloader /></>}
        <Providers>{children}</Providers>
        {!isAdminRoute && <><Footer /><LiveButton /></>}
      </body>
    </html>
  );
}
