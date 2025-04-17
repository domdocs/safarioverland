import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { CategoryLayout } from "@/components/category-layout"
import { ListingsGrid } from "@/components/listings-grid"

export const metadata: Metadata = {
  title: "Game Viewing | Safari Overland Directory",
  description:
    "Discover specialized game viewing experiences with expert guides who know exactly where to find Africa's most iconic wildlife.",
}

export const dynamic = "force-dynamic"

export default async function GameViewingPage() {
  // Use the async function to get real data from Supabase
  const listings = await getListingsByCategory("game-viewing", 6)

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
