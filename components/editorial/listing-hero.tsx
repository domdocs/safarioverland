import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { ListingImage } from "@/components/listing-image"
import { Eyebrow } from "./eyebrow"
import { cn } from "@/lib/utils"

export type Breadcrumb = { href: string; label: string }

type ListingHeroProps = {
  breadcrumbs: Breadcrumb[]
  category?: string | null
  title: string
  /** Short verdict / lede shown below the title; usually 1–2 sentences. */
  lede?: string
  imageUrl?: string | null
  /** Optional location strapline rendered in mono above the title. */
  location?: string
  className?: string
}

/**
 * 72vh full-bleed hero for listing detail pages.
 *
 *  - Background image with a black gradient for legibility
 *  - Breadcrumb nav top-left
 *  - Eyebrow + serif title + optional lede bottom-left
 *
 * Server Component. Image fallback handled by ListingImage.
 */
export function ListingHero({
  breadcrumbs,
  category,
  title,
  lede,
  imageUrl,
  location,
  className,
}: ListingHeroProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-night",
        "min-h-[72vh] flex flex-col",
        className,
      )}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <ListingImage src={imageUrl} alt={title} category={category} />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/30"
        />
      </div>

      {/* Foreground content */}
      <div className="relative flex-1 container flex flex-col">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="pt-8">
          <ol className="flex flex-wrap items-center gap-2 mono text-bone-mute">
            {breadcrumbs.map((crumb, i) => (
              <li key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="h-3 w-3" aria-hidden />}
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-bone" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-amber transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Title block, pinned to bottom */}
        <div className="mt-auto py-16 max-w-3xl">
          {location && (
            <p className="mono text-bone-mute mb-3">{location}</p>
          )}
          {category && <Eyebrow className="mb-4">{category}</Eyebrow>}
          <h1 className="font-serif text-h1-fluid text-bone leading-tight text-balance">
            {title}
          </h1>
          {lede && (
            <p className="mt-6 max-w-2xl text-h4-fluid font-serif italic text-bone-mute leading-snug">
              {lede}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
