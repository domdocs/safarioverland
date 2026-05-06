/**
 * Central registry for every gated download on the site.
 *
 * Each resource has a stable `slug` used in URLs and analytics,
 * a `storagePath` pointing to the file in the Supabase `downloads` bucket,
 * and a `sourceUrl` (optional) that the PDF generation script renders.
 *
 * If `available` is false, the download button shows "Coming soon —
 * we'll email it to you when ready" and still captures the email.
 */

export type Resource = {
  slug: string
  title: string
  description: string
  filename: string
  storagePath: string
  sourceUrl?: string
  available: boolean
}

export const RESOURCES: Record<string, Resource> = {
  "safari-planning-checklist": {
    slug: "safari-planning-checklist",
    title: "Safari Planning Checklist",
    description: "A two-page checklist that walks you through every planning step from booking to packing.",
    filename: "safari-planning-checklist.pdf",
    storagePath: "safari-planning-checklist.pdf",
    sourceUrl: "/resources/planning-guides/before-you-go",
    available: true,
  },
  "first-time-safari-planner": {
    slug: "first-time-safari-planner",
    title: "First-Time Safari Planner",
    description:
      "A 12-page guide covering destination choice, budgeting and pre-departure logistics for first-time travelers.",
    filename: "first-time-safari-planner.pdf",
    storagePath: "first-time-safari-planner.pdf",
    sourceUrl: "/resources/planning-guides/choosing-destinations",
    available: true,
  },
  "safari-budget-calculator": {
    slug: "safari-budget-calculator",
    title: "Safari Budget Calculator",
    description:
      "An Excel calculator with formulas for flights, park fees, accommodation, transfers and tips. Edit the assumptions and see your total update live.",
    filename: "safari-budget-calculator.xlsx",
    storagePath: "safari-budget-calculator.xlsx",
    available: true,
  },
  "ultimate-packing-list": {
    slug: "ultimate-packing-list",
    title: "Ultimate Packing List",
    description: "A printable two-page packing list customised for safari travel.",
    filename: "ultimate-packing-list.pdf",
    storagePath: "ultimate-packing-list.pdf",
    sourceUrl: "/resources/planning-guides/packing-list",
    available: true,
  },
  "safari-calendar-planner": {
    slug: "safari-calendar-planner",
    title: "Safari Calendar Planner",
    description: "A four-page calendar showing peak game viewing months for every major safari destination.",
    filename: "safari-calendar-planner.pdf",
    storagePath: "safari-calendar-planner.pdf",
    sourceUrl: "/resources/planning-guides/best-times",
    available: true,
  },
  "destination-comparison-chart": {
    slug: "destination-comparison-chart",
    title: "Destination Comparison Chart",
    description: "A side-by-side comparison of the major safari destinations to help you choose the right one.",
    filename: "destination-comparison-chart.pdf",
    storagePath: "destination-comparison-chart.pdf",
    sourceUrl: "/resources/planning-guides/east-vs-southern",
    available: true,
  },
  "family-safari-planner": {
    slug: "family-safari-planner",
    title: "Family Safari Planner",
    description: "An eight-page guide for traveling with children — destinations, lodges, malaria considerations.",
    filename: "family-safari-planner.pdf",
    storagePath: "family-safari-planner.pdf",
    sourceUrl: "/resources/planning-guides/family-safaris",
    available: true,
  },
  "safari-safety-guide": {
    slug: "safari-safety-guide",
    title: "Safari Safety Guide",
    description: "Safari safety essentials — wildlife behaviour, camp protocols and medical preparation.",
    filename: "safari-safety-guide.pdf",
    storagePath: "safari-safety-guide.pdf",
    sourceUrl: "/resources/safety-tips",
    available: true,
  },
  "seasonal-calendar": {
    slug: "seasonal-calendar",
    title: "Seasonal Calendar",
    description: "A printable calendar of the best safari months across every region.",
    filename: "seasonal-calendar.pdf",
    storagePath: "seasonal-calendar.pdf",
    sourceUrl: "/resources/seasonal-guides",
    available: true,
  },
  "ghana-safari-guide": {
    slug: "ghana-safari-guide",
    title: "Ghana Safari Guide",
    description: "Wildlife, parks and seasonal timing for safari travel in Ghana.",
    filename: "ghana-safari-guide.pdf",
    storagePath: "ghana-safari-guide.pdf",
    sourceUrl: "/resources/seasonal-guides/ghana",
    available: true,
  },
  "senegal-safari-guide": {
    slug: "senegal-safari-guide",
    title: "Senegal Safari Guide",
    description: "Wildlife, parks and seasonal timing for safari travel in Senegal.",
    filename: "senegal-safari-guide.pdf",
    storagePath: "senegal-safari-guide.pdf",
    sourceUrl: "/resources/seasonal-guides/senegal",
    available: true,
  },
  "morocco-safari-guide": {
    slug: "morocco-safari-guide",
    title: "Morocco Safari Guide",
    description: "Wildlife, landscapes and seasonal timing for travel across Morocco.",
    filename: "morocco-safari-guide.pdf",
    storagePath: "morocco-safari-guide.pdf",
    sourceUrl: "/resources/seasonal-guides/morocco",
    available: true,
  },
  "egypt-safari-guide": {
    slug: "egypt-safari-guide",
    title: "Egypt Safari Guide",
    description: "Wildlife, parks and seasonal timing for travel across Egypt.",
    filename: "egypt-safari-guide.pdf",
    storagePath: "egypt-safari-guide.pdf",
    sourceUrl: "/resources/seasonal-guides/egypt",
    available: true,
  },
  "great-migration-calendar": {
    slug: "great-migration-calendar",
    title: "Great Migration Calendar",
    description: "Month-by-month positions of the wildebeest migration through the Serengeti–Mara ecosystem.",
    filename: "great-migration-calendar.pdf",
    storagePath: "great-migration-calendar.pdf",
    sourceUrl: "/resources/seasonal-guides/great-migration",
    available: true,
  },
}

export function getResource(slug: string): Resource | null {
  return RESOURCES[slug] ?? null
}

export const SUBSCRIBER_COOKIE = "so_subscriber_id"
export const SUBSCRIBER_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year
export const STORAGE_BUCKET = "downloads"
export const SIGNED_URL_TTL_SECONDS = 60 * 60 // 1 hour
