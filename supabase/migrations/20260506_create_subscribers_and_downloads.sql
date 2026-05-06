-- Subscribers + download tracking for the email-gated download workflow.
-- Captured on first download request and reused on subsequent downloads.

CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  travel_timeline TEXT,
  region_interest TEXT,
  marketing_consent BOOLEAN NOT NULL DEFAULT TRUE,
  consent_ts TIMESTAMP WITH TIME ZONE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  source_resource TEXT,
  source_url TEXT,
  utm JSONB,
  download_count INT NOT NULL DEFAULT 0,
  last_download_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS subscribers_email_idx ON subscribers (LOWER(email));
CREATE INDEX IF NOT EXISTS subscribers_created_at_idx ON subscribers (created_at DESC);

DROP TRIGGER IF EXISTS update_subscribers_updated_at ON subscribers;
CREATE TRIGGER update_subscribers_updated_at
BEFORE UPDATE ON subscribers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS download_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscriber_id UUID NOT NULL REFERENCES subscribers(id) ON DELETE CASCADE,
  resource_slug TEXT NOT NULL,
  user_agent TEXT,
  ip_country TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS download_events_subscriber_idx ON download_events (subscriber_id);
CREATE INDEX IF NOT EXISTS download_events_resource_idx ON download_events (resource_slug);
CREATE INDEX IF NOT EXISTS download_events_created_at_idx ON download_events (created_at DESC);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_events ENABLE ROW LEVEL SECURITY;

-- Service role (used by API routes) bypasses RLS by default; no anon policies.
-- Admins can be granted access via a separate policy when admin auth is wired up.
