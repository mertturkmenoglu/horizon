package authz

import "github.com/labstack/echo/v4"

type AuthzAct string

const (
	ActHServiceCreate AuthzAct = "hservice-create"
	ActHServiceRead   AuthzAct = "hservice-read"
	ActHServiceUpdate AuthzAct = "hservice-update"
	ActHServiceDelete AuthzAct = "hservice-delete"
	ActBookmarkCreate AuthzAct = "bookmark-create"
	ActBookmarkRead   AuthzAct = "bookmark-read"
	ActBookmarkDelete AuthzAct = "bookmark-delete"
	ActReviewCreate   AuthzAct = "review-create"
	ActReviewRead     AuthzAct = "review-read"
	ActReviewDelete   AuthzAct = "review-delete"
	ActReportRead     AuthzAct = "report-read"
	ActReportCreate   AuthzAct = "report-create"
	ActReportUpdate   AuthzAct = "report-update"
	ActReportDelete   AuthzAct = "report-delete"
	ActUserVerify     AuthzAct = "user-verify"
)

type AuthzFn func(s *Authz, c echo.Context) (bool, error)

var Fns = map[AuthzAct]AuthzFn{
	ActHServiceCreate: Identity,
	ActHServiceRead:   Identity,
	ActHServiceUpdate: Identity,
	ActHServiceDelete: CanDeleteHService,
	ActBookmarkCreate: Identity,
	ActBookmarkRead:   Identity,
	ActBookmarkDelete: Identity,
	ActReviewCreate:   Identity,
	ActReviewRead:     Identity,
	ActReviewDelete:   Identity,
	ActReportRead:     Identity,
	ActReportCreate:   Identity,
	ActReportUpdate:   Identity,
	ActReportDelete:   Identity,
	ActUserVerify:     Identity,
}
