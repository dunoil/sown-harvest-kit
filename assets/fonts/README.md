# Fonts for image rendering

`renderImage()` fetches nothing: font files are passed in as bytes.
To enable PNG output in `scripts/render.ts`, place these files here:

- `Inter-Regular.ttf` (weight 400)
- `Inter-Bold.ttf` (weight 700)

Inter is open source (SIL Open Font License) — https://rsms.me/inter/
Any TTF/OTF works; if you use different files, update the paths and the
`family` / `weight` entries in `scripts/render.ts` to match.

Font binaries are git-ignored on purpose: the repository stays light and
licence-clean, and the render script reports plainly when they are absent
(it still writes the Canvas template's HTML via `render()`).
