CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  hservice_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Foreign keys

ALTER TABLE
  bookmarks
ADD 
  CONSTRAINT fk_bookmarks_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE
  bookmarks
ADD
  CONSTRAINT fk_bookmarks_hservice FOREIGN KEY (hservice_id) REFERENCES hservices(id) ON DELETE CASCADE;

-- Create indexes

CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id);

CREATE UNIQUE INDEX IF NOT EXISTS idx_bookmarks_unique ON bookmarks(user_id, hservice_id);
