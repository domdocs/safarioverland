"use client"

import { usePathname } from "next/navigation"

import { Breadcrumbs } from "@/components/Breadcrumbs"
import { BreadcrumbsJsonLd } from "@/components/JsonLd/BreadcrumbsJsonLd"
import { buildCrumbsFromPath } from "@/lib/breadcrumbs"

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
  const crumbs = buildCrumbsFromPath(pathname)
  if (crumbs.length === 0) return null
  return (
    <div className={containerClassName}>
      <Breadcrumbs crumbs={crumbs} />
      <BreadcrumbsJsonLd crumbs={crumbs} />
    </div>
  )
}
