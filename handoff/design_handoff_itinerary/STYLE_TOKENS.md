# Style tokens — Safari Overland itinerary

All design tokens are declared as CSS custom properties on `:root` in `source-prototype/src/styles.css`. Three theme variants are toggled via `data-` attributes on `<html>`:

```html
<html data-palette="savanna" data-typography="editorial" data-density="spacious">
```

Port the variable definitions verbatim into the production stylesheet.

---

## 1. Color palettes

### Savanna (default)

| Token | Hex | Role |
|---|---|---|
| `--bone` | `#f3ead8` | Page background, hero text colour on dark sections |
| `--paper` | `#ebe0c7` | Secondary bands (overview, rhythm, practicals) |
| `--ink` | `#1a160e` | Primary text, dark section backgrounds |
| `--ink-soft` | `#3a3326` | Body copy, muted headings |
| `--rule` | `#c9b994` | Hairline dividers |
| `--accent` | `#a86b1e` | Ochre — accent dots, route lines, links |
| `--accent-deep` | `#6e3f0d` | Deep ochre — eyebrows, drop-caps, emphasis |
| `--quiet` | `#6f6549` | Tertiary text, captions |
| `--shadow` | `rgba(26, 22, 14, 0.12)` | Card shadows |

### Forest (`[data-palette="forest"]`)

| Token | Hex |
|---|---|
| `--bone` | `#ece6d4` |
| `--paper` | `#ddd4ba` |
| `--ink` | `#16201a` |
| `--ink-soft` | `#2d3b32` |
| `--rule` | `#aab297` |
| `--accent` | `#335c3a` |
| `--accent-deep` | `#1f3a25` |
| `--quiet` | `#4e604f` |

### Coast (`[data-palette="coast"]`)

| Token | Hex |
|---|---|
| `--bone` | `#ecebe2` |
| `--paper` | `#d8d6c8` |
| `--ink` | `#16202a` |
| `--ink-soft` | `#2a3848` |
| `--rule` | `#a7b1bf` |
| `--accent` | `#2f5468` |
| `--accent-deep` | `#16313f` |
| `--quiet` | `#586a78` |

---

## 2. Typography

### Variant: Editorial (default)

```css
--display: "Cormorant Garamond", "EB Garamond", Georgia, serif;
--body:    "Newsreader", "Iowan Old Style", Georgia, serif;
--sans:    "Manrope", -apple-system, "Helvetica Neue", sans-serif;
--hand:    "Caveat", "Segoe Script", cursive;
```

### Variant: Modern (`[data-typography="modern"]`)

```css
--display: "Newsreader", Georgia, serif;
--body:    "Manrope", -apple-system, sans-serif;
```

### Variant: Classic (`[data-typography="classic"]`)

```css
--display: "EB Garamond", Georgia, serif;
--body:    "Lora", Georgia, serif;
```

The `--sans` (Manrope) and `--hand` (Caveat) tokens are constant across typography variants — they're used only for utility text and curator notes respectively.

### Google Fonts URL

```
https://fonts.googleapis.com/css2?
  family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500
  &family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,400
  &family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400
  &family=Lora:ital,wght@0,400;0,500;1,400
  &family=Manrope:wght@300;400;500;600
  &family=Caveat:wght@400;500
  &display=swap
```

For PDF rendering, self-host the WOFF2 files — Chromium-headless can be flaky fetching from `fonts.googleapis.com` during a `page.pdf()` call. See `PDF_NOTES.md`.

### Type scale (recurring values)

| Use | Family | Size | Weight | Style |
|---|---|---|---|---|
| Cover title | `--display` | clamp(3rem, 6vw, 5.4rem) | 400 | italic |
| Chapter title (h2) | `--display` | clamp(2.4rem, 5vw, 4rem) | 400 | italic |
| Section title (h2) | `--display` | clamp(2.4rem, 4vw, 3.4rem) | 400 | italic |
| Lodge name (h3) | `--display` | 2.4rem | 500 | roman |
| Rhythm activity (h4) | `--display` | 1.35rem | 500 | roman |
| Body | `--body` | 18px | 380 | roman |
| Lede (prologue, p1) | `--display` | clamp(1.6rem, 2.4vw, 2.1rem) | 400 | italic |
| Epigraph | `--display` | 1.3rem | 400 | italic |
| Eyebrow | `--sans` | 0.72rem, letter-spacing 0.22em | 500 | uppercase |
| Curator note | `--hand` | 1.3rem | 400 | roman |
| Sign-off signature | `--hand` | 2.2rem | 400 | roman |

### Drop-cap recipe (first paragraph of each chapter intro)

```css
.chapter-intro .right p:first-of-type::first-letter {
  font-family: var(--display);
  float: left;
  font-size: 4.2rem;
  line-height: 0.9;
  padding: 0.4rem 0.8rem 0 0;
  font-weight: 500;
  color: var(--accent-deep);
  font-style: italic;
}
```

The same paragraph also uses `::first-line { font-variant: small-caps; letter-spacing: 0.08em; }`.

---

## 3. Spacing / density

### Spacious (default)

```css
--page-pad-y: 9rem;     /* vertical padding on each section */
--section-gap: 5rem;    /* gap between blocks within a section */
--measure: 38rem;       /* max width for body copy */
```

### Compact (`[data-density="compact"]`)

```css
--page-pad-y: 5rem;
--section-gap: 3rem;
```

`--measure` is constant; only vertical breathing-room changes.

### Container widths

| Class | Max width | Side padding |
|---|---|---|
| `.page` (default) | 1180px | 7rem |
| `.page.wide` | 1400px | 5rem |
| `.page.tight` | 880px | 7rem |

At ≤900px viewport, side padding collapses to `1.5rem` and 2-column layouts stack to single column.

---

## 4. Section backgrounds

The document alternates background colour to create rhythm. **Do not change this pattern** — the eye uses it to navigate the long form.

| Section | Background | Border |
|---|---|---|
| Cover | `--ink` | — |
| Prologue | `--bone` | — |
| Overview | `--paper` | top + bottom `--rule` |
| Chapter intro / lodge | `--bone` | — |
| Rhythm | `--paper` | top + bottom `--rule` |
| Seeing / curator note | `--bone` | — |
| Transit | `--ink` (with subtle radial gradients) | — |
| Practicals | `--paper` | top `--rule` |
| Sign-off | `--bone` | top `--rule` |

---

## 5. Components & micro-elements

### Eyebrow

```css
font-family: var(--sans);
font-weight: 500;
font-size: 0.72rem;
letter-spacing: 0.22em;
text-transform: uppercase;
color: var(--accent-deep);
```

### Rule

A single 1px horizontal line in `--rule`. No margins by default — the consumer sets layout.

### Card (practical / curator note)

```css
background: var(--bone);
border: 1px solid var(--rule);
padding: 1.6rem;       /* practicals */
padding: 2.4rem;       /* curator note */
box-shadow: 0 20px 40px -25px var(--shadow);   /* note only */
```

### Bullet pip

A 6px-square ochre dot, used in amenities lists and the progress nav. Always `--accent`.

### Mode icons (transit)

Custom inline SVGs, drawn in `transit.jsx`. Stroke `1.4`, `currentColor` (which inherits `--accent` in dark transit context). Viewbox `0 0 60 30`.

---

## 6. SVG map system

### Projection

```js
const X0 = 10, X1 = 36, Y0 = -36, Y1 = -8;  // lon/lat bounds
const VW = 800, VH = 900;                    // viewBox

function proj(lon, lat) {
  return {
    x: ((lon - X0) / (X1 - X0)) * VW,
    y: (1 - (lat - Y0) / (Y1 - Y0)) * VH
  };
}
```

This is a deliberately stylised equirectangular projection — geographically wrong but visually correct for the editorial sketch aesthetic. **Keep as-is.**

### Country path strings

Nine country polygons (`Angola`, `Zambia`, `Mozambique`, `Zimbabwe`, `Namibia`, `Botswana`, `South Africa`, `Lesotho`, `Eswatini`) are stored in `maps.jsx` as the `COUNTRIES` array. These are hand-traced approximations, not survey data. **Port verbatim.**

### Route line styling

```css
stroke: var(--accent);
stroke-width: 2;
stroke-dasharray: 2 6;
stroke-linecap: round;
fill: none;
```

### Stop marker

```svg
<circle r="9" fill="var(--bone)" stroke="var(--accent-deep)" stroke-width="1.5" />
<circle r="3.5" fill="var(--accent-deep)" />
```

### Compass + scale

Decorative. Render only on the overview map, not on transit insets.

---

## 7. Print / PDF considerations

The CSS already declares a `@media print` block that hides the progress nav and tweaks panel. Extend it with `@page { size: A4 portrait; margin: 0 }` and the page-break rules in `PDF_NOTES.md`.

When rendering for PDF, lock the theme to `data-palette="savanna" data-typography="editorial" data-density="spacious"` unless the user has explicitly chosen otherwise.
