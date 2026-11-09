"use client"

import { useEffect } from "react"

import { captureClickAttribution } from "@/lib/analytics/click-ids"

/**
 * Records ad-click and campaign parameters (gclid, gbraid, wbraid, utm_*)
 * from the landing URL into localStorage. No cookies, no network calls,
 * renders nothing. Mounted once in app/layout.tsx.
 *
 * Runs on the initial load only: ad and campaign links always land as a
 * full page load, so client-side navigations don't need watching.
 */
export function ClickCapture() {
  useEffect(() => {
    captureClickAttribution()
  }, [])
  return null
}
