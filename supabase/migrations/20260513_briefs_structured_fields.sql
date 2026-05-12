-- ============================================================================
-- Structured intake fields for `briefs` + a `featured_rank` sort key on
-- `directory_listings`.
--
-- Background: the original `briefs` schema (20260507) only captures
-- chapters/months/rhythm/nights/budget/notes. Phase 2 of /plan expands the
-- intake to eight questions covering trip intent, rhythm pace, quiet
-- markers, wildlife priorities, duration, season, budget tier, plus an
-- optional source listing if the user arrived from a /listings/[id]
-- "Add to a brief" CTA.
--
-- Backward compatibility:
--   - The original columns (`chapters`, `rhythm`, `months`,
--     `budget_per_person`, `notes`, etc.) stay. Old admin views and any
--     pre-existing rows continue to render.
--   - The brief proposed reusing `rhythm` for a constrained
--     slow/mixed/active enum, but the existing column already holds free
--     text like "Walking-led". A new column `pace` carries the new
--     constraint instead, leaving the legacy column intact.
-- ============================================================================

-- ── briefs: structured intake fields ─────────────────────────────────────
ALTER TABLE briefs
  ADD COLUMN IF NOT EXISTS intent TEXT[],
  ADD COLUMN IF NOT EXISTS pace TEXT
    CHECK (pace IS NULL OR pace IN ('slow', 'mixed', 'active')),
  ADD COLUMN IF NOT EXISTS quiet_markers TEXT[],
  ADD COLUMN IF NOT EXISTS wildlife_priorities TEXT[],
  ADD COLUMN IF NOT EXISTS duration TEXT,
  ADD COLUMN IF NOT EXISTS season_preference TEXT,
  ADD COLUMN IF NOT EXISTS budget_tier TEXT
    CHECK (budget_tier IS NULL
      OR budget_tier IN ('budget', 'mid', 'luxury', 'exclusive')),
  ADD COLUMN IF NOT EXISTS source_listing_id UUID
    REFERENCES directory_listings(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS briefs_budget_tier_idx ON briefs (budget_tier);
CREATE INDEX IF NOT EXISTS briefs_pace_idx ON briefs (pace);
CREATE INDEX IF NOT EXISTS briefs_source_listing_idx
  ON briefs (source_listing_id) WHERE source_listing_id IS NOT NULL;

-- ── directory_listings: editorial sort key ──────────────────────────────
-- Smaller number = higher priority. NULL sorts last. Used by the shortlist
-- algorithm on /plan/sent to order featured matches before falling back to
-- updated_at.
ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS featured_rank INTEGER;

CREATE INDEX IF NOT EXISTS directory_listings_featured_rank_idx
  ON directory_listings (featured_rank) WHERE featured_rank IS NOT NULL;
