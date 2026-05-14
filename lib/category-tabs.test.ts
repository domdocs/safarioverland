import { test } from "node:test"
import assert from "node:assert/strict"

import { CATEGORY_TABS, buildCategoryTabs } from "./category-tabs"

// ── Legacy behaviour (no activeSlugs) ─────────────────────────────────

test("Without activeSlugs: renders All + every master-list tab", () => {
  const tabs = buildCategoryTabs(null)
  // Always starts with All.
  assert.equal(tabs[0]?.label, "All")
  assert.equal(tabs[0]?.active, true)
  // Plus every master entry, in order.
  assert.equal(tabs.length, 1 + CATEGORY_TABS.length)
  for (let i = 0; i < CATEGORY_TABS.length; i++) {
    assert.equal(tabs[i + 1].href, `/categories/${CATEGORY_TABS[i].slug}`)
    assert.equal(tabs[i + 1].label, CATEGORY_TABS[i].label)
  }
})

test("Without activeSlugs: active flag tracks the activeSlug", () => {
  const tabs = buildCategoryTabs("lodges")
  const all = tabs.find((t) => t.label === "All")
  const lodges = tabs.find((t) => t.label === "Lodges")
  const guidedTours = tabs.find((t) => t.label === "Guided tours")
  assert.equal(all?.active, false)
  assert.equal(lodges?.active, true)
  assert.equal(guidedTours?.active, false)
})

// ── Filtered overload — the new behaviour ─────────────────────────────

test("With activeSlugs: only those slugs render; All is always there", () => {
  const tabs = buildCategoryTabs(null, ["lodges", "guided-tours"])
  assert.deepEqual(
    tabs.map((t) => t.label),
    ["All", "Lodges", "Guided tours"],
  )
})

test("With activeSlugs: preserves master-list order, not the activeSlugs argument order", () => {
  // Pass in reverse order to ensure the function respects master order.
  const tabs = buildCategoryTabs(null, [
    "booking-agents",
    "flights",
    "lodges",
  ])
  assert.deepEqual(
    tabs.map((t) => t.label),
    ["All", "Lodges", "Flights", "Booking agents"],
  )
})

test("With activeSlugs: empty list collapses to just the All tab", () => {
  const tabs = buildCategoryTabs(null, [])
  assert.equal(tabs.length, 1)
  assert.equal(tabs[0].label, "All")
})

test("With activeSlugs: the currently-active slug is dropped if it isn't in the active set", () => {
  // Standing on /categories/guided-tours (empty) — the strip rightly
  // doesn't include "Guided tours" because there's nothing there.
  // The page body's empty-state communicates "you're on an empty page".
  const tabs = buildCategoryTabs("guided-tours", ["lodges"])
  assert.deepEqual(
    tabs.map((t) => t.label),
    ["All", "Lodges"],
  )
  // "All" is NOT marked active because we're on a category page.
  assert.equal(tabs[0].active, false)
})

test("With activeSlugs: unknown slugs in the active set are silently ignored", () => {
  // Defensive — counts map from the DB shouldn't have slugs unknown to
  // the master, but if one ever appears we don't render a phantom tab.
  const tabs = buildCategoryTabs(null, ["lodges", "ghost-category"])
  assert.deepEqual(
    tabs.map((t) => t.label),
    ["All", "Lodges"],
  )
})
