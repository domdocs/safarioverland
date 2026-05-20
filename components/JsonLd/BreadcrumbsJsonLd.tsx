import type { Crumb } from "@/components/Breadcrumbs"

/**
 * BreadcrumbList structured data. Emit alongside the visible
 * <Breadcrumbs /> using the same `crumbs` array so the schema and UI
 * never drift.
 *
 * The brief follows Google's recommendation: include `item` (the
 * absolute URL) on every crumb except the current page, which can
 * omit it. We allow either by spreading conditionally.
 */
export function BreadcrumbsJsonLd({ crumbs }: { crumbs: Crumb[] }) {
  if (!crumbs || crumbs.length === 0) return null
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.item ? { item: c.item } : {}),
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
