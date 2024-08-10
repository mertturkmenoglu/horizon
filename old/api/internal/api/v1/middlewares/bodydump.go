package middlewares

import (
	"encoding/json"

	"github.com/labstack/echo-contrib/jaegertracing"
	"github.com/labstack/echo/v4"
)

type params struct {
	K string `json:"key"`
	V string `json:"value"`
}

func Dump(ctx echo.Context, b1, b2 []byte) {
	sp := jaegertracing.CreateChildSpan(ctx, ctx.Response().Header().Get(echo.HeaderXRequestID))
	defer sp.Finish()

	// Get request body
	b := []byte{}
	ctx.Request().Body.Read(b)

	// Get request query params
	qp, _ := json.Marshal(ctx.QueryParams())

	// Get request headers
	h, _ := json.Marshal(ctx.Request().Header)

	// Get request path params
	pp := make([]params, 0)

	for _, k := range ctx.ParamNames() {
		v := ctx.Param(k)
		pp = append(pp, params{
			K: k,
			V: v,
		})
	}

	ppstr, _ := json.Marshal(pp)

	sp.SetBaggageItem("ReqBody", string(b))
	sp.SetBaggageItem("ReqHeaders", string(h))
	sp.SetBaggageItem("ReqQueryParams", string(qp))
	sp.SetBaggageItem("ReqPathParams", string(ppstr))
	sp.SetBaggageItem("Request", string(b1))
	sp.SetBaggageItem("Response", string(b2))
}
