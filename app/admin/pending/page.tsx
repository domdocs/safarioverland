import Link from "next/link"
import { getPendingListings } from "@/lib/listings"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata = {
  title: "Pending Listings | Admin Dashboard",
  description: "Review and approve pending listings in the Safari Overland Directory.",
}

export default async function PendingListingsPage() {
  const pendingListings = await getPendingListings()

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pending Listings</h1>
        <Link href="/admin/listings">
          <Button variant="outline">View Approved Listings</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Listing Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingListings.length > 0 ? (
                pendingListings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell className="font-medium">{listing.listing_name}</TableCell>
                    <TableCell>
                      {listing.category
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </TableCell>
                    <TableCell>
                      {listing.location}, {listing.country}
                    </TableCell>
                    <TableCell>{new Date(listing.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/listings/edit/${listing.id}`}>
                          <Button variant="outline" size="sm">
                            Review
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No pending listings found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
