# Chi

Chi is a lightweight, idiomatic, composable router that's fully compatible with `net/http`.

## Getting Started

```go
package main

import (
    "net/http"
    "github.com/go-chi/chi/v5"
    "github.com/go-chi/chi/v5/middleware"
)

func main() {
    r := chi.NewRouter()

    r.Use(middleware.Logger)
    r.Use(middleware.Recoverer)

    r.Get("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Hello, World!"))
    })

    http.ListenAndServe(":8080", r)
}
```

## Routing

```go
r := chi.NewRouter()

// Path parameters
r.Get("/users/{id}", func(w http.ResponseWriter, r *http.Request) {
    id := chi.URLParam(r, "id")
    w.Write([]byte("User: " + id))
})

// Query parameters
r.Get("/search", func(w http.ResponseWriter, r *http.Request) {
    q := r.URL.Query().Get("q")
    w.Write([]byte("Search: " + q))
})

// Route groups
r.Route("/api", func(r chi.Router) {
    r.Use(authMiddleware)

    r.Get("/users", listUsers)
    r.Post("/users", createUser)
    r.Get("/users/{id}", getUser)
    r.Put("/users/{id}", updateUser)
    r.Delete("/users/{id}", deleteUser)
})
```

## Middleware

```go
func requestID(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        id := uuid.New().String()
        w.Header().Set("X-Request-ID", id)
        ctx := context.WithValue(r.Context(), "request_id", id)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}

func authMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        if token == "" {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        ctx := context.WithValue(r.Context(), "user", "authenticated")
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}

r.Use(requestID)
r.Group(func(r chi.Router) {
    r.Use(authMiddleware)
    r.Get("/api/protected", protectedHandler)
})
```

## Subrouters

```go
func usersRouter() chi.Router {
    r := chi.NewRouter()
    r.Get("/", listUsers)
    r.Post("/", createUser)
    r.Get("/{id}", getUser)
    r.Put("/{id}", updateUser)
    r.Delete("/{id}", deleteUser)

    r.Route("/{id}/posts", func(r chi.Router) {
        r.Get("/", listUserPosts)
        r.Post("/", createUserPost)
    })
    return r
}

func main() {
    r := chi.NewRouter()
    r.Mount("/api/users", usersRouter())
    http.ListenAndServe(":8080", r)
}
```

## Practice

1. Build a modular API with subrouters
2. Implement middleware that works with standard `net/http`
3. Create route groups with different middleware stacks
4. Build a REST API using Chi's idiomatic patterns
