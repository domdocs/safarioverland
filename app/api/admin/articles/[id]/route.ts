import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import {
  deleteArticle,
  getArticleById,
  RESERVED_ARTICLE_SLUGS,
  updateArticle,
} from "@/lib/articles"
import { revalidateArticleSurfaces } from "@/lib/articles/revalidate"
import { extractSupabaseErrorMessage } from "@/lib/errors"
import {
  heroImageRejectReason,
  isAllowedHeroImageUrl,
} from "@/lib/upload/hero-image"

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
  // JSONB — see supabase/migrations/20260518_articles_image_attribution.sql.
  image_attribution: z.record(z.unknown()).optional().nullable(),
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

  if (
    parsed.data.slug !== undefined &&
    (RESERVED_ARTICLE_SLUGS as readonly string[]).includes(parsed.data.slug)
  ) {
    return NextResponse.json({ error: "reserved_slug" }, { status: 400 })
  }

  if (parsed.data.hero_image && !isAllowedHeroImageUrl(parsed.data.hero_image)) {
    return NextResponse.json(
      {
        error: "invalid_hero_image",
        message: heroImageRejectReason(parsed.data.hero_image),
      },
      { status: 400 },
    )
  }

  // Snapshot the pre-write state so the revalidation decision can see
  // both status transitions and slug changes on published articles.
  const existing = await getArticleById(id)

  try {
    const article = await updateArticle(id, parsed.data)
    revalidateArticleSurfaces({
      oldStatus: existing?.status ?? null,
      newStatus: article.status,
      oldSlug: existing?.slug ?? null,
      newSlug: article.slug,
    })
    return NextResponse.json({ status: "ok", article })
  } catch (err) {
    const details = extractSupabaseErrorMessage(err)
    if (/duplicate|unique/i.test(details.message)) {
      return NextResponse.json(
        { error: "slug_in_use", message: "An article with that slug already exists." },
        { status: 409 },
      )
    }
    console.error("PUT /api/admin/articles/[id] failed:", err)
    return NextResponse.json(
      { error: "update_failed", ...details },
      { status: 500 },
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params
  // Snapshot so we can revalidate the index / sitemap / detail path if
  // a published article is being removed — leaving a retracted piece
  // listed for an hour is worse than a delay in adding one.
  const existing = await getArticleById(id)
  try {
    await deleteArticle(id)
    revalidateArticleSurfaces({
      oldStatus: existing?.status ?? null,
      newStatus: null,
      oldSlug: existing?.slug ?? null,
      newSlug: null,
    })
    return NextResponse.json({ status: "ok" })
  } catch (err) {
    console.error("DELETE /api/admin/articles/[id] failed:", err)
    return NextResponse.json(
      { error: "delete_failed", ...extractSupabaseErrorMessage(err) },
      { status: 500 },
    )
  }
}
