import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { CategoryLayout } from "@/components/category-layout"
import { PaginatedListingsGrid } from "@/components/paginated-listings-grid"

export const metadata: Metadata = {
  title: "Adventure Activities | Safari Overland Directory",
  description:
    "Add excitement to your safari with thrilling adventure activities, from hot air balloon rides to white water rafting.",
}

export const dynamic = "force-dynamic"

export default async function AdventureActivitiesPage() {
  // Get initial listings
  const initialListings = await getListingsByCategory("adventure-activities", 6)

  return (
    <CategoryLayout
      title="Adventure Activities"
      description="Add excitement to your safari with thrilling adventure activities, from hot air balloon rides to white water rafting."
      image="/placeholder.svg?height=400&width=800&text=Adventure+Activities"
    >
      <PaginatedListingsGrid
        initialListings={initialListings}
        category="Adventure Activities"
        categorySlug="adventure-activities"
        emptyMessage="No adventure activity listings available at the moment"
      />
    </CategoryLayout>
  )
}
