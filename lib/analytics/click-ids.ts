/**
 * Cookie-free ad-click attribution (Google Ads offline conversion import).
 *
 * When a visitor lands with gclid / gbraid / wbraid or utm_* in the URL we
 * keep them in localStorage (never a cookie, never sent anywhere) until
 * they submit a brief, when they travel with the brief payload and are
 * stored on the `briefs` row. A weekly export of briefs carrying a gclid
 * is uploaded to Google Ads by hand — see handoff/ANALYTICS.md.
 *
 * Model:
 *   - first: the first landing that carried any tracked parameter (UTMs
 *     and click IDs). Not overwritten while it is still valid.
 *   - lastClick: the most recent landing that carried a click ID. Google
 *     credits the last ad click, so this is the click ID we submit.
 * Each touch expires 90 days after capture — Google's click ID lifetime
 * for offline import.
 *
 * Everything browser-facing is wrapped in try/catch: storage can be full,
 * disabled or blocked, and none of that may break rendering or a brief.
 */

import { z } from "zod"

export const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid"] as const
export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const
export const TRACKED_KEYS = [...CLICK_ID_KEYS, ...UTM_KEYS] as const

export type TrackedKey = (typeof TRACKED_KEYS)[number]
export type TrackedParams = Partial<Record<TrackedKey, string>>

export const STORAGE_KEY = "so_click_attribution"
export const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000

const MAX_CLICK_ID_LENGTH = 512
const MAX_UTM_LENGTH = 200

type Touch = { params: TrackedParams; at: string }
export type StoredAttribution = { v: 1; first?: Touch; lastClick?: Touch }

/** Fields sent with a brief (all optional). */
export type ClickAttribution = TrackedParams & { click_captured_at?: string }

function maxLengthFor(key: TrackedKey) {
  return (CLICK_ID_KEYS as readonly string[]).includes(key)
    ? MAX_CLICK_ID_LENGTH
    : MAX_UTM_LENGTH
}

/** Trim, reject empty / over-long / control-character values. */
function cleanValue(key: TrackedKey, raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined
  const value = raw.trim()
  if (!value || value.length > maxLengthFor(key)) return undefined
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f]/.test(value)) return undefined
  return value
}

/** Pull the tracked parameters out of a query string ("?a=b" or "a=b"). */
export function extractTrackedParams(search: string): TrackedParams {
  const out: TrackedParams = {}
  let qs: URLSearchParams
  try {
    qs = new URLSearchParams(search)
  } catch {
    return out
  }
  for (const key of TRACKED_KEYS) {
    const value = cleanValue(key, qs.get(key))
    if (value) out[key] = value
  }
  return out
}

function hasClickId(params: TrackedParams) {
  return CLICK_ID_KEYS.some((k) => !!params[k])
}

function isFresh(touch: Touch | undefined, now: number): touch is Touch {
  if (!touch) return false
  const at = Date.parse(touch.at)
  return Number.isFinite(at) && at <= now + 60_000 && now - at < MAX_AGE_MS
}

/** Defensive parse of whatever is in storage; drops expired touches. */
export function parseStored(raw: string | null, now: number): StoredAttribution {
  const empty: StoredAttribution = { v: 1 }
  if (!raw) return empty
  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    return empty
  }
  if (!data || typeof data !== "object") return empty
  const obj = data as Record<string, unknown>

  const readTouch = (t: unknown): Touch | undefined => {
    if (!t || typeof t !== "object") return undefined
    const { params, at } = t as Record<string, unknown>
    if (typeof at !== "string" || !params || typeof params !== "object") {
      return undefined
    }
    const clean: TrackedParams = {}
    for (const key of TRACKED_KEYS) {
      const v = cleanValue(key, (params as Record<string, unknown>)[key])
      if (v) clean[key] = v
    }
    if (Object.keys(clean).length === 0) return undefined
    return { params: clean, at }
  }

  const first = readTouch(obj.first)
  const lastClick = readTouch(obj.lastClick)
  return {
    v: 1,
    ...(isFresh(first, now) ? { first } : {}),
    ...(isFresh(lastClick, now) ? { lastClick } : {}),
  }
}

/** Fold a new landing's parameters into what's stored. Pure. */
export function mergeTouch(
  stored: StoredAttribution,
  params: TrackedParams,
  now: number,
): StoredAttribution {
  if (Object.keys(params).length === 0) return stored
  const touch: Touch = { params, at: new Date(now).toISOString() }
  const next: StoredAttribution = { ...stored }
  if (!isFresh(stored.first, now)) next.first = touch
  if (hasClickId(params)) {
    const clickOnly: TrackedParams = {}
    for (const k of CLICK_ID_KEYS) if (params[k]) clickOnly[k] = params[k]
    next.lastClick = { params: clickOnly, at: touch.at }
  }
  return next
}

/**
 * The fields to send with a brief: UTMs from the first touch, click IDs
 * from the last click (falling back to the first touch), and the capture
 * time of whichever touch supplied the click ID (or the first touch).
 */
export function attributionForSubmit(
  stored: StoredAttribution,
  now: number,
): ClickAttribution {
  const first = isFresh(stored.first, now) ? stored.first : undefined
  const lastClick = isFresh(stored.lastClick, now) ? stored.lastClick : undefined
  const out: ClickAttribution = {}
  if (first) for (const k of UTM_KEYS) if (first.params[k]) out[k] = first.params[k]

  const clickSource = lastClick ?? (first && hasClickId(first.params) ? first : undefined)
  if (clickSource) {
    for (const k of CLICK_ID_KEYS) {
      if (clickSource.params[k]) out[k] = clickSource.params[k]
    }
  }
  const capturedAt = clickSource?.at ?? first?.at
  if (capturedAt && Object.keys(out).length > 0) out.click_captured_at = capturedAt
  return out
}

// ---------------------------------------------------------------------------
// Browser wrappers — never throw.
// ---------------------------------------------------------------------------

/** Called once per page load by <ClickCapture />. */
export function captureClickAttribution(
  search: string = typeof window !== "undefined" ? window.location.search : "",
  now: number = Date.now(),
): void {
  try {
    const params = extractTrackedParams(search)
    const current = parseStored(window.localStorage.getItem(STORAGE_KEY), now)
    const next = mergeTouch(current, params, now)
    if (next.first || next.lastClick) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } else {
      // Everything expired (or nothing ever stored): keep storage tidy.
      window.localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // Storage unavailable — attribution is a nice-to-have.
  }
}

/** Read the fields for the brief payload. Returns {} on any problem. */
export function readClickAttribution(now: number = Date.now()): ClickAttribution {
  try {
    return attributionForSubmit(
      parseStored(window.localStorage.getItem(STORAGE_KEY), now),
      now,
    )
  } catch {
    return {}
  }
}

/** Forget the stored attribution once a brief has carried it. */
export function clearClickAttribution(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

// ---------------------------------------------------------------------------
// Server-side validation. Each field falls back to undefined when
// malformed (`.catch`), so bad tracking data is dropped and can never make
// a brief fail validation.
// ---------------------------------------------------------------------------

const lenient = (max: number) =>
  z
    .string()
    .trim()
    .min(1)
    .max(max)
    .regex(/^[^\u0000-\u001f\u007f]*$/)
    .optional()
    .catch(undefined)

export const clickAttributionFields = {
  gclid: lenient(MAX_CLICK_ID_LENGTH),
  gbraid: lenient(MAX_CLICK_ID_LENGTH),
  wbraid: lenient(MAX_CLICK_ID_LENGTH),
  utm_source: lenient(MAX_UTM_LENGTH),
  utm_medium: lenient(MAX_UTM_LENGTH),
  utm_campaign: lenient(MAX_UTM_LENGTH),
  utm_term: lenient(MAX_UTM_LENGTH),
  utm_content: lenient(MAX_UTM_LENGTH),
  click_captured_at: z.string().datetime().optional().catch(undefined),
}

export const clickAttributionSchema = z.object(clickAttributionFields)

/** Columns written to `briefs` — only the ones with values. */
export function clickAttributionColumns(
  input: Partial<Record<keyof typeof clickAttributionFields, string | undefined>>,
): Record<string, string> {
  const out: Record<string, string> = {}
  for (const key of Object.keys(clickAttributionFields) as (keyof typeof clickAttributionFields)[]) {
    const v = input[key]
    if (typeof v === "string" && v) out[key] = v
  }
  return out
}
