"use client";

// The app's frame: a header under the notch, one scrolling screen, a bar at the bottom where the thumb is, and a
// layer for sheets. The bar floats over the screen in glass, so the content passes under it and stays in view.
// It lays out on the phone's screen (the stage's device on a desktop), so everything is `absolute`, never `fixed`,
// and keeps clear of the notch and the home bar through --app-top and --app-bottom (set by components/stage.tsx).

import { useEffect, useRef, type ReactNode } from "react";

interface AppShellProps {
  /** Under the notch: the app's name or the current place, small. Leave it out for a full-bleed first screen. */
  header?: ReactNode;
  /** The floating bar at the bottom: tabs, the main action or a switch. Wrap its content in `glass`. */
  bar?: ReactNode;
  /** Sheets and anything else that sits over the whole screen (components/sheet.tsx). */
  overlay?: ReactNode;
  /** The screen's content. It scrolls on its own, and keeps clear of the bar at the bottom. */
  children: ReactNode;
}

export function AppShell({ header, bar, overlay, children }: AppShellProps) {
  const shell = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // The screen's bottom padding follows the bar's real height, so the last line of content can scroll clear of it.
  useEffect(() => {
    const el = barRef.current;
    const root = shell.current;
    if (!el || !root) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) root.style.setProperty("--bar-h", `${entry.borderBoxSize[0]?.blockSize ?? el.offsetHeight}px`);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={shell} className="relative isolate flex h-full flex-col overflow-hidden bg-background">
      {header ? (
        <header data-behind-sheet className="relative z-10 shrink-0 px-5 pt-[calc(var(--app-top,0px)+0.75rem)] pb-2">
          {header}
        </header>
      ) : null}
      <main
        data-behind-sheet
        data-lenis-prevent
        className={`min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain pb-[calc(var(--bar-h,0px)+1rem)] ${header ? "" : "pt-[var(--app-top,0px)]"}`}
      >
        {children}
      </main>
      {bar ? (
        <div
          ref={barRef}
          data-behind-sheet
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-3 pb-[max(0.75rem,var(--app-bottom,0px))] [&>*]:pointer-events-auto"
        >
          {bar}
        </div>
      ) : null}
      {overlay}
    </div>
  );
}
