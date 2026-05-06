import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getSupabaseServerClient } from "@/lib/supabase"
import {
  getResource,
  SUBSCRIBER_COOKIE,
  SUBSCRIBER_COOKIE_MAX_AGE,
} from "@/lib/downloads/resources"
import { getSignedDownloadUrl } from "@/lib/downloads/storage"
import { sendDownloadEmail } from "@/lib/downloads/email"

const requestSchema = z.object({
  slug: z.string().min(1),
  email: z.string().email().optional(),
  firstName: z.string().min(1).max(80).optional(),
  travelTimeline: z.string().max(40).optional(),
  regionInterest: z.string().max(40).optional(),
  marketingConsent: z.boolean().optional(),
  sourceUrl: z.string().max(500).optional(),
  utm: z.record(z.string()).optional(),
})

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
    return NextResponse.json({ error: "invalid_payload", issues: parsed.error.flatten() }, { status: 400 })
  }
  const input = parsed.data

  const resource = getResource(input.slug)
  if (!resource) {
    return NextResponse.json({ error: "unknown_resource" }, { status: 404 })
  }

  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ error: "server_unavailable" }, { status: 503 })
  }

  // Identify subscriber: cookie first, then email lookup, then upsert.
  const cookieSubId = request.cookies.get(SUBSCRIBER_COOKIE)?.value
  let subscriberId: string | null = null
  let subscriberEmail: string | null = null
  let subscriberFirstName: string | null = null
  let isFirstDownload = false

  if (cookieSubId) {
    const { data } = await supabase
      .from("subscribers")
      .select("id, email, first_name, unsubscribed_at")
      .eq("id", cookieSubId)
      .maybeSingle()
    if (data && !data.unsubscribed_at) {
      subscriberId = data.id
      subscriberEmail = data.email
      subscriberFirstName = data.first_name
    }
  }

  if (!subscriberId) {
    if (!input.email) {
      // Cookie missing/invalid AND no email submitted — client must show the form.
      return NextResponse.json({ status: "needs_email" }, { status: 200 })
    }

    const normalisedEmail = input.email.trim().toLowerCase()
    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, email, first_name, unsubscribed_at")
      .eq("email", normalisedEmail)
      .maybeSingle()

    if (existing) {
      subscriberId = existing.id
      subscriberEmail = existing.email
      subscriberFirstName = existing.first_name
      // Reactivate if previously unsubscribed but they've now opted in again.
      if (existing.unsubscribed_at && input.marketingConsent) {
        await supabase
          .from("subscribers")
          .update({ unsubscribed_at: null, marketing_consent: true, consent_ts: new Date().toISOString() })
          .eq("id", existing.id)
      }
    } else {
      isFirstDownload = true
      const insertPayload = {
        email: normalisedEmail,
        first_name: input.firstName ?? null,
        travel_timeline: input.travelTimeline ?? null,
        region_interest: input.regionInterest ?? null,
        marketing_consent: input.marketingConsent ?? true,
        consent_ts: new Date().toISOString(),
        source_resource: resource.slug,
        source_url: input.sourceUrl ?? null,
        utm: input.utm ?? null,
      }
      const { data: created, error: insertErr } = await supabase
        .from("subscribers")
        .insert(insertPayload)
        .select("id, email, first_name")
        .single()
      if (insertErr || !created) {
        console.error("subscriber insert failed", insertErr)
        return NextResponse.json({ error: "subscriber_create_failed" }, { status: 500 })
      }
      subscriberId = created.id
      subscriberEmail = created.email
      subscriberFirstName = created.first_name
    }
  }

  if (!subscriberId) {
    // Should be unreachable — every branch above either sets it or returns early.
    return NextResponse.json({ error: "subscriber_resolve_failed" }, { status: 500 })
  }

  // Log the download event.
  const headers = request.headers
  await supabase.from("download_events").insert({
    subscriber_id: subscriberId,
    resource_slug: resource.slug,
    user_agent: headers.get("user-agent")?.slice(0, 500) ?? null,
    ip_country: headers.get("x-vercel-ip-country") ?? null,
    referrer: headers.get("referer")?.slice(0, 500) ?? null,
  })

  // Update subscriber's download counters.
  const { count: totalDownloads } = await supabase
    .from("download_events")
    .select("id", { count: "exact", head: true })
    .eq("subscriber_id", subscriberId)
  await supabase
    .from("subscribers")
    .update({
      download_count: totalDownloads ?? 1,
      last_download_at: new Date().toISOString(),
    })
    .eq("id", subscriberId)

  // Get a signed URL if the file is available, otherwise queue the email.
  const signedUrl = resource.available ? await getSignedDownloadUrl(resource) : null

  // Fire-and-forget welcome email — no need to block the response.
  if (subscriberEmail) {
    sendDownloadEmail({
      to: subscriberEmail,
      firstName: subscriberFirstName,
      resource,
      signedUrl,
      isFirstDownload,
    }).catch((err) => console.error("welcome email failed", err))
  }

  const response = NextResponse.json({
    status: "ok",
    available: resource.available,
    signedUrl,
    resource: {
      slug: resource.slug,
      title: resource.title,
      filename: resource.filename,
    },
  })

  // Set / refresh the subscriber cookie.
  response.cookies.set(SUBSCRIBER_COOKIE, subscriberId, {
    maxAge: SUBSCRIBER_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false, // intentionally readable so the client knows the user is captured
  })

  return response
}
