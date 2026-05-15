-- ============================================================================
-- Trip Designer — publish workflow + snapshots
--
-- Phase 5 adds:
--   - itinerary_snapshots — immutable copy of an itinerary at publish
--     time. The public /trips/[slug] route reads from here, NOT from
--     the live itinerary tables, so post-publish edits to the
--     itinerary don't leak through to the customer's view.
--   - A slug index on itineraries (slug column already exists from
--     20260516 but had no index on it).
--
-- Snapshots are append-only — re-publishing creates a new snapshot
-- with the same slug, and the public route always selects the latest.
-- A `current` flag plus a partial unique index keeps "the snapshot a
-- customer is currently linked to" addressable without a JOIN.
-- ============================================================================

CREATE TABLE IF NOT EXISTS itinerary_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_id UUID NOT NULL REFERENCES itineraries(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,                              -- copies itineraries.slug at publish time
  reference TEXT NOT NULL,                         -- copied for indexing / display
  data JSONB NOT NULL,                             -- full itinerary + chapters + transits payload

  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_by TEXT,                               -- admin username from middleware

  -- Exactly one "current" snapshot per slug — that's what the public
  -- route serves. Older snapshots remain for audit / rollback.
  is_current BOOLEAN NOT NULL DEFAULT TRUE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS itinerary_snapshots_itinerary_id_idx
  ON itinerary_snapshots(itinerary_id);

CREATE INDEX IF NOT EXISTS itinerary_snapshots_slug_idx
  ON itinerary_snapshots(slug);

-- "Current snapshot per slug" — partial unique index. Re-publishing
-- flips the previous current snapshot to is_current=false in the same
-- transaction, then inserts the new one with is_current=true.
CREATE UNIQUE INDEX IF NOT EXISTS itinerary_snapshots_current_per_slug_idx
  ON itinerary_snapshots(slug) WHERE is_current = TRUE;

-- Public read policy — anyone can SELECT current snapshots. This is
-- how /trips/[slug] works without auth. No INSERT/UPDATE/DELETE policy
-- — those go through the service role from admin endpoints.
ALTER TABLE itinerary_snapshots ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public can read current snapshots" ON itinerary_snapshots;
CREATE POLICY "public can read current snapshots"
  ON itinerary_snapshots FOR SELECT
  USING (is_current = TRUE);

-- Index slug on the live itineraries table too — public route may
-- need to look up the itinerary by slug for analytics/cross-reference.
CREATE INDEX IF NOT EXISTS itineraries_slug_idx ON itineraries(slug);
