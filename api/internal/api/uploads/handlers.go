package uploads

import (
	"context"
	"horizon/config"
	"horizon/internal/h"
	"net/http"
	"strconv"
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/spf13/viper"
)

func (s *Module) HandlerGetNewUrl(c echo.Context) error {
	// Get bucket name (type), how many files to be uploaded(count),
	// and mime type from the query params
	qType := c.QueryParam("type")
	qCount := c.QueryParam("count")
	qMime := c.QueryParam("mime")

	// Check if the type is allowed
	if !isAllowedUploadType(qType) {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: ErrInvalidBucketType.Error(),
		})
	}

	count, err := strconv.ParseInt(qCount, 10, 32)

	if err != nil {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: ErrInvalidCount.Error(),
		})
	}

	// Check if the count is allowed
	if !isAllowedCount(int(count)) {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: ErrCountValue.Error(),
		})
	}

	// Check if the mime type is allowed
	if !isAllowedMimeType(qMime) {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: ErrInvalidMimeType.Error(),
		})
	}

	data := make([]UploadObj, count)

	// get the presigned url for each file
	for i := 0; i < int(count); i++ {
		key := uuid.New()
		fileExtension := getFileExtensionFromMimeType(qMime)

		// Filename is random uuid + file extension
		filename := constructFilename(key.String(), fileExtension)

		// Expiration time for the presigned url
		exp := time.Duration(viper.GetInt(config.UPLOAD_PRESIGNED_URL_EXP_MIN)) * time.Minute

		// Get the presigned url for the file
		u, err := s.Upload.Client.PresignedPutObject(context.Background(), qType, filename, exp)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, h.ErrResponse{
				Message: ErrPresignedUrlCreation.Error(),
			})
		}

		data[i] = UploadObj{
			Url: u.String(),
			Key: key.String(),
		}
	}

	return c.JSON(http.StatusCreated, h.Response[[]UploadObj]{
		Data: data,
	})
}
