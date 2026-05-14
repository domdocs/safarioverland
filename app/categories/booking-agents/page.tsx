import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { getSettings } from "@/lib/settings"
import { CategoryPageShell } from "@/components/editorial/category-page-shell"
import { CategoryEmptyState } from "@/components/editorial/category-empty-state"
import { PaginatedListingsGridEditorial } from "@/components/editorial/paginated-listings-grid-editorial"

export const metadata: Metadata = {
  title: "Booking Agents | Safari Overland",
  description:
    "Specialised safari booking agents who arrange the trip from start to finish.",
}

export const dynamic = "force-dynamic"

export default async function BookingAgentsPage() {
  const settings = await getSettings()
  const pageSize = settings.listings_per_page
  const initialListings = await getListingsByCategory("booking-agents", pageSize)

  return (
    <CategoryPageShell
      activeSlug="booking-agents"
      index={9}
      total={9}
      title="Booking agents"
      description="Specialised agents who plan and book the whole trip — useful when the logistics outweigh the appetite for self-arranging."
      image="/images/category-img/booking-agents.jpg"
    >
      <PaginatedListingsGridEditorial
        initialListings={initialListings}
        categorySlug="booking-agents"
        pageSize={pageSize}
        eyebrow="Booking agent"
        emptyContent={<CategoryEmptyState noun="booking agent" />}
      />
    </CategoryPageShell>
  )
}
