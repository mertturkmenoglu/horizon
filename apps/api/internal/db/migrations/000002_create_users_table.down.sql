DROP TABLE IF EXISTS users CASCADE;

DROP INDEX IF EXISTS idx_users_email;

DROP INDEX IF EXISTS idx_users_username;

DROP INDEX IF EXISTS idx_users_google_id;

DROP TRIGGER IF EXISTS update_users_timestamp;