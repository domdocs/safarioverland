import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { createArticle, getArticles, type ArticleStatus } from "@/lib/articles"

export const dynamic = "force-dynamic"

const createSchema = z.object({
  slug: z.string().min(1).max(120),
  title: z.string().min(1).max(200),
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
 * GET  /api/admin/articles  — list (?status=draft|published|archived|all)
 * POST /api/admin/articles  — create
 *
 * Admin-gated by middleware.ts (HTTP basic auth on /api/admin/*).
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const statusParam = url.searchParams.get("status") as ArticleStatus | "all" | null
  const category = url.searchParams.get("category") ?? undefined

  const articles = await getArticles({
    status: statusParam ?? "all",
    category,
    limit: 200,
  })
  return NextResponse.json({ articles })
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_payload", issues: parsed.error.flatten() },
      { status: 400 },
    )
  }

  try {
    const article = await createArticle(parsed.data)
    return NextResponse.json({ status: "ok", article }, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    // Likely conflict on the unique slug index.
    if (/duplicate|unique/i.test(message)) {
      return NextResponse.json(
        { error: "slug_in_use", message: "An article with that slug already exists." },
        { status: 409 },
      )
    }
    console.error("POST /api/admin/articles failed:", err)
    return NextResponse.json({ error: "create_failed", message }, { status: 500 })
  }
}
