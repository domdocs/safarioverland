import type { Metadata } from "next"

import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { TripBuilderForm } from "@/components/trip-builder/trip-builder-form"

export const metadata: Metadata = {
  title: "Trip Builder | Safari Overland",
  description:
    "Tell us what you want from your safari. We'll send back three options at different price points within 48 hours.",
}

export default function PlanPage() {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />

      <main className="flex-1">
        {/* ─── Opening ───────────────────────────────────────── */}
        <section className="container py-24 md:py-32 border-b border-rule">
          <div className="max-w-3xl">
            <Eyebrow withRule>Trip builder — five short questions</Eyebrow>
            <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
              Tell us what you&apos;re after.
              <br />
              We&apos;ll send back{" "}
              <span className="italic text-amber">three options</span>.
            </h1>
            <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
              Free, no commitment. The brief takes about three minutes.
              You&apos;ll have a planner&apos;s reply within 48 hours.
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
