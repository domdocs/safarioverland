import { notFound } from "next/navigation"
import { getListingById, getListingsByCategory } from "@/lib/listings"
import { ListingDetail } from "@/components/listing-detail"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata, ResolvingMetadata } from "next"

interface ListingPageProps {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: ListingPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Properly await the parent metadata
  const previousMetadata = await parent
  
  // Fetch the listing data
  const id = await Promise.resolve(params.id)
  const listing = await getListingById(id)

  if (!listing) {
    return {
      title: "Listing Not Found",
      description: "The requested safari listing could not be found.",
    }
  }

  return {
    title: `${listing.listing_name} | Safari Overland Directory`,
    description: listing.description.substring(0, 160),
    metadataBase: new URL("http://localhost:3000"),
    openGraph: {
      title: listing.listing_name,
      description: listing.description.substring(0, 160),
      images: [listing.image_url || "/placeholder.svg?height=600&width=1200"],
    },
  }
}

export default async function ListingPage({
  params,
  searchParams,
}: ListingPageProps) {
  // Fetch the listing data
  const id = await Promise.resolve(params.id)
  const listing = await getListingById(id)

  if (!listing) {
    notFound()
  }

  // Fetch related listings
  const relatedListings = await getListingsByCategory(listing.category, 3)
  const filteredRelatedListings = relatedListings.filter(
    (related) => related.id !== listing.id,
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ListingDetail listing={listing} relatedListings={filteredRelatedListings} />
      </main>
      <Footer />
    </div>
  )
}
