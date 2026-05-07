import type React from "react"

/**
 * Planning Guides layout — pass-through.
 *
 * Phase 3 retheme dropped the previous sidebar nav (it conflicted with
 * the editorial GuidePage's full-bleed hero). Inter-guide navigation now
 * lives in the "Read next" rail at the foot of every article.
 */
export default function PlanningGuidesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
