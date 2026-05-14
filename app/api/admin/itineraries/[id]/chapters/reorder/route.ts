import { NextRequest, NextResponse } from "next/server"

import { reorderChapters } from "@/lib/itineraries"
import { reorderChaptersSchema } from "@/lib/itineraries/validate"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function POST(
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
  const parsed = reorderChaptersSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation failed", issues: parsed.error.issues },
      { status: 400 },
    )
  }

  try {
    const { chapters, transits } = await reorderChapters(id, parsed.data.order)
    return NextResponse.json({ ok: true, chapters, transits })
  } catch (err) {
    console.error("POST chapters/reorder failed", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 },
    )
  }
}
