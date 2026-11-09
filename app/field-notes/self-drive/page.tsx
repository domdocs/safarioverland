import type { Metadata } from "next"
import Link from "next/link"

import { SELF_DRIVE_NOTES } from "@/lib/field-notes/self-drive-notes"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { StartBriefLink } from "@/components/analytics/start-brief-link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { HeroMedia } from "@/components/media/hero-media"
import { MediaCaption } from "@/components/media/media-caption"
import { cardSrc, getMedia } from "@/lib/relaunch/media-select"
import { FIELD_NOTES_INDEX_VISUALS, guideHero } from "@/lib/relaunch/visuals"

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
      <HeroMedia still={getMedia(FIELD_NOTES_INDEX_VISUALS.hero)} height="h-[60vh] min-h-[480px]" position="50% 55%">
        <div className="container relative h-full flex flex-col justify-end pb-16 md:pb-20">
          <div className="max-w-3xl">
            <Eyebrow withRule>Field Notes — self-drive</Eyebrow>
            <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
              What to read before you <span className="italic text-amber">drive</span>.
            </h1>
          </div>
        </div>
      </HeroMedia>

      <section className="container py-20">
        <ol className="max-w-5xl">
          {SELF_DRIVE_NOTES.map((n, i) => {
            const img = guideHero(n.slug)
            return (
            <li key={n.slug}>
              <Link
                href={`/field-notes/self-drive/${n.slug}`}
                className="group grid gap-4 border-t border-rule py-8 transition-colors hover:border-amber md:grid-cols-[4rem_14rem_1fr] md:gap-8"
              >
                <span className="mono text-amber pt-2" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {img ? (
                  <div>
                    <div className="relative aspect-[4/3] overflow-hidden bg-card">
                      <Image
                        src={cardSrc(img)}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 768px) 224px, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <MediaCaption item={img} className="mt-2" />
                  </div>
                ) : (
                  <div aria-hidden />
                )}
                <div>
                  <span className="eyebrow">{n.eyebrow}</span>
                  <h2 className="mt-3 font-serif text-h3-fluid text-bone leading-tight transition-colors group-hover:text-amber text-balance">
                    {n.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-bone-mute leading-relaxed">{n.description}</p>
                </div>
              </Link>
            </li>
            )
          })}
        </ol>

        <div className="mt-16 max-w-4xl border-t border-rule pt-10">
          <Button size="lg" className="rounded-none px-8 py-6 mono h-auto max-w-full whitespace-normal text-center" asChild>
            <StartBriefLink source="field-notes">Start a brief →</StartBriefLink>
          </Button>
        </div>
      </section>
    </>
  )
}
