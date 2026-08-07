import { afterEach, describe, expect, test } from "vitest"
import { cleanup, render } from "@testing-library/react"

import { ArticleJsonLd } from "./ArticleJsonLd"
import { BreadcrumbsJsonLd } from "./BreadcrumbsJsonLd"
import { niels } from "@/lib/editors"

describe("ArticleJsonLd + BreadcrumbsJsonLd", () => {
  afterEach(cleanup)

  test("ArticleJsonLd emits an application/ld+json script with Article @type", () => {
    const { container } = render(
      <ArticleJsonLd
        headline="A test field note"
        url="https://safarioverland.com/field-notes/a-test-slug"
        image={null}
        datePublished="2026-08-07T00:00:00.000Z"
        dateModified="2026-08-07T00:00:00.000Z"
        editor={niels}
      />,
    )
    const scripts = container.querySelectorAll<HTMLScriptElement>(
      'script[type="application/ld+json"]',
    )
    expect(scripts.length).toBe(1)
    const payload = scripts[0]!.innerHTML
    expect(payload).toContain('"@type":"Article"')
    expect(payload).toContain('"headline":"A test field note"')
  })

  test("BreadcrumbsJsonLd emits an application/ld+json script with BreadcrumbList @type", () => {
    const { container } = render(
      <BreadcrumbsJsonLd
        crumbs={[
          { name: "Home", href: "/", item: "https://safarioverland.com" },
          {
            name: "Field Notes",
            href: "/field-notes",
            item: "https://safarioverland.com/field-notes",
          },
          {
            name: "A test field note",
            item: "https://safarioverland.com/field-notes/a-test-slug",
          },
        ]}
      />,
    )
    const scripts = container.querySelectorAll<HTMLScriptElement>(
      'script[type="application/ld+json"]',
    )
    expect(scripts.length).toBe(1)
    const payload = scripts[0]!.innerHTML
    expect(payload).toContain('"@type":"BreadcrumbList"')
  })
})
