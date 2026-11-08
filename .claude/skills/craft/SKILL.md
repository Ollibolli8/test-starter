---
name: craft
description: The craft menu for a test case's first version - the signature form, glass, kinetic numbers, view transitions, P3 colour, type, haptics, shaders - with when each fits, how to build it in this stack, and what a studio notices first. Read before designing the first screen.
---

# Craft for the first version

The test is judged on an iPhone in Safari and on a laptop in the presentation. Every technique here works in both, fits in a three-hour test, and has a still version. Pick one to three, each with a because tied to the brief (README → Decisions). The signature form is always one of them. Taken from Olle's craft file in the portfolio (`docs/creative-tools.md`), cut to what earns its place in a timed app.

## 1. The signature form (always)

The hero's one memorable thing: an object from the person's own world that holds the answer, so the data is read the way they already read that object. A dishwasher's seven-segment display inside a 24-hour dial; a ticket stub; a thermometer; a departure board; a receipt; a pill organiser; a parking disc.

- Find it from the moment of use: what does the person look at, hold or press right then? The object that answers "what do I do now" in their world is the form.
- Draw it in SVG, as a component that takes the data (`<Dial slots={…} />`), crisp at 2× and themeable through the colour tokens. A canvas only if it has to move every frame.
- It carries the one motion moment: the answer arriving or changing (a hand swinging to the time, segments lighting, a stub tearing).
- Give it a text twin for screen readers (`role="img"` and an `aria-label` with the answer, or an `sr-only` sentence).
- Trap: decoration. If the form doesn't hold data the person needs, it's an illustration; cut it.

## 2. Glass on the chrome (the starter's `glass` and `glass-strong`)

For what floats over moving content: the tab bar, the sheet, a floating button. Native to the iPhone since iOS 26, and it keeps the screen in view under the control.

- Already in `components/app-shell.tsx` (the bar floats over the screen), `sheet.tsx` and `segmented.tsx`.
- It needs something under it: the signature form's colour, a photo, a list scrolling by. Over flat white it's grey.
- Text on glass: `glass-strong`. Numbers that must be read never sit on glass.
- One light for the whole app: rims lit top left, shadows falling down. Don't mix light directions.
- Trap: glass cards. Glass on everything is a 2021 Dribbble look and fails contrast; a reviewer reads it as a trend, not a choice.
- A refracting WebGL glass (the craft file's liquidGL, `@ybouane/liquidglass`, Liquid Glass Studio) is not for a test: heavy, fragile in Safari, and the CSS glass covers chrome. Only as the hero itself (section 8).

## 3. Kinetic numbers (`components/count-up.tsx`)

The answer counting to its value as it arrives or changes. Fits when the answer is a number the person acts on (a time, a price, a count). Pass the brief's own format (`format={(n) => kr(n)}`). Screen readers get the final value; reduced motion shows it at once. Only on the answer, never on every figure.

## 4. View transitions (React's `<ViewTransition>`)

A thing that stays the same thing across two states (a tab's answer becoming the screen's answer, a list row opening into its detail) moves instead of cutting. React 19.3 exports `<ViewTransition>` from `react`; Next 16 needs no config for it (read `node_modules/next/dist/docs/` first). Safari 18 and later play it; elsewhere it cuts, which is fine. Give the shared element the same `name` in both states. Trap: using it as a page fade; that's decoration.

## 5. Display-P3 colour

More vivid colour on every iPhone and Mac, free. Write the token as a hex fallback, then the P3 version:

```css
:root { --accent: #2f6df0; }
@supports (color: color(display-p3 0 0 0)) { :root { --accent: color(display-p3 0.16 0.42 0.98); } }
```

Fits when colour carries meaning (cheap blue, dear orange) or the client's brand colour. Check contrast on the sRGB fallback too.

## 6. Type from the client's world

One family with character, loaded with `next/font/google` (self-hosted at build, no font CDN at runtime), plus a mono or tabular face for figures. A narrow grotesque for dense figures (Archivo with its `wdth` axis), a humanist sans for care and health, a serif for heritage, a DIN-like face for transport and machines. `tabular-nums` on every figure that changes. Trap: three families; one plus a mono is enough.

## 7. Haptics and sound (extras only)

- `navigator.vibrate(10)` on Android when a choice lands. iPhones ignore it; the craft file's `ios-haptics` trick (a hidden `<input type="checkbox" switch>`) reportedly broke in iOS 26.5, so never rely on it.
- A short Web Audio tick on a dial's detent, synthesised (no files), off until the person turns sound on. Never autoplay.
- Both only on top of a control that already works without them.

## 8. One shader hero piece (rarely)

When the signature form is itself optical (water, glass, light, weather, heat) and the rest is done: one raw WebGL2 fragment shader on a full-screen triangle, with functions copied from Lygia (noise, SDF) instead of written from scratch. Capped at 60 fps, paused when hidden, a still image under reduced motion and without WebGL2, and the answer stays in HTML over it. No three.js for a single shader. Trap: the shader becoming the app; the answer still has to read in a glance.

## Not for a timed test

Rive (needs its editor and a file), three.js scenes, Gaussian splats, scroll-jacked storytelling in an app, GSAP. They belong to the portfolio, not to a three-hour app.

## What a studio notices first

Check each screenshot against this before calling the first version ready:

1. The answer reads as a sentence in display type ("Opvasken kører kl. 01.15"), not as a small label over a number.
2. One left edge: the answer, the form and the list start on the same line (the shell's 20 px).
3. Spacing on a 4/8 rhythm; the same gap between the same kinds of things.
4. Radii are concentric: an inner corner is the outer corner minus the padding between them.
5. Figures in `tabular-nums`; every number has a unit, a comparison and a verdict; nothing wraps mid-number.
6. No lone word on a heading's last line; no truncated label; nothing under the bar or the notch.
7. One accent, used for one meaning.
8. Every situation looks designed, not like an error page: the empty and offline states keep the signature form and the hero's type.
9. Dark mode is designed, not inverted: glass, shadows and the form's colours checked in it.
10. The stage's headline is the person's question or the client's promise, never the app's name.
11. Under reduced motion, the motion moment still communicates (a fade, or the end state).
