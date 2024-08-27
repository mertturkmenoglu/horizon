package auth

import (
	"horizon/internal/middlewares"

	"github.com/labstack/echo/v4"
)

func (m *Module) RegisterRoutes(e *echo.Group) {
	routes := e.Group("/auth")
	{
		routes.GET("/google", m.Handlers.HandlerGoogle)
		routes.GET("/google/callback", m.Handlers.HandlerGoogleCallback)
		routes.GET("/me", m.Handlers.HandlerGetMe, middlewares.IsAuth)
		routes.POST("/logout", m.Handlers.HandlerLogout)
		routes.POST("/credentials/login", m.Handlers.HandlerCredentialsLogin, middlewares.ParseBody[LoginRequestDto])
		routes.POST("/credentials/register", m.Handlers.HandlerCredentialsRegister, middlewares.ParseBody[RegisterRequestDto])
		routes.POST(
			"/verify-email/send",
			m.Handlers.HandlerSendVerificationEmail,
			middlewares.ParseBody[SendVerificationEmailRequestDto],
		)
		routes.GET("/verify-email/verify", m.Handlers.HandlerVerifyEmail)
		routes.POST(
			"/forgot-password/send",
			m.Handlers.HandlerSendForgotPasswordEmail,
			middlewares.ParseBody[SendForgotPasswordEmailRequestDto],
		)
		routes.POST("/forgot-password/reset", m.Handlers.HandlerResetPassword, middlewares.ParseBody[ResetPasswordRequestDto])
	}
}
