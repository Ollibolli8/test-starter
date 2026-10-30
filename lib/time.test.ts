// EXAMPLE: replace together with lib/time.ts.
import { describe, expect, it } from "vitest";
import { formatSecondsAgo } from "@/lib/time";

describe("formatSecondsAgo", () => {
  it("says just now under 5 seconds", () => {
    expect(formatSecondsAgo(0)).toBe("just now");
    expect(formatSecondsAgo(4.9)).toBe("just now");
  });

  it("counts whole seconds under a minute", () => {
    expect(formatSecondsAgo(5)).toBe("5 s ago");
    expect(formatSecondsAgo(12)).toBe("12 s ago");
    expect(formatSecondsAgo(59.9)).toBe("59 s ago");
  });

  it("counts whole minutes from 60 seconds", () => {
    expect(formatSecondsAgo(60)).toBe("1 min ago");
    expect(formatSecondsAgo(180)).toBe("3 min ago");
    expect(formatSecondsAgo(239)).toBe("3 min ago");
  });

  it("treats negative and invalid input as just now", () => {
    expect(formatSecondsAgo(-3)).toBe("just now");
    expect(formatSecondsAgo(Number.NaN)).toBe("just now");
  });
});
