# Project name

<!-- Template for a timed test. Fill each section in as you go, and delete these comments before handing in.
     Write it in the brief's language. The finished README fits on one screen. -->

## Before you start (delete this section)

In the Claude app's **Code** tab, start a session on the Mac's **Developer** folder (the one that holds every project) and type **`/new-test`**. It's the same for a practice and the real test. It asks for a name, where the brief is (a doc, a paste, a PDF or a link) and whether it's practice or real. Then it:

1. makes a private repo from this starter, clones it into `~/Developer/NAME`, installs it and starts it on http://localhost:3200,
2. writes the brief into `BRIEF.md`, and the start time and milestones into `HANDOFF.md`,
3. puts it on Vercel when you say yes (every push to `main` updates the live link),
4. finds out who uses it (ten minutes of desk research into the moment of use) and writes it below under "Who uses it and how they feel", and the facts of the world it lives in (how the data arrives, the rules, the money, the formats) under "The details that work",
5. plans the build with you from that: questions for the client, the core flow, what's left out, and two or three looks in a line each for you to pick from; then builds the first version whole, dark only: the app at the live link, and the presentation at `/stage` (AGENTS.md → The first version is the product), and walks it as the person in every situation before showing you (AGENTS.md → The details work),
6. near the end, puts your design into Figma as editable layers for the designer, linked from the README.

Without the command, do it by hand: on GitHub press **Use this template** (private), then tell Claude *"Clone github.com/Ollibolli8/NAME into ~/Developer/NAME. Work only in that folder: read its CLAUDE.md, AGENTS.md and HANDOFF.md first, then run npm ci and npm run dev."* Then on vercel.com: **Add New…** → **Project** → the repo → **Deploy**.

For a real test, the studio needs to see the repo at hand-in: make it public then, or invite their reviewer on GitHub.

Whichever way you start, the five lines under **The brief** come first, then your pick of a look, then the code.

One sentence: what it is and who it is for.

**Live:** <!-- https://….vercel.app (opens without a login): the app. The presentation: https://….vercel.app/stage -->

## The brief

<!-- Five lines, written in the first 15 minutes before any code. Every choice below answers to them. -->

- **Who:** <!-- a person, not a segment: "a parent with a full dishwasher" -->
- **When:** <!-- the moment of use: where, on what device, one hand or two, in what state of mind -->
- **Understand:** <!-- what they must get within ten seconds -->
- **Feel:** <!-- -->
- **Do:** <!-- the one thing they do next -->
- **Unlike the alternative:** <!-- what this client does that others don't, and the one moment in the UI that proves it. That moment gets the motion; everything else stays calm. -->

## Who uses it and how they feel

<!-- What I found out about the person and the moment of use, and where from. It backs up the five lines above. -->

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
     (a situation on /stage, or a test). Keep the three to six that matter most to the person; the presentation shows them.
     e.g. "Delay timers count whole hours → it only suggests starts the machine can be set to → situation Evening, plan.test.ts" -->

## Assumptions

<!-- Where the brief was open, what I assumed. One line each. -->

## Decisions

<!-- A running log while building, one line each: what I chose, because … Cut to the 4–5 that matter before hand-in. -->

## Not built, and why

<!-- At least two things left out on purpose, and why that's right for this person (til- og fravalg). What I ran out of time for goes under "What I'd do next" instead. -->

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
