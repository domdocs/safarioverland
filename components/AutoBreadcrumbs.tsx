"use client"

import { usePathname } from "next/navigation"

import { Breadcrumbs } from "@/components/Breadcrumbs"
import { BreadcrumbsJsonLd } from "@/components/JsonLd/BreadcrumbsJsonLd"
import { buildCrumbsFromPath } from "@/lib/breadcrumbs"
import { RESERVED_ARTICLE_SLUGS } from "@/lib/field-notes/reserved-slugs"

/**
 * Drop this into a layout or page to render breadcrumbs derived from
 * the current pathname. Renders both the visible nav and the
 * BreadcrumbList JSON-LD so the schema and UI always agree.
 *
 * The component is `"use client"` because it reads the pathname via
 * `usePathname()`. The script tag still appears in the SSR'd HTML
 * (Next.js renders client components server-side first), so SEO is
 * unaffected.
 *
 * Skips render on `/` (no breadcrumbs on the homepage).
 *
 * Pages that need a bespoke trail (custom labels, omitted parents)
 * should call `<Breadcrumbs crumbs={...} />` + `<BreadcrumbsJsonLd />`
 * directly with their own array.
 */
export function AutoBreadcrumbs({
  containerClassName = "container mx-auto px-4 pt-6",
}: {
  containerClassName?: string
}) {
  const pathname = usePathname() ?? "/"
  // DB-backed field notes (/field-notes/[slug]) render their own
  // <Breadcrumbs /> + <BreadcrumbsJsonLd /> so the terminal crumb uses
  // the article title rather than a humanised slug. Skip here for
  // those paths — reserved slugs are the static level-3 pages
  // (planning-guides, conservation, etc.) which still want the auto trail.
  const segments = pathname.split("/").filter(Boolean)
  if (
    segments.length === 2 &&
    segments[0] === "field-notes" &&
    !(RESERVED_ARTICLE_SLUGS as readonly string[]).includes(segments[1])
  ) {
    return null
  }
  const crumbs = buildCrumbsFromPath(pathname)
  if (crumbs.length === 0) return null
  return (
    <div className={containerClassName}>
      <Breadcrumbs crumbs={crumbs} />
      <BreadcrumbsJsonLd crumbs={crumbs} />
    </div>
  )
}
