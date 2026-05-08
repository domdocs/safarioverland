-- ============================================================================
-- 20260511 — articles: relax legacy NOT NULL constraints.
--
-- The pre-existing articles table (from before 20260509) has a legacy
-- `content` column declared NOT NULL with no default. The new admin write
-- surface uses `body_md` instead, and nothing in the app reads `content`,
-- so inserts via PostgREST fail on the legacy constraint.
--
-- Fix: drop NOT NULL from `content` and give it a default of '' so existing
-- code paths that hit the column directly still work, while new inserts
-- that don't supply it succeed. The column itself is left in place to
-- avoid disturbing any historical rows.
-- ============================================================================

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'articles'
      AND column_name = 'content'
  ) THEN
    EXECUTE 'ALTER TABLE articles ALTER COLUMN content DROP NOT NULL';
    EXECUTE 'ALTER TABLE articles ALTER COLUMN content SET DEFAULT '''' ';
  END IF;
END $$;

-- Also relax any other legacy non-default NOT NULL text columns on articles
-- that aren't in our new schema. (Currently just `author` — defensive only.)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'articles'
      AND column_name = 'author'
      AND is_nullable = 'NO'
  ) THEN
    EXECUTE 'ALTER TABLE articles ALTER COLUMN author DROP NOT NULL';
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';
