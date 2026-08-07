# Brief — Article images: upload path, attribution, and URL validation

**Date:** 2026-08-07
**For:** Claude Code (local, Crucial SSD working copy)
**Branch:** `feat/article-images` off `main`

---

## Why

Field notes now publish from the `articles` table, but **images have no path into it**. The article form offers a bare text input labelled "Hero image URL" with no validation, and `POST /api/admin/upload` only accepts `listing_id` or `itinerary_id`.

The consequence showed up immediately on the first published article: a Pexels *webpage* URL was saved as `hero_image`, the optimizer returned `400 INVALID_IMAGE_OPTIMIZE_REQUEST`, and `og:image` pointed at an HTML page. Nothing caught it, because nothing checks.

The deeper reason is automation. **A scheduled routine cannot paste into a form.** If field notes are to publish unattended, they need a programmatic way to attach an image and record what rights we hold in it — the same asset-library discipline the content-operation plan describes for lodge-supplied photography. Today that path does not exist for articles at all.

I have already uploaded one hero manually to prove the shape works:

```
articles/7b5a0d74-0ca0-4a7f-8221-032548b0ce39/hero/cf87e917-….webp
```

Public URL renders through `/_next/image` correctly. **Match this layout** so the one existing article doesn't become a special case.

---

## Scope

1. An articles flavour on `POST /api/admin/upload`
2. An uploader on the article form, replacing the bare text input
3. `image_attribution` on `articles`, mirroring `directory_listings`
4. Validation so a non-image URL cannot be saved

Out of scope: the listings and itinerary flavours, the sharp pipeline itself, gallery images for articles.

---

## 1. Articles flavour on the upload route

`app/api/admin/upload/route.ts` currently branches on `listing_id` vs `itinerary_id`. Add a third: `article_id`.

- Accepted slot: `hero`. Nothing else for now.
- Storage path: `articles/[article_id]/hero/[uuid].[ext]` — via a `buildArticleStoragePath(articleId, slot, mimeType)` alongside the existing `buildStoragePath` / `buildItineraryStoragePath`.
- Add `validateArticleUpload({ articleId, slot, type, size })` mirroring `validateUpload`, same 10 MB ceiling and same accepted types (`image/jpeg`, `image/png`, `image/webp`, `image/avif`).
- **Run it through `processImageForUpload` exactly as the other flavours do.** Do not add a raw passthrough.

That last point is a safety requirement, not a nicety. The pipeline strips EXIF, and **geotagged photographs of rhino are a live poaching risk**. Any article image path that skips EXIF-stripping is a defect. Note it in a comment so nobody "optimises" it away later.

Keep the same response shape the existing flavours return (`url`, `original_size`, `processed_size`) — the uploader component depends on it.

---

## 2. Uploader on the article form

`components/article-form.tsx` around line 195 has:

```tsx
<Label htmlFor="hero_image">Hero image URL</Label>
<Input id="hero_image" name="hero_image" defaultValue={article?.hero_image ?? ""} placeholder="https://… (optional)" />
```

Replace with the existing `SingleImageUpload` component (`components/admin/single-image-upload.tsx`), which already handles dropzone, progress and the POST. Its props today are:

```ts
{ listingId: string; slot: "hero" | "founder"; value: string; onChange: (url: string) => void; hint?: string; disabled?: boolean; testIdPrefix?: string }
```

Generalise it rather than forking it — `listingId: string` becomes an owner discriminator (for example `ownerId` plus `ownerType: "listing" | "article"`, posting the right field name). Keep the listings call sites working unchanged; if generalising turns out to widen the diff more than a small fork would, say so and fork instead.

**Keep a manual URL override.** Editors sometimes have a URL that is already in the bucket — the one existing article is exactly that case.

---

## 3. Attribution

`directory_listings` has `image_attribution JSONB` (migration `20260515_image_attribution.sql`). `articles` has nothing equivalent.

Add the same column to `articles` in a new migration, with the same shape and the same comment convention. It should be able to record, at minimum: source, photographer or supplying lodge, licence or grant of permission, the credit line to display, and whether social use was granted.

Do not build UI for the full structure in this PR. A single free-text "Image credit" field on the article form, written into the JSONB, is enough — the routine will populate the structured fields later.

---

## 4. Validation

Reject a non-image `hero_image` at the API boundary, in the zod schema on both `POST /api/admin/articles` and `PUT /api/admin/articles/[id]`:

- must parse as an absolute `https:` URL
- host must match the `remotePatterns` allow-list in `next.config.mjs` (currently `*.supabase.co` with pathname `/storage/v1/object/public/**`) — derive from one shared constant rather than duplicating the list, so the two cannot drift
- return `400 { error: "invalid_hero_image" }` with a message naming the problem

A URL that the optimizer will refuse should never reach the database. Right now one did.

---

## Acceptance criteria

1. `POST /api/admin/upload` with `article_id` and `slot=hero` returns a public URL at `articles/[id]/hero/[uuid].webp`
2. That URL renders through `/_next/image` with a 200, and appears as `og:image`
3. Uploaded article images carry **no EXIF** — verify on the processed file, not the source
4. The article form uploads a hero without anyone typing a URL, and still allows pasting one
5. `POST` or `PUT` with `hero_image` set to a webpage URL returns `400 invalid_hero_image`
6. `articles.image_attribution` exists and round-trips through the form
7. The existing article `7b5a0d74-0ca0-4a7f-8221-032548b0ce39` still renders — its hero is already at the target path
8. Listings and itinerary uploads unchanged; `pnpm build` clean on Node 20.19.6 / pnpm 10; `pnpm test` green

---

## House rules

- Branch, PR, preview, then Dom merges. **No merge to main.**
- Stay in scope. Note anything else at the end.
- Flag uncertainty rather than guessing — particularly on whether to generalise or fork `SingleImageUpload`.
- End with: files changed (paths), what changed (one line each), files intentionally not touched, follow-up needed.
- **Commit your work.** The last three briefs ended with changes uncommitted in the working tree; `git log main..HEAD --oneline` should show your commit before you report done.

---

## Standing follow-ups (not this PR)

- **`revalidatePath` on publish** — publishing a field note leaves it missing from `/field-notes` and `/sitemap.xml` for up to an hour. Felt in practice today. `revalidatePath("/field-notes")` and `revalidatePath("/sitemap.xml")` from the publish path fixes it.
- **Soft 404** — `/field-notes/[slug]` and `/listings/[id]` return 200 with not-found content.
- **CHANGELOG** — the `SupabaseProvider` SSR bailout entry.
- **Listing structured data** — no `Product` / `LodgingBusiness` schema on listing pages.
- **Delete `components/supabase-provider.tsx`** — nothing calls `useSupabase()`.
