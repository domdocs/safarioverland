import { describe, expect, test, afterEach } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"

import { Practicals, SignOff } from "./practicals"
import type { Itinerary } from "@/lib/itineraries/types"

function buildItinerary(): Itinerary {
  return {
    id: "11111111-1111-1111-1111-111111111111",
    slug: null,
    reference: "SO-2026-0042",
    status: "draft",
    title: "Test trip",
    cover_title_lines: [],
    subtitle: null,
    guests: [],
    dates_from: null,
    dates_to: null,
    dates_year: null,
    pace: null,
    curator_name: "Niels van de Meer",
    curator_title: "Curator, Safari Overland",
    curator_location: "Victoria Falls, Zimbabwe",
    prologue: [],
    cover_photo_url: null,
    palette: "savanna",
    typography: "editorial",
    density: "spacious",
    show_curator_notes: true,
    source_brief_id: null,
    practicals: [],
    created_at: "2026-05-14T12:00:00.000Z",
    updated_at: "2026-05-14T12:00:00.000Z",
    created_by: null,
  }
}

describe("Practicals", () => {
  afterEach(cleanup)

  test("renders nothing when cards array is empty", () => {
    const { container } = render(<Practicals cards={[]} />)
    expect(container.querySelector(".practicals")).toBeNull()
  })

  test("renders one card per entry", () => {
    const { container } = render(
      <Practicals
        cards={[
          { title: "Included", body: "Meals and drinks." },
          { title: "Not included", body: "International flights." },
        ]}
      />,
    )
    expect(container.querySelectorAll(".practical-card").length).toBe(2)
    expect(screen.getByRole("heading", { name: "Included" })).toBeTruthy()
  })

  test("detects bullet lines and renders <ul>", () => {
    const { container } = render(
      <Practicals
        cards={[
          {
            title: "Packing",
            body: "- Soft duffel\n- Neutrals\n- Binoculars",
          },
        ]}
      />,
    )
    expect(container.querySelector(".practical-card ul")).not.toBeNull()
    expect(container.querySelectorAll(".practical-card li").length).toBe(3)
  })

  test("falls back to paragraphs for prose body", () => {
    const { container } = render(
      <Practicals
        cards={[
          {
            title: "On the ground",
            body: "Niels is your single point of contact. WhatsApp is read at all hours.",
          },
        ]}
      />,
    )
    expect(container.querySelector(".practical-card ul")).toBeNull()
    expect(container.querySelector(".practical-card p")).not.toBeNull()
  })
})

describe("SignOff", () => {
  afterEach(cleanup)

  test("uses curator first name for the signature card", () => {
    const { container } = render(<SignOff itinerary={buildItinerary()} />)
    const sig = container.querySelector(".sig-card")
    expect(sig?.textContent).toBe("Niels")
  })

  test("renders the reference in the colophon", () => {
    render(<SignOff itinerary={buildItinerary()} />)
    expect(screen.getByText("SO-2026-0042")).toBeTruthy()
  })
})
