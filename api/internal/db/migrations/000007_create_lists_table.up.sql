CREATE TABLE IF NOT EXISTS lists (
  id TEXT PRIMARY KEY,
  title VARCHAR(128) NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS list_items (
  id TEXT PRIMARY KEY,
  list_id TEXT NOT NULL,
  hservice_id TEXT NOT NULL,
  item_order INT NOT NULL
);

-- Add foreign keys
ALTER TABLE
  lists
ADD
  CONSTRAINT fk_lists_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE
  list_items
ADD
  CONSTRAINT fk_list_items_list FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE;

ALTER TABLE
  list_items
ADD
  CONSTRAINT fk_list_items_hservice FOREIGN KEY (hservice_id) REFERENCES hservices(id) ON DELETE CASCADE;

-- Create indexes

CREATE INDEX IF NOT EXISTS idx_lists_user ON lists(user_id);

CREATE INDEX IF NOT EXISTS idx_list_items_list ON list_items(list_id);

CREATE INDEX IF NOT EXISTS idx_list_items_hservice ON list_items(hservice_id);

-- Trigger to update the updated_at field automatically
CREATE OR REPLACE TRIGGER update_lists_timestamp BEFORE
UPDATE
  ON lists FOR EACH ROW EXECUTE FUNCTION update_timestamp();
