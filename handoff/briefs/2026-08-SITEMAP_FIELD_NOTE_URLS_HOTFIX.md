# Brief — Hotfix: field-note URLs missing from the production sitemap

**Date:** 2026-08-07
**For:** Claude Code (local, Crucial SSD working copy)
**Branch:** `fix/sitemap-field-note-urls` off `main`
**Severity:** Live regression. Ship today.
**Caused by:** `handoff/briefs/2026-08-FIELD_NOTES_RENDERER_FIXES.md`, Fix 2 — my brief specified `revalidate` without checking what the sitemap's discovery function depended on.

---

## What's wrong

`/sitemap.xml` on live production lost all 57 hand-authored field-note URLs when PR #17 merged.

Measured against pre-merge production deployments, which are still reachable:

| Deployment | Total URLs | `/field-notes/...` URLs |
|---|---|---|
| `2j8u5tq75` (production, 78d old, pre-PR) | 76 | 57 |
| `43bse83at` (production, 78d old, pre-PR) | 76 | 57 |
| `r22bol79a` (production, 79d old, pre-PR) | 76 | 57 |
| **live production, post-merge** | **19** | **0** |

What survives: `/`, `/about`, `/contact`, `/plan`, `/categories`, `/categories/lodges`, `/destinations` + 4 regions, `/field-notes` (index only), `/privacy-policy`, `/terms-of-service`, and the 5 database-driven `/listings/<uuid>` URLs.

---

## Why

`export const revalidate = 3600` on `app/sitemap.ts` moved generation from **build time** to **runtime ISR**.

`discoverFieldNoteUrls()` walks the filesystem:

```ts
const root = path.join(process.cwd(), "app", "field-notes")
```

That directory exists during a build. It does not exist inside the deployed serverless function at request time, so the walk returns nothing and the field-note branch contributes zero URLs. The database-driven branches are unaffected, which is why the 5 listing URLs are still present — they don't touch the filesystem.

Preview deployments still report 76 because they are serving their build-time prerendered copy; production regenerated at runtime and lost them. Don't be misled by a preview looking healthy — verify on production after deploy.

---

## The fix

**Do not revert `revalidate`.** Losing it would restore the 57 URLs but re-freeze database content until redeploy, which is the problem Fix 2 existed to solve. The data the walk was discovering is already generated and available as a static import.

`lib/field-note-dates.ts` exports `FIELD_NOTE_DATES`, a `Record<string, FieldNoteDates>` keyed by pathname, covering all 58 field-note routes. It's produced by `scripts/gen-field-note-dates.mjs` and imported statically, so it bundles correctly and needs no filesystem at runtime.

Replace `discoverFieldNoteUrls()` with:

```ts
import { FIELD_NOTE_DATES } from "@/lib/field-note-dates"

// Field-note routes come from the generated map rather than a filesystem
// walk: app/field-notes/ exists at build time but not inside the deployed
// serverless function, so walking it at runtime (which `revalidate` causes)
// silently yields nothing. Regenerate with `node scripts/gen-field-note-dates.mjs`
// after adding a hand-authored page, or it will not reach the sitemap.
const fieldNoteUrls = Object.keys(FIELD_NOTE_DATES).filter((p) => p !== "/field-notes")
```

Keep the existing `lastModified` / `priority` / `changeFrequency` treatment. `FIELD_NOTE_DATES` also carries `updatedAt` per page — use it for `lastModified` if it's a clean fit; don't restructure the sitemap to make it fit.

Delete `discoverFieldNoteUrls()` and its `fs` / `path` imports if nothing else uses them.

---

## Also check while you're in there

Grep for other runtime filesystem access that the same build-time-to-runtime shift could have broken:

```
rg "process\.cwd\(\)|from \"node:fs\"|from \"fs\"" app/ lib/
```

Anything reached from a route with `revalidate`, `force-dynamic`, or a dynamic segment has the same failure mode: works locally, works at build, silently returns nothing in production. Report what you find; don't fix beyond the sitemap in this PR.

---

## Acceptance criteria

1. Live `/sitemap.xml` returns **76 or more** URLs, including **57** `/field-notes/...` paths
2. The 5 `/listings/<uuid>` URLs are still present — the database branch must not regress
3. `/field-notes` (the index) appears exactly once, and no `[slug]` or route-group paths leak in
4. A published database article appears in the sitemap within the revalidation window
5. A test asserts the sitemap contains both a known static field-note path and a database-sourced URL
6. `pnpm build` clean on Node 20.19.6 / pnpm 10; `pnpm test` green

**Verify on production after deploying, not on the preview** — the preview will look correct either way, which is exactly how this got through.

---

## House rules

- Branch off `main`, PR, preview, then merge. **No merge-to-main directly.**
- Scope is `app/sitemap.ts` and its test. Report anything the grep turns up; don't fix it here.
- End with: files changed (paths), what changed (one line each), files intentionally not touched, follow-up needed.

---

## Standing follow-ups (not this PR)

- **Soft 404** — `/field-notes/[slug]` and `/listings/[id]` both return HTTP 200 with not-found content. Pre-existing, own PR.
- **Sitemap immediacy** — `revalidatePath("/sitemap.xml")` and `revalidatePath("/field-notes")` from the publish endpoint, so a published article appears at once rather than within the hour.
- **CHANGELOG** — the `SupabaseProvider` SSR bailout deserves its own entry. It stripped `h1`, `h2` and page-level JSON-LD from initial HTML across the whole site, listings included, since the provider was introduced. Confirmed live before and after: field notes went from `h1=0` with no `Article` JSON-LD to `h1=1, h2=7` with `Article` and `BreadcrumbList`; a listing detail page went from `h1=0` to `h1=1`.
- **Listing structured data** — listing pages carry no `Product` / `LodgingBusiness` schema. Invisible while nothing server-rendered; now a cheap win on the highest-value pages.
- **Delete `components/supabase-provider.tsx`** — nothing calls `useSupabase()`.
