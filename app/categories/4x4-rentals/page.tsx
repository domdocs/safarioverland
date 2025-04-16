import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { ListingsGrid } from "@/components/listings-grid"

export const metadata: Metadata = {
  title: "4x4 Rentals for Safari Adventures | Safari Overland Directory",
  description:
    "Find the perfect 4x4 vehicle for your self-drive safari adventure, fully equipped with everything you need for off-road exploration.",
}

export default async function FourByFourRentalsPage() {
  // Use the async function to get real data from Supabase
  const listings = await getListingsByCategory("4x4-rentals", 100)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-bold mb-4">4x4 Rentals for Safari Adventures</h1>
        <p className="text-gray-600">
          Find the perfect 4x4 vehicle for your self-drive safari adventure, fully equipped with everything you need for
          off-road exploration.
        </p>
      </div>

      <ListingsGrid listings={listings} category="4x4 Rentals" />
    </div>
  )
}
