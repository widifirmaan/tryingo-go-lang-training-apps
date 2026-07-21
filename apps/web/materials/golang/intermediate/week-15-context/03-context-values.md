# Context Values

## WithValue

```go
type contextKey string

const requestIDKey contextKey = "request_id"

func main() {
    ctx := context.WithValue(
        context.Background(),
        requestIDKey,
        "req-123456",
    )
    handleRequest(ctx)
}

func handleRequest(ctx context.Context) {
    id := ctx.Value(requestIDKey).(string)
    fmt.Println("Processing request:", id)
}
```

## Custom Key Types

```go
// Define custom types to avoid collisions
type userKey struct{}
type traceKey struct{}
type authKey struct{}

func WithUser(ctx context.Context, user User) context.Context {
    return context.WithValue(ctx, userKey{}, user)
}

func GetUser(ctx context.Context) (User, bool) {
    user, ok := ctx.Value(userKey{}).(User)
    return user, ok
}

func WithTraceID(ctx context.Context, id string) context.Context {
    return context.WithValue(ctx, traceKey{}, id)
}

func GetTraceID(ctx context.Context) string {
    id, _ := ctx.Value(traceKey{}).(string)
    return id
}
```

## Middleware Pattern

```go
func AuthMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        user, err := validateToken(token)
        if err != nil {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        ctx := WithUser(r.Context(), user)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}

func TraceMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        traceID := r.Header.Get("X-Trace-ID")
        if traceID == "" {
            traceID = uuid.New().String()
        }
        ctx := WithTraceID(r.Context(), traceID)
        w.Header().Set("X-Trace-ID", traceID)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}
```

## Context Value Guidelines

| Do | Don't |
|----|-------|
| Use for request-scoped data | Store optional function parameters |
| Use for tracing/correlation IDs | Pass database connections |
| Use for auth/user info | Pass configuration objects |
| Use custom key types | Use string keys |

## Retrieving Values Safely

```go
func GetRequestID(ctx context.Context) (string, bool) {
    id, ok := ctx.Value(requestIDKey).(string)
    return id, ok
}

func RequireRequestID(ctx context.Context) string {
    id, ok := GetRequestID(ctx)
    if !ok {
        panic("request ID not found in context")
    }
    return id
}
```

## Exercises

1. **Request ID Middleware**: Create middleware that adds a unique request ID to each HTTP request context.

2. **User Context**: Store and retrieve authenticated user info from context in handlers.

3. **Logger with Context**: Build a logger that extracts trace ID from context and includes it in log output.

4. **Tenant Context**: Implement multi-tenant support by storing tenant ID in request context.
