import { getSupabaseServerClient } from "@/lib/supabase"
import {
  inferRegionsFromWildlife,
  type BudgetTierOption,
} from "./options"

/**
 * Shortlist algorithm for /plan/sent.
 *
 * Deterministic, not ML. Filters `directory_listings` down to the
 * editorial holding-pattern set we'd already have in mind for the kind
 * of trip described in the intake.
 */

export type ShortlistEntry = {
  id: string
  listing_name: string
  location: string
  region: string
  country: string
  verdict: string | null
  image_url: string | null
}

export type ShortlistCriteria = {
  wildlife_priorities?: string[]
  budget_tier?: BudgetTierOption
  season_preference?: string
}

const MAX_RESULTS = 4
const MIN_RESULTS_BEFORE_FALLBACK = 2

/**
 * `discuss` and missing tiers should not filter on price — let the
 * planner take it from there.
 */
function priceTierForFilter(
  tier: BudgetTierOption | undefined,
): string | null {
  if (!tier || tier === "discuss") return null
  return tier
}

/**
 * Compute a list of regions implied by the intake. Right now only
 * Step 05 wildlife answers contribute. Step 07 `migration-window`
 * implies East Africa.
 */
function regionsFor(criteria: ShortlistCriteria): string[] {
  const fromWildlife = inferRegionsFromWildlife(
    criteria.wildlife_priorities ?? [],
  )
  if (criteria.season_preference === "migration-window") {
    if (!fromWildlife.includes("East Africa")) fromWildlife.push("East Africa")
  }
  return fromWildlife
}

/**
 * Run the shortlist. Returns at most MAX_RESULTS entries. Returns an
 * empty array when the filter yields fewer than MIN_RESULTS_BEFORE_FALLBACK
 * matches — the caller renders a "we'd rather think on it" message in
 * that case.
 */
export async function shortlistFor(
  criteria: ShortlistCriteria,
): Promise<ShortlistEntry[]> {
  const supabase = getSupabaseServerClient()
  if (!supabase) return []

  const regions = regionsFor(criteria)
  const priceTier = priceTierForFilter(criteria.budget_tier)

  let query = supabase
    .from("directory_listings")
    .select(
      "id, listing_name, location, region, country, verdict, image_url, featured_rank, updated_at",
    )
    .eq("status", "approved")
    .eq("featured", true)

  if (regions.length > 0) {
    query = query.in("region", regions)
  }
  if (priceTier) {
    query = query.eq("price_tier", priceTier)
  }

  // Supabase doesn't expose "NULLS LAST" via the JS client, so we order
  // by featured_rank asc (NULLs sort first in Postgres by default for
  // ASC, but Supabase mirrors that — we then post-sort in JS to push
  // nulls to the end and break ties by updated_at).
  const { data, error } = await query.limit(20)

  if (error || !data) {
    console.error("shortlist query failed", error)
    return []
  }

  const ranked = [...data].sort((a, b) => {
    const aRank = a.featured_rank as number | null
    const bRank = b.featured_rank as number | null
    if (aRank == null && bRank == null) {
      return (b.updated_at as string).localeCompare(a.updated_at as string)
    }
    if (aRank == null) return 1
    if (bRank == null) return -1
    if (aRank !== bRank) return aRank - bRank
    return (b.updated_at as string).localeCompare(a.updated_at as string)
  })

  if (ranked.length < MIN_RESULTS_BEFORE_FALLBACK) return []

  return ranked.slice(0, MAX_RESULTS).map((row) => ({
    id: row.id as string,
    listing_name: row.listing_name as string,
    location: row.location as string,
    region: row.region as string,
    country: row.country as string,
    verdict: (row.verdict as string | null) ?? null,
    image_url: (row.image_url as string | null) ?? null,
  }))
}
