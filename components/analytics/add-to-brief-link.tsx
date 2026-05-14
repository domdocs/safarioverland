"use client"

import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"

import { track } from "@/lib/analytics/track"

type Props = Omit<ComponentProps<typeof Link>, "onClick"> & {
  listingId: string
  listingName: string
  /** Category slug or label — passed through verbatim to the dashboard. */
  category: string
  /**
   * Region label — country or continental bucket. Whatever the listing
   * surfaces is fine; "Zimbabwe", "Southern Africa", and "—" all read
   * usefully in the dashboard.
   */
  region: string
  children: ReactNode
}

/**
 * Client-side wrapper around a Next `<Link>` that fires the
 * `add-to-brief-click` event when someone clicks "Add to a brief" from
 * a listing-detail page.
 *
 * Designed for the desktop CTA + mobile sticky CTA on `/listings/[id]`.
 * Pre-fills the listing-id query param onto `/plan` so the resulting
 * brief carries `has_source_listing: true`.
 */
export function AddToBriefLink({
  listingId,
  listingName,
  category,
  region,
  children,
  ...rest
}: Props) {
  return (
    <Link
      onClick={() =>
        track("add-to-brief-click", {
          listing_id: listingId,
          listing_name: listingName,
          category,
          region,
        })
      }
      {...rest}
    >
      {children}
    </Link>
  )
}
