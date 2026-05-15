# Download an itinerary PDF

The Trip Designer renders the editorial document server-side via
headless Chromium and streams a print-ready A4 PDF back to your
browser. One click; no print dialog needed.

## Steps

1. Open the itinerary in admin: `/admin/itineraries/[id]/edit`
2. Click **Download PDF** in the sticky header (next to **Preview ↗**).
3. The button reads *Generating…* for a few seconds while Chromium
   renders the document — ~3–5 s on a cold function, ~1–2 s on
   subsequent runs.
4. The browser saves the PDF using the filename convention
   `SO-{REFERENCE}-{LASTNAME}-{YYYY-MM}.pdf`
   (e.g. `SO-2026-0001-Whitford-2026-09.pdf`).
5. Attach the file to a personal email from Niels' Gmail.

## What happens behind the scenes

- The `/api/admin/itineraries/[id]/pdf` route launches headless
  Chromium (`@sparticuz/chromium` + `puppeteer-core` in production,
  full `puppeteer` package locally).
- It navigates Chromium to the same `/admin/itineraries/[id]/preview`
  URL Niels sees on screen, forwarding admin Basic Auth and the
  caller's cookies (including the Vercel SSO cookie on preview
  deployments, so Deployment Protection lets it through).
- Waits for `document.fonts.ready` and every `<img>.complete` so
  fonts and photography are fully loaded before rasterising.
- Calls `page.pdf({ format: 'A4', printBackground: true,
  preferCSSPageSize: true, margin: 0 })` and streams the result back.

## If the PDF looks wrong

- **Missing photos** — wait a beat and click again; Chromium can
  cold-start with image fetches racing the rasterise. The retry has
  warm caches.
- **Missing backgrounds or gradients** — those are forced on via
  `printBackground: true` server-side; if they're missing, log into
  the Vercel function logs to inspect.
- **First-time deploy fails** — the Vercel function bundle includes
  ~50 MB of Chromium binary. First cold start can hit timeouts. The
  endpoint has `maxDuration: 60` to give Chromium room.

## Fallback: Mac Print > PDF

If the server-side endpoint is down for any reason, the preview
route still prints cleanly to PDF via Safari or Chrome's
`File → Print → Save as PDF`. The same `@page` rules and print CSS
that drive Puppeteer also drive the browser print dialog. Use A4
portrait, 0 margins, print backgrounds on.

## File size and pagination

A typical 4-chapter trip produces ~20–24 pages, ~8–15 MB. The
Chromium pipeline compresses photos via WebP-to-JPEG in the PDF, so
sizes are reasonable even with multi-megabyte source images.
