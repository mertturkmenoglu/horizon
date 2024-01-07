package router

import (
	"horizon/internal/api/v1/dto"
	"horizon/internal/api/v1/middlewares"
	"horizon/internal/api/v1/router/auth"
	"horizon/internal/api/v1/router/location"
	"horizon/internal/api/v1/router/services"
	"horizon/internal/api/v1/router/users"

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

	usersRoutes := api.Group("/users")

	usersRoutes.GET("/me", users.GetMe, middlewares.IsAuth)
	usersRoutes.GET("/:username", users.GetUserByUsername, middlewares.IsAuth)
	usersRoutes.PATCH(
		"/profile",
		users.UpdateMe,
		middlewares.ParseBody[dto.UpdateMeRequest],
		middlewares.IsAuth,
	)
	usersRoutes.PUT("/profile/image", users.UpdateProfileImage, middlewares.IsAuth)
	usersRoutes.PATCH(
		"/profile/location",
		users.UpdateMyLocation,
		middlewares.ParseBody[dto.UpdateLocationRequest],
		middlewares.IsAuth,
	)
	usersRoutes.PATCH(
		"/profile/contact",
		users.UpdateMyContactInformation,
		middlewares.ParseBody[dto.UpdateContactInformationRequest],
		middlewares.IsAuth,
	)

	servicesRoutes := api.Group("/services")

	servicesRoutes.GET("/", services.GetServices)
	servicesRoutes.GET("/categories", services.GetServiceCategories)

	locationRoutes := api.Group("/location")
	locationRoutes.GET("/", location.SearchLocation)
}
