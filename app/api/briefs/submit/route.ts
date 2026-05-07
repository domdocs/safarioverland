import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { getSupabaseServerClient } from "@/lib/supabase"
import { sendBriefReceived, sendBriefNotify } from "@/lib/briefs/email"
import type { Brief } from "@/lib/briefs/types"

export const dynamic = "force-dynamic"

const submissionSchema = z.object({
  chapters: z.array(z.string().max(40)).max(8).default([]),
  rhythm: z.string().max(80).optional(),
  months: z.array(z.string().max(12)).max(12).default([]),
  nights: z.number().int().min(1).max(120).optional(),
  travelers: z.number().int().min(1).max(20).optional(),
  budget_per_person: z.string().max(80).optional(),
  notes: z.string().max(4000).optional(),
  contact_name: z.string().min(2).max(120),
  contact_email: z.string().email().max(200),
  contact_phone: z.string().max(40).optional(),
  source_url: z.string().max(500).optional(),
  utm: z.record(z.string()).optional(),
})

/**
 * POST /api/briefs/submit
 *
 * Public endpoint. Inserts a brief into Supabase, fires two transactional
 * emails (confirmation to user, notify to planner inbox), and returns the
 * id so the client can show a confirmation state.
 */
export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  const parsed = submissionSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_payload", issues: parsed.error.flatten() },
      { status: 400 },
    )
  }
  const input = parsed.data

  // Light spam guard — require at least one substantive field beyond contact.
  const hasContent =
    input.chapters.length > 0 ||
    input.months.length > 0 ||
    !!input.rhythm ||
    !!input.nights ||
    !!input.notes
  if (!hasContent) {
    return NextResponse.json(
      { error: "empty_brief", message: "Tell us at least one thing about the trip you're picturing." },
      { status: 400 },
    )
  }

  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ error: "server_unavailable" }, { status: 503 })
  }

  const insertPayload = {
    chapters: input.chapters,
    rhythm: input.rhythm ?? null,
    months: input.months,
    nights: input.nights ?? null,
    travelers: input.travelers ?? null,
    budget_per_person: input.budget_per_person ?? null,
    notes: input.notes ?? null,
    contact_name: input.contact_name.trim(),
    contact_email: input.contact_email.trim().toLowerCase(),
    contact_phone: input.contact_phone ?? null,
    source_url: input.source_url ?? null,
    utm: input.utm ?? null,
  }

  const { data: created, error: insertErr } = await supabase
    .from("briefs")
    .insert(insertPayload)
    .select("*")
    .single()

  if (insertErr || !created) {
    console.error("brief insert failed", insertErr)
    return NextResponse.json({ error: "brief_create_failed" }, { status: 500 })
  }

  const brief = created as Brief

  // Fire-and-forget emails — don't block the response.
  sendBriefReceived(brief).catch((err) =>
    console.error("brief-received email failed", err),
  )
  sendBriefNotify(brief).catch((err) =>
    console.error("brief-notify email failed", err),
  )

  return NextResponse.json(
    {
      status: "ok",
      brief: {
        id: brief.id,
        contact_email: brief.contact_email,
      },
    },
    { status: 201 },
  )
}
