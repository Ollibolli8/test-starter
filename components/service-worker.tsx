"use client";

// Installs the service worker (public/sw.js) in production, so the app opens with no connection once it has been
// visited. Not in development, where a cached page would hide changes.

import { useEffect } from "react";

export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .then(() => navigator.serviceWorker.ready)
      .then((registration) => {
        // Hand the worker this visit's built files, so the very first visit already opens offline.
        const files = performance
          .getEntriesByType("resource")
          .map((entry) => entry.name)
          .filter((url) => url.startsWith(`${location.origin}/_next/static/`));
        registration.active?.postMessage({ precache: files });
      })
      .catch(() => {
        // Without it the app still works; it just needs the network to open.
      });
  }, []);
  return null;
}
