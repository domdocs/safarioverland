import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"
import { getResource, SUBSCRIBER_COOKIE } from "@/lib/downloads/resources"
import { getSignedDownloadUrl } from "@/lib/downloads/storage"

export const dynamic = "force-dynamic"

/**
 * Direct download endpoint. Used when the user already has a valid
 * subscriber cookie — skips the email-capture modal and redirects
 * straight to a signed Supabase Storage URL.
 *
 * If no valid cookie is present, returns 401 so the client can fall
 * back to the modal flow.
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params
  const resource = getResource(slug)
  if (!resource) {
    return NextResponse.json({ error: "unknown_resource" }, { status: 404 })
  }

  const subId = request.cookies.get(SUBSCRIBER_COOKIE)?.value
  if (!subId) {
    return NextResponse.json({ error: "needs_email" }, { status: 401 })
  }

  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ error: "server_unavailable" }, { status: 503 })
  }

  const { data: subscriber } = await supabase
    .from("subscribers")
    .select("id, unsubscribed_at")
    .eq("id", subId)
    .maybeSingle()

  if (!subscriber || subscriber.unsubscribed_at) {
    return NextResponse.json({ error: "needs_email" }, { status: 401 })
  }

  // Log the event.
  await supabase.from("download_events").insert({
    subscriber_id: subscriber.id,
    resource_slug: resource.slug,
    user_agent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
    ip_country: request.headers.get("x-vercel-ip-country") ?? null,
    referrer: request.headers.get("referer")?.slice(0, 500) ?? null,
  })

  if (!resource.available) {
    return NextResponse.json({ status: "pending", message: "Resource is not yet available." }, { status: 202 })
  }

  const signedUrl = await getSignedDownloadUrl(resource)
  if (!signedUrl) {
    return NextResponse.json({ status: "pending", message: "File not yet uploaded." }, { status: 202 })
  }

  return NextResponse.redirect(signedUrl, { status: 302 })
}
