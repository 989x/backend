# Routes Setup with Basic Authentication Middleware

## Requirements

When setting up routes, it's crucial to ensure security measures are in place. 
Utilizing `app.Use(setupBasicAuth())` ensures that basic authentication is enforced across all APIs. 
However, for endpoints using the GET method exclusively, such as public resources, basic authentication might not be necessary.

```go
package routes

import (
	c "fiber-workshop/controllers"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/basicauth"
)

func setupBasicAuth() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Check if the method is GET or not.
		if c.Method() == fiber.MethodGet {
			// If the method is GET, ignore basicauth and move on to the next middleware.
			return c.Next()
		}

		// If the method is not GET, use basicauth.
		return basicauth.New(basicauth.Config{
			Users: map[string]string{
				"gofiber": "21022566", // user 1
				"testgo":  "23012023", // user 2
			},
		})(c)
	}
}

func InetRoutes(app *fiber.App) {
	app.Use(setupBasicAuth())

	api := app.Group("/api")
	v1 := api.Group("/v1")

	v1.Get("/", c.HelloTest)
	v1.Post("/", c.BodyParserTest)
	v1.Get("/user/:name", c.ParamsTest)
	v1.Post("/inet", c.QueryTest)
	v1.Post("/valid", c.ValidTest)

	// Pre Test
	v1.Get("/fact/:num", c.FactorialHandler)
	v1.Post("/register", c.RegistrationHandler)
}
```

## Code Explanation

1. **Middleware Function (`setupBasicAuth`)**:
   - This function returns a Fiber handler function.
   - It checks if the HTTP request method is `GET`.
   - If it's `GET`, it skips basic authentication.
   - If it's not `GET`, it applies basic authentication using the `basicauth` middleware.

2. **Route Setup (`InetRoutes`)**:
   - Sets up API routes under `/api/v1`.
   - Utilizes the `setupBasicAuth` middleware for all routes.
   - Defines various HTTP methods for different endpoints, each mapped to a controller function.
   - Includes routes for pre-testing purposes (`/api/v1/fact/:num`, `/api/v1/register`).
