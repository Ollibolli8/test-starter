// The design tokens as the case page shows them (app/case): read straight from app/globals.css at build time, so a
// swatch can never disagree with the app, and the contrast of each text colour on its surface, worked out the WCAG
// way. Pure functions, tested in colour.test.ts.

/** Every `--name: value;` in the stylesheet's first `:root { … }` block, with `var(--other)` resolved. */
export function readTokens(css: string): Record<string, string> {
  const root = /:root\s*\{([\s\S]*?)\n\}/.exec(css)?.[1] ?? "";
  const raw: Record<string, string> = {};
  // Comments out first, so a commented-out token isn't read.
  for (const m of root.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    const [, name, value] = m;
    if (name && value) raw[name] = value.trim();
  }
  const resolve = (value: string, seen: Set<string>): string =>
    value.replace(/var\((--[\w-]+)\)/g, (whole, name: string) => {
      const next = raw[name];
      if (next === undefined || seen.has(name)) return whole;
      return resolve(next, new Set(seen).add(name));
    });
  return Object.fromEntries(Object.entries(raw).map(([name, value]) => [name, resolve(value, new Set([name]))]));
}

/** A #rgb, #rrggbb or #rrggbbaa colour as 0–255 channels (alpha left out), or undefined for anything else. */
export function parseHex(value: string): [number, number, number] | undefined {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(value.trim());
  const hex = m?.[1];
  if (!hex) return undefined;
  const full = hex.length === 3 ? [...hex].map((c) => c + c).join("") : hex.slice(0, 6);
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as [number, number, number];
}

function channel(c: number): number {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

/** WCAG relative luminance, 0 (black) to 1 (white). */
export function luminance([r, g, b]: [number, number, number]): number {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** WCAG contrast ratio between two hex colours (1 to 21), or undefined if either isn't a plain hex colour. */
export function contrast(a: string, b: string): number | undefined {
  const ca = parseHex(a);
  const cb = parseHex(b);
  if (!ca || !cb) return undefined;
  const la = luminance(ca);
  const lb = luminance(cb);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** "13.1:1", rounded down so a pair that reads 4.5:1 really passes 4.5:1. */
export function ratio(n: number): string {
  return `${(Math.floor(n * 10) / 10).toFixed(1)}:1`;
}
