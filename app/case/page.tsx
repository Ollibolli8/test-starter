import type { Metadata } from "next";
import { situations } from "../example-situations";
import { Caption, CaseFacts, CaseHeader, CasePage, CaseTitle, Credits, Line, Pair, Stack, Tile } from "@/components/case/blocks";
import { LiveBrowser, LivePhone } from "@/components/case/live";
import { APP } from "@/lib/app";

// The case: the product shown the way a studio shows its work (AGENTS.md → The case page). Mostly pictures, and
// every picture of the app is the app running in that situation. About a hundred words in all: the reasoning is in
// the README and is said aloud. In the studio's language; the app inside keeps the person's.
// This is the example app's case: replace every word and pick with the brief's.
export const metadata: Metadata = {
  title: `${APP.name}: case`,
  robots: { index: false },
};

type Id = (typeof situations)[number]["id"];

/** The app in one situation, in a phone, with the situation's name under it when `named`. */
function Phone({ id, named = false, eager = false }: { id: Id; named?: boolean; eager?: boolean }) {
  const s = situations.find((x) => x.id === id);
  if (!s) throw new Error(`No situation ${id}`);
  return (
    <div className="flex flex-col gap-3">
      <LivePhone src={id === situations[0]?.id ? "/" : `/?s=${s.id}`} title={s.label} eager={eager} />
      {named ? <p className="text-center text-[13px] leading-tight font-medium opacity-80">{s.label}</p> : null}
    </div>
  );
}

const BIG = "font-semibold leading-[0.85] tracking-[-0.04em] whitespace-nowrap";

export default function CasePageRoute() {
  return (
    <CasePage lang="en">
      <CaseHeader />
      <main>
        {/* The client, then the project in a few words. */}
        <CaseTitle client="Client name" project="What it is, in a few words" />

        {/* The first screen, big, on the brand's colour. */}
        <Tile ground="accent" className="grid place-items-center px-6 py-10 lg:py-16">
          <div className="w-[min(70vw,20rem)] lg:w-[21.5rem]">
            <Phone id="ready" eager />
          </div>
        </Tile>

        {/* Three facts, one paragraph of at most thirty words, four true counts from the build (never results). */}
        <CaseFacts
          facts={[
            { label: "Client", value: "The client, and what it is. Say so if it is a practice case." },
            { label: "Focus", value: "What was designed and built" },
            { label: "Role", value: "Idea, art direction and design, built with agentic coding" },
          ]}
          intro="What everyone else does, and the one thing this does instead. Thirty words at most."
          stats={[
            { value: "1", label: "answer on the first screen" },
            { value: String(situations.length), label: "situations designed" },
            { value: "0", label: "tests: count them when they exist" },
            { value: "0", label: "one more true count, with its date if it can change" },
          ]}
        />

        <Stack>
          {/* The idea as one picture, drawn in type or the signature form: no words needed beside it. */}
          <Tile ground="raised" label="The idea, as one picture" className="grid aspect-[4/5] place-items-center sm:aspect-[16/9]">
            <p className={`${BIG} text-[clamp(4rem,20vw,16rem)]`}>12</p>
          </Tile>
        </Stack>

        <Line>The one sentence the whole case stands on.</Line>

        <Stack>
          <Pair>
            {/* The hardest situation, and its signature form beside it. */}
            <Tile ground="page" label="The hardest situation" className="grid place-items-center px-6 pt-10 pb-14 lg:py-16">
              <div className="w-[min(62vw,18rem)] lg:w-[19rem]">
                <Phone id="error" />
              </div>
            </Tile>
            <Tile ground="ink" className="grid min-h-[22rem] place-items-center p-8">
              <p className={`${BIG} text-[clamp(4rem,11vw,10rem)]`}>—</p>
            </Tile>
          </Pair>
          <Caption>One line on what that situation does differently, if the pictures do not say it.</Caption>

          {/* The other situations, in a row a phone swipes through. */}
          <Tile ground="ink" className="p-5 lg:p-12">
            <div className="grid snap-x grid-flow-col auto-cols-[58%] gap-5 overflow-x-auto pb-2 sm:auto-cols-[34%] lg:grid-flow-row lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:pb-0">
              {(["ready", "loading", "empty", "offline"] as const).map((id) => (
                <div key={id} className="snap-center">
                  <Phone id={id} named />
                </div>
              ))}
            </div>
          </Tile>
        </Stack>

        <Line>The look, in one sentence.</Line>

        <Stack>
          {/* Colour and type. For a feature on a client's own product, leave this pair out: their brand isn't ours to present. */}
          <Pair>
            <Tile ground="raised" label="Colour" className="flex min-h-[20rem] items-center justify-center gap-[4%] p-8">
              {["bg-background shadow-[inset_0_0_0_1.5px_var(--border)]", "bg-foreground", "bg-accent"].map((fill) => (
                <div key={fill} className={`aspect-square w-[28%] rounded-full ${fill}`} />
              ))}
            </Tile>
            <Tile ground="accent" label="Type" className="flex min-h-[20rem] flex-col justify-center gap-5 p-8 lg:p-12">
              <p className={`${BIG} text-[clamp(5rem,13vw,12rem)]`}>Aa</p>
              <p className="max-w-[16ch] text-[clamp(1.25rem,1rem+1.2vw,2rem)] leading-[1.15] font-semibold">A sentence from the app, in its own words</p>
            </Tile>
          </Pair>

          <Tile ground="ink" className="p-4 lg:p-14">
            <LiveBrowser src="/" title={`${APP.name} on a laptop`} />
          </Tile>
          <Caption>One line on what the laptop layout does with the room.</Caption>
        </Stack>
      </main>
      <Credits
        credits={[
          { role: "Idea, art direction, design", name: "Oliver Kure Olsen" },
          { role: "Built with agentic coding", name: "Claude Code" },
        ]}
        links={[{ label: "Open the app", href: "/" }]}
      />
    </CasePage>
  );
}
