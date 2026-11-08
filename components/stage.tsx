"use client";

// The presentation, at /stage: what Olle shares on screen while he presents. On a desktop, the app running in a phone
// in the middle, the live link and QR code on the left so the room can open it, and every situation it handles on the
// right, switched live, so every state of the real app is one click away. No pitch beside it: Olle says the idea, the
// README writes it down. The link handed in is / (components/app-page.tsx), the app on its own. On a phone /stage is
// just the app. The columns can be in the studio's language while the app stays in the brief's (lang).
//
// The app inside lays itself out on the phone's screen, not the window: use `absolute`, never `fixed`, and the
// --app-top / --app-bottom insets for the notch and the home bar (components/app-shell.tsx does both).

import { useEffect, useState, type ReactNode } from "react";
import { OnStage } from "@/components/on-stage";
import { OpenOnPhone } from "@/components/open-on-phone";
import type { Situation } from "@/lib/situations";
import { APP } from "@/lib/app";

interface StageProps {
  /** The right column: the situations and any demo controls. Use <SituationList>. */
  controls: ReactNode;
  /** The language of the two columns, if it isn't the app's: "en" for a Danish app shown to an English studio. */
  lang?: string;
  /** The time in the phone's status bar, when the app runs on a demo clock ("21.40"). Default: the real time. */
  statusTime?: string;
  children: ReactNode;
}

export function Stage({ controls, lang, statusTime, children }: StageProps) {
  return (
    <OnStage value={true}>
      <div className="min-h-dvh bg-background lg:grid lg:h-dvh lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)] lg:items-center lg:gap-10 lg:overflow-hidden lg:px-8 xl:gap-16 xl:px-14">
        {/* Each side scrolls on its own on a short screen, so the phone always stays whole and centred. */}
        <aside data-beside lang={lang} aria-label="Open it on your phone" className="hidden h-dvh justify-self-end overflow-y-auto lg:flex lg:flex-col lg:py-8">
          <div className="my-auto">
            <OpenOnPhone title="Try it on your phone" large />
          </div>
        </aside>
        <Device statusTime={statusTime}>{children}</Device>
        <aside data-beside lang={lang} aria-label="Situations" className="hidden h-dvh justify-self-start overflow-y-auto lg:flex lg:max-w-[20rem] lg:flex-col lg:px-3 lg:py-8">
          <div className="my-auto">{controls}</div>
        </aside>
      </div>
    </OnStage>
  );
}

/**
 * Full screen on a phone; centred on a tablet; an iPhone on a desktop (a 390 × 844 screen, the width every check uses,
 * in a 12 px bezel), with a status bar, the island and the home indicator. On a short window the phone keeps its real size
 * and scales down to fit (.device-fit in globals.css), so the app inside is laid out exactly as on the phone.
 */
function Device({ statusTime, children }: { statusTime?: string; children: ReactNode }) {
  return (
    <div className="device-fit mx-auto h-dvh w-full sm:max-w-[30rem] lg:h-[868px] lg:w-[414px] lg:max-w-none lg:rounded-[60px] lg:bg-[#0b0b0b] lg:p-[12px] lg:shadow-[0_0_0_1.5px_#3a3a3a,0_50px_100px_-30px_rgb(0_0_0/0.5),0_20px_40px_-20px_rgb(0_0_0/0.35)]">
      <div className="relative h-full overflow-hidden [--app-bottom:env(safe-area-inset-bottom)] [--app-top:env(safe-area-inset-top)] lg:rounded-[48px] lg:[--app-bottom:1.75rem] lg:[--app-top:3.25rem]">
        {children}
        <StatusBar time={statusTime} />
        <span aria-hidden="true" className="pointer-events-none absolute top-[11px] left-1/2 z-50 hidden h-[34px] w-[118px] -translate-x-1/2 rounded-full bg-black lg:block" />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-2 left-1/2 z-50 hidden h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-foreground lg:block" />
      </div>
    </div>
  );
}

/** The phone's status bar on the stage: the time, signal, wifi and battery, in the app's foreground colour. */
function StatusBar({ time }: { time?: string }) {
  const now = useClock();
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-50 hidden h-[3.25rem] items-center justify-between px-[34px] pt-1 text-foreground lg:flex">
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

/** The right column: every situation as a button; the chosen one's note says what the person sees and can do. */
export function SituationList<Id extends string>({
  situations,
  value,
  onChange,
  title = "Try a situation",
}: {
  situations: readonly Situation<Id>[];
  value: Id;
  onChange: (id: Id) => void;
  title?: string;
}) {
  const active = situations.find((s) => s.id === value);
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-mono text-label text-muted uppercase">{title}</h2>
      <div className="-mx-3 flex flex-col gap-1">
        {situations.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={s.id === value}
            onClick={() => onChange(s.id)}
            className="group flex min-h-10 items-center gap-3 rounded-xl px-3 text-left text-[15px] transition-colors duration-150 ease-out-soft hover:bg-foreground/5 aria-pressed:bg-raised aria-pressed:font-medium aria-pressed:shadow-[0_1px_2px_rgb(0_0_0/0.06),0_0_0_1px_var(--border)] forced-colors:aria-pressed:bg-[Highlight] forced-colors:aria-pressed:text-[HighlightText] forced-colors:aria-pressed:forced-color-adjust-none"
          >
            <span aria-hidden="true" className="size-2 rounded-full bg-foreground/15 group-aria-pressed:bg-foreground" />
            {s.label}
          </button>
        ))}
      </div>
      {active ? (
        <p aria-live="polite" className="text-[14px] leading-snug text-muted">
          {active.note}
        </p>
      ) : null}
    </section>
  );
}
