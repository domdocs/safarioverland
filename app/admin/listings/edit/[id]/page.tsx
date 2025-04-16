import { ListingEditForm } from "@/components/listing-edit-form"
import { getListingById } from "@/lib/listings"
import { notFound } from "next/navigation"

interface EditListingPageProps {
  params: {
    id: string
  }
}

export default async function EditListingPage({ params }: EditListingPageProps) {
  const id = await Promise.resolve(params.id)
  const listing = await getListingById(id)

  if (!listing) {
    return notFound()
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
    </div>
  )
}
