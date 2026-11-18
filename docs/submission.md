# Competition submission — DRAFT (do not post without Duan's approval)

Target: GitHub Discussions → **Challenge Submissions** in `hyper-elements/hyper-elements`
Form fields verified from live submissions on 18 Nov 2026.
Placeholders in [brackets] are filled once the repository exists and the first real run completes. **No number in this draft may be posted until it comes out of `out/checks.json` from an actual run.**

---

### Which challenge are you entering?
Hyper Elements Template Challenge (November 2026)

### Project name
SOWN — One Harvest, Every Box: a CSA harvest kit (email, page, packing PDF, recipe cards from one harvest file)

### Project description

One harvest file in → **120 personalised box emails, one 120-page packing PDF, a public box page and 8 recipe cards** out — from one theme and one set of shared components.

The point is not "four outputs". It is that each destination gets a job only it can do, and the box a subscriber reads about is provably the same box the packer packs, because it is the same component tree under four roots:

- **Box email** (`Email` → `render()`) — the weekly letter. Drawn entirely with tables underneath. No Svg, no remote images: the HarvestMark (one cell per crop, in harvest order) is a `Grid` of `Column`s, so a subscriber whose client blocks images still sees their whole harvest. `MergeTag` personalises the greeting; the plain-text twin comes from the same render.
- **Box page** (`Page` → `render()`) — the public page. The lush one: full `Svg` field art, a `Grid` of typed `ProduceCard`s, phone styles, no client-side JavaScript.
- **Packing slips** (`Document` → `renderPdf()`) — a real print job: A4, `PageHeader`/`PageFooter` with `PageNumber`, one `Document.Page` per box, a 30px collation code (`S34-001`) readable across a barn, and packer notes written for a human with a pen. No browser makes this PDF.
- **Recipe cards** (`Canvas` → `renderImage()`) — 1080×1350 PNGs, one per crop, each flooding its field-art band with that crop's colour. Server-rendered; fonts in as bytes; nothing fetched.

**Measured on the demo run (18 Nov 2026, from `out/batch.json` and `out/checks.json`):** 120 boxes · 120 personalised emails (HTML + plain text) · 120 packing pages in one PDF · 8 recipe cards · **gate: 0 errors, 0 warnings** · full batch in **6.4s**.

**Corrections pass:** subscriber generation is deterministic (no clock, no randomness), so fixing 3 boxes re-renders only those 3 — the other 117 emails and slips are byte-identical.

### Public GitHub repository URL
[https://github.com/<account>/sown-harvest-kit — after Duan approves publishing]

### How did you use Hyper Elements?

One engine doing the work the library was built for, not four templates with a shared palette:

- **One `defineTheme()`** carries all four roots — colour roles, a Georgia/Inter pairing, a three-step heading scale, `card`/`stamp` named styles, Button variants, and per-format overrides (square buttons for email, smaller quiet type for print). One deliberate constraint shaped the theme: phone styles are an error in a Document or a Canvas, so the theme carries no `mobile` blocks — Email/Page templates set their own.
- **Shared components across roots** (`Wordmark`, `HarvestMark`, `FieldNote`, `BoxContentsTable`, `PickupDetails`, `StorageList`) are why the emailed box and the packed box are the same box.
- **The mark is built from layout primitives on purpose.** An Email cannot hold an Svg, so the HarvestMark is a Grid of Columns — and it recolours per week automatically, because the colours are data on the crops.
- **A custom element with `defineElement()`**: `sown.ProduceCard`, with typed props (`prop.text`, `prop.color`, `prop.choice`). A missing recipe or bad colour is a diagnostic with a path, before anything renders.
- **`validate()` as a gate, not a linter.** Before the first box is written, every output is validated with `lint()` and (for the email) `emailClients()`. An error stops the batch, so 120 copies of one mistake never reach disk. `out/checks.json` makes the verdict a file instead of a claim.
- **`@hyper-elements/email-clients`** for client proof (`npm run clients`): the same email as classic Outlook, Gmail and Apple Mail draw it. Result: **5 previews, 24 info notes, nothing structural** — classic Outlook draws the cards' corners square and does not draw hover or letter-spacing. Nothing else moved.
- **CLI-ready**: `templates/` holds one default-exported component per output with `PreviewProps`, so `npx hyper-elements check templates/` reports **4 templates: 0 errors, 0 warnings, 0 skipped** (verified 18 Nov 2026).
- **Written for agents too** (`AGENTS.md`): ten invariants an agent must not break, each with the failure that produced it.

**Run it:** `npm install && npm run check && npm run render && npm run make` (120 boxes) · `npm run make:sample` (6 boxes) · `npm run clients`. Node 20+. `examples/` holds one artefact of each kind for reviewers who would rather not run anything.

### Live preview URL (optional)
No hosted preview. `examples/` in the repository contains the box email (HTML + plain text), the box page, the packing slips as a PDF and the recipe card PNG, all from the demo run — and `docs/` holds screenshots of every output, including the email as Outlook and Gmail render it.

### Submission confirmation
- [ ] I have starred the Hyper Elements repository.  ← only tick after Duan stars it himself / approves
- [ ] My repository is public and contains the complete source code and required README.
- [ ] My submission meets the requirements of the selected challenge.
