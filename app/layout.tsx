import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Providers } from "@/components/providers";

// Placeholder type. Swap for the brief's fonts here and in --font-sans / --font-mono in globals.css.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Starter",
  description: "Starting point for a timed client test.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Set lang to the UI's language, e.g. "da" for a Danish interface.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {/* min-h-svh, not h-full: Lenis sets html and body to height:auto. */}
      <body className="flex min-h-svh flex-col bg-background font-sans text-foreground">
        {/* Without JavaScript nothing animates in, so show everything that would have. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
