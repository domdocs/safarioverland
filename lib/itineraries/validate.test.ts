import { test } from "node:test"
import assert from "node:assert/strict"

import {
  createChapterSchema,
  createItinerarySchema,
  reorderChaptersSchema,
  updateChapterSchema,
  updateItinerarySchema,
  updateTransitSchema,
} from "./validate"

// ── createItinerarySchema ──────────────────────────────────────────────

test("createItinerarySchema accepts title only", () => {
  const r = createItinerarySchema.safeParse({ title: "Test trip" })
  assert.equal(r.success, true)
})

test("createItinerarySchema rejects missing title", () => {
  const r = createItinerarySchema.safeParse({})
  assert.equal(r.success, false)
})

test("createItinerarySchema rejects title > 80 chars", () => {
  const r = createItinerarySchema.safeParse({ title: "x".repeat(81) })
  assert.equal(r.success, false)
})

// ── updateItinerarySchema ──────────────────────────────────────────────

test("updateItinerarySchema accepts partial body", () => {
  const r = updateItinerarySchema.safeParse({
    subtitle: "A new subtitle",
  })
  assert.equal(r.success, true)
})

test("updateItinerarySchema rejects too many cover title lines", () => {
  const r = updateItinerarySchema.safeParse({
    cover_title_lines: ["a", "b", "c", "d", "e"],
  })
  assert.equal(r.success, false)
})

test("updateItinerarySchema rejects out-of-range guests", () => {
  const tooMany = updateItinerarySchema.safeParse({
    guests: ["a", "b", "c", "d", "e", "f", "g"],
  })
  assert.equal(tooMany.success, false)
  const none = updateItinerarySchema.safeParse({ guests: [] })
  assert.equal(none.success, false)
})

// ── createChapterSchema ────────────────────────────────────────────────

test("createChapterSchema accepts place + country", () => {
  const r = createChapterSchema.safeParse({
    place: "Victoria Falls",
    country: "Zimbabwe",
  })
  assert.equal(r.success, true)
})

test("createChapterSchema applies defaults", () => {
  const r = createChapterSchema.safeParse({})
  assert.equal(r.success, true)
  if (r.success) {
    assert.equal(r.data.place, "New chapter")
  }
})

// ── updateChapterSchema ────────────────────────────────────────────────

test("updateChapterSchema accepts coords in range", () => {
  const r = updateChapterSchema.safeParse({
    coords_lat: -17.924,
    coords_lon: 25.857,
  })
  assert.equal(r.success, true)
})

test("updateChapterSchema rejects coords out of range", () => {
  const r = updateChapterSchema.safeParse({ coords_lat: 100, coords_lon: 0 })
  assert.equal(r.success, false)
})

test("updateChapterSchema rejects nights out of bounds", () => {
  const tooMany = updateChapterSchema.safeParse({ nights: 20 })
  assert.equal(tooMany.success, false)
  const tooFew = updateChapterSchema.safeParse({ nights: 0 })
  assert.equal(tooFew.success, false)
})

test("updateChapterSchema accepts a full lodge", () => {
  const r = updateChapterSchema.safeParse({
    lodge: {
      name: "Vic Falls Hotel",
      kind: "Grande dame",
      room: "Stables Suite",
      blurb: "A grand colonial hotel.",
      amenities: ["Bar", "Pool", "Bath"],
    },
  })
  assert.equal(r.success, true)
})

// ── reorderChaptersSchema ──────────────────────────────────────────────

test("reorderChaptersSchema requires UUIDs", () => {
  const ok = reorderChaptersSchema.safeParse({
    order: [
      "11111111-1111-1111-1111-111111111111",
      "22222222-2222-2222-2222-222222222222",
    ],
  })
  assert.equal(ok.success, true)

  const bad = reorderChaptersSchema.safeParse({ order: ["not-a-uuid"] })
  assert.equal(bad.success, false)
})

// ── updateTransitSchema ────────────────────────────────────────────────

test("updateTransitSchema accepts partial body", () => {
  const r = updateTransitSchema.safeParse({ duration: "≈ 1 hr 10 min" })
  assert.equal(r.success, true)
})

test("updateTransitSchema rejects note that's too long", () => {
  const r = updateTransitSchema.safeParse({ note: "x".repeat(301) })
  assert.equal(r.success, false)
})
