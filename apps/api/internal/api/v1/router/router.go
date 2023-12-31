package router

import (
	"horizon/internal/api/v1/dto"
	"horizon/internal/api/v1/middlewares"

	"github.com/labstack/echo/v4"
)

func Bootstrap(e *echo.Echo) {
	api := e.Group("/api/v1")

	auth := api.Group("/auth")

	auth.POST("/login", Login, middlewares.ParseBody[dto.LoginRequest])
	auth.POST("/register", Register, middlewares.ParseBody[dto.RegisterRequest])
	auth.POST("/logout", Logout, middlewares.IsAuth)
	auth.PUT("/password/change", ChangePassword, middlewares.IsAuth, middlewares.ParseBody[dto.ChangePasswordRequest])
	auth.POST("/password/reset/send", SendPasswordResetEmail, middlewares.ParseBody[dto.PasswordResetEmailRequest])
	auth.PUT("/password/reset", ResetPassword, middlewares.ParseBody[dto.PasswordResetRequest])
	auth.POST("/password/strength", GetPasswordStrength, middlewares.ParseBody[dto.PasswordStrengthRequest])
	auth.POST("/email/verify/send", SendVerifyEmail, middlewares.ParseBody[dto.VerifyEmailEmailRequest])
	auth.POST("/email/verify", VerifyEmail, middlewares.ParseBody[dto.VerifyEmailRequest])
	auth.POST("/onboard/complete", CompleteOnboarding, middlewares.IsAuth)
	auth.POST("/token/refresh", GetNewTokens)

	users := api.Group("/users")

	users.GET("/me", GetMe, middlewares.IsAuth)
	users.GET("/:username", GetUserByUsername, middlewares.IsAuth)
	users.PATCH("/profile", UpdateMe, middlewares.IsAuth)
	// users.PATCH("/profile/location", UpdateLocation, middlewares.IsAuth)
	// users.PATCH("/profile/contact", UpdateContactInformation, middlewares.IsAuth)

	services := api.Group("/services")

	services.GET("/", GetServices)
	services.GET("/categories", GetServiceCategories)
}
