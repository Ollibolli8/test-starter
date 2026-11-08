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
- Every UI choice has a "because" tied to that person and moment ("large type, because it's read in a glance with one hand busy"). Taste is not a reason. Log it that way in README → Decisions.
- Restraint is a choice: name at least two things deliberately not built, and why, in README → Not built, and why.
- Numbers on screen: each has a unit, a comparison and a verdict ("1,84 kr/kWh · 40 % under nu · billigt"). One number per thing; never two that disagree.
- The client's difference gets one UI moment that proves it, and that moment is the page's one motion moment (see Motion).

### The first version is the product

Olle should never have to iterate a dull first version into a good one. The first build he sees is already the product at presentation quality, built whole.

- **The look before code.** Once the brief's five lines are written, propose two or three looks in one line each (the material, the signature form, the type, the colour), each taken from the person's world or the client's, and recommend one. Olle picks; build that one whole. Don't build a neutral version to style later.
- **An app by default.** A test case is usually someone doing one thing in one moment, so build it as an app from the start: one screen that gives the answer, the controls at the bottom where the thumb is, a sheet for the detail, installable (`lib/app.ts`, `app/manifest.ts`, `public/sw.js`). Build a site instead only when the brief is to persuade or tell (a campaign, a brand, a story) rather than help someone do something; write which and why in README → Decisions.
- **The hero.** On a phone the hero is the app's first screen: the answer in the person's words in `text-display`, held by one signature form drawn from their world (a machine's display, a ticket, a gauge, a map), which is where the one motion moment happens. On a desktop the hero is the stage (`components/stage.tsx`): the person's question as the headline, the live app in a phone, and every situation switchable beside it. No landing page in front of the app: it puts a tap between the person and the answer.
- **Glass on the chrome.** `glass` and `glass-strong` (`app/globals.css`) are for what floats over moving content: the tab bar, a sheet, a floating button (`components/app-shell.tsx`, `sheet.tsx` and `segmented.tsx` use them). It is the iPhone's own material since iOS 26, so the app reads as native, and it keeps the content in view under the control. Never on cards, behind body text or behind a number that must be read; text on glass uses `glass-strong`. Over a flat background it reads as grey, so it needs colour or content passing under it.
- **Craft picks.** Read `.claude/skills/craft/SKILL.md` and choose one to three of its techniques, each with a because tied to the brief, logged in README → Decisions. The signature form is always one of them. Glass and craft are material, not motion: there is still one motion moment.
- **Built whole the first time:** every situation on the stage (loading, empty, error, offline, stale, the brief's own edge cases) in the same look, light and dark, at 390 px and on the desktop stage, with reduced motion and the keyboard.
- **Look at it before showing it.** Screenshots at 390 px and 1440 px, light and dark, in every situation. Fix what a studio would notice first (the list at the end of the craft skill) before telling Olle it's ready. Then read every situation's words as the person would: no line may contradict another ("start it now" over "wait for tonight"), and the advice must still be right when the data is late or missing.

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

- `app/example-app.tsx` shows the app pieces working together on the stage (app shell, glass bar, sheet, situations, a count-up). Build the brief's app in its place and delete it.
- `app/kit/` is the tokens page: every colour, type size, control and motion on one page. Tune the tokens there first. Delete it before hand-in unless it is kept on purpose as the design system page.
- `lib/cart/` is a typed basket (prices in whole øre, saved in the browser, in step across tabs). For a shop brief, wrap the app in `<CartProvider>` in `components/providers.tsx` and use `useCart()`. Otherwise delete the folder and the kit's basket.

### Every state, not just the happy path

Design and build loading, empty, error, offline and stale-data states for every view that shows data. Say what the user sees and can do in each one. Each state is a situation on the stage (`lib/situations.ts`): the simulated source reads the situation and behaves that way (slow, empty, failing, offline with old data), so every state the reviewer switches to is the real app on its own data path, not a mock-up.

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
