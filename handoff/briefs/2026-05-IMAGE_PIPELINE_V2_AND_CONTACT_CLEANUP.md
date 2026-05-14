> ✓ **SHIPPED** — 2026-05-14, PR #7 merged to `main`. Final commit `64e098c`.
> Verified live: 36 KB JPEG with sharp-injected GPS came back at 6.9 KB
> WebP, 2400×1600, EXIF absent.
> See `handoff/CHANGELOG.md` for the session-level summary.

# Image processing v2 + listing contact cleanup

Two pieces of work bundled together because they polish the
public-facing listing experience in complementary ways:

1. **Image pipeline v2** — server-side resize, EXIF stripping, and
   WebP conversion at upload time. v1 stored operator photos as-is
   (potentially 5–10 MB JPEGs with embedded GPS); v2 makes them lean,
   private, and ready for the Vercel image optimizer.
2. **Listing contact-detail cleanup** — drop operator contact name,
   phone, and email from the public listing page. Editorial decision:
   enquiries should route through Safari Overland, not direct to the
   operator. Legacy directory feature, off-brief.

The founder profile (name, note, image) stays — that's the human
element we want. The operator website link stays — visitors going to
the source for more detail is fine and on-brand.

## Branch

```bash
git checkout main
git pull
git checkout -b feature/image-pipeline-v2-and-contact-cleanup
```

## Part A — image pipeline v2

### Goal

Operator-supplied photos land in `listing-media` already resized,
EXIF-stripped, and converted to WebP. Source files are lean (under
~500 KB typically), private (no GPS / camera serial leaks), and fast
through the Vercel image optimizer downstream.

### Dependency

Add `sharp` to `package.json`. It's the Node-side image processing
library Vercel itself uses for `next/image`, so it's already in the
broader stack — installing it as an explicit dep gives us
upload-time access.

```json
{
  "dependencies": {
    "sharp": "^0.33.x"
  }
}
```

Note: `sharp` requires platform-specific binaries. Vercel's build
environment handles this without configuration; local dev on macOS
ARM also works out of the box. CI environments may need explicit
target hints — document if needed.

### Files to touch

#### `lib/upload/processing.ts` — new

Pure image-processing helper. Takes a `File` (or Buffer + filename),
returns a Buffer ready for upload.

```ts
import sharp from "sharp"

export type ProcessedImage = {
  buffer: Buffer
  contentType: "image/webp"
  originalSize: number
  processedSize: number
  width: number
  height: number
}

export async function processImageForUpload(
  input: Buffer | File,
  options?: {
    maxWidth?: number       // default 2400
    quality?: number        // default 85
  },
): Promise<ProcessedImage>
```

Pipeline inside:

1. Read the input into a sharp pipeline
2. `.rotate()` — honour EXIF orientation tag BEFORE stripping (so
   portrait photos aren't accidentally sideways)
3. `.resize(maxWidth, null, { withoutEnlargement: true })` — only
   downsample, never upscale; preserve aspect ratio
4. `.withMetadata(false)` — strip EXIF / GPS / colour profiles
5. `.webp({ quality: 85 })` — convert to WebP
6. `.toBuffer()` + metadata

Return the buffer, content type (`image/webp`), and the metrics for
the API response. Original size + processed size is useful for
debugging.

#### `app/api/admin/upload/route.ts` — modify

The existing v1 endpoint receives the file and uploads to Supabase
Storage. Change behaviour:

1. Receive the file as multipart (unchanged)
2. Pass to `processImageForUpload()` — get back the WebP buffer
3. Upload the WebP buffer to Supabase Storage with content type
   `image/webp` and a `.webp` extension on the storage key

Storage key convention stays the same shape:
`[listing_id]/[slot]/[uuid].webp` — always `.webp` now since v2
converts everything.

Response payload adds the processing metrics so the admin UI can
show "Original 4.2 MB → 287 KB" briefly after upload:

```json
{
  "ok": true,
  "url": "...",
  "original_size": 4200000,
  "processed_size": 287000,
  "width": 2400,
  "height": 1600
}
```

#### Admin upload UI — minor

Show the original-vs-processed size briefly in the upload result
panel (it's a small thing but it makes the optimisation visible —
useful when operators send 10 MB phone photos and you want to know
the storage hit was kept reasonable).

### Validation

The existing 10 MB upload-size limit becomes a *pre-processing* limit
(reject before reading into sharp to avoid OOM on absurdly large
inputs). Post-processing, files will always be well under 1 MB.

Reject unsupported types (HEIC, GIF, SVG) — sharp can decode some of
these but for our editorial use, JPG/PNG/WebP/AVIF input only.
Return 400 with a clear error.

## Part B — hide contact details from public listing pages

### Why

Three database fields — `contact_name`, `contact_email`,
`contact_phone` — are legacy directory carry-overs. They render on
the public listing detail page as a contact card. Editorial decision:

- Visitors should enquire through Safari Overland (the planning
  service / Calendly), not the operator directly.
- The operator's website link is sufficient for visitors who want to
  research further before sending a brief.
- The founder profile stays — it's the human anchor of the listing,
  not a contact card.

### Files to touch

#### `app/listings/[id]/page.tsx` and any shared detail components

Find every render of `contact_name`, `contact_email`,
`contact_phone`. Remove from the public render.

Likely candidates based on prior conversation:

- `app/listings/[id]/page.tsx` (the public detail page itself)
- `components/editorial/listing-detail.tsx` or similar shared
  rendering component
- Any listing-card preview that renders contact info

Grep target before editing:

```bash
rg "contact_name|contact_email|contact_phone" --type tsx --type ts \
  app/ components/
```

Walk the results, remove from public-facing surfaces only.

#### Keep these surfaces unchanged

- The admin edit form (`app/admin/listings/edit/[id]/page.tsx`) —
  keeps the contact fields so Niels can use them for outreach and
  internal record-keeping
- The admin preview route (`/admin/listings/preview/[id]`) — should
  match the public render exactly (no contact details visible),
  since the point of preview is to see what visitors will see
- The database schema — no migration needed; fields stay, just
  unrendered publicly

#### Verify website + founder profile still render

- `website` — keep as a small linked entry in the listing meta column
  or wherever it currently sits
- `founder_name`, `founder_note`, `founder_image_url` — keep in
  their italic-blockquote treatment; no change

## Tests

- Unit tests for `processImageForUpload`:
  - JPEG input → WebP output, correct content type, reduced size
  - PNG input → WebP output
  - Portrait orientation EXIF → output rendered correctly oriented
  - GPS EXIF data → not present in output metadata
  - 10000×10000 input → resized to 2400 max dimension
  - 1000×800 input → not upscaled, stays at 1000×800
- Integration test for the API route: upload a 5 MB JPEG, assert
  response includes the WebP URL with processed_size < original_size
- Component test: render the public listing detail with a row that
  has contact_name / contact_phone / contact_email populated — assert
  none of them appear in the rendered output, while website and
  founder fields do appear

## Verify (end-to-end)

1. Upload a 5 MB JPEG with GPS EXIF data to a listing's hero slot:
   - Response shows original_size and processed_size — processed
     should be well under 500 KB
   - The stored file in Supabase has `.webp` extension
   - Running `exiftool` (or similar) against the stored file shows
     no GPS or camera-serial data
2. Upload a portrait photo (taken on a phone, EXIF rotation = 6):
   - The processed image renders right-way-up everywhere (admin
     thumbnail, preview, public listing)
3. Open `/listings/[id]` for any approved listing — no contact name,
   phone, or email visible. Website link present. Founder block
   present.
4. Open `/admin/listings/preview/[id]` for the same listing — matches
   the public render (no contact details).
5. Open `/admin/listings/edit/[id]` — contact fields still editable
   in the form (admin-only retention).

## Out of scope — explicitly deferred

These were also discussed as part of the original "image v1 deferred
work" list. Calling out which we're tackling here and which we're
not.

**In this brief:**

- Server-side resize → ✓ Part A
- EXIF stripping → ✓ Part A
- WebP conversion → ✓ Part A

**Deferred again (separate briefs when needed):**

- **Multi-resolution variants stored upfront.** Vercel's image
  optimizer generates responsive sizes on demand from the source.
  Pre-generating fixed sizes (300/600/1200) doesn't add value — would
  cost more storage for no measurable speed gain. Skip.

- **Media library view** in admin for browsing all uploaded images
  across listings. Operational nice-to-have, not blocking. Worth a
  small separate brief when the image collection is large enough
  (~50+ uploaded photos) that you actually want to search across them.

- **Operator self-upload via magic links.** Interesting feature —
  send an operator a one-click link they use to upload their photos
  directly. Premature; we don't yet know what shape operators want.
  Revisit after a few outreach cycles when we see the pattern.

- **Big-bang migration of existing pasted URLs from the seed CSV.**
  Not necessary. Existing URLs work; when a listing is editorially
  reviewed, its images get re-uploaded via the v2 pipeline as part of
  the normal editorial pass. No script needed.

## Done means

- `sharp` installed; `lib/upload/processing.ts` ships with the
  documented signature and tests
- Upload endpoint runs every file through processing; storage objects
  are `.webp`, lean, and EXIF-free
- Admin upload UI shows the original-vs-processed size briefly
- Public listing pages do not render `contact_name`,
  `contact_email`, or `contact_phone`
- Website link and founder profile still render publicly
- Admin edit form still shows contact fields for internal use
- Tests pass
- PR description references this brief
