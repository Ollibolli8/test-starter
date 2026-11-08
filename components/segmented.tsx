"use client";

// One choice out of a few, as an app's tabs or a switch: a glass track with a solid pill that slides to the choice.
// Native radio buttons underneath, so arrow keys, forms and screen readers work as they should. The pill's slide is
// feedback to the press (a spring, 0.3 s); with reduced motion it jumps.

import { motion } from "motion/react";
import { useId, type ReactNode } from "react";

export interface SegmentedOption<V extends string> {
  value: V;
  label: ReactNode;
  /** A second line under the label: each tab's own answer in a few words ("start 23.15"). */
  hint?: ReactNode;
  /** An icon before the label. */
  icon?: ReactNode;
}

interface SegmentedProps<V extends string> {
  /** What the choice is, for screen readers: "Machine". */
  legend: string;
  options: readonly SegmentedOption<V>[];
  value: V;
  onChange: (value: V) => void;
  /** `glass` for a bar over content (the default), `plain` for a switch on a solid background. */
  surface?: "glass" | "plain";
  className?: string;
}

export function Segmented<V extends string>({ legend, options, value, onChange, surface = "glass", className = "" }: SegmentedProps<V>) {
  const name = useId();
  // Labels sit on the track, so the glass is the strong kind (4.5:1 over anything under it).
  const track = surface === "glass" ? "glass-strong" : "bg-foreground/[0.06]";
  return (
    <fieldset className={`flex rounded-[26px] p-1 ${track} ${className}`}>
      <legend className="sr-only">{legend}</legend>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <label
            key={option.value}
            className="relative flex min-h-12 flex-1 cursor-pointer select-none items-center justify-center gap-2.5 rounded-[22px] px-3 transition-transform duration-150 ease-out-soft active:scale-[0.97] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-foreground motion-reduce:transition-none"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={active}
              onChange={() => onChange(option.value)}
              className="sr-only forced-colors:not-sr-only"
            />
            {active ? (
              <motion.span
                layoutId={`${name}-pill`}
                aria-hidden="true"
                className="absolute inset-0 rounded-[22px] bg-foreground shadow-[0_4px_14px_-6px_rgb(0_0_0/0.45)] forced-colors:hidden"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            ) : null}
            {option.icon ? (
              <span aria-hidden="true" className={`relative shrink-0 transition-colors duration-150 ${active ? "text-background" : "text-foreground"}`}>
                {option.icon}
              </span>
            ) : null}
            <span className="relative flex min-w-0 flex-col leading-tight">
              <span className={`text-[15px] font-semibold transition-colors duration-150 ${active ? "text-background" : "text-foreground"}`}>{option.label}</span>
              {option.hint ? (
                <span className={`text-[13px] tabular-nums transition-colors duration-150 ${active ? "text-background/75" : "text-muted"}`}>{option.hint}</span>
              ) : null}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
