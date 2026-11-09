/**
 * Route geometry for the maps: projected legs (as smooth SVG paths),
 * labelled stops, crops and country-label placement. Pure functions,
 * no React; results are cached per route.
 */

import { GEO_COUNTRIES, GEO_PROJECTION } from "@/lib/relaunch/geo/southern-africa"
import { cropAround, project, type ViewBox } from "@/lib/relaunch/geo/project"
import {
  WAYPOINTS,
  routeStops,
  type LabelAnchor,
  type LegMode,
  type RoutePlan,
  type WaypointId,
  type WaypointKind,
} from "@/lib/relaunch/waypoints"

type Pt = [number, number]

export type LegGeometry = {
  d: string
  /** Approximate length in base-map units, for animation timing. */
  length: number
  /** Index into plan.days. */
  day: number
  mode: LegMode
  optional: boolean
  gravel: boolean
  /** Projected points the leg passes through (ends and via). */
  pts: Pt[]
}

export type StopGeometry = {
  id: WaypointId
  name: string
  kind: WaypointKind
  anchor: LabelAnchor
  x: number
  y: number
  firstDay: number
  isStart: boolean
  isEnd: boolean
}

export type RouteGeometry = {
  slug: string
  legs: LegGeometry[]
  stops: StopGeometry[]
  /** Every projected point, via points included. */
  points: Pt[]
  totalLength: number
  /** For each day, the stop it ends at. */
  dayEnds: WaypointId[]
  /** A crop of the base map that fits this route. */
  viewBox: ViewBox
  /** A wide, short crop for the phone strip map. */
  stripViewBox: ViewBox
  extraLabels: { text: string; x: number; y: number }[]
}

const wp = (id: WaypointId): Pt => project(WAYPOINTS[id].lng, WAYPOINTS[id].lat)
const r1 = (n: number) => Math.round(n * 10) / 10

/**
 * A smooth path through the points: Catmull–Rom as cubic Béziers. Two
 * points become a gentle arc (bent to the left of travel), so a straight
 * hop reads as a road rather than a ruler line, and an out-and-back pair
 * of legs separates into a lens.
 */
export function smoothPath(pts: Pt[]): string {
  if (pts.length < 2) return ""
  const [a, b] = [pts[0], pts[pts.length - 1]]
  if (pts.length === 2) {
    const dx = b[0] - a[0]
    const dy = b[1] - a[1]
    const bend = 0.12
    const c: Pt = [(a[0] + b[0]) / 2 + dy * bend, (a[1] + b[1]) / 2 - dx * bend]
    return `M${r1(a[0])} ${r1(a[1])}Q${r1(c[0])} ${r1(c[1])} ${r1(b[0])} ${r1(b[1])}`
  }
  let d = `M${r1(a[0])} ${r1(a[1])}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`
  }
  return d
}

function polylineLength(pts: Pt[]): number {
  let len = 0
  for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
  return len * (pts.length === 2 ? 1.04 : 1.02)
}

const cache = new Map<string, RouteGeometry>()

export function routeGeometry(plan: RoutePlan): RouteGeometry {
  const hit = cache.get(plan.slug)
  if (hit) return hit

  const legs: LegGeometry[] = []
  const points: Pt[] = [wp(plan.start)]
  plan.days.forEach((day, i) => {
    for (const leg of day.legs) {
      const pts = [leg.from, ...(leg.via ?? []), leg.to].map(wp)
      points.push(...pts)
      legs.push({
        d: smoothPath(pts),
        length: polylineLength(pts),
        day: i,
        mode: leg.mode,
        optional: Boolean(leg.optional),
        gravel: Boolean(leg.gravel),
        pts,
      })
    }
  })

  const last = plan.days[plan.days.length - 1].end
  const stops: StopGeometry[] = routeStops(plan).map(({ id, firstDay }) => {
    const w = WAYPOINTS[id]
    const [x, y] = wp(id)
    return {
      id,
      name: w.name,
      kind: w.kind,
      anchor: ("anchor" in w ? w.anchor : undefined) ?? "e",
      x,
      y,
      firstDay,
      isStart: id === plan.start,
      isEnd: id === last,
    }
  })

  const geom: RouteGeometry = {
    slug: plan.slug,
    legs,
    stops,
    points,
    totalLength: legs.reduce((s, l) => s + l.length, 0),
    dayEnds: plan.days.map((d) => d.end),
    viewBox: cropAround(points, { pad: 0.2, minAspect: 0.95, maxAspect: 1.35 }),
    stripViewBox: cropAround(points, { pad: 0.08, minAspect: 2.6, maxAspect: 2.6 }),
    extraLabels: (plan.extraLabels ?? []).map((l) => {
      const [x, y] = project(l.lng, l.lat)
      return { text: l.text, x, y }
    }),
  }
  cache.set(plan.slug, geom)
  return geom
}

/**
 * One label per named country that has room inside the crop: of the
 * country's pre-computed interior spots, the one furthest from the
 * route (up to a point), then nearest the country's middle.
 */
export function countryLabels(vb: ViewBox, routePoints: Pt[]): { name: string; x: number; y: number }[] {
  const out: { name: string; x: number; y: number }[] = []
  let avoid = routePoints
  const mx = vb.w * 0.1
  const my = vb.h * 0.08
  for (const c of GEO_COUNTRIES) {
    if (!c.named) continue
    let best: { x: number; y: number; score: number } | null = null
    for (const [lng, lat] of c.labelSpots) {
      const [x, y] = project(lng, lat)
      if (x < vb.x + mx || x > vb.x + vb.w - mx || y < vb.y + my || y > vb.y + vb.h - my) continue
      const clear = avoid.length ? Math.min(...avoid.map((p) => Math.hypot(p[0] - x, (p[1] - y) * 2.2))) : vb.w
      // Clear of the route first, then as near the country's middle as possible.
      const score = Math.min(clear, vb.w * 0.07) - Math.hypot(x - c.centroid[0], y - c.centroid[1]) * 0.05
      if (!best || score > best.score) best = { x, y, score }
    }
    if (best && best.score > vb.w * 0.035) {
      out.push({ name: c.name, x: best.x, y: best.y })
      // Keep the next country's label away from this one (labels are wide).
      for (let dx = -0.12; dx <= 0.12; dx += 0.06) avoid = [...avoid, [best.x + dx * vb.w, best.y]]
    }
  }
  return out
}

/**
 * The frame for one day: that day's legs and its end, at the route
 * frame's aspect ratio, never tighter than 70% of the route frame (so
 * the camera eases rather than dives).
 */
export function dayViewBox(geom: RouteGeometry, day: number): ViewBox {
  const full = geom.viewBox
  const end = geom.stops.find((s) => s.id === geom.dayEnds[day])
  const pts: Pt[] = geom.legs.filter((l) => l.day === day).flatMap((l) => l.pts)
  if (end) pts.push([end.x, end.y])
  if (pts.length === 0) return full
  const aspect = full.w / full.h
  const minW = full.w * 0.7
  const xs = pts.map((p) => p[0])
  const ys = pts.map((p) => p[1])
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2
  let w = Math.max(minW, (Math.max(...xs) - Math.min(...xs)) * 1.5, (Math.max(...ys) - Math.min(...ys)) * 1.5 * aspect)
  w = Math.min(w, full.w)
  const h = w / aspect
  // Keep inside the route frame.
  const x = Math.max(full.x, Math.min(full.x + full.w - w, cx - w / 2))
  const y = Math.max(full.y, Math.min(full.y + full.h - h, cy - h / 2))
  return { x, y, w, h }
}

/** km per viewBox unit at a y position (Mercator). */
export function kmPerUnit(y: number): number {
  const { k, ty } = GEO_PROJECTION
  const lat = 2 * Math.atan(Math.exp((ty - y) / k)) - Math.PI / 2
  return (6371 * Math.cos(lat)) / k
}
