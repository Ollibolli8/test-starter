"use client";

// A bottom sheet inside the app (not the browser window), so it stays in the phone on the desktop stage. Pass it to
// <AppShell overlay={…}>. It is glass, so the screen it came from stays in view behind it.
// While it's open everything behind it is inert (the app's screen, header and bar, and the stage's columns);
// Escape, the backdrop and the close button shut it, and focus goes back to whatever opened it. A drag down on the
// handle closes it too, as on an iPhone.

import { AnimatePresence, motion, useDragControls } from "motion/react";
import { useEffect, useId, useRef, type ReactNode } from "react";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** The close button's name for screen readers, in the app's language: "Luk" for a Danish app. */
  closeLabel?: string;
  children: ReactNode;
}

export function Sheet({ open, onClose, title, closeLabel = "Close", children }: SheetProps) {
  const titleId = useId();
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const drag = useDragControls();

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    panel.current?.focus();
    const behind = Array.from(document.querySelectorAll<HTMLElement>("[data-beside], [data-behind-sheet]"));
    behind.forEach((el) => {
      el.inert = true;
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      behind.forEach((el) => {
        el.inert = false;
      });
      if (opener.current instanceof HTMLElement) opener.current.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="absolute inset-0 z-40 flex flex-col justify-end">
          <motion.div
            className="absolute inset-0 bg-black/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="glass-strong relative mx-2 mb-2 flex max-h-[88%] flex-col rounded-[40px] outline-none"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            exit={{ y: "110%" }}
            transition={{ type: "spring", stiffness: 380, damping: 40 }}
            drag="y"
            dragControls={drag}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 1 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80 || info.velocity.y > 500) onClose();
            }}
          >
            {/* Only the handle row starts a drag, so the sheet's content can still scroll. */}
            <div
              className="flex shrink-0 cursor-grab touch-none flex-col items-center px-5 pt-2.5 pb-2 active:cursor-grabbing"
              onPointerDown={(e) => drag.start(e)}
            >
              <span aria-hidden="true" className="h-1.5 w-10 rounded-full bg-foreground/20" />
              <div className="mt-2 flex w-full items-center justify-between gap-4">
                <h2 id={titleId} className="text-xl font-semibold tracking-tight">
                  {title}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="-mr-2 flex size-11 items-center justify-center rounded-full text-muted transition-colors duration-150 ease-out-soft hover:bg-foreground/5 hover:text-foreground"
                >
                  <span className="sr-only">{closeLabel}</span>
                  <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
                    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="min-h-0 overflow-y-auto overscroll-contain px-5 pb-[max(1.25rem,calc(var(--app-bottom,0px)-0.5rem))]" data-lenis-prevent>
              {children}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
