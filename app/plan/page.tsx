import type { Metadata } from "next"

import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { TripBuilderForm } from "@/components/trip-builder/trip-builder-form"

export const metadata: Metadata = {
  title: "Plan a safari, by hand | Safari Overland",
  description:
    "Tell us what you're chasing — the months, the rhythm, the kind of quiet you want. We'll come back with three routes within 48 hours.",
}

export default function PlanPage() {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />

      <main className="flex-1">
        {/* ─── Opening ───────────────────────────────────────── */}
        <section className="container py-24 md:py-32 border-b border-rule">
          <div className="max-w-3xl">
            <Eyebrow withRule>By hand — eight short questions</Eyebrow>
            <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
              A safari, drawn{" "}
              <span className="italic text-amber">by hand</span>.
            </h1>
            <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
              Tell us what you&apos;re chasing — the months, the rhythm, the kind of quiet you want.
              We&apos;ll come back with three routes within 48 hours.
            </p>
            <p className="mt-4 mono text-bone-mute">
              Free, no commitment. About five minutes. Saved locally — return any time.
            </p>
          </div>
        </section>

        {/* ─── The form ──────────────────────────────────────── */}
        <section className="container py-16 md:py-24">
          <TripBuilderForm />
        </section>
      </main>

      <EditorialFooter />
    </div>
  )
}
