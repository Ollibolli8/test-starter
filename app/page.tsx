import { Suspense } from "react";
import { ExampleApp, ExampleStory } from "./example-app";
import { AppShell } from "@/components/app-shell";
import { Stage } from "@/components/stage";

// The page is the app on its stage: full screen on a phone, in a phone with the idea and the situations on a
// desktop. Suspense because the app reads the situation from the address; the server's HTML is the loading frame.
// Replace ./example-app with the brief's app, and keep this shape.
export default function Home() {
  return (
    <Suspense
      fallback={
        <Stage story={<ExampleStory />} controls={null}>
          <AppShell>
            <p role="status" className="px-5 pt-16 text-muted">
              Loading…
            </p>
          </AppShell>
        </Stage>
      }
    >
      <ExampleApp />
    </Suspense>
  );
}
