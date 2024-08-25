DROP INDEX IF EXISTS idx_reports_reporter;

DROP INDEX IF EXISTS idx_reports_target;

DROP INDEX IF EXISTS idx_reports_assignee;

DROP TABLE IF EXISTS reports;

DROP TYPE IF EXISTS ReportTargetType;

DROP TYPE IF EXISTS ReportStatus;
