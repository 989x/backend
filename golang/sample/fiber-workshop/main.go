package main

import (
	"fiber-workshop/database"
	"fiber-workshop/routes"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	database.InitDatabase()

	routes.InetRoutes(app)

	if err := app.Listen(":3000"); err != nil {
		fmt.Println("Error starting the server:", err)
	}
}
