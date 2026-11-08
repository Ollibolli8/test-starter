"use client";

// A number that counts to its value: for the one motion moment, when the answer arrives or changes ("6 t" counting
// up as the run swings into place). Screen readers get the final value at once; the counting is hidden from them.
// With reduced motion it shows the final value straight away.

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect } from "react";
import { duration as durations, ease } from "@/lib/motion";

interface CountUpProps {
  value: number;
  /** How a value is written: whole numbers by default. Pass the brief's own format ("1,84 kr"). */
  format?: (n: number) => string;
  /** Where the first count starts. Later changes count from the value shown. */
  from?: number;
  /** Seconds. Default: the slow token (0.6 s). */
  duration?: number;
  className?: string;
}

export function CountUp({ value, format = (n) => Math.round(n).toString(), from = 0, duration = durations.slow, className }: CountUpProps) {
  const reduce = useReducedMotion();
  const shown = useMotionValue(reduce ? value : from);
  const text = useTransform(shown, (n) => format(n));

  useEffect(() => {
    if (reduce) {
      shown.set(value);
      return;
    }
    const controls = animate(shown, value, { duration, ease });
    return () => controls.stop();
  }, [value, reduce, duration, shown]);

  return (
    <span className={className}>
      <motion.span aria-hidden="true">{text}</motion.span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
}
