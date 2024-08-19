CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  hservice_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Foreign keys

ALTER TABLE
  favorites
ADD
  CONSTRAINT fk_favorites_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE
  favorites
ADD
  CONSTRAINT fk_favorites_hservice FOREIGN KEY (hservice_id) REFERENCES hservices(id) ON DELETE CASCADE;

-- Create indexes

CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);

CREATE UNIQUE INDEX IF NOT EXISTS idx_favorites_unique ON favorites(user_id, hservice_id);
