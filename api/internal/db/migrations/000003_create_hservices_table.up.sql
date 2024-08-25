DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'priceunit') THEN
    CREATE TYPE PriceUnit AS ENUM(
      'USD',
      'EUR',
      'JPY',
      'GBP',
      'AUD',
      'CAD',
      'CHF',
      'INR',
      'BRL',
      'CZK',
      'TRY'
    );
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'worktimespan') THEN
    CREATE TYPE WorkTimespan AS ENUM(
      'HOURLY',
      'DAILY',
      'WEEKLY',
      'MONTHLY',
      'YEARLY'
    );
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS hservices (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title VARCHAR(64) NOT NULL,
  slug VARCHAR(128) NOT NULL,
  description TEXT NOT NULL,
  category INT NOT NULL,
  price DOUBLE PRECISION NOT NULL,
  price_unit PriceUnit NOT NULL,
  price_timespan WorkTimespan NOT NULL,
  is_online BOOLEAN NOT NULL,
  url VARCHAR(128),
  location TEXT NOT NULL,
  delivery_time INT NOT NULL,
  delivery_timespan WorkTimespan NOT NULL,
  total_points BIGINT NOT NULL DEFAULT 0,
  total_votes INT NOT NULL DEFAULT 0,
  media JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add foreign keys
ALTER TABLE
  hservices
ADD
  CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Create indexes
CREATE INDEX idx_hservices_user ON hservices(user_id);

CREATE INDEX idx_hservices_title ON hservices(title);

CREATE INDEX idx_hservices_category ON hservices(category);

-- Trigger to update the updated_at field automatically
CREATE OR REPLACE TRIGGER update_hservices_timestamp BEFORE
UPDATE
  ON hservices FOR EACH ROW EXECUTE FUNCTION update_timestamp();