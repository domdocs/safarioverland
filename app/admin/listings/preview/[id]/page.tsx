import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { ListingDetail } from "@/components/editorial/listing-detail"
import { StickyCTA } from "@/components/editorial/sticky-cta"
import { PreviewBanner } from "@/components/admin/preview-banner"
import { getListingForAdmin, getListingsByCategory } from "@/lib/listings"

interface PreviewPageProps {
  params: Promise<{ id: string }>
}

// Search engines should never index admin surfaces. Belt-and-braces —
// Basic Auth already blocks the path, but if that ever drops this
// stays no-indexed.
export const metadata: Metadata = {
  title: "Listing preview · admin",
  robots: { index: false, follow: false },
}

/**
 * /admin/listings/preview/[id]
 *
 * Renders any listing — pending, approved, or rejected — using the
 * same EditorialHeader + ListingDetail + EditorialFooter stack the
 * public page uses, with a sticky admin banner at the top so the
 * reviewer can see what the public page will look like once approved.
 *
 * Auth: covered by the existing /admin/* Basic Auth middleware.
 */
export default async function ListingPreviewPage({ params }: PreviewPageProps) {
  const { id } = await params
  const listing = await getListingForAdmin(id)
  if (!listing) notFound()

  // Related listings — same shape as the public page so the layout
  // stays representative. Filters to approved siblings (we want the
  // reviewer to see what the public "Adjacent" rail will look like).
  const related = (await getListingsByCategory(listing.category, 4))
    .filter((r) => r.id !== listing.id)
    .slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <PreviewBanner
        status={listing.status}
        editHref={`/admin/listings/edit/${listing.id}`}
      />
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
