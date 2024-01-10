package main

import (
	"encoding/json"
	"horizon/internal/api/v1/dto"
	"os"

	"github.com/icrowley/fake"
)

func main() {
	dtos := make([]dto.RegisterRequest, 1000)
	for i := 0; i < 1000; i++ {
		dtos[i] = dto.RegisterRequest{
			Email:    fake.EmailAddress(),
			Password: fake.Password(8, 10, true, true, false),
			Name:     fake.FullName(),
			Username: fake.UserName(),
		}
	}

	bytes, _ := json.MarshalIndent(dtos, "", "\t")
	os.WriteFile("tmp/fake_data.json", bytes, 0644)
}
