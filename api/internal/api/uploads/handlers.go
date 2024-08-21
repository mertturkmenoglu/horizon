package uploads

import (
	"context"
	"fmt"
	"horizon/internal/h"
	"net/http"
	"strconv"
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

func (s *UploadsService) HandlerGetNewUrl(c echo.Context) error {
	qType := c.QueryParam("type")
	qCount := c.QueryParam("count")
	qMime := c.QueryParam("mime")

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

	if !isAllowedCount(int(count)) {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: ErrCountValue.Error(),
		})
	}

	if !isAllowedMimeType(qMime) {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: ErrInvalidMimeType.Error(),
		})
	}

	userId := c.Get("user_id").(string)
	data := make([]UploadObj, count)

	for i := 0; i < int(count); i++ {
		key := uuid.New()
		fileExtension := getFileExtensionFromMimeType(qMime)
		filename := constructFilename(key.String(), fileExtension)
		u, err := s.Upload.Client.PresignedPutObject(context.Background(), qType, filename, 15*time.Minute)

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

	cacheKey := fmt.Sprintf("upload-url:%s:%s", userId, qType)
	fmt.Println(cacheKey)

	return c.JSON(http.StatusCreated, h.Response[[]UploadObj]{
		Data: data,
	})
}
