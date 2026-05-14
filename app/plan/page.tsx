import type { Metadata } from "next"

import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { TripBuilderForm } from "@/components/trip-builder/trip-builder-form"
import { PlannerCallInline } from "@/components/planner-call/planner-call-inline"
import { getListingById } from "@/lib/listings"

export const metadata: Metadata = {
  title: "Plan a safari, by hand | Safari Overland",
  description:
    "Tell us what you're chasing — the months, the rhythm, the kind of quiet you want. We'll come back with three routes within 48 hours.",
}

type PlanPageProps = {
  searchParams: Promise<{ listing?: string }>
}

export default async function PlanPage({ searchParams }: PlanPageProps) {
  const { listing: listingId } = await searchParams
  const listing = listingId ? await getListingById(listingId).catch(() => null) : null

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

            {listing && (
              <div className="mt-10 inline-flex items-baseline gap-3 border border-amber/40 bg-amber/10 px-4 py-3">
                <span className="mono text-amber text-xs">Including</span>
                <span className="font-serif text-bone leading-tight">
                  {listing.listing_name}
                </span>
                <span className="mono text-bone-mute text-xs">
                  in this brief
                </span>
              </div>
            )}
          </div>
        </section>

        {/* ─── The form ──────────────────────────────────────── */}
        <section className="container py-16 md:py-24 border-b border-rule">
          <TripBuilderForm />
        </section>

        {/* ─── Or speak to a planner first ─────────────────────── */}
        <PlannerCallInline
          className="container py-16 md:py-24"
          heading="Or speak to a planner first."
          lede="Thirty minutes on a call before you fill anything in — sometimes faster than a form."
          source="plan"
        />
      </main>

      <EditorialFooter />
    </div>
  )
}
