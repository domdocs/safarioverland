import Link from "next/link"
import { Download } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getSupabaseServerClient } from "@/lib/supabase"
import type { BriefStatus } from "@/lib/briefs/types"
import { STATUS_LABELS } from "@/lib/briefs/types"
import { BriefRow } from "./brief-row"

export const dynamic = "force-dynamic"

type BriefRowData = {
  id: string
  created_at: string
  contact_name: string
  contact_email: string
  contact_phone: string | null
  chapters: string[]
  months: string[]
  rhythm: string | null
  nights: number | null
  travelers: number | null
  budget_per_person: string | null
  notes: string | null
  status: BriefStatus
  assigned_to: string | null
  internal_notes: string | null
}

async function loadData() {
  const supabase = getSupabaseServerClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from("briefs")
    .select(
      "id, created_at, contact_name, contact_email, contact_phone, chapters, months, rhythm, nights, travelers, budget_per_person, notes, status, assigned_to, internal_notes",
    )
    .order("created_at", { ascending: false })
    .limit(500)

  if (error) {
    console.error("briefs query failed", error)
    return { briefs: [] as BriefRowData[] }
  }

  return { briefs: (data ?? []) as BriefRowData[] }
}

function statusCount(briefs: BriefRowData[], status: BriefStatus) {
  return briefs.filter((b) => b.status === status).length
}

export default async function AdminBriefsPage() {
  const data = await loadData()

  if (!data) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Briefs</h1>
        <Card>
          <CardContent className="p-6">
            <p className="text-stone-600">
              Could not connect to the database. Confirm Supabase environment variables are set.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const total = data.briefs.length
  const newCount = statusCount(data.briefs, "new")
  const reviewingCount = statusCount(data.briefs, "reviewing")
  const sentCount = statusCount(data.briefs, "sent")
  const closedCount = statusCount(data.briefs, "closed")

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">Briefs</h1>
          <p className="text-stone-600 mt-1">Trip Builder submissions from /plan.</p>
        </div>
        <Button asChild>
          <a href="/api/admin/briefs/export">
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <Kpi label="Total" value={total} />
        <Kpi label="New" value={newCount} accent />
        <Kpi label="Reviewing" value={reviewingCount} />
        <Kpi label="Sent" value={sentCount} />
        <Kpi label="Closed" value={closedCount} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent briefs</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-100">
                <tr>
                  <Th>From</Th>
                  <Th>Regions</Th>
                  <Th>Months</Th>
                  <Th>Trip</Th>
                  <Th>Budget</Th>
                  <Th>Status</Th>
                  <Th>Received</Th>
                </tr>
              </thead>
              <tbody>
                {data.briefs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-stone-500">
                      No briefs yet. Direct intent at{" "}
                      <Link className="underline" href="/plan">
                        /plan
                      </Link>{" "}
                      to start receiving them.
                    </td>
                  </tr>
                ) : (
                  data.briefs.map((b) => <BriefRow key={b.id} brief={b} />)
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-stone-500">
        Showing the most recent 500 briefs. Use{" "}
        <Link href="/api/admin/briefs/export" className="underline">
          CSV export
        </Link>{" "}
        for the full list.
      </p>
    </div>
  )
}

function Kpi({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xs uppercase tracking-wider text-stone-500 font-medium">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-bold tabular-nums ${accent ? "text-amber-700" : ""}`}>
          {value.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left px-4 py-2 font-medium text-xs uppercase tracking-wider text-stone-600">
      {children}
    </th>
  )
}
