"use client"

// ============================================================================
// components/editorial/sticky-cta.tsx
//
// Mobile-only sticky bottom bar with price + primary CTA.
// Shown on listing-detail (and trip-builder summary) pages.
// Hidden on lg+ where the desktop CTA in the contact block does the job.
//
// When `tracking` is provided, the CTA fires the `add-to-brief-click`
// analytics event on click. When omitted, renders an untracked Link
// (preserves the design-review preview + any future non-listing uses).
// ============================================================================

import Link from "next/link"

import { AddToBriefLink } from "@/components/analytics/add-to-brief-link"

interface StickyCTAProps {
  href: string
  price?: string
  label?: string
  /** Listing metadata — when set, the click fires `add-to-brief-click`. */
  tracking?: {
    listingId: string
    listingName: string
    category: string
    region: string
  }
}

export function StickyCTA({
  href,
  price,
  label = "Add to plan",
  tracking,
}: StickyCTAProps) {
  const cta = tracking ? (
    <AddToBriefLink
      href={href}
      listingId={tracking.listingId}
      listingName={tracking.listingName}
      category={tracking.category}
      region={tracking.region}
      className="bg-amber px-6 py-4 mono font-semibold text-night transition hover:bg-amber-deep"
    >
      {label} →
    </AddToBriefLink>
  ) : (
    <Link
      href={href}
      className="bg-amber px-6 py-4 mono font-semibold text-night transition hover:bg-amber-deep"
    >
      {label} →
    </Link>
  )

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-rule bg-night/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center gap-4 px-4 py-3">
        <div className="flex-1">
          {price ? (
            <>
              <p className="mono text-[10px] text-bone-mute">From</p>
              <p className="font-serif text-2xl italic leading-none text-amber">
                {price}
              </p>
            </>
          ) : (
            <p className="font-serif text-lg italic text-bone-mute">
              Like the look of this?
            </p>
          )}
        </div>
        {cta}
      </div>
    </div>
  )
}
