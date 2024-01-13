package search

import (
	"horizon/internal/api"
	"horizon/internal/esearch"
	"horizon/internal/h"
	"net/http"

	"github.com/elastic/go-elasticsearch/v8/typedapi/core/search"
	"github.com/elastic/go-elasticsearch/v8/typedapi/types"
	"github.com/labstack/echo/v4"
)

func SearchByTerm(c echo.Context) error {
	term := c.QueryParam("term")

	if term == "" {
		return api.NewBadRequestError("term is required")
	}

	res, err := api.App.Search.
		Client.
		Search().
		Index(esearch.IndexService).
		Request(&search.Request{
			Query: &types.Query{
				Match: map[string]types.MatchQuery{
					"title": {Query: term},
				},
			},
		}).
		Do(api.App.Search.Context)

	if err != nil {
		return api.NewInternalServerError(err)
	}

	return c.JSON(http.StatusOK, h.Response[any]{
		"data": *res,
	})
}
