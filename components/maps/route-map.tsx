"use client"

/**
 * RouteMap: one self-drive route on a quiet base map of southern Africa.
 *
 * - The amber line draws itself when the map first enters the viewport.
 *   Tar legs are solid, gravel legs dashed, optional legs dashed and
 *   faint, road transfers (not self-drive) dotted bone.
 * - `activeStop` is an index into the route's days (lib/relaunch/waypoints
 *   ROUTE_PLANS): the line is drawn up to that day's end, which is lit.
 *   null/undefined draws the whole route.
 * - With `followActive`, the frame eases towards the current day.
 * - prefers-reduced-motion: the whole line, a static frame, no pulse;
 *   the current stop still lights up.
 *
 * The SVG is role="img" with a one-line summary; the itinerary on the
 * page stays the accessible source of truth. Stop labels are buttons
 * only when `onStopSelect` is given.
 */

import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react"

import type { ViewBox } from "@/lib/relaunch/geo/project"
import { getRoutePlan, routeMapLabel } from "@/lib/relaunch/waypoints"
import { cn } from "@/lib/utils"

import { countryLabels, dayViewBox, kmPerUnit, routeGeometry, type LegGeometry } from "./geometry"
import { useInViewOnce, usePrefersReducedMotion } from "./hooks"
import {
  BaseLayer,
  DrawnLine,
  MapLabel,
  anchorAlign,
  anchorTransform,
  placeLabels,
  safeId,
  unitFor,
  useDrawSchedule,
  type Box,
  type LabelSpec,
  type LineStyle,
} from "./map-parts"

type Props = {
  slug: string
  /** Route title, for the aria-label. */
  title: string
  activeStop?: number | null
  /** "full" (default) or "strip": a short wide frame for phones (decorative, aria-hidden). */
  variant?: "full" | "strip"
  /** Ease the frame towards the active day. */
  followActive?: boolean
  /** Called with a day index when a stop label is clicked. */
  onStopSelect?: (day: number) => void
  /** Called with a day index (or null) when a stop label is hovered or focused. */
  onStopHover?: (day: number | null) => void
  /** Shown top-left over the map (e.g. the day counter). */
  caption?: ReactNode
  className?: string
}

export function legStyle(leg: LegGeometry, u: number): LineStyle {
  if (leg.mode === "transfer") return { className: "stroke-bone/70", width: 1.8 * u, dash: `0.01 ${4 * u}` }
  if (leg.optional) return { className: "stroke-amber", width: 2.2 * u, dash: `${3 * u} ${3 * u}`, opacity: 0.55 }
  if (leg.gravel) return { className: "stroke-amber", width: 2.5 * u, dash: `${5 * u} ${3.5 * u}` }
  return { className: "stroke-amber", width: 2.5 * u }
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** Eases the viewBox towards `target` over ~700 ms. */
function useAnimatedViewBox(target: ViewBox, animate: boolean): ViewBox {
  const [vb, setVb] = useState(target)
  const current = useRef(target)
  const key = `${target.x} ${target.y} ${target.w} ${target.h}`
  useEffect(() => {
    if (!animate) {
      current.current = target
      setVb(target)
      return
    }
    const from = current.current
    const start = performance.now()
    let raf = 0
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 700)
      const e = ease(t)
      const next = {
        x: from.x + (target.x - from.x) * e,
        y: from.y + (target.y - from.y) * e,
        w: from.w + (target.w - from.w) * e,
        h: from.h + (target.h - from.h) * e,
      }
      current.current = next
      setVb(next)
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, animate])
  return vb
}

const NICE_KM = [10, 20, 25, 50, 100, 200, 250, 500]

// useLayoutEffect warns on the server; labels are placed in the browser only.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect

/**
 * Hides or moves labels that would collide at the rendered size: the
 * active stop always shows; then overnights (start and end first), named
 * stops, park names and, last, country names. The HUD (day caption,
 * north arrow, scale bar) is an obstacle for all of them. Runs after
 * every render (the frame animates) and on resize; writes to the DOM
 * directly so placement never costs another render.
 */
function useLabelLayout(specs: Map<string, LabelSpec>, markers: { fx: number; fy: number }[]) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const state = useRef({ specs, markers })
  state.current = { specs, markers }

  const layout = useCallback(() => {
    const ov = overlayRef.current
    if (!ov) return
    const frame = { w: ov.clientWidth, h: ov.clientHeight }
    if (!frame.w || !frame.h) return
    const o = ov.getBoundingClientRect()
    const hud: Box[] = []
    ov.querySelectorAll<HTMLElement>("[data-hud]").forEach((el) => {
      const range = document.createRange()
      range.selectNodeContents(el)
      for (const r of Array.from(range.getClientRects())) {
        if (r.width > 0 && r.height > 0) hud.push({ x: r.left - o.left, y: r.top - o.top, w: r.width, h: r.height })
      }
    })
    const els = new Map<string, HTMLElement>()
    const measured: (LabelSpec & { w: number; h: number })[] = []
    ov.querySelectorAll<HTMLElement>("[data-label]").forEach((el) => {
      const spec = state.current.specs.get(el.dataset.label ?? "")
      // display:none (labels that only show from sm up) measures 0.
      if (!spec || el.offsetWidth === 0) return
      els.set(spec.key, el)
      measured.push({ ...spec, w: el.offsetWidth, h: el.offsetHeight })
    })
    const markers = state.current.markers.map((m) => ({ x: m.fx * frame.w, y: m.fy * frame.h }))
    const placed = placeLabels(measured, frame, hud, markers)
    els.forEach((el, key) => {
      const p = placed.get(key)
      if (!p) return
      el.style.transform = anchorTransform(p.anchor)
      el.style.textAlign = anchorAlign(p.anchor)
      el.style.visibility = p.visible ? "" : "hidden"
    })
  }, [])

  useIsoLayoutEffect(layout)

  useEffect(() => {
    const ov = overlayRef.current
    if (!ov) return
    const ro = new ResizeObserver(() => layout())
    ro.observe(ov)
    document.fonts?.ready.then(() => layout())
    return () => ro.disconnect()
  }, [layout])

  return overlayRef
}

export function RouteMap({
  slug,
  title,
  activeStop,
  variant = "full",
  followActive = false,
  onStopSelect,
  onStopHover,
  caption,
  className,
}: Props) {
  const plan = getRoutePlan(slug)
  const ref = useRef<HTMLDivElement>(null)
  const uid = safeId(useId())
  const reduced = usePrefersReducedMotion()
  const inView = useInViewOnce(ref)

  const geom = plan ? routeGeometry(plan) : null
  const dayCount = plan?.days.length ?? 0
  const lastDay = dayCount - 1
  const active = activeStop ?? null
  const target = active ?? lastDay
  const drawnDay = reduced ? lastDay : inView ? target : -1
  const schedule = useDrawSchedule(geom?.legs ?? [], dayCount, drawnDay, geom?.totalLength ?? 1, reduced)

  const strip = variant === "strip"
  const baseVb = geom ? (strip ? geom.stripViewBox : geom.viewBox) : { x: 0, y: 0, w: 1, h: 1 }
  const cameraTarget =
    geom && !strip && followActive && !reduced && inView && active !== null ? dayViewBox(geom, active) : baseVb
  const vb = useAnimatedViewBox(cameraTarget, !reduced)
  const u = unitFor(vb, strip ? 380 : 640)

  const countries = useMemo(
    () => (geom && !strip ? countryLabels(geom.viewBox, geom.points) : []),
    [geom, strip],
  )

  const activeEnd = active !== null && geom ? geom.dayEnds[active] : null
  const inVb = (x: number, y: number) => x >= vb.x && x <= vb.x + vb.w && y >= vb.y && y <= vb.y + vb.h
  const fx = (x: number) => (x - vb.x) / vb.w
  const fy = (y: number) => (y - vb.y) / vb.h

  // In the strip only the current stop is labelled: keep it inside the frame.
  const stripAnchor = (x: number) => {
    const f = (x - vb.x) / vb.w
    return f < 0.35 ? "se" : f > 0.65 ? "sw" : "s"
  }

  const specs = new Map<string, LabelSpec>()
  for (const c of countries) specs.set(`c:${c.name}`, { key: `c:${c.name}`, fx: fx(c.x), fy: fy(c.y), anchor: "c", priority: 0, fixed: true })
  if (geom && !strip) {
    for (const l of geom.extraLabels) specs.set(`x:${l.text}`, { key: `x:${l.text}`, fx: fx(l.x), fy: fy(l.y), anchor: "c", priority: 10, fixed: true })
  }
  for (const s of geom?.stops ?? []) {
    const isActive = s.id === activeEnd
    const base = s.kind === "stop" ? 20 : 40
    specs.set(`s:${s.id}`, {
      key: `s:${s.id}`,
      fx: fx(s.x),
      fy: fy(s.y),
      anchor: strip ? stripAnchor(s.x) : s.anchor,
      priority: base + (s.isStart || s.isEnd ? 5 : 0),
      keep: isActive,
    })
  }
  const markers = (geom?.stops ?? []).filter((s) => !(strip && s.kind === "stop")).map((s) => ({ fx: fx(s.x), fy: fy(s.y) }))
  const overlayRef = useLabelLayout(specs, markers)

  if (!plan || !geom) return null
  /** The day a stop's label leads to: the first day ending there, else the first day it's reached. */
  const dayFor = (id: string, firstDay: number) => {
    const i = geom.dayEnds.findIndex((e) => e === id)
    return i >= 0 ? i : firstDay
  }

  // Scale bar: a round distance about a fifth of the frame wide.
  const kpu = kmPerUnit(vb.y + vb.h / 2)
  const km = NICE_KM.reduce((best, n) => (Math.abs(n / kpu - vb.w * 0.2) < Math.abs(best / kpu - vb.w * 0.2) ? n : best))
  const barPct = (km / kpu / vb.w) * 100

  return (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden bg-night", className)}
      style={{ aspectRatio: `${baseVb.w} / ${baseVb.h}` }}
    >
      <svg
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        preserveAspectRatio="xMidYMid slice"
        {...(strip ? { "aria-hidden": true } : { role: "img", "aria-label": routeMapLabel(plan, title) })}
        className="absolute inset-0 h-full w-full"
      >
        <BaseLayer u={u} />

        <g aria-hidden>
          {/* The whole route, faint, so the shape is there before it draws. */}
          {!reduced &&
            geom.legs.map((leg, i) => (
              <path
                key={`g${i}`}
                d={leg.d}
                fill="none"
                className="stroke-bone/20"
                strokeWidth={1.4 * u}
                strokeDasharray={leg.mode === "transfer" ? `0.01 ${4 * u}` : undefined}
                strokeLinecap="round"
              />
            ))}

          {geom.legs.map((leg, i) => (
            <DrawnLine
              key={i}
              id={`${uid}-l${i}`}
              d={leg.d}
              vb={vb}
              style={legStyle(leg, u)}
              shown={schedule.legs[i].shown}
              transition={schedule.legs[i].transition}
            />
          ))}

          {geom.stops.map((s) => {
            const reached = s.firstDay <= drawnDay
            const isActive = s.id === activeEnd
            const delay = `${schedule.arrive[s.firstDay] ?? 0}ms`
            const through = s.kind === "stop"
            if (strip && through) return null
            return (
              <g key={s.id}>
                {isActive && (
                  <>
                    <circle cx={s.x} cy={s.y} r={14 * u} className="fill-amber/15" />
                    {!reduced && (
                      <circle key={`p${active}`} cx={s.x} cy={s.y} r={6 * u} fill="none" className="stroke-amber" strokeWidth={u}>
                        <animate attributeName="r" from={6 * u} to={20 * u} dur="1.8s" begin="0.2s" repeatCount="1" fill="freeze" />
                        <animate attributeName="opacity" from="0.9" to="0" dur="1.8s" begin="0.2s" repeatCount="1" fill="freeze" />
                      </circle>
                    )}
                  </>
                )}
                {(s.isStart || s.isEnd) && !through && (
                  <circle cx={s.x} cy={s.y} r={7.5 * u} fill="none" className="stroke-bone/40" strokeWidth={u} />
                )}
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={(isActive ? 6 : through ? 2.6 : 4) * u}
                  strokeWidth={1.3 * u}
                  className={cn(
                    "transition-colors duration-500",
                    through
                      ? reached
                        ? "fill-night stroke-amber"
                        : "fill-night stroke-bone/50"
                      : reached || isActive
                        ? "fill-amber stroke-amber"
                        : "fill-night stroke-amber",
                  )}
                  style={{ transitionDelay: delay }}
                />
              </g>
            )
          })}
        </g>
      </svg>

      {/* Labels: HTML over the SVG so the type stays a readable size. */}
      <div ref={overlayRef} className="pointer-events-none absolute inset-0" aria-hidden={onStopSelect ? undefined : true}>
        {countries
          .filter((c) => inVb(c.x, c.y))
          .map((c) => (
            <MapLabel key={c.name} labelKey={`c:${c.name}`} vb={vb} x={c.x} y={c.y} anchor="c" className="mono text-[10px] tracking-[0.35em] text-bone/25">
              {c.name}
            </MapLabel>
          ))}
        {!strip &&
          geom.extraLabels
            .filter((l) => inVb(l.x, l.y))
            .map((l) => (
              <MapLabel key={l.text} labelKey={`x:${l.text}`} vb={vb} x={l.x} y={l.y} anchor="c" className="mono text-[9px] tracking-[0.2em] text-bone/35 hidden sm:block">
                {l.text}
              </MapLabel>
            ))}

        {geom.stops.map((s) => {
          const isActive = s.id === activeEnd
          const through = s.kind === "stop"
          if (strip && !isActive) return null
          if (!inVb(s.x, s.y)) return null
          const tag = s.isStart && s.isEnd ? "Start and end" : s.isStart ? "Start" : s.isEnd ? "End" : null
          const text = (
            <>
              {tag && !strip && <span className="block text-[8px] tracking-[0.22em] text-amber">{tag}</span>}
              {s.name}
            </>
          )
          const labelClass = cn(
            "mono tracking-[0.18em] transition-colors duration-500",
            through ? "text-[9px] text-bone/50 hidden sm:block" : "text-[10px] sm:text-[11px] text-bone/70",
            isActive && "text-bone",
          )
          const day = dayFor(s.id, s.firstDay)
          return (
            <MapLabel key={s.id} labelKey={`s:${s.id}`} vb={vb} x={s.x} y={s.y} anchor={strip ? stripAnchor(s.x) : s.anchor} className={labelClass}>
              {onStopSelect ? (
                <button
                  type="button"
                  className="pointer-events-auto uppercase tracking-[inherit] hover:text-amber focus-visible:text-amber focus-visible:outline focus-visible:outline-1 focus-visible:outline-amber"
                  onClick={() => onStopSelect(day)}
                  onMouseEnter={() => onStopHover?.(day)}
                  onMouseLeave={() => onStopHover?.(null)}
                  onFocus={() => onStopHover?.(day)}
                  onBlur={() => onStopHover?.(null)}
                  aria-label={`${s.name}: go to this day in the itinerary`}
                >
                  {text}
                </button>
              ) : (
                text
              )}
            </MapLabel>
          )
        })}

        {caption && (
          <div data-hud className="absolute left-3 top-3 right-3">
            {caption}
          </div>
        )}

        {!strip && (
          <>
            <span
              aria-hidden
              data-hud
              className="absolute bottom-3 left-3 flex flex-col items-center leading-none mono text-[9px] tracking-[0.1em] text-bone/50"
            >
              <span>↑</span>
              <span>N</span>
            </span>
            <span
              aria-hidden
              data-hud
              className="absolute bottom-3 left-9 flex flex-col gap-1 mono text-[9px] tracking-[0.18em] text-bone/50"
              style={{ width: `${barPct}%` }}
            >
              <span className="block h-1.5 w-full border-x border-b border-bone/40" />
              <span className="whitespace-nowrap">{km} km</span>
            </span>
          </>
        )}
      </div>
    </div>
  )
}
