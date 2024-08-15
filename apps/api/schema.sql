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