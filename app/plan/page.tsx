import type { Metadata } from "next"

import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { TripBuilderForm } from "@/components/trip-builder/trip-builder-form"
import { PlannerCallInline } from "@/components/planner-call/planner-call-inline"
import { AutoBreadcrumbs } from "@/components/AutoBreadcrumbs"
import { FAQ } from "@/components/FAQ"
import { getListingById } from "@/lib/listings"

export const metadata: Metadata = {
  title: "Plan a Safari, by Hand — Three Routes in 48 Hours",
  description:
    "Tell us what you're chasing — months, regions, rhythm — and we'll come back within 48 hours with three African safari routes at three different price-and-pace combinations. Free. Honest. Editorially independent.",
  alternates: { canonical: "https://safarioverland.com/plan" },
}

const PLAN_FAQ = [
  {
    question: "Is it really free?",
    answer:
      "Yes. The planning service is free to travellers. We are paid via booking margins on the trips we plan — the lodge gives us a margin against its rack rate when you book a trip we've drafted. No fee anywhere in this chain comes from you.",
  },
  {
    question: "Can you plan for someone else (a friend, a parent)?",
    answer:
      "Yes. Use their dates and rhythm in the brief, and note the relationship. We will draft three routes accordingly.",
  },
  {
    question: "How far ahead should I start a brief?",
    answer:
      "For July–October peak in East and Southern Africa, 8–12 months is comfortable. For green season, 3–4 months is fine. For gorilla permits (Bwindi, Volcanoes), 6–9 months minimum. Within 60 days of travel, we can still help but the lodge inventory shrinks fast.",
  },
  {
    question: "Do you do last-minute briefs?",
    answer:
      "Yes, but we will tell you what is realistic. Inside 30 days, the best camps are often sold out — we will find the best of what is still available rather than the best in theory.",
  },
  {
    question: "Can you plan for solo travellers?",
    answer:
      "Yes. We have a small list of operators who genuinely understand single-supplier rates and solo-friendly camps. Mention it in the brief.",
  },
]

type PlanPageProps = {
  searchParams: Promise<{ listing?: string }>
}

export default async function PlanPage({ searchParams }: PlanPageProps) {
  const { listing: listingId } = await searchParams
  const listing = listingId ? await getListingById(listingId).catch(() => null) : null

  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />
      <AutoBreadcrumbs />

      <main className="flex-1">
        {/* ─── Opening ───────────────────────────────────────── */}
        <section className="container py-24 md:py-32 border-b border-rule">
          <div className="max-w-3xl">
            <Eyebrow withRule>By hand — eight short questions</Eyebrow>
            <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
              A safari, planned by hand.{" "}
              <span className="italic text-amber">Three routes in 48 hours</span>.
            </h1>
            <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
              This is the planning service that sits alongside the
              collection. Free to travellers, opinionated by design, and
              editorially independent — no operator pays us a subscription
              to be considered in the routing.
            </p>
            <p className="mt-6 max-w-2xl text-bone-mute leading-relaxed">
              Tell us the months you can travel, the regions you are drawn
              to, and the rhythm you want — slow and deep, or wider and
              lighter. We will come back within 48 hours with three
              different routes, at three different price-and-pace
              combinations. You pick one. We connect you directly to the
              operator. They quote and contract. We step out of the way.
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

        {/* ─── How the planning service works ───────────────── */}
        <section className="container py-20 md:py-24 border-b border-rule">
          <div className="max-w-3xl">
            <Eyebrow withRule>How the planning service works</Eyebrow>
            <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
              Three steps,{" "}
              <span className="italic text-amber">forty-eight hours</span>.
            </h2>
            <ol className="mt-10 space-y-8">
              <li className="flex gap-5 border-t border-rule pt-6">
                <span className="mono text-amber pt-1 shrink-0" aria-hidden>
                  01
                </span>
                <div>
                  <h3 className="font-serif text-h3-fluid text-bone leading-tight">
                    You tell us the brief.
                  </h3>
                  <p className="mt-2 text-bone-mute leading-relaxed">
                    Months you can travel, regions you are drawn to, the
                    kind of pace you want. Five minutes.
                  </p>
                </div>
              </li>
              <li className="flex gap-5 border-t border-rule pt-6">
                <span className="mono text-amber pt-1 shrink-0" aria-hidden>
                  02
                </span>
                <div>
                  <h3 className="font-serif text-h3-fluid text-bone leading-tight">
                    We draft three routes within 48 hours.
                  </h3>
                  <p className="mt-2 text-bone-mute leading-relaxed">
                    Each at a different rhythm and budget. Each with the
                    specific lodges and operators we&apos;d send our closest
                    friends to. Written by a human; not a template.
                  </p>
                </div>
              </li>
              <li className="flex gap-5 border-t border-rule pt-6">
                <span className="mono text-amber pt-1 shrink-0" aria-hidden>
                  03
                </span>
                <div>
                  <h3 className="font-serif text-h3-fluid text-bone leading-tight">
                    You pick one.
                  </h3>
                  <p className="mt-2 text-bone-mute leading-relaxed">
                    We make the introduction directly to the operator.
                    They quote and contract. We step out.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* ─── What goes into a good brief ────────────────────── */}
        <section className="container py-20 md:py-24 border-b border-rule">
          <div className="max-w-3xl">
            <Eyebrow withRule>What goes into a good brief</Eyebrow>
            <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
              The more specific,{" "}
              <span className="italic text-amber">the better the brief back</span>.
            </h2>
            <ul className="mt-10 space-y-6">
              <li className="border-t border-rule pt-6">
                <h3 className="font-serif text-h4-fluid text-bone leading-tight">Months.</h3>
                <p className="mt-2 text-bone-mute leading-relaxed">
                  Even a window helps. Some places are exceptional in July
                  and underwhelming in March — and vice versa.
                </p>
              </li>
              <li className="border-t border-rule pt-6">
                <h3 className="font-serif text-h4-fluid text-bone leading-tight">
                  Where you&apos;ve been before.
                </h3>
                <p className="mt-2 text-bone-mute leading-relaxed">
                  If you&apos;ve done East Africa, we will not send you
                  back. If you&apos;ve never been, we will not send you to
                  Bwindi for your first trip.
                </p>
              </li>
              <li className="border-t border-rule pt-6">
                <h3 className="font-serif text-h4-fluid text-bone leading-tight">Rhythm.</h3>
                <p className="mt-2 text-bone-mute leading-relaxed">
                  Two lodges deep, or four lodges wide? Walking days, or
                  all driving? Camp sleep-outs, or proper beds?
                </p>
              </li>
              <li className="border-t border-rule pt-6">
                <h3 className="font-serif text-h4-fluid text-bone leading-tight">
                  Budget envelope.
                </h3>
                <p className="mt-2 text-bone-mute leading-relaxed">
                  Honest is better than aspirational. We will work to the
                  budget you give us; if it is too low for the trip you
                  want, we will say so directly.
                </p>
              </li>
              <li className="border-t border-rule pt-6">
                <h3 className="font-serif text-h4-fluid text-bone leading-tight">
                  What you&apos;re chasing.
                </h3>
                <p className="mt-2 text-bone-mute leading-relaxed">
                  Migration crossings, gorilla trek, walking, mokoro,
                  photography, family, honeymoon, malaria-free. The more
                  specific, the better the brief back.
                </p>
              </li>
            </ul>
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

        {/* ─── FAQ ─────────────────────────────────────────────── */}
        <section className="container pb-24 md:pb-32 border-t border-rule pt-16 md:pt-24">
          <div className="max-w-3xl">
            <FAQ items={PLAN_FAQ} heading="Frequently asked — planning" />
          </div>
        </section>
      </main>

      <EditorialFooter />
    </div>
  )
}
