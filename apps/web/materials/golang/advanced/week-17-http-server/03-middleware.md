# Middleware

Middleware wraps `http.Handler` to add cross-cutting behavior like logging, authentication, and recovery.

## Basic Middleware Pattern

```go
func middleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Pre-processing
        // Call the next handler
        next.ServeHTTP(w, r)
        // Post-processing
    })
}
```

## Common Middleware Examples

```go
func Logging(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    })
}

func Recovery(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if err := recover(); err != nil {
                log.Printf("panic recovered: %v", err)
                http.Error(w, "Internal server error", http.StatusInternalServerError)
            }
        }()
        next.ServeHTTP(w, r)
    })
}

func Auth(token string) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            if r.Header.Get("Authorization") != "Bearer "+token {
                http.Error(w, "Unauthorized", http.StatusUnauthorized)
                return
            }
            next.ServeHTTP(w, r)
        })
    }
}
```

## Chaining Middleware

```go
func Chain(h http.Handler, middlewares ...func(http.Handler) http.Handler) http.Handler {
    for i := len(middlewares) - 1; i >= 0; i-- {
        h = middlewares[i](h)
    }
    return h
}

func main() {
    handler := Chain(
        http.HandlerFunc(myHandler),
        Logging,
        Recovery,
        Auth("secret-token"),
    )
    http.ListenAndServe(":8080", handler)
}
```

## Context Values in Middleware

```go
type contextKey string

const UserKey contextKey = "user"

func AuthMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        user := extractUser(r)
        ctx := context.WithValue(r.Context(), UserKey, user)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}

func handler(w http.ResponseWriter, r *http.Request) {
    user := r.Context().Value(UserKey).(string)
    fmt.Fprintf(w, "Hello, %s!", user)
}
```

## Practice

1. Implement a rate limiting middleware
2. Build a CORS middleware that handles preflight requests
3. Create a request ID middleware that generates and propagates trace IDs
4. Build a compression middleware using `gzip`
