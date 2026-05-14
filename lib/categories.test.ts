import { test } from "node:test"
import assert from "node:assert/strict"

import {
  CATEGORY_MASTER,
  findCategoryBySlug,
  joinActiveCategories,
} from "./categories"

// ── CATEGORY_MASTER shape ────────────────────────────────────────────

test("CATEGORY_MASTER has 9 entries", () => {
  assert.equal(CATEGORY_MASTER.length, 9)
})

test("Every entry has unique slug + non-empty name + description", () => {
  const slugs = new Set<string>()
  for (const c of CATEGORY_MASTER) {
    assert.ok(c.slug.length > 0, "slug must be non-empty")
    assert.ok(!slugs.has(c.slug), `duplicate slug: ${c.slug}`)
    slugs.add(c.slug)
    assert.ok(c.name.trim().length > 0, `${c.slug}: name must be non-empty`)
    assert.ok(
      c.description.trim().length > 0,
      `${c.slug}: description must be non-empty`,
    )
  }
})

test("Slugs match the existing app/categories/[slug]/ folders", () => {
  // Pinned so a future master-list edit can't silently drift away
  // from the route folders.
  const expected = [
    "lodges",
    "campsites",
    "4x4-rentals",
    "guided-tours",
    "adventure-activities",
    "game-viewing",
    "overland-tours",
    "flights",
    "booking-agents",
  ]
  assert.deepEqual(
    CATEGORY_MASTER.map((c) => c.slug).sort(),
    [...expected].sort(),
  )
})

// ── findCategoryBySlug ────────────────────────────────────────────────

test("findCategoryBySlug returns the entry for a known slug", () => {
  const lodges = findCategoryBySlug("lodges")
  assert.ok(lodges)
  assert.equal(lodges?.name, "Safari Lodges")
})

test("findCategoryBySlug returns null for an unknown slug", () => {
  assert.equal(findCategoryBySlug("not-a-real-category"), null)
})

// ── joinActiveCategories — core filtering logic ────────────────────────

test("joinActiveCategories: only keeps categories with count > 0", () => {
  const result = joinActiveCategories(CATEGORY_MASTER, {
    lodges: 4,
    "guided-tours": 1,
  })
  assert.equal(result.length, 2)
  assert.deepEqual(
    result.map((c) => c.slug),
    ["lodges", "guided-tours"],
  )
})

test("joinActiveCategories: preserves master-list order, not counts insertion order", () => {
  // Counts inserted in reverse order; result should still be in
  // master-list order.
  const result = joinActiveCategories(CATEGORY_MASTER, {
    "booking-agents": 1,
    flights: 1,
    lodges: 4,
  })
  assert.deepEqual(
    result.map((c) => c.slug),
    ["lodges", "flights", "booking-agents"],
  )
})

test("joinActiveCategories: drops zero-count entries (the empty-card hiding behaviour)", () => {
  const result = joinActiveCategories(CATEGORY_MASTER, {
    lodges: 4,
    campsites: 0, // explicitly zero — same fate as not-present
    "guided-tours": 0,
  })
  assert.deepEqual(
    result.map((c) => c.slug),
    ["lodges"],
  )
})

test("joinActiveCategories: empty counts map → empty result", () => {
  const result = joinActiveCategories(CATEGORY_MASTER, {})
  assert.equal(result.length, 0)
})

test("joinActiveCategories: every kept entry carries its count", () => {
  const result = joinActiveCategories(CATEGORY_MASTER, {
    lodges: 4,
    "guided-tours": 2,
  })
  const lodges = result.find((c) => c.slug === "lodges")
  const guidedTours = result.find((c) => c.slug === "guided-tours")
  assert.equal(lodges?.count, 4)
  assert.equal(guidedTours?.count, 2)
})

test("joinActiveCategories: unknown slug in counts map is ignored (not silently added)", () => {
  const result = joinActiveCategories(CATEGORY_MASTER, {
    lodges: 4,
    "ghost-category": 99, // not in master — should not appear
  })
  assert.deepEqual(
    result.map((c) => c.slug),
    ["lodges"],
  )
})
