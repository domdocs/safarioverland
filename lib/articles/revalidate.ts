import { revalidatePath } from "next/cache"

import type { ArticleStatus } from "@/lib/articles"

/**
 * Selectively invalidate the ISR-cached surfaces that show published
 * articles when the article write path would otherwise leave them
 * stale for up to an hour.
 *
 * Called from POST / PUT / DELETE on `/api/admin/articles(/*)`.
 *
 * Surfaces:
 *   - `/field-notes`           — the "latest" DB-driven rail
 *   - `/sitemap.xml`           — metadata-route sitemap
 *   - `/field-notes/[slug]`    — the article itself (both old and new
 *                                on a slug change of a published piece)
 *
 * Rule: touch the caches only when a *published* article is involved on
 * either side of the change. Draft-only edits stay silent so a routine
 * that iterates on a draft doesn't bust the sitemap on every save.
 *
 * See handoff/briefs/2026-08-REVALIDATE_ON_PUBLISH.md.
 */
export function revalidateArticleSurfaces(args: {
  /** Status before the write, or `null` for a fresh POST. */
  oldStatus: ArticleStatus | null
  /** Status after the write, or `null` after a DELETE. */
  newStatus: ArticleStatus | null
  /** Slug before the write, or `null` for a fresh POST. */
  oldSlug: string | null
  /** Slug after the write, or `null` after a DELETE. */
  newSlug: string | null
}): void {
  const wasPublished = args.oldStatus === "published"
  const isPublished = args.newStatus === "published"

  // Draft-only path — nothing user-facing changed.
  if (!wasPublished && !isPublished) return

  revalidatePath("/field-notes")
  revalidatePath("/sitemap.xml")

  // Revalidate every slug touched by the change. A retracted or
  // renamed piece must not keep serving a cached hit at its old URL,
  // and a newly-published or edited piece must reappear at its
  // current URL. Set handles the common same-slug case.
  const slugs = new Set<string>()
  if (isPublished && args.newSlug) slugs.add(args.newSlug)
  if (wasPublished && args.oldSlug) slugs.add(args.oldSlug)
  for (const slug of slugs) {
    revalidatePath(`/field-notes/${slug}`)
  }
}
