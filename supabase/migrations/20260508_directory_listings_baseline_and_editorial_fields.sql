-- ============================================================================
-- Baseline + editorial extension for directory_listings.
--
-- Two jobs in one migration:
--   1. Bring the existing manually-created directory_listings table under
--      version control. The table was created in the Supabase dashboard and
--      seeded from public/directory_listings_rows.csv; this migration uses
--      IF NOT EXISTS / ADD COLUMN IF NOT EXISTS so it is safe to run against
--      either a virgin database or the existing production one.
--   2. Add the columns required to render richer listing detail pages — the
--      transformational/editorial layer plus external ratings, galleries,
--      and ownership stories. See handoff/BRAND_VOICE.md for the editorial
--      register these fields support, and handoff/LISTINGS_AUDIT.md for
--      the country-by-country curation workflow.
--
-- Deliberately NOT included:
--   - Numeric scoring rubric or curation_bucket enum. The cull is editorial
--     judgement: keep (status='approved') or cull (status='rejected').
--   - Audit metadata (audited_by, audited_at, photo_quality). Editor notes
--     captured as free text in `editor_notes` instead.
-- ============================================================================

-- ── Baseline. ──────────────────────────────────────────────────────────────
-- Mirrors the seed CSV (public/directory_listings_rows.csv) and the
-- lib/listings.ts DirectoryListing type. CREATE TABLE IF NOT EXISTS is a
-- no-op against the current production database.

CREATE TABLE IF NOT EXISTS directory_listings (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_name  TEXT NOT NULL,
  category      TEXT NOT NULL,
  region        TEXT NOT NULL,
  country       TEXT NOT NULL,
  location      TEXT NOT NULL,
  description   TEXT,
  contact_name  TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  website       TEXT,
  price_info    TEXT,
  featured      BOOLEAN NOT NULL DEFAULT FALSE,
  image_url     TEXT,
  status        TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending','approved','rejected')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS directory_listings_status_idx
  ON directory_listings (status);
CREATE INDEX IF NOT EXISTS directory_listings_category_idx
  ON directory_listings (category);
CREATE INDEX IF NOT EXISTS directory_listings_country_idx
  ON directory_listings (country);
CREATE INDEX IF NOT EXISTS directory_listings_featured_idx
  ON directory_listings (featured) WHERE featured = TRUE;

-- ── Editorial / transformational fields. ──────────────────────────────────
-- Drive richer rendering on /listings/[id]. All nullable so existing rows
-- continue to load. None are required at create time.

-- A one-sentence editorial verdict — the "we'd send this here" line that
-- opens the listing detail page. Kept short. Editorial voice.
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS verdict TEXT;

-- The single thing that makes this stay distinctive — "the walking guide,"
-- "the sundowner ritual," "the sleep-out platform." One paragraph max.
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS signature_experience TEXT;

-- What the operator does on conservation: anti-poaching levies, science
-- partnerships, lease payments to community trusts. Editorial paragraph.
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS conservation_summary TEXT;

-- What the operator does on community: local employment %, projects,
-- benefit-sharing arrangements. Editorial paragraph.
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS community_summary TEXT;

-- Wellness offerings on site. Free-form array — yoga, spa, sound-bath,
-- silent walks, gym, calisthenics, Hammam, etc.
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS wellness_offerings TEXT[];

-- What's actually offered: walking safari, mokoro, night drive, balloon,
-- horseback, mountain bike, sundowner, sleep-out. Free-form array.
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS activities TEXT[];

-- Owner / founder story (Singita-style). Surfaces as italic blockquote.
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS founder_name TEXT;
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS founder_note TEXT;
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS founder_image_url TEXT;

-- Traveller quotes, attributed. Renders as pull quotes.
-- Shape: [{ "quote": string, "attributed_to": string, "trip_year": number }]
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS traveller_quotes JSONB;

-- External ratings — gleaned from TripAdvisor, Google, Booking.com, etc.
-- Stored as a structured array so we can show "TripAdvisor 4.8 (n=412)
-- · Google 4.9 (n=287)" without coupling to one provider.
-- Shape: [{ "source": string, "rating": number, "max": number, "count": number, "url": string, "fetched_at": string }]
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS external_ratings JSONB;

-- Photography — operator-supplied gallery beyond image_url. Hero shots,
-- atmospheric photos. Used in the gallery block on listing detail.
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS gallery_urls TEXT[];

-- Practical detail useful for editorial framing.
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS max_guests INTEGER;
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS best_time_to_visit TEXT;
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS price_tier TEXT
    CHECK (price_tier IS NULL
      OR price_tier IN ('budget','mid','luxury','exclusive'));

-- Geographic precision — for a small map module on the listing page.
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS latitude  NUMERIC(9, 6);
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS longitude NUMERIC(9, 6);

-- Cross-references to Field Notes. Slugs of articles that mention or
-- feature this property. Surfaces as "Read more in our notes from …".
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS field_notes_slugs TEXT[];

-- Free-text editor notes. Internal — not shown publicly. Anywhere to
-- write "called Susan in March, founder retiring, son taking over" or
-- "fact-check the leopard sighting frequency next visit."
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS editor_notes TEXT;

-- ── updated_at trigger. ────────────────────────────────────────────────────
-- Reuses the helper function from earlier migrations.

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_directory_listings_updated_at ON directory_listings;
CREATE TRIGGER update_directory_listings_updated_at
BEFORE UPDATE ON directory_listings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── RLS. ───────────────────────────────────────────────────────────────────
-- Public read for approved rows; admin writes happen via the service-role
-- key from the server, which bypasses RLS.

ALTER TABLE directory_listings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anyone can read approved listings" ON directory_listings;
CREATE POLICY "anyone can read approved listings"
  ON directory_listings FOR SELECT
  USING (status = 'approved');

DROP POLICY IF EXISTS "anyone can submit a pending listing" ON directory_listings;
CREATE POLICY "anyone can submit a pending listing"
  ON directory_listings FOR INSERT
  WITH CHECK (status = 'pending');
