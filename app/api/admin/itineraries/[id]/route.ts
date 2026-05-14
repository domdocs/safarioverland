import { NextRequest, NextResponse } from "next/server"

import { deleteItinerary, getItinerary, updateItinerary } from "@/lib/itineraries"
import { updateItinerarySchema } from "@/lib/itineraries/validate"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params
  try {
    const result = await getItinerary(id)
    if (!result) {
      return NextResponse.json({ error: "not found" }, { status: 404 })
    }
    return NextResponse.json(result)
  } catch (err) {
    console.error(`GET /api/admin/itineraries/${id} failed`, err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 },
    )
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 })
  }
  const parsed = updateItinerarySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation failed", issues: parsed.error.issues },
      { status: 400 },
    )
  }

  try {
    await updateItinerary(id, parsed.data as Record<string, unknown>)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(`PATCH /api/admin/itineraries/${id} failed`, err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 },
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params
  try {
    await deleteItinerary(id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(`DELETE /api/admin/itineraries/${id} failed`, err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 },
    )
  }
}
