// EXAMPLE: replace with the brief's own logic. Shows the pattern: a pure,
// typed function in lib/ with its test next to it in lib/time.test.ts.

/** Short relative time for an age in seconds: "just now", "12 s ago", "3 min ago". */
export function formatSecondsAgo(seconds: number): string {
  // Negative (clock skew) and non-finite values read as "just now" instead of nonsense.
  if (!Number.isFinite(seconds) || seconds < 5) return "just now";
  if (seconds < 60) return `${Math.floor(seconds)} s ago`;
  return `${Math.floor(seconds / 60)} min ago`;
}
