"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/smooth-scroll";
import { duration, ease } from "@/lib/motion";

/**
 * Everything that wraps the whole app, in one place.
 * reducedMotion="user": for visitors who ask for reduced motion, Motion turns off movement
 * (transforms, layout) and keeps fades and colour changes.
 * For a shop brief, add <CartProvider> from lib/cart/cart-context.tsx here.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: duration.base, ease }}>
      <SmoothScroll>{children}</SmoothScroll>
    </MotionConfig>
  );
}
