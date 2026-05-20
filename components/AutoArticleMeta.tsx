"use client"

import { usePathname } from "next/navigation"

import { Byline } from "@/components/Byline"
import { ArticleJsonLd } from "@/components/JsonLd/ArticleJsonLd"
import { niels } from "@/lib/editors"
import {
  FALLBACK_DATE,
  FIELD_NOTE_DATES,
} from "@/lib/field-note-dates"

const SITE = "https://safarioverland.com"

/**
 * Drops a visible <Byline> + Article JSON-LD onto every field-note
 * page via the resources layout. Reads pathname client-side
 * (server-rendered for the initial HTML, so SEO is unaffected) and
 * looks up the published/updated dates from the build-time-generated
 * FIELD_NOTE_DATES map.
 *
 * Skipped on the resources index itself — the index isn't a field
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
  const dates = FIELD_NOTE_DATES[pathname] ?? FALLBACK_DATE
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
        editor={niels}
        published={dates.datePublished}
        updated={dates.dateModified}
      />
      <ArticleJsonLd
        headline={computedHeadline}
        url={`${SITE}${pathname}`}
        image={image ?? null}
        datePublished={dates.datePublished}
        dateModified={dates.dateModified}
        editor={niels}
      />
    </>
  )
}
