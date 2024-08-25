DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'reporttargettype') THEN
    CREATE TYPE ReportTargetType AS ENUM (
      'hservice',
      'user',
      'list',
      'review'
    );
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'reportstatus') THEN
    CREATE TYPE ReportStatus AS ENUM (
      'pending',
      'in_progress',
      'done'
    );
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS reports (
  id TEXT PRIMARY KEY,
  reporter_id TEXT NOT NULL,
  target_id TEXT NOT NULL,
  target_type ReportTargetType NOT NULL,
  reason VARCHAR(128) NOT NULL,
  comment VARCHAR(512),
  report_status ReportStatus NOT NULL DEFAULT 'pending',
  assignee_id TEXT,
  assignee_comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add foreign keys
ALTER TABLE
  reports
ADD
  CONSTRAINT fk_reports_reporter FOREIGN KEY (reporter_id) REFERENCES users(id);

ALTER TABLE
  reports
ADD
  CONSTRAINT fk_reports_assignee FOREIGN KEY (assignee_id) REFERENCES users(id);

-- Create indexes

CREATE INDEX IF NOT EXISTS idx_reports_reporter ON reports(reporter_id);

CREATE INDEX IF NOT EXISTS idx_reports_target ON reports(target_id, target_type);

CREATE INDEX IF NOT EXISTS idx_reports_assignee ON reports(assignee_id);

-- Triggers

CREATE OR REPLACE TRIGGER update_reports_timestamp BEFORE
UPDATE
  ON reports FOR EACH ROW EXECUTE FUNCTION update_timestamp();
