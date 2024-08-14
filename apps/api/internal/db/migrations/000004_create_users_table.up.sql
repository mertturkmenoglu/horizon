CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR (128) NOT NULL,
  username VARCHAR (32) UNIQUE NOT NULL,
  gender VARCHAR (32),
  profile_image VARCHAR (128)
);

-- Create indexes
CREATE INDEX idx_users_username ON users(username);
