import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { CategoryPageShell } from "@/components/editorial/category-page-shell"
import { PaginatedListingsGridEditorial } from "@/components/editorial/paginated-listings-grid-editorial"

export const metadata: Metadata = {
  title: "Guided Tours | Safari Overland",
  description:
    "Expert-led safari tours across Africa's most spectacular wildlife destinations.",
}

export const dynamic = "force-dynamic"

export default async function GuidedToursPage() {
  const initialListings = await getListingsByCategory("guided-tours", 6)

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
        eyebrow="Guided tour"
        emptyMessage="No guided tours listed yet — submissions open under /submit."
      />
    </CategoryPageShell>
  )
}
