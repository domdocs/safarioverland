# Safari Overland — brand assets

The new gold-on-black brand identity. Use these instead of the legacy
`/public/images/logo.png` slate-blue version, which is now retired.

## Quick decision tree

| Use case | File |
|---|---|
| Site header (gold elephant beside serif wordmark) | `safari-overland-mark-256.webp` |
| Hero / about-the-brand placement | `safari-overland-horizontal-1200.jpg` |
| Square social profile (Twitter, LinkedIn, Facebook) | `safari-overland-square-1024.jpg` |
| Email signature / footer | `safari-overland-wordmark.svg` |
| Browser tab favicon | served automatically from `/public/favicon.ico` |
| App icon (iOS / Android home screen) | served automatically from `/app/icon.png` and `/app/apple-icon.png` |
| Open Graph (Slack / Twitter share preview) | served automatically from `/app/opengraph-image.jpg` |

## Files in this folder

### Masters (don't ship to clients — for re-encoding only)

- `safari-overland-horizontal-master.png` — **upgraded May 2026.** Cleaned
  horizontal lockup (elephant left, wordmark right with EST./2018 framing) from
  `_uploads/safari_overland_horizontal2.png`, 2400×900, transparent background.
  Source of truth for all horizontal-logo variants.
- `safari-overland-square-master.png` — **upgraded May 2026.** Cleaned full lockup
  (wordmark + EST. 2018 + elephant) from `_uploads/safari_overland_logo_main.png`,
  1024×1024, transparent background. Source of truth for all square-logo variants.
- `safari-overland-mark-master.png` — **upgraded May 2026.** Cleaned elephant-only mark from
  `_uploads/safari_overland_logo.svg`, padded square (1296×1296), transparent background.
  Source of truth for all elephant-mark variants. Re-encode mark assets from this file.

### Horizontal logo — elephant left, wordmark right with EST./2018 framing

**Upgraded May 2026** from the cleaned horizontal lockup PNG. WebPs and PNGs
preserve transparency; JPGs bake on `#0E110F` (--night). At 300px wide the
wordmark is at the edge of legibility — use the elephant mark or the square
lockup for anything smaller.

- `safari-overland-horizontal-1200.{jpg,webp,png}` — large; hero/about-page use.
- `safari-overland-horizontal-600.{jpg,webp,png}` — default header use.
- `safari-overland-horizontal-300.{jpg,webp,png}` — mobile / small contexts.
- `safari-overland-horizontal.png` and `safari-overland-horizontal@2x.png` —
  aliases for the 1200px variant; some older imports reference these names.

### Square logo — wordmark above large elephant

**Upgraded May 2026** from the cleaned full-lockup PNG. WebPs preserve transparency;
JPGs bake on `#0E110F` (--night).

- `safari-overland-square-1024.{jpg,webp}` — social profile pictures.
- `safari-overland-square-512.{jpg,webp}` — medium use.
- `safari-overland-square-256.{jpg,webp}` — small use.

### Mark — elephant only, no text

**Upgraded May 2026** to the cleaned-up gold elephant on transparent canvas.
The WebPs preserve transparency; the JPGs bake the mark on `#0E110F` (--night).

- `safari-overland-mark-1024.{jpg,webp}` — large mark for hero placements.
- `safari-overland-mark-512.{jpg,webp}` — medium.
- `safari-overland-mark-256.{jpg,webp}` — what `components/editorial/editorial-header.tsx` uses (40×40 in the navbar).

### Wordmark SVG (flat gold, no elephant)

- `safari-overland-wordmark.svg` — text-based approximation. Use for tiny
  contexts, monochrome contexts, or anywhere a vector is required. Renders
  best with the [Cinzel](https://fonts.google.com/specimen/Cinzel) font
  installed/imported. Falls back to system serif otherwise. **Note:** this
  is NOT a literal vectorisation of the metallic-gold master — that would
  require Adobe Illustrator or similar. It's a clean flat-gold approximation.

## Next.js convention files (auto-served, don't reference manually)

- `/app/icon.png` (512×512) — elephant-only mark; Next.js builds it into
  `<link rel="icon">` automatically. **Upgraded May 2026** — uses the new
  cleaned mark.
- `/app/apple-icon.png` (180×180) — full square logo on `#0E110F`; Apple
  home-screen tile. **Upgraded May 2026** from the cleaned full-lockup PNG,
  with padding so the logo doesn't kiss Apple's rounded mask.
- `/app/opengraph-image.jpg` (1200×630) — full square logo centred on
  `#0E110F`. Slack/Twitter/Facebook share preview. **Upgraded May 2026**
  (the previous version had an amber tagline baked in — if you want that
  back, layer the text on top of `opengraph-image.jpg` in a design tool
  and re-export, or commission a fresh composition).
- `/app/twitter-image.jpg` — same image, served as `twitter:image`.
  **Upgraded May 2026.**
- `/public/favicon.ico` — multi-size (16/32/48) elephant-only; browser tab.
  **Upgraded May 2026.**

## All logo variants upgraded — May 2026

The May 2026 logo refresh is complete in three passes:

1. **Elephant mark** (favicon, header mark, mark-* variants) — from
   `_uploads/safari_overland_logo.svg`.
2. **Square lockup** (square-* variants, apple-icon, OG/Twitter cards) — from
   `_uploads/safari_overland_logo_main.png`.
3. **Horizontal lockup** (horizontal-* variants) — from
   `_uploads/safari_overland_horizontal2.png`.

No pending re-encodes. If the source files change in `_uploads/`, regenerate
each pass from the relevant master rather than ad-hoc edits in the output
folder.

## Brand colors (matches `app/globals.css` tokens)

- **Gold accent (`--amber`):** `rgb(214, 162, 74)` / `#D6A24A`
- **Deep gold (`--amber-deep`):** `rgb(168, 121, 47)` / `#A8792F`
- **Background (`--night`):** `rgb(14, 17, 15)` / `#0E110F`
- **Text on dark (`--bone`):** `rgb(237, 231, 216)` / `#EDE7D8`

The gold in the raster logos has metallic shading and is not a single
solid colour, but `#D6A24A` is the closest single-token approximation
and what the SVG uses.

## Accessibility

- The mark is decorative when paired with a "Safari Overland" wordmark
  in the same component — give the `<Image>` `alt=""` and let the
  surrounding wordmark/`aria-label` carry the brand name. The header
  pattern in `components/header.tsx` follows this.
- When the mark stands alone (e.g. a square social tile), give it
  `alt="Safari Overland"` so screen readers announce the brand.
- Don't put the mark on a non-dark background without testing — the
  black canvas around the gold elements may clash. For light surfaces,
  use the SVG wordmark with `fill: var(--amber-deep)` for sufficient
  contrast.

## What if I need a true vector elephant?

The current SVG is wordmark-only. The metallic elephant illustration
hasn't been auto-vectorised because the source is a photoreal raster and
the sandbox doesn't have `potrace` or Adobe Illustrator. If you need a
true SVG of the elephant (for embroidery, large-format print, or precise
logo control), commission a designer to redraw it in Illustrator and add
a `safari-overland-mark.svg` to this folder.

## Replacing legacy references

The old logo at `/public/images/logo.png` is no longer referenced
anywhere in the codebase as of this commit:

- `components/header.tsx` ✓
- `components/mobile-nav.tsx` ✓
- `components/editorial/editorial-header.tsx` ✓
- `app/icon.png`, `app/apple-icon.png`, `app/opengraph-image.jpg`,
  `app/twitter-image.jpg`, `public/favicon.ico` ✓
- `public/manifest.json` (theme color updated to `#0E110F`) ✓

You can safely trash `/public/images/logo.png` in Finder when convenient.
