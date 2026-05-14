"use client"

// ============================================================================
// components/analytics/vercel-providers.tsx
//
// Client-only wrapper around <Analytics> and <SpeedInsights>.
//
// Both Vercel components accept a `beforeSend(event)` callback for
// per-event filtering — a function prop, which is what we use to drop
// /admin/* URLs from the dashboards. Functions can't be serialised
// across the RSC boundary, so the call site has to be inside a
// "use client" module. `app/layout.tsx` stays a server component and
// just renders this wrapper.
//
// Defence in depth: the lib/analytics/track.ts wrapper also gates
// custom events on `window.location.pathname.startsWith("/admin")` —
// either layer alone would be enough, both together means a future
// shared-CTA reused on an admin page can't pollute the dashboard
// either by way of a page view or a custom event.
// ============================================================================

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

function dropAdminUrls<T extends { url: string }>(event: T): T | null {
  // The Vercel SDK is lenient about what "matches" admin — anything
  // that contains "/admin" in the path. We err on the side of
  // over-filtering: we don't ship a public route by a similar name.
  if (event.url.includes("/admin")) return null
  return event
}

export function VercelProviders() {
  return (
    <>
      <Analytics beforeSend={dropAdminUrls} />
      <SpeedInsights beforeSend={dropAdminUrls} />
    </>
  )
}
