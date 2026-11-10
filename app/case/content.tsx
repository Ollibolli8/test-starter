// Everything the case page says (app/case/page.tsx), in one place: fill it at the end, from the README, in about
// 20 minutes (AGENTS.md → The case page). Written in the studio's language (`lang`), while the app inside keeps its
// own. Plain words, the README's facts, nothing invented: the stats are true counts from the build, never results
// it hasn't had. This is the example app's case; replace every line with the brief's.

import type { Colour, Detail, Face, Part, Screen } from "@/components/case/blocks";
import { situations } from "../example-situations";
import { CountPart, GlassPart, TabsPart } from "./parts";

/** A situation as a screen on the case: its address, and its name and note from lib/situations.ts. */
function at(id: (typeof situations)[number]["id"], time?: string): Screen {
  const s = situations.find((x) => x.id === id);
  if (!s) throw new Error(`No situation ${id}`);
  return { src: id === situations[0]?.id ? "/" : `/?s=${id}`, label: s.label, note: s.note, time };
}

export const CASE = {
  /** The case's language: the studio's. */
  lang: "en",
  /** The title's two lines, as a studio titles a case: the client, then the project. */
  client: "Client name",
  project: "What it is, in a few words",
  /** A class for the title, the statement, the numbers and the details' headlines: the app's display face. */
  display: "font-semibold",

  /** The app's first screen, in the situation that shows it best. */
  hero: at("ready"),

  /** Short facts. Client, focus, role and how it was built; for a practice or an imagined client, say so. */
  facts: [
    { label: "Client", value: "The client, and what it is" },
    { label: "Focus", value: "App design and build" },
    { label: "Role", value: "Idea, art direction and design, built with agentic coding" },
    { label: "Built with", value: "Next.js, TypeScript, Tailwind, Motion · Claude Code" },
  ],
  /** Two short paragraphs: the problem in the client's words, then what this is and the one thing it does differently. */
  intro: [
    "The problem, in the client's own words from the brief, and who has it.",
    "What this is, and the one thing it does that the alternative doesn't.",
  ],
  /** Two to four true numbers from the build (situations handled, tests on the rules, taps to the answer). */
  stats: [
    { value: String(situations.length), label: "situations, each on the real data path" },
    { value: "0", label: "taps to the answer" },
  ],

  identity: {
    lede: undefined as string | undefined,
    /** The class the app's name is set in, as its wordmark. */
    wordmark: "font-semibold tracking-[-0.03em]",
    faces: [{ family: "Geist", role: "Everything: the answer, labels and controls", className: "font-sans font-semibold", sample: "Aa" }] satisfies Face[],
    /** The tokens from app/globals.css, surfaces first; a text colour names the surface it's read on. */
    colours: [
      { token: "--background", name: "Background" },
      { token: "--raised", name: "Raised" },
      { token: "--foreground", name: "Foreground", on: "--background" },
      { token: "--muted", name: "Muted", on: "--raised" },
      { token: "--border", name: "Border" },
    ] satisfies Colour[],
  },

  /** The person and their moment, in three or four sentences (README → Who uses it). */
  statement: "The person, their moment and what they're holding, in three or four plain sentences. What it means for the screen.",

  screensLede: "Live, not screenshots: each phone is the app in one of its situations. Tap any of them.",
  /** Three to five situations, in the order of the person's day. */
  screens: [at("ready"), at("empty"), at("offline"), at("error")] satisfies Screen[],

  detailsLede: "The small things that have to be right for this person, and where each one is checked.",
  /** Two to four, from README → The details that work. The one motion moment gets `replay`. */
  details: [
    {
      screen: at("offline"),
      moment: "Opened on the train, without a connection",
      reality: "The fact of the reality, with its source.",
      does: "What the app does about it.",
      proof: "Situation “Offline, old data” · lib/…",
    },
    {
      screen: at("ready"),
      moment: "The answer arrives",
      reality: "Why this moment matters to the person.",
      does: "The number counts to its value: the app's one motion.",
      proof: "components/count-up.tsx",
      replay: true,
    },
  ] satisfies Detail[],

  partsLede: "The app's own components, running.",
  /** Three to six of the app's own components, from ./parts.tsx. */
  parts: [
    { name: "Tabs", node: <TabsPart /> },
    { name: "Count-up", node: <CountPart /> },
    { name: "Glass", node: <GlassPart />, surface: "bg-background" },
  ] satisfies Part[],

  desktopLede: "The same app laid out for the room a laptop gives it.",
  /** The address the browser opens: "/" or a situation that shows the desktop layout well. */
  desktop: "/",

  /** Who did what. Agents by name; never a person who wasn't there. */
  credits: [
    { role: "Idea, art direction and design", name: "Oliver Kure Olsen" },
    { role: "Built with agentic coding", name: "Claude Code" },
  ],
  /** The live link, the presentation, the looks and the repository. */
  links: [
    { label: "Open the app", href: "/" },
    { label: "Every situation, on stage", href: "/stage" },
    { label: "Every situation, side by side", href: "/states" },
    { label: "The three looks", href: "/looks" },
  ],
};
