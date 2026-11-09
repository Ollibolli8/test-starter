"use client";

// The app's own components, live, for the case's Components section (app/case/content.tsx → parts). Import the real
// component and give it the state that shows it best; never redraw one for the case, so what the studio sees is
// what the app uses. A part that changes state (a toggle, a stamp landing) gets its own small control.
// These are the example app's pieces; replace them with the brief's.

import { useState } from "react";
import { CountUp } from "@/components/count-up";
import { Segmented } from "@/components/segmented";

export function TabsPart() {
  const [tab, setTab] = useState<"first" | "second">("first");
  return (
    <div className="w-full max-w-[22rem]">
      <Segmented
        legend="View"
        value={tab}
        onChange={setTab}
        surface="plain"
        options={[
          { value: "first", label: "First", hint: "its answer" },
          { value: "second", label: "Second", hint: "its answer" },
        ]}
      />
    </div>
  );
}

export function CountPart() {
  const [value, setValue] = useState(6);
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-display font-semibold tabular-nums">
        <CountUp value={value} /> words
      </p>
      <button
        type="button"
        onClick={() => setValue((v) => (v === 6 ? 9 : 6))}
        className="glass flex min-h-11 items-center rounded-full px-5 text-[15px] font-medium transition-transform duration-150 ease-out-soft active:scale-95"
      >
        Count again
      </button>
    </div>
  );
}

export function GlassPart() {
  return (
    <div className="relative grid size-full place-items-center overflow-hidden rounded-[28px] bg-[conic-gradient(from_200deg,#2f6df0,#7a5cff,#f0611d,#f5b700,#2f6df0)]">
      <span className="glass-strong flex min-h-12 items-center rounded-full px-6 text-[15px] font-medium">Glass, over moving colour</span>
    </div>
  );
}
