import { getListingsByCategorySync } from "@/lib/listings"
import { CategoryLayout } from "@/components/category-layout"
import { ListingsGrid } from "@/components/listings-grid"

export const dynamic = "force-dynamic"

export default function AdventureActivitiesPage() {
  // Use the synchronous version directly - no async/await
  const listings = getListingsByCategorySync("adventure-activities")

  return (
    <CategoryLayout
      title="Adventure Activities"
      description="Add excitement to your safari with thrilling adventure activities, from hot air balloon rides to white water rafting."
      image="/placeholder.svg?height=400&width=800&text=Adventure+Activities"
    >
      <ListingsGrid
        listings={listings}
        category="Adventure Activities"
        emptyMessage="No adventure activity listings available at the moment"
      />
    </CategoryLayout>
  )
}
