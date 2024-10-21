# GoFiber Routing

## Project Structure

```lua
gofiber-boilerplate
|-- src
|   |-- api
|       |-- configs
|       |-- controllers
|       |-- helpers
|       |-- middleware
|       |-- models
|       |-- routes
|           |-- index.go
|           |-- v0
|               |-- health_check.go
|           |-- v1
|               |-- book.go
|-- .env
|-- go.mod
|-- go.sum
|-- main.go
|-- .gitignore
|-- ...dockerfile
|-- readme.md
|-- test.http
```

## Route Definitions

### `routes/index.go`

```go
package routes

import "github.com/gofiber/fiber/v2"

// SetupIndexRoute sets up the route for the root path
func SetupIndexRoute(app *fiber.App) {
    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Hi")
    })
}
```

### `routes/v0/health_check.go`

```go
// routes/v0/health_check.go

package v0

import "github.com/gofiber/fiber/v2"

// SetupHealthCheckRoute sets up the health check route for testing the application's functionality
func SetupHealthCheckRoute(app *fiber.App) {
    // Create a group for v0
    v0 := app.Group("/v0")

    // Routes for health check
    v0.Get("/health", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{"status": "ok"})
    })

    // Ping/Pong route for testing functionality
    v0.Get("/ping", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{"message": "pong"})
    })
}
```

### `routes/v1/book.go`

```go
// routes/v1/book.go

package v1

import (
    "github.com/gofiber/fiber/v2"
    "dododev/api/controllers/v1/book"
    "dododev/api/middleware"
)

// SetupBookRoutes sets up book-related routes
func SetupBookRoutes(app *fiber.App) {
    // Create a group for v1
    v1 := app.Group("/v1")

    // Use LoggerMiddleware for all routes in the book group
    v1.Use(middleware.LoggerMiddleware)

    // Routes for books
    v1.Post("/books", book.CreateBook)
    v1.Get("/books", book.GetAllBooks)
    v1.Get("/books/:id", book.GetBookByID)
    v1.Delete("/books/:id", book.DeleteBook)
}
```

### `main.go`

```go
// main.go

package main

import (
    "github.com/gofiber/fiber/v2"
    "dododev/api/configs"
    "dododev/api/routes"
    "dododev/api/routes/v0"
    "dododev/api/routes/v1"
)

func main() {
    // Load environment variables from .env file
    configs.LoadEnvVariables()

    // Create a new Fiber instance
    app := fiber.New()

    // Initialize MongoDB
    configs.InitMongoDB()

    // Routes
    routes.SetupIndexRoute(app)  // Include the new index route
    v0.SetupHealthCheckRoute(app)
    v1.SetupBookRoutes(app)

    // Get port from environment variable or default to 8000
    port := configs.GetPort()

    // Start the Fiber app
    err := app.Listen(":" + port)
    if err != nil {
        panic(err)
    }
}
```

This improved README provides a clean and organized view of the project structure and route definitions. Feel free to further enhance it based on your project's specific details and requirements.
