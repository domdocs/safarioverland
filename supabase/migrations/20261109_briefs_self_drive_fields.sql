-- ============================================================================
-- Self-drive intake fields for `briefs`.
--
-- Background: the self-drive relaunch adds three questions to /plan, after
-- "The rhythm":
--   1. Have you driven in Africa before?        → drive_experience
--   2. How long are you happy to drive in a day? → drive_hours
--   3. Where are you drawn to? (multi-select)    → countries
--
-- Values mirror DRIVE_EXPERIENCE_OPTIONS, DRIVE_HOURS_OPTIONS and
-- COUNTRY_OPTIONS in lib/briefs/options.ts. Labels can change freely;
-- values cannot without a new migration.
--
-- Backward compatibility:
--   - All three columns are nullable. Existing rows keep NULL.
--   - /api/briefs/submit only sends these fields when they have values,
--     and retries without them if the columns are missing (Postgres 42703),
--     so code can deploy before this migration is pushed.
-- ============================================================================

ALTER TABLE briefs
  ADD COLUMN IF NOT EXISTS drive_experience TEXT
    CHECK (drive_experience IS NULL
      OR drive_experience IN ('never', 'once-or-twice', 'often')),
  ADD COLUMN IF NOT EXISTS drive_hours TEXT
    CHECK (drive_hours IS NULL
      OR drive_hours IN ('under-3h', '3-5h', '5h-plus')),
  ADD COLUMN IF NOT EXISTS countries TEXT[]
    CHECK (countries IS NULL
      OR countries <@ ARRAY[
        'zimbabwe', 'namibia', 'botswana', 'zambia', 'south-africa', 'unsure'
      ]::TEXT[]);

-- ----------------------------------------------------------------------------
-- Fix: allow budget_tier = 'discuss'.
--
-- The 20260513 CHECK permits only budget/mid/luxury/exclusive, but the /plan
-- form and the submit API have always offered 'discuss' ("I'd rather discuss
-- this on a call") and write it straight through. Any brief choosing it
-- would fail the constraint. 'briefs_budget_tier_check' is the name Postgres
-- gives an inline column CHECK; verify on the remote before pushing with:
--   SELECT conname FROM pg_constraint
--   WHERE conrelid = 'briefs'::regclass AND contype = 'c';
-- ----------------------------------------------------------------------------
ALTER TABLE briefs DROP CONSTRAINT IF EXISTS briefs_budget_tier_check;
ALTER TABLE briefs ADD CONSTRAINT briefs_budget_tier_check
  CHECK (budget_tier IS NULL
    OR budget_tier IN ('budget', 'mid', 'luxury', 'exclusive', 'discuss'));

-- ----------------------------------------------------------------------------
-- Ad click attribution for Google Ads offline conversion import.
--
-- Captured cookie-free in the browser (localStorage, see
-- lib/analytics/click-ids.ts) from the landing URL and sent with the brief:
--   gclid / gbraid / wbraid — Google Ads click IDs (last ad click)
--   utm_*                   — campaign parameters (first touch)
--   click_captured_at       — when the click ID (or first touch) was captured
-- Briefs with a gclid are exported weekly and uploaded to Google Ads as the
-- "Brief submitted" conversion (handoff/ANALYTICS.md).
--
-- All nullable, no constraints: values are length-capped by the submit API,
-- which also only sends them when present and retries without them if the
-- columns are missing. The older `utm` JSONB column stays as it was.
-- ----------------------------------------------------------------------------
ALTER TABLE briefs
  ADD COLUMN IF NOT EXISTS gclid TEXT,
  ADD COLUMN IF NOT EXISTS gbraid TEXT,
  ADD COLUMN IF NOT EXISTS wbraid TEXT,
  ADD COLUMN IF NOT EXISTS utm_source TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS utm_term TEXT,
  ADD COLUMN IF NOT EXISTS utm_content TEXT,
  ADD COLUMN IF NOT EXISTS click_captured_at TIMESTAMPTZ;
