// The case page's pieces (app/case/page.tsx). Pictures before words (Olle, 11 November, after Signifly's Sundhedskort
// case): big tiles of the app on full-colour grounds, a pair of half tiles, one sentence in large type between
// groups, and a line of small type where a picture needs it. The phones and the browser run the app
// (components/case/live.tsx); nothing here is a screenshot.

import Link from "next/link";
import type { ReactNode } from "react";
import { APP } from "@/lib/app";

/** The grounds a tile can stand on: the app's own colours. */
const GROUND = {
  accent: "bg-accent text-accent-foreground",
  ink: "bg-foreground text-background",
  raised: "bg-raised text-foreground",
  page: "bg-background text-foreground shadow-[inset_0_0_0_1.5px_var(--border)]",
} as const;
type Ground = keyof typeof GROUND;

const LABEL = "font-mono text-label uppercase";

/** The page: the case's language (the app inside keeps its own) and its width. */
export function CasePage({ lang, children }: { lang: string; children: ReactNode }) {
  return (
    <div lang={lang} className="mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-10">
      {children}
    </div>
  );
}

export function CaseHeader() {
  return (
    <header className="flex h-16 items-center justify-between gap-4">
      <Link href="/" className="-mx-2 flex min-h-11 items-center gap-2.5 rounded-lg px-2 text-[15px] font-bold">
        {/* eslint-disable-next-line @next/next/no-img-element -- the app's own SVG icon */}
        <img src="/icon.svg" alt="" width={22} height={22} className="size-[22px] rounded-[5px]" />
        {APP.name}
      </Link>
      <Link href="/" className="-mr-3 flex min-h-11 items-center rounded-lg px-3 text-[14px] font-medium text-muted transition-colors duration-150 ease-out-soft hover:text-foreground">
        Open the app
      </Link>
    </header>
  );
}

/** The two lines a studio case opens with: the client, then the project in the muted colour. */
export function CaseTitle({ client, project }: { client: string; project: string }) {
  return (
    <h1 className="pt-12 pb-8 text-[clamp(2.5rem,1.2rem+5vw,5.5rem)] leading-[1] font-extrabold tracking-[-0.035em] lg:pt-24 lg:pb-12">
      <span className="block">{client}</span>
      <span className="block text-muted">{project}</span>
    </h1>
  );
}

/** One picture on a ground. `wide` spans the page; without it, it is half of a <Pair>. */
export function Tile({ ground, label, className = "", children }: { ground: Ground; label?: string; className?: string; children: ReactNode }) {
  return (
    <figure className={`relative overflow-hidden rounded-[1.25rem] lg:rounded-[2rem] ${GROUND[ground]} ${className}`}>
      {children}
      {label ? <figcaption className={`absolute bottom-4 left-5 opacity-70 lg:bottom-6 lg:left-8 ${LABEL}`}>{label}</figcaption> : null}
    </figure>
  );
}

/** The gap between pictures, and two side by side from a tablet up. */
export function Stack({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-3 lg:gap-6">{children}</div>;
}

export function Pair({ children }: { children: ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2 lg:gap-6">{children}</div>;
}

/** The one sentence between two groups of pictures. */
export function Line({ children }: { children: ReactNode }) {
  return <p className="mx-auto max-w-[22ch] py-16 text-center text-[clamp(1.75rem,1.1rem+2.6vw,3.25rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance lg:py-28">{children}</p>;
}

/** A line of small type under a picture, when it needs one. */
export function Caption({ children }: { children: ReactNode }) {
  return <p className="max-w-[46ch] pt-1 pb-6 text-[15px] leading-[1.45] text-muted lg:pb-10">{children}</p>;
}

/** The facts, what it is in one short paragraph, then the numbers. Every number is a true count from the build. */
export function CaseFacts({ facts, intro, stats }: { facts: readonly { label: string; value: string }[]; intro: string; stats: readonly { value: string; label: string }[] }) {
  return (
    <section aria-label="About the project" className="py-12 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:py-20">
      <dl className="grid grid-cols-2 content-start gap-x-6 gap-y-5 lg:col-span-3 lg:grid-cols-1">
        {facts.map((f) => (
          <div key={f.label}>
            <dt className={`text-muted ${LABEL}`}>{f.label}</dt>
            <dd className="mt-1.5 text-[15px] leading-snug">{f.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-10 max-w-[34ch] text-[clamp(1.25rem,1rem+0.9vw,1.75rem)] leading-[1.3] font-medium lg:col-span-8 lg:mt-0">{intro}</p>
      <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:col-span-9 lg:col-start-4 lg:mt-16">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse justify-end gap-1.5">
            <dt className="max-w-[14rem] text-[14px] leading-snug text-muted">{s.label}</dt>
            <dd className="text-[clamp(2.5rem,1.8rem+3vw,4.5rem)] leading-[0.9] font-semibold tracking-[-0.03em] tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Who did what, and the link. */
export function Credits({ credits, links }: { credits: readonly { role: string; name: string }[]; links: readonly { label: string; href: string }[] }) {
  return (
    <footer className="mt-16 flex flex-col gap-8 border-t-[1.5px] border-foreground pt-6 pb-20 sm:flex-row sm:items-start sm:justify-between lg:mt-28 lg:pb-28">
      <ul className="flex flex-col gap-1 text-[17px] leading-snug">
        {credits.map((c) => (
          <li key={c.role}>
            <span className="text-muted">{c.role} / </span>
            {c.name}
          </li>
        ))}
      </ul>
      <ul className="flex flex-col">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="flex h-12 items-center rounded-full bg-foreground px-6 text-[15px] font-extrabold text-background">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
