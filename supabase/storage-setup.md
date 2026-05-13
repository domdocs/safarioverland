# Supabase Storage setup — `listing-media` bucket

The image upload feature (`feature/image-upload-storage`) writes operator
photography into a single Supabase Storage bucket called `listing-media`.
Niels uploads via `/admin/listings/edit/[id]`; the API route uses the
service-role key so RLS is bypassed on writes. Reads are public so the
public listing pages can embed the URLs directly.

This file is the one-time setup checklist. The bucket itself has to be
created via Supabase Studio (the Supabase CLI isn't installed locally).
The storage-policy SQL can be pasted into the SQL editor in Studio.

---

## 1. Create the bucket

1. Open Supabase Studio → **Storage** → **Create a new bucket**
2. Name: **`listing-media`** (exact, lowercase, hyphen — the API route
   hardcodes this)
3. **Public bucket** — checked. Public-read URLs are stable and
   CDN-served; writes are still gated by the service-role key used by
   our API.
4. **Restrict file upload size** — `10 MB`. Phase 2 server-side resize
   will reduce this; for now it's the safety valve.
5. **Restrict allowed MIME types** — `image/jpeg`, `image/png`,
   `image/webp` (one per line, or comma-separated depending on Studio
   version)
6. Save.

## 2. Apply the storage policies

Paste the following into Supabase SQL editor and run. The bucket has to
exist before these policies will apply.

```sql
-- ── Public read for the listing-media bucket ──────────────────────────
-- Anyone can read; the public site embeds URLs from this bucket on the
-- listing detail pages.
DROP POLICY IF EXISTS "public can read listing media" ON storage.objects;
CREATE POLICY "public can read listing media"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'listing-media');

-- No INSERT/UPDATE/DELETE policies are defined here. The admin upload
-- API uses the service-role key which bypasses RLS, and we don't want
-- anonymous or anon-authenticated writes to this bucket.
```

After running, run the verification query to confirm the policy is in
place:

```sql
SELECT polname, polcmd
FROM pg_policy
WHERE polrelid = 'storage.objects'::regclass
  AND polname = 'public can read listing media';
-- expected: 1 row, polcmd='r' (SELECT)
```

## 3. Folder convention inside the bucket

The API writes objects under this layout:

```
listing-media/
  [listing_id]/
    hero/[uuid].[ext]
    gallery/[uuid].[ext]
    founder/[uuid].[ext]
```

Implication: deleting a listing later can scrub all its media in one
prefix-delete call (Phase 2 cleanup job).

## 4. Optional but recommended — image_attribution column

Apply migration `supabase/migrations/20260515_image_attribution.sql` to
add the `image_attribution JSONB` column on `directory_listings`. The
upload UI captures alt-text and "supplied by" per upload and writes
into this column.

The migration is idempotent (`ADD COLUMN IF NOT EXISTS`). Paste it in
the SQL editor and run.

## 5. Verification

End-to-end sanity check after setup:

1. Open `/admin/listings/edit/<any-id>` on the preview deployment.
2. Drag a JPEG (`<10 MB`) onto the **Hero image** zone.
3. The thumbnail appears, with a URL shown underneath that points at:
   `https://<project>.supabase.co/storage/v1/object/public/listing-media/<listing_id>/hero/<uuid>.jpg`
4. Open that URL in a separate browser tab — the image loads (public read).
5. Save the listing. Refresh — the thumbnail persists.

If step 3 fails with a 400 from the API, the most likely cause is the
bucket name (must be exactly `listing-media`) or the MIME restriction
not matching what the browser sent.
