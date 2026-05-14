import type { Metadata } from "next"
import Link from "next/link"

import { getActiveCategories } from "@/lib/categories"
import { StartBriefLink } from "@/components/analytics/start-brief-link"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { CategoryTabStrip } from "@/components/editorial/category-tab-strip"
import { buildCategoryTabs } from "@/lib/category-tabs"

export const metadata: Metadata = {
  title: "Categories | Safari Overland",
  description:
    "Browse the collection by category. Categories with at least one listing show here; the rest retire until they earn their place back.",
}

// Re-fetched on every request — categories appear and disappear as
// listings are approved or rejected, and we want that to be visible
// immediately rather than waiting on a revalidation window.
export const revalidate = 0
export const dynamic = "force-dynamic"

export default async function CategoriesPage() {
  const categories = await getActiveCategories()
  const tabs = buildCategoryTabs(
    null,
    categories.map((c) => c.slug),
  )
  const total = categories.length
  const totalLabel = String(total).padStart(2, "0")
  const sectionWord = total === 1 ? "section" : "sections"

  return (
    <>
      <section className="container py-16 md:py-20">
        <div className="max-w-3xl">
          <Eyebrow withRule>
            {total > 0
              ? `Categories — ${totalLabel} ${sectionWord}`
              : "Categories — coming soon"}
          </Eyebrow>
          <h1 className="mt-6 font-serif text-h1-fluid text-bone leading-tight tracking-tight text-balance">
            The collection by category.
          </h1>
          <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-2xl">
            Browse by what you need — a place to stay, a vehicle, a guide,
            a flight, an adventure. Categories appear here once at least
            one property has earned a place.
          </p>
        </div>
      </section>

      <CategoryTabStrip tabs={tabs} />

      <section className="container py-16 md:py-20">
        {categories.length === 0 ? (
          <div
            className="border border-rule p-12 text-center"
            data-testid="categories-empty"
          >
            <p className="font-serif italic text-h4-fluid text-bone-mute">
              The kept list is still forming.
            </p>
            <p className="mt-6 text-bone-mute leading-relaxed max-w-xl mx-auto">
              When a property earns a place on the collection, its
              category will appear here. In the meantime, send a brief
              and we'll draft you three routes by hand.
            </p>
            <div className="mt-10">
              <StartBriefLink
                source="categories-empty"
                className="inline-flex items-center gap-2 mono text-amber hover:text-amber-deep transition-colors"
              >
                Send a brief →
              </StartBriefLink>
            </div>
          </div>
        ) : (
          <div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            data-testid="categories-grid"
          >
            {categories.map((category, i) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group block border border-rule bg-card p-8 transition-colors hover:border-amber"
              >
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="mono text-amber" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Eyebrow>Category</Eyebrow>
                </div>
                <h2 className="font-serif text-h3-fluid text-bone leading-tight transition-colors group-hover:text-amber mb-3">
                  {category.name}
                </h2>
                <p className="text-bone-mute leading-relaxed mb-6">
                  {category.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="mono text-bone-mute">
                    {category.count}{" "}
                    {category.count === 1 ? "listing" : "listings"}
                  </span>
                  <span className="mono text-amber transition-colors group-hover:text-amber-deep">
                    View →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
