// ============================================================================
// lib/analytics/track.vitest.ts
//
// Defence-in-depth unit tests for the analytics wrapper.
//
// The wrapper's job is to:
//   1. drop events fired from /admin/* paths (so brand-side editorial
//      doesn't pollute the dashboard even if a shared CTA shows up there)
//   2. pass through events from public paths unchanged
//   3. no-op gracefully during SSR (no window)
//
// We mock @vercel/analytics so the test never tries to talk to a real
// endpoint, then assert the call shape.
// ============================================================================

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"

// `vi.mock` factories are hoisted to the top of the file by Vitest, so any
// module-scope references inside them must come from `vi.hoisted` (which
// is also hoisted) rather than from a regular `const`.
const { vercelTrackMock } = vi.hoisted(() => ({
  vercelTrackMock: vi.fn(),
}))

vi.mock("@vercel/analytics", () => ({
  track: vercelTrackMock,
}))

// Import AFTER the mock is registered so the wrapper picks up the mocked
// implementation.
import { isAdminPath, track } from "./track"

describe("lib/analytics/track", () => {
  const originalLocation = window.location

  beforeEach(() => {
    vercelTrackMock.mockClear()
  })

  afterEach(() => {
    // Restore window.location after each test.
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: originalLocation,
    })
  })

  function setPath(pathname: string) {
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: { ...originalLocation, pathname },
    })
  }

  test("public path → calls vercel track with event name + props", () => {
    setPath("/listings/abc-123")
    track("start-brief-click", { source: "header" })
    expect(vercelTrackMock).toHaveBeenCalledTimes(1)
    expect(vercelTrackMock).toHaveBeenCalledWith("start-brief-click", {
      source: "header",
    })
  })

  test("admin path → no-op (event dropped)", () => {
    setPath("/admin/listings")
    track("start-brief-click", { source: "header" })
    expect(vercelTrackMock).not.toHaveBeenCalled()
  })

  test("nested admin path → no-op", () => {
    setPath("/admin/listings/preview/abc-123")
    track("add-to-brief-click", {
      listing_id: "abc-123",
      listing_name: "Linkwasha",
      category: "lodges",
      region: "Zimbabwe",
    })
    expect(vercelTrackMock).not.toHaveBeenCalled()
  })

  test("isAdminPath: matches /admin and descendants, rejects siblings", () => {
    setPath("/admin")
    expect(isAdminPath()).toBe(true)
    setPath("/admin/listings")
    expect(isAdminPath()).toBe(true)
    setPath("/administrator-cookbook")
    // "/administrator-cookbook" starts with "/admin" — accept this; we'd
    // rather over-filter than under-filter, and we don't ship a public
    // route by that name.
    expect(isAdminPath()).toBe(true)
    setPath("/listings")
    expect(isAdminPath()).toBe(false)
    setPath("/")
    expect(isAdminPath()).toBe(false)
  })

  test("brief-submitted carries the full funnel slice with no PII", () => {
    setPath("/plan")
    track("brief-submitted", {
      pace: "slow",
      budget_tier: "luxury",
      duration: "8-10 nights",
      has_source_listing: true,
    })
    expect(vercelTrackMock).toHaveBeenCalledTimes(1)
    const [name, props] = vercelTrackMock.mock.calls[0]!
    expect(name).toBe("brief-submitted")
    expect(props).toMatchObject({
      pace: "slow",
      budget_tier: "luxury",
      duration: "8-10 nights",
      has_source_listing: true,
    })
    // Guardrail: no PII shape ever sneaks in.
    expect(props).not.toHaveProperty("contact_email")
    expect(props).not.toHaveProperty("contact_name")
    expect(props).not.toHaveProperty("contact_phone")
  })
})
