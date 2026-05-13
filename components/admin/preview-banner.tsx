import Link from "next/link"

import type { ListingStatus } from "@/lib/listings"
import { cn } from "@/lib/utils"

type Props = {
  status: ListingStatus
  editHref: string
}

const STATUS_TONE: Record<ListingStatus, string> = {
  // Amber for the in-progress state (the case we're optimising for —
  // editorial review pre-approval).
  pending: "bg-amber/20 text-amber border-amber/40",
  // Green for approved — a positive confirmation that this is what the
  // public will see.
  approved: "bg-emerald-200/20 text-emerald-300 border-emerald-300/40",
  // Red for rejected — clearly distinct so reviewer doesn't confuse with
  // pending.
  rejected: "bg-red-200/20 text-red-300 border-red-300/40",
}

/**
 * Sticky banner shown at the top of /admin/listings/preview/[id]. Mono
 * font, restrained dark surface, amber/green/red status pill so the
 * reviewer sees the state at a glance even while scrolling through the
 * preview.
 *
 * Rendered above the public ListingDetail so the editorial layout
 * underneath stays untouched.
 */
export function PreviewBanner({ status, editHref }: Props) {
  return (
    <div
      role="region"
      aria-label="Admin preview banner"
      className="sticky top-0 z-[100] w-full border-b border-rule bg-night/95 backdrop-blur"
    >
      <div className="container flex h-12 items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 mono uppercase tracking-wider">
          <span className="text-bone-mute">Preview</span>
          <span className="text-bone-mute" aria-hidden>
            ·
          </span>
          <span className="text-bone-mute">Status:</span>
          <span
            className={cn(
              "border px-2 py-0.5",
              STATUS_TONE[status],
            )}
            data-testid="preview-status-pill"
          >
            {status}
          </span>
        </div>
        <Link
          href={editHref}
          className="mono uppercase tracking-wider text-bone-mute hover:text-amber transition-colors"
        >
          ← Back to edit form
        </Link>
      </div>
    </div>
  )
}
