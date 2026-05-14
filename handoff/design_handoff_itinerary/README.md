# Handoff — Safari Overland Itinerary Builder

> **In one sentence:** build an admin form that captures a multi-destination itinerary, render it server-side into the editorial HTML design in `/source-prototype/`, and export it as a high-quality PDF for the customer.

---

## 1. Overview

Safari Overland is a curated travel operator based in Victoria Falls. Customers receive a custom, multi-destination, multi-transport itinerary after booking. The current goal is to replace generic third-party itinerary tools with a bespoke, on-brand document that reads like an editorial travel essay rather than a corporate summary.

This handoff contains:
1. A fully working **HTML design reference** (in `/source-prototype/`) — the visual target.
2. A **data schema** (`SCHEMA.md`) — the shape the admin form must capture.
3. **Style tokens** (`STYLE_TOKENS.md`) — all colors, fonts, spacing, and theme variants.
4. **PDF rendering notes** (`PDF_NOTES.md`) — recommended approach for converting the HTML to a print-ready PDF.

### What the developer is being asked to build

Inside the existing **Safari Overland admin area** (`www.safarioverland.com`):

1. **A multi-section input form** that lets a staff member compose a custom itinerary for a customer (trip metadata + N destination chapters + N–1 transits + photos).
2. **A live preview** of the itinerary using the design in `/source-prototype/` (recommended), or at minimum a "Generate" button.
3. **A PDF export** that produces a high-fidelity, A4 portrait, print-ready document matching the design.
4. **(Optional) A shareable web URL** so customers can view the interactive web version before downloading the PDF.

---

## 2. About the design files

The files in `/source-prototype/` are a **design reference**, not production code to ship as-is. They were built as an HTML/React/Babel prototype to communicate the intended look, feel, structure, and content. The HTML uses inline JSX via Babel-in-the-browser — that is **not** how the production version should run. The expectation is:

- **Recreate this design in the Safari Overland codebase** using its existing framework (likely WordPress, Laravel, Rails, Next.js — whichever the site already uses).
- **Reuse the CSS** verbatim where possible (`src/styles.css` is production-quality) — port it to the codebase's stylesheet conventions (CSS modules, Tailwind layer, Sass partials, etc.).
- **Reuse the SVG map logic** — the projection function and country path strings in `src/maps.jsx` are correct and reusable.
- **Replace** the inline-Babel rendering with whatever templating engine the site uses (Twig, ERB, JSX in a real build, Blade, etc.).

The fidelity is **high** — final colors, type, spacing, and structure are intentional. Treat the design as canonical.

---

## 3. Fidelity

**High-fidelity (hifi).** Pixel-perfect mockups with final colors, typography, spacing, and interactions. Reproduce exactly — do not "improve" the layout, swap fonts, or change the palette without sign-off from the Safari Overland team.

---

## 4. Document structure

The itinerary is a single long-scroll document composed of these sections, in order:

| # | Section | Repeats? | Source component |
|---|---|---|---|
| 1 | **Cover** | once | `cover.jsx` → `<Cover>` |
| 2 | **Prologue** | once | `cover.jsx` → `<Prologue>` |
| 3 | **Overview** (route map + stop list) | once | `cover.jsx` → `<Overview>` |
| 4 | **Chapter** (one per destination) | N times | `chapter.jsx` → `<Chapter>` |
| 5 | **Transit** (between chapters) | N−1 times | `transit.jsx` → `<Transit>` |
| 6 | **Practicals** | once | `practicals.jsx` → `<Practicals>` |
| 7 | **Sign-off / Colophon** | once | `practicals.jsx` → `<SignOff>` |

Chapters and transits **interleave**: Chapter 1 → Transit 1 → Chapter 2 → Transit 2 → Chapter 3 → … → Chapter N → Practicals.

### 4.1 Cover

Two-column layout. Left = full-bleed photo. Right = dark cream-on-ink panel containing:
- Brand mast ("Safari Overland" + trip reference number)
- Eyebrow: "An Itinerary, prepared for"
- Guest names (italic serif)
- Trip title (3 lines, italic serif display, ~5.4rem)
- Subtitle (single italic line, paper colour at 75% opacity)
- Footer `<dl>` (4 cells, 2×2): Travelling dates, Pace, Curated by, From

See `src/cover.jsx` lines 1–55. Background gradient on the photo column matches `--ink → --accent-deep → --accent` for when no photo is provided.

### 4.2 Prologue

A single narrow column (`page tight`, max 880px). Eyebrow + a large italic "lede" paragraph + 1–3 supporting paragraphs. Ends with a short horizontal rule.

The first paragraph is rendered in `--display` italic at clamp(1.6rem, 2.4vw, 2.1rem).

### 4.3 Overview

Two-column. Left = stop list (ordinal numeral, place name, country eyebrow, nights count). Right = overview map.

The map is an inline SVG drawn from `src/maps.jsx`. It uses a simple linear projection (lon 10°E → 36°E, lat −36°S → −8°S into an 800×900 viewBox) and traces stylized country polygons. **The projection and country paths are reusable as-is.**

### 4.4 Chapter (the recurring unit)

Five stacked blocks per chapter:

1. **Chapter hero** — full-bleed image (78vh, min 560px). Bottom-aligned label grid: big roman numeral (left) · place name + country/coords (centre) · dates + nights count (right). Gradient overlay top-down + left-right to ensure white text reads on any photo.
2. **Chapter intro** — 2-col. Left: eyebrow + epigraph (italic, left-bordered with `--accent`). Right: 2–4 paragraphs of narrative copy. The first paragraph has a serif drop-cap and small-caps first-line.
3. **Lodge block** — 2-col. Left: 4:5 photo. Right: kind (eyebrow), name (h3 2.4rem), room (italic accent-deep), blurb paragraph, 2-col amenities list with bullet dots.
4. **Rhythm section** — full-bleed `--paper` band. Left: section title ("The rhythm of `<place>`"). Right: timeline of 3–5 rows, each: time-label (left, sans uppercase) + title (h4 1.35rem) + body. Rows separated by 1px `--rule` lines.
5. **Seeing + Curator's note** — 2-col. Left: "What you'll see" + bullet list. Right: handwritten-style curator's note (Caveat font, 1.3rem) inside a bordered card with "Curator's note" eyebrow label.

### 4.5 Transit (between chapters)

Full-bleed `--ink` dark section. 2-col. Left: eyebrow ("Interlude · transit N") + h3 with `from → to`, mode icon (SVG, custom per mode), 4-cell metadata grid (Mode / Duration / Distance / Crossing), a note paragraph. Right: a transit detail map — uses `<TransitMap fromId toId>` from `src/maps.jsx` which auto-bounds the viewBox around the two stops.

Background uses two radial gradients to suggest spotlight on the route.

### 4.6 Practicals

Full-bleed `--paper` band. 2-col. Left: eyebrow + h2. Right: 6 cards in a 2-col grid:
- Included
- Not Included
- Weather (per region)
- Packing
- Health & visas
- On the ground (contact info)

### 4.7 Sign-off

Centered. Large italic farewell line + handwritten signature ("Tom") + curator's meta (name, title, location). At the very bottom, a colophon row with brand name, trip reference, and issue date.

---

## 5. The data model (full detail in `SCHEMA.md`)

The whole document is generated from **two top-level objects**:

```js
TRIP = {
  title, subtitle, reference, guests[], dates {from, to, year},
  pace, curator {name, title, location},
  prologue[]   // array of paragraphs
}

CHAPTERS = [
  {
    id, numeral, place, country, coords {lat, lon},
    nights, dates, palette, epigraph,
    intro[],                     // array of paragraphs
    lodge { name, kind, room, blurb, amenities[], photoId },
    rhythm: [{ time, title, body }, …],
    seeing[],                    // array of strings
    note                         // curator's handwritten note
  },
  …
]

TRANSITS = [
  { from, to, mode, duration, distance, crosses, note },
  …
]
```

The admin form should produce exactly this shape (JSON) and persist it to the database. **See `SCHEMA.md` for field-by-field types, lengths, and form-field UX recommendations.**

---

## 6. Style system (full detail in `STYLE_TOKENS.md`)

The design uses CSS custom properties on `<html>`, with three theme variants set via data-attributes:

```html
<html data-palette="savanna" data-typography="editorial" data-density="spacious">
```

Variants:
- **palette**: `savanna` (default — ochre/bone) · `forest` (deep green/cream) · `coast` (slate/sand)
- **typography**: `editorial` (Cormorant + Newsreader) · `modern` (Newsreader + Manrope) · `classic` (EB Garamond + Lora)
- **density**: `spacious` (default) · `compact`

These can be stored per-trip or be admin-configurable per document. The Safari Overland team will likely want all three palettes available so they can match a trip's mood.

**Fonts** — all Google Fonts:
- `Cormorant Garamond` (display, italic-heavy)
- `Newsreader` (body serif, optical-size variable)
- `EB Garamond` (alt display)
- `Lora` (alt body)
- `Manrope` (sans, utility)
- `Caveat` (handwritten — for curator notes & signature)

---

## 7. PDF export (full detail in `PDF_NOTES.md`)

**Recommended approach:** server-side render the same HTML/CSS used for the web view, then convert with one of:

| Tool | Quality | Notes |
|---|---|---|
| **Playwright / Puppeteer** (Chromium headless `page.pdf()`) | ★★★★★ | Best fidelity. Supports `@page` rules, CSS print, custom margins, page breaks. Recommended. |
| **WeasyPrint** (Python) | ★★★★ | Good CSS support, smaller footprint, but less complete than Chromium. |
| **wkhtmltopdf** | ★★★ | Older WebKit, struggles with modern CSS (`grid`, `clamp()`, variable fonts). Avoid. |
| **react-pdf** / `@react-pdf/renderer` | ★★ | Would force a full re-implementation in a different render model. Not recommended. |

**Page format:** A4 portrait, 0 margin (the design is full-bleed). Add `@page { size: A4; margin: 0 }` and use CSS `break-before: page` / `break-inside: avoid` to control flow.

`src/styles.css` already has a `@media print` block — extend it for production-quality print output.

---

## 8. Suggested architecture

A pragmatic split:

```
/admin
  /itineraries
    GET    /             → list view
    GET    /new          → form (empty)
    GET    /:id/edit     → form (populated)
    POST   /             → create
    PATCH  /:id          → update
    POST   /:id/publish  → freezes a snapshot, mints a slug
    GET    /:id/pdf      → triggers server-side render → PDF stream

/public
  GET    /trips/:slug    → public web view (read-only, branded)
```

The form can be:
- **Single long page** with collapsible sections (simplest)
- **Multi-step wizard** (Trip meta → Chapters → Transits → Photos → Review)
- **Side-by-side**: form on left, live preview iframe on right (best UX — recommended if budget allows)

---

## 9. Photo handling

The prototype uses `<image-slot>`, a drag-and-drop web component that persists images to a JSON sidecar. **Do not ship this to production.** Replace with the admin's normal media library / S3 upload flow:

Each chapter has these photo slots:
- 1 × hero (16:9 or 4:3, full-bleed)
- 1 × lodge photo (4:5 portrait, displays at ~400×500)

Plus:
- 1 × cover photo (portrait, full-bleed left column)

So a 4-stop trip needs **5 chapter heroes + 4 lodge photos + 1 cover = 10 photos** minimum. Provide a media picker per slot, with a fallback to a tinted gradient using the chapter's `palette` value when no photo is supplied (the gradient is already in `styles.css` under `.cover .cover-photo` — reuse the pattern).

Recommend WebP, ≥1600px on the long edge, ≤500KB after compression.

---

## 10. Files in this handoff

```
design_handoff_itinerary/
├── README.md                    ← this file
├── SCHEMA.md                    ← data model, field-by-field
├── STYLE_TOKENS.md              ← colors, fonts, spacing, themes
├── PDF_NOTES.md                 ← PDF rendering deep-dive
└── source-prototype/            ← the working HTML reference
    ├── Itinerary.html           ← open this in a browser to see the design
    ├── image-slot.js            ← (dev-only; do not port)
    ├── tweaks-panel.jsx         ← (dev-only; do not port)
    └── src/
        ├── styles.css           ← PRODUCTION-READY — port this verbatim
        ├── data.jsx             ← sample data — shows the schema in use
        ├── maps.jsx             ← SVG maps — port logic + country paths
        ├── cover.jsx            ← Cover / Prologue / Overview components
        ├── chapter.jsx          ← Chapter (the recurring destination unit)
        ├── transit.jsx          ← Transit (between-chapter dark page)
        ├── practicals.jsx       ← Practicals + Sign-off
        └── app.jsx              ← App root — shows assembly order
```

---

## 11. Acceptance criteria

A complete implementation:

- [ ] Admin can create a new itinerary, fill in all metadata, add 1–8 destination chapters and the transits between them.
- [ ] The form validates required fields (see SCHEMA.md) and persists drafts.
- [ ] The form supports uploading photos for cover, each chapter hero, and each lodge.
- [ ] A "Preview" page renders the saved itinerary using the editorial design — visually identical to `source-prototype/Itinerary.html`.
- [ ] Palette, typography, and density variants are switchable at preview/render time.
- [ ] A "Download PDF" action produces an A4 portrait PDF that visually matches the web view (full-bleed photography, custom fonts, drop caps, SVG maps all preserved).
- [ ] The PDF is correctly paginated — chapter heroes don't split across pages, the cover is page 1, the colophon is the last page.
- [ ] (Optional) A public read-only URL (`/trips/:slug`) renders the same design for sharing.

---

## 12. Open questions for the Safari Overland team

A developer picking this up should confirm:

1. What is the existing tech stack on `safarioverland.com`? (WordPress / Laravel / Rails / Next.js / something else)
2. Where does the customer data live? Is there an existing customer/booking record this itinerary attaches to?
3. Will multiple staff edit the same itinerary, or is it single-author? (Affects whether we need optimistic locking / autosave.)
4. Should past itineraries be archived/cloneable? ("This year's Botswana trip is mostly the same as last year's…")
5. Is the customer expected to view a web link too, or is PDF the only delivery channel?
6. Does Safari Overland need branded email delivery of the PDF, or just download from admin → forward manually?
7. Do they have an existing photography library / DAM, or will photos be uploaded fresh per trip?
