import { NextRequest, NextResponse } from "next/server"

import { updateTransit } from "@/lib/itineraries"
import { updateTransitSchema } from "@/lib/itineraries/validate"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string; transitId: string }> },
) {
  const { transitId } = await context.params
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 })
  }
  const parsed = updateTransitSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation failed", issues: parsed.error.issues },
      { status: 400 },
    )
  }

  try {
    await updateTransit(transitId, parsed.data as Record<string, unknown>)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("PATCH transit failed", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 },
    )
  }
}
