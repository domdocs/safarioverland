import { describe, expect, test, afterEach } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"

import { Chapter } from "./chapter"
import type { Chapter as ChapterType } from "@/lib/itineraries/types"

function buildChapter(overrides: Partial<ChapterType> = {}): ChapterType {
  return {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    itinerary_id: "11111111-1111-1111-1111-111111111111",
    position: 0,
    slug: "victoria-falls",
    place: "Victoria Falls",
    country: "Zimbabwe",
    coords_lat: -17.924,
    coords_lon: 25.857,
    nights: 2,
    dates: "14 — 16 September",
    palette: null,
    epigraph: "Mosi-oa-Tunya — the smoke that thunders.",
    intro: ["First paragraph.", "Second paragraph."],
    seeing: ["Verreaux's eagles", "Bushbuck at dusk"],
    note: "Do not rush the Falls.",
    lodge: {
      name: "Victoria Falls Hotel",
      kind: "Grande dame",
      room: "Stables Suite",
      blurb: "Colonial hotel on the gorge.",
      amenities: ["Bar", "Pool"],
    },
    rhythm: [
      { time: "Dawn", title: "Helicopter", body: "Fifteen minutes from Sprayview." },
    ],
    photo_hero_url: null,
    photo_lodge_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  }
}

describe("Chapter render", () => {
  afterEach(cleanup)

  test("renders the place name and country", () => {
    render(
      <Chapter
        chapter={buildChapter()}
        index={0}
        showCuratorNote
        curatorName="Niels van de Meer"
        curatorLocation="Victoria Falls, Zimbabwe"
      />,
    )
    expect(screen.getByRole("heading", { name: "Victoria Falls" })).toBeTruthy()
    expect(screen.getByText("Zimbabwe")).toBeTruthy()
  })

  test("renders the roman numeral derived from position", () => {
    const { container } = render(
      <Chapter
        chapter={buildChapter()}
        index={2}
        showCuratorNote={false}
        curatorName="N"
        curatorLocation=""
      />,
    )
    const numeral = container.querySelector(".numeral-big")
    expect(numeral?.textContent).toBe("III")
  })

  test("omits curator note when showCuratorNote is false", () => {
    const { container } = render(
      <Chapter
        chapter={buildChapter()}
        index={0}
        showCuratorNote={false}
        curatorName="N"
        curatorLocation=""
      />,
    )
    expect(container.querySelector(".note-card")).toBeNull()
  })

  test("renders curator note with curator first name in signature", () => {
    const { container } = render(
      <Chapter
        chapter={buildChapter()}
        index={0}
        showCuratorNote
        curatorName="Niels van de Meer"
        curatorLocation="Victoria Falls, Zimbabwe"
      />,
    )
    const note = container.querySelector(".note-card")
    expect(note?.textContent).toContain("Niels")
    expect(note?.textContent).toContain("Victoria Falls")
  })

  test("applies the no-photo class when hero is missing", () => {
    const { container } = render(
      <Chapter
        chapter={buildChapter({ photo_hero_url: null })}
        index={0}
        showCuratorNote={false}
        curatorName="N"
        curatorLocation=""
      />,
    )
    const hero = container.querySelector(".chapter-hero")
    expect(hero?.className).toContain("no-photo")
  })

  test("renders the rhythm timeline when items are present", () => {
    render(
      <Chapter
        chapter={buildChapter()}
        index={0}
        showCuratorNote
        curatorName="N"
        curatorLocation=""
      />,
    )
    expect(screen.getByText("Dawn")).toBeTruthy()
    expect(screen.getByRole("heading", { name: "Helicopter" })).toBeTruthy()
  })
})
