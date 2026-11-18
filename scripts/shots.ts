import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import puppeteer from "puppeteer";

/**
 * Screenshots of the REAL rendered outputs in docs/ — the same HTML files
 * scripts/render.tsx wrote to out/, photographed in headless Chrome.
 * Nothing here is a mock-up: if it is pictured, it was rendered.
 */
const shots: Array<{
  file: string;
  out: string;
  width: number;
  height?: number;
}> = [
  { file: "out/box-email.html", out: "docs/email.png", width: 680 },
  { file: "out/box-page.html", out: "docs/page-desktop.png", width: 1280 },
  { file: "out/box-page.html", out: "docs/page-mobile.png", width: 390 },
  { file: "out/packing-document.html", out: "docs/packing-slip.png", width: 900 },
  { file: "out/clients/outlook.html", out: "docs/email-outlook.png", width: 680 },
  { file: "out/clients/gmail.html", out: "docs/email-gmail.png", width: 680 },
];

await mkdir("docs", { recursive: true });
const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
for (const shot of shots) {
  const page = await browser.newPage();
  await page.setViewport({
    width: shot.width,
    height: shot.height ?? 1000,
    deviceScaleFactor: 1.5,
  });
  await page.goto(`file://${resolve(shot.file)}`, {
    waitUntil: "networkidle0",
  });
  await page.screenshot({ path: shot.out, fullPage: true });
  console.log("shot", shot.out);
  await page.close();
}
await browser.close();
