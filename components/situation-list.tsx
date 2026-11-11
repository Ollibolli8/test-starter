"use client";

// The situations the app can be put in, for whoever is looking at it: the list in the app's own sheet. Olle presents
// from the app, so there is no separate presentation page.

import type { Situation } from "@/lib/situations";

/** Every situation as a button; the chosen one's note says what the person sees and can do. */
export function SituationList<Id extends string>({
  situations,
  value,
  onChange,
  title = "Try a situation",
}: {
  situations: readonly Situation<Id>[];
  value: Id;
  onChange: (id: Id) => void;
  title?: string;
}) {
  const active = situations.find((s) => s.id === value);
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-mono text-label text-muted uppercase">{title}</h2>
      <div className="-mx-3 flex flex-col gap-1">
        {situations.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={s.id === value}
            onClick={() => onChange(s.id)}
            className="group flex min-h-10 items-center gap-3 rounded-xl px-3 text-left text-[15px] transition-colors duration-150 ease-out-soft hover:bg-foreground/5 aria-pressed:bg-raised aria-pressed:font-medium aria-pressed:shadow-[0_1px_2px_rgb(0_0_0/0.06),0_0_0_1px_var(--border)] forced-colors:aria-pressed:bg-[Highlight] forced-colors:aria-pressed:text-[HighlightText] forced-colors:aria-pressed:forced-color-adjust-none"
          >
            <span aria-hidden="true" className="size-2 rounded-full bg-foreground/15 group-aria-pressed:bg-foreground" />
            {s.label}
          </button>
        ))}
      </div>
      {active ? (
        <p aria-live="polite" className="text-[14px] leading-snug text-muted">
          {active.note}
        </p>
      ) : null}
    </section>
  );
}
