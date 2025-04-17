"use client"

import { useCallback, useEffect, useState } from "react"
import { ListingsGrid } from "./listings-grid"
import { Button } from "./ui/button"
import { getListingsByCategory } from "@/lib/listings"
import type { DirectoryListing } from "@/lib/listings"

interface PaginatedListingsGridProps {
  initialListings: DirectoryListing[]
  category: string
  categorySlug: string
  emptyMessage?: string
}

export function PaginatedListingsGrid({
  initialListings,
  category,
  categorySlug,
  emptyMessage = "No listings found",
}: PaginatedListingsGridProps) {
  const [listings, setListings] = useState<DirectoryListing[]>(initialListings)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialListings.length >= 6)
  const [page, setPage] = useState(1)

  const loadMore = useCallback(async () => {
    setIsLoading(true)
    try {
      const nextPage = page + 1
      const offset = page * 6
      const newListings = await getListingsByCategory(categorySlug, 6, offset)
      
      if (newListings.length > 0) {
        setListings(prev => [...prev, ...newListings])
        setPage(nextPage)
        setHasMore(newListings.length >= 6)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error("Error loading more listings:", error)
    } finally {
      setIsLoading(false)
    }
  }, [page, categorySlug])

  return (
    <div className="space-y-8">
      <ListingsGrid
        listings={listings}
        category={category}
        emptyMessage={emptyMessage}
      />
      
      {hasMore && (
        <div className="flex justify-center">
          <Button
            onClick={loadMore}
            disabled={isLoading}
            variant="outline"
            className="min-w-[200px]"
          >
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  )
} 