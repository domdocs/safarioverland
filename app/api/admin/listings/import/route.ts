import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { parseResearchRecord } from "@/lib/listings/import-record"
import { getSupabaseServerClient } from "@/lib/supabase"

export const dynamic = "force-dynamic"

/**
 * POST /api/admin/listings/import
 *
 * Takes a research-record markdown document (YAML frontmatter + body —
 * see handoff/skills/listing-research/research-record-template.md) and
 * writes a `pending` row into `directory_listings`.
 *
 * Idempotency: if a row with the same listing_name already exists and is
 * still `status='pending'`, this updates it in place. If the existing row
 * is `approved` or `rejected`, return 409 with a message pointing the
 * caller at admin.
 *
 * Auth: protected by the existing admin Basic Auth middleware (see
 * middleware.ts — matcher covers /api/admin/*).
 */

const bodySchema = z.object({
  markdown: z.string().min(1, "markdown is required"),
})

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["request body must be JSON: { markdown: string }"] },
      { status: 400 },
    )
  }

  const bodyParsed = bodySchema.safeParse(body)
  if (!bodyParsed.success) {
    return NextResponse.json(
      {
        ok: false,
        errors: bodyParsed.error.issues.map((i) => i.message),
      },
      { status: 400 },
    )
  }

  const parsed = parseResearchRecord(bodyParsed.data.markdown)
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, errors: parsed.errors },
      { status: 400 },
    )
  }

  const { record, warnings } = parsed

  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json(
      { ok: false, errors: ["supabase server client unavailable — check env"] },
      { status: 503 },
    )
  }

  // Idempotency lookup. `listing_name` is the natural key for a research
  // record (lodge name is unique enough in practice). If we hit two pending
  // rows with the same name we update the most recently updated one and
  // surface a warning so Dom can clean up.
  const { data: existing, error: lookupErr } = await supabase
    .from("directory_listings")
    .select("id, status, listing_name")
    .eq("listing_name", record.listing_name)
    .order("updated_at", { ascending: false })
    .limit(2)

  if (lookupErr) {
    console.error("listing import lookup failed", lookupErr)
    return NextResponse.json(
      { ok: false, errors: ["database lookup failed"] },
      { status: 500 },
    )
  }

  if (existing && existing.length > 0) {
    const top = existing[0]
    if (top.status === "approved" || top.status === "rejected") {
      return NextResponse.json(
        {
          ok: false,
          errors: [
            `listing "${record.listing_name}" already exists with status "${top.status}" — edit it in admin instead of re-importing`,
          ],
          existing_id: top.id,
          admin_url: `/admin/listings/edit/${top.id}`,
        },
        { status: 409 },
      )
    }

    if (existing.length > 1) {
      warnings.push(
        `found ${existing.length} pending rows for "${record.listing_name}"; updated the most recently modified — clean up duplicates in admin`,
      )
    }

    const { data: updated, error: updateErr } = await supabase
      .from("directory_listings")
      .update(record)
      .eq("id", top.id)
      .select("id, listing_name")
      .single()

    if (updateErr || !updated) {
      console.error("listing import update failed", updateErr)
      return NextResponse.json(
        { ok: false, errors: ["database update failed"] },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        ok: true,
        id: updated.id,
        listing_name: updated.listing_name,
        admin_url: `/admin/listings/edit/${updated.id}`,
        action: "updated",
        warnings,
      },
      { status: 200 },
    )
  }

  const { data: created, error: insertErr } = await supabase
    .from("directory_listings")
    .insert(record)
    .select("id, listing_name")
    .single()

  if (insertErr || !created) {
    console.error("listing import insert failed", insertErr)
    return NextResponse.json(
      { ok: false, errors: ["database insert failed"] },
      { status: 500 },
    )
  }

  return NextResponse.json(
    {
      ok: true,
      id: created.id,
      listing_name: created.listing_name,
      admin_url: `/admin/listings/edit/${created.id}`,
      action: "created",
      warnings,
    },
    { status: 201 },
  )
}
