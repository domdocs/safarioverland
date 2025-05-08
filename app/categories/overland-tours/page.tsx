import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { CategoryLayout } from "@/components/category-layout"
import { PaginatedListingsGrid } from "@/components/paginated-listings-grid"

export const metadata: Metadata = {
  title: "Overland Tours | Safari Overland Directory",
  description:
    "Experience the ultimate African adventure with overland tours that take you across multiple countries and diverse landscapes.",
}

export const dynamic = "force-dynamic"

export default async function OverlandToursPage() {
  // Get initial listings
  const initialListings = await getListingsByCategory("overland-tours", 6)

  return (
    <CategoryLayout
      title="Overland Tours"
      description="Experience the ultimate African adventure with overland tours that take you across multiple countries and diverse landscapes."
      image="/images/category-img/overland-tours.jpg"
    >
      <PaginatedListingsGrid
        initialListings={initialListings}
        category="Overland Tours"
        categorySlug="overland-tours"
        emptyMessage="No overland tour listings available at the moment"
      />
    </CategoryLayout>
  )
}
