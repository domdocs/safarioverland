import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { CategoryLayout } from "@/components/category-layout"
import { PaginatedListingsGrid } from "@/components/paginated-listings-grid"

export const metadata: Metadata = {
  title: "Safari Lodges | Safari Overland Directory",
  description:
    "Discover the finest safari lodges across Africa, from luxury tented camps to exclusive private reserves.",
}

export const dynamic = "force-dynamic"

export default async function LodgesPage() {
  // Get initial listings
  const initialListings = await getListingsByCategory("lodges", 6)

  return (
    <CategoryLayout
      title="Safari Lodges"
      description="Discover the finest safari lodges across Africa, from luxury tented camps to exclusive private reserves."
      image="/placeholder.svg?height=400&width=800&text=Safari+Lodges"
    >
      <PaginatedListingsGrid
        initialListings={initialListings}
        category="Safari Lodges"
        categorySlug="lodges"
        emptyMessage="No lodge listings available at the moment"
      />
    </CategoryLayout>
  )
}
