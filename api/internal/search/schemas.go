package search

import (
	tsapi "github.com/typesense/typesense-go/v2/typesense/api"
	"github.com/typesense/typesense-go/v2/typesense/api/pointer"
)

var schemas = []*tsapi.CollectionSchema{
	{
		Name: "HService",
		Fields: []tsapi.Field{
			{
				Name: "id",
				Type: "string",
			},
			{
				Name: "userId",
				Type: "string",
			},
			{
				Name: "title",
				Type: "string",
				Sort: pointer.True(),
			},
			{
				Name: "slug",
				Type: "string",
			},
			{
				Name: "description",
				Type: "string",
			},
			{
				Name:  "category",
				Type:  "int32",
				Facet: pointer.True(),
			},
			{
				Name:  "price",
				Type:  "float",
				Facet: pointer.True(),
			},
			{
				Name:  "priceUnit",
				Type:  "string",
				Facet: pointer.True(),
			},
			{
				Name:  "priceTimespan",
				Type:  "string",
				Facet: pointer.True(),
			},
			{
				Name:  "isOnline",
				Type:  "bool",
				Facet: pointer.True(),
			},
			{
				Name:     "url",
				Type:     "string",
				Optional: pointer.True(),
			},
			{
				Name: "location",
				Type: "string",
			},
			{
				Name:  "deliveryTime",
				Type:  "int32",
				Facet: pointer.True(),
			},
			{
				Name:  "deliveryTimespan",
				Type:  "string",
				Facet: pointer.True(),
			},
			{
				Name: "media",
				Type: "auto",
			},
		},
		DefaultSortingField: pointer.String("title"),
		EnableNestedFields:  pointer.True(),
	},
}
