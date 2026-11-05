# Project name

<!-- Template for a timed test. Fill each section in as you go, and delete these comments before handing in.
     Write it in the brief's language. The finished README fits on one screen. -->

## Before you start (delete this section)

In the Claude app's **Code** tab, start a session on the Mac's **Developer** folder (the one that holds every project) and type **`/new-test`**. It's the same for a practice and the real test. It asks for a name, where the brief is (a doc, a paste, a PDF or a link) and whether it's practice or real. Then it:

1. makes a private repo from this starter, clones it into `~/Developer/NAME`, installs it and starts it on http://localhost:3200,
2. writes the brief into `BRIEF.md`, and the start time and milestones into `HANDOFF.md`,
3. puts it on Vercel when you say yes (every push to `main` updates the live link),
4. plans the build with you: questions for the client, the core flow, what's left out, a first look on `/kit`,
5. near the end, puts your design into Figma as editable layers for the designer, linked from the README.

Without the command, do it by hand: on GitHub press **Use this template** (private), then tell Claude *"Clone github.com/Ollibolli8/NAME into ~/Developer/NAME. Work only in that folder: read its CLAUDE.md, AGENTS.md and HANDOFF.md first, then run npm ci and npm run dev."* Then on vercel.com: **Add New…** → **Project** → the repo → **Deploy**.

For a real test, the studio needs to see the repo at hand-in: make it public then, or invite their reviewer on GitHub.

One sentence: what it is and who it is for.

**Live:** <!-- https://….vercel.app (opens without a login) -->

## The idea

<!-- The problem in my own words, and the one moment the whole thing is built around. Everything else stays calm around it. -->

## Who uses it and how they feel

<!-- Who, where, in what state of mind. That decides everything below. -->

## Design choices and why

- **Colour:** <!-- what I chose, and why for this person in this situation -->
- **Type:** <!-- -->
- **Motion:** <!-- what moves, why, and what happens with reduced motion on -->
- **Layout:** <!-- -->

## Assumptions

<!-- Where the brief was open, what I assumed. One line each. -->

## Decisions

<!-- A running log while building, one line each: what I chose and why. Cut to the 4–5 that matter before hand-in. -->

## What I'd need from the team

<!-- What I'd ask the back-end, UX, the client for, to take it further. -->

## What I'd do next

<!-- Concrete and tied to the brief: what I left out for time, what it costs, and the next steps in order. -->

## How it was built

I own the idea, art direction and design, and build with agentic coding.
<!-- Danish: Jeg står for idé, art direction og design og bygger med agentisk kodning. -->

- Started from my own starter, set up before the test: Next.js App Router, TypeScript, Tailwind CSS, Motion, Lenis smooth scroll, tests, and the rules the agents follow (`AGENTS.md`, `HANDOFF.md`). Everything for this brief was made today.
- <!-- Which agents did what, and what I changed by hand and why. Name files. -->

## Run it

Needs Node 24 or newer.

```bash
npm ci
npm run dev
```

Then open http://localhost:3000.

`npm run check` runs the type check, lint, tests and a production build. It runs on every push too.
