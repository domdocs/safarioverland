-- ============================================================================
-- Trip Designer — itineraries, chapters, transits + reference sequence
--
-- Three top-level tables:
--   - itineraries — master record (trip metadata, theme, practicals, audit)
--   - itinerary_chapters — one per destination
--   - itinerary_transits — between adjacent chapters (chapters - 1)
--
-- Plus a per-year reference sequence so SO-2026-NNNN minting is atomic
-- and reusable across years.
--
-- The `update_updated_at_column` trigger function is shared with the rest
-- of the schema (defined in 20260508). We just register new triggers
-- against it here.
-- ============================================================================

-- Itinerary master table
CREATE TABLE IF NOT EXISTS itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE,                                  -- minted on first publish; nullable until then
  reference TEXT UNIQUE NOT NULL,                    -- e.g. SO-2026-0001
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'archived')),

  -- Trip metadata (denormalised; design uses these directly)
  title TEXT NOT NULL,
  cover_title_lines TEXT[] NOT NULL DEFAULT '{}',    -- 1..4 lines for the cover display
  subtitle TEXT,
  guests TEXT[] NOT NULL DEFAULT '{}',               -- 1..6 names; joined with " & " on render
  dates_from TEXT,                                   -- "14 September"
  dates_to TEXT,                                     -- "24 September"
  dates_year TEXT,                                   -- "2026"
  pace TEXT,
  curator_name TEXT,
  curator_title TEXT DEFAULT 'Curator, Safari Overland',
  curator_location TEXT DEFAULT 'Victoria Falls, Zimbabwe',
  prologue TEXT[] NOT NULL DEFAULT '{}',             -- ordered paragraphs

  -- Cover photo
  cover_photo_url TEXT,

  -- Theme (locked to defaults for v1; columns exist for future use)
  palette TEXT NOT NULL DEFAULT 'savanna' CHECK (palette IN ('savanna', 'forest', 'coast')),
  typography TEXT NOT NULL DEFAULT 'editorial' CHECK (typography IN ('editorial', 'modern', 'classic')),
  density TEXT NOT NULL DEFAULT 'spacious' CHECK (density IN ('spacious', 'compact')),
  show_curator_notes BOOLEAN NOT NULL DEFAULT TRUE,

  -- Optional linkage to a brief
  source_brief_id UUID REFERENCES briefs(id) ON DELETE SET NULL,

  -- Practicals (JSONB array of cards; see SCHEMA.md §4)
  practicals JSONB NOT NULL DEFAULT '[]',

  -- Audit
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT                                    -- admin username from middleware
);

CREATE INDEX IF NOT EXISTS itineraries_status_idx ON itineraries(status);
CREATE INDEX IF NOT EXISTS itineraries_created_at_idx ON itineraries(created_at DESC);
CREATE INDEX IF NOT EXISTS itineraries_reference_idx ON itineraries(reference);

-- Per-year reference sequence (so 2026 starts at SO-2026-0001, 2027 starts at SO-2027-0001)
CREATE TABLE IF NOT EXISTS itinerary_reference_sequences (
  year INTEGER PRIMARY KEY,
  next_value INTEGER NOT NULL DEFAULT 1
);

-- Atomic per-year sequence increment. Returns the value just claimed
-- (1, 2, 3, ...). UPSERT pattern keeps this transactional even under
-- concurrent creates.
CREATE OR REPLACE FUNCTION mint_reference_for_year(year_in INTEGER)
RETURNS INTEGER AS $$
DECLARE
  v_next INTEGER;
BEGIN
  INSERT INTO itinerary_reference_sequences (year, next_value)
  VALUES (year_in, 2)
  ON CONFLICT (year) DO UPDATE
  SET next_value = itinerary_reference_sequences.next_value + 1
  RETURNING next_value - 1 INTO v_next;

  RETURN v_next;
END;
$$ LANGUAGE plpgsql;

-- Chapter table
CREATE TABLE IF NOT EXISTS itinerary_chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_id UUID NOT NULL REFERENCES itineraries(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,                         -- 0-indexed; roman numeral derived from this+1
  slug TEXT NOT NULL,                                -- url-safe within trip; e.g. "victoria-falls"

  place TEXT NOT NULL,
  country TEXT NOT NULL,
  coords_lat NUMERIC(8,5),
  coords_lon NUMERIC(8,5),
  nights INTEGER NOT NULL DEFAULT 1 CHECK (nights BETWEEN 1 AND 14),
  dates TEXT NOT NULL DEFAULT '',
  palette TEXT,                                      -- atmospheric tag ("spray", "delta") — informational
  epigraph TEXT NOT NULL DEFAULT '',

  intro TEXT[] NOT NULL DEFAULT '{}',                -- ordered paragraphs
  seeing TEXT[] NOT NULL DEFAULT '{}',
  note TEXT,                                         -- curator's handwritten note

  -- Lodge (JSONB for flexibility on amenities array)
  lodge JSONB NOT NULL DEFAULT '{}',                 -- { name, kind, room, blurb, amenities[] }

  -- Rhythm timeline (JSONB array)
  rhythm JSONB NOT NULL DEFAULT '[]',                -- [{ time, title, body }, ...]

  -- Photos
  photo_hero_url TEXT,
  photo_lodge_url TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (itinerary_id, position),
  UNIQUE (itinerary_id, slug)
);

CREATE INDEX IF NOT EXISTS itinerary_chapters_itinerary_id_idx ON itinerary_chapters(itinerary_id);

-- Transit table
CREATE TABLE IF NOT EXISTS itinerary_transits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_id UUID NOT NULL REFERENCES itineraries(id) ON DELETE CASCADE,
  from_chapter_id UUID NOT NULL REFERENCES itinerary_chapters(id) ON DELETE CASCADE,
  to_chapter_id UUID NOT NULL REFERENCES itinerary_chapters(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,                         -- matches position of from_chapter

  mode TEXT NOT NULL DEFAULT 'Transfer',
  duration TEXT NOT NULL DEFAULT 'TBD',
  distance TEXT NOT NULL DEFAULT 'TBD',
  crosses TEXT NOT NULL DEFAULT 'TBD',
  note TEXT NOT NULL DEFAULT 'To be specified.',

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (itinerary_id, position),
  CHECK (from_chapter_id != to_chapter_id)
);

CREATE INDEX IF NOT EXISTS itinerary_transits_itinerary_id_idx ON itinerary_transits(itinerary_id);

-- updated_at trigger (reuses existing helper from previous migrations)
DROP TRIGGER IF EXISTS update_itineraries_updated_at ON itineraries;
CREATE TRIGGER update_itineraries_updated_at
  BEFORE UPDATE ON itineraries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_itinerary_chapters_updated_at ON itinerary_chapters;
CREATE TRIGGER update_itinerary_chapters_updated_at
  BEFORE UPDATE ON itinerary_chapters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_itinerary_transits_updated_at ON itinerary_transits;
CREATE TRIGGER update_itinerary_transits_updated_at
  BEFORE UPDATE ON itinerary_transits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (admin only via service role — no public read for v1)
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_transits ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_reference_sequences ENABLE ROW LEVEL SECURITY;

-- No public policies; service role bypasses RLS so admin operations work.
