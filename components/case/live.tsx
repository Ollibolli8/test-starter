"use client";

// The app, running, inside a drawn phone or browser on the case page (app/case): not a screenshot. Each frame is the
// real app at its own address (/?s=<situation>), so every screen on the case is the product on its real data path,
// and a reviewer on a laptop can tap it right there.
//
// How it behaves:
// - Drawn at the device's real size (a 390 × 844 phone screen, a 1440 × 900 window) and scaled to the room it has,
//   so the app lays itself out exactly as on that device. The scale is CSS only: tan(atan2(a, b)) is a / b.
// - Loaded only near the screen and dropped again far from it, so a long case runs one or two apps at a time.
//   Until it's live, the frame shows the app's launch screen (its background and icon).
// - The page keeps scrolling over a frame: a wheel the app can't use itself (it has nothing left to scroll that way)
//   scrolls the case, so the page never gets stuck on a phone.
// - On a touch screen a phone inside a phone is too small to use, so the frame is a picture and a tap opens that
//   screen full size.
// - The phone's own app learns it's in a drawn phone from ?frame=phone (app/layout.tsx), and keeps clear of the drawn
//   notch and home bar.

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Phone } from "@/components/phone";
import { APP } from "@/lib/app";

interface LivePhoneProps {
  /** The app's address in this state: "/", "/?s=offline". */
  src: string;
  /** What it shows, for screen readers and the link on touch screens: "Thursday evening". */
  title: string;
  /** The status bar's time when the state runs on a demo clock ("21.40"). Default: the real time. */
  time?: string;
  /** Adds "Play it again" under the phone, which starts this screen over: for the one motion moment. */
  replay?: boolean;
  /** Load at once instead of near the screen: the hero. */
  eager?: boolean;
}

export function LivePhone({ src, title, time, replay = false, eager = false }: LivePhoneProps) {
  const [run, setRun] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4">
      <Scaled width={414} height={868} className="w-full">
        <Phone fit="always" statusTime={time}>
          <Live key={run} src={withParam(src, "frame", "phone")} open={src} title={title} eager={eager} />
        </Phone>
      </Scaled>
      {replay ? (
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-[14px] font-medium transition-colors duration-150 ease-out-soft hover:bg-foreground/[0.06] active:bg-foreground/10 pointer-coarse:hidden"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
            <path d="M3.5 8a4.5 4.5 0 1 0 1.4-3.3M3.5 2.5v2.4h2.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Play it again
        </button>
      ) : null}
    </div>
  );
}

interface LiveBrowserProps {
  /** The app's address: "/" for its desktop layout. */
  src: string;
  title: string;
}

/** The app in a desktop browser window, 1440 × 900, scaled to the column. */
export function LiveBrowser({ src, title }: LiveBrowserProps) {
  const host = APP.liveUrl ? APP.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : undefined;
  return (
    <Scaled width={1440} height={944} className="w-full">
      <div className="flex h-full flex-col overflow-hidden rounded-[18px] bg-raised shadow-[0_0_0_1.5px_var(--border),0_60px_120px_-40px_rgb(0_0_0/0.6)]">
        <div aria-hidden="true" className="relative flex h-11 shrink-0 items-center gap-2 border-b border-border px-5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-3 rounded-full bg-foreground/20" />
          ))}
          <span className="absolute left-1/2 flex h-7 w-[28rem] -translate-x-1/2 items-center justify-center rounded-lg bg-background/70 font-mono text-[13px] text-muted">
            <Host fallback={host} path={src} />
          </span>
        </div>
        <div className="relative min-h-0 flex-1">
          <Live src={src} open={src} title={title} />
        </div>
      </div>
    </Scaled>
  );
}

/** The address bar: the live link's host once there is one, else the host the case is opened on. */
function Host({ fallback, path }: { fallback?: string; path: string }) {
  const [here, setHere] = useState(fallback ?? "");
  useEffect(() => {
    if (fallback) return;
    const id = window.requestAnimationFrame(() => setHere(window.location.host));
    return () => window.cancelAnimationFrame(id);
  }, [fallback]);
  return (
    <>
      {here}
      {path === "/" ? "" : path}
    </>
  );
}

/** A box `width` × `height` px, drawn at that size and scaled to its column's width. */
function Scaled({ width, height, className = "", children }: { width: number; height: number; className?: string; children: ReactNode }) {
  return (
    <div className={`@container relative ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <div className="absolute top-0 left-0 origin-top-left" style={{ width, height, scale: `tan(atan2(100cqw, ${width}px))` }}>
        {children}
      </div>
    </div>
  );
}

/** The frame itself: the launch screen, then the app once it's near the screen. */
function Live({ src, open, title, eager = false }: { src: string; open: string; title: string; eager?: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [near, setNear] = useState(eager);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el || eager) return;
    // Live within a screen's height of the view, dropped beyond it.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setNear(entry.isIntersecting);
        if (!entry.isIntersecting) setReady(false);
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [eager]);

  // Shown once the app has loaded. The hero's frame is in the server's HTML and can finish loading before React is
  // listening, so a frame that's already loaded counts too. Every load (a reload inside it) gets the wheel again.
  useEffect(() => {
    const el = frame.current;
    if (!near || !el) return;
    const loaded = () => {
      followWheel(el);
      setReady(true);
    };
    el.addEventListener("load", loaded);
    const doc = el.contentDocument;
    const id = doc && doc.readyState === "complete" && doc.URL !== "about:blank" ? window.requestAnimationFrame(loaded) : 0;
    return () => {
      el.removeEventListener("load", loaded);
      window.cancelAnimationFrame(id);
    };
  }, [near]);

  return (
    <div ref={box} className="absolute inset-0 bg-background">
      {/* The launch screen, as the app shows it when opened from the home screen. */}
      <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- the app's own SVG icon, drawn at a fixed size */}
        <img src="/icon.svg" alt="" width={72} height={72} className="size-18 rounded-[16px] opacity-90" />
      </div>
      {near ? (
        <iframe
          ref={frame}
          src={src}
          title={`${title} (live)`}
          className={`absolute inset-0 size-full border-0 ${APP.scheme === "light" ? "[color-scheme:light]" : "[color-scheme:dark]"} transition-opacity duration-300 ease-out-soft pointer-coarse:pointer-events-none ${ready ? "opacity-100" : "opacity-0"}`}
        />
      ) : null}
      <a href={open} aria-label={`Open “${title}” full screen`} className="absolute inset-0 hidden pointer-coarse:block" />
    </div>
  );
}

/**
 * Lets the case scroll over a live frame. A wheel inside it goes to the app first (a list or a sheet that can still
 * scroll that way); when the app has nothing left to scroll, the case scrolls instead, where the browser would
 * otherwise stop (the app's own scroll areas use overscroll-behavior: contain, so they never hand it on).
 * The frame is the same site, so its window can be listened to directly.
 */
const following = new WeakSet<Window>();

function followWheel(frame: HTMLIFrameElement) {
  const win = frame.contentWindow;
  if (!win || following.has(win)) return;
  following.add(win);
  win.addEventListener(
    "wheel",
    (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
      if (scrollsInside(e.target, dy, win)) return;
      e.preventDefault();
      window.scrollBy({ top: dy, behavior: "instant" });
    },
    { passive: false },
  );
}

/** Whether something under the pointer in the frame can still scroll in this direction. */
function scrollsInside(target: EventTarget | null, dy: number, win: Window): boolean {
  // The target is from the frame's own window, so `instanceof Element` (this window's Element) would be false.
  let el = target as Element | null;
  while (el && el.nodeType === 1) {
    const overflow = win.getComputedStyle(el).overflowY;
    if ((overflow === "auto" || overflow === "scroll") && el.scrollHeight > el.clientHeight + 1) {
      if (dy > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 1 : el.scrollTop > 0) return true;
    }
    el = el.parentElement;
  }
  return false;
}

function withParam(src: string, key: string, value: string): string {
  const [path = "/", query = ""] = src.split("?");
  const params = new URLSearchParams(query);
  params.set(key, value);
  return `${path}?${params.toString()}`;
}
