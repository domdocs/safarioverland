import type { CategoryTab } from "@/components/editorial/category-tab-strip"

/**
 * Canonical list of category slugs + display labels for the editorial
 * tab strip. Order is the order they appear on the listings index.
 *
 * If you add a new category route under /categories/, add it here too.
 */
export const CATEGORY_TABS: { slug: string; label: string }[] = [
  { slug: "lodges", label: "Lodges" },
  { slug: "campsites", label: "Campsites" },
  { slug: "guided-tours", label: "Guided tours" },
  { slug: "overland-tours", label: "Overland tours" },
  { slug: "4x4-rentals", label: "4×4 rentals" },
  { slug: "adventure-activities", label: "Activities" },
  { slug: "game-viewing", label: "Game viewing" },
  { slug: "flights", label: "Flights" },
  { slug: "booking-agents", label: "Booking agents" },
]

/**
 * Build the tab list for a given active category. Pass `null` for the
 * "all listings" parent page.
 */
export function buildCategoryTabs(activeSlug: string | null): CategoryTab[] {
  const tabs: CategoryTab[] = [
    { href: "/categories", label: "All", active: activeSlug === null },
  ]
  for (const c of CATEGORY_TABS) {
    tabs.push({
      href: `/categories/${c.slug}`,
      label: c.label,
      active: activeSlug === c.slug,
    })
  }
  return tabs
}
