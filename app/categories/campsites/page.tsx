import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { CategoryLayout } from "@/components/category-layout"
import { PaginatedListingsGrid } from "@/components/paginated-listings-grid"

export const metadata: Metadata = {
  title: "Safari Campsites | Safari Overland Directory",
  description:
    "Experience the authentic African wilderness with our selection of safari campsites, from basic bush camps to comfortable glamping sites.",
}

export const dynamic = "force-dynamic"

export default async function CampsitesPage() {
  // Get initial listings
  const initialListings = await getListingsByCategory("campsites", 6)

  return (
    <CategoryLayout
      title="Safari Campsites"
      description="Experience the authentic African wilderness with our selection of safari campsites, from basic bush camps to comfortable glamping sites."
      image="/images/category-img/campsites.jpg"
    >
      <PaginatedListingsGrid
        initialListings={initialListings}
        category="Safari Campsites"
        categorySlug="campsites"
        emptyMessage="No campsite listings available at the moment"
      />
    </CategoryLayout>
  )
}
