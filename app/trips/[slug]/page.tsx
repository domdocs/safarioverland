import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Chapter as ChapterSection } from "@/components/itinerary/chapter"
import { Cover, Overview, Prologue } from "@/components/itinerary/cover"
import { Practicals, SignOff } from "@/components/itinerary/practicals"
import { Transit as TransitSection } from "@/components/itinerary/transit"
import { getCurrentSnapshotBySlug } from "@/lib/itineraries/snapshots"

// Share the scoped editorial CSS from the admin preview. Every
// selector inside is namespaced under `.itinerary-preview`, so it
// doesn't fight the rest of the public site's design system.
import "../../admin/itineraries/[id]/preview/preview-styles.css"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  // Public itineraries are by-invitation; no SEO indexing.
  robots: { index: false, follow: false },
}

/**
 * /trips/[slug]
 *
 * Public read-only itinerary view, served from the latest `is_current`
 * snapshot. The snapshot row is the source of truth — the live
 * itinerary tables are NOT read here, so post-publish edits don't
 * leak unfinished changes to the customer.
 *
 * No middleware Basic Auth on /trips/* (only /admin/* and
 * /api/admin/* are gated). 404 if the slug doesn't exist or no
 * current snapshot is published yet.
 */
export default async function PublicTripPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const snapshot = await getCurrentSnapshotBySlug(slug)
  if (!snapshot) notFound()

  const { itinerary, chapters, transits } = snapshot.data
  const transitsByPosition = new Map(transits.map((t) => [t.position, t]))

  return (
    <div
      className="itinerary-preview"
      data-palette={itinerary.palette}
      data-typography={itinerary.typography}
      data-density={itinerary.density}
    >
      <Cover itinerary={itinerary} />
      <Prologue itinerary={itinerary} />
      {chapters.length > 0 && <Overview itinerary={itinerary} chapters={chapters} />}

      {chapters.map((chapter, i) => {
        const elements: React.ReactNode[] = [
          <ChapterSection
            key={chapter.id}
            chapter={chapter}
            index={i}
            showCuratorNote={itinerary.show_curator_notes}
            curatorName={itinerary.curator_name ?? ""}
            curatorLocation={itinerary.curator_location}
          />,
        ]
        const transit = transitsByPosition.get(i)
        const nextChapter = chapters[i + 1]
        if (transit && nextChapter) {
          elements.push(
            <TransitSection
              key={transit.id}
              transit={transit}
              fromChapter={chapter}
              toChapter={nextChapter}
            />,
          )
        }
        return elements
      })}

      <Practicals cards={itinerary.practicals} />
      <SignOff itinerary={itinerary} />
    </div>
  )
}
