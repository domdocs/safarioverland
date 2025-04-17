"use client"

import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { getListings, getListingCount } from "@/lib/listings"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ListingsPagination } from "@/components/listings-pagination"
import { useEffect, useState } from "react"
import type { DirectoryListing } from "@/lib/listings"

const ITEMS_PER_PAGE = 20

export default function PendingListingsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const [listings, setListings] = useState<DirectoryListing[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const [fetchedListings, totalCount] = await Promise.all([
          getListings({
            status: "pending",
            limit: ITEMS_PER_PAGE,
            offset: (page - 1) * ITEMS_PER_PAGE,
          }),
          getListingCount("pending"),
        ])

        setListings(fetchedListings)
        setTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE))
      } catch (error) {
        console.error("Error fetching listings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page])

  const handlePageChange = (newPage: number) => {
    router.push(`/admin/pending?page=${newPage}`)
  }

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
          {loading ? (
            <div className="text-center py-8">Loading listings...</div>
          ) : (
            <>
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
              <ListingsPagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
