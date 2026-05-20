import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { getSettings } from "@/lib/settings"
import { CategoryPageShell } from "@/components/editorial/category-page-shell"
import { CategoryEmptyState } from "@/components/editorial/category-empty-state"
import { PaginatedListingsGridEditorial } from "@/components/editorial/paginated-listings-grid-editorial"
import { RelatedFieldNotes } from "@/components/RelatedFieldNotes"

export const metadata: Metadata = {
  title: "Guided Tours",
  description:
    "Expert-led safari tours across Africa's most spectacular wildlife destinations.",
  alternates: { canonical: "https://safarioverland.com/categories/guided-tours" },
}

export const dynamic = "force-dynamic"

export default async function GuidedToursPage() {
  const settings = await getSettings()
  const pageSize = settings.listings_per_page
  const initialListings = await getListingsByCategory("guided-tours", pageSize)

  return (
    <CategoryPageShell
      activeSlug="guided-tours"
      index={3}
      total={9}
      title="Guided tours"
      description="Expert-led tours across Africa's most spectacular wildlife destinations."
      image="/images/category-img/guided-tours.jpg"
    >
      <PaginatedListingsGridEditorial
        initialListings={initialListings}
        categorySlug="guided-tours"
        pageSize={pageSize}
        eyebrow="Guided tour"
        emptyContent={<CategoryEmptyState noun="guided tour" />}
      />
      <RelatedFieldNotes topic="guided-tours" heading="Reading on guided tours & where we'd send you" />
    </CategoryPageShell>
  )
}
