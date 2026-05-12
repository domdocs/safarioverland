import { test } from "node:test"
import assert from "node:assert/strict"

import { parseResearchRecord } from "./import-record"

// ── Fixtures ────────────────────────────────────────────────────────────

function buildFrontmatter(
  overrides: Record<string, string | number | boolean | null | undefined>,
): string {
  // Minimum required + the overrides. Each key prints as `key: value` with
  // basic YAML serialisation: nulls → "null", strings unquoted, numbers/
  // booleans as-is. Sufficient for the cases we test.
  const base: Record<string, unknown> = {
    listing_name: "Test Lodge",
    category: "Lodges",
    region: "Southern Africa",
    country: "Zimbabwe",
    location: "Somewhere on the Zambezi",
    ...overrides,
  }
  const lines = Object.entries(base).map(([k, v]) => {
    if (v === null || v === undefined) return `${k}: null`
    if (typeof v === "boolean") return `${k}: ${v}`
    if (typeof v === "number") return `${k}: ${v}`
    return `${k}: "${String(v).replace(/"/g, '\\"')}"`
  })
  return ["---", ...lines, "---", "", "Body content goes here."].join("\n")
}

// ── Required-field validation ───────────────────────────────────────────

test("missing listing_name produces an error", () => {
  const md = buildFrontmatter({ listing_name: undefined as unknown as string })
  // Build manually to actually omit the key.
  const without = md.replace(/^listing_name:.*\n/m, "")
  const r = parseResearchRecord(without)
  assert.equal(r.ok, false)
  if (!r.ok) {
    assert.ok(
      r.errors.some((e) => e.includes("listing_name")),
      `expected listing_name error, got: ${r.errors.join(" | ")}`,
    )
  }
})

test("missing category produces an error", () => {
  const md = buildFrontmatter({}).replace(/^category:.*\n/m, "")
  const r = parseResearchRecord(md)
  assert.equal(r.ok, false)
  if (!r.ok) {
    assert.ok(r.errors.some((e) => e.includes("category")))
  }
})

test("missing region produces an error", () => {
  const md = buildFrontmatter({}).replace(/^region:.*\n/m, "")
  const r = parseResearchRecord(md)
  assert.equal(r.ok, false)
  if (!r.ok) assert.ok(r.errors.some((e) => e.includes("region")))
})

test("missing country produces an error", () => {
  const md = buildFrontmatter({}).replace(/^country:.*\n/m, "")
  const r = parseResearchRecord(md)
  assert.equal(r.ok, false)
  if (!r.ok) assert.ok(r.errors.some((e) => e.includes("country")))
})

test("missing location produces an error", () => {
  const md = buildFrontmatter({}).replace(/^location:.*\n/m, "")
  const r = parseResearchRecord(md)
  assert.equal(r.ok, false)
  if (!r.ok) assert.ok(r.errors.some((e) => e.includes("location")))
})

// ── Category validation + normalisation ─────────────────────────────────

test("invalid category produces a helpful error", () => {
  const md = buildFrontmatter({ category: "not-a-real-category" })
  const r = parseResearchRecord(md)
  assert.equal(r.ok, false)
  if (!r.ok) {
    assert.ok(r.errors.some((e) => /category/i.test(e)))
  }
})

test("label-form category is accepted and normalised to slug", () => {
  const md = buildFrontmatter({ category: "Lodges" })
  const r = parseResearchRecord(md)
  assert.equal(r.ok, true)
  if (r.ok) assert.equal(r.record.category, "lodges")
})

test("slug-form category is accepted as-is", () => {
  const md = buildFrontmatter({ category: "guided-tours" })
  const r = parseResearchRecord(md)
  assert.equal(r.ok, true)
  if (r.ok) assert.equal(r.record.category, "guided-tours")
})

test("4×4 rentals fancy unicode label is accepted", () => {
  const md = buildFrontmatter({ category: "4×4 rentals" })
  const r = parseResearchRecord(md)
  assert.equal(r.ok, true)
  if (r.ok) assert.equal(r.record.category, "4x4-rentals")
})

// ── price_tier validation ───────────────────────────────────────────────

test("valid price_tier is accepted", () => {
  const md = buildFrontmatter({ price_tier: "luxury" })
  const r = parseResearchRecord(md)
  assert.equal(r.ok, true)
  if (r.ok) assert.equal(r.record.price_tier, "luxury")
})

test("invalid price_tier is rejected", () => {
  const md = buildFrontmatter({ price_tier: "premium" })
  const r = parseResearchRecord(md)
  assert.equal(r.ok, false)
  if (!r.ok) {
    assert.ok(r.errors.some((e) => /price_tier/.test(e)))
  }
})

// ── Coordinate range checks ─────────────────────────────────────────────

test("latitude out of range is rejected", () => {
  const md = buildFrontmatter({ latitude: 91 })
  const r = parseResearchRecord(md)
  assert.equal(r.ok, false)
  if (!r.ok) assert.ok(r.errors.some((e) => /latitude/.test(e)))
})

test("longitude out of range is rejected", () => {
  const md = buildFrontmatter({ longitude: -181 })
  const r = parseResearchRecord(md)
  assert.equal(r.ok, false)
  if (!r.ok) assert.ok(r.errors.some((e) => /longitude/.test(e)))
})

test("valid coordinates are accepted", () => {
  const md = buildFrontmatter({ latitude: -18.0123, longitude: 25.7456 })
  const r = parseResearchRecord(md)
  assert.equal(r.ok, true)
  if (r.ok) {
    assert.equal(r.record.latitude, -18.0123)
    assert.equal(r.record.longitude, 25.7456)
  }
})

// ── Status override + featured warning ──────────────────────────────────

test("status is always coerced to pending; non-pending input produces a warning", () => {
  const md = buildFrontmatter({ status: "approved" })
  const r = parseResearchRecord(md)
  assert.equal(r.ok, true)
  if (r.ok) {
    assert.equal(r.record.status, "pending")
    assert.ok(
      r.warnings.some((w) => /status.*overridden/i.test(w)),
      `expected status override warning; got: ${r.warnings.join(" | ")}`,
    )
  }
})

test("featured=true is coerced to false with a warning", () => {
  const md = buildFrontmatter({ featured: true })
  const r = parseResearchRecord(md)
  assert.equal(r.ok, true)
  if (r.ok) {
    assert.equal(r.record.featured, false)
    assert.ok(r.warnings.some((w) => /featured/i.test(w)))
  }
})

// ── Empty / malformed input ─────────────────────────────────────────────

test("empty input produces a meaningful error", () => {
  const r = parseResearchRecord("")
  assert.equal(r.ok, false)
  if (!r.ok) assert.ok(r.errors.some((e) => /empty/i.test(e)))
})

test("no frontmatter produces a helpful error", () => {
  const r = parseResearchRecord("# Just markdown, no frontmatter\n\nSome body.")
  assert.equal(r.ok, false)
  if (!r.ok) {
    assert.ok(
      r.errors.some((e) => /frontmatter/i.test(e)),
      `expected frontmatter error; got: ${r.errors.join(" | ")}`,
    )
  }
})

test("frontmatter with only required fields and empty body still parses", () => {
  const md = ["---", "listing_name: Minimal", "category: Lodges", "region: Southern Africa", "country: Zimbabwe", "location: Nowhere", "---"].join("\n")
  const r = parseResearchRecord(md)
  assert.equal(r.ok, true)
  if (r.ok) {
    assert.equal(r.record.listing_name, "Minimal")
    assert.equal(r.record.editor_notes, null)
  }
})

// ── Body → editor_notes handling ────────────────────────────────────────

test("body markdown replaces frontmatter editor_notes when both are present", () => {
  const md = [
    "---",
    "listing_name: Test",
    "category: Lodges",
    "region: Southern Africa",
    "country: Zimbabwe",
    "location: Somewhere",
    'editor_notes: "Frontmatter notes"',
    "---",
    "",
    "Body notes win.",
  ].join("\n")
  const r = parseResearchRecord(md)
  assert.equal(r.ok, true)
  if (r.ok) {
    assert.equal(r.record.editor_notes, "Body notes win.")
  }
})

test("frontmatter editor_notes kept when body is empty", () => {
  const md = [
    "---",
    "listing_name: Test",
    "category: Lodges",
    "region: Southern Africa",
    "country: Zimbabwe",
    "location: Somewhere",
    'editor_notes: "Only in frontmatter"',
    "---",
  ].join("\n")
  const r = parseResearchRecord(md)
  assert.equal(r.ok, true)
  if (r.ok) {
    assert.equal(r.record.editor_notes, "Only in frontmatter")
  }
})

// ── Array + JSONB handling ──────────────────────────────────────────────

test("array fields parsed from YAML lists", () => {
  const md = [
    "---",
    "listing_name: Test",
    "category: Lodges",
    "region: Southern Africa",
    "country: Zimbabwe",
    "location: Somewhere",
    "wellness_offerings:",
    "  - spa",
    "  - yoga",
    "activities:",
    "  - game drive",
    "  - boat cruise",
    "---",
  ].join("\n")
  const r = parseResearchRecord(md)
  assert.equal(r.ok, true)
  if (r.ok) {
    assert.deepEqual(r.record.wellness_offerings, ["spa", "yoga"])
    assert.deepEqual(r.record.activities, ["game drive", "boat cruise"])
  }
})

test("empty arrays normalise to null", () => {
  const md = [
    "---",
    "listing_name: Test",
    "category: Lodges",
    "region: Southern Africa",
    "country: Zimbabwe",
    "location: Somewhere",
    "wellness_offerings: []",
    "activities: []",
    "---",
  ].join("\n")
  const r = parseResearchRecord(md)
  assert.equal(r.ok, true)
  if (r.ok) {
    assert.equal(r.record.wellness_offerings, null)
    assert.equal(r.record.activities, null)
  }
})

test("traveller_quotes JSONB shape validated", () => {
  const md = [
    "---",
    "listing_name: Test",
    "category: Lodges",
    "region: Southern Africa",
    "country: Zimbabwe",
    "location: Somewhere",
    "traveller_quotes:",
    '  - quote: "Magical"',
    '    attributed_to: "Sarah K."',
    "    trip_year: 2024",
    "---",
  ].join("\n")
  const r = parseResearchRecord(md)
  assert.equal(r.ok, true)
  if (r.ok) {
    assert.equal(r.record.traveller_quotes?.[0]?.attributed_to, "Sarah K.")
  }
})

test("traveller_quotes missing required key is rejected", () => {
  const md = [
    "---",
    "listing_name: Test",
    "category: Lodges",
    "region: Southern Africa",
    "country: Zimbabwe",
    "location: Somewhere",
    "traveller_quotes:",
    '  - quote: "Missing attribution"',
    "---",
  ].join("\n")
  const r = parseResearchRecord(md)
  assert.equal(r.ok, false)
  if (!r.ok) {
    assert.ok(
      r.errors.some((e) => /attributed_to/.test(e)),
      `expected attributed_to error; got: ${r.errors.join(" | ")}`,
    )
  }
})

// ── End-to-end: real Matetsi sample ─────────────────────────────────────

test("Matetsi sample parses cleanly with all editorial fields populated", () => {
  // Read the canonical sample to make sure the parser keeps working
  // against the actual record shape the AI pipeline produces.
  const fs = require("node:fs") as typeof import("node:fs")
  const path = require("node:path") as typeof import("node:path")
  const sample = fs.readFileSync(
    path.resolve(process.cwd(), "handoff/listings/matetsi-victoria-falls.md"),
    "utf8",
  )
  const r = parseResearchRecord(sample)
  assert.equal(r.ok, true, `parse failed: ${r.ok ? "" : r.errors.join(" | ")}`)
  if (!r.ok) return

  assert.equal(r.record.listing_name, "Matetsi Victoria Falls")
  assert.equal(r.record.category, "lodges")
  assert.equal(r.record.country, "Zimbabwe")
  assert.equal(r.record.region, "Southern Africa")
  assert.equal(r.record.price_tier, "luxury")
  assert.equal(r.record.max_guests, 45)
  assert.equal(r.record.status, "pending")
  assert.equal(r.record.featured, false)

  // Editorial fields should be present
  assert.ok(r.record.verdict && r.record.verdict.length > 50)
  assert.ok(
    r.record.signature_experience && r.record.signature_experience.length > 100,
  )
  assert.ok(r.record.conservation_summary)
  assert.ok(r.record.community_summary)
  assert.deepEqual(r.record.wellness_offerings, ["spa"])
  assert.ok(r.record.activities && r.record.activities.length === 6)

  // Body markdown replaced frontmatter editor_notes
  assert.ok(
    r.record.editor_notes &&
      r.record.editor_notes.includes("Sign-off checklist"),
    "editor_notes should contain the body markdown",
  )
})
