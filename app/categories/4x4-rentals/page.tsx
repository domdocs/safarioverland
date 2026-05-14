import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { getSettings } from "@/lib/settings"
import { CategoryPageShell } from "@/components/editorial/category-page-shell"
import { CategoryEmptyState } from "@/components/editorial/category-empty-state"
import { PaginatedListingsGridEditorial } from "@/components/editorial/paginated-listings-grid-editorial"

export const metadata: Metadata = {
  title: "4×4 Rentals | Safari Overland",
  description:
    "Self-drive 4×4 rentals — fully equipped vehicles for off-road exploration.",
}

export const dynamic = "force-dynamic"

export default async function FourByFourRentalsPage() {
  const settings = await getSettings()
  const pageSize = settings.listings_per_page
  const initialListings = await getListingsByCategory("4x4-rentals", pageSize)

  return (
    <CategoryPageShell
      activeSlug="4x4-rentals"
      index={5}
      total={9}
      title="4×4 rentals"
      description="Fully equipped self-drive vehicles for off-road exploration. Roof tents, fridges, recovery kit included."
      image="/rentals.jpg"
    >
      <PaginatedListingsGridEditorial
        initialListings={initialListings}
        categorySlug="4x4-rentals"
        pageSize={pageSize}
        eyebrow="4×4 rental"
        emptyContent={<CategoryEmptyState noun="4×4 rental" />}
      />
    </CategoryPageShell>
  )
}
