import { describe, expect, test, afterEach } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"

import { Cover, Overview, Prologue } from "./cover"
import type { Chapter, Itinerary } from "@/lib/itineraries/types"

function buildItinerary(overrides: Partial<Itinerary> = {}): Itinerary {
  return {
    id: "11111111-1111-1111-1111-111111111111",
    slug: null,
    reference: "SO-2026-0001",
    status: "draft",
    title: "Test trip",
    cover_title_lines: ["The Smoke,", "the Delta,"],
    subtitle: "A test subtitle.",
    guests: ["Mr & Mrs Test"],
    dates_from: "14 September",
    dates_to: "24 September",
    dates_year: "2026",
    pace: "Unhurried.",
    curator_name: "Niels van de Meer",
    curator_title: "Curator, Safari Overland",
    curator_location: "Victoria Falls, Zimbabwe",
    prologue: ["Africa is not a place you visit."],
    cover_photo_url: null,
    palette: "savanna",
    typography: "editorial",
    density: "spacious",
    show_curator_notes: true,
    source_brief_id: null,
    practicals: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
    ...overrides,
  }
}

function buildChapter(overrides: Partial<Chapter> = {}): Chapter {
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
    epigraph: "",
    intro: [],
    seeing: [],
    note: null,
    lodge: { name: "", kind: "", room: "", blurb: "", amenities: [] },
    rhythm: [],
    photo_hero_url: null,
    photo_lodge_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  }
}

describe("Cover", () => {
  afterEach(cleanup)

  test("renders title lines as italic em elements", () => {
    render(<Cover itinerary={buildItinerary()} />)
    const ems = screen.getAllByText(/The Smoke,|the Delta,/)
    expect(ems.length).toBeGreaterThanOrEqual(2)
  })

  test("renders guests joined with ampersand", () => {
    render(
      <Cover
        itinerary={buildItinerary({
          guests: ["Mr Whitford", "Mrs Whitford"],
        })}
      />,
    )
    expect(screen.getByText("Mr Whitford & Mrs Whitford")).toBeTruthy()
  })

  test("renders the reference in the masthead", () => {
    render(<Cover itinerary={buildItinerary({ reference: "SO-2026-0042" })} />)
    expect(screen.getByText("SO-2026-0042")).toBeTruthy()
  })

  test("omits dates row when all date fields are blank", () => {
    render(
      <Cover
        itinerary={buildItinerary({
          dates_from: null,
          dates_to: null,
          dates_year: null,
        })}
      />,
    )
    expect(screen.queryByText("Travelling")).toBeNull()
  })
})

describe("Prologue", () => {
  afterEach(cleanup)

  test("renders nothing when prologue is empty", () => {
    const { container } = render(
      <Prologue itinerary={buildItinerary({ prologue: [] })} />,
    )
    expect(container.querySelector(".prologue")).toBeNull()
  })

  test("renders the first paragraph as the lede", () => {
    const { container } = render(
      <Prologue
        itinerary={buildItinerary({
          prologue: ["Lede line.", "Second paragraph."],
        })}
      />,
    )
    const lede = container.querySelector(".lede")
    expect(lede?.textContent).toBe("Lede line.")
  })
})

describe("Overview", () => {
  afterEach(cleanup)

  test("lists each chapter with its roman numeral", () => {
    const chapters = [
      buildChapter({ id: "c1", place: "Victoria Falls", country: "Zimbabwe" }),
      buildChapter({ id: "c2", place: "Chobe", country: "Botswana", position: 1 }),
    ]
    const { container } = render(
      <Overview itinerary={buildItinerary()} chapters={chapters} />,
    )
    const numerals = container.querySelectorAll(".stops .num")
    expect(numerals[0].textContent).toBe("I")
    expect(numerals[1].textContent).toBe("II")
    const stopNames = container.querySelectorAll(".stops .name")
    expect(stopNames[0].textContent).toBe("Victoria Falls")
    expect(stopNames[1].textContent).toBe("Chobe")
  })
})
