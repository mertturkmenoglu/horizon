package uploads

import (
	"context"
	"fmt"
	"horizon/internal/h"
	"horizon/internal/upload"
	"net/http"
	"slices"
	"strconv"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type UploadsService struct {
	Upload *upload.Upload
}

func NewUploadsService(upload *upload.Upload) *UploadsService {
	return &UploadsService{
		Upload: upload,
	}
}

type UploadObj struct {
	Url string
	Key string
}

func (s *UploadsService) HandlerGetNewUrl(c echo.Context) error {
	qType := c.QueryParam("type")
	qCount := c.QueryParam("count")
	qMime := c.QueryParam("mime")
	allowedMimeTypes := []string{
		"image/jpeg",
		"image/jpg",
		"image/png",
		"image/gif",
		"image/webp",
	}

	if !(qType == "reviews" || qType == "hservices") {
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

	if count < 1 || count > 4 {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: ErrCountValue.Error(),
		})
	}

	if !slices.Contains(allowedMimeTypes, qMime) {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: ErrInvalidMimeType.Error(),
		})
	}

	userId := c.Get("user_id").(string)
	data := make([]UploadObj, count)

	for i := 0; i < int(count); i++ {
		key := uuid.New()
		fileExtension := strings.Split(qMime, "/")[1]
		destination := fmt.Sprintf("%s.%s", key.String(), fileExtension)
		u, err := s.Upload.Client.PresignedPutObject(context.Background(), qType, destination, 15*time.Minute)

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
