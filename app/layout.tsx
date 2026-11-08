import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ServiceWorker } from "@/components/service-worker";
import { APP } from "@/lib/app";

// Placeholder type. Pick the brief's fonts (from the client's own world, see the craft skill) and swap them here
// and in --font-sans / --font-mono in globals.css.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP.name,
  description: APP.description,
  applicationName: APP.name,
  // Opens full screen from the home screen, under a black status bar (the app is dark only).
  appleWebApp: { capable: true, title: APP.shortName, statusBarStyle: "black" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  // So the app can run under the notch and above the home bar (env(safe-area-inset-*), --app-top / --app-bottom).
  viewportFit: "cover",
  themeColor: APP.colour,
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={APP.lang} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {/* min-h-svh, not h-full: Lenis sets html and body to height:auto. */}
      <body className="flex min-h-svh flex-col bg-background font-sans text-foreground">
        {/* Without JavaScript nothing animates in, so show everything that would have. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <Providers>{children}</Providers>
        <ServiceWorker />
      </body>
    </html>
  );
}
