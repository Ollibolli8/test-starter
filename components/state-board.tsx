// The states board, at /states: every situation the app handles (lib/situations.ts), each running live in its own
// phone, all on one page. /stage shows one situation at a time while Olle talks; this shows them all at once: the
// app's range at a glance in the presentation, and every state in one screenshot for "Look at it before showing it"
// (AGENTS.md). Each phone is the real app at /?s=<situation> (components/case/live.tsx), never a drawing of it, so
// the board can't fall behind the app. A phone loads when it's near the screen; on a touch screen a tap opens that
// situation full size. Under each: the situation's name and its note, as on the stage.
// It stays at hand-in (noindex), like /looks.

import { LivePhone } from "@/components/case/live";
import type { Situation } from "@/lib/situations";

interface StateBoardProps<Id extends string> {
  /** A line over the board: the brief in a few words. */
  title: string;
  /** Every situation, in the order of the person's day. The first is the app's own address, /. */
  situations: readonly Situation<Id>[];
  /** The status bar's time for the situations that run on a demo clock: { "clock-change": "02.10" }. */
  times?: Partial<Record<Id, string>>;
  /** The board's language, if it isn't the app's ("en" for a Danish app shown to an English studio). */
  lang?: string;
}

export function StateBoard<Id extends string>({ title, situations, times, lang }: StateBoardProps<Id>) {
  const first = situations[0]?.id;
  return (
    <main lang={lang} className="min-h-dvh px-4 py-8 sm:px-8 lg:px-12">
      <header className="mb-8 flex flex-col gap-2">
        <p className="font-mono text-label text-muted uppercase">States</p>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      </header>
      {/* Two across on a phone; on a desktop as many as fit at about 200 px each, so a dozen situations show in two rows. */}
      <ol className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] lg:gap-x-6">
        {situations.map((s) => (
          <li key={s.id} className="flex flex-col gap-3">
            <LivePhone src={s.id === first ? "/" : `/?s=${s.id}`} title={s.label} time={times?.[s.id]} />
            <div className="flex flex-col gap-1 text-[14px] leading-snug">
              <h2 className="text-[15px] font-semibold">{s.label}</h2>
              <p className="text-muted">{s.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
