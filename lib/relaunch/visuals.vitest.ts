import { existsSync } from "node:fs"
import path from "node:path"
import { describe, expect, test } from "vitest"

import { SELF_DRIVE_NOTES } from "@/lib/field-notes/self-drive-notes"

import { media } from "./media"
import { captionFor, creditFor, getMedia, HERO_VIDEOS, mediaFor } from "./media-select"
import { getRouteView } from "./route-editorial"
import { getRouteStats, numbersLine, parseDriveHours, parseKm } from "./route-stats"
import { ROUTES } from "./routes"
import {
  ABOUT_VISUALS,
  COUNTRY_VISUALS,
  GUIDE_VISUALS,
  HOME_VISUALS,
  ROUTE_VISUALS,
  ROUTES_INDEX_VISUALS,
} from "./visuals"

const PUBLIC = path.resolve(__dirname, "../../public")

function allPlacedIds(): string[] {
  const ids: string[] = []
  for (const v of Object.values(ROUTE_VISUALS)) {
    ids.push(v.card, v.hero.still, ...Object.values(v.days), ...Object.values(v.stays), ...v.interludes, v.closing)
    if (v.hero.video) ids.push(v.hero.video)
  }
  for (const v of Object.values(COUNTRY_VISUALS)) ids.push(v.hero, ...v.benefits, ...v.gallery, v.closing)
  for (const v of Object.values(GUIDE_VISUALS)) ids.push(...v.hero, ...(v.inline ?? []).map((i) => i.id))
  ids.push(HOME_VISUALS.heroVideo, HOME_VISUALS.byHand, ...HOME_VISUALS.interludes, ...HOME_VISUALS.pillars, HOME_VISUALS.canI)
  ids.push(ROUTES_INDEX_VISUALS.hero, ...ROUTES_INDEX_VISUALS.how)
  ids.push(...ABOUT_VISUALS.principles, ABOUT_VISUALS.fromVictoriaFalls, ...ABOUT_VISUALS.values)
  return ids
}

describe("media placements", () => {
  test("every placed id exists in the manifest", () => {
    for (const id of allPlacedIds()) expect(() => getMedia(id), id).not.toThrow()
  })

  test("every manifest file and hero rendition exists on disk", () => {
    for (const m of media) {
      expect(existsSync(path.join(PUBLIC, m.src)), m.src).toBe(true)
      if (m.src1200) expect(existsSync(path.join(PUBLIC, m.src1200)), m.src1200).toBe(true)
    }
    for (const v of Object.values(HERO_VIDEOS)) {
      for (const f of [v.desktop, v.portrait, v.poster]) expect(existsSync(path.join(PUBLIC, f)), f).toBe(true)
    }
  })

  test("route day and stay keys match the itinerary", () => {
    for (const r of ROUTES) {
      const view = getRouteView(r.slug)
      const v = ROUTE_VISUALS[r.slug]
      if (!view || !v) continue
      const dayKeys = view.days.map((d) => d.key)
      for (const k of Object.keys(v.days)) expect(dayKeys, `${r.slug} day ${k}`).toContain(k)
      const staySlugs = view.nights.map((n) => n.primary.slug)
      for (const s of Object.keys(v.stays)) expect(staySlugs, `${r.slug} stay ${s}`).toContain(s)
      // A stay photo never repeats a day photo on the same page.
      const dayIds = new Set(Object.values(v.days))
      for (const id of Object.values(v.stays)) expect(dayIds.has(id), `${r.slug} stay ${id}`).toBe(false)
    }
  })

  test("stay area photos are of verified places", () => {
    for (const v of Object.values(ROUTE_VISUALS)) {
      for (const id of Object.values(v.stays)) expect(getMedia(id).verifiedPlace, id).toBe(true)
    }
  })

  test("guide inline images point at headings that exist", () => {
    for (const [slug, v] of Object.entries(GUIDE_VISUALS)) {
      const note = SELF_DRIVE_NOTES.find((n) => n.slug === slug)
      expect(note, slug).toBeDefined()
      for (const i of v.inline ?? []) {
        expect(note!.body.split("\n"), `${slug}: ${i.beforeHeading}`).toContain(`## ${i.beforeHeading}`)
      }
    }
  })

  test("no rooftop-tent or rentals image is placed", () => {
    for (const id of allPlacedIds()) {
      const m = getMedia(id)
      expect(m.src).not.toMatch(/rentals|rooftop/i)
      expect(m.alt).not.toMatch(/rooftop/i)
    }
  })
})

describe("captions and credits", () => {
  test("every item has a caption; unverified ones never use the manifest place", () => {
    for (const m of media) {
      const c = captionFor(m)
      expect(c.length, m.id).toBeGreaterThan(0)
      if (!m.verifiedPlace) expect(c.includes(m.place), m.id).toBe(false)
    }
  })

  test("attribution-required items return their credit; others none", () => {
    for (const m of media) {
      if (m.attributionRequired) expect(creditFor(m), m.id).toBe(`Photo: ${m.author}`)
      else expect(creditFor(m), m.id).toBeNull()
    }
  })

  test("mediaFor matches verified places and areas", () => {
    expect(mediaFor("Hwange").map((m) => m.id)).toContain("hwange-dusk-pan")
    expect(mediaFor("zimbabwe").every((m) => m.area === "zimbabwe")).toBe(true)
    // Unverified Kruger image is never returned for a place search.
    expect(mediaFor("Kruger")).toHaveLength(0)
  })
})

describe("route stats", () => {
  test("parses distances and drive times", () => {
    expect(parseKm("About 175–180 km")).toEqual([175, 180])
    expect(parseKm("About 20 km")).toEqual([20, 20])
    expect(parseKm("80–90 km to Kasane, then about 60 km west")).toBeNull()
    expect(parseKm("About 60 km each way to the 2×4 car park")).toBeNull()
    expect(parseKm(undefined)).toBeNull()
    expect(parseDriveHours("2.5–4.5 hours")).toEqual({ low: 2.5, high: 4.5 })
    expect(parseDriveHours("About 30 minutes")).toBeNull()
  })

  test("Zimbabwe: every leg has a distance, so a total is given", () => {
    const s = getRouteStats("zimbabwe-falls-hwange-matobo")!
    expect(s.km).toEqual([680, 705])
    expect(s.borders).toBe(0)
    expect(s.stays).toBe(5)
    expect(s.longestDrive).toEqual({ value: "6–8 h", estimate: true })
    expect(numbersLine(s)).toBe("~680–705 km · 10–12 nights · 5 stays · 0 borders")
  })

  test("Namibia and the four corners have gaps, so no km total", () => {
    expect(getRouteStats("namibia-kalahari-to-etosha")!.km).toBeUndefined()
    expect(getRouteStats("four-corners-falls-chobe-caprivi")!.km).toBeUndefined()
    expect(getRouteStats("four-corners-falls-chobe-caprivi")!.borders).toBeUndefined()
  })
})
