package uploads

import "horizon/internal/upload"

type UploadsService struct {
	Upload *upload.Upload
}

func NewUploadsService(upload *upload.Upload) *UploadsService {
	return &UploadsService{
		Upload: upload,
	}
}
