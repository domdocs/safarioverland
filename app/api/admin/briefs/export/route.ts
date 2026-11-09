import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

export const dynamic = "force-dynamic"

const ATTRIBUTION_HEADERS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "click_captured_at",
]

/**
 * Streams the full briefs list as CSV. Admin-gated by middleware.ts.
 */
export async function GET() {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ error: "server_unavailable" }, { status: 503 })
  }

  const baseColumns =
    "contact_name, contact_email, contact_phone, months, intent, pace, quiet_markers, wildlife_priorities, duration, season_preference, budget_tier, source_listing_id, chapters, rhythm, nights, travelers, budget_per_person, notes, status, assigned_to, internal_notes, source_url, created_at"
  // Ad click attribution (migration 20261109).
  const attributionColumns = ATTRIBUTION_HEADERS.join(", ")

  const query = (columns: string) =>
    supabase
      .from("briefs")
      .select(columns)
      .order("created_at", { ascending: false })

  let { data, error } = await query(`${baseColumns}, ${attributionColumns}`)

  // Transitional fallback: until migration 20261109 is applied, selecting
  // the attribution columns fails with 42703 (undefined_column). Export
  // without them (the columns stay in the header, empty). Remove once
  // applied.
  if (error?.code === "42703") {
    console.warn(
      "briefs export: attribution columns missing (apply migration 20261109) — exporting without them",
    )
    ;({ data, error } = await query(baseColumns))
  }

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
    ...ATTRIBUTION_HEADERS,
  ]

  const rows = (data as unknown as Record<string, unknown>[]).map((row) =>
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
