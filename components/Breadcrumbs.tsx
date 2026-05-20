import Link from "next/link"

/**
 * A single crumb. `href` drives the UI link; `item` is the absolute
 * URL used in the BreadcrumbList JSON-LD. Both are optional —
 * typically the last (current-page) crumb has neither.
 */
export type Crumb = { name: string; href?: string; item?: string }

/**
 * Editorial breadcrumb nav matching the brand's `.eyebrow` treatment
 * — small caps, letter-spacing, amber hover. Uses `/` as the
 * separator to match the editorial type-only mast.
 *
 * Pair with `<BreadcrumbsJsonLd crumbs={...} />` for the structured
 * data; both take the same shape.
 *
 * Legacy `{ items: { label, link }[] }` callers (one usage on
 * /resources/seasonal-guides/bird-watching) are handled via a
 * transparent shim so renaming the API doesn't break the page.
 */
type Props =
  | { crumbs: Crumb[]; items?: never }
  | { items: { label: string; link: string }[]; crumbs?: never }

export function Breadcrumbs(props: Props) {
  const crumbs: Crumb[] =
    "crumbs" in props && props.crumbs
      ? props.crumbs
      : (props.items ?? []).map((i, idx, arr) => ({
          name: i.label,
          href: idx === arr.length - 1 ? undefined : i.link,
        }))

  if (crumbs.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="eyebrow mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-bone-mute">
        {crumbs.map((c, i) => (
          <li key={`${c.name}-${i}`} className="flex items-center gap-2">
            {c.href ? (
              <Link
                href={c.href}
                className="hover:text-amber transition-colors"
              >
                {c.name}
              </Link>
            ) : (
              <span className="text-bone">{c.name}</span>
            )}
            {i < crumbs.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
