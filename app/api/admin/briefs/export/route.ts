import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

export const dynamic = "force-dynamic"

/**
 * Streams the full briefs list as CSV. Admin-gated by middleware.ts.
 */
export async function GET() {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ error: "server_unavailable" }, { status: 503 })
  }

  const { data, error } = await supabase
    .from("briefs")
    .select(
      "contact_name, contact_email, contact_phone, months, intent, pace, quiet_markers, wildlife_priorities, duration, season_preference, budget_tier, source_listing_id, chapters, rhythm, nights, travelers, budget_per_person, notes, status, assigned_to, internal_notes, source_url, created_at",
    )
    .order("created_at", { ascending: false })

  if (error || !data) {
    return NextResponse.json({ error: "query_failed" }, { status: 500 })
  }

  const headers = [
    "contact_name",
    "contact_email",
    "contact_phone",
    "months",
    "intent",
    "pace",
    "quiet_markers",
    "wildlife_priorities",
    "duration",
    "season_preference",
    "budget_tier",
    "source_listing_id",
    "chapters",
    "rhythm",
    "nights",
    "travelers",
    "budget_per_person",
    "notes",
    "status",
    "assigned_to",
    "internal_notes",
    "source_url",
    "created_at",
  ]

  const rows = data.map((row: Record<string, unknown>) =>
    headers
      .map((h) => {
        const v = row[h]
        if (Array.isArray(v)) return csvCell(v.join("; "))
        return csvCell(v)
      })
      .join(","),
  )

  const csv = [headers.join(","), ...rows].join("\n")
  const filename = `safari-overland-briefs-${new Date().toISOString().slice(0, 10)}.csv`

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  })
}

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return ""
  const str = String(value)
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}
