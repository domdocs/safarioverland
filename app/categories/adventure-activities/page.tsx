import type { Metadata } from "next"
import { getListingsByCategory } from "@/lib/listings"
import { getSettings } from "@/lib/settings"
import { CategoryPageShell } from "@/components/editorial/category-page-shell"
import { PaginatedListingsGridEditorial } from "@/components/editorial/paginated-listings-grid-editorial"

export const metadata: Metadata = {
  title: "Adventure Activities | Safari Overland",
  description:
    "Hot-air balloon, white-water, gorilla trekking — bolt-on adventure for the trip you're already planning.",
}

export const dynamic = "force-dynamic"

export default async function AdventureActivitiesPage() {
  const settings = await getSettings()
  const pageSize = settings.listings_per_page
  const initialListings = await getListingsByCategory("adventure-activities", pageSize)

  return (
    <CategoryPageShell
      activeSlug="adventure-activities"
      index={6}
      total={9}
      title="Adventure activities"
      description="Hot-air balloon, white-water, walking, paragliding. Bolt-on activities for the trip you're already planning."
      image="/images/category-img/adventure-activities.jpg"
    >
      <PaginatedListingsGridEditorial
        initialListings={initialListings}
        categorySlug="adventure-activities"
        pageSize={pageSize}
        eyebrow="Activity"
        emptyMessage="No activities listed yet — submissions open under /submit."
      />
    </CategoryPageShell>
  )
}
