import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { getSettings } from "@/lib/settings"
import { CategoryPageShell } from "@/components/editorial/category-page-shell"
import { PaginatedListingsGridEditorial } from "@/components/editorial/paginated-listings-grid-editorial"

export const metadata: Metadata = {
  title: "Game Viewing | Safari Overland",
  description:
    "Specialised game viewing with expert guides — predator behaviour, birding, photography hides.",
}

export const dynamic = "force-dynamic"

export default async function GameViewingPage() {
  const settings = await getSettings()
  const pageSize = settings.listings_per_page
  const initialListings = await getListingsByCategory("game-viewing", pageSize)

  return (
    <CategoryPageShell
      activeSlug="game-viewing"
      index={7}
      total={9}
      title="Game viewing"
      description="Specialised wildlife experiences with expert guides — predator behaviour, birding, photography hides."
      image="/images/category-img/game-viewing.jpg"
    >
      <PaginatedListingsGridEditorial
        initialListings={initialListings}
        categorySlug="game-viewing"
        pageSize={pageSize}
        eyebrow="Game viewing"
        emptyMessage="No game viewing listed yet — submissions open under /submit."
      />
    </CategoryPageShell>
  )
}
