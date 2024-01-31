package routes

import (
	c "go-fiber-test/controllers"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/basicauth"
)

func InetRoutes(app *fiber.App) {
	app.Use(basicauth.New(basicauth.Config{
		Users: map[string]string{
			"gofiber": "21022566",
		},
	}))

	api := app.Group("/api")
	v1 := api.Group("/v1")
	v2 := api.Group("/v2")
	v3 := api.Group("/v3")

	v1.Get("/", c.HelloTest)
	v1.Post("/", c.BodyParserTest)
	v1.Get("/user/:name", c.ParamsTest)
	v1.Post("/inet", c.QueryTest)
	v1.Post("/valid", c.ValidTest)

	// Pre Test
	v1.Get("/fact/:num", c.FactorialHandler)
	v1.Post("/register", c.RegistrationHandler)

	v2.Get("/list", func(c *fiber.Ctx) error {
		return c.SendString("api/v2/user")
	})
	v2.Get("/user", func(c *fiber.Ctx) error {
		return c.SendString("api/v2/user")
	})

	// Pre Test
	v3.Get("/:nickname", c.NicknameHandler)

	dog := v1.Group("/dog")
	dog.Get("", c.GetDogs)
	dog.Get("/filter", c.GetDog)
	dog.Get("/json", c.GetDogsJson)
	dog.Post("", c.AddDog)
	dog.Put("/:id", c.UpdateDog)
	dog.Delete("/:id", c.RemoveDog)

	// Pre Test
	dog.Get("/gt50lt100", c.GetDogsGreaterThan50LessThan100)
	dog.Get("/sum", c.GetDogsSum)
	dog.Delete("/soft/:id", c.SoftRemoveDog)
	dog.Get("/soft", c.GetSoftRemovedDogs)

	company := v1.Group("/company")
	company.Post("", c.CreateCompany)
	company.Get("", c.GetCompanies)
	company.Get("/:id", c.GetCompany)
	company.Put("/:id", c.UpdateCompany)
	company.Delete("/:id", c.DeleteCompany)
}
