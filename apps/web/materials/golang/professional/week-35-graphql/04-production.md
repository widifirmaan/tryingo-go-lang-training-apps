# GraphQL in Production

Production-ready GraphQL patterns including caching, security, and error handling.

## Query Complexity Limiting

```go
import "github.com/99designs/gqlgen/graphql/handler/extension"

srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))
srv.Use(extension.FixedComplexityLimit(1000))
```

## Depth Limiting

```go
srv.Use(extension.FixedDepthLimit(6))

// Custom depth analysis
type DepthLimit struct {
    MaxDepth int
}

func (d *DepthLimit) ExtensionName() string {
    return "DepthLimit"
}

func (d *DepthLimit) Validate(schema graphql.ExecutableSchema) error {
    return nil
}

func (d *DepthLimit) InterceptField(ctx context.Context, next graphql.Resolver) (interface{}, error) {
    depth := graphql.GetFieldContext(ctx).Depth
    if depth > d.MaxDepth {
        return nil, fmt.Errorf("query depth %d exceeds limit %d", depth, d.MaxDepth)
    }
    return next(ctx)
}
```

## Caching

```go
type CacheControl struct {
    MaxAge int
}

func CacheMiddleware(maxAge int) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            if r.Method == "GET" {
                w.Header().Set("Cache-Control", fmt.Sprintf("public, max-age=%d", maxAge))
            }
            next.ServeHTTP(w, r)
        })
    }
}
```

## Error Handling

```go
func (r *queryResolver) User(ctx context.Context, id string) (*models.User, error) {
    user, err := r.userService.GetUser(ctx, id)
    if err != nil {
        if errors.Is(err, ErrNotFound) {
            return nil, fmt.Errorf("user not found: %s", id)
        }
        return nil, fmt.Errorf("internal error")
    }
    return user, nil
}

// Custom error presenter
func ErrorPresenter(ctx context.Context, e gqlerror.ListedError) *gqlerror.Error {
    err := gqlerror.Errorf(e.Message)
    err.Extensions = map[string]interface{}{
        "code": "INTERNAL_ERROR",
    }
    if _, ok := e.Unwrap().(*NotFoundError); ok {
        err.Extensions["code"] = "NOT_FOUND"
    }
    return err
}
```

## Practice
1. Implement persisted queries for production
2. Add GraphQL rate limiting
3. Set up Apollo Studio tracing
