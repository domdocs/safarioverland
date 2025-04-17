import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { CategoryLayout } from "@/components/category-layout"
import { PaginatedListingsGrid } from "@/components/paginated-listings-grid"

export const metadata: Metadata = {
  title: "4x4 Rentals | Safari Overland Directory",
  description:
    "Find the perfect 4x4 vehicle for your self-drive safari adventure, fully equipped with everything you need for off-road exploration.",
}

export const dynamic = "force-dynamic"

export default async function FourByFourRentalsPage() {
  // Get initial listings
  const initialListings = await getListingsByCategory("4x4-rentals", 6)

  return (
    <CategoryLayout
      title="4x4 Rentals"
      description="Find the perfect 4x4 vehicle for your self-drive safari adventure, fully equipped with everything you need for off-road exploration."
      image="/placeholder.svg?height=400&width=800&text=4x4+Rentals"
    >
      <PaginatedListingsGrid
        initialListings={initialListings}
        category="4x4 Rentals"
        categorySlug="4x4-rentals"
        emptyMessage="No 4x4 rental listings available at the moment"
      />
    </CategoryLayout>
  )
}
