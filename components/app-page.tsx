// The link (/): the app and nothing else, because the studio judges the product and the reasoning belongs in the
// presentation and the README, not wrapped around it. Full screen on a phone; on a tablet or a desktop, the app at its
// own width in the middle of the window; on a wide desktop the live link and QR code in a corner, to open it on a
// phone (from 1280 px, where it clears the app). The presentation is /stage (components/stage.tsx).

import type { ReactNode } from "react";
import { OpenOnPhone } from "@/components/open-on-phone";

export function AppPage({ phoneTitle = "Open it on your phone", children }: { phoneTitle?: string; children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <div className="relative mx-auto h-dvh w-full overflow-hidden [--app-bottom:env(safe-area-inset-bottom)] [--app-top:env(safe-area-inset-top)] sm:max-w-[30rem] sm:shadow-[0_0_0_1px_var(--border)]">
        {children}
      </div>
      <aside data-beside aria-label={phoneTitle} className="fixed bottom-8 left-8 hidden xl:block">
        <OpenOnPhone title={phoneTitle} />
      </aside>
    </div>
  );
}
