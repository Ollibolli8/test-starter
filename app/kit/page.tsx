// The kit: every token and building block on one page, to tune before building the brief.
// Delete app/kit before hand-in, or keep it on purpose as the design system page.
import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { BasketExample } from "./basket-example";
import { GlassExample } from "./glass-example";
import { ScrollProgress } from "./scroll-progress";

export const metadata: Metadata = {
  title: "Kit",
  robots: { index: false },
};

const swatches = [
  { name: "Background", token: "--background", className: "bg-background" },
  { name: "Raised", token: "--raised", className: "bg-raised" },
  { name: "Foreground", token: "--foreground", className: "bg-foreground" },
  { name: "Muted", token: "--muted", className: "bg-muted" },
  { name: "Border", token: "--border", className: "bg-border" },
  { name: "Accent", token: "--accent", className: "bg-accent" },
  { name: "On accent", token: "--accent-foreground", className: "bg-accent-foreground" },
] as const;

const entrances = ["Settles in", "Then the next", "Then the last"] as const;

export default function Kit() {
  return (
    <>
      <ScrollProgress />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-16 px-5 py-16 sm:py-24">
        <header className="flex flex-col gap-3">
          <Link
            href="/"
            className="self-start rounded-sm text-sm text-muted underline underline-offset-4 hover:no-underline"
          >
            Start page
          </Link>
          <h1 className="text-display font-semibold">Kit</h1>
          <p className="max-w-prose text-muted">
            Tokens live in <code className="font-mono text-sm">app/globals.css</code> and{" "}
            <code className="font-mono text-sm">lib/motion.ts</code>. Change them there and this page follows.
          </p>
        </header>

        <section aria-labelledby="colour" className="flex flex-col gap-6 border-t border-border pt-8">
          <h2 id="colour" className="text-2xl font-semibold tracking-tight">
            Colour
          </h2>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {swatches.map((swatch) => (
              <li key={swatch.token} className="flex flex-col gap-2">
                <span className={`aspect-[4/3] rounded-md border border-border ${swatch.className}`} />
                <span className="text-sm font-medium">{swatch.name}</span>
                <code className="font-mono text-xs text-muted">{swatch.token}</code>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="type" className="flex flex-col gap-6 border-t border-border pt-8">
          <h2 id="type" className="text-2xl font-semibold tracking-tight">
            Type
          </h2>
          <div className="flex flex-col gap-5">
            <p className="text-display font-semibold">Display, the answer</p>
            <p className="font-mono text-label text-muted uppercase">Label, text-label</p>
            <p className="text-3xl font-semibold tracking-tight">Heading, text-3xl</p>
            <p className="max-w-prose text-base">
              Body, text-base. A paragraph long enough to show the line length and the leading, so the reading
              size can be judged at a glance before any real copy arrives.
            </p>
            <p className="text-sm text-muted">Small and muted, text-sm text-muted</p>
            <p className="font-mono text-sm tabular-nums">Mono 0123456789, font-mono</p>
          </div>
        </section>

        <section aria-labelledby="controls" className="flex flex-col gap-6 border-t border-border pt-8">
          <h2 id="controls" className="text-2xl font-semibold tracking-tight">
            Controls
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground transition-[opacity,scale] duration-150 ease-out-soft hover:opacity-90 active:scale-[0.98] motion-reduce:transition-none"
            >
              Primary
            </button>
            <button
              type="button"
              className="inline-flex min-h-11 items-center rounded-md border border-border px-5 text-sm font-medium transition-colors duration-150 ease-out-soft hover:bg-foreground/5 active:bg-foreground/10 motion-reduce:transition-none"
            >
              Secondary
            </button>
            <button
              type="button"
              disabled
              className="inline-flex min-h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-muted disabled:cursor-not-allowed"
            >
              Disabled
            </button>
            <a
              href="#motion"
              className="rounded-sm px-1 text-sm font-medium underline underline-offset-4 hover:no-underline"
            >
              Link to Motion
            </a>
          </div>
          <p className="text-sm text-muted">Tab through them to check the focus rings.</p>
        </section>

        <section id="motion" aria-labelledby="motion-title" className="flex flex-col gap-6 border-t border-border pt-8">
          <h2 id="motion-title" className="text-2xl font-semibold tracking-tight">
            Motion
          </h2>
          <p className="max-w-prose text-muted">
            Each card settles in once as it scrolls into view. With reduced motion on, they only fade.
          </p>
          <ul className="grid gap-4 sm:grid-cols-3">
            {entrances.map((label, index) => (
              <li key={label}>
                <Reveal delay={index * 0.06} className="flex aspect-[4/3] items-end rounded-md border border-border p-4">
                  <span className="text-sm font-medium">{label}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <GlassExample />

        <BasketExample />
      </main>
    </>
  );
}
