import { notFound } from "next/navigation"

import { ListingEditForm } from "@/components/listing-edit-form"
import { OutreachSection } from "@/components/admin/outreach-section"
import { getListingById } from "@/lib/listings"

interface EditListingPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditListingPage({ params }: EditListingPageProps) {
  const { id } = await params
  const listing = await getListingById(id)

  if (!listing) {
    notFound()
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Listing</h1>
        <p className="text-gray-600">
          Make changes to the listing information below.
        </p>
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
