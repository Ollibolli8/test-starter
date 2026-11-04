"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { duration, ease, rise } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Seconds before it starts. For a list, pass index × 0.06. */
  delay?: number;
};

/**
 * Fades and lifts its content in the first time it scrolls into view.
 * With reduced motion on, MotionConfig (components/providers.tsx) drops the lift and keeps the fade.
 * Without JavaScript, the <noscript> rule in app/layout.tsx shows it straight away.
 */
export function Reveal({ delay = 0, children, ...rest }: RevealProps) {
  return (
    <motion.div
      data-reveal=""
      initial={{ opacity: 0, y: rise }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: duration.slow, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
