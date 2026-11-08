"use client";

// An example app on the stage, to show the pieces working together: the first screen as the hero (the answer in
// display type over a signature form), a glass bar at the thumb, a sheet, and every situation switchable from the
// stage. Delete this file once the brief's app replaces it (app/page.tsx imports it).

import { useState, type ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { CountUp } from "@/components/count-up";
import { Segmented } from "@/components/segmented";
import { Sheet } from "@/components/sheet";
import { SituationList, Stage, StageStory, StoryPoint } from "@/components/stage";
import { useSituation, type Situation } from "@/lib/situations";

type SituationId = "ready" | "loading" | "empty" | "error" | "offline";

const situations: readonly Situation<SituationId>[] = [
  { id: "ready", label: "Ready", note: "The answer, as the person sees it most days." },
  { id: "loading", label: "Loading", note: "The frame is there at once; the answer fills in." },
  { id: "empty", label: "Nothing yet", note: "Says when there will be something, and what to do meanwhile." },
  { id: "error", label: "Can't load", note: "Says what failed in plain words, with one way to try again." },
  { id: "offline", label: "Offline, old data", note: "Shows the last answer and how old it is." },
];

type Tab = "first" | "second";

export function ExampleApp() {
  const [situation, setSituation] = useSituation(situations);
  const [tab, setTab] = useState<Tab>("first");
  const [sheet, setSheet] = useState(false);

  return (
    <Stage story={<ExampleStory />} controls={<SituationList situations={situations} value={situation.id} onChange={setSituation} />}>
      <AppShell
        header={
          <div className="flex items-center justify-between">
            <p className="font-mono text-label text-muted uppercase">Starter</p>
            <button
              type="button"
              onClick={() => setSheet(true)}
              className="glass flex size-11 items-center justify-center rounded-full transition-transform duration-150 ease-out-soft active:scale-95"
            >
              <span className="sr-only">About the answer</span>
              <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
                <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M10 9v5M10 6.2v.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        }
        bar={
          <Segmented
            legend="View"
            value={tab}
            onChange={setTab}
            options={[
              { value: "first", label: "First", hint: "its answer" },
              { value: "second", label: "Second", hint: "its answer" },
            ]}
          />
        }
        overlay={
          <Sheet open={sheet} onClose={() => setSheet(false)} title="About the answer">
            <p className="text-muted">Where the answer comes from, how old it is, and what it assumes. Everything the first screen leaves out.</p>
          </Sheet>
        }
      >
        <div className="flex flex-col gap-6 px-5 pt-4">
          <h1 className="sr-only">Starter</h1>
          <Answer situation={situation.id} tab={tab} />
          {/* The signature form: the person's own world, holding the data (a machine's display, a ticket, a gauge). */}
          <div
            aria-hidden="true"
            className="aspect-square w-full rounded-[40px] bg-[conic-gradient(from_200deg,#2f6df0,#7a5cff,#f0611d,#f5b700,#2f6df0)] opacity-90"
          />
          <ul className="flex flex-col divide-y divide-border">
            {/* Each number with a unit, a comparison and a verdict. */}
            {[
              ["Cost", "12 kr · 40 % under usual"],
              ["Time", "2 t 10 min · as always"],
            ].map(([label, value]) => (
              <li key={label} className="flex min-h-12 items-center justify-between gap-4">
                <span className="text-muted">{label}</span>
                <span className="text-right font-medium tabular-nums">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </AppShell>
    </Stage>
  );
}

function Answer({ situation, tab }: { situation: SituationId; tab: Tab }) {
  const text: Record<SituationId, ReactNode> = {
    ready: (
      <>
        The answer, in <CountUp value={tab === "first" ? 6 : 9} /> words
      </>
    ),
    loading: <span className="text-muted">Finding the answer…</span>,
    empty: "Nothing to show until 13.00",
    error: "Couldn't load the answer",
    offline: "The answer from 08.40",
  };
  return (
    <p role="status" className="text-display font-semibold">
      {text[situation]}
    </p>
  );
}

export function ExampleStory() {
  return (
    <StageStory kicker="Starter · the brief goes here" title="The person's question, as the headline" lead="One paragraph: who it's for, the moment they use it, and what it does that the alternative doesn't.">
      <StoryPoint n="01" title="The first point">
        What the app does first, in one line.
      </StoryPoint>
      <StoryPoint n="02" title="The second point">
        The signature form, and why it fits the person.
      </StoryPoint>
      <StoryPoint n="03" title="The third point">
        How it handles the hard states.
      </StoryPoint>
    </StageStory>
  );
}
