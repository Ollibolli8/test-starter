import type { Metadata } from "next";
import { Suspense } from "react";
import { ExampleApp } from "../example-app";
import { AppShell } from "@/components/app-shell";
import { Stage } from "@/components/stage";

// The presentation: the same app in a phone, with every situation beside it (components/stage.tsx). The link
// handed in is /, the app on its own; this is what Olle shares on screen while he presents.
export const metadata: Metadata = {
  robots: { index: false },
};

export default function StagePage() {
  return (
    <Suspense
      fallback={
        <Stage controls={null}>
          <AppShell>
            <p role="status" className="px-5 pt-16 text-muted">
              Loading…
            </p>
          </AppShell>
        </Stage>
      }
    >
      <ExampleApp stage />
    </Suspense>
  );
}
