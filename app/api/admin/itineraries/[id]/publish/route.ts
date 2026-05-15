import { NextRequest, NextResponse } from "next/server"

import { getItinerary, updateItinerary } from "@/lib/itineraries"
import { preflightItinerary } from "@/lib/itineraries/preflight"
import { createSnapshot, mintSlug } from "@/lib/itineraries/snapshots"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

/**
 * POST /api/admin/itineraries/[id]/publish
 *
 * Pre-flight validates the itinerary, mints a public slug if not
 * already set, creates an immutable snapshot, and flips status to
 * "published". Re-publishing is idempotent on slug (keeps the
 * customer-facing URL stable) and appends a new "current" snapshot.
 *
 * GET (without ?force=true) on this path is a dry-run — returns the
 * preflight issues without making any changes. The editor calls it to
 * show inline "what's missing" before the user clicks publish.
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params
  const data = await getItinerary(id)
  if (!data) return NextResponse.json({ error: "not found" }, { status: 404 })
  const issues = preflightItinerary(data)
  return NextResponse.json({ ok: issues.length === 0, issues })
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params

  const data = await getItinerary(id)
  if (!data) return NextResponse.json({ error: "not found" }, { status: 404 })

  const issues = preflightItinerary(data)
  if (issues.length > 0) {
    return NextResponse.json(
      { ok: false, error: "preflight failed", issues },
      { status: 422 },
    )
  }

  let { itinerary } = data
  try {
    // Mint slug on first publish; subsequent re-publishes keep the
    // existing slug so the customer-facing URL stays stable.
    if (!itinerary.slug) {
      const slug = await mintSlug(itinerary)
      itinerary = await updateItinerary(id, { slug })
    }

    // Always set status to published on publish.
    if (itinerary.status !== "published") {
      itinerary = await updateItinerary(id, { status: "published" })
    }

    const publishedBy =
      request.headers.get("x-admin-user") ?? process.env.ADMIN_USERNAME ?? null

    const snapshot = await createSnapshot({
      data: { itinerary, chapters: data.chapters, transits: data.transits },
      publishedBy,
    })

    return NextResponse.json({
      ok: true,
      slug: itinerary.slug,
      snapshot_id: snapshot.id,
      url: `/trips/${itinerary.slug}`,
    })
  } catch (err) {
    console.error("publish failed", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "publish failed" },
      { status: 500 },
    )
  }
}

/**
 * DELETE /api/admin/itineraries/[id]/publish
 *
 * "Unpublish" — flips status back to draft. The slug and snapshots
 * are intentionally NOT touched: if the curator re-publishes, the
 * customer's existing URL keeps working without needing to re-share.
 * To hard-revoke the public URL, the curator can set is_current to
 * FALSE on the snapshot in Supabase Studio.
 */
export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params
  try {
    await updateItinerary(id, { status: "draft" })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("unpublish failed", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "unpublish failed" },
      { status: 500 },
    )
  }
}
