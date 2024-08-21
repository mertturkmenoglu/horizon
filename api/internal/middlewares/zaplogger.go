package middlewares

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func ZapLogger() echo.MiddlewareFunc {
	return middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
		LogURI:       true,
		LogStatus:    true,
		LogLatency:   true,
		LogMethod:    true,
		LogError:     true,
		LogProtocol:  true,
		LogRemoteIP:  true,
		LogHost:      true,
		LogURIPath:   true,
		LogRoutePath: true,
		LogRequestID: true,
		LogUserAgent: true,
		LogValuesFunc: func(c echo.Context, v middleware.RequestLoggerValues) error {
			// api.App.Logger.Info("request",
			// 	zap.String("method", v.Method),
			// 	zap.String("uri", v.URI),
			// 	zap.Int("status", v.Status),
			// 	zap.Error(v.Error),
			// 	zap.Int64("latency milli", v.Latency.Milliseconds()),
			// 	zap.String("protocol", v.Protocol),
			// 	zap.String("ip", v.RemoteIP),
			// 	zap.String("host", v.Host),
			// 	zap.String("uri path", v.URIPath),
			// 	zap.String("route path", v.RoutePath),
			// 	zap.String("requestId", v.RequestID),
			// 	zap.String("ua", v.UserAgent),
			// )

			return nil
		},
	})
}
