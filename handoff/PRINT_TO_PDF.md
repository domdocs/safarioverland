# Print itinerary to PDF — Mac workflow

The Trip Designer preview is designed to print cleanly to A4 PDF from
any Mac browser. Safari is recommended (best WebKit rendering for
editorial typography).

## Steps

1. Open the itinerary in admin: `/admin/itineraries/[id]/edit`
2. Click **Preview** (top right of the edit form). The full editorial
   document opens in a new tab.
3. In the preview tab, press **⌘P** (or click the *Print this page* link
   in the top banner).
4. In the print dialog:
   - **Paper Size:** A4
   - **Orientation:** Portrait
   - **Margins:** None / 0 (under "Show Details" if needed)
   - **Print backgrounds:** ON ("Print headers and footers" OFF;
     "Print backgrounds" or "Background graphics" ON — naming varies
     by browser)
   - **Scale:** 100%
5. In the bottom-left of the print dialog, click the **PDF** dropdown
   and choose **Save as PDF**.
6. Name the file using the convention: `SO-{REFERENCE}-{LASTNAME}-{YYYY-MM}.pdf`
   - e.g. `SO-2026-0001-Whitford-2026-09.pdf`
7. Save. The PDF is now ready to attach to a personal email from
   Niels' Gmail.

## If the PDF looks wrong

- **Margins or white borders:** margins setting in print dialog isn't 0
- **Missing backgrounds, photos:** "Print backgrounds" checkbox isn't on
- **Headers like the URL or date appearing:** "Print headers and footers"
  is on; turn it off
- **Fonts looking wrong:** open the preview in Safari rather than Chrome
- **Pages breaking in odd places:** check that the browser zoom is 100%

## Future: automated PDF

This manual workflow exists because we're at low volume. When itinerary
production scales past ~5 per month, we'll automate via a Playwright
microservice (separate brief). The print CSS we write for the manual
workflow carries over with no rework.
