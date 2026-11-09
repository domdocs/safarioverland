"use client"

import { usePathname } from "next/navigation"

import { Byline } from "@/components/Byline"
import { ArticleJsonLd } from "@/components/JsonLd/ArticleJsonLd"
import { getEditorById } from "@/lib/editors"
import { FIELD_NOTE_DATES } from "@/lib/field-note-dates"

const SITE = "https://safarioverland.com"

/**
 * Drops a visible <Byline> + Article JSON-LD onto every field-note
 * page via the field-notes layout. Reads pathname client-side
 * (server-rendered for the initial HTML, so SEO is unaffected) and
 * looks up the published/updated dates + editorId from the
 * build-time FIELD_NOTE_DATES map.
 *
 * The map is regenerated from each page's exported `publishedAt`,
 * `updatedAt` and `editorId` constants via
 * `node scripts/gen-field-note-dates.mjs`. Pages without those
 * exports fall back to file mtime (dates) + niels (editor).
 *
 * Skipped on the /field-notes index itself — the index isn't a field
 * note and doesn't have a single editor / dateline to declare.
 *
 * Pages that want a bespoke byline or richer metadata (custom
 * headline distinct from the page <title>, hero image for the
 * JsonLd `image` field) should call <Byline /> + <ArticleJsonLd />
 * directly with their own props rather than relying on this auto.
 */
export function AutoArticleMeta({
  /** Headline override — defaults to the URL-derived slug-as-name
   *  when not provided, which is rarely ideal. Use this from any
   *  field-note page that has a real H1 string. */
  headline,
  image,
}: {
  headline?: string
  image?: string
} = {}) {
  const pathname = usePathname() ?? "/"
  if (pathname === "/field-notes" || !pathname.startsWith("/field-notes/")) {
    return null
  }
  // DB-backed field notes (/field-notes/[slug]) render their own
  // <Byline /> + <ArticleJsonLd /> with real published_at / updated_at.
  // Those paths are not in FIELD_NOTE_DATES — skip auto meta rather
  // than falling back to a placeholder date that would duplicate the
  // page-level byline.
  // Self-drive guides and their index render their own byline and
  // Article JSON-LD (real title as headline), so skip them here.
  if (pathname.startsWith("/field-notes/self-drive")) return null
  const dates = FIELD_NOTE_DATES[pathname]
  if (!dates) return null
  const editor = getEditorById(dates.editorId)
  const computedHeadline =
    headline ??
    pathname
      .split("/")
      .pop()!
      .split("-")
      .map((s, i) => (i === 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s))
      .join(" ")

  return (
    <>
      <Byline
        editor={editor}
        published={dates.datePublished}
        updated={dates.dateModified}
      />
      <ArticleJsonLd
        headline={computedHeadline}
        url={`${SITE}${pathname}`}
        image={image ?? null}
        datePublished={dates.datePublished}
        dateModified={dates.dateModified}
        editor={editor}
      />
    </>
  )
}
