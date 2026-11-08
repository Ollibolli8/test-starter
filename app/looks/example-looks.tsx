// Three placeholder looks, to show the board working. Replace them with the brief's three first screens, found with
// .claude/skills/look/SKILL.md: each the real first screen in its own form, type and colour, with the brief's copy
// and numbers. The pick then moves into the app.

import { AppShell } from "@/components/app-shell";

export function CraftedExample() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6 px-5 pt-6">
        <p className="text-display font-semibold">The answer, in the person&apos;s words</p>
        <ul className="flex flex-col divide-y divide-border">
          {["A familiar list", "done better", "than the trade does it"].map((line) => (
            <li key={line} className="flex min-h-12 items-center text-muted">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}

export function BoldExample() {
  return (
    <AppShell>
      <div className="flex h-full flex-col justify-between gap-6 px-5 pt-6 pb-10">
        <p className="text-display font-semibold">One idea from outside apps</p>
        <div aria-hidden="true" className="mx-auto aspect-square w-4/5 rounded-full border-[18px] border-foreground/80" />
      </div>
    </AppShell>
  );
}

export function WildExample() {
  return (
    <AppShell>
      <div className="flex h-full items-end px-5 pb-10">
        <p className="text-[64px] leading-[0.95] font-semibold tracking-tight">The furthest seed that still works</p>
      </div>
    </AppShell>
  );
}
