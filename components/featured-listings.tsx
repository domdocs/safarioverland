import { getFeaturedListings } from "@/lib/listings"
import { ListingsGrid } from "./listings-grid"

// This is a server component that fetches the data
export async function FeaturedListings() {
  const featuredListings = getFeaturedListings()
  return <ListingsGrid listings={featuredListings} emptyMessage="No featured listings available at the moment" />
}

// This is a wrapper component that can be used with Suspense
export function FeaturedListingsWrapper() {
  return <FeaturedListings />
}
