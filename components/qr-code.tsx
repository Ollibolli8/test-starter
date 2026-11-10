// The live link as a QR code, so a phone opens the app from the desktop page or from /stage on a shared screen.
// Empty until the app is on Vercel. Then run `npx qrcode -t svg -e M "<the live URL>"` and copy from its output the
// second path's d into `path`, and the viewBox's width minus 8 (the quiet zone) into `size`.

export const QR = { size: 0, path: "" };

/** The code, dark on white so every phone camera reads it, on a dark page or a light one. Nothing until QR is filled in. */
export function QrTile({ className, label }: { className?: string; label: string }) {
  if (!QR.path) return null;
  return (
    <span className="shrink-0 rounded-xl bg-white p-2.5 text-[#0a0a0a] ring-1 ring-foreground/10">
      <svg viewBox={`4 4 ${QR.size} ${QR.size}`} shapeRendering="crispEdges" className={className} role="img" aria-label={label}>
        <path stroke="currentColor" d={QR.path} />
      </svg>
    </span>
  );
}
