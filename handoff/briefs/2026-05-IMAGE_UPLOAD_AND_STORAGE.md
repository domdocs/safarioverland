> ✓ **SHIPPED (Phase 1)** — May 2026, PR #5 merged to `main`. Final
> commit `431add6`. Phase 2 (server-side resize, EXIF stripping,
> responsive-size variants, alt-text capture) deferred.
> See `handoff/CHANGELOG.md` for the session-level summary.

# Image upload + storage

Operator outreach is going to return high-resolution photographs — we
need a place to put them, a way to upload them from the admin, and
URLs to point the existing listing fields at. The editorial brand
depends on owning the photography lifecycle; we can't keep pasting
external URLs.

## Goal

By the end of this brief, Niels (or Dom) can:

1. Open `/admin/listings/edit/[id]` for any listing
2. Drag a photograph onto the hero image field, see it upload, see
   the thumbnail appear
3. Drag multiple photographs onto the gallery field, see them upload
   and appear as reorderable thumbnails
4. Upload a founder portrait the same way
5. Save the listing — the `image_url`, `gallery_urls`,
   `founder_image_url` fields now contain stable URLs that point at
   our own storage

No file-path-pasting. No external image hosts.

## Branch

Wait for the listing-preview branch to land first (it touches the
same edit form), then:

```bash
git checkout main
git pull
git checkout -b feature/image-upload-storage
```

## Storage choice — Supabase Storage

Supabase Storage is the right choice here:

- Already in the stack — no new vendor or billing line
- Generous free tier (1 GB storage + 2 GB egress per month is more
  than enough for ~200 listings at ~5 images each)
- Same service-role key flow we already use for the database
- Public-read URLs are stable, CDN-served, fast
- Bucket policies map cleanly to existing admin Basic Auth pattern

Cost projection: at 50 listings × 5 images × 600 KB average = 150 MB.
We hit paid Pro tier ($25/month for 100 GB) somewhere around 800-1000
listings, by which point image hosting is the least of our problems.

## Setup — Supabase Storage bucket

Single bucket called `listing-media`. Configuration:

- **Public** (read access without authentication, but we control writes)
- **File size limit**: 10 MB per file (we'll add server-side resize
  in Phase 2; until then, this is the safety valve)
- **MIME types allowed**: `image/jpeg`, `image/png`, `image/webp`

Folder structure inside the bucket:

```
listing-media/
  [listing_id]/
    hero/[uuid].[ext]              -- single hero per listing
    gallery/[uuid].[ext]           -- multiple gallery items
    founder/[uuid].[ext]           -- single founder portrait
```

The `[listing_id]` prefix means deleting a listing later can clean
up all its media in one swoop (Phase 2 cleanup job).

### RLS / policies

```sql
-- Anyone can read (public CDN-served URLs)
CREATE POLICY "public can read listing media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'listing-media');

-- Only service role can write (admin uploads go through our API,
-- which uses service role and bypasses RLS anyway)
-- No INSERT/UPDATE/DELETE policies needed — service role bypasses.
```

If Supabase Studio is the easier path for bucket setup, do it there
and document the steps in a `supabase/storage-setup.md`.

## Files to add

### 1. `app/api/admin/upload/route.ts` — upload endpoint

`POST /api/admin/upload`

Request: `multipart/form-data` with fields:

- `file`: the image file
- `listing_id`: which listing this belongs to
- `slot`: `"hero"` | `"gallery"` | `"founder"`

Server:

1. Validate auth via admin Basic Auth middleware
2. Validate file type and size
3. Generate UUID for the filename
4. Upload to `listing-media/[listing_id]/[slot]/[uuid].[ext]` via
   service-role Supabase client
5. Return the public URL of the uploaded object

Response:

```json
{
  "ok": true,
  "url": "https://<project>.supabase.co/storage/v1/object/public/listing-media/d97e32c6.../hero/abc123.jpg"
}
```

Error responses: 400 for validation, 401 for auth, 500 for upload
failure.

### 2. `lib/upload/storage.ts` — server-side upload helper

Wrap the Supabase Storage SDK in a small typed helper:

```ts
export type UploadSlot = "hero" | "gallery" | "founder"

export async function uploadListingImage(
  listingId: string,
  slot: UploadSlot,
  file: File,
): Promise<{ ok: true; url: string } | { ok: false; error: string }>
```

Used by the API route above. Keeps the storage interaction
testable and isolated.

### 3. Admin edit form changes — `app/admin/listings/edit/[id]/page.tsx` (or its child form component)

Replace the existing URL-only inputs with upload-capable widgets:

**Hero image field (`image_url`):**

- Drag-drop zone (react-dropzone — already a project dep)
- Click to choose from file picker
- After upload completes, show thumbnail of the resulting image
- "Replace" and "Remove" buttons under the thumbnail
- Display the resulting URL as a small `<code>` block beneath the
  thumbnail for transparency / debugging

**Gallery (`gallery_urls`):**

- Same drag-drop zone, but accepts multiple files at once
- Each uploaded image shows as a thumbnail in a horizontal scrolling
  row
- Drag-to-reorder (use `@dnd-kit` if not already in the stack —
  small, react-friendly)
- "Remove" X button on each thumbnail
- Order in the array is the order on the public listing page

**Founder portrait (`founder_image_url`):**

- Same single-image upload pattern as hero
- Square aspect-ratio guidance shown in the UI hint
  (*"Portrait works best as a square crop, around 600×600px"*)

### 4. Optional but recommended — image attribution metadata

A simple addition to the listing schema, captured as a JSONB column:

```sql
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS image_attribution JSONB;
```

Shape:

```json
{
  "hero": {
    "supplied_by": "Operator: Matetsi Victoria Falls",
    "uploaded_at": "2026-05-15T10:00:00Z",
    "licence": "Editorial use, operator permission",
    "alt_text": "Suite at last light over the Zambezi"
  },
  "gallery": [
    {
      "url": "...",
      "supplied_by": "Operator",
      "uploaded_at": "...",
      "licence": "Editorial use",
      "alt_text": "..."
    }
  ],
  "founder": {
    "supplied_by": "...",
    "uploaded_at": "...",
    "licence": "...",
    "alt_text": "Portrait of [founder name]"
  }
}
```

This isn't strictly required for v1 — we can add it later. But it's
cheap to include now, gives us alt-text proper accessibility wins,
and creates a paper trail for image rights. Worth doing in the same
branch.

If included, the admin upload UI should also capture:

- A short "Supplied by" text field per upload
- Alt text per upload (defaults to the lodge name + slot label)

## Public site changes

`/listings/[id]` and the editorial card component already render
`image_url`, `gallery_urls`, and `founder_image_url` as `<Image>` /
`<img>` elements. No changes needed — they just read URLs as before,
the URLs now point at Supabase Storage instead of external hosts.

If `image_attribution.hero.alt_text` is available, use it for the
`alt` prop instead of a fallback.

## Tests

- Unit tests for the upload helper: valid file → ok with URL; oversize
  file → error; wrong MIME → error
- Integration test for the API route: POST a small JPEG, assert
  201 with URL pointing at the storage bucket
- E2E test (manual is fine for v1): upload a hero image on
  /admin/listings/edit/[id], save, refresh, confirm the thumbnail
  persists and the URL renders on the public listing page

## Phase 2 (out of scope for this brief)

Worth noting so the architecture supports it later, but not in this
PR:

- **Server-side image processing**: resize incoming uploads to a max
  width (e.g. 2000px), generate multiple sizes (300/600/1200/2000)
  for responsive serving, convert to WebP
- **EXIF stripping** for privacy
- **A "Media library" view** in admin to browse/search uploaded
  images across listings
- **Bulk upload from email**: drag the contents of an operator's
  email response (Mail.app supports this) onto the gallery zone for
  rapid ingestion
- **Image variants table**: track the multiple sizes per uploaded
  source image so the public site can request the right size

These are real future investments but each is bigger than this
brief and can ship in subsequent passes.

## Verify

1. Local dev / preview deployment:
   - Open `/admin/listings/edit/[id]` for any listing
   - Drag a JPEG onto the hero zone — see upload progress, then
     thumbnail
   - Drag three more onto the gallery zone — see all three uploaded
     and reorderable
   - Save the listing
   - Refresh — thumbnails persist
2. Open `/admin/listings/preview/[id]` — preview shows the uploaded
   images rendering on the page
3. Approve the listing, visit the public path `/listings/[id]` —
   same images render
4. Inspect a thumbnail URL — it points at the Supabase Storage CDN

## Out of scope (this brief)

- Any image-processing or resizing pipeline — Phase 2
- A separate media library page — Phase 2
- Migrating any existing pasted-in URLs from the seed CSV to
  Supabase Storage — Phase 2 / not necessary; existing listings can
  keep their URLs until edited
- Operator-side direct upload (a magic link for operators to upload
  their own photos) — interesting future feature, not now

## Done means

- `listing-media` bucket exists in Supabase with the documented
  policies
- `/api/admin/upload` accepts authenticated uploads and returns
  public URLs
- The listing edit form has drag-drop upload zones for hero, gallery,
  and founder portrait
- Uploaded images persist, render in preview, render on the public
  listing page after approval
- (Optional but recommended) `image_attribution` JSONB column captures
  supplied-by, licence, alt-text per uploaded image
- Tests pass
- PR description references this brief
