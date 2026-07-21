# Authentication Basics

Implement authentication and authorization patterns in Go.

## Session-Based Auth

```go
type SessionStore interface {
    Get(token string) (*Session, error)
    Set(session *Session) error
    Delete(token string) error
}

type Session struct {
    Token     string
    UserID    string
    ExpiresAt time.Time
    Data      map[string]interface{}
}

type AuthMiddleware struct {
    sessions SessionStore
}

func (m *AuthMiddleware) RequireAuth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        cookie, err := r.Cookie("session_token")
        if err != nil {
            http.Redirect(w, r, "/login", http.StatusFound)
            return
        }
        session, err := m.sessions.Get(cookie.Value)
        if err != nil || session.ExpiresAt.Before(time.Now()) {
            http.Redirect(w, r, "/login", http.StatusFound)
            return
        }
        ctx := context.WithValue(r.Context(), "user_id", session.UserID)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}
```

## API Key Auth

```go
func APIKeyMiddleware(validKeys map[string]bool) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            key := r.Header.Get("X-API-Key")
            if key == "" {
                key = r.URL.Query().Get("api_key")
            }
            if !validKeys[key] {
                http.Error(w, "unauthorized", http.StatusUnauthorized)
                return
            }
            next.ServeHTTP(w, r)
        })
    }
}
```

## Role-Based Access Control (RBAC)

```go
type Role string

const (
    RoleAdmin Role = "admin"
    RoleUser  Role = "user"
    RoleViewer Role = "viewer"
)

type Resource string

const (
    ResourceOrders  Resource = "orders"
    ResourceUsers   Resource = "users"
    ResourceReports Resource = "reports"
)

var permissions = map[Role]map[Resource][]string{
    RoleAdmin: {
        ResourceOrders:  {"create", "read", "update", "delete"},
        ResourceUsers:   {"create", "read", "update", "delete"},
        ResourceReports: {"read"},
    },
    RoleUser: {
        ResourceOrders: {"create", "read", "update"},
    },
    RoleViewer: {
        ResourceOrders: {"read"},
    },
}

func Authorize(role Role, resource Resource, action string) bool {
    perms, ok := permissions[role][resource]
    if !ok {
        return false
    }
    for _, p := range perms {
        if p == action {
            return true
        }
    }
    return false
}
```

## Practice
1. Implement OAuth2 authorization code flow
2. Build an RBAC middleware system
3. Create a permission management API
