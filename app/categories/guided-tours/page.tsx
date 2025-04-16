import { getListingsByCategorySync } from "@/lib/listings"
import { CategoryLayout } from "@/components/category-layout"
import { ListingsGrid } from "@/components/listings-grid"

export const dynamic = "force-dynamic"

export default function GuidedToursPage() {
  // Use the synchronous version directly - no async/await
  const listings = getListingsByCategorySync("guided-tours")

  return (
    <CategoryLayout
      title="Guided Tours"
      description="Join expert guides on unforgettable safari tours across Africa's most spectacular wildlife destinations."
      image="/placeholder.svg?height=400&width=800&text=Guided+Tours"
    >
      <ListingsGrid
        listings={listings}
        category="Guided Tours"
        emptyMessage="No guided tour listings available at the moment"
      />
    </CategoryLayout>
  )
}
