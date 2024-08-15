package search

import (
	"context"
	"log"
	"strings"

	"github.com/typesense/typesense-go/v2/typesense"
)

func createSchemas(client *typesense.Client) {
	for _, schema := range schemas {
		_, err := client.Collections().Create(context.Background(), schema)

		if err != nil {
			// We don't care if the schema already exists
			existsErr := strings.ContainsAny(err.Error(), "already exists")

			if !existsErr {
				log.Fatal(err.Error())
			}
		}
	}
}
