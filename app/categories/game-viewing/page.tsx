import { getListingsByCategorySync } from "@/lib/listings"
import { CategoryLayout } from "@/components/category-layout"
import { ListingsGrid } from "@/components/listings-grid"

export const dynamic = "force-dynamic"

export default function GameViewingPage() {
  // Use the synchronous version directly - no async/await
  const listings = getListingsByCategorySync("game-viewing")

  return (
    <CategoryLayout
      title="Game Viewing"
      description="Discover specialized game viewing experiences with expert guides who know exactly where to find Africa's most iconic wildlife."
      image="/placeholder.svg?height=400&width=800&text=Game+Viewing"
    >
      <ListingsGrid
        listings={listings}
        category="Game Viewing"
        emptyMessage="No game viewing listings available at the moment"
      />
    </CategoryLayout>
  )
}
