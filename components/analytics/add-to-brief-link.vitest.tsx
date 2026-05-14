// ============================================================================
// components/analytics/add-to-brief-link.vitest.tsx
//
// Confirms the listing-detail "Add to a brief" CTA fires
// `add-to-brief-click` with the listing's metadata, and that listing-id
// is preserved on the destination URL so the resulting brief can be
// tied back to its source.
// ============================================================================

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"

const { vercelTrackMock } = vi.hoisted(() => ({
  vercelTrackMock: vi.fn(),
}))

vi.mock("@vercel/analytics", () => ({
  track: vercelTrackMock,
}))

import { AddToBriefLink } from "./add-to-brief-link"

describe("AddToBriefLink", () => {
  beforeEach(() => {
    vercelTrackMock.mockClear()
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: { ...window.location, pathname: "/listings/abc-123" },
    })
  })

  afterEach(cleanup)

  test("click fires add-to-brief-click with the listing metadata", () => {
    render(
      <AddToBriefLink
        href="/plan?listing=abc-123"
        listingId="abc-123"
        listingName="Linkwasha Camp"
        category="lodges"
        region="Zimbabwe"
      >
        Add this to a brief →
      </AddToBriefLink>,
    )
    fireEvent.click(screen.getByText("Add this to a brief →"))
    expect(vercelTrackMock).toHaveBeenCalledTimes(1)
    expect(vercelTrackMock).toHaveBeenCalledWith("add-to-brief-click", {
      listing_id: "abc-123",
      listing_name: "Linkwasha Camp",
      category: "lodges",
      region: "Zimbabwe",
    })
  })

  test("preserves the destination URL with listing id", () => {
    render(
      <AddToBriefLink
        href="/plan?listing=abc-123"
        listingId="abc-123"
        listingName="Linkwasha Camp"
        category="lodges"
        region="Zimbabwe"
      >
        Add this to a brief →
      </AddToBriefLink>,
    )
    const link = screen.getByText("Add this to a brief →").closest("a")
    expect(link?.getAttribute("href")).toBe("/plan?listing=abc-123")
  })
})
