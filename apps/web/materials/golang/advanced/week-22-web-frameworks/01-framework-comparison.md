# Framework Comparison

Choosing the right web framework depends on your project requirements.

## Gin

```go
package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()

    r.GET("/users", func(c *gin.Context) {
        c.JSON(200, gin.H{"users": []string{"Alice", "Bob"}})
    })

    r.POST("/users", func(c *gin.Context) {
        var user struct {
            Name string `json:"name" binding:"required"`
        }
        if err := c.ShouldBindJSON(&user); err != nil {
            c.JSON(400, gin.H{"error": err.Error()})
            return
        }
        c.JSON(201, user)
    })

    r.Run(":8080")
}
```

## Echo

```go
package main

import "github.com/labstack/echo/v4"

func main() {
    e := echo.New()

    e.GET("/users", func(c echo.Context) error {
        return c.JSON(200, map[string]interface{}{
            "users": []string{"Alice", "Bob"},
        })
    })

    e.POST("/users", func(c echo.Context) error {
        user := new(struct {
            Name string `json:"name"`
        })
        if err := c.Bind(user); err != nil {
            return c.JSON(400, map[string]string{"error": err.Error()})
        }
        return c.JSON(201, user)
    })

    e.Logger.Fatal(e.Start(":8080"))
}
```

## Chi

```go
package main

import (
    "encoding/json"
    "net/http"
    "github.com/go-chi/chi/v5"
)

func main() {
    r := chi.NewRouter()

    r.Get("/users", func(w http.ResponseWriter, r *http.Request) {
        json.NewEncoder(w).Encode(map[string]interface{}{
            "users": []string{"Alice", "Bob"},
        })
    })

    r.Post("/users", func(w http.ResponseWriter, r *http.Request) {
        var user struct {
            Name string `json:"name"`
        }
        json.NewDecoder(r.Body).Decode(&user)
        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(user)
    })

    http.ListenAndServe(":8080", r)
}
```

## Key Differences

| Aspect | Gin | Echo | Chi |
|--------|-----|------|-----|
| Handler signature | `gin.HandlerFunc` | `echo.HandlerFunc` | `http.HandlerFunc` |
| Context | `*gin.Context` | `echo.Context` | `http.ResponseWriter` + `*http.Request` |
| Error handling | `c.JSON(code, err)` | `return err` | Standard HTTP |
| Validation | Binding + validation | Built-in binding | Manual |
| Middleware | `gin.HandlerFunc` | `echo.MiddlewareFunc` | `func(http.Handler) http.Handler` |

## Practice

1. Port a standard library handler to all three frameworks
2. Compare error handling approaches
3. Evaluate middleware portability
4. Test request validation in each framework
