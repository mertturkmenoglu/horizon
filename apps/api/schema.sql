CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email VARCHAR (128) UNIQUE NOT NULL,
  username VARCHAR (32) UNIQUE NOT NULL,
  full_name VARCHAR (128) NOT NULL,
  password_hash VARCHAR (255), -- Only required for credentials login
  google_id VARCHAR(64) UNIQUE, -- Only required for Google OAuth login
  is_email_verified BOOLEAN DEFAULT FALSE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL, -- Soft delete or deactivation
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
