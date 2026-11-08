"use client";

// An example app, to show the pieces working together: the first screen as the hero (the answer in display type
// over a signature form), a glass bar at the thumb, a sheet, and every situation switchable, from the sheet at / and
// beside the phone at /stage. Delete this file once the brief's app replaces it (app/page.tsx and
// app/stage/page.tsx import it).

import { useState, type ReactNode } from "react";
import { AppPage } from "@/components/app-page";
import { AppShell } from "@/components/app-shell";
import { CountUp } from "@/components/count-up";
import { Segmented } from "@/components/segmented";
import { Sheet } from "@/components/sheet";
import { useOnStage } from "@/components/on-stage";
import { SituationList, Stage } from "@/components/stage";
import { useSituation, type Situation } from "@/lib/situations";

type SituationId = "ready" | "loading" | "empty" | "error" | "offline";

const situations: readonly Situation<SituationId>[] = [
  {
    id: "ready",
    label: "Ready",
    note: "The answer, as the person sees it most days.",
  },
  {
    id: "loading",
    label: "Loading",
    note: "The frame is there at once; the answer fills in.",
  },
  {
    id: "empty",
    label: "Nothing yet",
    note: "Says when there will be something, and what to do meanwhile.",
  },
  {
    id: "error",
    label: "Can't load",
    note: "Says what failed in plain words, with one way to try again.",
  },
  {
    id: "offline",
    label: "Offline, old data",
    note: "Shows the last answer and how old it is.",
  },
];

type Tab = "first" | "second";

/** The app at / (on its own) or at /stage (in the phone, with the situations beside it). */
export function ExampleApp({ stage = false }: { stage?: boolean }) {
  const [situation, setSituation] = useSituation(situations);
  const list = (
    <SituationList
      situations={situations}
      value={situation.id}
      onChange={setSituation}
    />
  );
  if (!stage)
    return (
      <AppPage>
        <ExampleScreen situation={situation.id} list={list} />
      </AppPage>
    );
  return (
    <Stage controls={list}>
      <ExampleScreen situation={situation.id} list={list} />
    </Stage>
  );
}

function ExampleScreen({
  situation,
  list,
}: {
  situation: SituationId;
  list: ReactNode;
}) {
  const [tab, setTab] = useState<Tab>("first");
  const [sheet, setSheet] = useState(false);
  // In the stage's phone on a desktop the situations are beside it, so the sheet leaves them out there.
  const onStage = useOnStage();

  return (
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
              <circle
                cx="10"
                cy="10"
                r="7.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M10 9v5M10 6.2v.1"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
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
        <Sheet
          open={sheet}
          onClose={() => setSheet(false)}
          title="About the answer"
        >
          <p className="text-muted">
            Where the answer comes from, how old it is, and what it assumes.
            Everything the first screen leaves out.
          </p>
          <div className={onStage ? "mt-8 lg:hidden" : "mt-8"}>{list}</div>
        </Sheet>
      }
    >
      <div className="flex flex-col gap-6 px-5 pt-4">
        <h1 className="sr-only">Starter</h1>
        <Answer situation={situation} tab={tab} />
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
            <li
              key={label}
              className="flex min-h-12 items-center justify-between gap-4"
            >
              <span className="text-muted">{label}</span>
              <span className="text-right font-medium tabular-nums">
                {value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
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
