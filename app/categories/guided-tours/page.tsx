import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { CategoryLayout } from "@/components/category-layout"
import { PaginatedListingsGrid } from "@/components/paginated-listings-grid"

export const metadata: Metadata = {
  title: "Guided Tours | Safari Overland Directory",
  description:
    "Join expert guides on unforgettable safari tours across Africa's most spectacular wildlife destinations.",
}

export const dynamic = "force-dynamic"

export default async function GuidedToursPage() {
  // Get initial listings
  const initialListings = await getListingsByCategory("guided-tours", 6)

  return (
    <CategoryLayout
      title="Guided Tours"
      description="Join expert guides on unforgettable safari tours across Africa's most spectacular wildlife destinations."
      image="/placeholder.svg?height=400&width=800&text=Guided+Tours"
    >
      <PaginatedListingsGrid
        initialListings={initialListings}
        category="Guided Tours"
        categorySlug="guided-tours"
        emptyMessage="No guided tour listings available at the moment"
      />
    </CategoryLayout>
  )
}
