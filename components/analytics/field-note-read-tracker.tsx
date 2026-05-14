"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

import { track } from "@/lib/analytics/track"

type Props = {
  /**
   * Article slug. Optional — when omitted, derived from the last
   * pathname segment, which matches the URL the visitor read.
   */
  slug?: string
  /**
   * Field Notes category bucket: planning / seasonal / conservation /
   * safety / etc. Optional — when omitted, derived from the second
   * pathname segment under /resources/*.
   */
  category?: string
  /**
   * Fraction of scrollable height that counts as "read". 0.75 by
   * default — matches the brief's 75% rule. Lower for short pages,
   * higher for long-tail editorial.
   */
  threshold?: number
}

/**
 * Fires the `field-note-read-complete` event the first time the
 * visitor scrolls past `threshold` (default 75%) of the document.
 *
 * Editorial principle: a read counts only when somebody got through
 * the substance — not bounces, not pop-ins.
 *
 * Implementation: throttled scroll listener (via requestAnimationFrame)
 * computes `(scrollY + viewportHeight) / documentHeight`. At-most-one
 * fire per page-load: a ref-guarded flag drops subsequent crossings,
 * and we detach the listener once fired.
 *
 * Rendered as the last element of `<GuidePage>` — see
 * components/guide-page.tsx. The visible DOM footprint is zero.
 */
export function FieldNoteReadTracker({
  slug,
  category,
  threshold = 0.75,
}: Props) {
  const firedRef = useRef(false)
  const pathname = usePathname() ?? ""

  useEffect(() => {
    if (firedRef.current) return

    // Derive slug/category from the URL when not supplied. URL shape:
    // /resources/{category}/{slug} — bail out gracefully on shapes that
    // don't match so non-article mounts don't fire stray events.
    const segs = pathname.split("/").filter(Boolean)
    const derivedSlug = slug ?? segs[segs.length - 1] ?? ""
    const derivedCategory =
      category ?? (segs[0] === "resources" ? segs[1] ?? "" : "")
    if (!derivedSlug) return

    let frame: number | null = null

    function check() {
      frame = null
      if (firedRef.current) return
      const docEl = document.documentElement
      // `clientHeight` is the viewport, `scrollHeight` is total content.
      // Scrollable distance = scrollHeight − clientHeight. Treat very
      // short pages (scrollable ≈ 0) as instantly read.
      const scrollable = docEl.scrollHeight - docEl.clientHeight
      const progress =
        scrollable <= 0
          ? 1
          : (window.scrollY + docEl.clientHeight) / docEl.scrollHeight
      if (progress >= threshold) {
        firedRef.current = true
        track("field-note-read-complete", {
          slug: derivedSlug,
          category: derivedCategory,
        })
        window.removeEventListener("scroll", onScroll)
      }
    }

    function onScroll() {
      if (frame !== null) return
      frame = requestAnimationFrame(check)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    // Fire once on mount in case the page is short enough that the
    // initial viewport already satisfies the threshold.
    onScroll()

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [pathname, slug, category, threshold])

  // No visible footprint — this is a side-effect-only component.
  return null
}
