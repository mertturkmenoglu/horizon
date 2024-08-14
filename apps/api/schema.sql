CREATE TABLE authors (
  id   BIGSERIAL PRIMARY KEY,
  name text      NOT NULL,
  bio  text
);

CREATE TABLE IF NOT EXISTS auth (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR (128) UNIQUE NOT NULL,
  password_hash VARCHAR (255), -- Only required for credentials login
  google_id VARCHAR(64) UNIQUE, -- Only required for Google OAuth login
  is_email_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE, -- Soft delete or deactivation
  role VARCHAR(32) DEFAULT 'user',
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  password_reset_token VARCHAR(255),
  password_reset_expires TIMESTAMPTZ,
  login_attempts INT DEFAULT 0,
  lockout_until TIMESTAMPTZ
);
