import { test } from "node:test"
import assert from "node:assert/strict"

import { preflightItinerary } from "./preflight"
import type { Chapter, Itinerary, Transit } from "./types"

function buildItinerary(overrides: Partial<Itinerary> = {}): Itinerary {
  return {
    id: "11111111-1111-1111-1111-111111111111",
    slug: null,
    reference: "SO-2026-0001",
    status: "draft",
    title: "Test trip",
    cover_title_lines: ["The Smoke,", "the Delta"],
    subtitle: "An eleven-day arc.",
    guests: ["Mr & Mrs Test"],
    dates_from: "14 September",
    dates_to: "24 September",
    dates_year: "2026",
    pace: "Unhurried.",
    curator_name: "Niels van de Meer",
    curator_title: "Curator, Safari Overland",
    curator_location: "Victoria Falls, Zimbabwe",
    prologue: ["Africa is not a place you visit."],
    cover_photo_url: "https://example.test/cover.webp",
    palette: "savanna",
    typography: "editorial",
    density: "spacious",
    show_curator_notes: true,
    source_brief_id: null,
    practicals: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
    ...overrides,
  }
}

function buildChapter(overrides: Partial<Chapter> = {}): Chapter {
  return {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    itinerary_id: "11111111-1111-1111-1111-111111111111",
    position: 0,
    slug: "victoria-falls",
    place: "Victoria Falls",
    country: "Zimbabwe",
    coords_lat: -17.924,
    coords_lon: 25.857,
    nights: 2,
    dates: "14 — 16 September",
    palette: null,
    epigraph: "Mosi-oa-Tunya — the smoke that thunders.",
    intro: ["You arrive on the Zimbabwean side."],
    seeing: [],
    note: null,
    lodge: { name: "", kind: "", room: "", blurb: "", amenities: [] },
    rhythm: [],
    photo_hero_url: "https://example.test/hero.webp",
    photo_lodge_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  }
}

function buildTransit(overrides: Partial<Transit> = {}): Transit {
  return {
    id: "tttttttt-tttt-tttt-tttt-tttttttttttt",
    itinerary_id: "11111111-1111-1111-1111-111111111111",
    from_chapter_id: "a",
    to_chapter_id: "b",
    position: 0,
    mode: "Private road transfer",
    duration: "1 hr 30 min",
    distance: "78 km",
    crosses: "Kazungula border (Zimbabwe → Botswana)",
    note: "Border formalities take 30-45 minutes.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  }
}

test("publish-ready itinerary returns zero issues", () => {
  const r = preflightItinerary({
    itinerary: buildItinerary(),
    chapters: [buildChapter()],
    transits: [],
  })
  assert.deepEqual(r, [])
})

test("missing cover photo fails preflight", () => {
  const r = preflightItinerary({
    itinerary: buildItinerary({ cover_photo_url: null }),
    chapters: [buildChapter()],
    transits: [],
  })
  assert.ok(r.some((issue) => issue.path === "itinerary.cover_photo_url"))
})

test("zero chapters fails preflight", () => {
  const r = preflightItinerary({
    itinerary: buildItinerary(),
    chapters: [],
    transits: [],
  })
  assert.ok(r.some((issue) => issue.path === "chapters"))
})

test("chapter without coords fails preflight", () => {
  const r = preflightItinerary({
    itinerary: buildItinerary(),
    chapters: [buildChapter({ coords_lat: null, coords_lon: null })],
    transits: [],
  })
  assert.ok(r.some((issue) => issue.path === "chapter[0].coords"))
})

test("placeholder transit (Transfer / TBD / 'To be specified.') fails preflight", () => {
  const r = preflightItinerary({
    itinerary: buildItinerary(),
    chapters: [
      buildChapter({ id: "a" }),
      buildChapter({ id: "b", position: 1, slug: "chobe", place: "Chobe" }),
    ],
    transits: [
      buildTransit({
        from_chapter_id: "a",
        to_chapter_id: "b",
        mode: "Transfer",
        duration: "TBD",
        distance: "TBD",
        crosses: "TBD",
        note: "To be specified.",
      }),
    ],
  })
  assert.ok(r.some((issue) => issue.path === "transit[0].mode"))
  assert.ok(r.some((issue) => issue.path === "transit[0].duration"))
  assert.ok(r.some((issue) => issue.path === "transit[0].crosses"))
  assert.ok(r.some((issue) => issue.path === "transit[0].note"))
})

test("transit count out of sync with chapters fails preflight", () => {
  const r = preflightItinerary({
    itinerary: buildItinerary(),
    chapters: [buildChapter({ id: "a" }), buildChapter({ id: "b", position: 1 })],
    // Missing the transit between chapters
    transits: [],
  })
  assert.ok(r.some((issue) => issue.path === "transits"))
})
