"use client";

import { motion, useScroll } from "motion/react";

/** A hairline across the top that fills as the page is read. The useScroll pattern, kept to a transform. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-10 h-0.5 origin-left bg-foreground"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
