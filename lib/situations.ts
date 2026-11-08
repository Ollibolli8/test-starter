"use client";

// Situations: every state the app can be in (normal, loading, empty, error, offline, stale, an edge case of the
// brief), switchable live. The desktop stage lists them so a reviewer can walk every state on the real app, and
// the address keeps the one shown (?s=offline), so a state can be linked or opened on a phone.
// The data source reads the situation and behaves that way; the components never know it's a demo.

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export interface Situation<Id extends string = string> {
  id: Id;
  /** Its name on the stage, in the stage's language: "No prices yet". */
  label: string;
  /** One line under the list when it's chosen: what the person sees and can do. */
  note: string;
}

const PARAM = "s";

/**
 * The situation in the address, or the first one. Changing it rewrites the address without a reload (Next.js keeps
 * useSearchParams in step with history.replaceState). The page that calls this needs a <Suspense> around it.
 */
export function useSituation<Id extends string>(situations: readonly Situation<Id>[]): [Situation<Id>, (id: Id) => void] {
  const params = useSearchParams();
  const first = situations[0];
  if (!first) throw new Error("useSituation needs at least one situation");
  const current = situations.find((s) => s.id === params.get(PARAM)) ?? first;

  const choose = useCallback(
    (id: Id) => {
      const next = new URLSearchParams(window.location.search);
      if (id === first.id) next.delete(PARAM);
      else next.set(PARAM, id);
      const query = next.toString();
      window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
    },
    [first.id],
  );

  return [current, choose];
}
