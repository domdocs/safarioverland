import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getFeaturedListings } from "@/lib/listings"
import type { DirectoryListing } from "@/lib/listings"
import { ListingImage } from "@/components/listing-image"

// This is a server component that fetches the data
export async function FeaturedListings() {
  try {
    console.log('Fetching featured listings...')
    const listings = await getFeaturedListings(4)
    console.log(`Successfully fetched ${listings.length} featured listings`)

    if (!listings || listings.length === 0) {
      console.log('No featured listings found')
      return (
        <div className="text-center py-8">
          <p className="text-bone-mute">No featured listings available at the moment.</p>
        </div>
      )
    }

    return (
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {listings.map((listing) => (
          <Link href={`/listings/${listing.id}`} key={listing.id} className="group">
            <Card className="overflow-hidden border-rule transition-colors duration-200 hover:border-amber">
              <div className="relative h-48 overflow-hidden">
                <ListingImage
                  src={listing.image_url}
                  alt={listing.listing_name}
                  category={listing.category}
                  className="transition-transform duration-200 group-hover:scale-105"
                />
                {listing.featured && (
                  <Badge className="absolute right-2 top-2 bg-primary text-primary-foreground hover:bg-amber-deep">
                    Featured
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="line-clamp-1 text-lg font-serif text-bone transition-colors group-hover:text-amber">
                  {listing.listing_name}
                </h3>
                <p className="line-clamp-1 text-sm text-bone-mute">
                  {listing.location}, {listing.country}
                </p>
                <div className="mt-2 flex items-center">
                  <Badge variant="outline" className="text-xs border-rule text-bone-mute">
                    {listing.category}
                  </Badge>
                  <div className="ml-auto text-sm font-medium text-bone">
                    {listing.price_info ? `${listing.price_info.substring(0, 20)}...` : "Contact for pricing"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    )
  } catch (error) {
    console.error('Error in FeaturedListings:', error)
    return (
      <div className="text-center py-8">
        <p className="text-bone-mute">Unable to load featured listings. Please try again later.</p>
      </div>
    )
  }
}

// This is a wrapper component that can be used with Suspense
export function FeaturedListingsWrapper() {
  return <FeaturedListings />
}
