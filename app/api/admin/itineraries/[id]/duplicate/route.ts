import { NextRequest, NextResponse } from "next/server"

import { duplicateItinerary } from "@/lib/itineraries"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

/**
 * POST /api/admin/itineraries/[id]/duplicate
 *
 * Spawns a new draft itinerary with all content copied from the
 * source. New reference is minted, slug clears, status drops to
 * draft, title gets a "(copy)" suffix. Returns the new id so the
 * caller can redirect to the new edit page.
 */
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params
  try {
    const createdBy =
      request.headers.get("x-admin-user") ?? process.env.ADMIN_USERNAME ?? null
    const copy = await duplicateItinerary(id, { created_by: createdBy })
    return NextResponse.json(
      { ok: true, id: copy.id, reference: copy.reference },
      { status: 201 },
    )
  } catch (err) {
    console.error("duplicate failed", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "duplicate failed" },
      { status: 500 },
    )
  }
}
