import Link from "next/link"

import { getSupabaseServerClient } from "@/lib/supabase"
import { getListings, type DirectoryListing } from "@/lib/listings"
import { Button } from "@/components/ui/button"
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

async function loadFacets(filters: {
  category: string
  country: string
}): Promise<{ totalCount: number; countries: string[] }> {
  const supabase = getSupabaseServerClient()
  if (!supabase) return { totalCount: 0, countries: [] }

  let countQuery = supabase
    .from("directory_listings")
    .select("id", { count: "exact", head: true })
    .eq("status", "pending")
  if (filters.category) countQuery = countQuery.eq("category", filters.category)
  if (filters.country) countQuery = countQuery.eq("country", filters.country)
  const { count, error: countErr } = await countQuery
  if (countErr) console.error("pending count failed:", countErr)

  // Distinct country list across all pending rows so the dropdown is
  // stable when the category filter changes.
  const { data: countryRows, error: countryErr } = await supabase
    .from("directory_listings")
    .select("country")
    .eq("status", "pending")
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

export default async function PendingListingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = await searchParams
  const get = (key: string) => {
    const v = sp[key]
    return Array.isArray(v) ? v[0] : v
  }

  const category = get("category") ?? ""
  const country = get("country") ?? ""
  const page = Math.max(1, Number(get("page")) || 1)
  const offset = (page - 1) * PAGE_SIZE

  const [rows, facets] = await Promise.all([
    getListings({
      status: "pending",
      category: category || undefined,
      country: country || undefined,
      limit: PAGE_SIZE,
      offset,
    }) as Promise<DirectoryListing[]>,
    loadFacets({ category, country }),
  ])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-baseline gap-4">
        <div>
          <h1 className="text-3xl font-bold">Pending approvals</h1>
          <p className="text-muted-foreground mt-1">
            Review submissions and approve or reject inline.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/listings">View all listings</Link>
        </Button>
      </div>

      <ListingsTableClient
        mode="pending"
        rows={rows}
        page={page}
        pageSize={PAGE_SIZE}
        totalCount={facets.totalCount}
        filters={{
          status: "pending",
          category,
          country,
          featured: "",
        }}
        categoryOptions={KNOWN_CATEGORIES}
        countryOptions={facets.countries}
        basePath="/admin/pending"
      />
    </div>
  )
}
