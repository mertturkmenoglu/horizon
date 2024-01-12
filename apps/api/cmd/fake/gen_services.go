package main

import (
	"encoding/json"
	"fmt"
	"horizon/internal/api/v1/dto"
	"math/rand"
	"os"

	"github.com/icrowley/fake"
)

func gen_services(num int, path string) {
	dtos := make([]dto.CreateServiceRequest, num)
	for i := 0; i < num; i++ {
		price := fmt.Sprintf("%.2f", rand.Float32()*100)
		priceUnits := []string{"USD", "TRY"}

		dtos[i] = dto.CreateServiceRequest{
			Title:            fake.Title(),
			Description:      fake.ParagraphsN(5),
			Category:         rand.Intn(46),
			Price:            price,
			PriceUnit:        priceUnits[rand.Intn(len(priceUnits))],
			PriceTimespan:    rand.Intn(4),
			IsOnline:         rand.Float32() > 0.5,
			Location:         fake.StreetAddress(),
			DeliveryTime:     rand.Intn(10),
			DeliveryTimespan: rand.Intn(4),
		}
	}

	bytes, _ := json.MarshalIndent(dtos, "", "\t")
	os.WriteFile(path, bytes, 0644)
}
