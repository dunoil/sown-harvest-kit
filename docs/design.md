# SOWN — Design notes (Phase 3)

## Concept (selected in Phase 2, delegated by Duan)

**SOWN — One Harvest, Every Box.** A template kit for a CSA (community-supported agriculture) farm. One weekly harvest file renders every artefact the farm sends, prints and posts — from one `defineTheme()` and one set of shared components.

Why this concept wins the matrix (29/30): no existing Challenge Submission occupies the farm/CSA domain; the batch story (120 personalised boxes) matches the strongest pattern in the field (data → many artefacts, gated by `validate()`) without copying its domain (event badges); the produce palette gives real visual richness that is *data*, not decoration; and every Hyper Elements subsystem gets a meaningful job.

## Design system — "field editorial"

- **Colour:** warm drafting paper `#f7f3ea`, deep moss ink `#1c2a1e`, primary moss `#2e5a34`, marigold `#e9a426`, plus eight harvest colours carried as data on each crop. Text never uses a bright harvest colour: each crop also carries a darkened `ink` (≥ 4.5:1 on paper) for its name in tables and cards.
- **Type:** Georgia serif display (email-safe, prints beautifully) + Inter/Helvetica/Arial body stack. Three-step heading scale in the theme (34 / 24 / 17).
- **Signature:** the HarvestMark — an 8-cell strip, one cell per crop in harvest order, built from a `Grid` of `Column`s so it renders in *every* output including image-blocked inboxes. On Page/Canvas it sits beside full `Svg` field art (sun over crop rows, recoloured per crop on the recipe cards).
- **Components:** `Wordmark`, `HarvestMark`, `FieldNote`, `BoxContentsTable`, `PickupDetails`, `StorageList`, `KitFooter` (shared, plain functions) + `sown.ProduceCard` (`defineElement()`, typed props).
- **States & honesty:** no decorative controls. Every button goes somewhere real in the fiction (box page, recipes, subscribe). The email includes a working unsubscribe `Link` (merge-tag href), a plain-text twin from the same render, and a swaps line that only appears when swaps exist.

## Per-output design intent

1. **Email (600px):** one card, calm and scannable in an inbox list via `previewText`; pickup details in a tinted panel with a dashed PACKED stamp; contents as a real `Table`.
2. **Page (1100px):** inverted moss hero band via Section `tokens` scope, oversized serif headline, `Svg` art, `Grid` of ProduceCards with the hero crop featured.
3. **Document (A4):** packer-first — collation code at 30px, check/weigh/seal stamp, packer notes with handwriting lines, tear-off thank-you strip (dashed top border), header/footer with page numbers on every sheet.
4. **Canvas (1080×1350):** portrait recipe card per crop; the crop's own colour floods the lower field-art band, so the set of 8 cards is a colour series.

## Accessibility

Body text ≥ 4.5:1 by construction (ink palette), descriptive link text (no "click here"), `lang="en"` on every root, heading hierarchy 1→2→3 per output, phone styles on Email/Page only (they are an error in Document/Canvas — the theme therefore carries no `mobile` blocks; see `src/theme.ts`).
