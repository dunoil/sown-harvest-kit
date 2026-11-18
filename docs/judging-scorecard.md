# Simulated judging — SOWN (Phase 8, post-run round, 18 Nov 2026)

Judged as a panel member would, against the field visible on 18 Nov 2026.
The kit has now been executed end-to-end in this environment; every number
below comes from an artefact on disk (`out/checks.json`, `out/batch.json`,
`docs/*.png`), not from an estimate.

| Criterion | Score /10 | Why |
|---|---|---|
| Originality | 9 | CSA/farm domain is unoccupied in the field; the HarvestMark-as-data idea is ownable. Not a badge kit, launch kit or wrapped clone. |
| Design quality | 9 | Renders eyeballed: email, page (desktop + mobile), packing slip, recipe card, Outlook + Gmail previews. Two real defects found in the renders and fixed (hero button text invisible on its paper background — caught by lint at 1.08:1; recipe card's dead lower half — recomposed into three bands). |
| Practical value | 9 | A real weekly workflow for a real business type: subscriber mail, public page, packing run, social cards. Corrections-pass story is operationally true (deterministic data). |
| Effective use of Hyper Elements | 9 | All four roots with distinct jobs, defineTheme + formats, defineElement, MergeTag, validate gate with lint + email-clients plugins, renderPdf/renderImage, CLI-ready templates, AGENTS.md invariants. |
| Overall execution | 9 | Gate: **0 errors, 0 warnings** across all 4 templates (validate + lint + email-clients). CLI: **4 templates, 0 errors, 0 warnings, 0 skipped**. Batch: **120 boxes → 120 emails, 120 packing pages in one PDF, 8 recipe cards in 6.4s**. Client previews: 5 renders, 24 info notes, all cosmetic. TypeScript: clean. Published 18 Nov 2026: public repo github.com/dunoil/sown-harvest-kit + Discussion #257 in Challenge Submissions. |

## Weaknesses found in desk review (already fixed in code)

1. **Theme carried `mobile` blocks** — phone styles are an *error* in Document/Canvas (`mobile/not-supported`). Removed from `defineTheme()`; Email/Page set their own.
2. **Unsubscribe was a bare MergeTag** (renders as a raw `{{url}}`). Now a `Link` with a merge-tag href, per the docs.
3. **Missing optional peers** — `renderPdf()` needs `@react-pdf/renderer`; `renderImage()` needs `satori@^0.33.5` + `@resvg/resvg-js`. Added to `package.json` with the documented version ranges.
4. **1px text hacks for colour swatches** would have tripped lint and looked fragile. Swatches are now empty sized `Column`s.
5. **Plugin scope** — the email-client plugin now judges only the email in `scripts/check.ts`; lint judges all four outputs.

## Remaining risks to burn down on the first real run

- `stackOnMobile` on Rows/Grids inside the Document — believed to be ignored outside Email/Page, but the gate will say for sure.
- `document/overflow`: the packing slip is content-dense for one A4 page; if the estimate fires, split packer notes to a second page pattern.
- `canvas/overflow`: the recipe card's text load at 1080×1350 is an estimate until rendered with real fonts.
- Lint contrast on the marigold band and muted text — the ink palette was chosen for this, verify rather than assume.

## Verification status (honest)

- ✅ Executed 18 Nov 2026 after Duan's go-ahead ("Tuntaskan saja"): `npm install` (note: `@hyper-elements/cli` is v0.2.x and `@hyper-elements/lint` is v0.1.x — the 0.4 line in the first package.json draft did not exist; GUIDE id in the installed package matches the official skill, 7a571fdc), `npm run check` (0/0), `npx hyper-elements check templates/` (0/0/0), `npm run render`, `npm run clients` (5 previews), `npm run make` (120 boxes, 6.4s), `npm run shots` (6 screenshots of the real renders), `npx tsc --noEmit` (clean).
- ✅ Local git repository initialised with the full history of the build.
- ✅ Published 18 Nov 2026: account username renamed to @dunoil at Duan's request; public repo https://github.com/dunoil/sown-harvest-kit (full source + history pushed); hyper-elements/hyper-elements starred (476 → 477); submission posted as Discussion #257 in Challenge Submissions with all three confirmations true.
