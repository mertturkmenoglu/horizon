package router

import (
	"horizon/api/v1/dto"
	"horizon/api/v1/middlewares"

	"github.com/labstack/echo/v4"
)

func Bootstrap(e *echo.Echo) {
	api := e.Group("/api/v1")

	auth := api.Group("/auth")

	auth.POST("/login", Login, middlewares.ParseBody[dto.LoginRequest])
	auth.POST("/register", Register, middlewares.ParseBody[dto.RegisterRequest])
	auth.PUT("/password/change", ChangePassword, middlewares.IsAuth, middlewares.ParseBody[dto.ChangePasswordRequest])
	auth.POST("/password/reset/send/:email", SendPasswordResetEmail)
	auth.PUT("/password/reset", ResetPassword)
	auth.POST("/password/strength", GetPasswordStrength, middlewares.ParseBody[dto.PasswordStrengthRequest])
	auth.POST("/email/verify/send", SendVerifyEmail)
	auth.POST("/onboard/complete", CompleteOnboarding, middlewares.IsAuth)

	user := api.Group("/users")

	user.GET("/me", GetMe, middlewares.IsAuth)
}
