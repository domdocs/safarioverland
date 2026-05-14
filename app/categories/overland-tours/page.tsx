import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { getSettings } from "@/lib/settings"
import { CategoryPageShell } from "@/components/editorial/category-page-shell"
import { CategoryEmptyState } from "@/components/editorial/category-empty-state"
import { PaginatedListingsGridEditorial } from "@/components/editorial/paginated-listings-grid-editorial"

export const metadata: Metadata = {
  title: "Overland Tours | Safari Overland",
  description:
    "Multi-country overland adventures across diverse African landscapes.",
}

export const dynamic = "force-dynamic"

export default async function OverlandToursPage() {
  const settings = await getSettings()
  const pageSize = settings.listings_per_page
  const initialListings = await getListingsByCategory("overland-tours", pageSize)

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
        pageSize={pageSize}
        eyebrow="Overland"
        emptyContent={<CategoryEmptyState noun="overland tour" />}
      />
    </CategoryPageShell>
  )
}
