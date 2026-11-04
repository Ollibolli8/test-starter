# Project name

<!-- Template for a timed test. Fill each section in as you go, and delete these comments before handing in.
     Write it in the brief's language. The finished README fits on one screen. -->

## Before you start (delete this section)

1. On GitHub, open this starter and press **Use this template** → **Create a new repository**. Name it after the case, choose **Public** if it will be sent as a link, and press **Create repository**.
2. In the Claude app's **Code** tab, open the `Developer` folder and write: *"Clone github.com/Ollibolli8/NAME into ~/Developer/NAME."*
3. Start a new Code session on the new folder (so it reads this repo's rules) and write: *"Run npm ci and npm run dev."* Open http://localhost:3000 and http://localhost:3000/kit.
4. On vercel.com: **Add New…** → **Project** → pick the repo → **Deploy**. The address it gives is the live link, and every push to `main` updates it.
5. Paste the brief to Claude in plan mode and say what you want. Claude writes it into `HANDOFF.md` and keeps that file up to date. Set the look first (colours, type, motion) and check it on `/kit`, then build.

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
