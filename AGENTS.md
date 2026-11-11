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
- **The client's problem first, in five lines** (Olle, 10 November). It is the business's problem, not the user's: the client pays for the work because something costs it money, time or trust today. README → The client's problem, from the brief's own background: who pays and why now, what it costs them today (in something they already count), how they would see it worked (the number that would move; never a result claimed), what limits them (and what the build does about each), and who has to say yes. Then its table: what it costs → what the app does about it → how they would see it worked. Where the brief is silent, name a source or mark an assumption and make it a question for the client.
- **The person before code, also when Olle says to build without asking.** README → Who uses it and how they feel holds a short scenario and at least five sourced facts about the person (who they are, their moment, what they know and fear, their eyes and hands, why they'd bother, what they complain about in today's tools), each with what it makes the app do. Desk research that covers only the data, the market or the tech doesn't count.
- **Two problems, one screen.** The client's problem says what the screen must achieve and what it may not do; the person's moment says how it has to look, read and feel to achieve it. When the two pull apart, say which one the build follows and why.
- **A statistic always names who says it** (Olle, 10 November): the source's name and year stand beside the number, in the README, the case page, the presentation's sentences and in chat ("5–8 % of men are colour blind (sundhed.dk, 2024)"). A number with no source to name is left out or marked as an assumption.
- **The presentation opens with the client, then the person,** before the app: the client's problem in half a minute (what it costs them, what the app does about it, how they would see it worked), then the moment, three facts, what each changed, and how the client's own data would check them (support tickets, addresses, usage). The person is what the client gets that it may not have: many Danish companies are owned by their customers or a municipality and know their members from the bill, not from the moment of use. `PRESENTING.md` holds the order: Olle's own notes, with the lines he says. The README is for the whole team and the studio's reviewer, so nothing in it is a script (Olle, 11 November).
- Every UI choice has a "because" tied to that person and moment ("large type, because it's read in a glance with one hand busy"). Taste is not a reason, and neither is the data. Log each one that shows in README → Choices from the person with what it ruled out (the ambulance case: the person is panicking, so nothing blinks red); the rest in README → Decisions.
- Restraint is a choice: name at least two things deliberately not built, and why, in README → Not built, and why.
- Numbers on screen: each has a unit, a comparison and a verdict ("1,84 kr/kWh · 40 % under nu · billigt"). One number per thing; never two that disagree.
- The client's difference gets one UI moment that proves it, and that moment is the page's one motion moment (see Motion).

### The first version is the product

Olle should never have to iterate a dull first version into a good one. The first build he sees is already the product at presentation quality, built whole.

- **A look that stands out, found before code** (Olle, 9 November: the look and the interaction must be unique and forward-looking, because that's part of a creative developer's job). Left alone an agent designs the average of what it has seen, so the look is its own step, right after the brief, the person and the facts, about 20 minutes: `.claude/skills/look/SKILL.md`. The trade's clichés written down and ruled out, ten seeds from outside apps, and three of them built as real first screens from Crafted to Wild, side by side in phones at `/looks`, with a recommendation. Olle picks from the screens, not from sentences, and the pick is the start of the build. Bold in the form, the motion moment, the type and the voice; ordinary in the controls, so the details still work. Never build a neutral version to style later.
- **An app by default.** A test case is usually someone doing one thing in one moment, so build it as an app from the start: one screen that gives the answer, the controls at the bottom where the thumb is, a sheet for the detail, installable (`lib/app.ts`, `app/manifest.ts`, `public/sw.js`). Build a site instead only when the brief is to persuade or tell (a campaign, a brand, a story) rather than help someone do something; write which and why in README → Decisions.
- **The hero** is the app's first screen: the answer in the person's words in `text-display`, held by one signature form drawn from their world (a machine's display, a ticket, a gauge, a map), which is where the one motion moment happens. No landing page in front of the app or around it: it puts a tap between the person and the answer, and reads as selling the product instead of being it.
- **The link is the app, and there are two pages: the app and the case page** (Olle, 11 November; `/stage` and `/states` are gone). `/` is the app on its own on every screen (`components/app-page.tsx`). The phone is the first design; on a desktop (Olle, 8 November: never only the phone column on a black page) the same app is laid out for the room it has: `<AppPage wide>` lets it fill the window from 1024 px, and `AppShell` is a size container, so the app's `@5xl:` classes take over (two things side by side, what the sheet holds in the open beside the answer, the signature form larger, the live link and QR code placed in its own layout). Container queries, not the window's width, so a drawn phone on the case page stays a phone. No pitch text in the app: the idea is said in the presentation and written in the README. The app's own sheet lists the situations (`components/situation-list.tsx`), so Olle presents from `/` and a reviewer reaches every state there. No presentation page and no states page: a stage only repeated what the app's sheet already does. For a site (a campaign or a brand), `/` is the site.
- **One theme: the client's brand, otherwise dark** (Olle, 10 November; it was dark only from 8 November, and that rule is retired wherever it still shows). When the brief hands over a brand or a design (colours, type, a mark, a design file), carry it as given, light or dark, and design for that theme rather than inverting the other one: the client's brand beats this starter's dark tokens. With no brand given, the app is dark, and README → Design choices → Colour gives the brief's own reason (Strømpris: on an OLED screen a black pixel is off, so an app about saving power spends less of it). Either way there is one theme, and no light/dark switch unless the brief asks for one. It is set in two places that a test keeps in step (`lib/theme.test.ts`): `APP.scheme` and `APP.colour` in `lib/app.ts` (the status bar, the install splash, the case page's live phones) and `color-scheme` with the tokens in `app/globals.css`. A light theme needs its own glass too: the light set is written out in `globals.css`.
- **Glass on the chrome.** `glass` and `glass-strong` (`app/globals.css`) are for what floats over moving content: the tab bar, a sheet, a floating button (`components/app-shell.tsx`, `sheet.tsx` and `segmented.tsx` use them). It is the iPhone's own material since iOS 26, so the app reads as native, and it keeps the content in view under the control. Never on cards, behind body text or behind a number that must be read; text on glass uses `glass-strong`. Over a flat background it reads as grey, so it needs colour or content passing under it.
- **Craft picks.** Read `.claude/skills/craft/SKILL.md` and choose one to three of its techniques, each with a because tied to the brief, logged in README → Decisions. The signature form is always one of them. Glass and craft are material, not motion: there is still one motion moment.
- **Built whole the first time:** every situation (loading, empty, error, offline, stale, the brief's own edge cases) in the same look, at 390 px and at `/` on a desktop, with reduced motion and the keyboard. Each opens from the address (`?s=…`).
- **The states go on a Claude Design canvas** (Olle, 11 November), not on a page of the app: once the app is whole, every state of the first screen is an editable 390 × 844 artboard on one canvas (the Artifact tool's Design type), drawn from the real screens' words and measurements. It shows the app's range at a glance, and that Olle works the way a designer does in Figma. It is a copy, so redraw the artboards a change touches. Link it from README → Live.
- **A reviewer's pass, unasked.** Open the link as the studio will, on a laptop first, then a phone, and list what a studio would expect that the brief and these rules don't ask for (a designed desktop layout, a first-run setup, the client's mark, an empty state). Build the obvious ones when Olle has said to build without asking, propose the rest with a recommendation. These rules are defaults to question, not limits.
- **Look at it before showing it.** Screenshots at 390 px and 1440 px (`/`) in every situation (`?s=…`), and one with the system in the other mode (light for a dark app, dark for a light one) to see it keeps its one theme. Fix what a studio would notice first (the list at the end of the craft skill) before telling Olle it's ready. Then read every situation's words as the person would: no line may contradict another ("start it now" over "wait for tonight"), and the advice must still be right when the data is late or missing.

### The details work

A creative developer is judged on more than how fast something good-looking appears: that it's the right thing for this person at this moment, that it fits the reality it lives in, and that the small things work. An agent tends to stop once the screen looks done, so this is a list and a pass, not a hope.

- **The reality it lives in, before code.** With the brief's five lines, start README → The details that work: the facts the app has to respect, each from the brief or desk research, never guessed. How and when the data really arrives; the rules of the thing itself (a machine's timer that counts whole hours, prices published at 13.00, a day of 92 or 100 quarters when the clocks change); the money (fees, VAT, rounding, how it's billed); the place (Danish formats: "1,84 kr", "21.15", "3 t 10 min"); the hand and the moment. Each fact becomes a rule in `lib/` with a test, a situation (`lib/situations.ts`), or a line in the UI. A fact that is none of them isn't handled.
- **Rules at their edges.** Each rule's test covers its boundaries, not just a normal day: now, midnight, the last known value, the clock change, zero, below zero, a tie, the largest value the feed allows.
- **Time keeps moving.** The answer stays right while the app is open (it moves on at the next step: a quarter, a minute) and when it's opened again from the home screen the next morning (it re-reads on return to the tab). "Now" is the device's clock; the time zone is the brief's (Europe/Copenhagen), never the server's.
- **Every control, every state.** Pressed, focused, disabled and busy; a second tap while busy does nothing twice; Back and Escape go where the person expects; nothing jumps when data arrives (keep its space); a choice the person made is remembered, and a second tab agrees.
- **A detail worth showing gets its own situation**, named after the moment ("Clock change night", "Price below zero", "Opened at 23.50"), so in the presentation it's one tap away in the app's sheet and the app proves it, not a slide.
- **The details pass**, after the screenshots in "Look at it before showing it", and again once features stop (about 20 minutes of a 3-hour test; fewer features finished whole beat more): start from the brief, not the code. As the person, in their moment, at 390 px with one thumb, do the core task once in every situation and ask on each screen: is this still the right thing to tell them now, would they act on it, and is any word, number or control wrong for them? Fix what fails, finish its line in README → The details that work (the fact → what the app does → where to see it), and check that every row of README → Choices from the person is still true on screen. If Olle has turned on a reviewer agent, give it the brief and the live link, not the code.

### The case page

`/case` (`app/case/page.tsx`, noindex) shows the product the way a studio shows its own work, after Signifly's own cases (Sundhedskort: about 360 words over some twenty pictures). Mostly pictures, about a hundred words. It is the frame around the product, never in its place, so it comes last: after the details pass, about 20–30 minutes.

- **Pictures before words** (Olle, 11 November). Big tiles of the app on full-colour grounds (`Tile`), two half tiles side by side (`Pair`), one sentence in large type between groups (`Line`), and a line of small type only where a picture needs it (`Caption`). The pieces are in `components/case/blocks.tsx` and the page holds its own few words. The reasoning stays in the README and is said in the presentation.
- **The order:** the two-line title (the client, then the project); the first screen in a phone on the brand's colour; three facts, one paragraph of at most thirty words and four numbers; the idea as one picture, drawn in type or the signature form; a line; the hardest situation beside its signature form; a row of the other situations; a line; colour and type; the laptop as two pictures; a button to the app. No credits (Olle, 11 November).
- **The phones run the app.** Every phone on it is the real app at `/?s=<situation>` (`components/case/live.tsx`): a reviewer on a laptop taps it right there, a tap on a phone opens that screen full size. The laptop layout is two pictures taken from the running app (`scripts/case-pictures.plan.mjs` writes `public/case/laptop-1.webp` and `laptop-2.webp`), never a live window with an address at the end of the case (Olle, 11 November). Keep the situations in a plain module, not a `"use client"` file, so the case can read them.
- **Numbers are counts, never results:** situations, tests, taps to the answer, each with its date if it can change. Nothing about users, savings or reach.
- **A feature on a client's existing product** leaves out the colour and type pair: their brand isn't ours to present.
- In the studio's language while the app keeps the person's, checked at 390 px and 1440 px and with reduced motion. Olle presents from the whiteboard and the app; `/case` is what the studio reads afterwards, linked from README → Live.

### The presentation, on a Claude Whiteboard

Olle presents from a Claude Whiteboard (11 November): an illustrated infographic of the presentation, so a studio sees him make the app, present it, and lay the states out on a design canvas. It is made near the end, from the finished README (the `/new-test` command's last step).

- **One drawn picture per step, a title and one line.** Every step of the presentation is on it, as a picture: the client's problem, the person's moment, what we know, the three looks as pictures with the picked one marked, the rule the pick gave, the choices, the look, the app, the details, the AI if there is one, how it's built, what is still open, what is needed. Under each picture its number and name, and one line of at most eight words. Arrows join the steps, about five to a row.
- **The pictures carry it.** Each is a small drawing of the real thing in that step (a phone beside a morning cup for "before the day starts", ten dots with four filled for "4 in 10", a calendar with the 31st crossed), drawn as the Whiteboard type's own SVG pictures, plus one larger picture of the idea beside the title. The app's own colours are real filled circles, and the app itself is its real screens, taken from the running app, with each situation's name under it.
- **Words stay in the README.** No tables, no lists, no paragraphs, no frames of text. He rejected two boards for this: the first had tables and captions ("way too much text"), the second had every README row in a few words ("basically only text now"). The one statistic that is drawn names who says it.
- It is a copy of the README, so change both together. The live part of the presentation is still the app itself.

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
- A hand-written loop (a spring, anything on `requestAnimationFrame`) keeps its own time: step it by the clock, never once per frame. Counted per frame it runs twice as fast on Olle's 120 Hz laptop as on a 60 Hz phone (Råd's ring, 10 November). Then time it: how long it takes to settle, and that nothing it moves passes the edge of its box or shrinks to nothing on the way.
- Motion is checked in motion, not from a still. When the Browser pane is hidden its page doesn't animate, so drive real Chrome instead: the portfolio's `scripts/shot.mjs` takes a plan and any localhost address, with mouse, touch and keys through `page.send("Input.…")` (it has no dependencies; run it from `~/Developer/oliver-portfolio`).
- Smooth scroll (Lenis, `components/smooth-scroll.tsx`) is on for mouse and trackpad, off on touch and under reduced motion. Turn it off (`SMOOTH_SCROLL = false`) for apps, tools, dashboards and forms, where the screen scrolls inside the app shell. An element that scrolls on its own (a drawer, a long list) needs `data-lenis-prevent`.

### Examples to keep or delete

- `app/example-app.tsx` shows the app pieces working together at `/` (app page, app shell, glass bar, sheet, situations, a count-up). Build the brief's app in its place and delete it, with `app/example-situations.ts` once the brief's situations have their own plain module.
- `app/case/` is the case page with the example app in it (The case page): keep the page, refill `content.tsx` and `parts.tsx` for the brief.
- `app/looks/` holds three placeholder looks on the looks board (`components/look-board.tsx`). Replace them with the brief's three (the look skill) and keep the page: it stays at hand-in, noindex.
- `app/kit/` is the tokens page: every colour, type size, control and motion on one page. Tune the tokens there first. Delete it before hand-in unless it is kept on purpose as the design system page.
- `lib/cart/` is a typed basket (prices in whole øre, saved in the browser, in step across tabs). For a shop brief, wrap the app in `<CartProvider>` in `components/providers.tsx` and use `useCart()`. Otherwise delete the folder and the kit's basket.

### Every state, not just the happy path

Design and build loading, empty, error, offline and stale-data states for every view that shows data. Say what the user sees and can do in each one. Each state is a situation (`lib/situations.ts`), switchable from the app's sheet: the simulated source reads the situation and behaves that way (slow, empty, failing, offline with old data), so every state the reviewer switches to is the real app on its own data path, not a mock-up.

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
2. Unused examples deleted (`app/example-app.tsx`, `app/kit/`, `lib/cart/`; `/looks` holds the brief's three looks, not the placeholders), no leftover starter copy (`lib/app.ts` holds the name; the icons in `app/icon.svg` and `app/apple-icon.tsx` are the app's own).
3. `npm run check` green, and the live link opens without a login.
4. Checked at 390 px and on desktop, with the keyboard, and with reduced motion on.
5. A ten-second test with someone who hasn't seen it: what they said it was and what they'd do, written in README → Ten-second test.
6. `/case` filled for the brief (The case page), with no example words or parts left, at 390 px and 1440 px.
7. The details pass done (The details work), and the presentation (`PRESENTING.md`) follows the README: the brief (who, when, understand, feel, do), the app at `/`, switched through its situations from its own sheet (its whole range at a glance on the Claude Design canvas), two or three of the details that work (each shown in its situation and said as the person's moment: what would go wrong for them without it), what's not built and why, and what you'd test next.
