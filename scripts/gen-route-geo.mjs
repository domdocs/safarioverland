#!/usr/bin/env node
/**
 * Pre-computes the southern-Africa base map for the route maps.
 *
 *   node scripts/gen-route-geo.mjs
 *
 * Reads Natural Earth 1:50m admin-0 countries (public domain, via the
 * world-atlas package), projects them with a plain Mercator fitted to a
 * fixed southern-Africa frame, clips to that frame, simplifies, and writes
 * lib/relaunch/geo/southern-africa.ts: a few small SVG path strings plus
 * the projection constants. The client never loads the world atlas or
 * d3-geo; lib/relaunch/geo/project.ts repeats the Mercator formula.
 *
 * Re-run only if the frame or the source data changes. The output is
 * committed.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { geoContains, geoMercator, geoPath } from "d3-geo"
import { feature, mesh } from "topojson-client"

const require = createRequire(import.meta.url)
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const outDir = path.join(root, "lib/relaunch/geo")
const outFile = path.join(outDir, "southern-africa.ts")

// ─── Frame ─────────────────────────────────────────────────────────
// West of the Namibian coast to the Mozambique border; the Angolan and
// Zambian borders to the north of the Caprivi down to the Orange River.
const FRAME = { west: 11.0, east: 31.6, north: -14.6, south: -27.2 }
const WIDTH = 1000

const rad = (d) => (d * Math.PI) / 180
const mercY = (lat) => Math.log(Math.tan(Math.PI / 4 + rad(lat) / 2))

const k = WIDTH / (rad(FRAME.east) - rad(FRAME.west))
const tx = -k * rad(FRAME.west)
const ty = k * mercY(FRAME.north)
const HEIGHT = Math.round(ty - k * mercY(FRAME.south))

const projection = geoMercator()
  .scale(k)
  .translate([tx, ty])
  .clipExtent([
    [-2, -2],
    [WIDTH + 2, HEIGHT + 2],
  ])

// Countries we name and draw. Anything else inside the frame (eSwatini,
// Lesotho) is drawn as land but not labelled.
const NAMED = {
  "024": "Angola",
  "072": "Botswana",
  "508": "Mozambique",
  "516": "Namibia",
  "710": "South Africa",
  "716": "Zimbabwe",
  "894": "Zambia",
}

// ─── Path collection + simplification ─────────────────────────────

/** A d3 path context that records rings as arrays of [x, y]. */
function ringRecorder() {
  const rings = []
  let current = null
  return {
    rings,
    moveTo(x, y) {
      current = [[x, y]]
      rings.push({ pts: current, closed: false })
    },
    lineTo(x, y) {
      current.push([x, y])
    },
    closePath() {
      rings[rings.length - 1].closed = true
    },
    arc() {},
  }
}

/** Douglas–Peucker, iterative. */
function simplify(pts, tol) {
  if (pts.length <= 2) return pts
  const keep = new Uint8Array(pts.length)
  keep[0] = keep[pts.length - 1] = 1
  const stack = [[0, pts.length - 1]]
  const tol2 = tol * tol
  while (stack.length) {
    const [a, b] = stack.pop()
    const [ax, ay] = pts[a]
    const [bx, by] = pts[b]
    const dx = bx - ax
    const dy = by - ay
    const len2 = dx * dx + dy * dy
    let max = -1
    let idx = -1
    for (let i = a + 1; i < b; i++) {
      const [px, py] = pts[i]
      let d2
      if (len2 === 0) d2 = (px - ax) ** 2 + (py - ay) ** 2
      else {
        const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2))
        d2 = (px - ax - t * dx) ** 2 + (py - ay - t * dy) ** 2
      }
      if (d2 > max) {
        max = d2
        idx = i
      }
    }
    if (max > tol2) {
      keep[idx] = 1
      stack.push([a, idx], [idx, b])
    }
  }
  return pts.filter((_, i) => keep[i])
}

const TOL = 0.35 // viewBox units (the frame is 1000 wide)
const r = (n) => Math.round(n * 10) / 10

/** Relative-coordinate path string: shorter than absolute. */
function toPath(geo) {
  const rec = ringRecorder()
  geoPath(projection, rec)(geo)
  let d = ""
  for (const ring of rec.rings) {
    let pts = simplify(ring.pts, TOL).map(([x, y]) => [r(x), r(y)])
    pts = pts.filter((p, i) => i === 0 || p[0] !== pts[i - 1][0] || p[1] !== pts[i - 1][1])
    if (pts.length < (ring.closed ? 3 : 2)) continue
    let [px, py] = pts[0]
    d += `M${px} ${py}`
    for (let i = 1; i < pts.length; i++) {
      const [x, y] = pts[i]
      const ddx = r(x - px)
      const ddy = r(y - py)
      d += `l${ddx}${ddy < 0 ? "" : " "}${ddy}`
      px = x
      py = y
    }
    if (ring.closed) d += "z"
  }
  return d.replace(/(^|[^\d])0\./g, "$1.").replace(/-0\./g, "-.")
}

// ─── Build ─────────────────────────────────────────────────────────

const topo = JSON.parse(readFileSync(require.resolve("world-atlas/countries-50m.json"), "utf8"))
const countries = feature(topo, topo.objects.countries)

const inFrame = (f) => {
  const [[w, s], [e, n]] = geoBoundsLoose(f)
  return e >= FRAME.west - 1 && w <= FRAME.east + 1 && n >= FRAME.south - 1 && s <= FRAME.north + 1
}

// Rough bounds without importing geoBounds' antimeridian handling.
function geoBoundsLoose(f) {
  let w = 180, e = -180, s = 90, n = -90
  const walk = (c) => {
    if (typeof c[0] === "number") {
      w = Math.min(w, c[0]); e = Math.max(e, c[0]); s = Math.min(s, c[1]); n = Math.max(n, c[1])
    } else c.forEach(walk)
  }
  walk(f.geometry.coordinates)
  return [[w, s], [e, n]]
}

const land = []
const labelPath = geoPath(projection)
for (const f of countries.features) {
  if (!f.geometry || !inFrame(f)) continue
  const d = toPath(f)
  if (!d) continue
  const name = NAMED[f.id]
  const [cx, cy] = labelPath.centroid(f)
  land.push({
    id: f.id,
    name: name ?? f.properties.name,
    named: Boolean(name),
    d,
    centroid: [r(cx), r(cy)],
    labelSpots: name ? labelSpots(f) : [],
  })
}

/**
 * Candidate label positions [lng, lat] on a 0.5° grid, kept only where
 * the point and a ring of neighbours 0.4° away are all inside the
 * country, so a label set there sits well clear of the border. The map
 * picks one per crop at runtime.
 */
function labelSpots(f) {
  const spots = []
  const step = 0.5
  const off = 0.4
  const ring = [
    [off, 0], [-off, 0], [0, off], [0, -off],
    [off * 0.7, off * 0.7], [-off * 0.7, off * 0.7], [off * 0.7, -off * 0.7], [-off * 0.7, -off * 0.7],
    [off * 1.6, 0], [-off * 1.6, 0],
  ]
  for (let lat = Math.ceil(FRAME.south / step) * step; lat <= FRAME.north; lat += step) {
    for (let lng = Math.ceil(FRAME.west / step) * step; lng <= FRAME.east; lng += step) {
      if (!geoContains(f, [lng, lat])) continue
      if (ring.every(([dx, dy]) => geoContains(f, [lng + dx, lat + dy]))) spots.push([lng, lat])
    }
  }
  return spots
}

const ids = new Set(land.map((l) => l.id))
const geoms = topo.objects.countries
const borders = toPath(mesh(topo, geoms, (a, b) => a !== b && (ids.has(a.id) || ids.has(b.id))))
const coast = toPath(mesh(topo, geoms, (a, b) => a === b && ids.has(a.id)))

const header = `/**
 * GENERATED by scripts/gen-route-geo.mjs. Do not edit by hand.
 *
 * Southern-Africa base map for the route maps: Natural Earth 1:50m
 * admin-0 countries (public domain, via the world-atlas package),
 * Mercator, clipped to the frame below and simplified.
 * Coordinates are viewBox units (0 0 ${WIDTH} ${HEIGHT}).
 */
`

const body = `
export const GEO_FRAME = ${JSON.stringify(FRAME)} as const

export const GEO_SIZE = { width: ${WIDTH}, height: ${HEIGHT} } as const

/** Mercator constants: x = k·λ + tx, y = ty − k·ln(tan(π/4 + φ/2)), radians. */
export const GEO_PROJECTION = { k: ${k}, tx: ${tx}, ty: ${ty} } as const

export type GeoCountry = {
  id: string
  name: string
  /** Labelled on the map. */
  named: boolean
  d: string
  /** Centroid of the clipped shape, viewBox units. */
  centroid: [number, number]
  /** Interior label candidates, [lng, lat], clear of the border. */
  labelSpots: [number, number][]
}

export const GEO_COUNTRIES: GeoCountry[] = ${JSON.stringify(land, null, 0).replace(/},{/g, "},\n  {")}

/** Land borders between countries in view. */
export const GEO_BORDERS = ${JSON.stringify(borders)}

/** Coastline. */
export const GEO_COAST = ${JSON.stringify(coast)}
`

mkdirSync(outDir, { recursive: true })
writeFileSync(outFile, header + body)
const size = Buffer.byteLength(header + body)
console.log(`wrote ${path.relative(root, outFile)}: ${(size / 1024).toFixed(1)} KB, ${land.length} countries, ${WIDTH}×${HEIGHT}`)
for (const l of land) console.log(`  ${l.id} ${l.name.padEnd(14)} ${(l.d.length / 1024).toFixed(1)} KB centroid ${l.centroid}`)
console.log(`  borders ${(borders.length / 1024).toFixed(1)} KB, coast ${(coast.length / 1024).toFixed(1)} KB`)
