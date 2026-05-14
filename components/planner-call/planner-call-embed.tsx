"use client"

import { useEffect } from "react"

import { track } from "@/lib/analytics/track"
import type { CalendlyBookingSource } from "@/lib/analytics/events"

/**
 * Shared embed renderer.
 *
 * Resolves the Calendly (or Cal.com) URL from `NEXT_PUBLIC_CALENDLY_URL`
 * and either renders the iframe or a graceful fallback when the URL
 * hasn't been wired up yet. Niels' calendar is still being set up — the
 * fallback keeps the CTA usable in the meantime.
 *
 * Works for both Calendly and Cal.com; their inline-iframe contracts
 * are interchangeable.
 *
 * When `source` is supplied, listens for Calendly's
 * `calendly.event_scheduled` postMessage and fires the
 * `calendly-booking-completed` analytics event. Cal.com uses a
 * different postMessage shape and is left untracked for now — the
 * fallback (no event) is acceptable, and the inline embed sees
 * the same `source` thread regardless.
 */

const FALLBACK_EMAIL = "hello@safarioverland.com"

function getUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim()
  if (!raw) return null
  try {
    new URL(raw)
    return raw
  } catch {
    return null
  }
}

type Props = {
  /** Iframe height. Calendly recommends ~700px to fit picker + form. */
  height?: number
  /** Optional inline tone — used on the dark page surfaces. */
  className?: string
  /**
   * Provenance label for `calendly-booking-completed`. Omit on the
   * design-review preview or other non-conversion mounts and the
   * listener no-ops.
   */
  source?: CalendlyBookingSource
}

// Calendly's postMessage payloads always begin with `calendly.`; the
// scheduled event is what we count. Reference:
// https://help.calendly.com/hc/en-us/articles/360020052833
function isCalendlyScheduledEvent(data: unknown): boolean {
  if (typeof data !== "object" || data === null) return false
  const event = (data as { event?: unknown }).event
  return typeof event === "string" && event === "calendly.event_scheduled"
}

export function PlannerCallEmbed({ height = 720, className, source }: Props) {
  const url = getUrl()

  // Listen for Calendly's booking-completed postMessage. The listener
  // is unconditional — even when no `source` is provided we still
  // attach (cheap), but the track() call is gated on source.
  useEffect(() => {
    function handler(event: MessageEvent) {
      if (!isCalendlyScheduledEvent(event.data)) return
      if (!source) return
      track("calendly-booking-completed", { source })
    }
    window.addEventListener("message", handler)
    return () => window.removeEventListener("message", handler)
  }, [source])

  if (!url) {
    return (
      <div className={className}>
        <p className="font-serif italic text-bone-mute leading-relaxed">
          The calendar isn&apos;t live yet — we&apos;re finishing setup
          this week. For now, write to{" "}
          <a
            href={`mailto:${FALLBACK_EMAIL}`}
            className="text-amber hover:text-amber-deep transition-colors"
          >
            {FALLBACK_EMAIL}
          </a>{" "}
          with a few times that work and a planner will come back the
          same day.
        </p>
      </div>
    )
  }

  // Append `embed_domain` + `embed_type=Inline` for Calendly so it
  // renders without their own chrome. Cal.com ignores both — safe to
  // include either way.
  const embedSrc = (() => {
    const u = new URL(url)
    if (!u.searchParams.has("embed_domain")) {
      u.searchParams.set(
        "embed_domain",
        typeof window === "undefined" ? "safarioverland.com" : window.location.host,
      )
    }
    if (!u.searchParams.has("embed_type")) {
      u.searchParams.set("embed_type", "Inline")
    }
    return u.toString()
  })()

  return (
    <iframe
      src={embedSrc}
      title="Book a 30-minute call with a planner"
      className={className}
      style={{ width: "100%", height, border: 0, background: "transparent" }}
      loading="lazy"
    />
  )
}
