import Link from "next/link"

import {
  getRelatedListings,
  type RelatedListingsOpts,
} from "@/lib/content/related"

type Props = RelatedListingsOpts & {
  heading?: string
}

/**
 * Surface 3-4 related listings — notably NOT `<RelatedLodges />`
 * because the route is `/listings/[id]`, not `/lodges/[slug]` (the
 * brief's idealised path is deferred).
 *
 * Anchor text is the listing name (a keyword-bearing brand-name),
 * not "View listing".
 */
export async function RelatedListings({
  heading = "Where we'd send you",
  country,
  region,
  category,
  excludeId,
  limit = 4,
}: Props) {
  const listings = await getRelatedListings({
    country,
    region,
    category,
    excludeId,
    limit,
  })
  if (listings.length === 0) return null
  return (
    <section
      className="my-12 container mx-auto px-4"
      aria-labelledby="related-listings-heading"
    >
      <h2
        id="related-listings-heading"
        className="font-serif text-h3-fluid mb-4 text-bone"
      >
        {heading}
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {listings.map((l) => (
          <li key={l.id}>
            <Link
              href={`/listings/${l.id}`}
              className="block hover:bg-card p-3 -mx-3 rounded transition-colors"
            >
              <div className="font-medium text-bone">{l.listing_name}</div>
              <div className="text-sm text-bone-mute mt-1">
                {[l.location, l.country].filter(Boolean).join(", ")}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
