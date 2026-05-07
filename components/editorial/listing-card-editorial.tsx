import Link from "next/link"
import { ListingImage } from "@/components/listing-image"
import { cn } from "@/lib/utils"

type ListingCardEditorialProps = {
  href: string
  /** Two-digit numeric label rendered top-left, e.g. "01". */
  index?: number | string
  /** Eyebrow line — typically category name. */
  eyebrow?: string
  title: string
  /** Short verdict / lede; usually 1–2 sentences. */
  lede?: string
  /** Location line under the title. */
  location?: string
  /** Image URL — falls back to ListingImage's category icon block. */
  imageUrl?: string | null
  /** Used by ListingImage to pick the fallback icon. */
  category?: string | null
  /** Optional price line rendered bottom-right. */
  price?: string
  className?: string
}

function formatIndex(index: number | string | undefined): string | undefined {
  if (index === undefined) return undefined
  if (typeof index === "string") return index
  return index.toString().padStart(2, "0")
}

/**
 * Editorial listing card — replaces components/listing-card.tsx for index pages.
 *
 * Two-column layout on lg+ (image left, copy right). Stacks on mobile.
 * Optional numeric label, eyebrow, italic lede, location strapline, price.
 *
 * Used by listings index, related-listings rails, search results.
 */
export function ListingCardEditorial({
  href,
  index,
  eyebrow,
  title,
  lede,
  location,
  imageUrl,
  category,
  price,
  className,
}: ListingCardEditorialProps) {
  const indexLabel = formatIndex(index)

  return (
    <Link
      href={href}
      className={cn(
        "group block border-t border-rule pt-8 pb-12 transition-colors hover:border-amber",
        className,
      )}
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        {/* Image */}
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden bg-card">
            <ListingImage
              src={imageUrl}
              alt={title}
              category={category}
              className="transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Copy */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-baseline gap-4 mb-4">
            {indexLabel && (
              <span className="mono text-amber" aria-hidden>
                {indexLabel}
              </span>
            )}
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          </div>

          <h3 className="font-serif text-h3-fluid text-bone leading-tight text-balance group-hover:text-amber transition-colors">
            {title}
          </h3>

          {lede && (
            <p className="mt-4 text-bone-mute leading-relaxed max-w-2xl">{lede}</p>
          )}

          <div className="mt-auto pt-6 flex flex-wrap items-center justify-between gap-4">
            {location && (
              <p className="mono text-bone-mute">{location}</p>
            )}
            {price && (
              <p className="font-serif italic text-amber text-lg">{price}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
