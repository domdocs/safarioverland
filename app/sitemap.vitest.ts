/**
 * Regression test — the sitemap must contain both hand-authored field
 * notes (from FIELD_NOTE_DATES) and DB-backed articles (from Supabase).
 * PR #17 hotfix: `revalidate` moved generation to runtime, at which
 * point the previous filesystem walk of `app/field-notes/` silently
 * yielded zero URLs because that directory doesn't exist inside the
 * deployed serverless function. Guard against that regression by
 * asserting a known static path and a known DB slug both appear.
 */

import { describe, expect, test, vi } from "vitest"

vi.mock("@/lib/listings", () => ({
  getListings: vi.fn(async () => [
    {
      id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      updated_at: "2026-08-01T00:00:00.000Z",
    },
  ]),
}))

vi.mock("@/lib/categories", () => ({
  getActiveCategories: vi.fn(async () => [{ slug: "lodges" }]),
}))

vi.mock("@/lib/articles", () => ({
  getArticles: vi.fn(async () => [
    {
      id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
      slug: "a-db-published-article",
      updated_at: "2026-08-07T00:00:00.000Z",
    },
  ]),
}))

import sitemap from "./sitemap"

describe("sitemap", () => {
  test("includes known static + DB routes; excludes /field-notes duplicate", async () => {
    const entries = await sitemap()
    const urls = entries.map((e) => e.url)

    // Hand-authored field note, from FIELD_NOTE_DATES
    expect(urls).toContain(
      "https://safarioverland.com/field-notes/planning-guides/what-to-pack",
    )

    // DB-sourced field note, from getArticles()
    expect(urls).toContain(
      "https://safarioverland.com/field-notes/a-db-published-article",
    )

    // Self-drive relaunch: routes, a route page, an ad landing page and
    // a self-drive Field Note — all from static imports.
    expect(urls).toContain("https://safarioverland.com/routes")
    expect(urls).toContain(
      "https://safarioverland.com/routes/namibia-kalahari-to-etosha",
    )
    expect(urls).toContain("https://safarioverland.com/self-drive/zimbabwe")
    expect(urls).toContain(
      "https://safarioverland.com/field-notes/self-drive/gravel-roads",
    )

    // DB-sourced listing
    expect(urls).toContain(
      "https://safarioverland.com/listings/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    )

    // /field-notes index appears exactly once (staticPages) — the map
    // filter must not double-emit it.
    const indexCount = urls.filter(
      (u) => u === "https://safarioverland.com/field-notes",
    ).length
    expect(indexCount).toBe(1)

    // No dynamic-segment leaks (route groups / [slug] placeholders).
    for (const u of urls) {
      expect(u).not.toMatch(/\[|\]|\(/)
    }
  })
})
