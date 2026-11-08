"use client";

// The presentation, at /stage: what Olle shares on screen while he presents. On a desktop, the app running in a phone
// in the middle, the live link and QR code on the left so the room can open it, and every situation it handles on the
// right, switched live, so every state of the real app is one click away. No pitch beside it: Olle says the idea, the
// README writes it down. The link handed in is / (components/app-page.tsx), the app on its own. On a phone /stage is
// just the app. The columns can be in the studio's language while the app stays in the brief's (lang).
//
// The app inside lays itself out on the phone's screen, not the window: use `absolute`, never `fixed`, and the
// --app-top / --app-bottom insets for the notch and the home bar (components/app-shell.tsx does both).

import type { ReactNode } from "react";
import { OnStage } from "@/components/on-stage";
import { OpenOnPhone } from "@/components/open-on-phone";
import { Phone } from "@/components/phone";
import type { Situation } from "@/lib/situations";

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
        <Phone fit="desktop" statusTime={statusTime}>
          {children}
        </Phone>
        <aside data-beside lang={lang} aria-label="Situations" className="hidden h-dvh justify-self-start overflow-y-auto lg:flex lg:max-w-[20rem] lg:flex-col lg:px-3 lg:py-8">
          <div className="my-auto">{controls}</div>
        </aside>
      </div>
    </OnStage>
  );
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
