"use client"

// ============================================================================
// components/editorial/sticky-cta.tsx
//
// Mobile-only sticky bottom bar with price + primary CTA.
// Shown on listing-detail (and trip-builder summary) pages.
// Hidden on lg+ where the desktop CTA in the contact block does the job.
// ============================================================================

import Link from "next/link"

interface StickyCTAProps {
  href: string
  price?: string
  label?: string
}

export function StickyCTA({ href, price, label = "Add to plan" }: StickyCTAProps) {
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
        <Link
          href={href}
          className="bg-amber px-6 py-4 mono font-semibold text-night transition hover:bg-amber-deep"
        >
          {label} →
        </Link>
      </div>
    </div>
  )
}
