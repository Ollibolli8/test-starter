// The looks board, at /looks: the three first screens found with .claude/skills/look/SKILL.md, side by side in phones,
// so Olle picks a look from real screens instead of sentences. Each phone runs its look live (its motion moment
// too). Under each, the rung, the name and four short lines: the idea, how it's touched, the fact about the person
// it answers, and what it risks. On a desktop the three phones scale together to fit the window (.look-fit in
// globals.css); on a phone they stack, each at the screen's width.
// It stays after the pick (noindex): in the presentation it shows the look was chosen, not defaulted to.

import type { ReactNode } from "react";
import { Phone } from "@/components/phone";
import { APP } from "@/lib/app";

export interface Look {
  id: string;
  /** Crafted: a familiar pattern done better than the trade does it. Bold: one strong idea from outside apps. Wild: the furthest seed that still works. */
  rung: "Crafted" | "Bold" | "Wild";
  name: string;
  /** The idea in one line: the form, and where it comes from. */
  idea: string;
  /** How the person touches it. */
  touch: string;
  /** The fact about the person it answers. */
  because: string;
  /** What it risks, and how the build would guard against it. */
  risk: string;
  /** The look's first screen, as the app would show it. */
  screen: ReactNode;
}

interface LookBoardProps {
  /** A line over the board: the brief in a few words. */
  title: string;
  looks: readonly Look[];
  /** The id of the recommended look, marked on the board. */
  recommended?: string;
  /** The time in the phones' status bars, when the looks run on the brief's demo clock ("21.40"). */
  statusTime?: string;
  /** The board's language, if it isn't the app's ("en" for a Danish app shown to an English studio). */
  lang?: string;
}

export function LookBoard({ title, looks, recommended, statusTime, lang }: LookBoardProps) {
  return (
    <main lang={lang} className="min-h-dvh px-4 py-8 sm:px-8 lg:px-12">
      <header className="mb-8 flex flex-col gap-2">
        <p className="font-mono text-label text-muted uppercase">Looks</p>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      </header>
      <ol className="flex flex-col items-center gap-14 lg:flex-row lg:items-start lg:justify-center lg:gap-10">
        {looks.map((look) => (
          <li key={look.id} className="grid w-min gap-4">
            <div className="look-fit">
              <Phone fit="always" statusTime={statusTime}>
                <div lang={APP.lang} className="h-full">
                  {look.screen}
                </div>
              </Phone>
            </div>
            <div className="flex flex-col gap-1.5 text-[14px] leading-snug">
              <p className="font-mono text-label text-muted uppercase">
                {look.rung}
                {look.id === recommended ? " · recommended" : ""}
              </p>
              <h2 className="text-[17px] font-semibold">{look.name}</h2>
              <p>{look.idea}</p>
              <p className="text-muted">
                <span className="text-foreground">Touch:</span> {look.touch}
              </p>
              <p className="text-muted">
                <span className="text-foreground">Because:</span> {look.because}
              </p>
              <p className="text-muted">
                <span className="text-foreground">Risk:</span> {look.risk}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
