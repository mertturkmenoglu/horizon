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
				Name: "category",
				Type: "int32",
			},
			{
				Name: "price",
				Type: "float",
			},
			{
				Name: "priceUnit",
				Type: "string",
			},
			{
				Name: "priceTimespan",
				Type: "string",
			},
			{
				Name: "isOnline",
				Type: "bool",
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
				Name: "deliveryTime",
				Type: "int32",
			},
			{
				Name: "deliveryTimespan",
				Type: "string",
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
