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
  labelKey,
  children,
}: {
  vb: ViewBox
  x: number
  y: number
  anchor?: LabelAnchor | "c"
  className?: string
  style?: CSSProperties
  /** Opts the label into collision handling (see placeLabels). */
  labelKey?: string
  children: ReactNode
}) {
  const align = anchor === "w" || anchor === "nw" || anchor === "sw" ? "text-right" : anchor === "e" || anchor === "ne" || anchor === "se" ? "text-left" : "text-center"
  return (
    <span
      data-label={labelKey}
      className={cn("absolute whitespace-nowrap leading-tight", align, className)}
      style={{ ...toPct(vb, x, y), transform: anchor === "c" ? "translate(-50%, -50%)" : ANCHOR[anchor], ...style }}
    >
      {children}
    </span>
  )
}

/** "a:b" ids from useId aren't safe inside url(#…). */
export const safeId = (id: string) => id.replace(/[^a-zA-Z0-9_-]/g, "")

// ─── Label collision handling ────────────────────────────────────

/** Pixel offsets matching ANCHOR, as the box's top-left for a w×h label at (px, py). */
function anchorBox(anchor: LabelAnchor | "c", px: number, py: number, w: number, h: number): Box {
  const at = (x: number, y: number): Box => ({ x, y, w, h })
  switch (anchor) {
    case "e": return at(px + 10, py - h / 2)
    case "w": return at(px - w - 10, py - h / 2)
    case "n": return at(px - w / 2, py - h - 9)
    case "s": return at(px - w / 2, py + 9)
    case "ne": return at(px + 6, py - h - 5)
    case "nw": return at(px - w - 6, py - h - 5)
    case "se": return at(px + 6, py + 5)
    case "sw": return at(px - w - 6, py + 5)
    default: return at(px - w / 2, py - h / 2)
  }
}

export type Box = { x: number; y: number; w: number; h: number }

const GAP = 3
const hit = (a: Box, b: Box) =>
  a.x < b.x + b.w + GAP && b.x < a.x + a.w + GAP && a.y < b.y + b.h + GAP && b.y < a.y + a.h + GAP

/** Alternatives, nearest the preferred anchor first. */
const FALLBACK: Record<LabelAnchor, LabelAnchor[]> = {
  e: ["e", "ne", "se", "w", "n", "s", "nw", "sw"],
  w: ["w", "nw", "sw", "e", "n", "s", "ne", "se"],
  n: ["n", "ne", "nw", "s", "e", "w", "se", "sw"],
  s: ["s", "se", "sw", "n", "e", "w", "ne", "nw"],
  ne: ["ne", "e", "n", "nw", "se", "w", "s", "sw"],
  nw: ["nw", "w", "n", "ne", "sw", "e", "s", "se"],
  se: ["se", "e", "s", "sw", "ne", "w", "n", "nw"],
  sw: ["sw", "w", "s", "se", "nw", "e", "n", "ne"],
}

export type LabelSpec = {
  key: string
  /** Marker position as a fraction of the frame. */
  fx: number
  fy: number
  anchor: LabelAnchor | "c"
  /** Higher wins; placed first. */
  priority: number
  /** Always shown (the active stop): never hidden, only moved. */
  keep?: boolean
  /** Centred labels (countries, parks) don't move: shown or hidden. */
  fixed?: boolean
}

export type LabelPlacement = { anchor: LabelAnchor | "c"; visible: boolean }

/**
 * Greedy label placement at the rendered size. Labels go in priority
 * order; each takes the first of its anchors (preferred first) whose box
 * stays inside the frame and clear of the HUD and of labels already
 * placed, preferring one that also clears other stops' markers. A label
 * with no clear anchor is hidden, except a `keep` label, which takes
 * the least-crowded anchor.
 */
export function placeLabels(
  specs: (LabelSpec & { w: number; h: number })[],
  frame: { w: number; h: number },
  hud: Box[],
  markers: { x: number; y: number }[],
): Map<string, LabelPlacement> {
  const out = new Map<string, LabelPlacement>()
  const placed: Box[] = [...hud]
  const markerBoxes = markers.map((m) => ({ x: m.x - 5, y: m.y - 5, w: 10, h: 10 }))
  const sorted = [...specs].sort((a, b) => Number(Boolean(b.keep)) - Number(Boolean(a.keep)) || b.priority - a.priority)
  for (const s of sorted) {
    const px = s.fx * frame.w
    const py = s.fy * frame.h
    const own = { x: px - 5, y: py - 5, w: 10, h: 10 }
    const tries: (LabelAnchor | "c")[] = s.anchor === "c" || s.fixed ? [s.anchor] : FALLBACK[s.anchor]
    let best: { anchor: LabelAnchor | "c"; box: Box; cost: number } | null = null
    for (const anchor of tries) {
      const box = anchorBox(anchor, px, py, s.w, s.h)
      const outside = box.x < 2 || box.y < 2 || box.x + box.w > frame.w - 2 || box.y + box.h > frame.h - 2
      const hard = placed.filter((p) => hit(box, p)).length + (outside ? 1 : 0)
      const soft = markerBoxes.filter((m) => !hit(m, own) && hit(box, m)).length
      const cost = hard * 100 + soft
      if (!best || cost < best.cost) best = { anchor, box, cost }
      if (cost === 0) break
    }
    if (!best) continue
    const visible = best.cost < 100 || Boolean(s.keep)
    out.set(s.key, { anchor: best.anchor, visible })
    if (visible) placed.push(best.box)
  }
  return out
}

export const anchorTransform = (anchor: LabelAnchor | "c") => (anchor === "c" ? "translate(-50%, -50%)" : ANCHOR[anchor])
export const anchorAlign = (anchor: LabelAnchor | "c") =>
  anchor === "w" || anchor === "nw" || anchor === "sw" ? "right" : anchor === "e" || anchor === "ne" || anchor === "se" ? "left" : "center"
