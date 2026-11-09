import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { getSupabaseServerClient } from "@/lib/supabase"
import { sendBriefReceived, sendBriefNotify } from "@/lib/briefs/email"
import type { Brief } from "@/lib/briefs/types"
import {
  clickAttributionColumns,
  clickAttributionFields,
} from "@/lib/analytics/click-ids"

export const dynamic = "force-dynamic"

const submissionSchema = z.object({
  // Step 01
  months: z.array(z.string().max(12)).max(12).default([]),
  // Step 02
  intent: z.array(z.string().max(40)).max(11).default([]),
  // Step 03
  pace: z.enum(["slow", "mixed", "active"]).optional(),
  // Self-drive steps (after the rhythm)
  drive_experience: z.enum(["never", "once-or-twice", "often"]).optional(),
  drive_hours: z.enum(["under-3h", "3-5h", "5h-plus"]).optional(),
  countries: z
    .array(
      z.enum([
        "zimbabwe",
        "namibia",
        "botswana",
        "zambia",
        "south-africa",
        "unsure",
      ]),
    )
    .max(6)
    .default([]),
  // Step 04
  quiet_markers: z.array(z.string().max(40)).max(10).default([]),
  // Step 05
  wildlife_priorities: z.array(z.string().max(40)).max(10).default([]),
  // Step 06
  duration: z.string().max(20).optional(),
  // Step 07
  season_preference: z.string().max(40).optional(),
  // Step 08
  budget_tier: z
    .enum(["budget", "mid", "luxury", "exclusive", "discuss"])
    .optional(),

  // Free text + listing context
  notes: z.string().max(4000).optional(),
  source_listing_id: z.string().uuid().optional(),

  // Contact
  contact_name: z.string().min(2).max(120),
  contact_email: z.string().email().max(200),
  contact_phone: z.string().max(40).optional(),

  // Attribution
  source_url: z.string().max(500).optional(),
  utm: z.record(z.string()).optional(),

  // Ad click ID + campaign (cookie-free capture, lib/analytics/click-ids.ts).
  // Each field drops to undefined when malformed, so tracking data can
  // never make a brief fail validation.
  ...clickAttributionFields,
})

/**
 * POST /api/briefs/submit
 *
 * Public endpoint. Inserts a structured intake brief into Supabase, fires
 * two transactional emails (confirmation to user, notify to planner
 * inbox), and returns the id so the client can hand off to /plan/sent.
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
    input.months.length > 0 ||
    input.intent.length > 0 ||
    !!input.pace ||
    !!input.drive_experience ||
    !!input.drive_hours ||
    input.countries.length > 0 ||
    input.wildlife_priorities.length > 0 ||
    !!input.duration ||
    !!input.budget_tier ||
    !!input.notes
  if (!hasContent) {
    return NextResponse.json(
      {
        error: "empty_brief",
        message: "Tell us at least one thing about the trip you're picturing.",
      },
      { status: 400 },
    )
  }

  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ error: "server_unavailable" }, { status: 503 })
  }

  const basePayload = {
    // New structured fields
    months: input.months,
    intent: input.intent,
    pace: input.pace ?? null,
    quiet_markers: input.quiet_markers,
    wildlife_priorities: input.wildlife_priorities,
    duration: input.duration ?? null,
    season_preference: input.season_preference ?? null,
    budget_tier: input.budget_tier ?? null,
    source_listing_id: input.source_listing_id ?? null,

    // Free text + contact
    notes: input.notes ?? null,
    contact_name: input.contact_name.trim(),
    contact_email: input.contact_email.trim().toLowerCase(),
    contact_phone: input.contact_phone ?? null,

    // Attribution
    source_url: input.source_url ?? null,
    utm: input.utm ?? null,
  }

  // Self-drive fields (migration 20261109). Only sent when answered, so a
  // brief without them never references the new columns.
  const selfDrivePayload = {
    ...(input.drive_experience
      ? { drive_experience: input.drive_experience }
      : {}),
    ...(input.drive_hours ? { drive_hours: input.drive_hours } : {}),
    ...(input.countries.length > 0 ? { countries: input.countries } : {}),
  }

  // Ad click attribution (also migration 20261109). Only the columns with
  // values are sent.
  const attributionPayload = clickAttributionColumns(input)

  const newColumnsPayload = { ...selfDrivePayload, ...attributionPayload }

  const insertBrief = (payload: Record<string, unknown>) =>
    supabase.from("briefs").insert(payload).select("*").single()

  let { data: created, error: insertErr } = await insertBrief({
    ...basePayload,
    ...newColumnsPayload,
  })

  // Transitional fallback: code can reach an environment (including local
  // dev, which points at production Supabase) before migration 20261109 is
  // applied there. The missing column comes back as Postgres 42703
  // (undefined_column), or as PostgREST's PGRST204 ("column not in schema
  // cache") — retry once without the self-drive and attribution fields
  // rather than lose the brief. Remove this block once the migration is
  // applied in production.
  if (
    (insertErr?.code === "42703" || insertErr?.code === "PGRST204") &&
    Object.keys(newColumnsPayload).length > 0
  ) {
    console.warn(
      "briefs: self-drive/attribution columns missing (apply migration 20261109) — retrying insert without them",
      insertErr.message,
    )
    ;({ data: created, error: insertErr } = await insertBrief(basePayload))
  }

  if (insertErr || !created) {
    console.error("brief insert failed", insertErr)
    return NextResponse.json({ error: "brief_create_failed" }, { status: 500 })
  }

  // Merge the self-drive answers back in so the emails show them even if
  // the fallback above dropped them from the row.
  const brief = { ...(created as Brief), ...selfDrivePayload }

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
