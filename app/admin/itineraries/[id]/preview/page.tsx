import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Chapter } from "@/components/itinerary/chapter"
import { Cover, Overview, Prologue } from "@/components/itinerary/cover"
import { Practicals, SignOff } from "@/components/itinerary/practicals"
import { Transit } from "@/components/itinerary/transit"
import { getItinerary } from "@/lib/itineraries"

import { PreviewBanner } from "./preview-banner"
import "./preview-styles.css"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Itinerary preview · admin",
  robots: { index: false, follow: false },
}

/**
 * /admin/itineraries/[id]/preview
 *
 * Renders the editorial itinerary document with the saved itinerary +
 * chapters + transits. Theme is locked to savanna / editorial /
 * spacious for v1 — palette/typography/density columns exist in the
 * schema but no UI toggles them.
 *
 * Chapters interleave with transits: chapter 0, transit 0, chapter 1,
 * transit 1, … chapter N. Practicals + sign-off come last.
 *
 * Mac Print > PDF (⌘P → Save as PDF) is the v1 PDF path. The print CSS
 * in preview-styles.css handles page breaks. See handoff/PRINT_TO_PDF.md.
 */
export default async function ItineraryPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const data = await getItinerary(id)
  if (!data) notFound()

  const { itinerary, chapters, transits } = data
  const transitsByPosition = new Map(transits.map((t) => [t.position, t]))

  return (
    <div
      className="itinerary-preview"
      data-palette={itinerary.palette}
      data-typography={itinerary.typography}
      data-density={itinerary.density}
    >
      <PreviewBanner
        itineraryId={itinerary.id}
        reference={itinerary.reference}
        status={itinerary.status}
      />

      <Cover itinerary={itinerary} />
      <Prologue itinerary={itinerary} />
      {chapters.length > 0 && <Overview itinerary={itinerary} chapters={chapters} />}

      {chapters.map((chapter, i) => {
        const elements: React.ReactNode[] = [
          <Chapter
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
            <Transit
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
