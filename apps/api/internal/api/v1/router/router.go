package router

import (
	"horizon/internal/api/v1/dto"
	"horizon/internal/api/v1/middlewares"
	"horizon/internal/api/v1/router/auth"

	"github.com/labstack/echo/v4"
)

func RegisterRoutes(e *echo.Echo) {
	api := e.Group("/api/v1")

	authRoutes := api.Group("/auth")

	authRoutes.POST("/login", auth.Login, middlewares.ParseBody[dto.LoginRequest])
	authRoutes.POST("/register", auth.Register, middlewares.ParseBody[dto.RegisterRequest])
	authRoutes.POST("/logout", auth.Logout, middlewares.IsAuth)
	authRoutes.PUT("/password/change", auth.ChangePassword, middlewares.IsAuth, middlewares.ParseBody[dto.ChangePasswordRequest])
	authRoutes.POST("/password/reset/send", auth.SendPasswordResetEmail, middlewares.ParseBody[dto.PasswordResetEmailRequest])
	authRoutes.PUT("/password/reset", auth.ResetPassword, middlewares.ParseBody[dto.PasswordResetRequest])
	authRoutes.POST("/password/strength", auth.GetPasswordStrength, middlewares.ParseBody[dto.PasswordStrengthRequest])
	authRoutes.POST("/email/verify/send", auth.SendVerifyEmail, middlewares.ParseBody[dto.VerifyEmailEmailRequest])
	authRoutes.POST("/email/verify", auth.VerifyEmail, middlewares.ParseBody[dto.VerifyEmailRequest])
	authRoutes.POST("/onboard/complete", auth.CompleteOnboarding, middlewares.IsAuth)
	authRoutes.POST("/token/refresh", auth.GetNewTokens)
	authRoutes.GET("/activities", auth.GetAuthActivities, middlewares.IsAuth)

	users := api.Group("/users")

	users.GET("/me", GetMe, middlewares.IsAuth)
	users.GET("/:username", GetUserByUsername, middlewares.IsAuth)
	users.PATCH("/profile", UpdateMe, middlewares.IsAuth)
	// users.PATCH("/profile/location", UpdateLocation, middlewares.IsAuth)
	// users.PATCH("/profile/contact", UpdateContactInformation, middlewares.IsAuth)

	services := api.Group("/services")

	services.GET("/", GetServices)
	services.GET("/categories", GetServiceCategories)

	location := api.Group("/location")
	location.GET("/", SearchLocation)
}
