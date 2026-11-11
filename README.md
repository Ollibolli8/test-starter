# Project name

<!-- Template for a timed test. Fill each section in as you go, and delete these comments before handing in.
     Write it in the brief's language. The finished README fits on one screen. -->

## Before you start (delete this section)

In the Claude app's **Code** tab, start a session on the Mac's **Developer** folder (the one that holds every project) and type **`/new-test`**. It's the same for a practice and the real test. It asks for a name, where the brief is (a doc, a paste, a PDF or a link) and whether it's practice or real. Then it:

1. makes a private repo from this starter, clones it into `~/Developer/NAME`, installs it and starts it on http://localhost:3200,
2. writes the brief into `BRIEF.md`, and the start time and milestones into `HANDOFF.md`,
3. puts it on Vercel when you say yes (every push to `main` updates the live link),
4. writes the client's problem in five lines under "The client's problem" (who pays and why now, what it costs them today, how they would see it worked, what limits them, who has to say yes), then finds out who uses it (fifteen minutes of desk research into the person and their moment, with sources and at least one primary signal such as app reviews) and writes it below under "Who uses it and how they feel", starts "Choices from the person" (each choice and what it ruled out, traced to a fact about them), and writes the facts of the world it lives in (how the data arrives, the rules, the money, the formats) under "The details that work",
5. plans the build with you from that: questions for the client, the core flow and what's left out; then finds the look (about 20 minutes: what everyone in the trade does is ruled out, ten ideas from outside apps, and three built as real phone screens from safe to wild, side by side at http://localhost:3200/looks for you to pick from); then builds the first version whole, in the client's brand when the brief gives one, otherwise dark: the app at the live link (a phone first, laid out for a desktop too), with every situation in its own sheet (AGENTS.md → The first version is the product), and walks it as the person in every situation before showing you (AGENTS.md → The details work),
6. near the end, after that walk, fills the case page at `/case`: the app shown the way a studio shows its own work, mostly big pictures of the app running live in phones, about a hundred words (AGENTS.md → The case page),
7. draws every state of the first screen as editable artboards on a Claude Design canvas, and boils this README down to a Claude Whiteboard you present from, both linked from the README.

Without the command, do it by hand: on GitHub press **Use this template** (private), then tell Claude *"Clone github.com/Ollibolli8/NAME into ~/Developer/NAME. Work only in that folder: read its CLAUDE.md, AGENTS.md and HANDOFF.md first, then run npm ci and npm run dev."* Then on vercel.com: **Add New…** → **Project** → the repo → **Deploy**.

For a real test, the studio needs to see the repo at hand-in: make it public then, or invite their reviewer on GitHub.

Whichever way you start, the five lines under **The brief** come first, then your pick of a look, then the code.

One sentence: what it is and who it is for.

**Live:** <!-- https://….vercel.app (opens without a login): the app. The case: https://….vercel.app/case. The states: the Claude Design canvas's link -->

## The brief

<!-- Five lines, written in the first 15 minutes before any code. Every choice below answers to them. -->

- **Who:** <!-- a person, not a segment: "a parent with a full dishwasher" -->
- **When:** <!-- the moment of use: where, on what device, one hand or two, in what state of mind -->
- **Understand:** <!-- what they must get within ten seconds -->
- **Feel:** <!-- -->
- **Do:** <!-- the one thing they do next -->
- **Unlike the alternative:** <!-- what this client does that others don't, and the one moment in the UI that proves it. That moment gets the motion; everything else stays calm. -->

## The client's problem

<!-- Written first, in about three minutes, from the brief's own background. The client's problem is the business's,
     not the user's: the client pays for the work because something costs it money, time or trust today. Where the
     brief is silent, look the client or its trade up and name the source, or mark the line as an assumption and
     make it a question for the client. Never a cost or a result that is made up: the table's last column is how
     they would measure it, not what happened. -->

- **Who pays, and why now:** <!-- who at the client owns this, and what made them ask -->
- **What it costs them today:** <!-- in something they already count: support contacts, payments sent back, customers leaving, hours -->
- **How they would see it worked:** <!-- the number that would move, and where they would read it -->
- **What limits them:** <!-- what the brief says isn't there (no back-end free, no real data, a deadline, a brand, a rule for the AI), and what the build does about each -->
- **Who has to say yes:** <!-- compliance, legal, a board, the people on the phones, and what each needs to see -->

| What it costs the client today | What the app does about it | How the client would see it worked |
| --- | --- | --- |

<!-- Two to four rows. Then one line where the client's problem and the person's moment pull apart (the client wants
     fewer calls, the person wants a human), and which one the build follows. -->

## Who uses it and how they feel

<!-- Written before any code. A short scenario of the moment (marked as assumptions), then at least five facts about
     the PERSON, not the data, each with who says it (source and year, beside the number) and what it makes the app do:
     "- 5–8 % of men are colour blind, mostly red-green (sundhed.dk, 2024) → cheap and dear never differ by colour alone"
     Then one line on how production would check them (five customers, support tickets, watch someone use it). -->

## Choices from the person

<!-- One row per choice that shows, filled in while building. The reason is a fact or part of the moment above, never
     the data, the screen or taste. At least one row each for colour, type, motion, layout, wording and something left out.
     e.g. | No red anywhere | panicked, so red reads as alarm (fact) | red for dear prices, a blinking countdown | -->

| Choice | Because (the person) | Ruled out |
| --- | --- | --- |

## Design choices and why

<!-- Each line: what I chose, because … (the person or the moment above, never taste). -->

- **Colour:** <!-- e.g. calm, because it's money, not an alarm -->
- **Type:** <!-- e.g. the answer in large type, because it's read in a glance with one hand busy -->
- **Motion:** <!-- what moves, because …, and what happens with reduced motion on -->
- **Layout:** <!-- -->
- **Numbers:** <!-- every number has a unit, a comparison and a verdict ("1,84 kr/kWh · 40 % under nu · billigt"); one number per thing, never two that disagree -->

## The details that work

<!-- The reality it lives in, and what the app does about it. Start it with the brief (the facts, from the brief or
     desk research), finish each line as it's built. One line each: the fact → what the app does → where to see it
     (a situation in the app, or a test). Keep the three to six that matter most to the person; the presentation shows them.
     e.g. "Delay timers count whole hours → it only suggests starts the machine can be set to → situation Evening, plan.test.ts" -->

## Assumptions

<!-- Where the brief was open, what I assumed. One line each. -->

## Decisions

<!-- A running log while building, one line each: what I chose, because … Cut to the 4–5 that matter before hand-in.
     Choices the person shows go in Choices from the person; this is for the rest (Ruled out: what everyone in the trade
     does; the look picked and the two that lost, each with why; craft picks; stack). -->

## Not built, and why

<!-- At least two things left out on purpose, and why that's right for this person (til- og fravalg). What I ran out of time for goes under "What I'd do next" instead. -->

## Presenting it

<!-- The order for the presentation, the client first, then the person: 1. the client's problem in half a minute (what
     it costs them today, what the app does about it, how they would see it worked); 2. who it's for in half a minute
     (the moment, three facts, what each changed, and how the client's own data would check them: support tickets,
     addresses, usage), then one sentence for every row of Choices from the person, to be said aloud with the source
     named: "Cheap and dear differ by height, not just colour, because sundhed.dk puts colour blindness at 5–8 % of
     men."; 3. the three looks at /looks, what the trade does and why this one; 4. the app at /, in the situations
     that show the details, then every state at once on the Claude Design canvas; 5. the desktop at /; 6. what I'd need and what's
     next. Afterwards the studio gets /case to read in their own time. -->

## Ten-second test

<!-- Someone who had never seen it, ten seconds on the phone: what they said it was, what they'd do, and what I changed after. -->

## What I'd need from the team

<!-- What I'd ask the back-end, UX, the client for, to take it further. -->

## What I'd do next

<!-- Concrete and tied to the brief: what I left out for time, what I'd test with real users, and the next steps in order. -->

## How it was built

I own the idea, art direction and design, and build with agentic coding.
<!-- Danish: Jeg står for idé, art direction og design og bygger med agentisk kodning. -->

- Started from my own starter, set up before the test: Next.js App Router, TypeScript, Tailwind CSS, Motion, Lenis smooth scroll, tests, the rules the agents follow (`AGENTS.md`, `HANDOFF.md`, the craft skill), and the app pieces I reuse: the app page, the presentation stage, the app shell, the glass, the sheet, the segmented control, the count-up and the install files. Everything for this brief was made today.
- <!-- Which agents did what, and what I changed by hand and why. Name files. -->

## Run it

Needs Node 24 or newer.

```bash
npm ci
npm run dev
```

Then open http://localhost:3000.

`npm run check` runs the type check, lint, tests and a production build. It runs on every push too.
