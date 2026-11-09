import { describe, expect, it } from "vitest";
import { contrast, parseHex, ratio, readTokens } from "./colour";

describe("readTokens", () => {
  const css = `@import "tailwindcss";
:root {
  color-scheme: dark;
  /* --old: #ff0000; */
  --background: #0a0a0a;
  --foreground: #ededed;
  --accent: var(--foreground);
  --loop-a: var(--loop-b);
  --loop-b: var(--loop-a);
  --glass-tint: rgb(30 30 30 / 0.45);
}

@theme inline {
  --color-background: var(--background);
}`;

  it("reads the first :root block only", () => {
    const tokens = readTokens(css);
    expect(tokens["--background"]).toBe("#0a0a0a");
    expect(tokens["--color-background"]).toBeUndefined();
  });

  it("leaves out commented-out tokens", () => {
    expect(readTokens(css)["--old"]).toBeUndefined();
  });

  it("resolves var() to the value it points at", () => {
    expect(readTokens(css)["--accent"]).toBe("#ededed");
  });

  it("stops at a loop instead of hanging", () => {
    expect(readTokens(css)["--loop-a"]).toMatch(/var\(/);
  });

  it("keeps values that aren't hex as written", () => {
    expect(readTokens(css)["--glass-tint"]).toBe("rgb(30 30 30 / 0.45)");
  });

  it("gives nothing for a stylesheet without :root", () => {
    expect(readTokens("body { color: red; }")).toEqual({});
  });
});

describe("parseHex", () => {
  it("reads three, six and eight digits", () => {
    expect(parseHex("#fff")).toEqual([255, 255, 255]);
    expect(parseHex("#0C0B0A")).toEqual([12, 11, 10]);
    expect(parseHex("#ff000080")).toEqual([255, 0, 0]);
  });

  it("refuses anything else", () => {
    expect(parseHex("rgb(0 0 0)")).toBeUndefined();
    expect(parseHex("#12")).toBeUndefined();
    expect(parseHex("")).toBeUndefined();
  });
});

describe("contrast", () => {
  it("is 21 for black on white, either way round", () => {
    expect(contrast("#000", "#fff")).toBeCloseTo(21, 5);
    expect(contrast("#fff", "#000")).toBeCloseTo(21, 5);
  });

  it("is 1 for a colour on itself", () => {
    expect(contrast("#777777", "#777777")).toBe(1);
  });

  it("matches a known pair (#767676 on white is the 4.5:1 line)", () => {
    expect(contrast("#767676", "#ffffff")).toBeCloseTo(4.54, 2);
  });

  it("is undefined when a colour isn't hex", () => {
    expect(contrast("rgb(0 0 0)", "#fff")).toBeUndefined();
  });
});

describe("ratio", () => {
  it("rounds down, so 4.49 never shows as passing", () => {
    expect(ratio(4.49)).toBe("4.4:1");
    expect(ratio(13.17)).toBe("13.1:1");
    expect(ratio(21)).toBe("21.0:1");
  });
});
