import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"

import { getListingById, getListingsByCategory } from "@/lib/listings"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { StickyCTA } from "@/components/editorial/sticky-cta"
import { ListingDetail } from "@/components/editorial/listing-detail"

interface ListingPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params }: ListingPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  await parent

  const { id } = await params
  const listing = await getListingById(id)

  // Public surface — only approved listings get rendered or appear in
  // page metadata. Pending/rejected rows must 404 (admin preview is at
  // /admin/listings/preview/[id]).
  if (!listing || listing.status !== "approved") {
    return {
      title: "Listing not found",
      description: "The requested safari listing could not be found.",
    }
  }

  return {
    title: `${listing.listing_name} | Safari Overland`,
    description: listing.description?.substring(0, 160),
    openGraph: {
      title: listing.listing_name,
      description: listing.description?.substring(0, 160),
      images: listing.image_url ? [listing.image_url] : [],
    },
  }
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params
  const listing = await getListingById(id)
  // Public surface — same gate as the metadata branch.
  if (!listing || listing.status !== "approved") notFound()

  const related = (await getListingsByCategory(listing.category, 4))
    .filter((r) => r.id !== listing.id)
    .slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />

      <ListingDetail listing={listing} related={related} />

      <EditorialFooter />

      <StickyCTA
        href={`/plan?listing=${listing.id}`}
        price={listing.price_info || undefined}
        label="Add to a brief"
      />
    </div>
  )
}
