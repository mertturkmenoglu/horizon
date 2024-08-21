DROP TYPE IF EXISTS PriceUnit;

DROP TYPE IF EXISTS WorkTimespan;

DROP TABLE IF EXISTS hservices CASCADE;

DROP INDEX IF EXISTS idx_hservices_user CASCADE;

DROP INDEX IF EXISTS idx_hservices_title CASCADE;

DROP INDEX IF EXISTS idx_hservices_category CASCADE;

DROP TRIGGER IF EXISTS update_hservices_timestamp;