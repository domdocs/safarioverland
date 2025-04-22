-- Create contact_messages table for storing contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on the email column for faster lookups
CREATE INDEX IF NOT EXISTS contact_messages_email_idx ON contact_messages (email);

-- Create an index on the status column for filtering
CREATE INDEX IF NOT EXISTS contact_messages_status_idx ON contact_messages (status);

-- Create a function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to call the update_updated_at_column function
DROP TRIGGER IF EXISTS update_contact_messages_updated_at ON contact_messages;
CREATE TRIGGER update_contact_messages_updated_at
BEFORE UPDATE ON contact_messages
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Set up RLS (Row Level Security) policies
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Only allow authenticated users with admin role to see all messages
CREATE POLICY "Admin users can see all contact messages"
  ON contact_messages FOR SELECT
  USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

-- Only allow authenticated users with admin role to update messages
CREATE POLICY "Admin users can update contact messages"
  ON contact_messages FOR UPDATE
  USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

-- Allow the service role to insert messages from the contact form
CREATE POLICY "Service role can insert contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- Add comment to the table for documentation
COMMENT ON TABLE contact_messages IS 'Stores messages submitted via the contact form'; 