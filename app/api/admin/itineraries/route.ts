import { NextRequest, NextResponse } from "next/server"

import { createItinerary, listItineraries } from "@/lib/itineraries"
import { createItinerarySchema } from "@/lib/itineraries/validate"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET() {
  try {
    const itineraries = await listItineraries({ limit: 200 })
    return NextResponse.json({ itineraries })
  } catch (err) {
    console.error("GET /api/admin/itineraries failed", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 })
  }
  const parsed = createItinerarySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation failed", issues: parsed.error.issues },
      { status: 400 },
    )
  }

  const createdBy =
    request.headers.get("x-admin-user") ?? process.env.ADMIN_USERNAME ?? null

  try {
    const itinerary = await createItinerary({
      title: parsed.data.title,
      source_brief_id: parsed.data.source_brief_id,
      created_by: createdBy,
    })
    return NextResponse.json(
      { ok: true, id: itinerary.id, reference: itinerary.reference },
      { status: 201 },
    )
  } catch (err) {
    console.error("POST /api/admin/itineraries failed", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 },
    )
  }
}
