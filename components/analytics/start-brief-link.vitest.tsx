// ============================================================================
// components/analytics/start-brief-link.vitest.tsx
//
// Verifies the CTA renders as a Next link to /plan and fires
// `start-brief-click` with the supplied `source` on click. The actual
// dispatch is exercised end-to-end through lib/analytics/track.ts —
// we mock the underlying Vercel SDK so no network requests run.
// ============================================================================

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"

const { vercelTrackMock } = vi.hoisted(() => ({
  vercelTrackMock: vi.fn(),
}))

vi.mock("@vercel/analytics", () => ({
  track: vercelTrackMock,
}))

import { StartBriefLink } from "./start-brief-link"

describe("StartBriefLink", () => {
  beforeEach(() => {
    vercelTrackMock.mockClear()
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: { ...window.location, pathname: "/" },
    })
  })

  afterEach(cleanup)

  test("renders an anchor to /plan by default", () => {
    render(<StartBriefLink source="hero">Start a brief →</StartBriefLink>)
    const link = screen.getByText("Start a brief →").closest("a")
    expect(link).toBeTruthy()
    expect(link?.getAttribute("href")).toBe("/plan")
  })

  test("click fires start-brief-click with the supplied source", () => {
    render(<StartBriefLink source="header">Start a brief →</StartBriefLink>)
    fireEvent.click(screen.getByText("Start a brief →"))
    expect(vercelTrackMock).toHaveBeenCalledTimes(1)
    expect(vercelTrackMock).toHaveBeenCalledWith("start-brief-click", {
      source: "header",
    })
  })

  test("click on /admin path no-ops — defence in depth", () => {
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: { ...window.location, pathname: "/admin/listings" },
    })
    render(<StartBriefLink source="header">Start a brief →</StartBriefLink>)
    fireEvent.click(screen.getByText("Start a brief →"))
    expect(vercelTrackMock).not.toHaveBeenCalled()
  })

  test("custom href is honoured (e.g. /plan?listing=abc)", () => {
    render(
      <StartBriefLink source="field-notes" href="/plan?listing=abc-123">
        Start a brief →
      </StartBriefLink>,
    )
    const link = screen.getByText("Start a brief →").closest("a")
    expect(link?.getAttribute("href")).toBe("/plan?listing=abc-123")
  })
})
