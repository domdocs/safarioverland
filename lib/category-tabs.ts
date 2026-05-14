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
 *
 * When `activeSlugs` is provided (the set of categories with at least
 * one approved listing — see `lib/categories.ts:getActiveCategories`),
 * tabs for empty categories are filtered out. This matches the same
 * "retire empty cards" behaviour on the /categories index and the
 * footer Categories column. The "All" tab is always present.
 *
 * When `activeSlugs` is omitted, the legacy behaviour is preserved
 * (all master-list tabs rendered).
 */
export function buildCategoryTabs(
  activeSlug: string | null,
  activeSlugs?: readonly string[],
): CategoryTab[] {
  const tabs: CategoryTab[] = [
    { href: "/categories", label: "All", active: activeSlug === null },
  ]
  const allow = activeSlugs ? new Set(activeSlugs) : null
  for (const c of CATEGORY_TABS) {
    if (allow && !allow.has(c.slug)) continue
    tabs.push({
      href: `/categories/${c.slug}`,
      label: c.label,
      active: activeSlug === c.slug,
    })
  }
  return tabs
}
