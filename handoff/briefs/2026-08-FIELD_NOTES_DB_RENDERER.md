# Brief — Field Notes: public renderer for DB-backed articles

**Date:** 2026-08-07
**For:** Claude Code (local, Crucial SSD working copy)
**Status:** DRAFT — not yet handed over
**Branch:** `feat/field-notes-db-renderer`

---

## Why

Field notes are currently 58 hand-authored `.tsx` pages under `app/field-notes/`. The `articles` table, its admin CRUD UI and `POST /api/admin/articles` all exist and work — but **nothing public reads them**, and the table has zero rows. `lib/articles.ts` says so directly:

> `For file-based MDX guides see app/field-notes/* — those live in code.`

This blocks the autonomous content operation. Publishing a field note today means writing a React component, which means a code PR, which a scheduled cloud routine cannot do. Listings already publish cleanly through `/api/admin/listings/import`; articles need the same.

**This brief builds the missing public surface.** After it ships, a field note is a database row: drafted by a routine, held at `status='draft'`, and published by flipping status in the admin UI. No further code changes per article.

The 58 existing pages are untouched and keep working exactly as they do.

---

## Scope

**In:**

1. `app/field-notes/[slug]/page.tsx` — public renderer for `articles` rows
2. A markdown renderer for `articles.body_md` (none currently installed)
3. Sitemap inclusion for published articles
4. A DB-driven "latest" rail on the field-notes index
5. Reserved-slug protection

**Out:** migrating any of the 58 existing pages; changing the admin UI; changing the `articles` schema; touching listings.

---

## Requirements

### 1. The route

`app/field-notes/[slug]/page.tsx`, mirroring `app/listings/[id]/page.tsx`.

- Next 15 async params: `params: Promise<{ slug: string }>`, `const { slug } = await params`
- Fetch with the existing, currently-unused `getArticleBySlug(slug)` from `@/lib/articles`
- Export `generateMetadata` returning title, description from `excerpt`, `alternates.canonical` at `https://safarioverland.com/field-notes/${slug}`, and `openGraph` with `hero_image`
- **Public gate, in both `generateMetadata` and the page component:** anything where `status !== 'published'` calls `notFound()`. Mirror the comment on the listing page — pending/draft rows must 404 on the public surface.
- Add sibling `loading.tsx` and `not-found.tsx`, as `app/listings/[id]/` has
- Wrap in `EditorialHeader` / `EditorialFooter` / `StickyCTA` to match

**One level deep, deliberately.** Existing notes sit two deep (`/field-notes/seasonal-guides/great-migration`); DB articles sit at `/field-notes/<slug>`. Do **not** use `[category]/[slug]` — the static `planning-guides` etc. directories would win the first segment and silently shadow every DB article beneath them.

Static-before-dynamic resolution means the five existing static routes are safe.

### 2. Markdown rendering

**There is no markdown renderer in `package.json`.** `gray-matter` is present but parses frontmatter only. One must be added.

- Prefer `react-markdown` + `remark-gfm`, rendered in a server component
- **Pin versions compatible with Node 20.19.6 and pnpm 10.** Recent majors of the remark/rehype chain require newer Node. If the current major won't install cleanly, pin back rather than upgrading Node — that's a separate, deliberate task.
- `body_md` is admin-authored and trusted, so HTML sanitisation is not strictly required; do not enable `rehype-raw`
- Style the output to match the existing pages' prose treatment — Cormorant Garamond headings, restrained body. Reuse the typographic classes from an existing field note rather than inventing new ones.

### 3. Byline, JSON-LD, breadcrumbs

`AutoArticleMeta` (mounted in `app/field-notes/layout.tsx`) reads `FIELD_NOTE_DATES[pathname]` and will fall through to `FALLBACK_DATE` for any `[slug]` path. Its own docblock anticipates this: pages wanting a bespoke byline should call the components directly.

So render explicitly:

- `<Byline editor={...} published={article.published_at} updated={article.updated_at} />` from `@/components/Byline`
- `<ArticleJsonLd headline url image datePublished dateModified editor />` from `@/components/JsonLd/ArticleJsonLd`
- `<Breadcrumbs>` + `<BreadcrumbsJsonLd>` with crumbs `Home → Field Notes → <title>`

**Editor mapping:** `articles.author_name` is a free string; `Editor` comes from `getEditorById` in `@/lib/editors`. Default to `editor-niels` — the project has one editor, and `author_name` should not be allowed to invent a second. If `author_name` is set and doesn't resolve, still use Niels and don't fail the render.

Do **not** regenerate `lib/field-note-dates.ts`; DB articles use `published_at` / `updated_at` directly.

### 4. Sitemap

`app/sitemap.ts` walks the filesystem and explicitly skips `[`-prefixed directories, so the new route contributes nothing on its own. Add a third source alongside `listings` and `categories`:

```ts
getArticles({ status: "published", limit: 1000 })
  .map(a => ({
    url: `${BASE}/field-notes/${a.slug}`,
    lastModified: a.updated_at,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }))
```

Wrap in the same try/catch-and-degrade-to-`[]` pattern already used for `getListings`.

### 5. Index page

`app/field-notes/page.tsx` has two hardcoded literals: `PILLARS` (4 entries) and `ARTICLES` (a hand-picked 3-item featured rail). **Leave both as they are.**

Add a new DB-driven section below the existing rail — latest published articles, `limit` 6 — using the same card markup. If there are no published articles, render nothing at all rather than an empty state.

`eyebrow` on the existing cards is a composed string, `"<Pillar> · NN min"`, zero-padded to two digits (`03 min`). Derive it from `category` + `read_minutes`. Where `read_minutes` is null, omit the duration rather than guessing.

### 6. Reserved slugs

A DB article with slug `conservation`, `faqs`, `planning-guides`, `safety-tips` or `seasonal-guides` would be silently unreachable — the static route wins and the article simply never renders, with no error anywhere.

Add a reserved-slug check to the zod `createSchema` in `POST /api/admin/articles` (and the update route), rejecting with `400 { error: "reserved_slug" }`. Derive the list from a single exported constant so it stays in step if new static directories are added.

---

## Known gaps — flag, don't fix

Two things this brief deliberately leaves alone. Note them in your end-of-task summary; don't extend scope.

**`related_listing_ids` has no renderer.** `RelatedListings` accepts `{ country, region, category, excludeId, limit }` — filters, not an explicit ID list. Honouring `articles.related_listing_ids` needs either a new prop or a sibling component. Since internal linking is how content compounds into bookings, this matters — but it's a second PR.

**`RelatedFieldNotes` reads a hand-maintained map** at `lib/content/related.ts` ("Add a new field-note here when one ships"). DB articles won't appear in related rails until `getRelatedFieldNotes` becomes async and merges a DB query. `RelatedNote = { slug, url, title, excerpt, topic }` maps cleanly onto article columns, so it's straightforward — just not here.

Also worth knowing, no action needed: `POST /api/admin/articles` does not validate `category` against `ARTICLE_CATEGORIES`, doesn't URL-validate `hero_image`, and accepts `published_at` as a loose string with no `.datetime()`. And `ARTICLE_CATEGORIES` has eight values (`planning, safety, conservation, seasonal, travellers, wildlife, culture, gear`) against four pillars — the last four have no home on the index. Leave both; they're decisions for Dom, not fixes.

---

## Acceptance criteria

1. `POST /api/admin/articles` with `status: "draft"` → `/field-notes/<slug>` returns **404**, and the slug appears in no sitemap
2. Flipping that row to `published` → the page renders with title, hero image, markdown body, byline, breadcrumbs, and valid `Article` JSON-LD
3. The published slug appears in `/sitemap.xml` with a `lastModified`
4. The article appears in the new latest rail on `/field-notes`
5. All 58 existing field-note pages render **byte-identically** to before — verify a sample across all four pillars
6. `/field-notes/faqs` and the other four static routes still resolve to their static pages
7. `POST` with slug `conservation` → `400 reserved_slug`
8. `pnpm build` clean on Node 20.19.6 / pnpm 10; `pnpm test` green

---

## House rules

- Branch and PR. **No merge to main** — Dom reviews the Vercel preview, then merges.
- Stay in scope. Note unrelated improvements at the end; don't touch them.
- Simplest solution first. No configuration knobs that weren't asked for.
- Flag uncertainty explicitly rather than filling gaps with plausible guesses — especially on the markdown dependency versions.
- End with: files changed (paths), what changed (one line each), files intentionally not touched, follow-up needed.

---

## Verified context

Gathered 2026-08-07 from the SSD working copy at `e4c5561`:

- `articles` table: **0 rows**. Schema in `supabase/migrations/20260509_create_articles_and_app_settings.sql`, columns extended by `20260510` and `20260511`.
- `directory_listings`: 79 rows — 5 approved, 17 pending, 57 rejected.
- `getArticleBySlug` already exists in `lib/articles.ts` and is currently unused — this brief is its first caller.
- `getArticles` returns `[]` rather than throwing when Supabase is unavailable, so the sitemap and index degrade safely.
- `createArticle` auto-stamps `published_at` when status becomes `published` without one.
