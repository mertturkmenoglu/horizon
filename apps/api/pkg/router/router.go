package router

import (
	"horizon/pkg/dto"
	"horizon/pkg/middlewares"

	"github.com/labstack/echo/v4"
)

func Bootstrap(e *echo.Echo) {
	api := e.Group("/api/v1")

	auth := api.Group("/auth")

	auth.POST("/login", Login, middlewares.ParseBody[dto.LoginRequest])
	auth.POST("/register", Register, middlewares.ParseBody[dto.RegisterRequest])
	auth.PUT("/password/change", ChangePassword)
	auth.POST("/password/reset/send/:email", SendPasswordResetEmail)
	auth.PUT("/password/reset", ResetPassword)
	auth.POST("/password/strength", GetPasswordStrength, middlewares.ParseBody[dto.PasswordStrengthRequest])
	auth.POST("/email/verify/send", SendVerifyEmail)
	auth.POST("/mfa/send", SendMfaCode)
	auth.POST("/onboard/complete", CompleteOnboarding)
}
