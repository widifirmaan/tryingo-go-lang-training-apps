# Echo

Echo is a high-performance, extensible, minimalistic web framework.

## Getting Started

```go
package main

import (
    "net/http"
    "github.com/labstack/echo/v4"
    "github.com/labstack/echo/v4/middleware"
)

func main() {
    e := echo.New()

    e.Use(middleware.Logger())
    e.Use(middleware.Recover())

    e.GET("/", func(c echo.Context) error {
        return c.String(http.StatusOK, "Hello, World!")
    })

    e.Logger.Fatal(e.Start(":8080"))
}
```

## Routing

```go
e := echo.New()

// Path parameters
e.GET("/users/:id", func(c echo.Context) error {
    id := c.Param("id")
    return c.String(200, "User: "+id)
})

// Query parameters
e.GET("/search", func(c echo.Context) error {
    q := c.QueryParam("q")
    page, _ := strconv.Atoi(c.QueryParam("page"))
    return c.JSON(200, map[string]interface{}{
        "query": q,
        "page":  page,
    })
})

// Route groups
api := e.Group("/api")
api.Use(middleware.KeyAuth(func(key string, c echo.Context) (bool, error) {
    return key == "valid-key", nil
}))

api.GET("/users", listUsers)
api.POST("/users", createUser)
api.GET("/users/:id", getUser)
```

## Request Binding

```go
type User struct {
    Name  string `json:"name" validate:"required"`
    Email string `json:"email" validate:"required,email"`
    Age   int    `json:"age" validate:"gte=0,lte=150"`
}

func createUser(c echo.Context) error {
    u := new(User)
    if err := c.Bind(u); err != nil {
        return echo.NewHTTPError(http.StatusBadRequest, err.Error())
    }
    if err := c.Validate(u); err != nil {
        return err
    }
    return c.JSON(http.StatusCreated, u)
}
```

## Custom Middleware

```go
func RequestID() echo.MiddlewareFunc {
    return func(next echo.HandlerFunc) echo.HandlerFunc {
        return func(c echo.Context) error {
            reqID := uuid.New().String()
            c.Set("request_id", reqID)
            c.Response().Header().Set("X-Request-ID", reqID)
            return next(c)
        }
    }
}
```

## Practice

1. Implement rate limiting middleware
2. Build a REST API for a task manager
3. Use Echo's built-in validation
4. Handle errors with custom HTTP error handler
