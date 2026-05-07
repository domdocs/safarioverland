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

- `safari-overland-horizontal-master.png` — original AI-generated horizontal layout (1360×768).
- `safari-overland-square-master.png` — original square layout with prominent elephant (1024×1024).
- `safari-overland-mark-master.png` — elephant-only crop, upscaled to 1024×1024 for re-encoding clean assets.

### Horizontal logo — wordmark + EST. 2018 + small elephant

- `safari-overland-horizontal-1200.{jpg,webp}` — large; hero/about-page use.
- `safari-overland-horizontal-600.{jpg,webp}` — default header use.
- `safari-overland-horizontal-300.{jpg,webp}` — mobile / small contexts.

### Square logo — wordmark above large elephant

- `safari-overland-square-1024.{jpg,webp}` — social profile pictures.
- `safari-overland-square-512.{jpg,webp}` — medium use.
- `safari-overland-square-256.{jpg,webp}` — small use.

### Mark — elephant only, no text

- `safari-overland-mark-1024.{jpg,webp}` — large mark for hero placements.
- `safari-overland-mark-512.{jpg,webp}` — medium.
- `safari-overland-mark-256.{jpg,webp}` — what `components/header.tsx` uses (40×40 in the navbar).

### Wordmark SVG (flat gold, no elephant)

- `safari-overland-wordmark.svg` — text-based approximation. Use for tiny
  contexts, monochrome contexts, or anywhere a vector is required. Renders
  best with the [Cinzel](https://fonts.google.com/specimen/Cinzel) font
  installed/imported. Falls back to system serif otherwise. **Note:** this
  is NOT a literal vectorisation of the metallic-gold master — that would
  require Adobe Illustrator or similar. It's a clean flat-gold approximation.

## Next.js convention files (auto-served, don't reference manually)

- `/app/icon.png` (512×512) — elephant-only mark; Next.js builds it into
  `<link rel="icon">` automatically.
- `/app/apple-icon.png` (180×180) — full square logo; Apple home-screen tile.
- `/app/opengraph-image.jpg` (1200×630) — horizontal logo on black + amber
  tagline; Slack/Twitter/Facebook share preview.
- `/app/twitter-image.jpg` — same image, served as `twitter:image`.
- `/public/favicon.ico` — multi-size (16/32/48) elephant-only; browser tab.

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
