import { describe, expect, test } from "vitest"

import { ROUTES } from "./routes"
import { ROUTE_PRICES, formatUsd, getRoutePrice } from "./route-prices"

describe("route prices", () => {
  test("every route has a from price, rounded to US$50, with a year and nights", () => {
    for (const r of ROUTES) {
      const p = getRoutePrice(r.slug)
      expect(p, r.slug).toBeDefined()
      expect(p!.fromUsd).toBeGreaterThan(0)
      expect(p!.fromUsd % 50, r.slug).toBe(0)
      expect(p!.year, r.slug).toMatch(/^20\d{2}(–\d{2})?$/)
      expect(p!.nights).toBeGreaterThan(0)
      expect(p!.basis).toBe("accommodation only, per person sharing")
    }
  })

  test("no prices for routes that don't exist", () => {
    const slugs = new Set(ROUTES.map((r) => r.slug))
    for (const slug of Object.keys(ROUTE_PRICES)) expect(slugs.has(slug), slug).toBe(true)
  })

  test("formatting", () => {
    expect(formatUsd(3050)).toBe("US$3,050")
    expect(formatUsd(950)).toBe("US$950")
  })
})
