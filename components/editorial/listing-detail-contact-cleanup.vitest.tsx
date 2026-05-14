import { afterEach, describe, expect, test } from "vitest"
import { cleanup, render } from "@testing-library/react"

import { ListingDetail } from "./listing-detail"
import type { DirectoryListing } from "@/lib/listings"

/**
 * Pins the editorial decision in
 * handoff/briefs/2026-05-IMAGE_PIPELINE_V2_AND_CONTACT_CLEANUP.md —
 * operator contact_name / contact_email / contact_phone must not be
 * surfaced on the public listing detail page. Founder block and the
 * operator website link stay.
 */

const fixture: DirectoryListing = {
  id: "00000000-0000-0000-0000-000000000001",
  listing_name: "Linkwasha Camp",
  category: "lodges",
  region: "Southern Africa",
  country: "Zimbabwe",
  location: "Hwange National Park, eastern boundary",
  description: "Nine luxury tented suites on the edge of the Ngamo Plains.",
  contact_name: "Sarah at Linkwasha Reservations",
  contact_email: "reservations@linkwasha.example",
  contact_phone: "+263 1 234 5678",
  website: "https://wildernessdestinations.com/africa/zimbabwe/linkwasha-camp",
  price_info: "From $1,200 pppn",
  featured: true,
  image_url: null,
  status: "approved",
  created_at: "2026-05-13T00:00:00Z",
  updated_at: "2026-05-13T00:00:00Z",
  verdict: "Wilderness's flagship Hwange property.",
  signature_experience: null,
  conservation_summary: null,
  community_summary: null,
  wellness_offerings: null,
  activities: null,
  founder_name: "Beks Ndlovu",
  founder_note:
    "A camp built for the bush, not the brochure. We keep it small on purpose.",
  founder_image_url: null,
  traveller_quotes: null,
  external_ratings: null,
  gallery_urls: null,
  max_guests: 18,
  best_time_to_visit: null,
  price_tier: "luxury",
  latitude: null,
  longitude: null,
  field_notes_slugs: null,
  editor_notes: null,
}

describe("ListingDetail — public render", () => {
  afterEach(cleanup)

  test("contact_name / contact_email / contact_phone are NOT surfaced", () => {
    const { container } = render(
      <ListingDetail listing={fixture} related={[]} />,
    )
    const text = container.textContent ?? ""

    expect(text).not.toContain(fixture.contact_name)
    expect(text).not.toContain(fixture.contact_email)
    expect(text).not.toContain(fixture.contact_phone)

    // Belt-and-braces — no mailto:/tel: links pointed at the listing's
    // contact fields.
    const html = container.innerHTML
    expect(html).not.toContain(`mailto:${fixture.contact_email}`)
    expect(html).not.toContain(`tel:${fixture.contact_phone}`)

    // Visual labels for those rows shouldn't be there either.
    expect(text).not.toMatch(/\bEmail\b/)
    expect(text).not.toMatch(/\bPhone\b/)
  })

  test("Operator website link IS surfaced (operator research is on-brand)", () => {
    const { container } = render(
      <ListingDetail listing={fixture} related={[]} />,
    )
    // Domain stripped of protocol + www for display
    expect(container.textContent).toContain(
      "wildernessdestinations.com/africa/zimbabwe/linkwasha-camp",
    )
    const link = container.querySelector(`a[href="${fixture.website}"]`)
    expect(link).not.toBeNull()
  })

  test("Founder block IS rendered (human anchor of the listing)", () => {
    const { container } = render(
      <ListingDetail listing={fixture} related={[]} />,
    )
    const text = container.textContent ?? ""
    expect(text).toContain(fixture.founder_name)
    expect(text).toContain(
      "A camp built for the bush, not the brochure.",
    )
  })

  test("Enquire section uses planning-route CTAs, not direct contact", () => {
    const { container } = render(
      <ListingDetail listing={fixture} related={[]} />,
    )
    // "Add this to a brief" routes to /plan?listing=<id>
    const brief = container.querySelector(
      `a[href="/plan?listing=${fixture.id}"]`,
    )
    expect(brief).not.toBeNull()
  })
})
