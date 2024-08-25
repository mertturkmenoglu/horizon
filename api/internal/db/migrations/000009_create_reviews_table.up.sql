CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  hservice_id TEXT NOT NULL,
  rating SMALLINT NOT NULL,
  comment TEXT NOT NULL,
  media JSONB,
  like_count INT NOT NULL DEFAULT 0,
  dislike_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add foreign keys
ALTER TABLE
  reviews
ADD
  CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE
  reviews
ADD
  CONSTRAINT fk_reviews_hservice FOREIGN KEY (hservice_id) REFERENCES hservices(id) ON DELETE CASCADE;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_hservice ON reviews(hservice_id);

-- Triggers
CREATE OR REPLACE TRIGGER update_reviews_timestamp 
BEFORE UPDATE ON reviews 
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'reviewvotetype') THEN
    CREATE TYPE ReviewVoteType AS ENUM (
      'LIKE',
      'DISLIKE'
    );
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS reviews_votes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  review_id TEXT NOT NULL,
  vote_type ReviewVoteType NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add foreign keys
ALTER TABLE
  reviews_votes
ADD
  CONSTRAINT fk_reviews_votes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE
  reviews_votes
ADD
  CONSTRAINT fk_reviews_votes_review FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_reviews_votes_user ON reviews_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_votes_review ON reviews_votes(review_id);

-- Triggers
CREATE OR REPLACE FUNCTION update_reviews_counts() RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    IF (NEW.vote_type = 'LIKE') THEN
      UPDATE reviews SET like_count = like_count + 1 WHERE id = NEW.review_id;
    ELSE
      UPDATE reviews SET dislike_count = dislike_count + 1 WHERE id = NEW.review_id;
    END IF;
  ELSIF (TG_OP = 'DELETE') THEN
    IF (OLD.vote_type = 'LIKE') THEN
      UPDATE reviews SET like_count = like_count - 1 WHERE id = OLD.review_id;
    ELSE
      UPDATE reviews SET dislike_count = dislike_count - 1 WHERE id = OLD.review_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_reviews_counts_trigger
  AFTER INSERT OR DELETE ON reviews_votes
  FOR EACH ROW
EXECUTE PROCEDURE update_reviews_counts();
