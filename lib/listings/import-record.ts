/**
 * Pure parser + validator for research-record markdown files.
 *
 * Takes a markdown string (YAML frontmatter + human-readable body — see
 * handoff/skills/listing-research/research-record-template.md) and returns
 * either a validated `ImportRecord` ready to insert into `directory_listings`
 * or a list of human-readable validation errors.
 *
 * No HTTP, no DB, no I/O. Everything here is synchronous and testable in
 * isolation.
 */

import matter from "gray-matter"
import { z } from "zod"

// ── Canonical category list ─────────────────────────────────────────────
// Mirrors lib/category-tabs.ts. The values that get persisted to
// `directory_listings.category` are the slug forms — that's the convention
// the rest of the codebase uses (admin edit form, the route segments under
// /categories/[category], the seed data). Frontmatter authors may use
// either the slug or the human label; we accept both and normalise.
const CATEGORY_ALIASES: Record<string, string> = {
  // Slug → slug (identity)
  "lodges": "lodges",
  "campsites": "campsites",
  "guided-tours": "guided-tours",
  "overland-tours": "overland-tours",
  "4x4-rentals": "4x4-rentals",
  "adventure-activities": "adventure-activities",
  "game-viewing": "game-viewing",
  "flights": "flights",
  "booking-agents": "booking-agents",
  // Label → slug
  "lodge": "lodges",
  "campsite": "campsites",
  "guided tour": "guided-tours",
  "guided tours": "guided-tours",
  "overland tour": "overland-tours",
  "overland tours": "overland-tours",
  "4x4 rental": "4x4-rentals",
  "4x4 rentals": "4x4-rentals",
  "4×4 rentals": "4x4-rentals",
  "adventure activity": "adventure-activities",
  "adventure activities": "adventure-activities",
  "activities": "adventure-activities",
  "game viewing": "game-viewing",
  "flight": "flights",
  "booking agent": "booking-agents",
  "booking agents": "booking-agents",
}

export const VALID_CATEGORY_SLUGS = [
  "lodges",
  "campsites",
  "guided-tours",
  "overland-tours",
  "4x4-rentals",
  "adventure-activities",
  "game-viewing",
  "flights",
  "booking-agents",
] as const

function normaliseCategory(raw: string): string | null {
  const key = raw.trim().toLowerCase()
  return CATEGORY_ALIASES[key] ?? null
}

// ── JSONB shapes ────────────────────────────────────────────────────────

const travellerQuoteSchema = z.object({
  quote: z.string().min(1, "quote is required"),
  attributed_to: z.string().min(1, "attributed_to is required"),
  trip_year: z.number().int().optional(),
})

const externalRatingSchema = z.object({
  source: z.string().min(1, "source is required"),
  rating: z.number(),
  max: z.number().optional(),
  count: z.number().int().optional(),
  url: z.string().optional(),
  fetched_at: z.string().optional(),
})

// ── Frontmatter schema ──────────────────────────────────────────────────
// Mirrors the fields documented in research-record-template.md and the
// columns on directory_listings (migration 20260508).

const PRICE_TIERS = ["budget", "mid", "luxury", "exclusive"] as const

const frontmatterSchema = z
  .object({
    // Required
    listing_name: z.string().min(1, "listing_name is required"),
    category: z
      .string()
      .min(1, "category is required")
      .transform((s, ctx) => {
        const normalised = normaliseCategory(s)
        if (!normalised) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `category must be one of: ${VALID_CATEGORY_SLUGS.join(", ")} (or the human label equivalent)`,
          })
          return z.NEVER
        }
        return normalised
      }),
    region: z.string().min(1, "region is required"),
    country: z.string().min(1, "country is required"),
    location: z.string().min(1, "location is required"),

    // Recommended
    description: z.string().nullish(),
    website: z.string().nullish(),
    image_url: z.string().nullish(),
    featured: z.boolean().nullish(),
    status: z.string().nullish(),

    // Editorial
    verdict: z.string().nullish(),
    signature_experience: z.string().nullish(),
    conservation_summary: z.string().nullish(),
    community_summary: z.string().nullish(),

    // Arrays
    wellness_offerings: z.array(z.string()).nullish(),
    activities: z.array(z.string()).nullish(),
    gallery_urls: z.array(z.string()).nullish(),
    field_notes_slugs: z.array(z.string()).nullish(),

    // Founder
    founder_name: z.string().nullish(),
    founder_note: z.string().nullish(),
    founder_image_url: z.string().nullish(),

    // JSONB
    traveller_quotes: z.array(travellerQuoteSchema).nullish(),
    external_ratings: z.array(externalRatingSchema).nullish(),

    // Practical
    max_guests: z.number().int().positive().nullish(),
    best_time_to_visit: z.string().nullish(),
    price_tier: z
      .enum(PRICE_TIERS, {
        errorMap: () => ({
          message: `price_tier must be one of ${PRICE_TIERS.join(" / ")}`,
        }),
      })
      .nullish(),

    // Geographic
    latitude: z
      .number()
      .min(-90, "latitude must be in [-90, 90]")
      .max(90, "latitude must be in [-90, 90]")
      .nullish(),
    longitude: z
      .number()
      .min(-180, "longitude must be in [-180, 180]")
      .max(180, "longitude must be in [-180, 180]")
      .nullish(),

    // Contact
    contact_name: z.string().nullish(),
    contact_email: z.string().nullish(),
    contact_phone: z.string().nullish(),
    price_info: z.string().nullish(),

    // Internal
    editor_notes: z.string().nullish(),
  })
  .passthrough()

export type ImportRecord = {
  // Required
  listing_name: string
  category: string
  region: string
  country: string
  location: string

  // Legacy non-null columns in production. Defaulted to "" when the
  // frontmatter omits them so the insert satisfies NOT NULL constraints
  // that pre-date the editorial-fields migration. The admin edit form
  // and frontend treat empty strings the same as missing values.
  description: string
  contact_name: string
  contact_email: string
  contact_phone: string
  price_info: string

  // Recommended
  website: string | null
  image_url: string | null
  featured: boolean
  status: "pending"

  // Editorial
  verdict: string | null
  signature_experience: string | null
  conservation_summary: string | null
  community_summary: string | null

  // Arrays
  wellness_offerings: string[] | null
  activities: string[] | null
  gallery_urls: string[] | null
  field_notes_slugs: string[] | null

  // Founder
  founder_name: string | null
  founder_note: string | null
  founder_image_url: string | null

  // JSONB
  traveller_quotes: z.infer<typeof travellerQuoteSchema>[] | null
  external_ratings: z.infer<typeof externalRatingSchema>[] | null

  // Practical
  max_guests: number | null
  best_time_to_visit: string | null
  price_tier: (typeof PRICE_TIERS)[number] | null

  // Geographic
  latitude: number | null
  longitude: number | null

  // Internal
  editor_notes: string | null
}

export type ImportResult =
  | { ok: true; record: ImportRecord; bodyMarkdown: string; warnings: string[] }
  | { ok: false; errors: string[] }

// ── Helpers ─────────────────────────────────────────────────────────────

function nullish<T>(v: T | null | undefined): T | null {
  return v === undefined || v === "" ? null : (v as T)
}

function nullishString(v: unknown): string | null {
  if (v === undefined || v === null) return null
  if (typeof v !== "string") return null
  const trimmed = v.trim()
  return trimmed.length === 0 ? null : trimmed
}

function nullishArray<T>(v: T[] | null | undefined): T[] | null {
  if (!v || v.length === 0) return null
  return v
}

function combineEditorNotes(
  frontmatterNotes: string | null | undefined,
  bodyMarkdown: string,
): string | null {
  const body = bodyMarkdown.trim()
  const fm = (frontmatterNotes ?? "").trim()
  // Per the template: "The body of the markdown is copied verbatim into
  // editor_notes, replacing whatever's in the frontmatter's editor_notes
  // field if both are present." Keep frontmatter notes only when there is
  // no body.
  if (body.length > 0) return body
  return fm.length > 0 ? fm : null
}

function flattenZodError(error: z.ZodError): string[] {
  return error.issues.map((issue) => {
    const path = issue.path.length > 0 ? `${issue.path.join(".")}: ` : ""
    return `${path}${issue.message}`
  })
}

// ── Main ────────────────────────────────────────────────────────────────

export function parseResearchRecord(markdown: string): ImportResult {
  // Guard for empty input — gray-matter would happily return `{ data: {} }`
  // and downstream validation would surface "listing_name required", but a
  // friendlier message is worth the early branch.
  if (!markdown || !markdown.trim()) {
    return { ok: false, errors: ["empty markdown — no frontmatter or body"] }
  }

  let parsed: matter.GrayMatterFile<string>
  try {
    parsed = matter(markdown)
  } catch (err) {
    return {
      ok: false,
      errors: [
        `failed to parse YAML frontmatter — ${
          err instanceof Error ? err.message : String(err)
        }`,
      ],
    }
  }

  if (!parsed.data || Object.keys(parsed.data).length === 0) {
    return {
      ok: false,
      errors: [
        "no YAML frontmatter found — the record must start with `---` and contain the fields listed in research-record-template.md",
      ],
    }
  }

  const validation = frontmatterSchema.safeParse(parsed.data)
  if (!validation.success) {
    return { ok: false, errors: flattenZodError(validation.error) }
  }

  const data = validation.data
  const warnings: string[] = []

  // Status override — always pending on import. Warn if the frontmatter
  // specified something else.
  const statusInput = nullishString(data.status)
  if (statusInput && statusInput !== "pending") {
    warnings.push(
      `status="${statusInput}" overridden to "pending" — flip to approved in admin after review`,
    )
  }

  // Featured warning — Dom should approve before featuring.
  if (data.featured === true) {
    warnings.push(
      `featured=true ignored on import — approve the listing first, then tick featured in admin`,
    )
  }

  const record: ImportRecord = {
    listing_name: data.listing_name.trim(),
    category: data.category, // already normalised by the schema transform
    region: data.region.trim(),
    country: data.country.trim(),
    location: data.location.trim(),

    description: nullishString(data.description) ?? "",
    contact_name: nullishString(data.contact_name) ?? "",
    contact_email: nullishString(data.contact_email) ?? "",
    contact_phone: nullishString(data.contact_phone) ?? "",
    price_info: nullishString(data.price_info) ?? "",
    website: nullishString(data.website),
    image_url: nullishString(data.image_url),
    featured: false, // forced — see warning above
    status: "pending",

    verdict: nullishString(data.verdict),
    signature_experience: nullishString(data.signature_experience),
    conservation_summary: nullishString(data.conservation_summary),
    community_summary: nullishString(data.community_summary),

    wellness_offerings: nullishArray(data.wellness_offerings ?? null),
    activities: nullishArray(data.activities ?? null),
    gallery_urls: nullishArray(data.gallery_urls ?? null),
    field_notes_slugs: nullishArray(data.field_notes_slugs ?? null),

    founder_name: nullishString(data.founder_name),
    founder_note: nullishString(data.founder_note),
    founder_image_url: nullishString(data.founder_image_url),

    traveller_quotes: nullishArray(data.traveller_quotes ?? null),
    external_ratings: nullishArray(data.external_ratings ?? null),

    max_guests: nullish(data.max_guests),
    best_time_to_visit: nullishString(data.best_time_to_visit),
    price_tier: data.price_tier ?? null,

    latitude: nullish(data.latitude),
    longitude: nullish(data.longitude),

    editor_notes: combineEditorNotes(
      nullishString(data.editor_notes),
      parsed.content,
    ),
  }

  return { ok: true, record, bodyMarkdown: parsed.content, warnings }
}
