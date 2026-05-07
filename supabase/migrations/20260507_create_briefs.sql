-- Trip Builder briefs — multi-step form submissions from /plan.
-- Public can insert; only the service role (used by admin views) can read.

CREATE TABLE IF NOT EXISTS briefs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

  -- Brief content
  chapters TEXT[] NOT NULL DEFAULT '{}',     -- ['East', 'Southern']
  rhythm TEXT,                                -- 'Walking-led'
  months TEXT[] NOT NULL DEFAULT '{}',       -- ['May','Jun','Jul']
  nights INT,
  travelers INT,
  budget_per_person TEXT,                    -- '$5k–$10k', '$10k–$20k', etc.
  notes TEXT,

  -- Contact
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,

  -- Triage
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'reviewing', 'sent', 'closed')),
  assigned_to TEXT,                          -- admin email; FK to profiles dropped for v1
  internal_notes TEXT,

  -- Source / attribution
  source_url TEXT,
  utm JSONB
);

CREATE INDEX IF NOT EXISTS briefs_created_at_idx ON briefs (created_at DESC);
CREATE INDEX IF NOT EXISTS briefs_status_idx ON briefs (status);
CREATE INDEX IF NOT EXISTS briefs_email_idx ON briefs (LOWER(contact_email));

DROP TRIGGER IF EXISTS update_briefs_updated_at ON briefs;
CREATE TRIGGER update_briefs_updated_at
BEFORE UPDATE ON briefs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE briefs ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a brief from the public site.
DROP POLICY IF EXISTS "anyone can submit a brief" ON briefs;
CREATE POLICY "anyone can submit a brief"
  ON briefs FOR INSERT
  WITH CHECK (true);

-- No public SELECT/UPDATE/DELETE policy.
-- Admin views use the service-role key, which bypasses RLS.
-- When admin auth lands, replace with a role-claim-based policy:
--   CREATE POLICY "admins read briefs"
--     ON briefs FOR SELECT
--     USING (auth.jwt() ->> 'role' = 'admin');
