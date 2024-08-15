package search

import (
	tsapi "github.com/typesense/typesense-go/v2/typesense/api"
	"github.com/typesense/typesense-go/v2/typesense/api/pointer"
)

var schemas = []*tsapi.CollectionSchema{
	{
		Name: "Service",
		Fields: []tsapi.Field{
			{
				Name: "id",
				Type: "string",
			},
			{
				Name: "title",
				Type: "string",
				Sort: pointer.True(),
			},
		},
		DefaultSortingField: pointer.String("title"),
		EnableNestedFields:  pointer.True(),
	},
}
