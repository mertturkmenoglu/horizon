CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email VARCHAR (128) UNIQUE NOT NULL,
  username VARCHAR (32) UNIQUE NOT NULL,
  full_name VARCHAR (128) NOT NULL,
  password_hash VARCHAR (255),
  google_id VARCHAR(64) UNIQUE,
  is_email_verified BOOLEAN DEFAULT FALSE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  role VARCHAR(32) DEFAULT 'user' NOT NULL,
  password_reset_token VARCHAR(255),
  password_reset_expires TIMESTAMPTZ,
  login_attempts INT DEFAULT 0,
  lockout_until TIMESTAMPTZ,
  gender VARCHAR (32),
  profile_image VARCHAR (128),
  last_login TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

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

CREATE TYPE WorkTimespan AS ENUM(
  'HOURLY',
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'YEARLY'
);

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

CREATE TABLE IF NOT EXISTS countries (
  id INT PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  iso2 CHAR(2) NOT NULL,
  numeric_code VARCHAR(3) NOT NULL,
  phone_code VARCHAR(32) NOT NULL,
  capital VARCHAR(32) NOT NULL,
  currency CHAR(3) NOT NULL,
  currency_name VARCHAR(64) NOT NULL,
  currency_symbol VARCHAR(10) NOT NULL,
  tld CHAR(3) NOT NULL,
  native VARCHAR(64) NOT NULL,
  region VARCHAR(64) NOT NULL,
  subregion VARCHAR(64) NOT NULL,
  timezones TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL
);

CREATE TABLE IF NOT EXISTS states (
  id INT PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  country_id INT NOT NULL,
  country_code CHAR(2) NOT NULL,
  country_name VARCHAR(64) NOT NULL,
  state_code VARCHAR(16) NOT NULL,
  type VARCHAR(16),
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL
);

CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY,
  user_id TEXT NOT NULL,
  hservice_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY,
  user_id TEXT NOT NULL,
  hservice_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

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