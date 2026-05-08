-- ============================================================================
-- Articles + app_settings — supporting tables for the admin section.
--
-- articles      — for /admin/articles (currently mock-only). Drives long-form
--                 Field Notes content beyond the file-based MDX guides under
--                 app/resources/. Use this when content is dynamic enough to
--                 want a write surface in the admin UI.
-- app_settings  — single-row key/value store for /admin/settings.
--                 Trivial schema; the value is meant to be read at request
--                 time by the consumers (listing flow, email flow).
-- ============================================================================

-- ── articles ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS articles (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  category     TEXT,           -- planning | safety | conservation | seasonal | travellers | …
  status       TEXT NOT NULL DEFAULT 'draft'
                 CHECK (status IN ('draft','published','archived')),
  hero_image   TEXT,
  excerpt      TEXT,           -- shown in cards / lists
  body_md      TEXT,           -- long-form markdown (or rich-text JSON later)
  read_minutes SMALLINT,
  author_name  TEXT,
  related_listing_ids UUID[],  -- soft references to directory_listings.id
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS articles_status_idx ON articles (status);
CREATE INDEX IF NOT EXISTS articles_category_idx ON articles (category);
CREATE INDEX IF NOT EXISTS articles_published_at_idx
  ON articles (published_at DESC NULLS LAST)
  WHERE status = 'published';

DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON articles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anyone can read published articles" ON articles;
CREATE POLICY "anyone can read published articles"
  ON articles FOR SELECT
  USING (status = 'published');

-- ── app_settings ───────────────────────────────────────────────────────────
-- Single-row table. Use the well-known id 'global' for the active settings
-- row. Avoid storing secrets here — those belong in environment variables.

CREATE TABLE IF NOT EXISTS app_settings (
  id                       TEXT PRIMARY KEY DEFAULT 'global',
  site_name                TEXT,
  site_description         TEXT,
  maintenance_mode         BOOLEAN NOT NULL DEFAULT FALSE,
  auto_approve_listings    BOOLEAN NOT NULL DEFAULT FALSE,
  allow_user_reviews       BOOLEAN NOT NULL DEFAULT FALSE,
  show_featured_on_home    BOOLEAN NOT NULL DEFAULT TRUE,
  listings_per_page        SMALLINT NOT NULL DEFAULT 12,
  notification_email       TEXT,
  notify_admin_on_new      BOOLEAN NOT NULL DEFAULT TRUE,
  notify_user_on_approval  BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT app_settings_singleton CHECK (id = 'global')
);

INSERT INTO app_settings (id) VALUES ('global')
ON CONFLICT (id) DO NOTHING;

DROP TRIGGER IF EXISTS update_app_settings_updated_at ON app_settings;
CREATE TRIGGER update_app_settings_updated_at
BEFORE UPDATE ON app_settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anyone can read app_settings" ON app_settings;
CREATE POLICY "anyone can read app_settings"
  ON app_settings FOR SELECT
  USING (true);
-- Writes only via service role key (server). No public update policy.
