import type { ReactNode } from "react"
import { ListingImage } from "@/components/listing-image"
import { Eyebrow } from "./eyebrow"
import { CategoryTabStrip } from "./category-tab-strip"
import { buildCategoryTabs } from "@/lib/category-tabs"

type Props = {
  /** Slug of the active category, or null for the parent /categories page. */
  activeSlug: string | null
  /** Display title — typically just the category name. */
  title: string
  /** Italic lede shown below the title; usually 1–2 sentences. */
  description: string
  /** Hero image. Falls back to category icon if absent. */
  image?: string | null
  /** Numeric label for the category, e.g. "01 / 09". Optional. */
  index?: number
  total?: number
  children: ReactNode
}

/**
 * Editorial shell for category index pages. Replaces components/category-layout.tsx.
 *
 *  - Cinematic hero band with category image and title block
 *  - Sticky tab strip directly under the header
 *  - Body slot for the listings grid
 */
export function CategoryPageShell({
  activeSlug,
  title,
  description,
  image,
  index,
  total,
  children,
}: Props) {
  const tabs = buildCategoryTabs(activeSlug)

  return (
    <>
      {/* Hero band */}
      <section className="relative h-[48vh] min-h-[360px] w-full overflow-hidden bg-night">
        <ListingImage
          src={image ?? null}
          alt={title}
          category={activeSlug}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-night/40 via-transparent to-night"
        />
        <div className="container relative h-full flex flex-col justify-end pb-12">
          <Eyebrow withRule>
            {index !== undefined && total !== undefined
              ? `${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")} · Categories`
              : "Categories"}
          </Eyebrow>
          <h1 className="mt-4 font-serif text-h1-fluid text-bone leading-tight tracking-tight text-balance max-w-3xl">
            {title}
          </h1>
          <p className="mt-4 font-serif italic text-h4-fluid text-bone-mute max-w-2xl">
            {description}
          </p>
        </div>
      </section>

      <CategoryTabStrip tabs={tabs} />

      <section className="container py-16 md:py-20">{children}</section>
    </>
  )
}
