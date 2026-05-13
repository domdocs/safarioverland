import { describe, expect, test, afterEach } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"

import { PreviewBanner } from "./preview-banner"

/**
 * Banner is purely presentational — these tests pin the parts the brief
 * cares about: the status pill reflects the listing status verbatim,
 * and the "Back to edit form" link points at the right edit URL.
 */
describe("PreviewBanner", () => {
  afterEach(cleanup)

  test("PENDING listing → status pill reads 'pending' with the pending tone", () => {
    render(
      <PreviewBanner
        status="pending"
        editHref="/admin/listings/edit/abc-1"
      />,
    )
    const pill = screen.getByTestId("preview-status-pill")
    expect(pill.textContent).toBe("pending")
    expect(pill.className).toContain("amber")
  })

  test("APPROVED listing → status pill reads 'approved' with the approved tone", () => {
    render(
      <PreviewBanner
        status="approved"
        editHref="/admin/listings/edit/abc-2"
      />,
    )
    const pill = screen.getByTestId("preview-status-pill")
    expect(pill.textContent).toBe("approved")
    expect(pill.className).toContain("emerald")
  })

  test("REJECTED listing → status pill reads 'rejected' with the rejected tone", () => {
    render(
      <PreviewBanner
        status="rejected"
        editHref="/admin/listings/edit/abc-3"
      />,
    )
    const pill = screen.getByTestId("preview-status-pill")
    expect(pill.textContent).toBe("rejected")
    expect(pill.className).toContain("red")
  })

  test("'Back to edit form' link points at the supplied editHref", () => {
    render(
      <PreviewBanner
        status="pending"
        editHref="/admin/listings/edit/abc-4"
      />,
    )
    const link = screen.getByRole("link", { name: /back to edit form/i })
    expect(link.getAttribute("href")).toBe("/admin/listings/edit/abc-4")
  })

  test("banner is sticky at top of viewport", () => {
    const { container } = render(
      <PreviewBanner
        status="pending"
        editHref="/admin/listings/edit/abc-5"
      />,
    )
    const banner = container.querySelector('[role="region"]')
    expect(banner).not.toBeNull()
    expect(banner!.className).toContain("sticky")
    expect(banner!.className).toContain("top-0")
  })
})
