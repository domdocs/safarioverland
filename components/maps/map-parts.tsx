"use client"

/**
 * Shared pieces of the route maps: the base layer (countries, borders,
 * coast), self-drawing route lines, and the HTML label overlay.
 *
 * Lines draw with a mask: a solid stroke in the mask is revealed with
 * stroke-dashoffset (pathLength = 1), so the visible line can be solid,
 * dashed or dotted and still draw itself along its length.
 */

import { useEffect, useMemo, useRef, type CSSProperties, type ReactNode } from "react"

import { GEO_BORDERS, GEO_COAST, GEO_COUNTRIES } from "@/lib/relaunch/geo/southern-africa"
import type { ViewBox } from "@/lib/relaunch/geo/project"
import type { LabelAnchor } from "@/lib/relaunch/waypoints"
import { cn } from "@/lib/utils"

import type { LegGeometry } from "./geometry"

/** Stroke unit: one "pixel" at the size the maps are usually shown. */
export const unitFor = (vb: ViewBox, displayWidth = 640) => vb.w / displayWidth

export const toPct = (vb: ViewBox, x: number, y: number) => ({
  left: `${((x - vb.x) / vb.w) * 100}%`,
  top: `${((y - vb.y) / vb.h) * 100}%`,
})

export function BaseLayer({ u }: { u: number }) {
  return (
    <g aria-hidden>
      {GEO_COUNTRIES.map((c) => (
        <path key={c.id} d={c.d} className="fill-bone/[0.035]" />
      ))}
      <path d={GEO_COAST} fill="none" className="stroke-bone/25" strokeWidth={0.9 * u} strokeLinejoin="round" />
      <path
        d={GEO_BORDERS}
        fill="none"
        className="stroke-bone/15"
        strokeWidth={0.9 * u}
        strokeDasharray={`${3 * u} ${2 * u}`}
        strokeLinejoin="round"
      />
    </g>
  )
}

// ─── Drawing schedule ────────────────────────────────────────────

const FULL_DRAW_MS = 2800
const MIN_LEG_MS = 450
const MAX_LEG_MS = 1600
const JUMP_MS = 1500
const EASE = "cubic-bezier(.45,.05,.3,1)"

export type DrawSchedule = {
  legs: { shown: boolean; transition: string }[]
  /** ms after which each day's end is reached (only for days newly drawn). */
  arrive: Record<number, number>
}

/**
 * Which legs are drawn, and with what transition. When the drawn day
 * moves forward, the newly drawn legs run one after another; moving back
 * hides them quickly. Memoised on `drawnDay` so a re-render mid-draw
 * doesn't restart or cancel the transitions.
 */
export function useDrawSchedule(
  legs: LegGeometry[],
  dayCount: number,
  drawnDay: number,
  totalLength: number,
  instant: boolean,
): DrawSchedule {
  const prevRef = useRef(-1)
  const schedule = useMemo<DrawSchedule>(() => {
    const prev = prevRef.current
    const msPerUnit = FULL_DRAW_MS / Math.max(totalLength, 1)
    const out: DrawSchedule = { legs: legs.map(() => ({ shown: false, transition: "none" })), arrive: {} }
    const legMs = (leg: LegGeometry) => Math.min(MAX_LEG_MS, Math.max(MIN_LEG_MS, leg.length * msPerUnit))
    // A long jump (a fast scroll, a click on a far stop) draws at most
    // this long in all; the first draw gets the full time.
    const budget = prev < 0 ? FULL_DRAW_MS : JUMP_MS
    const pending = legs.filter((l) => l.day > prev && l.day <= drawnDay).reduce((s, l) => s + legMs(l), 0)
    const squeeze = pending > budget ? budget / pending : 1
    let t = 0
    for (let d = 0; d < dayCount; d++) {
      legs.forEach((leg, i) => {
        if (leg.day !== d) return
        const shown = d <= drawnDay
        let transition = "stroke-dashoffset 0ms"
        if (instant) transition = "none"
        else if (shown && d > prev) {
          const dur = legMs(leg) * squeeze
          transition = `stroke-dashoffset ${Math.round(dur)}ms ${EASE} ${Math.round(t)}ms`
          t += dur
        } else if (!shown && d <= prev) transition = "stroke-dashoffset 250ms ease-out"
        out.legs[i] = { shown, transition }
      })
      if (d > prev && d <= drawnDay) out.arrive[d] = instant ? 0 : t
    }
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawnDay, instant, legs])
  useEffect(() => {
    prevRef.current = drawnDay
  }, [drawnDay])
  return schedule
}

// ─── Lines ───────────────────────────────────────────────────────

export type LineStyle = {
  className: string
  width: number
  dash?: string
  opacity?: number
}

export function DrawnLine({
  id,
  d,
  vb,
  style,
  shown,
  transition,
}: {
  id: string
  d: string
  vb: ViewBox
  style: LineStyle
  shown: boolean
  transition: string
}) {
  return (
    <>
      <mask id={id} maskUnits="userSpaceOnUse" x={vb.x} y={vb.y} width={vb.w} height={vb.h}>
        <path
          d={d}
          fill="none"
          stroke="#fff"
          strokeWidth={style.width * 4}
          strokeLinecap="butt"
          pathLength={1}
          strokeDasharray="1 1"
          style={{ strokeDashoffset: shown ? 0 : 1, transition }}
        />
      </mask>
      <path
        d={d}
        mask={`url(#${id})`}
        fill="none"
        className={style.className}
        strokeWidth={style.width}
        strokeDasharray={style.dash}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={style.opacity}
      />
    </>
  )
}

// ─── Labels ──────────────────────────────────────────────────────

const ANCHOR: Record<LabelAnchor, string> = {
  e: "translate(10px, -50%)",
  w: "translate(calc(-100% - 10px), -50%)",
  n: "translate(-50%, calc(-100% - 9px))",
  s: "translate(-50%, 9px)",
  ne: "translate(6px, calc(-100% - 5px))",
  nw: "translate(calc(-100% - 6px), calc(-100% - 5px))",
  se: "translate(6px, 5px)",
  sw: "translate(calc(-100% - 6px), 5px)",
}

export function MapLabel({
  vb,
  x,
  y,
  anchor = "e",
  className,
  style,
  children,
}: {
  vb: ViewBox
  x: number
  y: number
  anchor?: LabelAnchor | "c"
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  const align = anchor === "w" || anchor === "nw" || anchor === "sw" ? "text-right" : anchor === "e" || anchor === "ne" || anchor === "se" ? "text-left" : "text-center"
  return (
    <span
      className={cn("absolute whitespace-nowrap leading-tight", align, className)}
      style={{ ...toPct(vb, x, y), transform: anchor === "c" ? "translate(-50%, -50%)" : ANCHOR[anchor], ...style }}
    >
      {children}
    </span>
  )
}

/** "a:b" ids from useId aren't safe inside url(#…). */
export const safeId = (id: string) => id.replace(/[^a-zA-Z0-9_-]/g, "")
