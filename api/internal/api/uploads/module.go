package uploads

import "horizon/internal/upload"

type Module struct {
	Upload *upload.Upload
}

func New(upload *upload.Upload) *Module {
	return &Module{
		Upload: upload,
	}
}
