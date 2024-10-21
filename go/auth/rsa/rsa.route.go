package routes

import (
	controllers "outsource-management/api/controllers/v1"
	middlewares "outsource-management/api/middlewares"

	"github.com/gofiber/fiber/v2"
)

func RoutesAuth(v1 fiber.Router) {
	auth := v1.Group("/auth")
	auth.Post("/login", controllers.LoginJWT)
	auth.Get("/user", middlewares.RequestAuthJWT(), controllers.GetOneAccount)

	auth.Post("/login_rsa", controllers.LoginRSA)
	auth.Get("/user_rsa", middlewares.RequestAuthRSA(), controllers.GetOneAccount)
}
