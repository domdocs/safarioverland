import { afterEach, describe, expect, test } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"

import { CategoryEmptyState } from "./category-empty-state"

describe("CategoryEmptyState", () => {
  afterEach(cleanup)

  test("renders the headline + body + CTA link to /plan", () => {
    render(<CategoryEmptyState noun="lodge" />)

    expect(screen.getByTestId("category-empty-state")).toBeTruthy()
    expect(
      screen.getByTestId("category-empty-state-headline").textContent,
    ).toContain("No properties on the kept list here yet.")

    const cta = screen.getByTestId("category-empty-state-cta")
    expect(cta.getAttribute("href")).toBe("/plan")
    expect(cta.textContent).toContain("Send a brief")
  })

  test("the noun is woven into the prose", () => {
    const { container, unmount } = render(
      <CategoryEmptyState noun="guided tour" />,
    )
    expect(container.textContent).toContain("guided tour property")
    unmount()

    render(<CategoryEmptyState noun="flight" />)
    expect(
      screen.getByTestId("category-empty-state").textContent,
    ).toContain("flight property")
  })

  test("default noun is 'category' when none provided", () => {
    render(<CategoryEmptyState />)
    expect(
      screen.getByTestId("category-empty-state").textContent,
    ).toContain("category property")
  })
})
