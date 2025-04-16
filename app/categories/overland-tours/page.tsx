import { getListingsByCategorySync } from "@/lib/listings"
import { CategoryLayout } from "@/components/category-layout"
import { ListingsGrid } from "@/components/listings-grid"

export const dynamic = "force-dynamic"

export default function OverlandToursPage() {
  // Use the synchronous version directly - no async/await
  const listings = getListingsByCategorySync("overland-tours")

  return (
    <CategoryLayout
      title="Overland Tours"
      description="Experience the ultimate African adventure with overland tours that take you across multiple countries and diverse landscapes."
      image="/placeholder.svg?height=400&width=800&text=Overland+Tours"
    >
      <ListingsGrid
        listings={listings}
        category="Overland Tours"
        emptyMessage="No overland tour listings available at the moment"
      />
    </CategoryLayout>
  )
}
