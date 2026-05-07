import type { Metadata } from "next"
import Link from "next/link"

import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { SectionRule } from "@/components/editorial/section-rule"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Trip Builder | Safari Overland",
  description:
    "Tell us what you want from your safari and we'll send back three options in 48 hours.",
}

/**
 * Phase 4 placeholder. The full trip-builder form ships separately
 * (multi-step form, Supabase briefs table, Resend templates, admin /briefs
 * triage view). For now, this page funnels intent to /contact.
 */
export default function PlanPage() {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />

      <main className="flex-1">
        <section className="container py-24 md:py-32">
          <div className="max-w-3xl">
            <Eyebrow withRule>Trip builder — opening soon</Eyebrow>
            <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
              Tell us what you&apos;re after.
              <br />
              We&apos;ll send back{" "}
              <span className="italic text-amber">three options</span>.
            </h1>
            <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
              The full multi-step brief is on its way — five short questions
              about months, regions, rhythm and budget. While we finish wiring
              it up, drop us a note and we&apos;ll get back within 48 hours.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-none px-8 py-6 mono" asChild>
                <Link href="/contact">Email a planner →</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-none px-8 py-6 mono border-rule text-bone hover:border-amber hover:text-amber"
                asChild
              >
                <Link href="/categories">Browse the directory</Link>
              </Button>
            </div>
          </div>
        </section>

        <SectionRule className="container" />

        <section className="container py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow withRule>How it&apos;ll work</Eyebrow>
              <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
                Five questions. Forty-eight hours.
              </h2>
            </div>
            <ol className="lg:col-span-7 space-y-6">
              {[
                ["01", "When can you travel?", "Pick the months that work. We'll match you to the right season."],
                ["02", "Where are you drawn to?", "East · Southern · West · North — or pin a country."],
                ["03", "What rhythm?", "Game-drive heavy, walking-led, family-paced, or honeymoon-quiet."],
                ["04", "How long, how many?", "Nights and traveler count."],
                ["05", "Working budget?", "Per-person target. Honest is more useful than aspirational."],
              ].map(([n, t, body]) => (
                <li key={n} className="flex gap-6 border-t border-rule pt-6">
                  <span className="mono text-amber pt-1 shrink-0" aria-hidden>
                    {n}
                  </span>
                  <div>
                    <h3 className="font-serif text-h4-fluid text-bone leading-tight mb-1">
                      {t}
                    </h3>
                    <p className="text-bone-mute leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <EditorialFooter />
    </div>
  )
}
