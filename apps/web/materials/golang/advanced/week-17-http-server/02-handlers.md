# Handlers

Handlers are the core building block of HTTP servers in Go.

## Custom Handler Types

```go
type UserHandler struct {
    db *sql.DB
}

func (h *UserHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
    case http.MethodGet:
        h.listUsers(w, r)
    case http.MethodPost:
        h.createUser(w, r)
    default:
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    }
}

func (h *UserHandler) listUsers(w http.ResponseWriter, r *http.Request) {
    // implementation
}

func (h *UserHandler) createUser(w http.ResponseWriter, r *http.Request) {
    // implementation
}
```

## HandlerFunc Adapter

```go
func loggingHandler(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("%s %s", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}
```

## Request Context

```go
func handler(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()

    // Pass context to downstream operations
    result, err := queryDatabase(ctx, "SELECT ...")
    if err != nil {
        log.Printf("error: %v", err)
        http.Error(w, "Internal error", http.StatusInternalServerError)
        return
    }

    fmt.Fprintf(w, "Result: %s", result)
}
```

## Path Parameters (Go 1.22+)

```go
func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("GET /users/{id}", func(w http.ResponseWriter, r *http.Request) {
        id := r.PathValue("id")
        fmt.Fprintf(w, "User ID: %s", id)
    })
    http.ListenAndServe(":8080", mux)
}
```

## Practice

1. Create a handler that reads JSON request bodies
2. Implement a handler that uses URL path parameters
3. Build a handler that cancels requests using context
4. Create a handler that streams large responses
