// Motion tokens: the one place durations and the easing curve are set.
// The same curve is --ease-out-soft in app/globals.css (Tailwind's ease-out-soft); change both together.

/** Ease-out with a long, soft landing. Calm, no overshoot. */
export const ease = [0.22, 1, 0.36, 1] as const;

/** Seconds. Small UI 150–300 ms, large surfaces up to ~500 ms, entrances a little longer. */
export const duration = {
  fast: 0.18,
  base: 0.3,
  slow: 0.6,
} as const;

/** How far an entering element travels, in px. Small: it should read as settling, not flying in. */
export const rise = 16;
