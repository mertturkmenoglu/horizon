-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Enable UUID generation extension

CREATE TABLE IF NOT EXISTS auth (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid UNIQUE NOT NULL,
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

-- Create indexes
CREATE INDEX idx_auth_email ON auth(email);
CREATE INDEX idx_auth_google_id ON auth(google_id);
CREATE INDEX idx_auth_user_id ON auth(user_id);

-- Trigger to update the updated_at field automatically
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_auth_timestamp
BEFORE UPDATE ON auth
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
