"use client"

/**
 * OverviewMap: the three signature routes on one map, each in its own
 * line style and labelled. Hovering a route card (inside a
 * RouteHoverProvider) brings its line forward and dims the others; the
 * legend below links to each route and does the same.
 */

import Link from "next/link"
import { useId, useRef } from "react"

import { cropAround, project } from "@/lib/relaunch/geo/project"
import { ROUTE_PLANS, WAYPOINTS, type RoutePlan } from "@/lib/relaunch/waypoints"
import { cn } from "@/lib/utils"

import { countryLabels, routeGeometry, type LegGeometry } from "./geometry"
import { useInViewOnce, usePrefersReducedMotion } from "./hooks"
import { BaseLayer, DrawnLine, MapLabel, safeId, unitFor, useDrawSchedule, type LineStyle } from "./map-parts"
import { RouteHoverTarget, useRouteHover } from "./route-hover"

/** Drive-leg dash per route, by position in ROUTE_PLANS. */
const ROUTE_DASH = [undefined, [7, 4], [2.5, 2.5]] as const

function overviewLegStyle(leg: LegGeometry, index: number, u: number, emphasis: boolean): LineStyle {
  const w = (emphasis ? 3 : 2.2) * u
  if (leg.mode === "transfer") return { className: "stroke-bone/70", width: w * 0.75, dash: `0.01 ${4 * u}` }
  const dash = ROUTE_DASH[index]
  return {
    className: "stroke-amber",
    width: w,
    dash: dash ? `${dash[0] * u} ${dash[1] * u}` : undefined,
    opacity: leg.optional ? 0.55 : 1,
  }
}

const allPoints = ROUTE_PLANS.flatMap((p) => routeGeometry(p).points)
const VB = cropAround(allPoints, { pad: 0.1, minAspect: 1.45, maxAspect: 1.8 })
const HUBS = ["victoria-falls", "windhoek"] as const
// Country names keep clear of the routes and of the route labels.
const COUNTRIES = countryLabels(VB, [
  ...allPoints,
  ...ROUTE_PLANS.flatMap((p) => {
    const [x, y] = project(p.overviewLabel.lng, p.overviewLabel.lat)
    return [-0.06, 0, 0.06, 0.12].map((dx) => [x + dx * VB.w, y] as [number, number])
  }),
])

type Props = {
  /** Route titles by slug, for the aria-label and legend. */
  titles: Record<string, string>
  className?: string
}

export function OverviewMap({ titles, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const uid = safeId(useId())
  const inView = useInViewOnce(ref)
  const reduced = usePrefersReducedMotion()
  const hovered = useRouteHover()?.slug ?? null
  const u = unitFor(VB, 900)

  const label = `Map of the three self-drive routes: ${ROUTE_PLANS.map((p) => titles[p.slug] ?? p.shortName).join("; ")}.`

  return (
    <figure className={className}>
      <div ref={ref} className="relative w-full overflow-hidden border border-rule bg-night" style={{ aspectRatio: `${VB.w} / ${VB.h}` }}>
        <svg viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} role="img" aria-label={label} className="absolute inset-0 h-full w-full">
          <BaseLayer u={u} />
          {ROUTE_PLANS.map((plan, i) => (
            <OverviewRoute
              key={plan.slug}
              plan={plan}
              index={i}
              uid={`${uid}-${i}`}
              u={u}
              draw={reduced || inView}
              instant={reduced}
              state={hovered === null ? "idle" : hovered === plan.slug ? "on" : "off"}
            />
          ))}
        </svg>

        <div aria-hidden className="pointer-events-none absolute inset-0">
          {COUNTRIES.map((c) => (
            <MapLabel key={c.name} vb={VB} x={c.x} y={c.y} anchor="c" className="mono text-[9px] sm:text-[10px] tracking-[0.35em] text-bone/25">
              {c.name}
            </MapLabel>
          ))}
          {HUBS.map((id) => {
            const geomStop = ROUTE_PLANS.map((p) => routeGeometry(p).stops.find((s) => s.id === id)).find(Boolean)
            if (!geomStop) return null
            return (
              <MapLabel key={id} vb={VB} x={geomStop.x} y={geomStop.y} anchor={id === "windhoek" ? "sw" : "ne"} className="mono text-[9px] tracking-[0.18em] text-bone/60 hidden sm:block">
                {WAYPOINTS[id].name}
              </MapLabel>
            )
          })}
          {ROUTE_PLANS.map((plan, i) => {
            const [x, y] = project(plan.overviewLabel.lng, plan.overviewLabel.lat)
            const state = hovered === null ? "idle" : hovered === plan.slug ? "on" : "off"
            return (
              <MapLabel
                key={plan.slug}
                vb={VB}
                x={x}
                y={y}
                anchor={plan.overviewLabel.anchor}
                className={cn(
                  "mono text-[10px] sm:text-[11px] tracking-[0.18em] transition-opacity duration-300",
                  state === "on" ? "text-amber" : "text-bone/80",
                  state === "off" && "opacity-30",
                )}
              >
                <span className="text-amber">{String(i + 1).padStart(2, "0")}</span> {plan.shortName}
              </MapLabel>
            )
          })}
        </div>
      </div>

      <figcaption>
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3 mono text-[10px] tracking-[0.16em] text-bone/70">
          {ROUTE_PLANS.map((plan, i) => {
            const dash = ROUTE_DASH[i]
            return (
              <li key={plan.slug}>
                <RouteHoverTarget slug={plan.slug}>
                  <Link href={`/routes/${plan.slug}`} className="flex items-center gap-2 transition-colors hover:text-amber focus-visible:text-amber">
                    <svg width="28" height="6" viewBox="0 0 28 6" aria-hidden>
                      <line x1="2" y1="3" x2="26" y2="3" className="stroke-amber" strokeWidth="2.2" strokeLinecap="round" strokeDasharray={dash ? `${dash[0]} ${dash[1]}` : undefined} />
                    </svg>
                    {titles[plan.slug] ?? plan.shortName}
                  </Link>
                </RouteHoverTarget>
              </li>
            )
          })}
          {ROUTE_PLANS.some((p) => p.days.some((d) => d.legs.some((l) => l.mode === "transfer"))) && (
            <li className="flex items-center gap-2 text-bone/50" aria-hidden>
              <svg width="28" height="6" viewBox="0 0 28 6">
                <line x1="2" y1="3" x2="26" y2="3" className="stroke-bone/70" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="0.01 4" />
              </svg>
              Road transfer
            </li>
          )}
        </ul>
      </figcaption>
    </figure>
  )
}

function OverviewRoute({
  plan,
  index,
  uid,
  u,
  draw,
  instant,
  state,
}: {
  plan: RoutePlan
  index: number
  uid: string
  u: number
  draw: boolean
  instant: boolean
  state: "idle" | "on" | "off"
}) {
  const geom = routeGeometry(plan)
  const last = plan.days.length - 1
  const schedule = useDrawSchedule(geom.legs, plan.days.length, draw ? last : -1, geom.totalLength, instant)
  return (
    <g aria-hidden className="transition-opacity duration-300" opacity={state === "off" ? 0.25 : 1}>
      {geom.legs.map((leg, i) => (
        <DrawnLine
          key={i}
          id={`${uid}-l${i}`}
          d={leg.d}
          vb={VB}
          style={overviewLegStyle(leg, index, u, state === "on")}
          shown={schedule.legs[i].shown}
          transition={schedule.legs[i].transition}
        />
      ))}
      {geom.stops
        .filter((s) => s.kind === "overnight")
        .map((s) => (
          <circle
            key={s.id}
            cx={s.x}
            cy={s.y}
            r={2.6 * u}
            className={cn("transition-colors duration-500", draw ? "fill-amber" : "fill-night stroke-amber")}
            strokeWidth={u}
            style={{ transitionDelay: `${schedule.arrive[s.firstDay] ?? 0}ms` }}
          />
        ))}
    </g>
  )
}
