package api

import "context"

func createIndices() {
	App.Search.Indices.Create("service").Do(context.TODO())
}
