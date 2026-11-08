<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Working rules for this timed client test

Read by every agent (Claude through CLAUDE.md, Codex directly). Read `HANDOFF.md` first and update it at the end of every job.

Commands: `npm run dev` (local server), `npm run check` (typecheck, lint, test, build). Run `npm run check` before every commit and fix what it reports; never commit red. GitHub runs the same check on every push.

### The brief comes first

- Before any code, fill README → The brief: who, when (the moment of use), what they must understand, feel and do, and what this client does that the alternative doesn't. Use the brief and desk research into the moment of use; ask Olle for any line you can't fill. Everything after answers to those lines.
- **The person before code, also when Olle says to build without asking.** README → Who uses it and how they feel holds a short scenario and at least five sourced facts about the person (who they are, their moment, what they know and fear, their eyes and hands, why they'd bother, what they complain about in today's tools), each with what it makes the app do. Desk research that covers only the data, the market or the tech doesn't count.
- Every UI choice has a "because" tied to that person and moment ("large type, because it's read in a glance with one hand busy"). Taste is not a reason, and neither is the data. Log each one that shows in README → Choices from the person with what it ruled out (the ambulance case: the person is panicking, so nothing blinks red); the rest in README → Decisions.
- Restraint is a choice: name at least two things deliberately not built, and why, in README → Not built, and why.
- Numbers on screen: each has a unit, a comparison and a verdict ("1,84 kr/kWh · 40 % under nu · billigt"). One number per thing; never two that disagree.
- The client's difference gets one UI moment that proves it, and that moment is the page's one motion moment (see Motion).

### The first version is the product

Olle should never have to iterate a dull first version into a good one. The first build he sees is already the product at presentation quality, built whole.

- **The look before code.** Once the brief's five lines are written, propose two or three looks in one line each (the material, the signature form, the type, the colour), each taken from the person's world or the client's, and recommend one. Olle picks; build that one whole. Don't build a neutral version to style later.
- **An app by default.** A test case is usually someone doing one thing in one moment, so build it as an app from the start: one screen that gives the answer, the controls at the bottom where the thumb is, a sheet for the detail, installable (`lib/app.ts`, `app/manifest.ts`, `public/sw.js`). Build a site instead only when the brief is to persuade or tell (a campaign, a brand, a story) rather than help someone do something; write which and why in README → Decisions.
- **The hero** is the app's first screen: the answer in the person's words in `text-display`, held by one signature form drawn from their world (a machine's display, a ticket, a gauge, a map), which is where the one motion moment happens. No landing page in front of the app or around it: it puts a tap between the person and the answer, and reads as selling the product instead of being it.
- **The link is the app; the presentation is `/stage`** (Olle, 8 November). `/` is the app on its own on every screen (`components/app-page.tsx`): on a desktop the app at its width in the middle and, from 1280 px, the live link and QR code in a corner. `/stage` (`components/stage.tsx`, noindex) is what Olle shares on screen while he presents: the app in a drawn phone, the QR code on the left for the room, every situation on the right. No pitch text on either: the idea is said in the presentation and written in the README. The app's sheet lists the situations too, so a reviewer at `/` can reach them (left out of the stage's phone on a desktop, through `useOnStage()`). For a site (a campaign or a brand), `/` is the site and there's no `/stage`.
- **Dark only, always** (Olle, 8 November): whatever is made, app or site, has one theme and it's dark (`app/globals.css` with `color-scheme: dark`, `APP.colour`, a black status bar). Design it for dark rather than inverting a light idea, and give the brief's own reason in README → Design choices → Colour (Strømpris: on an OLED screen a black pixel is off, so an app about saving power spends less of it).
- **Glass on the chrome.** `glass` and `glass-strong` (`app/globals.css`) are for what floats over moving content: the tab bar, a sheet, a floating button (`components/app-shell.tsx`, `sheet.tsx` and `segmented.tsx` use them). It is the iPhone's own material since iOS 26, so the app reads as native, and it keeps the content in view under the control. Never on cards, behind body text or behind a number that must be read; text on glass uses `glass-strong`. Over a flat background it reads as grey, so it needs colour or content passing under it.
- **Craft picks.** Read `.claude/skills/craft/SKILL.md` and choose one to three of its techniques, each with a because tied to the brief, logged in README → Decisions. The signature form is always one of them. Glass and craft are material, not motion: there is still one motion moment.
- **Built whole the first time:** every situation (loading, empty, error, offline, stale, the brief's own edge cases) in the same look, at 390 px, at `/` on a desktop and on `/stage`, with reduced motion and the keyboard.
- **Look at it before showing it.** Screenshots at 390 px and 1440 px (`/` and `/stage`) in every situation, and one with the system in light mode to see it stays dark. Fix what a studio would notice first (the list at the end of the craft skill) before telling Olle it's ready. Then read every situation's words as the person would: no line may contradict another ("start it now" over "wait for tonight"), and the advice must still be right when the data is late or missing.

### The details work

A creative developer is judged on more than how fast something good-looking appears: that it's the right thing for this person at this moment, that it fits the reality it lives in, and that the small things work. An agent tends to stop once the screen looks done, so this is a list and a pass, not a hope.

- **The reality it lives in, before code.** With the brief's five lines, start README → The details that work: the facts the app has to respect, each from the brief or desk research, never guessed. How and when the data really arrives; the rules of the thing itself (a machine's timer that counts whole hours, prices published at 13.00, a day of 92 or 100 quarters when the clocks change); the money (fees, VAT, rounding, how it's billed); the place (Danish formats: "1,84 kr", "21.15", "3 t 10 min"); the hand and the moment. Each fact becomes a rule in `lib/` with a test, a situation (`lib/situations.ts`), or a line in the UI. A fact that is none of them isn't handled.
- **Rules at their edges.** Each rule's test covers its boundaries, not just a normal day: now, midnight, the last known value, the clock change, zero, below zero, a tie, the largest value the feed allows.
- **Time keeps moving.** The answer stays right while the app is open (it moves on at the next step: a quarter, a minute) and when it's opened again from the home screen the next morning (it re-reads on return to the tab). "Now" is the device's clock; the time zone is the brief's (Europe/Copenhagen), never the server's.
- **Every control, every state.** Pressed, focused, disabled and busy; a second tap while busy does nothing twice; Back and Escape go where the person expects; nothing jumps when data arrives (keep its space); a choice the person made is remembered, and a second tab agrees.
- **A detail worth showing gets its own situation**, named after the moment ("Clock change night", "Price below zero", "Opened at 23.50"), so in the presentation it's one click away on `/stage` and the app proves it, not a slide.
- **The details pass**, after the screenshots in "Look at it before showing it", and again once features stop (about 20 minutes of a 3-hour test; fewer features finished whole beat more): start from the brief, not the code. As the person, in their moment, at 390 px with one thumb, do the core task once in every situation and ask on each screen: is this still the right thing to tell them now, would they act on it, and is any word, number or control wrong for them? Fix what fails, finish its line in README → The details that work (the fact → what the app does → where to see it), and check that every row of README → Choices from the person is still true on screen. If Olle has turned on a reviewer agent, give it the brief and the live link, not the code.

### Stack (fixed)

- Next.js App Router, TypeScript in strict mode (with `noUncheckedIndexedAccess`), Tailwind CSS, Motion (`motion/react`), Lenis.
- No other UI, component, animation or state libraries unless the brief needs one. If you add one, write why as a line in README → Decisions.
- Tailwind 4 runs through `@tailwindcss/turbopack` in `next.config.ts` (there is no PostCSS config and no `tailwind.config`). Tokens live in `app/globals.css`; use them (`bg-background`, `text-foreground`, `text-muted`, `border-border`, `bg-accent`, `text-display`, `ease-out-soft`) instead of new hex values or one-off sizes.
- In this Next.js version `error.tsx` gets `{ error, retry }` (type `ErrorInfo` from `next/error`); call `retry()`, not `reset()`. `LayoutProps` and `PageProps` are global types made by `next typegen`, which `npm run typecheck` runs first.

### Code

- Small typed components with clear names, one job each. Pages compose them. Shared pieces in `components/`, logic in `lib/`.
- No `any`. Use `unknown` and narrow it, or write the type.
- React's lint rules here refuse `Date.now()` during render and a `setState` straight in an effect body. Read a demo clock once with `useState(() => Date.now())` and derive from it; derive what you can instead of syncing it in an effect.
- Data comes through one typed interface, so a simulated source can be swapped for a real one in one place: types in `lib/data/types.ts`, the interface in `lib/data/source.ts`, the simulated source in `lib/data/simulated.ts`. Components import from the interface, never from the simulated source.
- Pure logic goes in `lib/` with a test next to it (`*.test.ts`, Vitest). `lib/cart/cart.ts` and its test show the pattern.
- No secrets or API keys in the repo. Use `.env.local` (gitignored) and say in the README which variables are needed.

### Motion

- Motion's own rules are in `.claude/skills/motion/` (read `best-practices/` before animating). This section is what this project adds.
- Tokens: durations and the easing curve in `lib/motion.ts`, the same curve as `ease-out-soft` in `app/globals.css`. Use them, don't invent new timings.
- Every animation shows a change of state, a relationship or feedback to an action. Nothing moves only to decorate. Small UI 150–300 ms, large surfaces up to ~500 ms.
- One moment per page: the thing the brief is really about gets the motion. Everything around it stays calm.
- Animate `transform` and `opacity` (and `clip-path`, `filter`). Use `layout` for size and position changes, `AnimatePresence` for exits, `<Reveal>` (`components/reveal.tsx`) for entrances on scroll. Hover, focus and simple colour changes stay in CSS (`transition-*` with `ease-out-soft`).
- Reduced motion: `MotionConfig reducedMotion="user"` in `components/providers.tsx` turns off Motion's movement and keeps fades. For CSS use `motion-safe:` / `motion-reduce:`. Anything custom (scroll-linked, loops, canvas) checks `useReducedMotion()` and has a still version.
- Smooth scroll (Lenis, `components/smooth-scroll.tsx`) is on for mouse and trackpad, off on touch and under reduced motion. Turn it off (`SMOOTH_SCROLL = false`) for apps, tools, dashboards and forms, where the screen scrolls inside the app shell. An element that scrolls on its own (a drawer, a long list) needs `data-lenis-prevent`.

### Examples to keep or delete

- `app/example-app.tsx` shows the app pieces working together at `/` and on `/stage` (app page, stage, app shell, glass bar, sheet, situations, a count-up). Build the brief's app in its place and delete it.
- `app/kit/` is the tokens page: every colour, type size, control and motion on one page. Tune the tokens there first. Delete it before hand-in unless it is kept on purpose as the design system page.
- `lib/cart/` is a typed basket (prices in whole øre, saved in the browser, in step across tabs). For a shop brief, wrap the app in `<CartProvider>` in `components/providers.tsx` and use `useCart()`. Otherwise delete the folder and the kit's basket.

### Every state, not just the happy path

Design and build loading, empty, error, offline and stale-data states for every view that shows data. Say what the user sees and can do in each one. Each state is a situation (`lib/situations.ts`), switchable from the app's sheet and beside the phone on `/stage`: the simulated source reads the situation and behaves that way (slow, empty, failing, offline with old data), so every state the reviewer switches to is the real app on its own data path, not a mock-up.

### Layout and accessibility

- Phone first: build and check at 390 px wide, then scale up with `sm:`/`md:`/`lg:`.
- Semantic HTML: one `h1` per page, landmarks (`main`, `nav`, `header`), real `button` and `a` elements, lists for lists.
- Every input has a visible label. Text and controls meet 4.5:1 contrast. Touch targets at least 44 px (`min-h-11`).
- Everything works with the keyboard, in a sensible order, with visible `focus-visible` rings.
- Live updates have screen reader text (`aria-live="polite"` or `role="status"`, `sr-only` where the visual is not text).
- Set `<html lang>` in `app/layout.tsx` to the UI's language (`da` for a Danish interface).

### Working with Olle

- Olle owns the idea, art direction and design; agents build. Ask before a design decision, don't make it silently.
- Log each decision as one line in README → Decisions as you go (what, because …, in plain words).
- When asked, explain every file you wrote in plain words: what it does, why it is there and what would break without it.
- Keep the README sections filled in as the work moves, so it is ready to hand in at any moment.

### Before hand-in

1. README fits one screen: every section filled, Decisions cut to the 4–5 that matter, the "Before you start" section gone.
2. Unused examples deleted (`app/example-app.tsx`, `app/kit/`, `lib/cart/`), no leftover starter copy (`lib/app.ts` holds the name; the icons in `app/icon.svg` and `app/apple-icon.tsx` are the app's own).
3. `npm run check` green, and the live link opens without a login.
4. Checked at 390 px and on desktop, with the keyboard, and with reduced motion on.
5. A ten-second test with someone who hasn't seen it: what they said it was and what they'd do, written in README → Ten-second test.
6. The details pass done (The details work), and the presentation follows the README: the brief (who, when, understand, feel, do), the app on `/stage`, two or three of the details that work (each shown in its situation and said as the person's moment: what would go wrong for them without it), what's not built and why, and what you'd test next.
