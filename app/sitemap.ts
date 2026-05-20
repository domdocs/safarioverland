import { readdirSync, statSync } from "node:fs"
import path from "node:path"
import type { MetadataRoute } from "next"

import { getActiveCategories } from "@/lib/categories"
import { getListings } from "@/lib/listings"

const BASE = "https://safarioverland.com"

/**
 * The four region pages live under `app/destinations/[country]/`.
 * They're hard-coded rather than loaded from a data source — list
 * them explicitly here.
 */
const DESTINATIONS = [
  "east-africa",
  "southern-africa",
  "west-africa",
  "north-africa",
] as const

/**
 * Discover every `page.tsx` under `app/field-notes/` at build time so
 * new field notes show up in the sitemap automatically. The brief
 * leaves this as a hand-maintained list; using fs is the smallest
 * upgrade that won't go stale when a new resource is added.
 */
function discoverFieldNoteUrls(): string[] {
  const root = path.join(process.cwd(), "app", "field-notes")
  const urls: string[] = []

  function walk(dir: string, urlPath: string) {
    let entries: string[] = []
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    if (entries.includes("page.tsx")) {
      urls.push(urlPath)
    }
    for (const entry of entries) {
      // Skip dynamic segments and route groups — they don't represent
      // a single concrete URL.
      if (entry.startsWith("[") || entry.startsWith("(") || entry.startsWith("_")) {
        continue
      }
      const full = path.join(dir, entry)
      let isDir = false
      try {
        isDir = statSync(full).isDirectory()
      } catch {
        isDir = false
      }
      if (isDir) {
        walk(full, `${urlPath}/${entry}`)
      }
    }
  }

  walk(root, "/field-notes")
  return urls
}

/**
 * Dynamic sitemap that pulls live content from the codebase's actual
 * loaders. Excludes utility / admin / API surfaces explicitly even
 * though they're not enumerated above — defence in depth in case a
 * loader ever returns a draft path by mistake.
 *
 * The static sitemap that used to live at `public/sitemap.xml` was
 * removed in the same commit; Next.js serves this one instead.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      priority: 1.0,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE}/about`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${BASE}/contact`,
      priority: 0.6,
      changeFrequency: "yearly",
    },
    {
      url: `${BASE}/plan`,
      priority: 0.9,
      changeFrequency: "monthly",
    },
    {
      url: `${BASE}/categories`,
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE}/destinations`,
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE}/field-notes`,
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE}/terms-of-service`,
      priority: 0.3,
      changeFrequency: "yearly",
    },
    {
      url: `${BASE}/privacy-policy`,
      priority: 0.3,
      changeFrequency: "yearly",
    },
  ]

  // Approved listings (UUID-keyed) — the brief's idealised /lodges/[slug]
  // shape isn't live; use the existing /listings/[id] paths.
  let listings: MetadataRoute.Sitemap = []
  try {
    listings = (await getListings({ limit: 1000 })).map((l) => ({
      url: `${BASE}/listings/${l.id}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
      lastModified: l.updated_at,
    }))
  } catch (err) {
    console.error("sitemap: getListings failed", err)
  }

  // Categories with at least one approved listing — categories with
  // zero listings retire from /categories per the earlier work.
  let categories: MetadataRoute.Sitemap = []
  try {
    categories = (await getActiveCategories()).map((c) => ({
      url: `${BASE}/categories/${c.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    }))
  } catch (err) {
    console.error("sitemap: getActiveCategories failed", err)
  }

  const destinations: MetadataRoute.Sitemap = DESTINATIONS.map((slug) => ({
    url: `${BASE}/destinations/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }))

  // Field notes — discovered from app/field-notes/**/page.tsx at build
  // time. Skip the /field-notes index itself (already in staticPages).
  const fieldNotes: MetadataRoute.Sitemap = discoverFieldNoteUrls()
    .filter((u) => u !== "/field-notes")
    .map((u) => ({
      url: `${BASE}${u}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    }))

  return [
    ...staticPages,
    ...listings,
    ...categories,
    ...destinations,
    ...fieldNotes,
  ]
}
