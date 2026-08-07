/**
 * Regression test — the admin write path must invalidate the ISR
 * caches that surface published articles the moment a status change
 * (or a slug change on a published article) makes them stale, rather
 * than waiting up to an hour for the `revalidate = 3600` window.
 *
 * Covers cases 1 and 2 from handoff/briefs/2026-08-REVALIDATE_ON_PUBLISH.md
 * (draft→published, published→draft), plus the slug-change case and the
 * draft-only no-op that must stay silent.
 */

import { afterEach, describe, expect, test, vi } from "vitest"

const revalidatePath = vi.fn()

vi.mock("next/cache", () => ({
  revalidatePath: (path: string) => revalidatePath(path),
}))

import { revalidateArticleSurfaces } from "./revalidate"

describe("revalidateArticleSurfaces", () => {
  afterEach(() => {
    revalidatePath.mockClear()
  })

  test("draft → published invalidates index, sitemap and new slug", () => {
    revalidateArticleSurfaces({
      oldStatus: "draft",
      newStatus: "published",
      oldSlug: "my-article",
      newSlug: "my-article",
    })
    const calls = revalidatePath.mock.calls.map((c) => c[0])
    expect(calls).toEqual(
      expect.arrayContaining([
        "/field-notes",
        "/sitemap.xml",
        "/field-notes/my-article",
      ]),
    )
    expect(calls).toHaveLength(3)
  })

  test("published → draft invalidates index, sitemap and the (now-hidden) slug", () => {
    revalidateArticleSurfaces({
      oldStatus: "published",
      newStatus: "draft",
      oldSlug: "my-article",
      newSlug: "my-article",
    })
    const calls = revalidatePath.mock.calls.map((c) => c[0])
    expect(calls).toEqual(
      expect.arrayContaining([
        "/field-notes",
        "/sitemap.xml",
        "/field-notes/my-article",
      ]),
    )
    expect(calls).toHaveLength(3)
  })

  test("published → archived also invalidates — a retracted article must disappear", () => {
    revalidateArticleSurfaces({
      oldStatus: "published",
      newStatus: "archived",
      oldSlug: "my-article",
      newSlug: "my-article",
    })
    const calls = revalidatePath.mock.calls.map((c) => c[0])
    expect(calls).toContain("/field-notes")
    expect(calls).toContain("/sitemap.xml")
    expect(calls).toContain("/field-notes/my-article")
  })

  test("slug change on a published article invalidates both old and new paths", () => {
    revalidateArticleSurfaces({
      oldStatus: "published",
      newStatus: "published",
      oldSlug: "old-slug",
      newSlug: "new-slug",
    })
    const calls = revalidatePath.mock.calls.map((c) => c[0])
    expect(calls).toEqual(
      expect.arrayContaining([
        "/field-notes",
        "/sitemap.xml",
        "/field-notes/old-slug",
        "/field-notes/new-slug",
      ]),
    )
    expect(calls).toHaveLength(4)
  })

  test("draft → draft (editing a draft) does not invalidate anything", () => {
    revalidateArticleSurfaces({
      oldStatus: "draft",
      newStatus: "draft",
      oldSlug: "wip",
      newSlug: "wip",
    })
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  test("fresh POST of a draft (oldStatus null) does not invalidate", () => {
    revalidateArticleSurfaces({
      oldStatus: null,
      newStatus: "draft",
      oldSlug: null,
      newSlug: "new-draft",
    })
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  test("fresh POST of a published article invalidates all three paths", () => {
    revalidateArticleSurfaces({
      oldStatus: null,
      newStatus: "published",
      oldSlug: null,
      newSlug: "published-immediately",
    })
    const calls = revalidatePath.mock.calls.map((c) => c[0])
    expect(calls).toEqual([
      "/field-notes",
      "/sitemap.xml",
      "/field-notes/published-immediately",
    ])
  })

  test("DELETE of a published article invalidates index, sitemap and its slug", () => {
    revalidateArticleSurfaces({
      oldStatus: "published",
      newStatus: null,
      oldSlug: "retracted",
      newSlug: null,
    })
    const calls = revalidatePath.mock.calls.map((c) => c[0])
    expect(calls).toEqual(
      expect.arrayContaining([
        "/field-notes",
        "/sitemap.xml",
        "/field-notes/retracted",
      ]),
    )
  })

  test("DELETE of a draft article does not invalidate", () => {
    revalidateArticleSurfaces({
      oldStatus: "draft",
      newStatus: null,
      oldSlug: "wip",
      newSlug: null,
    })
    expect(revalidatePath).not.toHaveBeenCalled()
  })
})
