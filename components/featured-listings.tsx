import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getFeaturedListings } from "@/lib/listings"
import type { DirectoryListing } from "@/lib/listings"

// This is a server component that fetches the data
export async function FeaturedListings() {
  const listings = await getFeaturedListings(4)

  return (
    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {listings.map((listing) => (
        <Link href={`/listings/${listing.id}`} key={listing.id} className="group">
          <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
            <div className="relative h-48 overflow-hidden">
              <img
                src={listing.image_url || "/placeholder.svg?height=300&width=400"}
                alt={listing.listing_name}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
              {listing.featured && (
                <Badge className="absolute right-2 top-2 bg-orange-500 hover:bg-orange-600">Featured</Badge>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="line-clamp-1 text-lg font-semibold text-gray-900 group-hover:text-orange-600">
                {listing.listing_name}
              </h3>
              <p className="line-clamp-1 text-sm text-gray-500">
                {listing.location}, {listing.country}
              </p>
              <div className="mt-2 flex items-center">
                <Badge variant="outline" className="text-xs">
                  {listing.category}
                </Badge>
                <div className="ml-auto text-sm font-medium text-gray-900">
                  {listing.price_info ? `${listing.price_info.substring(0, 20)}...` : "Contact for pricing"}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

// This is a wrapper component that can be used with Suspense
export function FeaturedListingsWrapper() {
  return <FeaturedListings />
}
