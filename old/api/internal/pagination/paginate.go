package pagination

import (
	"strconv"

	"github.com/labstack/echo/v4"
)

func GetParamsFromContext(c echo.Context) (Params, error) {
	page := c.QueryParam("page")
	size := c.QueryParam("pageSize")

	if page == "" {
		page = "1"
	}

	if size == "" {
		size = "25"
	}

	ipage, pageErr := strconv.ParseInt(page, 10, 32)
	isize, sizeErr := strconv.ParseInt(size, 10, 32)

	if pageErr != nil || sizeErr != nil {
		return Params{}, ErrInvalidPaginationParams
	}

	ok := isize > 0 && isize <= 100 && (isize%25 == 0 || isize%10 == 0)

	if !ok {
		return Params{}, ErrInvalidPaginationParams
	}

	params := Params{
		Page:     int(ipage),
		PageSize: int(isize),
		Offset:   int((ipage - 1) * isize),
	}

	return params, nil
}

func GetPagination(params Params, totalRecords int64) Pagination {
	modulo := totalRecords % int64(params.PageSize)
	var carry int64 = 0

	if modulo > 0 {
		carry = 1
	}

	totalPages := totalRecords/int64(params.PageSize) + carry
	hasPrevious := params.Page > 1
	hasNext := int64(params.Page) < totalPages

	return Pagination{
		Page:         params.Page,
		PageSize:     params.PageSize,
		TotalRecords: totalRecords,
		TotalPages:   totalPages,
		HasPrevious:  hasPrevious,
		HasNext:      hasNext,
	}
}
