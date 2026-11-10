import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { APP } from "./app";

// One theme, set in two places (AGENTS.md → One theme): APP.scheme for the color-scheme meta, the status bar and the
// case page's live phones, and color-scheme in app/globals.css for the browser's own controls and scrollbars.
describe("theme", () => {
  it("app/globals.css has the same color-scheme as APP.scheme", () => {
    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
    const root = (/:root\s*\{([\s\S]*?)\n\}/.exec(css)?.[1] ?? "").replace(/\/\*[\s\S]*?\*\//g, "");
    expect(/color-scheme:\s*([a-z ]+);/.exec(root)?.[1]?.trim()).toBe(APP.scheme);
  });
});
