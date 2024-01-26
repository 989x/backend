# GoFiber Boilerplate

This is a simple boilerplate for building web applications using [GoFiber](https://github.com/gofiber/fiber) framework.

## Project Structure

```lua
gofiber-boilerplate
|-- src
|   |-- api
|       |-- configs
|       |-- handlers
|       |-- helpers
|       |-- middleware
|       |-- models
|       |-- routes
|   |-- .env
|   |-- go.mod
|   |-- go.sum
|   |-- main.go
|-- .gitignore
|-- ...dockerfile
|-- readme.md
|-- test.http
```

## Layers

### Layer 1

```lua
|-- src
|-- .gitignore
|-- ...dockerfile
|-- readme.md
|-- test.http
```

### Layer 2

```lua
|-- api
|-- .env
|-- go.mod
|-- go.sum
|-- main.go
```

### Layer 3

```lua
|-- configs
|-- handlers
|-- helpers
|-- middleware
|-- models
|-- routes
```

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/gofiber-boilerplate.git
    cd gofiber-boilerplate
    ```

2. Update the project dependencies:

    ```bash
    go mod tidy
    ```

3. Copy the sample environment file:

    ```bash
    cp .env.example .env
    ```

4. Modify the `.env` file with your configuration.

5. Run the application:

    ```bash
    go run main.go
    ```

## API Structure

- **configs:** Configuration files for the application.
- **handlers:** Request handlers for different endpoints.
- **helpers:** Utility functions and helper methods.
- **middleware:** Middleware functions to process requests.
- **models:** Data models and database-related structures.
- **routes:** API routes and endpoint definitions.

## Testing

The `test.http` file contains example requests for testing your API using the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension in Visual Studio Code.

## Contributing

Feel free to contribute to the development of this boilerplate by submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
