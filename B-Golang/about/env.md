# Environment Configuration in Golang Fiber Application

In this guide, we'll walk through the process of creating a more organized and professional environment configuration for your Golang Fiber application.

## Step 1: Create a New Configuration Package

Create a new file `api/configs/config.go` with the following content:

```go
// api/configs/config.go

package configs

import (
	"github.com/joho/godotenv"
	"log"
	"os"
)

// LoadEnvVariables loads environment variables from the .env file
func LoadEnvVariables() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

// GetPort retrieves the port from the environment variable or defaults to 8000
func GetPort() string {
	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "8000"
	}
	return port
}
```

## Step 2: Update the Main Application

Modify your `main.go` file to use the newly created configuration package:

```go
// main.go

package main

import (
	"github.com/gofiber/fiber/v2"

	"dododev/api/configs"
	"dododev/api/routes"
)

func main() {
	// Load environment variables from .env file
	configs.LoadEnvVariables()

	// Create a new Fiber instance
	app := fiber.New()

	// Initialize MongoDB
	configs.InitMongoDB()

	// Routes
	routes.SetupBookRoutes(app)
	routes.SetupHealthCheckRoute(app)

	// Get port from environment variable or default to 8000
	port := configs.GetPort()

	// Start the Fiber app
	err := app.Listen(":" + port)
	if err != nil {
		panic(err)
	}
}
```

Now, your application will read the `APP_PORT` environment variable from the `.env` file or default to `8000` if it is not set. Make sure to have `godotenv` installed by running:

```bash
go get github.com/joho/godotenv
```

```env
APP_PORT=8000
APP_HOST=localhost
```

By implementing these changes, you have effectively separated the configuration-related logic into the `api/configs` package, resulting in a cleaner and more organized `main.go` file. This approach enhances maintainability and facilitates future modifications to your Golang Fiber application.
