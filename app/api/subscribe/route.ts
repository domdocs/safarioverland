import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getSupabaseServerClient } from "@/lib/supabase"
import { SUBSCRIBER_COOKIE, SUBSCRIBER_COOKIE_MAX_AGE } from "@/lib/downloads/resources"

/**
 * Newsletter signup. Creates or reactivates a subscriber with
 * source_resource='newsletter'. Same `subscribers` table the download flow uses,
 * so newsletter and gated-download captures both show up in /admin/subscribers.
 *
 * Idempotent: a re-submitted email returns ok without creating a duplicate.
 */

const requestSchema = z.object({
  email: z.string().email().max(254),
  firstName: z.string().min(1).max(80).optional(),
  sourceUrl: z.string().max(500).optional(),
  utm: z.record(z.string()).optional(),
})

const NEWSLETTER_SOURCE = "newsletter"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  const parsed = requestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_payload", issues: parsed.error.flatten() },
      { status: 400 },
    )
  }
  const input = parsed.data
  const normalisedEmail = input.email.trim().toLowerCase()

  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ error: "server_unavailable" }, { status: 503 })
  }

  // Look up first by email (canonical), then by cookie as a secondary path.
  const { data: existing, error: lookupErr } = await supabase
    .from("subscribers")
    .select("id, email, unsubscribed_at, marketing_consent")
    .eq("email", normalisedEmail)
    .maybeSingle()

  if (lookupErr) {
    console.error("subscribe lookup failed", lookupErr)
    return NextResponse.json({ error: "lookup_failed" }, { status: 500 })
  }

  let subscriberId: string

  if (existing) {
    subscriberId = existing.id
    // Reactivate if previously unsubscribed; refresh consent timestamp.
    const update: Record<string, unknown> = {
      marketing_consent: true,
      consent_ts: new Date().toISOString(),
    }
    if (existing.unsubscribed_at) update.unsubscribed_at = null
    const { error: updateErr } = await supabase
      .from("subscribers")
      .update(update)
      .eq("id", existing.id)
    if (updateErr) {
      console.error("subscribe update failed", updateErr)
      return NextResponse.json({ error: "subscribe_update_failed" }, { status: 500 })
    }
  } else {
    const insertPayload = {
      email: normalisedEmail,
      first_name: input.firstName ?? null,
      marketing_consent: true,
      consent_ts: new Date().toISOString(),
      source_resource: NEWSLETTER_SOURCE,
      source_url: input.sourceUrl ?? null,
      utm: input.utm ?? null,
    }
    const { data: created, error: insertErr } = await supabase
      .from("subscribers")
      .insert(insertPayload)
      .select("id")
      .single()
    if (insertErr || !created) {
      console.error("subscribe insert failed", insertErr)
      return NextResponse.json({ error: "subscriber_create_failed" }, { status: 500 })
    }
    subscriberId = created.id
  }

  const response = NextResponse.json({ status: "ok" })

  // Set the same cookie the download flow uses, so a newsletter signup
  // suppresses the download modal next time the user clicks a download CTA.
  response.cookies.set(SUBSCRIBER_COOKIE, subscriberId, {
    maxAge: SUBSCRIBER_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
  })

  return response
}
