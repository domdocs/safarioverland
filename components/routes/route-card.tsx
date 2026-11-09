import Link from "next/link"

import { EditorialImage } from "@/components/editorial/editorial-image"
import { BlendOverlay } from "@/components/editorial/blend-overlay"
import { RouteHoverTarget } from "@/components/maps/route-hover"
import { RouteThumb } from "@/components/maps/route-thumb"
import type { RouteSummary } from "@/lib/relaunch/routes"

type Props = {
  route: RouteSummary
  /** 1-based position, rendered as the mono counter. */
  index?: number
  linkLabel?: string
  /** Show the small route-shape thumbnail beside the title. */
  thumbnail?: boolean
}

/**
 * Route card: image, counter, countries and nights, title, hook.
 * Used on /routes and the homepage routes teaser. Hovering or focusing
 * it highlights the route on an OverviewMap inside a RouteHoverProvider.
 */
export function RouteCard({ route, index, linkLabel = "See the route →", thumbnail = false }: Props) {
  return (
    <RouteHoverTarget slug={route.slug}>
    <Link
      href={`/routes/${route.slug}`}
      className="group block border-t border-rule pt-6 transition-colors hover:border-amber"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-card mb-6">
        <EditorialImage
          src={route.heroImage}
          alt={route.title}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <BlendOverlay />
      </div>
      <div className="flex items-baseline gap-3 mb-3">
        {index !== undefined && (
          <span className="mono text-amber">{String(index).padStart(2, "0")}</span>
        )}
        <span className="eyebrow">{[route.countries.join(" · "), route.nights].join(" — ")}</span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-serif text-h3-fluid text-bone leading-tight transition-colors group-hover:text-amber text-balance">
          {route.title}
        </h3>
        {thumbnail && <RouteThumb slug={route.slug} className="mt-1 w-16 shrink-0 opacity-80 transition-opacity group-hover:opacity-100" />}
      </div>
      <p className="mt-3 text-bone-mute leading-relaxed">{route.hook}</p>
      <span className="mt-4 inline-block mono text-amber transition-colors group-hover:text-amber-deep">
        {linkLabel}
      </span>
    </Link>
    </RouteHoverTarget>
  )
}
