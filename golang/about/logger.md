# Enhanced Code with Request Logging

## Overview

The following code improvements have been made to enhance the observability and robustness of your application. Notable changes include the addition of middleware for logging incoming requests and a consistent renaming of route setup functions.

```go
// main.go

package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"

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

	// Middleware for logging incoming requests
	app.Use(logger.New())

	// Middleware for recovering from panics
	app.Use(recover.New())

	// Initialize MongoDB
	configs.InitMongoDB()

	// Routes
	routes.SetupIndexRoutes(app)
	v0.SetupHealthCheckRoutes(app)
	v1.SetupBookRoutes(app)

	// Get port from environment variable or default to 8000
	port := configs.GetPort()

	// Start the Fiber app
	err := app.Listen(":" + port)
	if err != nil {
		log.Fatalf("Error starting the server: %v", err)
	}
}
```

## Changes and Improvements

1. **Request Logging Middleware:** The code now includes Fiber's built-in `logger` middleware to log information about incoming requests. This enhances the observability of your application.

2. **Panic Recovery Middleware:** Added the `recover` middleware to recover from panics, providing additional robustness to your application.

3. **Consistent Route Setup Naming:** Renamed route setup functions for consistency (`SetupIndexRoutes`, `SetupHealthCheckRoutes`, `SetupBookRoutes`).

Feel free to adapt the middleware or make additional changes based on your specific requirements.
