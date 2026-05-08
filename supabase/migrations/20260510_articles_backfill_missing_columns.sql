-- ============================================================================
-- 20260510 — articles: backfill missing columns.
--
-- The 20260509 migration used CREATE TABLE IF NOT EXISTS, which is a no-op
-- if the table already exists. In this project the articles table existed
-- earlier with a stub schema (id, slug, title, category, status, published_at,
-- created_at, updated_at), so the editorial columns added in 20260509 were
-- silently skipped on apply.
--
-- This migration explicitly ADDs each editorial column with IF NOT EXISTS so
-- it is safe to re-run any time and self-heals partial state.
-- ============================================================================

ALTER TABLE articles ADD COLUMN IF NOT EXISTS hero_image          TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS excerpt             TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS body_md             TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS read_minutes        SMALLINT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS author_name         TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS related_listing_ids UUID[];

-- Defensive: ensure indexes from 20260509 exist (NOOP if already present).
CREATE INDEX IF NOT EXISTS articles_status_idx       ON articles (status);
CREATE INDEX IF NOT EXISTS articles_category_idx     ON articles (category);
CREATE INDEX IF NOT EXISTS articles_published_at_idx
  ON articles (published_at DESC NULLS LAST)
  WHERE status = 'published';

-- Force PostgREST to reload its schema cache so the new columns become
-- visible to the REST API immediately (otherwise inserts via PostgREST
-- fail with "Could not find the 'X' column ... in the schema cache" until
-- the next automatic reload).
NOTIFY pgrst, 'reload schema';
