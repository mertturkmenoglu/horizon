package uploads

import (
	"horizon/internal/h"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

// Get New Upload URL godoc
//
//	@Summary		Get new upload URL
//	@Description	Gets a new upload URL for the given type
//	@Tags			Uploads
//	@Accept			json
//	@Produce		json
//	@Param			type	query	string	true	"Type of upload"
//	@Param			count	query	int	true	"Number of files to be uploaded" minimum(1) maximum(5)
//	@Param			mime	query	string	true	"Mime type of the files to be uploaded"
//	@Success		200	{object}	h.R{data=[]UploadObj}	"Successful request"
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		401	{object}	echo.HTTPError	"Authentication failed"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Router			/uploads/new-url [get]
func (s *handlers) GetNewUrl(c echo.Context) error {
	// Get bucket name (type), how many files to be uploaded(count),
	// and mime type from the query params
	qType := c.QueryParam("type")
	qCount := c.QueryParam("count")
	qMime := c.QueryParam("mime")

	// Check if the type is allowed
	if !isAllowedUploadType(qType) {
		return echo.NewHTTPError(http.StatusBadRequest, errInvalidBucketType.Error())
	}

	count, err := strconv.Atoi(qCount)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, errInvalidCount.Error())
	}

	// Check if the count is allowed
	if !isAllowedCount(int(count)) {
		return echo.NewHTTPError(http.StatusBadRequest, errCountValue.Error())
	}

	// Check if the mime type is allowed
	if !isAllowedMimeType(qMime) {
		return echo.NewHTTPError(http.StatusBadRequest, errInvalidMimeType.Error())
	}

	data, err := s.service.getPresignedUrls(qType, count, qMime)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, errPresignedUrlCreation.Error())
	}

	return c.JSON(http.StatusCreated, h.R{
		Data: data,
	})
}
