import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { formatDiagnostics, render } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import BoxEmail from "../templates/box-email";
import BoxPage from "../templates/box-page";
import PackingDocument from "../templates/packing-document";
import RecipeCanvas from "../templates/recipe-canvas";

/**
 * Render the four committed examples into out/ :
 *   box-email.html + .txt | box-page.html
 *   packing-document.html + packing-slips.pdf
 *   recipe-card.html (+ recipe-card.png when font files are present)
 *
 * renderPdf() and renderImage() fetch nothing: fonts go in as bytes.
 * Drop Inter TTF files into assets/fonts/ (see assets/fonts/README.md)
 * to enable the PNG; without them the script says so, plainly.
 */
await mkdir("out", { recursive: true });

const email = await render(<BoxEmail />);
await writeFile("out/box-email.html", email.html);
await writeFile("out/box-email.txt", email.text);
console.log("box-email:", formatDiagnostics(email.diagnostics) || "clean");

const page = await render(<BoxPage />);
await writeFile("out/box-page.html", page.html);
console.log("box-page:", formatDiagnostics(page.diagnostics) || "clean");

const bold = "assets/fonts/Inter-Bold.woff";
const regular = "assets/fonts/Inter-Regular.woff";
const hasFonts = existsSync(bold) && existsSync(regular);
const fontFiles = hasFonts
  ? [
      { family: "Inter", src: await readFile(regular), weight: 400 as const },
      { family: "Inter", src: await readFile(bold), weight: 700 as const },
    ]
  : undefined;

const doc = <PackingDocument />;
const printed = await render(doc);
await writeFile("out/packing-document.html", printed.html);
// With no font files given, renderPdf() draws in the standard PDF fonts
// (Helvetica/Times) and warns about it in diagnostics — it never fetches.
const pdf = await renderPdf(doc, fontFiles ? { fonts: fontFiles } : undefined);
await writeFile("out/packing-slips.pdf", pdf.pdf);
console.log(
  "packing-document: print HTML + PDF written",
  formatDiagnostics(pdf.diagnostics) || "",
);

const card = <RecipeCanvas />;
const cardHtml = await render(card);
await writeFile("out/recipe-card.html", cardHtml.html);

if (hasFonts && fontFiles) {
  const { image, diagnostics } = await renderImage(card, {
    fonts: fontFiles,
  });
  await writeFile("out/recipe-card.png", image);
  console.log("recipe-card PNG:", formatDiagnostics(diagnostics) || "clean");
} else {
  console.log(
    "recipe-card: HTML written. PNG skipped — add Inter TTF files to assets/fonts/ (they are passed to renderImage() as bytes; nothing is fetched).",
  );
}
