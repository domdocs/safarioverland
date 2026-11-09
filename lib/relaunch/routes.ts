/**
 * Signature self-drive routes (R1–R3, see handoff/relaunch/STRATEGY.md §3).
 *
 * Placeholder data: enough for the homepage teaser. The full route
 * records (days, drive times, lodges) are filled in later; extend
 * `RouteSummary` (or a richer type built on it) rather than replacing it.
 */

export type RouteSummary = {
  slug: string
  title: string
  countries: string[]
  /** Display string, e.g. "10–12 nights". */
  nights: string
  /** One-line draft hook. Final copy comes from the copywriter. */
  hook: string
  /** Path under /public. Optional so a route can ship before its image. */
  heroImage?: string
}

export const ROUTES: RouteSummary[] = [
  {
    slug: "zimbabwe-falls-hwange-matobo",
    title: "Victoria Falls, Hwange and Matobo",
    countries: ["Zimbabwe"],
    nights: "10–12 nights",
    hook: "From the spray of the Falls to the elephants of Hwange and the granite hills of Matobo.",
    heroImage: "/images/about/zimbabwe.jpg",
  },
  {
    slug: "namibia-kalahari-to-etosha",
    title: "The Kalahari to Etosha",
    countries: ["Namibia"],
    nights: "14–16 nights",
    hook: "Red dunes, a cold coast and the waterholes of Etosha, joined by long days on gravel.",
    heroImage: "/images/about/namibia.jpg",
  },
  {
    slug: "four-corners-falls-chobe-caprivi",
    title: "The four corners: the Falls, Chobe and the Caprivi",
    countries: ["Zimbabwe", "Botswana", "Namibia"],
    nights: "8–10 nights",
    hook: "A short loop from Victoria Falls, along the Chobe River and into the Zambezi Region.",
    heroImage: "/images/about/botswana.jpg",
  },
]
