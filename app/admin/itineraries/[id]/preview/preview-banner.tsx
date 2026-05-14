"use client"

import Link from "next/link"

type Props = {
  itineraryId: string
  reference: string
  status: "draft" | "published" | "archived"
}

/**
 * Sticky banner at the top of the preview document. Mono caps, amber on
 * ink — matches the listing preview's banner aesthetic. Hidden in
 * @media print via preview-styles.css.
 */
export function PreviewBanner({ itineraryId, reference, status }: Props) {
  return (
    <div className="preview-banner">
      <span>Preview</span>
      <span className="sep">·</span>
      <span>{status}</span>
      <span className="sep">·</span>
      <span>{reference}</span>
      <span className="sep">·</span>
      <Link href={`/admin/itineraries/${itineraryId}/edit`}>← Back to edit</Link>
      <span className="sep">·</span>
      <button type="button" onClick={() => window.print()}>
        Print this page
      </button>
    </div>
  )
}
