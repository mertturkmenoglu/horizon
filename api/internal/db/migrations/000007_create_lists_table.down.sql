DROP TABLE IF EXISTS lists;

DROP TABLE IF EXISTS list_items;

DROP INDEX IF EXISTS idx_lists_user;

DROP INDEX IF EXISTS idx_list_items_list;

DROP INDEX IF EXISTS idx_list_items_hservice;

DROP TRIGGER IF EXISTS update_lists_timestamp;
