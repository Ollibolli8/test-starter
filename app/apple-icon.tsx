import { ImageResponse } from "next/og";
import { APP } from "@/lib/app";

// The iPhone's home-screen icon, drawn at build time. iOS rounds the corners itself, so fill the square.
// Make it the app's own mark from the brief (the signature form, small), the same as app/icon.svg.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: APP.colour.dark }}>
        <div style={{ width: 76, height: 76, borderRadius: 38, border: "14px solid #ffffff" }} />
      </div>
    ),
    size,
  );
}
