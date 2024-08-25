CREATE TABLE IF NOT EXISTS admins (
  user_id TEXT PRIMARY KEY,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add foreign keys
ALTER TABLE
  admins
ADD
  CONSTRAINT fk_admins_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_admins_user ON admins(user_id);

-- Triggers
CREATE OR REPLACE TRIGGER update_admins_timestamp BEFORE
UPDATE
  ON admins 
  FOR EACH ROW 
EXECUTE FUNCTION update_timestamp();
