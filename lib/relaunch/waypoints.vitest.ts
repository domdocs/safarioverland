import { describe, expect, test } from "vitest"

import { ROUTES, getRouteDetail } from "./routes"
import { getRouteView } from "./route-editorial"
import { ROUTE_PLANS, WAYPOINTS, getRoutePlan, routeStops, type WaypointId } from "./waypoints"

// Southern Africa, generously: the Namibian coast to the Mozambique
// border, the Angolan border to the Orange River.
const BBOX = { west: 11, east: 32, north: -14, south: -28 }

describe("route waypoints", () => {
  test("every waypoint sits inside the southern-Africa box", () => {
    for (const [id, w] of Object.entries(WAYPOINTS)) {
      expect(w.lng, id).toBeGreaterThanOrEqual(BBOX.west)
      expect(w.lng, id).toBeLessThanOrEqual(BBOX.east)
      expect(w.lat, id).toBeGreaterThanOrEqual(BBOX.south)
      expect(w.lat, id).toBeLessThanOrEqual(BBOX.north)
    }
  })

  test("every route has a plan whose days match the research and the page, in order", () => {
    for (const r of ROUTES) {
      const plan = getRoutePlan(r.slug)
      expect(plan, r.slug).toBeDefined()
      const research = getRouteDetail(r.slug)!.days.map((d) => d.days)
      const page = getRouteView(r.slug)!.days.map((d) => d.key)
      expect(plan!.days.map((d) => d.key), r.slug).toEqual(research)
      expect(plan!.days.map((d) => d.key), r.slug).toEqual(page)
    }
    expect(ROUTE_PLANS).toHaveLength(ROUTES.length)
  })

  test("every day maps to known waypoints, and the legs join up", () => {
    const known = (id: WaypointId) => id in WAYPOINTS
    for (const plan of ROUTE_PLANS) {
      expect(known(plan.start), plan.slug).toBe(true)
      let at: WaypointId = plan.start
      for (const day of plan.days) {
        expect(known(day.end), `${plan.slug} ${day.key}`).toBe(true)
        for (const leg of day.legs) {
          for (const id of [leg.from, leg.to, ...(leg.via ?? [])]) expect(known(id), `${plan.slug} ${day.key} ${id}`).toBe(true)
          expect(leg.from, `${plan.slug} day ${day.key} starts where the last leg ended`).toBe(at)
          at = leg.to
        }
        expect(at, `${plan.slug} day ${day.key} ends at its stop`).toBe(day.end)
      }
    }
  })

  test("R3: Victoria Falls to Kasane is a road transfer both ways; the panhandle is optional", () => {
    const plan = getRoutePlan("four-corners-falls-chobe-caprivi")!
    const legs = plan.days.flatMap((d) => d.legs)
    const vfKasane = legs.filter((l) => [l.from, l.to].includes("victoria-falls") && [l.from, l.to].includes("kasane"))
    expect(vfKasane).toHaveLength(2)
    expect(vfKasane.every((l) => l.mode === "transfer")).toBe(true)
    const panhandle = legs.filter((l) => l.from === "divundu" || l.to === "divundu")
    expect(panhandle.length).toBeGreaterThan(0)
    expect(panhandle.every((l) => l.optional)).toBe(true)
    // Without the optional legs the route still joins up (Kongola → Ngoma).
    expect(legs.some((l) => l.from === "kongola" && l.to === "ngoma" && !l.optional)).toBe(true)
  })

  test("labelled stops exclude via points", () => {
    for (const plan of ROUTE_PLANS) {
      for (const s of routeStops(plan)) expect(WAYPOINTS[s.id].kind).not.toBe("via")
    }
  })
})
