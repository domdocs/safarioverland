import { notFound } from "next/navigation"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { ListingEditForm } from "@/components/listing-edit-form"
import { OutreachSection } from "@/components/admin/outreach-section"
import { Button } from "@/components/ui/button"
import { getListingForAdmin } from "@/lib/listings"

interface EditListingPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditListingPage({ params }: EditListingPageProps) {
  const { id } = await params
  const listing = await getListingForAdmin(id)

  if (!listing) {
    notFound()
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Edit Listing</h1>
          <p className="text-gray-600">
            Make changes to the listing information below.
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Button asChild variant="outline">
            <Link
              href={`/admin/listings/preview/${listing.id}`}
              target="_blank"
              rel="noopener"
              data-testid="preview-listing-link"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Preview
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground">
            Preview reflects the last saved version, not your current
            edits.
          </p>
        </div>
      </div>

      <ListingEditForm listing={listing} />

      <OutreachSection
        listing={{
          id: listing.id,
          listing_name: listing.listing_name,
          contact_name: listing.contact_name,
          contact_email: listing.contact_email,
          status: listing.status,
          featured: listing.featured,
          editor_notes: listing.editor_notes,
        }}
      />
    </div>
  )
}
