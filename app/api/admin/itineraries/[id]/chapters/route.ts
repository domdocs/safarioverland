import { NextRequest, NextResponse } from "next/server"

import { createChapter } from "@/lib/itineraries"
import { createChapterSchema } from "@/lib/itineraries/validate"

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
    body = {}
  }
  const parsed = createChapterSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation failed", issues: parsed.error.issues },
      { status: 400 },
    )
  }

  try {
    const { chapter, transits } = await createChapter(id, parsed.data)
    return NextResponse.json({ ok: true, chapter, transits }, { status: 201 })
  } catch (err) {
    console.error(`POST chapters failed`, err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 },
    )
  }
}
