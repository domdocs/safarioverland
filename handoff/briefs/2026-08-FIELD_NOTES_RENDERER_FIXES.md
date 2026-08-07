# Brief — Field Notes renderer: fixes before merge

**Date:** 2026-08-07
**For:** Claude Code (local, Crucial SSD working copy)
**Branch:** `feat/field-notes-db-renderer` (PR #17) — amend this branch, do not open a new one
**Companion:** `handoff/briefs/2026-08-FIELD_NOTES_DB_RENDERER.md` (the original brief)

---

## Why

PR #17 was tested end to end against a real production build and against the Vercel preview, using the live Supabase project. **The core of it works**: the reserved-slug guard fires, drafts genuinely do not leak, markdown headings and links render, existing pages are untouched, `published_at` auto-stamps, delete works.

Four defects were found. Three of them block the autonomous content operation and should be fixed on this branch before merge. The fourth is pre-existing and belongs in its own PR.

Test method, for reproducing: `pnpm build && pnpm start`, then HTTP calls against `/api/admin/articles` and the public routes; plus the same calls against the preview deployment with an `x-vercel-protection-bypass` header. All test rows were deleted; `articles` is back to zero rows.

---

## Fix 1 — `category` is required by the database but optional in the API schema

**Priority: highest.** This is the one that would break an unattended routine.

`POST /api/admin/articles` accepts `category` as `optional().nullable()`, but the insert fails without it. The failure surfaces as an opaque 500:

```
{"error":"create_failed","message":"Unknown error"}
```

Bisected — base payload is `{slug, title, status, body_md}`:

| Payload | Result |
|---|---|
| base | `500 create_failed` |
| base + `excerpt` | `500 create_failed` |
| base + `read_minutes` | `500 create_failed` |
| base + `author_name` | `500 create_failed` |
| **base + `category`** | **`201`** |

**What to do.** Establish first *why* the DB rejects it — check the `articles` table for a `NOT NULL` on `category` that `20260511_articles_drop_legacy_notnull.sql` missed. Then pick one:

- If category genuinely should be required: make it required in the zod `createSchema` so the caller gets `400 invalid_payload` naming the field, not a 500.
- If it should be optional: drop the `NOT NULL` in a migration and leave the schema alone.

Either way, **`create_failed` must stop returning `"Unknown error"`.** Surface the underlying Postgres error message. A routine that fails at 6am needs to say why in the log, or the trust ladder is unauditable.

While you're there: consider validating `category` against `ARTICLE_CATEGORIES`. It currently accepts any string up to 40 chars, so a typo becomes a silently uncategorised article.

---

## Fix 2 — the sitemap and the index are statically prerendered

**Priority: highest.** Without this, publishing from the database doesn't reach anyone.

Confirmed in `.next/prerender-manifest.json`: both `/sitemap.xml` and `/field-notes` are prerendered at build time. So the `getArticles` call added to `app/sitemap.ts` runs once, during the build, and its result is frozen until the next deploy.

The practical effect: a routine publishes a field note, and it appears in neither the sitemap nor the index until something unrelated triggers a redeploy. Acceptance criteria 3 and 4 from the original brief cannot pass in a real deployment.

**What to do.** Add a revalidation window to both routes:

```ts
// app/sitemap.ts and app/field-notes/page.tsx
export const revalidate = 3600
```

An hour is a reasonable trade between freshness and cache efficiency; the Sunday digest and search engines are both tolerant of that. `force-dynamic` also works but gives up caching on two of the site's most-hit routes, so prefer `revalidate` unless there's a reason not to.

**Note this is pre-existing and wider than field notes.** `app/sitemap.ts` already pulls `getListings` and `categories` from the database, so **new listings have never reached the sitemap either** except by redeploy. Fixing `sitemap.ts` fixes both. Worth a line in the CHANGELOG, because it silently affected listing SEO.

---

## Fix 3 — Article and BreadcrumbList JSON-LD are missing from the rendered page

**Priority: high.** This is a regression against every hand-authored field note.

`ArticleJsonLd` and `BreadcrumbsJsonLd` are imported and rendered in `app/field-notes/[slug]/page.tsx`, but their output does not appear in the response. Verified against the **Vercel preview**, not just locally, searching the full response body including the escaped RSC flight payload:

| Marker | Present |
|---|---|
| `"@type":"Organization"` (global, from layout) | yes |
| `"@type":"Article"` | **no** |
| `"@type":"BreadcrumbList"` | **no** |
| `<h2>` from markdown | yes |
| anchor to `safarioverland.com/listings` | yes |
| `rel="canonical"` | yes |

So the page renders correctly — it just ships without the structured data. Given the E-E-A-T work in SEO Brief 1 deliberately added `ArticleJsonLd` and `Byline` to every field note, DB-backed articles would silently be second-class in search.

**What to do.** Find out why the components produce no output. Worth checking first:

- whether they return `null` when a prop is missing — `hero_image` and `excerpt` are nullable, and the test article had no `hero_image`
- whether the `Editor` lookup resolves; `articles.author_name` is a free string and `getEditorById` keys by id, so a mismatch may short-circuit the component
- whether they're inside a streaming boundary whose output never lands in the HTML

Add a regression test asserting both `@type`s appear in the rendered output for a published article.

---

## Fix 4 — soft 404 (separate PR, do not do it here)

Drafts, archived rows and nonexistent slugs return **HTTP 200** with the "Field note not found" page. Confirmed on the Vercel preview, so this is not dev-mode behaviour.

**No content leaks** — the article title and body are correctly absent. It is purely a status-code problem, and search engines treat 200-with-not-found-copy as a soft 404.

It is also **pre-existing and not caused by this PR**:

```
/field-notes/no-such-slug          → 200   <title>Field note not found</title>
/listings/<nonexistent-uuid>       → 200   <title>Listing not found | Safari Overland</title>
/no-such-page-at-all               → 404   (correct)
```

The new route faithfully mirrors `app/listings/[id]`, which is exactly what the original brief asked for. Fixing it properly means fixing both routes and understanding why `notFound()` isn't producing a 404 status in these segments — a different investigation, on its own branch, with its own preview.

**Leave it. Log it as a follow-up.**

---

## Acceptance criteria

1. `POST` without `category` returns either `201` or a `400` naming the field — never a 500
2. `create_failed` responses carry the underlying database error, not `"Unknown error"`
3. Publishing an article makes it appear at `/sitemap.xml` and in the `/field-notes` latest rail within the revalidation window, with no redeploy
4. A published article's HTML contains `"@type":"Article"` and `"@type":"BreadcrumbList"`
5. A regression test covers criterion 4
6. All 58 existing field-note pages still render unchanged
7. `pnpm build` clean on Node 20.19.6 / pnpm 10; `pnpm test` green

---

## House rules

- Amend PR #17 on the existing branch. **No merge to main** — Dom reviews the preview, then merges.
- Stay in scope: fixes 1–3 only. Note anything else at the end; don't touch it.
- Fix 4 is explicitly out of scope.
- Flag uncertainty rather than guessing — particularly on why the JSON-LD components produce nothing.
- End with: files changed (paths), what changed (one line each), files intentionally not touched, follow-up needed.

---

## Verified state

Tested 2026-08-07 against `feat/field-notes-db-renderer` and the preview deployment `safarioverland-5zsh-7eybe3c3k`.

Passing already, don't regress: reserved-slug guard returns `400 reserved_slug`; drafts return the not-found page with no article content and stay out of the sitemap and index; `published_at` auto-stamps on publish; markdown headings, lists and links render; `rel="canonical"` is correct; `DELETE` works; `/field-notes/faqs`, `/field-notes/planning-guides/what-to-pack`, `/field-notes/seasonal-guides/great-migration` and `/field-notes/conservation` all still return 200.

`articles` table left at zero rows.
