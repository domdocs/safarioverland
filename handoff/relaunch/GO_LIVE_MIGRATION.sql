-- Paste this whole block into the Supabase SQL editor for project
-- ufraczrwltunvdkgaeeb and press Run. Safe to run more than once.
-- Same changes as supabase/migrations/20261109_briefs_self_drive_fields.sql,
-- with the budget_tier constraint dropped by definition rather than by name.

BEGIN;

-- 1. Self-drive brief answers
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

-- 2. Allow budget_tier = 'discuss' (live bug: those briefs failed to save).
--    Drop every CHECK on briefs that restricts budget_tier, whatever its name.
DO $$
DECLARE c record;
BEGIN
  FOR c IN
    SELECT conname FROM pg_constraint
    WHERE conrelid = 'briefs'::regclass AND contype = 'c'
      AND pg_get_constraintdef(oid) ILIKE '%budget_tier%'
  LOOP
    EXECUTE format('ALTER TABLE briefs DROP CONSTRAINT %I', c.conname);
  END LOOP;
END $$;

ALTER TABLE briefs ADD CONSTRAINT briefs_budget_tier_check
  CHECK (budget_tier IS NULL
    OR budget_tier IN ('budget', 'mid', 'luxury', 'exclusive', 'discuss'));

-- 3. Cookie-free ad click capture
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

-- 4. Record the migration so `supabase db push` won't try to apply it again.
DO $$
BEGIN
  IF to_regclass('supabase_migrations.schema_migrations') IS NOT NULL THEN
    INSERT INTO supabase_migrations.schema_migrations (version, name)
    VALUES ('20261109', 'briefs_self_drive_fields')
    ON CONFLICT (version) DO NOTHING;
  END IF;
END $$;

COMMIT;

-- 5. Check: should list the new columns and the budget_tier rule with 'discuss'.
SELECT column_name FROM information_schema.columns
WHERE table_name = 'briefs'
  AND column_name IN ('drive_experience', 'drive_hours', 'countries', 'gclid', 'utm_source', 'click_captured_at')
UNION ALL
SELECT pg_get_constraintdef(oid) FROM pg_constraint
WHERE conrelid = 'briefs'::regclass AND conname = 'briefs_budget_tier_check';
