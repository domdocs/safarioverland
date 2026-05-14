import { notFound } from "next/navigation"

import { ItineraryEditor } from "@/components/admin/itineraries/itinerary-editor"
import { getItinerary } from "@/lib/itineraries"

export const dynamic = "force-dynamic"

export default async function EditItineraryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const data = await getItinerary(id)
  if (!data) notFound()
  return <ItineraryEditor initial={data} />
}
