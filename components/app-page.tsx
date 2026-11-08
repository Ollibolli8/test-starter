// The link (/): the app and nothing else, because the studio judges the product and the reasoning belongs in the
// presentation and the README, not wrapped around it. Full screen on a phone; on a tablet, the app at its own width in
// the middle of the window. On a desktop (from 1024 px) a `wide` app fills the window and lays itself out for it
// (AppShell is a size container, so the app's `@5xl:` classes take over), and places the live link and QR code in its
// own layout; an app that isn't `wide` stays a column, with the link and code in a corner from 1280 px.
// The presentation is /stage (components/stage.tsx), where the app is always the phone.

import type { ReactNode } from "react";
import { OpenOnPhone } from "@/components/open-on-phone";

export function AppPage({ phoneTitle = "Open it on your phone", wide = false, children }: { phoneTitle?: string; wide?: boolean; children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <div
        className={`relative mx-auto h-dvh w-full overflow-hidden [--app-bottom:env(safe-area-inset-bottom)] [--app-top:env(safe-area-inset-top)] sm:max-w-[30rem] sm:shadow-[0_0_0_1px_var(--border)] ${wide ? "lg:max-w-none lg:shadow-none" : ""}`}
      >
        {children}
      </div>
      {wide ? null : (
        <aside data-beside aria-label={phoneTitle} className="fixed bottom-8 left-8 hidden xl:block">
          <OpenOnPhone title={phoneTitle} />
        </aside>
      )}
    </div>
  );
}
