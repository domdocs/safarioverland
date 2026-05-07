import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { CategoryPageShell } from "@/components/editorial/category-page-shell"
import { PaginatedListingsGridEditorial } from "@/components/editorial/paginated-listings-grid-editorial"

export const metadata: Metadata = {
  title: "Booking Agents | Safari Overland",
  description:
    "Specialised safari booking agents who arrange the trip from start to finish.",
}

export const dynamic = "force-dynamic"

export default async function BookingAgentsPage() {
  const initialListings = await getListingsByCategory("booking-agents", 6)

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
        eyebrow="Booking agent"
        emptyMessage="No booking agents listed yet — submissions open under /submit."
      />
    </CategoryPageShell>
  )
}
