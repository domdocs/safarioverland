/**
 * RouteThumb: a small, static outline of one route on its own crop of
 * the base map, for the route cards. No motion, no labels; decorative
 * (the card carries the title).
 */

import { GEO_BORDERS, GEO_COUNTRIES } from "@/lib/relaunch/geo/southern-africa"
import { getRoutePlan } from "@/lib/relaunch/waypoints"
import { cn } from "@/lib/utils"

import { routeGeometry } from "./geometry"

export function RouteThumb({ slug, className }: { slug: string; className?: string }) {
  const plan = getRoutePlan(slug)
  if (!plan) return null
  const geom = routeGeometry(plan)
  const vb = geom.viewBox
  const u = vb.w / 80
  return (
    <svg
      viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
      aria-hidden
      focusable="false"
      className={cn("block", className)}
    >
      {GEO_COUNTRIES.map((c) => (
        <path key={c.id} d={c.d} className="fill-bone/[0.05]" />
      ))}
      <path d={GEO_BORDERS} fill="none" className="stroke-bone/20" strokeWidth={0.6 * u} />
      {geom.legs.map((leg, i) => (
        <path
          key={i}
          d={leg.d}
          fill="none"
          className={leg.mode === "transfer" ? "stroke-bone/60" : "stroke-amber"}
          strokeWidth={(leg.mode === "transfer" ? 1 : 1.5) * u}
          strokeDasharray={leg.mode === "transfer" ? `0.01 ${2.5 * u}` : leg.optional ? `${2 * u} ${2 * u}` : undefined}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={leg.optional ? 0.55 : 1}
        />
      ))}
      {geom.stops
        .filter((s) => s.kind === "overnight" || s.kind === "airport")
        .map((s) => (
          <circle key={s.id} cx={s.x} cy={s.y} r={1.6 * u} className="fill-amber" />
        ))}
    </svg>
  )
}
