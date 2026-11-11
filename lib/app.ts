// The app's name and colours, in one place: the page title, the install manifest, the phone's bars and the stage
// read them from here. Set them from the brief at the start, so no "Starter" is left anywhere.

export const APP = {
  name: "Starter",
  /** Under the icon on a home screen: 12 characters or fewer. */
  shortName: "Starter",
  description: "Starting point for a timed client test.",
  /** The interface's language, also set on <html lang>: "da" for a Danish interface. */
  lang: "en",
  /** "dark" unless the brief hands over a light brand (AGENTS.md → One theme). Sets the color-scheme meta, the
   *  home-screen status bar and the case page's live phones; app/globals.css's color-scheme must match. */
  scheme: "dark" as "dark" | "light",
  /** The app's background (--background in app/globals.css): the phone's browser bars, the install splash, the icon. */
  colour: "#0a0a0a",
  /** The live link once it's on Vercel; shown beside the app on a desktop as "open it on your phone". */
  liveUrl: "" as string,
} as const;
