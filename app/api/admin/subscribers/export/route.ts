import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

export const dynamic = "force-dynamic"

/**
 * Streams the full subscribers list as CSV. Note: this currently relies on
 * the same admin gating as the rest of /admin (i.e. the existing layout-level
 * checks). When proper admin auth lands, add a guard here as well.
 */
export async function GET() {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ error: "server_unavailable" }, { status: 503 })
  }

  const { data, error } = await supabase
    .from("subscribers")
    .select(
      "email, first_name, marketing_consent, unsubscribed_at, source_resource, source_url, travel_timeline, region_interest, download_count, last_download_at, created_at",
    )
    .order("created_at", { ascending: false })

  if (error || !data) {
    return NextResponse.json({ error: "query_failed" }, { status: 500 })
  }

  const headers = [
    "email",
    "first_name",
    "marketing_consent",
    "unsubscribed_at",
    "source_resource",
    "source_url",
    "travel_timeline",
    "region_interest",
    "download_count",
    "last_download_at",
    "created_at",
  ]

  const rows = data.map((row: Record<string, unknown>) =>
    headers.map((h) => csvCell(row[h])).join(","),
  )

  const csv = [headers.join(","), ...rows].join("\n")
  const filename = `safari-overland-subscribers-${new Date().toISOString().slice(0, 10)}.csv`

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
