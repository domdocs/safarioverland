import type { Metadata } from "next"
import Link from "next/link"
import { getCategories } from "@/lib/listings"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { CategoryTabStrip } from "@/components/editorial/category-tab-strip"
import { buildCategoryTabs } from "@/lib/category-tabs"

type Category = {
  name: string
  slug: string
  description: string
  count?: number
}

export const metadata: Metadata = {
  title: "All Categories | Safari Overland",
  description:
    "Browse the full directory by category — lodges, campsites, guided tours, 4×4 rentals and more.",
}

export const revalidate = 0
export const dynamic = "force-dynamic"

export default async function CategoriesPage() {
  const categories = (await getCategories()) as Category[]
  const tabs = buildCategoryTabs(null)

  return (
    <>
      <section className="container py-16 md:py-20">
        <div className="max-w-3xl">
          <Eyebrow withRule>Categories — 09 sections</Eyebrow>
          <h1 className="mt-6 font-serif text-h1-fluid text-bone leading-tight tracking-tight text-balance">
            Everything in the directory.
          </h1>
          <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-2xl">
            Browse by what you need — a place to stay, a vehicle, a guide, a flight, an adventure.
            Each section is curated, reviewed, and reachable.
          </p>
        </div>
      </section>

      <CategoryTabStrip tabs={tabs} />

      <section className="container py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
              <p className="text-bone-mute leading-relaxed mb-6">{category.description}</p>
              <div className="flex justify-between items-center">
                <span className="mono text-bone-mute">
                  {category.count !== undefined
                    ? `${category.count} listings`
                    : "Browse listings"}
                </span>
                <span className="mono text-amber transition-colors group-hover:text-amber-deep">
                  View →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
