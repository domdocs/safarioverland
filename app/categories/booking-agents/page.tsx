import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { CategoryLayout } from "@/components/category-layout"
import { PaginatedListingsGrid } from "@/components/paginated-listings-grid"

export const metadata: Metadata = {
  title: "Booking Agents | Safari Overland Directory",
  description:
    "Connect with specialized safari booking agents who can arrange your perfect African adventure from start to finish.",
}

export const dynamic = "force-dynamic"

export default async function BookingAgentsPage() {
  // Get initial listings
  const initialListings = await getListingsByCategory("booking-agents", 6)

  return (
    <CategoryLayout
      title="Booking Agents"
      description="Connect with specialized safari booking agents who can arrange your perfect African adventure from start to finish."
      image="/images/category-img/booking-agents.jpg"
    >
      <PaginatedListingsGrid
        initialListings={initialListings}
        category="Booking Agents"
        categorySlug="booking-agents"
        emptyMessage="No booking agent listings available at the moment"
      />
    </CategoryLayout>
  )
}
