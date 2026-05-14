import { getSupabaseServerClient } from "@/lib/supabase"
import { getListings, type ListingStatus, type DirectoryListing } from "@/lib/listings"
import { ListingsTableClient } from "@/components/admin/listings-table-client"

export const dynamic = "force-dynamic"

const PAGE_SIZE = 20

const KNOWN_CATEGORIES: { slug: string; label: string }[] = [
  { slug: "lodges", label: "Lodges" },
  { slug: "campsites", label: "Campsites" },
  { slug: "guided-tours", label: "Guided tours" },
  { slug: "overland-tours", label: "Overland tours" },
  { slug: "4x4-rentals", label: "4×4 rentals" },
  { slug: "adventure-activities", label: "Adventure activities" },
  { slug: "game-viewing", label: "Game viewing" },
  { slug: "flights", label: "Flights" },
  { slug: "booking-agents", label: "Booking agents" },
]

function parseStatus(raw: string | undefined): ListingStatus | "all" {
  if (raw === "approved" || raw === "pending" || raw === "rejected") return raw
  if (raw === "all") return "all"
  return "approved"
}

function parseFeatured(raw: string | undefined): boolean | undefined {
  if (raw === "true") return true
  if (raw === "false") return false
  return undefined
}

/**
 * Filtered count + distinct countries for the current view.
 * Inline-helper to honour the brief's constraint: don't touch
 * lib/listings.ts shape. We use the same Supabase client lib/listings.ts
 * uses, just for these page-local needs.
 */
async function loadFacets(filters: {
  status: ListingStatus | "all"
  category: string
  country: string
  featured: boolean | undefined
}): Promise<{ totalCount: number; countries: string[] }> {
  const supabase = getSupabaseServerClient()
  if (!supabase) return { totalCount: 0, countries: [] }

  // Filtered count
  let countQuery = supabase
    .from("directory_listings")
    .select("id", { count: "exact", head: true })
  if (filters.status !== "all") countQuery = countQuery.eq("status", filters.status)
  if (filters.category) countQuery = countQuery.eq("category", filters.category)
  if (filters.country) countQuery = countQuery.eq("country", filters.country)
  if (filters.featured !== undefined) countQuery = countQuery.eq("featured", filters.featured)
  const { count, error: countErr } = await countQuery
  if (countErr) console.error("listings count failed:", countErr)

  // Distinct country list — pulled once across all approved+pending so the
  // dropdown is stable when filters change. (Rejected rows are admin-only,
  // including them keeps the option set complete for triage.)
  const { data: countryRows, error: countryErr } = await supabase
    .from("directory_listings")
    .select("country")
  if (countryErr) console.error("country distinct failed:", countryErr)
  const countries = Array.from(
    new Set(
      (countryRows ?? [])
        .map((r) => (r as { country: string }).country)
        .filter((c): c is string => !!c && c.length > 0),
    ),
  ).sort((a, b) => a.localeCompare(b))

  return { totalCount: count ?? 0, countries }
}

export default async function AdminListingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = await searchParams
  const get = (key: string) => {
    const v = sp[key]
    return Array.isArray(v) ? v[0] : v
  }

  const status = parseStatus(get("status"))
  const category = get("category") ?? ""
  const country = get("country") ?? ""
  const featuredRaw = get("featured")
  const featured = parseFeatured(featuredRaw)
  const page = Math.max(1, Number(get("page")) || 1)
  const offset = (page - 1) * PAGE_SIZE

  const [rows, facets] = await Promise.all([
    getListings({
      status: status === "all" ? "all" : status,
      category: category || undefined,
      country: country || undefined,
      featured,
      limit: PAGE_SIZE,
      offset,
    }) as Promise<DirectoryListing[]>,
    loadFacets({ status, category, country, featured }),
  ])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-baseline gap-4">
        <div>
          <h1 className="text-3xl font-bold">Manage listings</h1>
          <p className="text-muted-foreground mt-1">
            Filter, edit, and triage every directory row.
          </p>
        </div>
      </div>

      <ListingsTableClient
        mode="all"
        rows={rows}
        page={page}
        pageSize={PAGE_SIZE}
        totalCount={facets.totalCount}
        filters={{
          status,
          category,
          country,
          featured: featuredRaw === "true" ? "true" : featuredRaw === "false" ? "false" : "",
        }}
        categoryOptions={KNOWN_CATEGORIES}
        countryOptions={facets.countries}
        basePath="/admin/listings"
      />
    </div>
  )
}
