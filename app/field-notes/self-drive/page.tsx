import type { Metadata } from "next"
import Link from "next/link"

import { SELF_DRIVE_NOTES } from "@/lib/field-notes/self-drive-notes"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { SectionRule } from "@/components/editorial/section-rule"
import { StartBriefLink } from "@/components/analytics/start-brief-link"
import { Button } from "@/components/ui/button"

const SITE = "https://safarioverland.com"

export const metadata: Metadata = {
  title: "Self-drive guides",
  description:
    "Field Notes for a lodge-based self-drive in southern Africa: choosing a vehicle, driving on the left, gravel roads, borders, fuel and signal, and after dark.",
  alternates: { canonical: `${SITE}/field-notes/self-drive` },
}

export default function SelfDriveNotesIndex() {
  return (
    <>
      <section className="container py-24 md:py-32">
        <div className="max-w-3xl">
          <Eyebrow withRule>Field Notes — self-drive</Eyebrow>
          <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
            What to read before you <span className="italic text-amber">drive</span>.
          </h1>
        </div>
      </section>

      <SectionRule className="container" />

      <section className="container py-20">
        <ol className="max-w-4xl">
          {SELF_DRIVE_NOTES.map((n, i) => (
            <li key={n.slug}>
              <Link
                href={`/field-notes/self-drive/${n.slug}`}
                className="group grid gap-4 border-t border-rule py-8 transition-colors hover:border-amber md:grid-cols-[4rem_1fr]"
              >
                <span className="mono text-amber pt-2" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="eyebrow">{n.eyebrow}</span>
                  <h2 className="mt-3 font-serif text-h3-fluid text-bone leading-tight transition-colors group-hover:text-amber text-balance">
                    {n.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-bone-mute leading-relaxed">{n.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-16 max-w-4xl border-t border-rule pt-10">
          <Button size="lg" className="rounded-none px-8 py-6 mono" asChild>
            <StartBriefLink source="field-notes">Start a brief →</StartBriefLink>
          </Button>
        </div>
      </section>
    </>
  )
}
