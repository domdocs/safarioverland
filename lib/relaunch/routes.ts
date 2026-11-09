/**
 * Signature self-drive routes (R1–R3, see handoff/relaunch/STRATEGY.md §3).
 *
 * Two layers:
 *
 *  - `ROUTES`: the summary each card shows (homepage teaser, /routes,
 *    landing pages). Titles, nights lines and hooks are the copy deck's
 *    (handoff/relaunch/copy/SITE_COPY.md §1.4).
 *  - `RouteDetail`: the research record, exactly as the research team
 *    wrote it (handoff/relaunch/research/<route>/route.json), copied
 *    verbatim into lib/relaunch/data/<slug>.json. Nothing is stripped.
 *    The pages never print research fields directly; they go through
 *    the editorial layer in lib/relaunch/route-editorial.ts, which picks
 *    the display strings and applies the chief of staff's decisions.
 *
 * A route with a summary but no detail record renders a "route being
 * drawn" state on /routes/[slug] rather than a 404. To add a route's
 * detail, drop its JSON into lib/relaunch/data/ and register it in
 * ROUTE_DETAILS below.
 *
 * Static imports only: no filesystem access at request time (see
 * handoff/CHANGELOG.md, 2026-08-07, on process.cwd()).
 */

import zimbabwe from "./data/zimbabwe-falls-hwange-matobo.json"
import namibia from "./data/namibia-kalahari-to-etosha.json"
import fourCorners from "./data/four-corners-falls-chobe-caprivi.json"

export type RouteSummary = {
  slug: string
  title: string
  countries: string[]
  /** Display string, e.g. "About 10–12 nights". */
  nights: string
  /** One-line hook from the copy deck. */
  hook: string
  /** Path under /public. Optional so a route can ship before its image. */
  heroImage?: string
}

export const ROUTES: RouteSummary[] = [
  {
    slug: "zimbabwe-falls-hwange-matobo",
    title: "Zimbabwe: Falls, Hwange, Matobo",
    countries: ["Zimbabwe"],
    nights: "About 10–12 nights",
    hook: "Spray from the Falls, elephants at Hwange's waterholes, then granite hills and old rock art in the Matobo.",
    heroImage: "/media/zimbabwe/victoria-falls-aerial-zambezi.webp",
  },
  {
    slug: "namibia-kalahari-to-etosha",
    title: "Namibia: Kalahari to Etosha",
    countries: ["Namibia"],
    nights: "About 14–16 nights",
    hook: "Red Kalahari sand, the dunes at Sossusvlei, a cold Atlantic coast, and the white pan at Etosha, with long gravel roads in between.",
    heroImage: "/media/namibia/deadvlei-camelthorn-trees.webp",
  },
  {
    slug: "four-corners-falls-chobe-caprivi",
    title: "The four corners: Falls, Chobe, Caprivi",
    countries: ["Zimbabwe", "Botswana", "Namibia"],
    nights: "About 8–10 nights",
    hook: "A short loop from the Falls along the Chobe and into the Zambezi Region, where four countries meet on the rivers.",
    heroImage: "/media/four-corners/chobe-elephants-evening-crossing.webp",
  },
]

// ─── Research record (route.json shape) ──────────────────────────

export type StayType = "lodge" | "camp" | "on-the-road" | (string & {})
export type SelfDriveAccess = "drive-in" | "park-and-transfer" | "4x4-only" | (string & {})

export type RouteStay = {
  slug: string
  name: string
  area: string
  country: string
  lat: number | null
  lng: number | null
  type: StayType
  self_drive_access: SelfDriveAccess
  access_notes: string
  /** Per person sharing, "from". null = rate on request. */
  nightly_from_usd: number | null
  rate_year: string
  rate_basis: string
  sets_it_apart: string
  guided_activities: string[]
  ownership: string
  why_we_list_it: string
  cautions: string
  sources: string[]
}

export type RouteDay = {
  /** "1", "3–4" etc. */
  days: string
  from: string
  to: string
  distance_km: string
  drive_hours: string
  road_surface: string
  /** "" or null when the day has no stay (departure). */
  stay_slug: string | null
  alt_stay_slugs: string[]
  notes: string
}

export type RouteBorder = {
  name: string
  between: string
  hours: string
  notes: string
  sources: string[]
}

export type RoutePracticalities = {
  /** Plain sentences (R1, R2) or structured border posts (R3). */
  borders: Array<string | RouteBorder>
  fuel?: string
  cash_and_payments?: string
  park_fees?: string
  gate_times?: string
  rental_and_cross_border?: string
  /** Any further keys the research adds (gravel_driving, kaza_univisa…). */
  [key: string]: unknown
}

export type RouteDetail = {
  slug: string
  title: string
  countries: string[]
  /** e.g. "14–16" */
  nights: string
  best_months: string
  summary: string
  vehicle: string
  start: string
  end: string
  days: RouteDay[]
  stays: RouteStay[]
  practicalities: RoutePracticalities
  variants: string[]
  sources: string[]
}

/** Detail records available at build time, keyed by slug. */
const ROUTE_DETAILS: Record<string, RouteDetail> = {
  [zimbabwe.slug]: zimbabwe as RouteDetail,
  [namibia.slug]: namibia as RouteDetail,
  [fourCorners.slug]: fourCorners as RouteDetail,
}

export function getRouteSummary(slug: string): RouteSummary | undefined {
  return ROUTES.find((r) => r.slug === slug)
}

export function getRouteDetail(slug: string): RouteDetail | undefined {
  return ROUTE_DETAILS[slug]
}

/** Every source URL in a route record, de-duplicated, in first-seen order. */
/**
 * STRATEGY §5: the site doesn't name rental companies, so their pages are
 * left out of the public Sources list. Matched against the host's labels
 * (hertz.co.za, www.sixt.com). The research data files are unchanged.
 */
const RENTAL_HOSTS = [
  "europcar",
  "sixt",
  "drivesouthafrica",
  "avis",
  "hertz",
  "budget",
  "thrifty",
  "bushlore",
  "britz",
  "maui",
  "asco",
  "bidvestcarrental",
  "firstcarrental",
  "tempestcarhire",
  "woodford",
]

function isRentalHost(url: string): boolean {
  try {
    const labels = new URL(url).hostname.toLowerCase().split(".")
    return labels.some((l) => RENTAL_HOSTS.includes(l))
  } catch {
    return false
  }
}

export function collectRouteSources(detail: RouteDetail): string[] {
  const seen = new Set<string>()
  const add = (u: unknown) => {
    if (typeof u !== "string") return
    const url = u.trim()
    if (/^https?:\/\//.test(url) && !isRentalHost(url)) seen.add(url)
  }
  detail.sources.forEach(add)
  detail.stays.forEach((s) => s.sources?.forEach(add))
  detail.practicalities.borders.forEach((b) => {
    if (typeof b !== "string") b.sources?.forEach(add)
  })
  return [...seen]
}
