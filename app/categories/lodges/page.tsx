import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { getSettings } from "@/lib/settings"
import { CategoryPageShell } from "@/components/editorial/category-page-shell"
import { CategoryEmptyState } from "@/components/editorial/category-empty-state"
import { PaginatedListingsGridEditorial } from "@/components/editorial/paginated-listings-grid-editorial"

export const metadata: Metadata = {
  title: "Safari Lodges | Safari Overland",
  description:
    "Safari lodges across Africa — from luxury tented camps to exclusive private reserves.",
}

export const dynamic = "force-dynamic"

export default async function LodgesPage() {
  const settings = await getSettings()
  const pageSize = settings.listings_per_page
  const initialListings = await getListingsByCategory("lodges", pageSize)

  return (
    <CategoryPageShell
      activeSlug="lodges"
      index={1}
      total={9}
      title="Safari lodges"
      description="From owner-run tented camps to exclusive private concessions. A small kept list, written up properly."
      image="/images/category-img/luxury-safari-lodges.jpg"
    >
      <PaginatedListingsGridEditorial
        initialListings={initialListings}
        categorySlug="lodges"
        pageSize={pageSize}
        eyebrow="Lodge"
        emptyContent={<CategoryEmptyState noun="lodge" />}
      />
    </CategoryPageShell>
  )
}
