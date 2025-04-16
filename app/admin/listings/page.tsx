import Link from "next/link"
import { getListings } from "@/lib/listings"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Manage Listings | Admin Dashboard",
  description: "Manage all directory listings in the Safari Overland Directory.",
}

export default async function AdminListingsPage() {
  const listings = await getListings({ status: "approved", limit: 50 })

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Listings</h1>
        <Link href="/admin/pending">
          <Button variant="outline">View Pending Listings</Button>
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
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.length > 0 ? (
                listings.map((listing) => (
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
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell>{listing.featured ? "Yes" : "No"}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/admin/listings/edit/${listing.id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No listings found
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
