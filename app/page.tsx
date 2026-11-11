import { Suspense } from "react";
import { ExampleApp } from "./example-app";
import { AppPage } from "@/components/app-page";
import { AppShell } from "@/components/app-shell";

// The link: the app on its own, on a phone and a desktop alike (components/app-page.tsx). Suspense because the app reads the situation from the address; the server's HTML is the loading frame.
// Replace ./example-app with the brief's app, and keep this shape.
export default function Home() {
  return (
    <Suspense
      fallback={
        <AppPage>
          <AppShell>
            <p role="status" className="px-5 pt-16 text-muted">
              Loading…
            </p>
          </AppShell>
        </AppPage>
      }
    >
      <ExampleApp />
    </Suspense>
  );
}
