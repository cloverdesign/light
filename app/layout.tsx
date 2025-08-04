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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${championGothic.variable} antialiased relative transition-discrete`}
      >
        <Navbar />
        <SmoothScroll />
        <Preloader />
        <Providers>{children}</Providers>
        <Footer />
        <LiveButton />
      </body>
    </html>
  );
}
