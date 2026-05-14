# PDF rendering — Notes & recipes

The goal: a print-ready, A4 portrait PDF that is visually identical to the web view. This is the customer's primary takeaway, so it must be high-fidelity — drop-caps preserved, custom fonts embedded, SVG maps crisp, full-bleed photography uninterrupted.

---

## 1. Recommended stack

**Playwright + Chromium headless.** Best CSS support of any HTML-to-PDF tool, including:

- CSS `grid`, `flexbox`, `clamp()`, custom properties
- `@page` rules with named pages and per-page margins
- Variable fonts and `font-display` strategies
- Full SVG (including inline `<text>` and complex paths)
- Background gradients and shadows in print

Avoid:
- **`wkhtmltopdf`** — old WebKit, breaks on modern CSS.
- **`html2pdf.js` / `jspdf` (client-side)** — quality is poor; can't embed fonts properly.
- **`@react-pdf/renderer`** — would require re-implementing the whole design in a different rendering model.

If the production stack is PHP or Ruby, run Playwright as a separate microservice (small Node container) that the main app calls over HTTP. This is a common pattern.

---

## 2. Page setup

Inside the HTML's print-only styles:

```css
@page {
  size: A4 portrait;          /* 210mm × 297mm */
  margin: 0;                  /* design is full-bleed */
}

@media print {
  html, body {
    background: var(--bone);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;     /* honour our background colours */
  }

  /* Hide interactive chrome */
  .progress, .tweaks-panel { display: none !important; }

  /* Each major section starts on a new page */
  .cover,
  .prologue,
  .overview,
  .chapter,
  .transit,
  .practicals,
  .signoff {
    break-before: page;
    break-inside: avoid;       /* won't always be possible — see §3 */
  }

  /* The cover is page 1 — no break before */
  .cover { break-before: auto; }

  /* Hero photos must not split */
  .chapter-hero,
  .cover-photo,
  .lodge .photo {
    break-inside: avoid;
  }

  /* The intro paragraph drop-cap can lose its float in print engines —
     force the column gap to remain stable */
  .chapter-intro {
    page-break-inside: avoid;
  }
}
```

---

## 3. Page-break strategy

A single chapter contains: hero, intro, lodge, rhythm, seeing+note. Total length is roughly 3–4 A4 pages. The chapter as a whole **cannot** `break-inside: avoid` (too tall), so use granular breaks:

```css
@media print {
  .chapter-hero          { break-after: page; }    /* always force */
  .chapter-intro         { break-inside: avoid; }
  .lodge                 { break-inside: avoid; }
  .rhythm-section        { break-before: auto; }
  .rhythm-item           { break-inside: avoid; }
  .seeing-note           { break-before: auto; }
  .note-card             { break-inside: avoid; }
  .transit               { break-before: page; break-inside: avoid; }
  .practicals            { break-before: page; }
  .practical-card        { break-inside: avoid; }
  .signoff               { break-before: page; }
}
```

Test with a long chapter (4+ rhythm items, 6 amenities) — if the lodge block splits, hoist `.lodge .text` ahead of `.lodge .photo` in the source order so the text starts on the upper page.

---

## 4. Font embedding

**Self-host the WOFF2 files** under `/fonts/` and declare them with `@font-face` rules in CSS. Chromium-headless does fetch from `fonts.googleapis.com` reliably, but with a 200–800ms hit per font that adds up to a slow render. Self-hosting also ensures the PDF is reproducible if Google changes their CDN.

```css
@font-face {
  font-family: "Cormorant Garamond";
  src: url("/fonts/cormorant-garamond-400.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
/* ...repeat for each weight/style/family used */
```

Then in the Playwright render call, **wait for fonts to settle** before invoking `page.pdf()`:

```js
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const pdf = await page.pdf({
  format: "A4",
  printBackground: true,        // CRITICAL — preserves backgrounds & images
  preferCSSPageSize: true,      // honour @page declarations
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});
```

`printBackground: true` is non-negotiable — without it, the cream `--bone` background and all photography drop out.

---

## 5. Image handling

- **Use absolute URLs** for images in the rendered HTML. Relative URLs can resolve incorrectly inside the headless browser.
- **Preload critical images** before invoking `page.pdf()` to avoid blank placeholder boxes:

  ```js
  await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    await Promise.all(imgs.map(img =>
      img.complete ? Promise.resolve() :
      new Promise(res => { img.onload = img.onerror = res; })
    ));
  });
  ```

- **Don't downscale** — the source images should be ≥1600px on the long edge. The PDF will be printed or zoomed on retina displays.
- **Strip the `<image-slot>` component** from the production renderer. Replace with plain `<img>` tags or CSS `background-image`.

---

## 6. SVG maps

The maps are inline SVG with text elements. They print perfectly in Chromium. Two notes:

- `<text>` elements use `font-family: var(--display)` etc. — ensure the variables are resolvable in the print context (they will be, since they're declared on `:root`).
- Stroke widths under 0.5 may render inconsistently. The current map uses minimums of 0.6 (decorative frame) and 0.9 (country outlines) — keep those floors.

---

## 7. Pagination expectations

A typical 4-chapter trip will produce approximately:

| Section | Pages |
|---|---|
| Cover | 1 |
| Prologue | 1 |
| Overview | 1 |
| Chapter × 4 (each: hero 1pg, intro+lodge 1pg, rhythm 1pg, seeing+note 1pg) | 12–16 |
| Transit × 3 | 3 |
| Practicals | 1–2 |
| Sign-off | 1 |
| **Total** | **20–24 pages** |

PDF file size, properly compressed, should land around 8–15 MB depending on photography. If it exceeds 20 MB, downscale source photos.

---

## 8. Filename convention

```
SO-{REFERENCE}-{GUEST_LASTNAME}-{YYYY-MM}.pdf
```

Example: `SO-2026-1042-Whitford-2026-09.pdf`

---

## 9. Edge cases to handle

- **Single-chapter trip** (`chapters.length === 1`) — no transits. The Overview map still renders, just with one waypoint.
- **Very long curator note** — the handwritten `Caveat` font expands the card; allow it to flow but cap at ~400 chars in the form (see SCHEMA.md).
- **Missing photo at render time** — fall back to a deterministic gradient using the chapter's `palette` value. Never render an empty box.
- **Custom theme** — store the theme on the itinerary record. The PDF renderer must set the `data-palette`/`data-typography`/`data-density` attributes on `<html>` before printing.
- **Title with very long lines** — `cover_title_lines` of >24 chars per line may overflow the cover column. The form should warn at >24 chars.

---

## 10. Sanity checks before shipping

A render is "good" when:

- [ ] Cover photo is full-bleed left half, no margin or white border anywhere
- [ ] Trip title is 3 italic lines, breaks where the user set the line breaks
- [ ] Overview map's route line shows the dashed ochre line connecting all stops in order
- [ ] Each chapter hero is full-bleed with the roman numeral readable against the photo
- [ ] Drop-caps appear at the start of every chapter intro paragraph
- [ ] Transit pages are dark `--ink`, with the map clearly visible
- [ ] Curator notes render in the handwritten `Caveat` font (not a fallback serif)
- [ ] Sign-off "Tom" is in `Caveat`, large
- [ ] No widow lines on rhythm items
- [ ] Page count matches expected range above

Build a visual regression test with one canonical trip (the Vic Falls → Cape Town example in `data.jsx`). Re-run on every CSS or component change.
