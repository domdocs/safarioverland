import Link from "next/link"
import { ListingImage } from "@/components/listing-image"

interface ListingCardProps {
  listing: any
}

export function ListingCard({ listing }: ListingCardProps) {
  // Use default values for all properties to prevent undefined errors
  const {
    id = "",
    listing_name = "Unnamed Listing",
    location = "Unknown Location",
    description = "No description available",
    price_info = "Price information unavailable",
    image_url = null,
    category,
  } = listing || {}

  // Truncate description to a reasonable length
  const truncatedDescription = description.length > 120 ? `${description.substring(0, 120)}...` : description

  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
      <Link href={`/listings/${id}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <ListingImage src={image_url} alt={listing_name} category={category} />
        </div>
        <div className="p-4">
          <h3 className="mb-1 text-lg font-semibold">{listing_name}</h3>
          <p className="mb-2 text-sm text-gray-500">{location}</p>
          <p className="mb-3 text-sm text-gray-600">{truncatedDescription}</p>
          <p className="text-sm font-medium text-primary">{price_info}</p>
        </div>
      </Link>
    </div>
  )
}
