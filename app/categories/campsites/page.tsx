import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { CategoryPageShell } from "@/components/editorial/category-page-shell"
import { PaginatedListingsGridEditorial } from "@/components/editorial/paginated-listings-grid-editorial"

export const metadata: Metadata = {
  title: "Safari Campsites | Safari Overland",
  description:
    "Authentic African wilderness — from basic bush camps to comfortable glamping sites.",
}

export const dynamic = "force-dynamic"

export default async function CampsitesPage() {
  const initialListings = await getListingsByCategory("campsites", 6)

  return (
    <CategoryPageShell
      activeSlug="campsites"
      index={2}
      total={9}
      title="Safari campsites"
      description="From basic bush camps to comfortable glamping sites — closer to the wild, smaller in footprint."
      image="/images/category-img/campsites.jpg"
    >
      <PaginatedListingsGridEditorial
        initialListings={initialListings}
        categorySlug="campsites"
        eyebrow="Campsite"
        emptyMessage="No campsites listed yet — submissions open under /submit."
      />
    </CategoryPageShell>
  )
}
