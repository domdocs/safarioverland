import { getListingsByCategorySync } from "@/lib/listings"
import { CategoryLayout } from "@/components/category-layout"
import { ListingsGrid } from "@/components/listings-grid"

export const dynamic = "force-dynamic"

export default function BookingAgentsPage() {
  // Use the synchronous version directly - no async/await
  const listings = getListingsByCategorySync("booking-agents")

  return (
    <CategoryLayout
      title="Booking Agents"
      description="Connect with specialized safari booking agents who can arrange your perfect African adventure from start to finish."
      image="/placeholder.svg?height=400&width=800&text=Booking+Agents"
    >
      <ListingsGrid
        listings={listings}
        category="Booking Agents"
        emptyMessage="No booking agent listings available at the moment"
      />
    </CategoryLayout>
  )
}
