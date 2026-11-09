/**
 * The route maps' projection, without d3-geo: the same Mercator that
 * scripts/gen-route-geo.mjs used for the base map, so waypoints land on
 * the pre-computed country paths.
 */

import { GEO_PROJECTION, GEO_SIZE } from "./southern-africa"

const RAD = Math.PI / 180

/** [lng, lat] in degrees → [x, y] in base-map viewBox units. */
export function project(lng: number, lat: number): [number, number] {
  const { k, tx, ty } = GEO_PROJECTION
  return [k * lng * RAD + tx, ty - k * Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2))]
}

export type ViewBox = { x: number; y: number; w: number; h: number }

export const FULL_VIEWBOX: ViewBox = { x: 0, y: 0, w: GEO_SIZE.width, h: GEO_SIZE.height }

/**
 * A crop of the base map around some points: padded, widened or
 * heightened to an aspect ratio (w/h) between min and max, and kept
 * inside the base map where it fits.
 */
export function cropAround(
  points: [number, number][],
  { pad = 0.18, minAspect = 1, maxAspect = 1.6 }: { pad?: number; minAspect?: number; maxAspect?: number } = {},
): ViewBox {
  const xs = points.map((p) => p[0])
  const ys = points.map((p) => p[1])
  let x0 = Math.min(...xs)
  let x1 = Math.max(...xs)
  let y0 = Math.min(...ys)
  let y1 = Math.max(...ys)
  const span = Math.max(x1 - x0, y1 - y0, 40)
  x0 -= span * pad
  x1 += span * pad
  y0 -= span * pad
  y1 += span * pad
  let w = x1 - x0
  let h = y1 - y0
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  if (w / h < minAspect) w = h * minAspect
  if (w / h > maxAspect) h = w / maxAspect
  w = Math.min(w, GEO_SIZE.width)
  h = Math.min(h, GEO_SIZE.height)
  const x = Math.max(0, Math.min(GEO_SIZE.width - w, cx - w / 2))
  const y = Math.max(0, Math.min(GEO_SIZE.height - h, cy - h / 2))
  const r = (n: number) => Math.round(n * 10) / 10
  return { x: r(x), y: r(y), w: r(w), h: r(h) }
}
