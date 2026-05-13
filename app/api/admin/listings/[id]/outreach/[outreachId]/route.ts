import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import type { ListingOutreach } from "@/lib/email/outreach-types"
import { getSupabaseServerClient } from "@/lib/supabase"

export const dynamic = "force-dynamic"

/**
 * PATCH /api/admin/listings/[id]/outreach/[outreachId]
 *
 * Update a row's lifecycle status (typically: drafted → sent after the
 * user clicks "Mark as sent" in the admin modal). Also covers later
 * status flips: replied / no_response / archived, plus free-text notes.
 */

const patchSchema = z
  .object({
    status: z
      .enum(["drafted", "sent", "replied", "no_response", "archived"])
      .optional(),
    sent_via: z.enum(["mailto", "resend", "manual"]).optional(),
    sent_at: z.string().datetime().optional(),
    notes: z.string().max(4000).optional(),
  })
  .refine(
    (v) =>
      v.status !== undefined ||
      v.sent_via !== undefined ||
      v.sent_at !== undefined ||
      v.notes !== undefined,
    { message: "at least one field is required" },
  )

type RouteContext = {
  params: Promise<{ id: string; outreachId: string }>
}

export async function PATCH(request: NextRequest, ctx: RouteContext) {
  const { id, outreachId } = await ctx.params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["request body must be JSON"] },
      { status: 400 },
    )
  }

  const parsed = patchSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        errors: parsed.error.issues.map(
          (i) => `${i.path.join(".")}: ${i.message}`,
        ),
      },
      { status: 400 },
    )
  }

  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "supabase_unavailable" },
      { status: 503 },
    )
  }

  const update: Record<string, unknown> = { ...parsed.data }

  // When the client says status=sent but didn't pass an explicit sent_at,
  // stamp it server-side. Keeps the UI from having to think about clock
  // skew.
  if (update.status === "sent" && !update.sent_at) {
    update.sent_at = new Date().toISOString()
  }

  const { data: updated, error: updErr } = await supabase
    .from("listing_outreach")
    .update(update)
    .eq("id", outreachId)
    .eq("listing_id", id)
    .select("*")
    .single()

  if (updErr || !updated) {
    console.error("outreach patch failed", updErr)
    return NextResponse.json(
      { ok: false, error: "update_failed" },
      { status: 500 },
    )
  }

  return NextResponse.json({
    ok: true,
    outreach: updated as ListingOutreach,
  })
}
