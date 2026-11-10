import type { Metadata } from "next";
import { situations } from "../example-situations";
import { StateBoard } from "@/components/state-board";

// Every situation of the app, live and side by side (components/state-board.tsx). noindex: it's for the
// presentation and for checking the build, not part of the app. Point the import at the brief's situations when
// they have their own module, give the board the brief's title, and add `times` for the ones on a demo clock.
export const metadata: Metadata = {
  title: "States",
  robots: { index: false },
};

export default function StatesPage() {
  return <StateBoard title="The brief in a few words" situations={situations} />;
}
