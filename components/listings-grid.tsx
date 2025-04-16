import { ListingCard } from "./listing-card"

interface ListingsGridProps {
  listings: any[]
  category: string
  emptyMessage?: string
}

export function ListingsGrid({ listings = [], category, emptyMessage = "No listings found" }: ListingsGridProps) {
  // Ensure listings is an array before trying to map over it
  const listingsArray = Array.isArray(listings) ? listings : []

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{category} Listings</h2>

      {listingsArray.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listingsArray.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  )
}
