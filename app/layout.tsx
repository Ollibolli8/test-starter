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
  // Opens full screen from the home screen, under a status bar in the app's one theme (APP.scheme).
  appleWebApp: { capable: true, title: APP.shortName, statusBarStyle: APP.scheme === "light" ? "default" : "black" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  // So the app can run under the notch and above the home bar (env(safe-area-inset-*), --app-top / --app-bottom).
  viewportFit: "cover",
  themeColor: APP.colour,
  colorScheme: APP.scheme,
};

// In a drawn phone on the case page (app/case, components/case/live.tsx) the app is opened with ?frame=phone. This
// marks the page before its first paint, so the app keeps clear of the drawn notch and home bar from the start
// (globals.css → [data-frame]). suppressHydrationWarning on <html>: the mark is set here, not by React.
const FRAME = `if(/[?&]frame=phone(&|$)/.test(location.search))document.documentElement.dataset.frame="phone"`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={APP.lang} className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: FRAME }} />
      </head>
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
