import Link from "next/link"

import { EditorialImage } from "@/components/editorial/editorial-image"
import { BlendOverlay } from "@/components/editorial/blend-overlay"
import { RouteHoverTarget } from "@/components/maps/route-hover"
import { RouteThumb } from "@/components/maps/route-thumb"
import { MediaCaption } from "@/components/media/media-caption"
import { cardSrc } from "@/lib/relaunch/media-select"
import { getRouteStats, numbersLine } from "@/lib/relaunch/route-stats"
import type { RouteSummary } from "@/lib/relaunch/routes"
import { routeCardMedia } from "@/lib/relaunch/visuals"
import { cn } from "@/lib/utils"

type Props = {
  route: RouteSummary
  /** 1-based position, rendered as the mono counter. */
  index?: number
  linkLabel?: string
  /** Show the small route-shape thumbnail beside the title. */
  thumbnail?: boolean
  /**
   * "card": photo on top (homepage, landing pages).
   * "row": full-width editorial row, 16:9 photo on one side (the /routes index).
   */
  variant?: "card" | "row"
  /** Rows only: put the photo on the right. */
  flip?: boolean
  /** Card photo aspect. */
  aspect?: string
  sizes?: string
}

/**
 * Route card: a big photograph of the route, counter, countries and
 * nights, title, hook, and a mono numbers line computed from the route
 * data. Hovering or focusing it highlights the route on an OverviewMap
 * inside a RouteHoverProvider.
 */
export function RouteCard({
  route,
  index,
  linkLabel = "See the route →",
  thumbnail = false,
  variant = "card",
  flip = false,
  aspect = "aspect-[4/5]",
  sizes = "(max-width: 768px) 100vw, 33vw",
}: Props) {
  const photo = routeCardMedia(route.slug)
  const stats = getRouteStats(route.slug)
  const row = variant === "row"

  const image = (
    <div className={cn("relative overflow-hidden bg-card", row ? "aspect-[16/9]" : aspect)}>
      <EditorialImage
        src={photo ? (row ? photo.src : cardSrc(photo)) : route.heroImage}
        alt={photo?.alt ?? route.title}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        sizes={row ? "(max-width: 1024px) 100vw, 58vw" : sizes}
      />
      <BlendOverlay />
      {photo && (
        <span className="pointer-events-none absolute bottom-3 left-3 right-3">
          <MediaCaption item={photo} tone="overlay" />
        </span>
      )}
    </div>
  )

  const text = (
    <div>
      <div className="flex items-baseline gap-3 mb-3">
        {index !== undefined && <span className="mono text-amber">{String(index).padStart(2, "0")}</span>}
        <span className="eyebrow">{[route.countries.join(" · "), route.nights].join(" — ")}</span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <h3
          className={cn(
            "font-serif text-bone leading-tight transition-colors group-hover:text-amber text-balance",
            row ? "text-h2-fluid" : "text-h3-fluid",
          )}
        >
          {route.title}
        </h3>
        {thumbnail && (
          <RouteThumb
            slug={route.slug}
            className={cn("mt-1 shrink-0 opacity-80 transition-opacity group-hover:opacity-100", row ? "w-24 md:w-28" : "w-16")}
          />
        )}
      </div>
      <p className="mt-3 text-bone-mute leading-relaxed">{route.hook}</p>
      {stats && <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-bone/70">{numbersLine(stats)}</p>}
      <span className="mt-5 inline-block mono text-amber transition-colors group-hover:text-amber-deep">{linkLabel}</span>
    </div>
  )

  return (
    <RouteHoverTarget slug={route.slug}>
      {row ? (
        <Link
          href={`/routes/${route.slug}`}
          className="group grid gap-8 border-t border-rule pt-8 transition-colors hover:border-amber lg:grid-cols-12 lg:items-center lg:gap-12"
        >
          <div className={cn("lg:col-span-7", flip && "lg:order-2")}>{image}</div>
          <div className={cn("lg:col-span-5", flip && "lg:order-1")}>{text}</div>
        </Link>
      ) : (
        <Link
          href={`/routes/${route.slug}`}
          className="group block border-t border-rule pt-6 transition-colors hover:border-amber"
        >
          <div className="mb-6">{image}</div>
          {text}
        </Link>
      )}
    </RouteHoverTarget>
  )
}
