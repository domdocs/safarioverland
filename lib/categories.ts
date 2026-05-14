/**
 * Canonical master list of editorial categories + the "active" helper
 * used by the `/categories` index, per-category pages, and the footer.
 *
 * Master-list order is the canonical display order. When a previously-
 * empty category gets its first approved listing, the card reappears
 * at its master-list position (not at the end of the grid).
 *
 * Source of truth for both the prose treatment shown on the grid and
 * the slugs used in URLs. Slug-form mirrors the route folders under
 * `app/categories/[slug]/`.
 */

import { getSupabaseServerClient } from "./supabase"

export type CategorySpec = {
  /** Display name — used in card titles and per-page hero strings. */
  name: string
  /** URL slug. Must match the corresponding folder under app/categories/. */
  slug: string
  /** Short editorial blurb shown on the index card. */
  description: string
}

export type ActiveCategory = CategorySpec & {
  /** Count of `status='approved'` listings in this category. Always > 0. */
  count: number
}

/**
 * The canonical category master list — display order.
 *
 * Edit here when adding/removing categories. The `/categories/[slug]/`
 * folder + `lib/category-tabs.ts` should stay in step.
 */
export const CATEGORY_MASTER: CategorySpec[] = [
  {
    name: "Safari Lodges",
    slug: "lodges",
    description:
      "Discover the finest safari lodges across Africa, from luxury tented camps to exclusive private reserves.",
  },
  {
    name: "Safari Campsites",
    slug: "campsites",
    description:
      "Experience the authentic African wilderness with our selection of safari campsites, from basic bush camps to comfortable glamping sites.",
  },
  {
    name: "4x4 Rentals",
    slug: "4x4-rentals",
    description:
      "Find the perfect 4x4 vehicle for your self-drive safari adventure, fully equipped with everything you need for off-road exploration.",
  },
  {
    name: "Guided Tours",
    slug: "guided-tours",
    description:
      "Join expert guides on unforgettable safari tours across Africa's most spectacular wildlife destinations.",
  },
  {
    name: "Adventure Activities",
    slug: "adventure-activities",
    description:
      "Add excitement to your safari with thrilling adventure activities, from hot air balloon rides to white water rafting.",
  },
  {
    name: "Game Viewing",
    slug: "game-viewing",
    description:
      "Discover specialized game viewing experiences with expert guides who know exactly where to find Africa's most iconic wildlife.",
  },
  {
    name: "Overland Tours",
    slug: "overland-tours",
    description:
      "Experience the ultimate African adventure with overland tours that take you across multiple countries and diverse landscapes.",
  },
  {
    name: "Safari Flights",
    slug: "flights",
    description:
      "Find scheduled and charter flights to safari destinations across Africa, from bush planes to helicopter transfers.",
  },
  {
    name: "Booking Agents",
    slug: "booking-agents",
    description:
      "Connect with specialized safari booking agents who can arrange your perfect African adventure from start to finish.",
  },
]

/**
 * Look up a category spec by its URL slug. Returns null for unknown
 * slugs. Used by per-category pages that need the editorial blurb when
 * the category has no approved listings yet.
 */
export function findCategoryBySlug(slug: string): CategorySpec | null {
  return CATEGORY_MASTER.find((c) => c.slug === slug) ?? null
}

/**
 * Counts of `status='approved'` listings per category. Internal —
 * exposed for tests. Production callers should prefer
 * `getActiveCategories()` which already joins counts against the master.
 */
export async function getApprovedCountsByCategory(): Promise<
  Record<string, number>
> {
  const supabase = getSupabaseServerClient()
  if (!supabase) return {}

  const { data, error } = await supabase
    .from("directory_listings")
    .select("category")
    .eq("status", "approved")

  if (error || !data) {
    console.error("getApprovedCountsByCategory failed", error)
    return {}
  }

  const counts: Record<string, number> = {}
  for (const row of data as Array<{ category: string | null }>) {
    if (!row.category) continue
    counts[row.category] = (counts[row.category] ?? 0) + 1
  }
  return counts
}

/**
 * Categories that have at least one approved listing, ordered by the
 * master-list order, with counts attached.
 *
 * Used by `/categories` (index page), per-category page detection of
 * empty state, and the editorial footer's Categories column.
 *
 * Master-list order is preserved so adding listings to a previously-
 * hidden category brings its card back in at its original position
 * (not at the end of the grid).
 */
export async function getActiveCategories(): Promise<ActiveCategory[]> {
  const counts = await getApprovedCountsByCategory()
  return CATEGORY_MASTER.flatMap((spec) => {
    const count = counts[spec.slug] ?? 0
    return count > 0 ? [{ ...spec, count }] : []
  })
}

/**
 * Test-only / sync convenience: filter a master-list array against a
 * precomputed counts map. Lets tests assert the joining logic without
 * standing up Supabase.
 */
export function joinActiveCategories(
  master: CategorySpec[],
  counts: Record<string, number>,
): ActiveCategory[] {
  return master.flatMap((spec) => {
    const count = counts[spec.slug] ?? 0
    return count > 0 ? [{ ...spec, count }] : []
  })
}
