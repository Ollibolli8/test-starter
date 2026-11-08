"use client";

import { useState } from "react";
import { CountUp } from "@/components/count-up";
import { Segmented } from "@/components/segmented";

/** Glass over colour, the segmented control and a count-up: tune the glass tokens here, in the dark theme. */
export function GlassExample() {
  const [value, setValue] = useState<"a" | "b">("a");
  return (
    <section aria-labelledby="glass" className="flex flex-col gap-6 border-t border-border pt-8">
      <h2 id="glass" className="text-2xl font-semibold tracking-tight">
        Glass
      </h2>
      <p className="max-w-prose text-muted">
        For chrome over moving content only: a bar, a sheet, a floating button. <code className="font-mono text-sm">glass-strong</code> when it
        carries text.
      </p>
      <div className="relative isolate flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[32px] p-4 sm:aspect-[16/9]">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[conic-gradient(from_200deg,#2f6df0,#7a5cff,#f0611d,#f5b700,#2f6df0)]" />
        <div className="flex justify-between">
          <span className="glass flex size-11 items-center justify-center rounded-full font-mono text-sm">gl</span>
          <span className="glass-strong flex min-h-11 items-center rounded-full px-4 text-sm font-medium">
            <CountUp value={value === "a" ? 42 : 117} />
            &nbsp;kr · glass-strong
          </span>
        </div>
        <Segmented
          legend="Example"
          value={value}
          onChange={setValue}
          options={[
            { value: "a", label: "First", hint: "42 kr" },
            { value: "b", label: "Second", hint: "117 kr" },
          ]}
        />
      </div>
    </section>
  );
}
