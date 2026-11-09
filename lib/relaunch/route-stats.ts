/**
 * Route figures for the numbers strip and the cards' numbers line.
 * Every value is computed from the route record and its editorial
 * layer; nothing is typed in by hand. A figure we can't compute
 * honestly is left out rather than estimated:
 *
 *  - Kilometres only when every driving day has a single distance
 *    (one number or one range). One gap and the total is omitted.
 *  - Borders only when the record says the core route has none (0);
 *    structured border lists include alternatives, so they aren't
 *    counted as crossings.
 */

import { getRouteDetail, getRouteSummary } from "./routes"
import { getRouteView, type DayView } from "./route-editorial"

export type RouteStats = {
  /** "10–12", from the research record. */
  nights: string
  /** Distinct places you sleep on the core route. */
  stays: number
  countries: number
  /** [min, max] total, or undefined when any driving day lacks a distance. */
  km?: [number, number]
  /** 0 when the record says the core route crosses no border; undefined otherwise. */
  borders?: 0
  /** The longest driving day, e.g. { value: "6–8 h", estimate: true }. */
  longestDrive?: { value: string; estimate: boolean }
  bestMonths?: string
}

const NUM = /\d+(?:[.,]\d+)?(?:\s*[–-]\s*\d+(?:[.,]\d+)?)?/g

/** "About 175–180 km" → [175, 180]; "About 20 km" → [20, 20]; anything else → null. */
export function parseKm(distance: string | undefined): [number, number] | null {
  if (!distance) return null
  const matches = distance.match(NUM)
  if (!matches || matches.length !== 1) return null
  if (!/km/.test(distance)) return null
  const [a, b] = matches[0].split(/\s*[–-]\s*/).map((s) => Number(s.replace(",", "")))
  if (!Number.isFinite(a)) return null
  return [a, Number.isFinite(b) ? b : a]
}

/** Upper bound in hours of a drive string: "2.5–4.5 hours" → 4.5. Minutes or prose → null. */
export function parseDriveHours(drive: string | undefined): { low: number; high: number } | null {
  if (!drive) return null
  const m = drive.match(/(\d+(?:\.\d+)?)(?:\s*[–-]\s*(\d+(?:\.\d+)?))?\s*hours?/)
  if (!m) return null
  const low = Number(m[1])
  const high = m[2] ? Number(m[2]) : low
  return { low, high }
}

export function totalKm(days: DayView[]): [number, number] | undefined {
  let min = 0
  let max = 0
  for (const d of days) {
    if (d.noDriving) continue
    const km = parseKm(d.distance)
    if (!km) return undefined
    min += km[0]
    max += km[1]
  }
  return [min, max]
}

function longest(days: DayView[]): RouteStats["longestDrive"] {
  let best: { low: number; high: number; estimate: boolean } | null = null
  for (const d of days) {
    if (d.noDriving) continue
    const h = parseDriveHours(d.drive)
    if (h && (!best || h.high > best.high)) best = { ...h, estimate: d.estimate }
  }
  if (!best) return undefined
  const value = best.low === best.high ? `${best.high} h` : `${best.low}–${best.high} h`
  return { value, estimate: best.estimate }
}

export function getRouteStats(slug: string): RouteStats | undefined {
  const detail = getRouteDetail(slug)
  const view = getRouteView(slug)
  const summary = getRouteSummary(slug)
  if (!detail || !view || !summary) return undefined

  const stays = new Set(view.nights.map((n) => n.primary.slug)).size
  const borderList = detail.practicalities.borders ?? []
  const noBorders =
    borderList.length > 0 &&
    borderList.every((b) => typeof b === "string") &&
    /^(no|none)\b/i.test(String(borderList[0]).trim())

  return {
    nights: detail.nights,
    stays,
    countries: summary.countries.length,
    km: totalKm(view.days),
    borders: noBorders ? 0 : undefined,
    longestDrive: longest(view.days),
    bestMonths: view.facts.find((f) => f.label === "Best months")?.value,
  }
}

/** "680–705" with thin grouping, for display. */
export function formatKm([a, b]: [number, number]): string {
  const f = (n: number) => n.toLocaleString("en-GB")
  return a === b ? f(a) : `${f(a)}–${f(b)}`
}

/** The cards' mono line: "~680–705 km · 10–12 nights · 5 stays · 0 borders". */
export function numbersLine(stats: RouteStats): string {
  const parts: string[] = []
  if (stats.km) parts.push(`~${formatKm(stats.km)} km`)
  parts.push(`${stats.nights} nights`)
  parts.push(`${stats.stays} stays`)
  if (stats.borders === 0) parts.push("0 borders")
  else parts.push(`${stats.countries} ${stats.countries === 1 ? "country" : "countries"}`)
  return parts.join(" · ")
}
