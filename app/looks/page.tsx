import type { Metadata } from "next";
import { BoldExample, CraftedExample, WildExample } from "./example-looks";
import { LookBoard, type Look } from "@/components/look-board";

// The three looks for Olle to pick from (.claude/skills/look/SKILL.md), side by side in phones. noindex: it's the
// record of how the look was chosen, shown in the presentation, not part of the app.
export const metadata: Metadata = {
  title: "Looks",
  robots: { index: false },
};

const looks: readonly Look[] = [
  {
    id: "crafted",
    rung: "Crafted",
    name: "Placeholder",
    idea: "A familiar pattern done better than anyone in the trade does it, with one quiet signature.",
    touch: "The controls the person already knows.",
    because: "The fact about the person it answers.",
    risk: "Reads as safe; the signature has to carry it.",
    screen: <CraftedExample />,
  },
  {
    id: "bold",
    rung: "Bold",
    name: "Placeholder",
    idea: "One strong idea from outside apps carrying the answer.",
    touch: "A plain path, and one gesture on top of it.",
    because: "The fact about the person it answers.",
    risk: "What it risks, and how the build guards against it.",
    screen: <BoldExample />,
  },
  {
    id: "wild",
    rung: "Wild",
    name: "Placeholder",
    idea: "The furthest seed that still passes the five questions.",
    touch: "How it's touched.",
    because: "The fact about the person it answers.",
    risk: "What it risks, and how the build guards against it.",
    screen: <WildExample />,
  },
];

export default function LooksPage() {
  return <LookBoard title="The brief in a few words" looks={looks} recommended="bold" />;
}
