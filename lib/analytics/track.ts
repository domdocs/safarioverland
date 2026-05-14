// ============================================================================
// lib/analytics/track.ts
//
// Typed wrapper around `@vercel/analytics`' track() that no-ops on
// /admin/* paths.
//
// Defence in depth: the Vercel <Analytics> component already filters
// admin URLs via beforeSend in app/layout.tsx, so the page-view side is
// covered there. This wrapper handles the custom-event side: even if
// a CTA somehow ends up rendered inside an admin context (shared
// component reused on a /admin page later, dev preview, etc.), the
// event will be dropped client-side before it ever hits Vercel.
//
// The wrapper is also the single place we enforce the typed event-map
// from lib/analytics/events.ts — callers can't pass arbitrary string
// names or freeform props.
// ============================================================================

import { track as vercelTrack } from "@vercel/analytics"

import type { EventMap, EventName } from "./events"

/**
 * True when the current document URL begins with `/admin`.
 *
 * Resolved once per call from `window.location.pathname` — cheap and
 * always current (route-changes don't invalidate it). Returns `false`
 * during SSR / no-window contexts; we only call `track()` client-side
 * anyway, but this keeps the helper safe to import from server modules.
 */
export function isAdminPath(): boolean {
  if (typeof window === "undefined") return false
  return window.location.pathname.startsWith("/admin")
}

/**
 * Fire a typed analytics event. No-ops on /admin/* paths and during SSR.
 *
 * Generic on the event name so the parameter shape is enforced against
 * EventMap — passing the wrong key or the wrong props shape is a
 * compile-time error.
 *
 * Example:
 *   track("start-brief-click", { source: "header" })
 *   track("add-to-brief-click", {
 *     listing_id: "abc-123",
 *     listing_name: "Linkwasha Camp",
 *     category: "lodges",
 *     region: "Zimbabwe",
 *   })
 */
export function track<E extends EventName>(name: E, props: EventMap[E]): void {
  if (typeof window === "undefined") return
  if (isAdminPath()) return

  // Vercel's `track()` accepts `Record<string, AllowedPropertyValues>`.
  // Our typed `props` is structurally compatible — the cast is just
  // to satisfy the loose Vercel type without losing our compile-time
  // checks on the call site.
  vercelTrack(name, props as Record<string, string | number | boolean | null>)
}
