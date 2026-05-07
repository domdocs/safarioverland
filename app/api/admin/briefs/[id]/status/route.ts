import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { getSupabaseServerClient } from "@/lib/supabase"

export const dynamic = "force-dynamic"

const bodySchema = z.object({
  status: z.enum(["new", "reviewing", "sent", "closed"]),
  internal_notes: z.string().max(4000).optional(),
  assigned_to: z.string().max(120).optional(),
})

/**
 * PATCH /api/admin/briefs/[id]/status
 *
 * Admin-only — protected by middleware.ts which gates /api/admin/*.
 * Updates triage fields on a brief and returns the new row.
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_payload", issues: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ error: "server_unavailable" }, { status: 503 })
  }

  const updates: Record<string, unknown> = { status: parsed.data.status }
  if (parsed.data.internal_notes !== undefined) {
    updates.internal_notes = parsed.data.internal_notes || null
  }
  if (parsed.data.assigned_to !== undefined) {
    updates.assigned_to = parsed.data.assigned_to || null
  }

  const { data, error } = await supabase
    .from("briefs")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single()

  if (error || !data) {
    console.error("brief status update failed", error)
    return NextResponse.json({ error: "update_failed" }, { status: 500 })
  }

  return NextResponse.json({ status: "ok", brief: data })
}
