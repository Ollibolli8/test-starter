"use client";

// A drawn iPhone: a 390 × 844 screen (the width every check uses) in a 12 px bezel, with a status bar, the island and
// the home indicator. Two fits:
// - "desktop" (the stage, components/stage.tsx): the app full screen on a phone, centred on a tablet, and drawn as a
//   phone from 1024 px, scaled down to fit a short window (.device-fit in globals.css).
// - "always" (the looks board, components/look-board.tsx): drawn as a phone on every screen, at its real size; the
//   board scales it.
// The app inside lays itself out on the phone's screen, not the window: `absolute`, never `fixed`, and the
// --app-top / --app-bottom insets for the notch and the home bar (components/app-shell.tsx does both).

import { useEffect, useState, type ReactNode } from "react";
import { APP } from "@/lib/app";

const FIT = {
  desktop: {
    outer:
      "device-fit mx-auto h-dvh w-full sm:max-w-[30rem] lg:h-[868px] lg:w-[414px] lg:max-w-none lg:rounded-[60px] lg:bg-[#0b0b0b] lg:p-[12px] lg:shadow-[0_0_0_1.5px_#3a3a3a,0_50px_100px_-30px_rgb(0_0_0/0.5),0_20px_40px_-20px_rgb(0_0_0/0.35)]",
    inner: "[--app-bottom:env(safe-area-inset-bottom)] [--app-top:env(safe-area-inset-top)] lg:rounded-[48px] lg:[--app-bottom:1.75rem] lg:[--app-top:3.25rem]",
    drawn: "hidden lg:block",
    status: "hidden lg:flex",
  },
  always: {
    outer:
      "h-[868px] w-[414px] shrink-0 rounded-[60px] bg-[#0b0b0b] p-[12px] shadow-[0_0_0_1.5px_#3a3a3a,0_50px_100px_-30px_rgb(0_0_0/0.5),0_20px_40px_-20px_rgb(0_0_0/0.35)]",
    inner: "rounded-[48px] [--app-bottom:1.75rem] [--app-top:3.25rem]",
    drawn: "block",
    status: "flex",
  },
} as const;

interface PhoneProps {
  fit: keyof typeof FIT;
  /** The time in the status bar, when the app runs on a demo clock ("21.40"). Default: the real time. */
  statusTime?: string;
  children: ReactNode;
}

export function Phone({ fit, statusTime, children }: PhoneProps) {
  const f = FIT[fit];
  return (
    <div className={f.outer}>
      <div className={`relative h-full overflow-hidden ${f.inner}`}>
        {children}
        <StatusBar time={statusTime} className={f.status} />
        <span aria-hidden="true" className={`pointer-events-none absolute top-[11px] left-1/2 z-50 h-[34px] w-[118px] -translate-x-1/2 rounded-full bg-black ${f.drawn}`} />
        <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 left-1/2 z-50 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-foreground ${f.drawn}`} />
      </div>
    </div>
  );
}

/** The phone's status bar: the time, signal, wifi and battery, in the app's foreground colour. */
function StatusBar({ time, className }: { time?: string; className: string }) {
  const now = useClock();
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 z-50 h-[3.25rem] items-center justify-between px-[34px] pt-1 text-foreground ${className}`}>
      <span className="w-[54px] text-center text-[16px] font-semibold tabular-nums tracking-tight">{time ?? now}</span>
      <span className="flex items-center gap-[6px]">
        <svg viewBox="0 0 18 12" className="h-[11px] w-[17px]" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="0.8" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
          <rect x="10" y="3" width="3" height="9" rx="0.8" />
          <rect x="15" y="0" width="3" height="12" rx="0.8" />
        </svg>
        <svg viewBox="0 0 16 12" className="h-[11px] w-[15px]" fill="currentColor">
          <path d="M8 2.2c2.4 0 4.6.9 6.2 2.5l1.3-1.3A10.6 10.6 0 0 0 8 .4C5.1.4 2.4 1.5.5 3.4l1.3 1.3A8.8 8.8 0 0 1 8 2.2Zm0 3.6c1.4 0 2.7.5 3.7 1.4L13 5.9A7.2 7.2 0 0 0 8 4a7.2 7.2 0 0 0-5 1.9l1.3 1.3c1-.9 2.3-1.4 3.7-1.4Zm0 3.5c.5 0 1 .2 1.3.5L8 11.6 6.7 9.8c.3-.3.8-.5 1.3-.5Z" />
        </svg>
        <svg viewBox="0 0 28 13" className="h-[13px] w-[27px]">
          <rect x="0.5" y="0.5" width="24" height="12" rx="3.8" fill="none" stroke="currentColor" strokeOpacity="0.4" />
          <rect x="2" y="2" width="18" height="9" rx="2.5" fill="currentColor" />
          <path d="M26 4.5v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2Z" fill="currentColor" fillOpacity="0.45" />
        </svg>
      </span>
    </div>
  );
}

/** The real time as the phone shows it, after the page has loaded (so the server's HTML doesn't disagree). */
function useClock() {
  const [now, setNow] = useState("");
  useEffect(() => {
    // As a phone's status bar writes it: 24-hour, no AM/PM, the locale's separator ("9:41", "9.41" in Danish).
    const format = new Intl.DateTimeFormat(APP.lang, { hour: "numeric", minute: "2-digit", hourCycle: "h23" });
    const tick = () => setNow(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 10_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}
