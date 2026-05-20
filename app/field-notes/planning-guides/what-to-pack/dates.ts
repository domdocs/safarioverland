/**
 * Editorial dates for this field note. Scanned at build time by
 * `scripts/gen-field-note-dates.mjs` and baked into
 * `lib/field-note-dates.ts`, which the <AutoArticleMeta /> client
 * component reads to render the visible byline + Article JSON-LD.
 *
 * Lives in a sibling module rather than on the page itself because
 * Next.js's strict page-module typing rejects arbitrary named
 * exports from a route segment.
 */
export const publishedAt = "2026-01-12"
export const updatedAt = "2026-05-18"
export const editorId = "editor-niels"
