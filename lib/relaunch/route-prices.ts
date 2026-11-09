/**
 * Published "from" prices per route (STRATEGY §5: indicative, "from",
 * with a year). Worked night by night in handoff/relaunch/ROUTE_COSTING.md;
 * change a figure there first, then here.
 *
 * Method: for each night, the cheapest stay offered that shows a sourced
 * rate on the route page, per person sharing; labelled assumptions where
 * no option has one. Accommodation only: vehicle, fuel, park fees, levies
 * and flights are excluded. Totals rounded up to the nearest US$50.
 */

export type RoutePrice = {
  /** Per person sharing, accommodation only, rounded up to US$50. */
  fromUsd: number
  /** Rate year as shown on the route page's stay cards: "2026", "2026–27". */
  year: string
  basis: "accommodation only, per person sharing"
  /** Nights costed: the itinerary as shown on the route page. */
  nights: number
}

export const ROUTE_PRICES: Record<string, RoutePrice> = {
  // 11 nights. Includes one assumed night (Bulawayo, US$50).
  "zimbabwe-falls-hwange-matobo": {
    fromUsd: 3050,
    year: "2026",
    basis: "accommodation only, per person sharing",
    nights: 11,
  },
  // 15 nights. Includes one assumed night (near Windhoek, US$151).
  "namibia-kalahari-to-etosha": {
    fromUsd: 2800,
    year: "2026",
    basis: "accommodation only, per person sharing",
    nights: 15,
  },
  // 9 nights, with the Divundu nights. Chobe nights at standard rates, not
  // Chobe Safari Lodge's US$430 special offer (which gave US$2,550): a "from"
  // price shouldn't rest on an offer that can lapse (chief of staff, 9 Nov).
  "four-corners-falls-chobe-caprivi": {
    fromUsd: 2900,
    year: "2026–27",
    basis: "accommodation only, per person sharing",
    nights: 9,
  },
}

export function getRoutePrice(slug: string): RoutePrice | undefined {
  return ROUTE_PRICES[slug]
}

/** 3050 → "US$3,050". */
export function formatUsd(n: number): string {
  return `US$${n.toLocaleString("en-GB")}`
}
