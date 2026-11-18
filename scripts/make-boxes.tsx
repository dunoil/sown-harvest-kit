import { mkdir, writeFile } from "node:fs/promises";
import { render, validate } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { harvest, makeSubscribers } from "../src/data/harvest";
import { BoxEmail } from "../templates/box-email";
import { PackingDocument } from "../templates/packing-document";
import { RecipeCanvas } from "../templates/recipe-canvas";

/**
 * The batch run — SOWN's headline act.
 *
 *   npm run make            -> 120 boxes (the full subscriber run)
 *   npm run make:sample     -> 6 boxes (a quick look)
 *
 * Per run: the gate validates ONE sample of each output first; an error
 * stops everything. Then every subscriber gets a personalised email
 * (HTML + plain text), all boxes go onto packing slips in ONE PDF
 * (one Document.Page per box), and one recipe card HTML is written
 * per crop. Counts and the gate verdict land in out/batch.json.
 */
const countArg = process.argv.indexOf("--count");
const parsed = countArg >= 0 ? Number(process.argv[countArg + 1]) : 120;
const boxes = makeSubscribers(Number.isFinite(parsed) && parsed > 0 ? parsed : 120);

const started = Date.now();

// --- The gate: validate before a single box is written. ---
const gateSamples = [
  <BoxEmail subscriber={boxes[0]} />,
  <PackingDocument boxes={boxes.slice(0, 1)} />,
  <RecipeCanvas />,
];
for (const sample of gateSamples) {
  const { valid, diagnostics } = validate(sample);
  if (!valid) {
    console.error("Gate failed — nothing was written.", diagnostics);
    process.exit(1);
  }
}

// --- Personalised emails ---
await mkdir("out/boxes", { recursive: true });
for (const box of boxes) {
  const { html, text } = await render(<BoxEmail subscriber={box} />);
  await writeFile(`out/boxes/${box.boxId}.html`, html);
  await writeFile(`out/boxes/${box.boxId}.txt`, text);
}

// --- One packing PDF for the whole run ---
const slips = await renderPdf(<PackingDocument boxes={boxes} />);
await writeFile("out/packing-slips-all.pdf", slips.pdf);

// --- One recipe card per crop (HTML; PNG via scripts/render.ts) ---
await mkdir("out/cards", { recursive: true });
for (const item of harvest.items) {
  const { html } = await render(<RecipeCanvas item={item} />);
  await writeFile(`out/cards/${item.id}.html`, html);
}

const summary = {
  boxes: boxes.length,
  emails: boxes.length,
  packingPages: boxes.length,
  recipeCards: harvest.items.length,
  seconds: Math.round((Date.now() - started) / 100) / 10,
};
await writeFile("out/batch.json", JSON.stringify(summary, null, 2));
console.log("SOWN batch complete:", summary);
