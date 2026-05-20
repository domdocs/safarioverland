/**
 * Per-field-note publication / modification dates for the byline +
 * Article JSON-LD.
 *
 * Generated from a scan of every app/field-notes/.../page.tsx file.
 * Each entry uses the page's own `export const publishedAt = "..."`,
 * `export const updatedAt = "..."` and `export const editorId = "..."`
 * constants when present; pages without those exports fall back to
 * the file's mtime (dates) or "editor-niels" (editorId).
 *
 * Regenerate after editing any page's date exports:
 *   node scripts/gen-field-note-dates.mjs
 *
 * Long-term: once every note has explicit publishedAt / updatedAt
 * exports, this generated cache can be retired in favour of reading
 * exports directly. Until then it's the data source the client
 * <AutoArticleMeta /> component reads from.
 */

export type FieldNoteDates = {
  datePublished: string
  dateModified: string
  editorId: string
}

export const FIELD_NOTE_DATES: Record<string, FieldNoteDates> = {
  "/field-notes": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/conservation": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/conservation/anti-poaching": {
    "datePublished": "2025-09-20",
    "dateModified": "2026-05-18",
    "editorId": "editor-niels"
  },
  "/field-notes/conservation/beyond-safari": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/conservation/community-conservation": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/conservation/cultural-preservation": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/conservation/economics": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/conservation/education-awareness": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/conservation/endangered-species": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/conservation/ethical-operators": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/conservation/funding": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/conservation/habitat-preservation": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/conservation/responsible-practices": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/conservation/success-stories/kenya-corridors": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/conservation/success-stories/mountain-gorillas": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/conservation/success-stories/namibia-conservancies": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/conservation/success-stories/zimbabwe-rhinos": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/conservation/sustainable-tourism": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/faqs": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/planning-guides": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/planning-guides/accessible-safaris": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/planning-guides/before-you-go": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/planning-guides/best-times": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/planning-guides/budgeting": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/planning-guides/choosing-destinations": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/planning-guides/east-vs-southern": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/planning-guides/family-safaris": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/planning-guides/green-season": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/planning-guides/hidden-costs": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/planning-guides/luxury-vs-budget": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/planning-guides/off-the-beaten-path": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/planning-guides/packing-list": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/planning-guides/photography-gear": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/planning-guides/seasonal-packing": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/planning-guides/solo-travel": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/planning-guides/what-to-pack": {
    "datePublished": "2026-01-12",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/planning-guides/wildlife-events": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/safety-tips": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/safety-tips/wildlife-behavior": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/seasonal-guides": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/seasonal-guides/bird-watching": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/seasonal-guides/botswana": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/seasonal-guides/budget-travel": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/seasonal-guides/egypt": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/seasonal-guides/family-safari": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/seasonal-guides/ghana": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/seasonal-guides/gorilla-trekking": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/seasonal-guides/great-migration": {
    "datePublished": "2025-11-04",
    "dateModified": "2026-05-18",
    "editorId": "editor-niels"
  },
  "/field-notes/seasonal-guides/kenya": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/seasonal-guides/morocco": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/seasonal-guides/north-africa-birds": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/seasonal-guides/photography": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/seasonal-guides/senegal": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/seasonal-guides/south-africa": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/seasonal-guides/tanzania": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/seasonal-guides/uganda-rwanda": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/seasonal-guides/west-africa": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  },
  "/field-notes/seasonal-guides/zimbabwe-zambia": {
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "editorId": "editor-niels"
  }
} as const

/** Fallback when a pathname isn't in the map — e.g. a new note
 *  added between regens. */
export const FALLBACK_DATE: FieldNoteDates = {
  datePublished: "2026-05-20",
  dateModified: "2026-05-20",
  editorId: "editor-niels",
}
