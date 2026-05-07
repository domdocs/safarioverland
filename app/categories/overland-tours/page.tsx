import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { CategoryPageShell } from "@/components/editorial/category-page-shell"
import { PaginatedListingsGridEditorial } from "@/components/editorial/paginated-listings-grid-editorial"

export const metadata: Metadata = {
  title: "Overland Tours | Safari Overland",
  description:
    "Multi-country overland adventures across diverse African landscapes.",
}

export const dynamic = "force-dynamic"

export default async function OverlandToursPage() {
  const initialListings = await getListingsByCategory("overland-tours", 6)

  return (
    <CategoryPageShell
      activeSlug="overland-tours"
      index={4}
      total={9}
      title="Overland tours"
      description="Multi-country expeditions across the continent — long-form, ground-bound, and ambitious."
      image="/images/category-img/overland-tours.jpg"
    >
      <PaginatedListingsGridEditorial
        initialListings={initialListings}
        categorySlug="overland-tours"
        eyebrow="Overland"
        emptyMessage="No overland tours listed yet — submissions open under /submit."
      />
    </CategoryPageShell>
  )
}
