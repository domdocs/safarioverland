import type { Metadata } from "next"

import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { PlanSent } from "@/components/trip-builder/plan-sent"

export const metadata: Metadata = {
  title: "Brief received | Safari Overland",
  description:
    "We'll come back with three drawn-by-hand routes within 48 hours.",
  // No-index — this is a per-user post-submit page; nothing on it is
  // useful in search.
  robots: { index: false, follow: false },
}

export default function PlanSentPage() {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />
      <main className="flex-1">
        <PlanSent />
      </main>
      <EditorialFooter />
    </div>
  )
}
