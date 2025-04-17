import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { CategoryLayout } from "@/components/category-layout"
import { PaginatedListingsGrid } from "@/components/paginated-listings-grid"

export const metadata: Metadata = {
  title: "Safari Flights | Safari Overland Directory",
  description:
    "Find scheduled and charter flights to safari destinations across Africa, from bush planes to helicopter transfers.",
}

export const dynamic = "force-dynamic"

export default async function FlightsPage() {
  // Get initial listings
  const initialListings = await getListingsByCategory("flights", 6)

  return (
    <CategoryLayout
      title="Safari Flights"
      description="Find scheduled and charter flights to safari destinations across Africa, from bush planes to helicopter transfers."
      image="/placeholder.svg?height=400&width=800&text=Safari+Flights"
    >
      <PaginatedListingsGrid
        initialListings={initialListings}
        category="Safari Flights"
        categorySlug="flights"
        emptyMessage="No flight listings available at the moment"
      />
    </CategoryLayout>
  )
}
