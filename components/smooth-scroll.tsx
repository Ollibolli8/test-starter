"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";
import { cancelFrame, frame, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * The one switch. Smooth scroll suits a page you scroll through like a story.
 * Set it to false for tools, dashboards and forms, where native scroll is the right feel.
 */
export const SMOOTH_SCROLL = true;

/**
 * Lenis smooth scroll for mouse and trackpad. Touch keeps the phone's own scroll (Lenis leaves touch alone by default),
 * and it is off when the visitor has asked for reduced motion.
 * Lenis is driven from Motion's frame loop, so scroll-linked Motion animations and the scroll move in the same frame.
 * An element that scrolls on its own inside the page (a drawer, a long list) needs the data-lenis-prevent attribute.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  // Not on the case page: it's mostly live app frames (components/case/live.tsx), which take the wheel themselves,
  // and native scroll keeps the page and the frames in step.
  const onCase = usePathname().startsWith("/case");
  const enabled = SMOOTH_SCROLL && !reduce && !onCase;
  const lenis = useRef<LenisRef>(null);

  useEffect(() => {
    if (!enabled) return;
    function update({ timestamp }: { timestamp: number }) {
      lenis.current?.lenis?.raf(timestamp);
    }
    frame.update(update, true);
    return () => cancelFrame(update);
  }, [enabled]);

  if (!enabled) return children;

  // root: one Lenis for the whole page, with no wrapper element, so the HTML is the same with it on or off.
  return (
    <ReactLenis root ref={lenis} options={{ autoRaf: false, anchors: true }}>
      {children}
    </ReactLenis>
  );
}
