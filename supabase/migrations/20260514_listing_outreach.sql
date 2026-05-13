-- ============================================================================
-- Operator outreach tracking. One row per drafted/sent outreach attempt for a
-- listing. The brief proposed today's date (2026-05-13) but
-- 20260513_briefs_structured_fields.sql already occupies that slot, so this
-- runs the day after.
--
-- The `template` enum keeps room for `kept` / `culled` even though only the
-- `featured` template ships in this PR — keeps the schema forward-compatible
-- with the LISTINGS_AUDIT.md Template B / C work without a follow-up
-- migration.
-- ============================================================================

CREATE TABLE IF NOT EXISTS listing_outreach (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id      UUID NOT NULL
                  REFERENCES directory_listings(id) ON DELETE CASCADE,
  template        TEXT NOT NULL
                  CHECK (template IN ('featured', 'kept', 'culled')),
  recipient_email TEXT NOT NULL,
  recipient_name  TEXT,
  subject         TEXT NOT NULL,
  body_html       TEXT NOT NULL,
  custom_questions TEXT,   -- listing-specific clarifying questions, one per line
  sent_at         TIMESTAMPTZ,
  sent_via        TEXT
                  CHECK (sent_via IS NULL
                    OR sent_via IN ('mailto', 'resend', 'manual')),
  status          TEXT NOT NULL DEFAULT 'drafted'
                  CHECK (status IN ('drafted', 'sent', 'replied',
                                     'no_response', 'archived')),
  notes           TEXT,    -- free-text follow-up notes from the admin
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS listing_outreach_listing_id_idx
  ON listing_outreach (listing_id);
CREATE INDEX IF NOT EXISTS listing_outreach_status_idx
  ON listing_outreach (status);
CREATE INDEX IF NOT EXISTS listing_outreach_sent_at_idx
  ON listing_outreach (sent_at);

DROP TRIGGER IF EXISTS update_listing_outreach_updated_at ON listing_outreach;
CREATE TRIGGER update_listing_outreach_updated_at
BEFORE UPDATE ON listing_outreach
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS. No public read/write — admin endpoints write via the service-role
-- key which bypasses RLS, same pattern as `briefs` and `directory_listings`.
ALTER TABLE listing_outreach ENABLE ROW LEVEL SECURITY;
