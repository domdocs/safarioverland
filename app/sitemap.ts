import type { MetadataRoute } from "next"

import { getActiveCategories } from "@/lib/categories"
import { getArticles } from "@/lib/articles"
import { FIELD_NOTE_DATES } from "@/lib/field-note-dates"
import { getListings } from "@/lib/listings"

const BASE = "https://safarioverland.com"

/**
 * Revalidate every hour. Without this, `app/sitemap.ts` is prerendered at
 * build time — approved listings, active categories and DB-backed articles
 * added between deploys wouldn't reach the sitemap until the next deploy.
 * (Silently affected listing SEO prior to PR #17 v2 as well.)
 */
export const revalidate = 3600

/**
 * Region pages live under `app/destinations/[region]/`. Since the
 * self-drive relaunch only southern-africa remains; /destinations and the
 * old East/West/North Africa pages redirect to it (next.config.mjs), so
 * they stay out of the sitemap.
 */
const DESTINATIONS = ["southern-africa"] as const

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

  // Hand-authored field-note routes come from the generated
  // FIELD_NOTE_DATES map rather than a filesystem walk: `app/field-notes/`
  // exists at build time but not inside the deployed serverless function,
  // so walking it at runtime (which `revalidate` above causes) silently
  // yielded nothing on production. Regenerate the map with
  // `node scripts/gen-field-note-dates.mjs` after adding a hand-authored
  // page, or the new page will not reach the sitemap.
  //
  // Skip the /field-notes index itself (already in staticPages).
  const fieldNotes: MetadataRoute.Sitemap = Object.entries(FIELD_NOTE_DATES)
    .filter(([pathname]) => pathname !== "/field-notes")
    .map(([pathname, dates]) => ({
      url: `${BASE}${pathname}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
      lastModified: dates.dateModified,
    }))

  // DB-backed articles at /field-notes/[slug]. Only published rows are
  // publicly reachable — draft / archived 404 on the public surface.
  let articles: MetadataRoute.Sitemap = []
  try {
    articles = (await getArticles({ status: "published", limit: 1000 })).map(
      (a) => ({
        url: `${BASE}/field-notes/${a.slug}`,
        priority: 0.7,
        changeFrequency: "monthly" as const,
        lastModified: a.updated_at,
      }),
    )
  } catch (err) {
    console.error("sitemap: getArticles failed", err)
  }

  return [
    ...staticPages,
    ...listings,
    ...categories,
    ...destinations,
    ...fieldNotes,
    ...articles,
  ]
}
