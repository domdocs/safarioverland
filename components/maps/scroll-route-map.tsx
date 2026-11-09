"use client"

/**
 * ScrollRouteMap: "The drive" on a route page. The itinerary (passed as
 * children, each day carrying data-route-day="<key>") scrolls at native
 * speed; the map follows the reading line, about 40% down the viewport.
 *
 * - md and up: two columns, the day-by-day on the left (about 45% at lg,
 *   60% at md) and a sticky map on the right that draws to the current
 *   day and eases its frame towards it.
 * - Phones: a compact strip map pinned under the header while the
 *   section is in view, with the current stop lit.
 * - Clicking a stop on the map scrolls to its day; hovering or focusing
 *   one marks the day in the list (data-map-hover).
 */

import { useCallback, useEffect, useRef, useState } from "react"

import { getRoutePlan } from "@/lib/relaunch/waypoints"

import { routeGeometry } from "./geometry"
import { usePrefersReducedMotion } from "./hooks"
import { RouteMap } from "./route-map"

export type ScrollMapDay = {
  key: string
  /** "Day 01" / "Days 03–04". */
  label: string
  from: string
  to: string
  noDriving: boolean
}

type Props = {
  slug: string
  title: string
  days: ScrollMapDay[]
  children: React.ReactNode
}

const READING_LINE = 0.4

export function ScrollRouteMap({ slug, title, days, children }: Props) {
  const plan = getRoutePlan(slug)
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  /** Index into the plan's days; -1 before the first day is reached. */
  const [active, setActive] = useState(-1)

  const dayEls = useCallback(
    () => Array.from(listRef.current?.querySelectorAll<HTMLElement>("[data-route-day]") ?? []),
    [],
  )

  useEffect(() => {
    if (!plan) return
    const els = dayEls()
    if (els.length === 0) return
    const update = () => {
      const line = window.innerHeight * READING_LINE
      let idx = -1
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) {
          const i = plan.days.findIndex((d) => d.key === el.dataset.routeDay)
          if (i >= 0) idx = i
        }
      }
      setActive(idx)
    }
    update()
    // The observer only wakes us when a day crosses the reading line.
    const io = new IntersectionObserver(update, {
      rootMargin: `-${READING_LINE * 100}% 0px -${(1 - READING_LINE) * 100 - 0.5}% 0px`,
    })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [plan, dayEls])

  const goTo = useCallback(
    (day: number) => {
      const key = plan?.days[day]?.key
      const el = dayEls().find((e) => e.dataset.routeDay === key)
      el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })
    },
    [plan, dayEls, reduced],
  )

  const hover = useCallback(
    (day: number | null) => {
      const key = day === null ? null : plan?.days[day]?.key
      dayEls().forEach((el) => {
        if (el.dataset.routeDay === key) el.setAttribute("data-map-hover", "")
        else el.removeAttribute("data-map-hover")
      })
    },
    [plan, dayEls],
  )

  if (!plan) return <>{children}</>

  const geom = routeGeometry(plan)
  const aspect = geom.viewBox.w / geom.viewBox.h
  const current = active >= 0 ? days.find((d) => d.key === plan.days[active].key) : undefined
  const hasGravel = geom.legs.some((l) => l.gravel && !l.optional)
  const hasOptional = geom.legs.some((l) => l.optional)
  const hasTransfer = geom.legs.some((l) => l.mode === "transfer")

  const caption = (strip: boolean) => (
    <p className={strip ? "mono text-[9px] tracking-[0.16em] text-bone/70" : "mono text-[10px] tracking-[0.16em] text-bone/70"}>
      {current ? (
        <>
          <span className="text-amber">{current.label}</span>
          {!strip && (
            <>
              {" · "}
              {current.from === current.to ? current.to : `${current.from} → ${current.to}`}
            </>
          )}
          {current.noDriving && <span className="ml-2 border border-bone/30 px-1.5 py-0.5 text-bone/60">No driving</span>}
        </>
      ) : (
        <span>{days.length > 0 ? `The whole route · ${days[days.length - 1].label.replace(/^Days? /, "")} days` : ""}</span>
      )}
    </p>
  )

  return (
    <div
      ref={rootRef}
      className="md:grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-10 lg:grid-cols-[minmax(0,9fr)_minmax(0,11fr)] lg:gap-14"
    >
      {/* Phones: a strip map pinned under the header (h-16). */}
      <div className="sticky top-16 z-30 mb-10 border border-rule bg-night md:hidden">
        <RouteMap slug={slug} title={title} variant="strip" activeStop={active} caption={caption(true)} />
      </div>

      <div ref={listRef} className="min-w-0">
        {children}
      </div>

      <div className="hidden md:block">
        <div className="sticky top-20 flex h-[calc(100vh-6rem)] flex-col justify-center">
          <div className="mx-auto w-full" style={{ maxWidth: `calc((100vh - 11rem) * ${aspect.toFixed(3)})` }}>
            <RouteMap
              slug={slug}
              title={title}
              activeStop={active}
              followActive
              onStopSelect={goTo}
              onStopHover={hover}
              caption={caption(false)}
              className="border border-rule"
            />
            <ul aria-hidden className="mt-4 flex flex-wrap gap-x-6 gap-y-2 mono text-[10px] tracking-[0.16em] text-bone/60">
              <LegendItem label="Tar" dash={undefined} />
              {hasGravel && <LegendItem label="Gravel" dash="5 3.5" />}
              {hasOptional && <LegendItem label="Optional" dash="3 3" faint />}
              {hasTransfer && <LegendItem label="Road transfer" dash="0.01 4" bone />}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function LegendItem({ label, dash, faint, bone }: { label: string; dash?: string; faint?: boolean; bone?: boolean }) {
  return (
    <li className="flex items-center gap-2">
      <svg width="28" height="6" viewBox="0 0 28 6" aria-hidden>
        <line
          x1="2"
          y1="3"
          x2="26"
          y2="3"
          className={bone ? "stroke-bone/70" : "stroke-amber"}
          strokeWidth={bone ? 1.8 : 2.5}
          strokeDasharray={dash}
          strokeLinecap="round"
          opacity={faint ? 0.55 : 1}
        />
      </svg>
      {label}
    </li>
  )
}
