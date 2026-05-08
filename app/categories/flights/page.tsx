import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { getSettings } from "@/lib/settings"
import { CategoryPageShell } from "@/components/editorial/category-page-shell"
import { PaginatedListingsGridEditorial } from "@/components/editorial/paginated-listings-grid-editorial"

export const metadata: Metadata = {
  title: "Safari Flights | Safari Overland",
  description:
    "Scheduled and charter flights to safari destinations — bush planes, helicopter transfers, regional airlines.",
}

export const dynamic = "force-dynamic"

export default async function FlightsPage() {
  const settings = await getSettings()
  const pageSize = settings.listings_per_page
  const initialListings = await getListingsByCategory("flights", pageSize)

  return (
    <CategoryPageShell
      activeSlug="flights"
      index={8}
      total={9}
      title="Safari flights"
      description="Scheduled and charter flights to safari destinations — bush planes, helicopter transfers, regional airlines."
      image="/images/category-img/flights.jpg"
    >
      <PaginatedListingsGridEditorial
        initialListings={initialListings}
        categorySlug="flights"
        pageSize={pageSize}
        eyebrow="Flight"
        emptyMessage="No flight operators listed yet — submissions open under /submit."
      />
    </CategoryPageShell>
  )
}
