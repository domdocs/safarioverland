import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { listItineraries } from "@/lib/itineraries"
import type { Itinerary } from "@/lib/itineraries/types"

export const dynamic = "force-dynamic"

async function loadData(): Promise<{ itineraries: Itinerary[] } | null> {
  try {
    const itineraries = await listItineraries({ limit: 200 })
    return { itineraries }
  } catch (err) {
    console.error("listItineraries failed", err)
    return null
  }
}

export default async function AdminItinerariesPage() {
  const data = await loadData()

  if (!data) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Itineraries</h1>
        <Card>
          <CardContent className="p-6">
            <p className="text-stone-600">
              Could not connect to the database. Confirm Supabase
              environment variables are set.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const itineraries = data.itineraries

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">Itineraries</h1>
          <p className="text-stone-600 mt-1">
            Trip designs in progress and ready to send.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/itineraries/new">
            <Plus className="h-4 w-4 mr-2" /> New itinerary
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-100">
                <tr>
                  <Th>Reference</Th>
                  <Th>Title</Th>
                  <Th>Guests</Th>
                  <Th>Status</Th>
                  <Th>Updated</Th>
                </tr>
              </thead>
              <tbody>
                {itineraries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-stone-500">
                      <p className="font-serif italic text-lg mb-1">
                        No itineraries yet.
                      </p>
                      <p>
                        Start a new trip design{" "}
                        <Link
                          className="underline text-amber-700"
                          href="/admin/itineraries/new"
                        >
                          →
                        </Link>
                      </p>
                    </td>
                  </tr>
                ) : (
                  itineraries.map((it) => <Row key={it.id} itinerary={it} />)
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Row({ itinerary }: { itinerary: Itinerary }) {
  return (
    <tr className="border-t hover:bg-stone-50">
      <td className="px-4 py-3 font-mono text-xs text-stone-700">
        <Link href={`/admin/itineraries/${itinerary.id}/edit`} className="hover:underline">
          {itinerary.reference}
        </Link>
      </td>
      <td className="px-4 py-3">
        <Link href={`/admin/itineraries/${itinerary.id}/edit`} className="hover:underline">
          {itinerary.title}
        </Link>
      </td>
      <td className="px-4 py-3 text-stone-600">
        {itinerary.guests.length > 0 ? itinerary.guests.join(" & ") : "—"}
      </td>
      <td className="px-4 py-3">
        <StatusPill status={itinerary.status} />
      </td>
      <td className="px-4 py-3 text-stone-500 tabular-nums">
        {new Date(itinerary.updated_at).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </td>
    </tr>
  )
}

function StatusPill({ status }: { status: Itinerary["status"] }) {
  const styles: Record<Itinerary["status"], string> = {
    draft: "bg-stone-100 text-stone-700",
    published: "bg-amber-100 text-amber-800",
    archived: "bg-stone-200 text-stone-500",
  }
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider ${styles[status]}`}
    >
      {status}
    </span>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left px-4 py-2 font-medium text-xs uppercase tracking-wider text-stone-600">
      {children}
    </th>
  )
}
