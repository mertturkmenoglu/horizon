DROP TABLE IF EXISTS reviews;

DROP INDEX IF EXISTS idx_reviews_user;

DROP INDEX IF EXISTS idx_reviews_hservice;

DROP TRIGGER IF EXISTS update_reviews_timestamp;

DROP TYPE IF EXISTS ReviewVoteType;

DROP TABLE IF EXISTS reviews_votes;

DROP INDEX IF EXISTS idx_reviews_votes_user;

DROP INDEX IF EXISTS idx_reviews_votes_review;

DROP TRIGGER IF EXISTS update_reviews_counts_trigger;
