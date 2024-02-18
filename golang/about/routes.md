# Golang Fiber CRUD API with Versioned Routes

## Project Overview

This project provides a structured boilerplate for developing a CRUD (Create, Read, Update, Delete) API using the [Fiber](https://github.com/gofiber/fiber) framework in Golang. The API routes are organized into different versions for better maintainability and scalability.

### Versions and Routes

- **Version 0:**
  - `/v0/books` - Book-related routes
  - `/v0/health` - Health check route

- **Version 1:**
  - `/v1/books` - Book-related routes
  - `/v1/users` - User-related routes

- **Version 2:**
  - `/v2/users` - User-related routes
  - `/v2/auth` - Authentication routes

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
|           |-- v0
|               |-- book.go
|               |-- health_check.go
|           |-- v1
|               |-- book.go
|               |-- user.go
|           |-- v2
|               |-- user.go
|               |-- auth.go
|-- .env
|-- go.mod
|-- go.sum
|-- main.go
|-- .gitignore
|-- ...dockerfile
|-- readme.md
|-- test.http
```

## API Versions and Routes

```go
// main.go

package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"log"
	"os"

	"dododev/api/configs"
	"dododev/api/routes/v0"
	"dododev/api/routes/v1"
	"dododev/api/routes/v2"
)

func main() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Create a new Fiber instance
	app := fiber.New()

	// Initialize MongoDB
	configs.InitMongoDB()

	// Routes
	v0.SetupBookRoutes(app)
	v0.SetupHealthCheckRoute(app)

	v1.SetupBookRoutes(app)
	v1.SetupUserRoutes(app)

	v2.SetupUserRoutes(app)
	v2.SetupAuthRoutes(app)

	// Get port from environment variable or default to 8000
	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "8000"
	}

	// Start the Fiber app
	err = app.Listen(":" + port)
	if err != nil {
		log.Fatalf("Error starting the server: %v", err)
	}
}
```

This way, each version of your API routes is separated and can be independently managed within its versioned subdirectory.
