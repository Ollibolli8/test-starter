// The case page's sections (app/case), in the order a studio presents a product case: the title, the product
// running, the facts, the identity (mark, app icon, type, colour), the screens, the details, the components, the
// desktop, the credits. Each section is one component; app/case/page.tsx stacks them and app/case/content.tsx holds
// everything that's said. To scale the case to the brief, delete a section's line in page.tsx: the numbers follow.
//
// What the case shows is the build itself, never a picture of it: the phones run the app (components/case/live.tsx),
// the colours are read from app/globals.css as it's built, the type is set in the app's own fonts, and the
// components are the app's own, rendered live.

import { readFileSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { ReactNode } from "react";
import { LiveBrowser, LivePhone } from "@/components/case/live";
import { Reveal } from "@/components/reveal";
import { APP } from "@/lib/app";
import { contrast, parseHex, ratio, readTokens } from "@/lib/colour";

/** One state of the app, as the case shows it in a phone. */
export interface Screen {
  /** The app's address in that state: "/" or "/?s=offline" (lib/situations.ts). */
  src: string;
  /** The situation's name, in the case's language: "Thursday evening". */
  label: string;
  /** One line: what the person sees and can do there. */
  note?: string;
  /** The status bar's time, when the state runs on a demo clock: "21.40". */
  time?: string;
}

export interface Detail {
  screen: Screen;
  /** The person's moment, said as they'd live it: "Emptied at 6.40, still at the curb at 7.30". */
  moment: string;
  /** The fact of the reality it lives in, with its source. */
  reality: string;
  /** What the app does about it. */
  does: string;
  /** Where to check it: the situation, the rule's file and test. */
  proof: string;
  /** For the one motion moment: "Play it again" under the phone. */
  replay?: boolean;
}

export interface Face {
  /** The family's name: "Newsreader". */
  family: string;
  /** Its job, in the person's terms: "What the page says, never under 17 px". */
  role: string;
  /** The Tailwind class that sets it in the app: "font-serif". */
  className: string;
  /** A few characters from the app, set big: "Aa", or the app's own "12". */
  sample: string;
}

export interface Colour {
  /** The token in app/globals.css: "--paper". */
  token: string;
  /** Its name in the case: "Paper". */
  name: string;
  /** For a text colour, the token it's read on; the case shows the pair and its contrast. */
  on?: string;
}

export interface Part {
  name: string;
  /** The app's own component, live (from app/case/parts.tsx). */
  node: ReactNode;
  /** The tile's surface class when the part sits on something other than raised: "bg-paper". */
  surface?: string;
  /** Two columns wide on a desktop. */
  wide?: boolean;
}

/* ———————————————————————————————————————— Page ———————————————————————————————————————— */

/** The page: the case's language (the app inside keeps its own), the section counter, the width. */
export function CasePage({ lang, children }: { lang: string; children: ReactNode }) {
  return (
    <div lang={lang} className="mx-auto w-full max-w-[90rem] px-4 [counter-reset:case] sm:px-6 lg:px-10">
      {children}
    </div>
  );
}

const LINKS = [
  { href: "/", label: "The app" },
  { href: "/stage", label: "Stage" },
  { href: "/looks", label: "Looks" },
] as const;

export function CaseHeader() {
  return (
    <header className="flex h-16 items-center justify-between gap-4">
      <Link href="/" className="-mx-2 flex min-h-11 items-center gap-2.5 rounded-lg px-2 text-[15px] font-medium">
        {/* eslint-disable-next-line @next/next/no-img-element -- the app's own SVG icon */}
        <img src="/icon.svg" alt="" width={22} height={22} className="size-[22px] rounded-[5px]" />
        {APP.name}
      </Link>
      <nav aria-label="Around the case" className="-mr-3 flex text-[14px]">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="flex min-h-11 items-center rounded-lg px-3 text-muted transition-colors duration-150 ease-out-soft hover:text-foreground"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

/** The two-line title a studio case opens with: the client, then the project in the muted colour. */
export function CaseTitle({ client, project, display = "" }: { client: string; project: string; display?: string }) {
  return (
    <div className="pt-16 pb-10 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:pt-28 lg:pb-14">
      <p className="pt-2 font-mono text-label text-muted uppercase lg:col-span-3 lg:pt-4">Case</p>
      <h1 className={`mt-3 text-[clamp(2.5rem,1.2rem+4.4vw,5rem)] leading-[1.02] tracking-[-0.03em] lg:col-span-9 lg:mt-0 ${display}`}>
        <span className="block">{client}</span>
        <span className="block text-muted">{project}</span>
      </h1>
    </div>
  );
}

/** The product running, in a phone under a soft light, loaded at once. */
export function CaseHero({ screen }: { screen: Screen }) {
  return (
    <section aria-label="The app, live" className="relative grid place-items-center overflow-hidden bg-raised py-12 sm:py-16 lg:h-[min(90svh,60rem)] lg:py-0">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,color-mix(in_oklab,var(--foreground)_9%,transparent),transparent_70%)]" />
      <div className="relative w-[min(74vw,21rem)] lg:w-[calc((min(90svh,60rem)-7rem)*414/868)]">
        <LivePhone src={screen.src} title={screen.label} time={screen.time} eager />
      </div>
      <p className="absolute right-4 bottom-4 hidden font-mono text-label text-muted uppercase lg:block">Live · try it</p>
    </section>
  );
}

/** The facts on the left, what it is in two short paragraphs, then the numbers. Every number true. */
export function CaseFacts({ facts, intro, stats, display = "" }: { facts: readonly { label: string; value: string }[]; intro: readonly string[]; stats: readonly { value: string; label: string }[]; display?: string }) {
  return (
    <section aria-label="About the project" className="pt-14 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:pt-24">
      <dl className="grid grid-cols-2 content-start gap-x-6 gap-y-5 lg:col-span-3 lg:grid-cols-1">
        {facts.map((f) => (
          <div key={f.label}>
            <dt className="font-mono text-label text-muted uppercase">{f.label}</dt>
            <dd className="mt-1.5 text-[15px] leading-snug">{f.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-12 flex flex-col gap-5 text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-[1.45] lg:col-span-7 lg:mt-0 xl:col-span-6">
        {intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      {stats.length ? (
        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-9 lg:col-start-4 lg:mt-20">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end gap-2">
              <dt className="max-w-[16rem] text-[14px] leading-snug text-muted">{s.label}</dt>
              <dd className={`text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] leading-none tracking-[-0.03em] tabular-nums ${display}`}>{s.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}

/** A numbered section: a rule, its number and title, an optional line under it, then its content. */
export function Section({ id, title, lede, children }: { id: string; title: string; lede?: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-20 border-t border-border pt-6 [counter-increment:case] lg:mt-32 lg:pt-8">
      <div className="mb-8 lg:mb-14 lg:grid lg:grid-cols-12 lg:gap-x-6">
        <p aria-hidden="true" className="font-mono text-label text-muted tabular-nums before:content-[counter(case,decimal-leading-zero)] lg:col-span-3 lg:pt-2.5" />
        <div className="mt-3 lg:col-span-7 lg:mt-0">
          <h2 id={id} className="text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] leading-tight tracking-[-0.02em]">
            {title}
          </h2>
          {lede ? <p className="mt-3 max-w-[40rem] text-[16px] leading-relaxed text-muted">{lede}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

/** A panel with a small caption under it, the way a studio captions a case image: what it is, nothing more. */
function Tile({ caption, surface = "bg-raised", shape = "min-h-[17rem] sm:aspect-[4/3] sm:min-h-0", children }: { caption: string; surface?: string; shape?: string; children: ReactNode }) {
  return (
    <figure className="flex flex-col">
      <div className={`relative grid place-items-center overflow-hidden p-5 sm:p-8 ${shape} ${surface}`}>{children}</div>
      <figcaption className="mt-3 text-center font-mono text-label text-muted uppercase">{caption}</figcaption>
    </figure>
  );
}

/* —————————————————————————————————————— Identity —————————————————————————————————————— */

/** Mark and app icon side by side, the type beside them on a desktop (as wide as both), the palette under them. */
export function Identity({ wordmark, faces, colours }: { wordmark: string; faces: readonly Face[]; colours: readonly Colour[] }) {
  // One height for the row, so a tile with two faces doesn't stand taller than the mark beside it.
  const shape = "min-h-[17rem] md:min-h-0 md:h-[20rem] lg:h-[22rem]";
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
        <Reveal>
          <Tile caption="Mark" shape={shape}>
            <div className="flex flex-col items-center gap-6 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element -- the app's own SVG icon */}
              <img src="/icon.svg" alt="" width={88} height={88} className="size-22 rounded-[20px]" />
              <span className={`text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] leading-none tracking-[-0.02em] ${wordmark}`}>{APP.name}</span>
            </div>
          </Tile>
        </Reveal>
        <Reveal delay={0.06}>
          <Tile caption="App icon" shape={shape}>
            <AppIcon />
          </Tile>
        </Reveal>
        <Reveal delay={0.12} className="md:col-span-2">
          <Tile caption="Typography" shape={shape}>
            <div className="flex w-full flex-wrap items-end justify-center gap-x-14 gap-y-8">
              {faces.map((f) => (
                <div key={f.family} className="flex max-w-[13rem] flex-col items-center text-center">
                  <span aria-hidden="true" className={`text-[clamp(4.5rem,3rem+3.5vw,7rem)] leading-[0.9] ${f.className}`}>
                    {f.sample}
                  </span>
                  <span className={`mt-5 text-[17px] ${f.className}`}>{f.family}</span>
                  <span className="mt-1 text-[13px] leading-snug text-muted">{f.role}</span>
                </div>
              ))}
            </div>
          </Tile>
        </Reveal>
      </div>
      <Reveal>
        <Palette colours={colours} />
      </Reveal>
    </div>
  );
}

/** The home-screen icon on Apple's icon grid, and at its real size under its real name, as it sits on a phone. */
function AppIcon() {
  return (
    <div className="flex items-center gap-8 xl:gap-12">
      <div className="relative size-32 xl:size-40">
        {/* eslint-disable-next-line @next/next/no-img-element -- the icon the app installs with (app/apple-icon.tsx) */}
        <img src="/apple-icon" alt="" width={160} height={160} className="size-full rounded-[22.5%]" />
        <svg viewBox="0 0 100 100" aria-hidden="true" className="pointer-events-none absolute inset-0 size-full text-foreground/25" fill="none" stroke="currentColor" strokeWidth="0.35">
          <rect x="0.2" y="0.2" width="99.6" height="99.6" rx="22.5" />
          <circle cx="50" cy="50" r="49.8" />
          <circle cx="50" cy="50" r="30.9" />
          <circle cx="50" cy="50" r="18.5" />
          <rect x="15.6" y="15.6" width="68.8" height="68.8" />
          <path d="M0 0l100 100M100 0L0 100M50 0v100M0 50h100" />
        </svg>
      </div>
      <div className="flex w-[60px] flex-col items-center gap-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element -- the same icon at the home screen's 60 pt */}
        <img src="/apple-icon" alt="" width={60} height={60} className="size-[60px] rounded-[13.5px]" />
        <span className="text-[11px] whitespace-nowrap">{APP.shortName}</span>
      </div>
    </div>
  );
}

/**
 * The palette as the app is built: each colour read from app/globals.css, its hex, and for a text colour the pair it
 * is read in and their contrast (4.5:1 is the line for small text). Read at build time, so it can't drift.
 */
function Palette({ colours }: { colours: readonly Colour[] }) {
  const tokens = readTokens(readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8"));
  return (
    <figure>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]">
        {colours.map((c) => {
          const value = tokens[c.token];
          const on = c.on ? tokens[c.on] : undefined;
          const pair = value && on ? contrast(value, on) : undefined;
          const onName = colours.find((o) => o.token === c.on)?.name ?? c.on;
          return (
            <li key={c.token} className="flex flex-col">
              <div className="relative aspect-[3/4] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]" style={{ background: `var(${c.token})` }}>
                {c.on ? (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 left-3 grid size-12 place-items-center text-[20px] font-medium"
                    style={{ background: `var(${c.on})`, color: `var(${c.token})` }}
                  >
                    Aa
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-[15px] font-medium">{c.name}</p>
              <p className="mt-1 font-mono text-[12px] leading-relaxed text-muted">
                {value && parseHex(value) ? value.toUpperCase() : (value ?? c.token)}
                <br />
                {c.token}
                {pair ? (
                  <>
                    <br />
                    {ratio(pair)} on {onName}
                  </>
                ) : null}
              </p>
            </li>
          );
        })}
      </ul>
      <figcaption className="mt-6 text-center font-mono text-label text-muted uppercase">Colour</figcaption>
    </figure>
  );
}

/* ——————————————————————————————————————— Story ———————————————————————————————————————— */

/** One large paragraph between sections: the person and their moment, in a few sentences. */
export function Statement({ children, display = "" }: { children: ReactNode; display?: string }) {
  return (
    <Reveal className="mt-24 lg:mt-36 lg:grid lg:grid-cols-12 lg:gap-x-6">
      <p className={`text-[clamp(1.5rem,1rem+1.8vw,2.5rem)] leading-[1.25] tracking-[-0.015em] lg:col-span-8 lg:col-start-4 ${display}`}>{children}</p>
    </Reveal>
  );
}

/** The core screens: the app in several of its situations, each one live. A row you swipe on a phone. */
export function Screens({ screens }: { screens: readonly Screen[] }) {
  return (
    <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-[repeat(auto-fit,minmax(13rem,19rem))] lg:justify-center lg:gap-6 lg:overflow-visible lg:px-0">
      {screens.map((s, i) => (
        <li key={s.src} className="w-[68vw] max-w-[19rem] shrink-0 snap-center lg:w-auto lg:max-w-none">
          <Reveal delay={i * 0.06}>
            <figure>
              <LivePhone src={s.src} title={s.label} time={s.time} />
              <figcaption className="mt-5 text-center">
                <span className="block text-[15px] font-medium">{s.label}</span>
                {s.note ? <span className="mt-1 block text-[14px] leading-snug text-muted">{s.note}</span> : null}
              </figcaption>
            </figure>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

/** The details that work: each the person's moment, the fact behind it, what the app does, and where to check. */
export function Details({ details, display = "" }: { details: readonly Detail[]; display?: string }) {
  return (
    <div className="flex flex-col">
      {details.map((d, i) => {
        const flip = i % 2 === 1;
        return (
          <article key={d.screen.src + d.moment} className="grid items-center gap-10 border-t border-border py-12 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-x-6 lg:py-20">
            <div className={`mx-auto w-[min(70vw,19rem)] lg:row-start-1 lg:w-full lg:max-w-[19rem] ${flip ? "lg:col-span-4 lg:col-start-8" : "lg:col-span-4 lg:col-start-2"}`}>
              <LivePhone src={d.screen.src} title={d.screen.label} time={d.screen.time} replay={d.replay} />
            </div>
            <Reveal className={`lg:row-start-1 ${flip ? "lg:col-span-5 lg:col-start-2" : "lg:col-span-5 lg:col-start-7"}`}>
              <p className="font-mono text-label text-muted uppercase">{d.screen.label}</p>
              <h3 className={`mt-3 text-[clamp(1.5rem,1.1rem+1.3vw,2.25rem)] leading-[1.15] tracking-[-0.02em] ${display}`}>{d.moment}</h3>
              <dl className="mt-8 grid gap-6 text-[16px] leading-relaxed">
                <div>
                  <dt className="font-mono text-label text-muted uppercase">The reality</dt>
                  <dd className="mt-1.5">{d.reality}</dd>
                </div>
                <div>
                  <dt className="font-mono text-label text-muted uppercase">What it does</dt>
                  <dd className="mt-1.5">{d.does}</dd>
                </div>
                <div>
                  <dt className="font-mono text-label text-muted uppercase">Where to see it</dt>
                  <dd className="mt-1.5 font-mono text-[13px] text-muted">{d.proof}</dd>
                </div>
              </dl>
            </Reveal>
          </article>
        );
      })}
    </div>
  );
}

/** The design system's pieces: the app's own components, live, each on its own tile. */
export function Parts({ parts }: { parts: readonly Part[] }) {
  return (
    <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
      {parts.map((p, i) => (
        <Reveal key={p.name} delay={(i % 3) * 0.06} className={p.wide ? "md:col-span-2" : ""}>
          <Tile caption={p.name} surface={p.surface}>
            {p.node}
          </Tile>
        </Reveal>
      ))}
    </div>
  );
}

/** The app's desktop layout in a browser window, live. */
export function Desktop({ src = "/", title }: { src?: string; title: string }) {
  return (
    <Reveal>
      <LiveBrowser src={src} title={title} />
    </Reveal>
  );
}

/** Who did what, the way a studio credits a case, and the links that go with it. */
export function Credits({ credits, links }: { credits: readonly { role: string; name: string }[]; links: readonly { label: string; href: string }[] }) {
  return (
    <footer className="mt-24 border-t border-border pt-6 pb-20 lg:mt-36 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:pt-8 lg:pb-28">
      <p className="font-mono text-label text-muted uppercase lg:col-span-3 lg:pt-1.5">Credits</p>
      <ul className="mt-4 flex flex-col gap-1 text-[clamp(1rem,0.9rem+0.4vw,1.25rem)] leading-snug lg:col-span-6 lg:mt-0">
        {credits.map((c) => (
          <li key={c.role + c.name}>
            <span className="text-muted">{c.role} / </span>
            {c.name}
          </li>
        ))}
      </ul>
      <ul className="mt-10 flex flex-col lg:col-span-3 lg:mt-0">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="group -mx-2 flex min-h-11 items-center gap-2 rounded-lg px-2 text-[15px]">
              {l.label}
              <span aria-hidden="true" className="text-muted transition-transform duration-150 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
