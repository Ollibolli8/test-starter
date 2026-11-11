// The example app's situations (lib/situations.ts), in a plain module rather than the app's client file, so the
// case page (app/case/page.tsx), a server component, can read them too. Delete it with app/example-app.tsx.

import type { Situation } from "@/lib/situations";

export type SituationId = "ready" | "loading" | "empty" | "error" | "offline";

export const situations: readonly Situation<SituationId>[] = [
  {
    id: "ready",
    label: "Ready",
    note: "The answer, as the person sees it most days.",
  },
  {
    id: "loading",
    label: "Loading",
    note: "The frame is there at once; the answer fills in.",
  },
  {
    id: "empty",
    label: "Nothing yet",
    note: "Says when there will be something, and what to do meanwhile.",
  },
  {
    id: "error",
    label: "Can't load",
    note: "Says what failed in plain words, with one way to try again.",
  },
  {
    id: "offline",
    label: "Offline, old data",
    note: "Shows the last answer and how old it is.",
  },
];
