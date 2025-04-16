import { getListingsByCategorySync } from "@/lib/listings"
import { CategoryLayout } from "@/components/category-layout"
import { ListingsGrid } from "@/components/listings-grid"

export const dynamic = "force-dynamic"

export default function CampsitesPage() {
  // Use the synchronous version directly - no async/await
  const listings = getListingsByCategorySync("campsites")

  return (
    <CategoryLayout
      title="Safari Campsites"
      description="Experience the authentic African wilderness with our selection of safari campsites, from basic bush camps to comfortable glamping sites."
      image="/placeholder.svg?height=400&width=800&text=Safari+Campsites"
    >
      <ListingsGrid
        listings={listings}
        category="Safari Campsites"
        emptyMessage="No campsite listings available at the moment"
      />
    </CategoryLayout>
  )
}
