/**
 * Build a breadcrumb trail from a Next.js pathname.
 *
 * Used by <AutoBreadcrumbs /> in `app/resources/layout.tsx` and
 * `app/destinations/layout.tsx` so every child page gets a trail
 * without per-page wiring. Pages that want a bespoke trail can
 * still call `<Breadcrumbs crumbs={...} />` directly.
 *
 * Display-name lookups for known slugs live in NAMED_SEGMENTS. Any
 * slug not in the map gets a Title Case humanise pass — fine for
 * resource leaves whose slugs are already descriptive
 * ("what-to-pack" → "What to pack").
 */

import type { Crumb } from "@/components/Breadcrumbs"

const SITE = "https://safarioverland.com"

/**
 * Bespoke segment names where the slug doesn't humanise well.
 * Keep this short — only override when Title Case would read wrong
 * ("Faqs" → "FAQs", "Q-and-a" → "Q & A").
 */
const NAMED_SEGMENTS: Record<string, string> = {
  resources: "Field Notes",
  destinations: "Atlas",
  "planning-guides": "Planning guides",
  "seasonal-guides": "Seasonal guides",
  conservation: "Conservation",
  "safety-tips": "Safety",
  faqs: "FAQs",
  "east-africa": "East Africa",
  "southern-africa": "Southern Africa",
  "west-africa": "West Africa",
  "north-africa": "North Africa",
  "what-to-pack": "What to pack",
  "best-times": "Best times to go",
  "east-vs-southern": "East vs Southern",
  "off-the-beaten-path": "Off the beaten path",
  "luxury-vs-budget": "Luxury vs budget",
  "hidden-costs": "Hidden costs",
  "before-you-go": "Before you go",
  "family-safaris": "Family safaris",
  "solo-travel": "Solo travel",
  "accessible-safaris": "Accessible safaris",
  "photography-gear": "Photography gear",
  "seasonal-packing": "Seasonal packing",
  "packing-list": "Packing list",
  "wildlife-events": "Wildlife events",
  "choosing-destinations": "Choosing destinations",
  "green-season": "Green season",
  "great-migration": "Great migration",
  "gorilla-trekking": "Gorilla trekking",
  "bird-watching": "Bird watching",
  "north-africa-birds": "North Africa birds",
  "wildlife-behavior": "Wildlife behaviour",
  "anti-poaching": "Anti-poaching",
  "beyond-safari": "Beyond safari",
  "community-conservation": "Community conservation",
  "cultural-preservation": "Cultural preservation",
  economics: "Economics",
  "education-awareness": "Education & awareness",
  "endangered-species": "Endangered species",
  "ethical-operators": "Ethical operators",
  funding: "Funding",
  "habitat-preservation": "Habitat preservation",
  "responsible-practices": "Responsible practices",
  "success-stories": "Success stories",
  "kenya-corridors": "Kenya corridors",
  "mountain-gorillas": "Mountain gorillas",
  "namibia-conservancies": "Namibia conservancies",
  "zimbabwe-rhinos": "Zimbabwe rhinos",
  "sustainable-tourism": "Sustainable tourism",
  "budget-travel": "Budget travel",
  "uganda-rwanda": "Uganda & Rwanda",
  "zimbabwe-zambia": "Zimbabwe & Zambia",
  "family-safari": "Family safari",
  "south-africa": "South Africa",
}

function humanise(slug: string): string {
  if (NAMED_SEGMENTS[slug]) return NAMED_SEGMENTS[slug]
  return slug
    .split("-")
    .map((part, i) =>
      i === 0 ? part.charAt(0).toUpperCase() + part.slice(1) : part,
    )
    .join(" ")
}

export function buildCrumbsFromPath(pathname: string): Crumb[] {
  // Normalise — strip trailing slash, ignore query/hash.
  const path = pathname.split(/[?#]/)[0].replace(/\/+$/, "")
  if (!path || path === "" || path === "/") return []

  const segments = path.split("/").filter(Boolean)
  if (segments.length === 0) return []

  const crumbs: Crumb[] = [
    { name: "Home", href: "/", item: SITE },
  ]

  let accumulated = ""
  segments.forEach((segment, idx) => {
    accumulated += `/${segment}`
    const isLast = idx === segments.length - 1
    crumbs.push({
      name: humanise(segment),
      href: isLast ? undefined : accumulated,
      item: `${SITE}${accumulated}`,
    })
  })

  return crumbs
}
