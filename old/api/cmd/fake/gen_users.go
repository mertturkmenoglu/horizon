package main

import (
	"encoding/json"
	"horizon/internal/api/v1/dto"
	"os"

	"github.com/icrowley/fake"
)

func gen_users(num int, path string) {
	dtos := make([]dto.RegisterRequest, num)
	for i := 0; i < num; i++ {
		dtos[i] = dto.RegisterRequest{
			Email:    fake.EmailAddress(),
			Password: fake.Password(8, 10, true, true, false),
			Name:     fake.FullName(),
			Username: fake.UserName(),
		}
	}

	bytes, _ := json.MarshalIndent(dtos, "", "\t")
	os.WriteFile(path, bytes, 0644)
}
