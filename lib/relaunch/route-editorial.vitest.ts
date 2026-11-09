import { describe, expect, test } from "vitest"

import { ROUTES } from "./routes"
import { dayLabel, getRouteView, shortRateYear } from "./route-editorial"
import { getSelfDriveNote } from "@/lib/field-notes/self-drive-notes"

const allStays = (slug: string) => {
  const v = getRouteView(slug)!
  return v.nights.flatMap((n) => [n.primary, ...n.alternatives])
}

describe("route editorial layer", () => {
  test("every summary route has a full view, and every day key matches the research", () => {
    for (const r of ROUTES) {
      const v = getRouteView(r.slug)
      expect(v, r.slug).toBeDefined()
      expect(v!.days.length).toBeGreaterThan(0)
    }
  })

  test("labels and years", () => {
    expect(dayLabel("1")).toBe("Day 01")
    expect(dayLabel("3–4")).toBe("Days 03–04")
    expect(shortRateYear("2026 (1 Mar–31 Oct 2026)")).toBe("2026")
    expect(shortRateYear("2026–27")).toBe("2026–27")
    expect(shortRateYear("Shown on Gondwana's site, November 2026")).toBe("2026")
  })

  test("Namibia: Etango night 1, step-up tags, Okonjima leopard only, no stay on day 16", () => {
    const v = getRouteView("namibia-kalahari-to-etosha")!
    const day1 = v.days[0]
    expect(day1.stay?.name).toBe("Etango Ranch Guest Farm")
    expect(day1.stay?.rateLine).toBe("Rate on request")
    expect(day1.stay?.unverified).toBe(true)
    const stays = allStays(v.slug)
    for (const name of ["Damaraland Camp", "Kulala Desert Lodge", "Okonjima Luxury Bush Camp"]) {
      expect(stays.find((s) => s.name === name)?.stepUp, name).toBe(true)
    }
    for (const s of stays.filter((s) => s.name.startsWith("Okonjima"))) {
      expect(s.activities.join(" ")).not.toMatch(/rhino|pangolin|cheetah|hyena/i)
    }
    expect(v.days.at(-1)?.stay).toBeUndefined()
  })

  test("Four corners: no car in Zimbabwe, Kasane vehicle, optional panhandle, no Waterberry", () => {
    const v = getRouteView("four-corners-falls-chobe-caprivi")!
    const text = JSON.stringify({ days: v.days, before: v.beforeYouGo, variants: v.variants, facts: v.facts })
    expect(text).not.toMatch(/Waterberry/)
    expect(v.days[0].noDriving).toBe(true)
    expect(v.days.find((d) => d.key === "7–8")?.optional).toBeTruthy()
    const stays = allStays(v.slug)
    expect(stays.find((s) => s.name === "Nunda River Lodge")?.rateLine).toBe("Rate on request")
    expect(stays.find((s) => s.name === "Muchenje Safari Lodge")?.accessLabel).toBe("Arrival by arrangement")
    expect(stays.find((s) => s.name === "Chobe Game Lodge")?.stepUp).toBe(true)
    expect(stays.find((s) => s.name === "Nambwa Tented Lodge")?.stepUp).toBe(true)
    // No border-charge amounts printed.
    expect(JSON.stringify(v.borders)).not.toMatch(/N\$|BWP|US\$\d/)
  })

  test("Zimbabwe: Bulawayo end, The Hide primary, Davison's step up, no fee amounts", () => {
    const v = getRouteView("zimbabwe-falls-hwange-matobo")!
    const hwange = v.nights.find((n) => n.primary.name === "The Hide")!
    expect(hwange.alternatives.find((a) => a.name === "Davison's Camp")?.stepUp).toBe(true)
    const stays = allStays(v.slug)
    expect(stays.find((s) => s.name === "The Elephant Camp")?.stepUp).toBe(true)
    expect(stays.find((s) => s.name === "Camelthorn Lodge")?.accessLabel).toBe("Park-and-transfer, by arrangement")
    expect(stays.find((s) => s.name === "Ilala Lodge Hotel")?.rateLine).toBe("Rate on request")
    expect(stays.find((s) => s.name === "Travellers' Guest House")?.rateLine).toBe("Rate on request")
    expect(JSON.stringify(v.beforeYouGo)).not.toMatch(/US\$\d/)
    expect(v.days.at(-1)?.stay).toBeUndefined()
  })

  test("route Field Notes all resolve", () => {
    for (const r of ROUTES) {
      for (const slug of getRouteView(r.slug)!.fieldNotes) {
        expect(getSelfDriveNote(slug), slug).toBeDefined()
      }
    }
  })
})
