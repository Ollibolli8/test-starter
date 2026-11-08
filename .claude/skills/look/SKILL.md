---
name: look
description: Finding a first look that stands out, before any code - the trade's clichés ruled out, ten idea seeds from outside apps, three real first screens from crafted to wild side by side at /looks, and a recommendation for Olle to pick from. Use right after the brief, the person and the facts are written, and whenever a look is chosen or changed.
---

# Finding the look

The look and the interaction of a test case have to stand out: new, forward-looking, and right for this person (Olle, 9 November: that's part of a creative developer's job, and the first version should already have it). Left alone, an agent designs the average of everything it has seen, which is the screen every app in the trade already has, done neatly. Asked for "unique" in one pass, it gives either something new that gets in the way or the safe design in a costume. So the look is found in its own step, wide first and then narrow, before the app is built.

It takes about 20 minutes of a 3-hour test. Nothing is wasted: the picked screen is the start of the build.

## 1. What everyone in the trade does (3 minutes)

Look at four or five real apps and sites in the client's trade, and two outside it that serve the same moment (a search and their app store screenshots are enough). Write in README → Decisions, under "Ruled out", what they all share: the default chart, icons, colours, layout and words. Add the generic AI look: purple-blue gradients, glass cards, a bento grid, emoji as icons, a centred headline over three feature cards, neon on black. Add anything Olle says he has seen before. None of it goes on the screen unless it's turned on purpose, and then say how.

## 2. Ten seeds (5 minutes)

A seed is a form, a way to touch it, and the fact about the person it answers, in one line: "the meter in the hallway, counting kroner instead of kWh; drag the start and the counter rolls back; because people trust the meter, not a chart". Write ten in HANDOFF.md, at least one from each source:

- **In their hand or eyeline right then:** the machine's own panel and buttons, the kitchen clock, the fridge door, the bill, the meter, the ticket.
- **Another medium with a real tie to the subject:** a timetable, a tide table, a weather or shipping forecast, a TV guide, a receipt, a film's titles, a score, a map. (A bakery that opens like the title cards of Ozu's *Good Morning*; an Italian restaurant like a 1960s title sequence.)
- **The client's own culture:** where it's from, who owns it, its history, its country's design. Many Danish companies are owned by their customers or a municipality.
- **A material:** paper, enamel, bakelite, brass, glass, LED segments, e-ink, thermal print.
- **A gesture from the physical world:** twist, slide, press a button n times, pull, tear, stamp, pour.
- **The data's own shape:** a day as a circle, a night as a horizon, a choice as a pair of scales.
- **An inversion:** the whole app as one word, no numbers at all, the answer before the question.
- **What's new on the platform,** only where it serves the moment: install to the home screen, the share sheet, view transitions, scroll-driven animation, P3 colour, haptics on Android.

Strike every seed that fails one of these:

1. Once seen, does it feel obvious for this client and this person?
2. Has nobody in the trade done it (step 1)?
3. Does the core task still take one glance and one thumb?
4. Is the tie real (the meter really counts the run; a receipt really is what it costs), not a costume?
5. Can it be built whole in the time, in this stack, with a still version?

## 3. Three first screens (10–15 minutes)

Pick three survivors on a ladder, different in form and in how they're touched, never three colourways of one idea:

- **Crafted:** a familiar pattern done better than anyone in the trade does it, with one quiet signature. The one a client could never call risky.
- **Bold:** one strong idea from outside apps that carries the answer.
- **Wild:** the furthest seed that still passes all five questions.

Build each as the real first screen, not a moodboard: `app/looks/<id>.tsx`, in its own type and colours (dark), the brief's real words in its language, real numbers from the simulated source or the brief, the answer in display type, and the motion moment if it's cheap. Put the three on `app/looks/page.tsx` (`components/look-board.tsx`): side by side in phones, each with its rung, its name and four short lines: the idea, how it's touched, the fact about the person it answers, and what it risks. Look at `/looks` at 1440 px and at one look at 390 px before showing it.

Recommend one in a sentence, with what it risks and how the build will guard against it. Bold is usually the answer; when Crafted is, say why.

## 4. Olle picks, then it's built whole

Olle picks from the screens, or mixes them ("the Bold form with the Crafted type"). Write the pick and the two that lost in README → Decisions, each with why. Move the picked screen into the app and build it whole (AGENTS.md → The first version is the product). If Olle has said to build without asking, build the recommendation and show him `/looks` with it.

`/looks` stays at hand-in (noindex), with the three real looks: in the presentation it shows that the look was chosen, not defaulted to.

## Bold where it carries the idea, ordinary where it carries the task

What stands out is the form, the motion moment, the type and the voice. The controls stay the ones the person already knows: tabs or a switch at the bottom, a sheet, the back gesture, a plain button for the main action. A new gesture is always an extra on top of a plain path (drag the run along the night, or tap the time), never the only way to the answer. Standing out never costs the details (AGENTS.md → The details work): the bold screen still has every situation, the keyboard, a sentence for screen readers, reduced motion and 4.5:1 contrast.
