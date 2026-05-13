import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { OperatorOutreachFeaturedEmail } from "@/lib/email/templates/OperatorOutreachFeaturedEmail"
import { renderEmail } from "@/lib/email/render"
import {
  buildMailtoUrl,
  outreachSubject,
  type OutreachTemplate,
} from "@/lib/email/outreach"
import type { ListingOutreach } from "@/lib/email/outreach-types"
import { getListingById } from "@/lib/listings"
import { getSupabaseServerClient } from "@/lib/supabase"

export const dynamic = "force-dynamic"

/**
 * /api/admin/listings/[id]/outreach
 *
 *   GET  — outreach history for the listing, most recent first
 *   POST — create a drafted outreach row, return mailto URL + rendered
 *          subject/body for the client to either open or save-and-mark-sent
 *
 * Auth: admin Basic Auth middleware covers /api/admin/*.
 *
 * Only the `featured` template is wired up in this PR — the API accepts
 * the others for forward-compat but rejects them with a clear error.
 */

const createBodySchema = z.object({
  template: z.enum(["featured", "kept", "culled"]),
  recipient_email: z.string().email(),
  recipient_name: z.string().max(120).nullish(),
  custom_questions: z.array(z.string().max(400)).max(20).default([]),
})

type RouteContext = { params: Promise<{ id: string }> }

const SENDER_NAME = "Niels van de Meer"
const SENDER_EMAIL = "niels@safarioverland.com"

export async function GET(_req: NextRequest, ctx: RouteContext) {
  const { id } = await ctx.params
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "supabase_unavailable" }, { status: 503 })
  }

  const { data, error } = await supabase
    .from("listing_outreach")
    .select("*")
    .eq("listing_id", id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("outreach list failed", error)
    return NextResponse.json({ ok: false, error: "query_failed" }, { status: 500 })
  }

  return NextResponse.json({ ok: true, outreach: (data ?? []) as ListingOutreach[] })
}

export async function POST(request: NextRequest, ctx: RouteContext) {
  const { id } = await ctx.params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["request body must be JSON"] },
      { status: 400 },
    )
  }

  const parsed = createBodySchema.safeParse(body)
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

  const input = parsed.data
  const template = input.template as OutreachTemplate

  // Only `featured` is implemented in this PR — kept/culled placeholders
  // would render an empty template. Reject explicitly with a clear msg.
  if (template !== "featured") {
    return NextResponse.json(
      {
        ok: false,
        errors: [
          `template "${template}" is not yet implemented — only "featured" ships in this PR`,
        ],
      },
      { status: 400 },
    )
  }

  const listing = await getListingById(id)
  if (!listing) {
    return NextResponse.json(
      { ok: false, errors: ["listing not found"] },
      { status: 404 },
    )
  }

  const recipientName =
    input.recipient_name?.trim() || listing.contact_name?.trim() || "there"

  const subject = outreachSubject(template, listing.listing_name)

  const { html, text } = await renderEmail(
    <OperatorOutreachFeaturedEmail
      recipientName={recipientName}
      lodgeName={listing.listing_name}
      customQuestions={input.custom_questions}
      senderName={SENDER_NAME}
      senderEmail={SENDER_EMAIL}
    />,
  )

  const mailtoUrl = buildMailtoUrl({
    to: input.recipient_email,
    subject,
    body: text,
  })

  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "supabase_unavailable" },
      { status: 503 },
    )
  }

  const insertPayload = {
    listing_id: id,
    template,
    recipient_email: input.recipient_email.trim().toLowerCase(),
    recipient_name: input.recipient_name?.trim() || null,
    subject,
    body_html: html,
    custom_questions:
      input.custom_questions.length > 0
        ? input.custom_questions.join("\n")
        : null,
    status: "drafted" as const,
  }

  const { data: created, error: insertErr } = await supabase
    .from("listing_outreach")
    .insert(insertPayload)
    .select("*")
    .single()

  if (insertErr || !created) {
    console.error("outreach create failed", insertErr)
    return NextResponse.json(
      { ok: false, error: "insert_failed" },
      { status: 500 },
    )
  }

  return NextResponse.json(
    {
      ok: true,
      outreach: created as ListingOutreach,
      mailto_url: mailtoUrl,
      preview_html: html,
      preview_text: text,
    },
    { status: 201 },
  )
}
