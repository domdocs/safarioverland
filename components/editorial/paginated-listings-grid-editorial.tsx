"use client"

import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { ListingCardEditorial } from "./listing-card-editorial"
import { getListingsByCategory } from "@/lib/listings"
import type { DirectoryListing } from "@/lib/listings"

type Props = {
  initialListings: DirectoryListing[]
  /** Slug used for "load more" pagination calls. */
  categorySlug: string
  /** Eyebrow shown on each card. */
  eyebrow?: string
  /** Page size used by the load-more handler. */
  pageSize?: number
  emptyMessage?: string
  /** Continue numbering from this index across page loads. */
  startAt?: number
}

/**
 * Editorial paginated grid — replaces components/paginated-listings-grid.tsx
 * for Phase 2+ category pages.
 *
 * Two-column on lg+ via ListingCardEditorial's internal layout (image left,
 * copy right per card), single column on mobile.
 *
 * Auto-numbers cards 01, 02, 03, … across both initial render and
 * load-more pages.
 */
export function PaginatedListingsGridEditorial({
  initialListings,
  categorySlug,
  eyebrow,
  pageSize = 6,
  emptyMessage = "No listings yet — check back soon.",
  startAt = 1,
}: Props) {
  const [listings, setListings] = useState<DirectoryListing[]>(initialListings)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialListings.length >= pageSize)
  const [page, setPage] = useState(1)

  const loadMore = useCallback(async () => {
    setIsLoading(true)
    try {
      const offset = page * pageSize
      const next = await getListingsByCategory(categorySlug, pageSize, offset)
      if (next.length > 0) {
        setListings((prev) => [...prev, ...next])
        setPage((p) => p + 1)
        setHasMore(next.length >= pageSize)
      } else {
        setHasMore(false)
      }
    } catch (err) {
      console.error("Error loading more listings:", err)
    } finally {
      setIsLoading(false)
    }
  }, [page, pageSize, categorySlug])

  if (listings.length === 0) {
    return (
      <div className="border border-rule p-12 text-center">
        <p className="font-serif italic text-h4-fluid text-bone-mute">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <div>
        {listings.map((listing, i) => {
          const lede = listing.description
            ? listing.description.split(/(?<=[.?!])\s/).slice(0, 1).join(" ")
            : undefined
          const location =
            listing.location && listing.country && listing.location !== listing.country
              ? `${listing.location} · ${listing.country}`
              : listing.location || listing.country
          return (
            <ListingCardEditorial
              key={listing.id}
              href={`/listings/${listing.id}`}
              index={startAt + i}
              eyebrow={eyebrow ?? listing.category}
              title={listing.listing_name}
              lede={lede}
              location={location}
              imageUrl={listing.image_url}
              category={listing.category}
              price={listing.price_info || undefined}
            />
          )
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button
            onClick={loadMore}
            disabled={isLoading}
            variant="outline"
            className="rounded-none px-8 py-6 mono"
          >
            {isLoading ? "Loading…" : "Load more"}
          </Button>
        </div>
      )}
    </div>
  )
}
