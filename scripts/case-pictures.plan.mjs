// The two pictures of the laptop layout on the case page (public/case/laptop-1.webp and laptop-2.webp), taken from
// the running app in real Chrome at 1440 × 900, twice the density. Point the two addresses at what shows the laptop
// layout best (a second situation, or the same one scrolled), and retake them when that layout changes.
// With the app running on port 3200:
//
//   cd ~/Developer/oliver-portfolio && node scripts/shot.mjs ~/Developer/<name>/scripts/case-pictures.plan.mjs sheet.jpg
import { writeFileSync } from "node:fs";

const B = process.env.APP_URL ?? "http://localhost:3200";
const OUT = new URL("../public/case/", import.meta.url).pathname;
const SHOTS = [
  ["laptop-1", "/"],
  ["laptop-2", "/?s=empty"],
];

const plan = async (page, sheet) => {
  sheet.cols = 2;
  // The dev server's own badge stays out of the pictures.
  await page.send("Page.addScriptToEvaluateOnNewDocument", { source: `addEventListener('DOMContentLoaded', () => { const st = document.createElement('style'); st.textContent = 'nextjs-portal{display:none!important}'; document.head.append(st); });` });
  await page.viewport(1440, 900, false, 2);
  for (const [name, path] of SHOTS) {
    await page.goto(`${B}${path}`);
    await page.wait(3000);
    const r = await page.send("Page.captureScreenshot", { format: "webp", quality: 86 });
    writeFileSync(`${OUT}${name}.webp`, Buffer.from(r.data, "base64"));
    await page.shot(name);
  }
};

export default plan;
