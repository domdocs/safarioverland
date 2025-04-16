import { getListingsByCategorySync } from "@/lib/listings"
import { CategoryLayout } from "@/components/category-layout"
import { ListingsGrid } from "@/components/listings-grid"

export const dynamic = "force-dynamic"

export default function FlightsPage() {
  // Use the synchronous version directly - no async/await
  const listings = getListingsByCategorySync("flights")

  return (
    <CategoryLayout
      title="Safari Flights"
      description="Find scheduled and charter flights to safari destinations across Africa, from bush planes to helicopter transfers."
      image="/placeholder.svg?height=400&width=800&text=Safari+Flights"
    >
      <ListingsGrid
        listings={listings}
        category="Safari Flights"
        emptyMessage="No flight listings available at the moment"
      />
    </CategoryLayout>
  )
}
