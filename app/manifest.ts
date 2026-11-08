import type { MetadataRoute } from "next";
import { APP } from "@/lib/app";

// Makes the app installable: "Add to Home Screen" on an iPhone, "Install app" in Chrome. It then opens full screen
// like an app, and with the service worker (public/sw.js) it opens without a connection too.
// Icons: app/icon.svg (any size) and app/apple-icon.tsx (the iPhone's home screen). Draw both from the brief.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP.name,
    short_name: APP.shortName,
    description: APP.description,
    lang: APP.lang,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: APP.colour,
    theme_color: APP.colour,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
