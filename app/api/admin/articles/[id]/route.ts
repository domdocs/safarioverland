import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { deleteArticle, getArticleById, updateArticle } from "@/lib/articles"

export const dynamic = "force-dynamic"

const updateSchema = z.object({
  slug: z.string().min(1).max(120).optional(),
  title: z.string().min(1).max(200).optional(),
  category: z.string().max(40).optional().nullable(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  hero_image: z.string().max(500).optional().nullable(),
  excerpt: z.string().max(1000).optional().nullable(),
  body_md: z.string().max(200000).optional().nullable(),
  read_minutes: z.number().int().min(1).max(240).optional().nullable(),
  author_name: z.string().max(120).optional().nullable(),
  related_listing_ids: z.array(z.string().uuid()).optional().nullable(),
  published_at: z.string().optional().nullable(),
})

/**
 * GET    /api/admin/articles/[id]  — single article
 * PUT    /api/admin/articles/[id]  — update
 * DELETE /api/admin/articles/[id]  — remove
 *
 * Admin-gated by middleware.ts.
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params
  const article = await getArticleById(id)
  if (!article) {
    return NextResponse.json({ error: "not_found" }, { status: 404 })
  }
  return NextResponse.json({ article })
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_payload", issues: parsed.error.flatten() },
      { status: 400 },
    )
  }

  try {
    const article = await updateArticle(id, parsed.data)
    return NextResponse.json({ status: "ok", article })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    if (/duplicate|unique/i.test(message)) {
      return NextResponse.json(
        { error: "slug_in_use", message: "An article with that slug already exists." },
        { status: 409 },
      )
    }
    console.error("PUT /api/admin/articles/[id] failed:", err)
    return NextResponse.json({ error: "update_failed", message }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params
  try {
    await deleteArticle(id)
    return NextResponse.json({ status: "ok" })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("DELETE /api/admin/articles/[id] failed:", err)
    return NextResponse.json({ error: "delete_failed", message }, { status: 500 })
  }
}
