/**
 * Regression test for the DB-backed field-note renderer.
 *
 * PR #17 v1 shipped without <ArticleJsonLd /> or <BreadcrumbsJsonLd />
 * reaching the HTML — the components rendered `<script>` tags in
 * isolation but not through the page. This test asserts both JSON-LD
 * @types appear in the server-rendered HTML for a published article.
 *
 * Mocks lib/articles so the test runs without a Supabase connection.
 */

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { renderToStaticMarkup } from "react-dom/server"

vi.mock("@/lib/articles", () => ({
  getArticleBySlug: vi.fn(),
  RESERVED_ARTICLE_SLUGS: [] as string[],
}))

// next/image and next/link render a minimal shell in Node — good enough
// for scanning the HTML for JSON-LD.
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { src, alt } = props as { src: string; alt: string }
    // Return a plain img so React can serialise it.
    return (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img src={src} alt={alt} />
    )
  },
}))

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("notFound() called")
  },
}))

import FieldNotePage from "./page"
import { getArticleBySlug } from "@/lib/articles"

const FIXTURE = {
  id: "11111111-1111-1111-1111-111111111111",
  slug: "a-test-slug",
  title: "A test field note",
  category: "planning",
  status: "published" as const,
  hero_image: null,
  image_attribution: null,
  excerpt: "A short excerpt.",
  body_md: "# Heading\n\nParagraph body with a [link](https://example.com).",
  read_minutes: 4,
  author_name: null,
  related_listing_ids: null,
  published_at: "2026-08-07T00:00:00.000Z",
  created_at: "2026-08-07T00:00:00.000Z",
  updated_at: "2026-08-07T00:00:00.000Z",
}

describe("FieldNotePage — JSON-LD in rendered HTML", () => {
  beforeEach(() => {
    vi.mocked(getArticleBySlug).mockReset()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test("renders both Article and BreadcrumbList JSON-LD for a published article", async () => {
    vi.mocked(getArticleBySlug).mockResolvedValue(FIXTURE)

    // Server-component page is an async function; await it to get the tree.
    const tree = await FieldNotePage({
      params: Promise.resolve({ slug: "a-test-slug" }),
    })
    const html = renderToStaticMarkup(tree)

    expect(html).toContain('"@type":"Article"')
    expect(html).toContain('"@type":"BreadcrumbList"')
    expect(html).toContain('"headline":"A test field note"')
  })
})
