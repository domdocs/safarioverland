import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { ListingsGrid } from "@/components/listings-grid"

export const metadata: Metadata = {
  title: "Safari Lodges | Safari Overland Directory",
  description:
    "Discover the finest safari lodges across Africa, from luxury tented camps to exclusive private reserves.",
}

export default async function LodgesPage() {
  // Use the async function to get real data from Supabase
  const listings = await getListingsByCategory("lodges", 100)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Safari Lodges</h1>
        <p className="text-gray-600">
          Discover the finest safari lodges across Africa, from luxury tented camps to exclusive private reserves.
        </p>
      </div>

      <ListingsGrid listings={listings} category="Safari Lodges" />
    </div>
  )
}
