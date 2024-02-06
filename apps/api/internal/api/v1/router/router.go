package router

import (
	app "horizon/internal/api"
	"horizon/internal/api/v1/dto"
	"horizon/internal/api/v1/middlewares"
	"horizon/internal/api/v1/router/auth"
	"horizon/internal/api/v1/router/favorites"
	"horizon/internal/api/v1/router/location"
	"horizon/internal/api/v1/router/search"
	"horizon/internal/api/v1/router/services"
	"horizon/internal/api/v1/router/users"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	"github.com/spf13/viper"
)

func RegisterRoutes(e *echo.Echo) {
	api := e.Group("/api/v1")
	env := viper.GetString("env")
	api.Use(middlewares.GetLocaleFromHeader)

	authRoutes := api.Group("/auth")
	{
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

		if env == "dev" {
			authRoutes.POST(
				"/bulk-register",
				auth.BulkRegister,
				middlewares.ParseBody[dto.BulkRegisterRequest],
			)
		}
	}

	usersRoutes := api.Group("/users")
	{
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
	}

	servicesRoutes := api.Group("/services")
	{
		servicesRoutes.GET("/", services.GetServices)
		servicesRoutes.GET("/:id", services.GetServiceById)
		servicesRoutes.POST("/:id/review/:rating", services.CreateReview, middlewares.IsAuth)
		servicesRoutes.DELETE("/:id/review", services.DeleteReview, middlewares.IsAuth)
		servicesRoutes.POST("/", services.CreateService, middlewares.ParseBody[dto.CreateServiceRequest], middlewares.IsAuth)
		servicesRoutes.POST("/:id/media", services.UploadServiceMedia, middlewares.IsAuth)
		servicesRoutes.DELETE("/:id/media/:mediaId", services.DeleteServiceMedia, middlewares.IsAuth)
		servicesRoutes.GET("/categories", services.GetServiceCategories)
		servicesRoutes.GET("/new", services.GetNewServices)
		servicesRoutes.GET("/categories-count", services.GetCategoriesServiceCount)
		servicesRoutes.GET("/user/:username", services.GetServicesByUsername)
		servicesRoutes.GET("/category/:id", services.GetServicesByCategory)

		if env == "dev" {
			servicesRoutes.POST(
				"/bulk",
				services.BulkCreateServices,
				middlewares.ParseBody[dto.BulkCreateServicesRequest],
				middlewares.IsAuth,
			)
		}
	}

	favoritesRoutes := api.Group("/favorites")
	{
		favoritesRoutes.GET(
			"/",
			favorites.GetMyFavorites,
			middlewares.IsAuth,
		)

		favoritesRoutes.POST(
			"/",
			favorites.CreateFavorite,
			middlewares.ParseBody[dto.CreateFavoriteRequest],
			middlewares.IsAuth,
		)

		favoritesRoutes.DELETE(
			"/:id",
			favorites.DeleteFavorite,
			middlewares.IsAuth,
		)
	}

	locationRoutes := api.Group("/location")
	locationRoutes.GET("/", location.SearchLocation)

	searchRoutes := api.Group("/search")
	searchRoutes.GET("/", search.SearchByTerm)

	api.GET("/dummy", func(c echo.Context) error {
		localizer := app.App.Locale.Localizer(c.Get("lang").(string))
		msg, err := localizer.Localize(&i18n.LocalizeConfig{
			MessageID: "HelloPerson",
			TemplateData: map[string]string{
				"Name": "Mert",
			},
		})

		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "localization error")
		}

		return c.HTML(http.StatusOK, msg)
	})
}
