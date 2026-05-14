import { NextRequest, NextResponse } from "next/server"

import { deleteChapter, updateChapter } from "@/lib/itineraries"
import { updateChapterSchema } from "@/lib/itineraries/validate"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string; chapterId: string }> },
) {
  const { chapterId } = await context.params
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 })
  }
  const parsed = updateChapterSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation failed", issues: parsed.error.issues },
      { status: 400 },
    )
  }

  try {
    await updateChapter(chapterId, parsed.data as Record<string, unknown>)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("PATCH chapter failed", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 },
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string; chapterId: string }> },
) {
  const { id, chapterId } = await context.params
  try {
    const transits = await deleteChapter(id, chapterId)
    return NextResponse.json({ ok: true, transits })
  } catch (err) {
    console.error("DELETE chapter failed", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 },
    )
  }
}
