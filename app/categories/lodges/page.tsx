import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { CategoryPageShell } from "@/components/editorial/category-page-shell"
import { PaginatedListingsGridEditorial } from "@/components/editorial/paginated-listings-grid-editorial"

export const metadata: Metadata = {
  title: "Safari Lodges | Safari Overland",
  description:
    "Safari lodges across Africa — from luxury tented camps to exclusive private reserves.",
}

export const dynamic = "force-dynamic"

export default async function LodgesPage() {
  const initialListings = await getListingsByCategory("lodges", 6)

  return (
    <CategoryPageShell
      activeSlug="lodges"
      index={1}
      total={9}
      title="Safari lodges"
      description="From luxury tented camps to exclusive private reserves. Curated, reviewed, and reachable on the directory."
      image="/images/category-img/luxury-safari-lodges.jpg"
    >
      <PaginatedListingsGridEditorial
        initialListings={initialListings}
        categorySlug="lodges"
        eyebrow="Lodge"
        emptyMessage="No lodges listed yet — submissions open under /submit."
      />
    </CategoryPageShell>
  )
}
