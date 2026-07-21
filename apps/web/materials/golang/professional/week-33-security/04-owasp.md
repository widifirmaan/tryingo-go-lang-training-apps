# OWASP Security

Apply OWASP Top 10 security practices in Go applications.

## SQL Injection Prevention

```go
// Bad: string concatenation
query := fmt.Sprintf("SELECT * FROM users WHERE id = '%s'", userInput)

// Good: parameterized queries
row := db.QueryRow("SELECT * FROM users WHERE id = $1", userInput)

// Good: using ORM query builders
db.Where("id = ?", userInput).First(&user)
```

## XSS Prevention

```go
import "html/template"

func renderPage(w http.ResponseWriter, data interface{}) {
    tmpl := template.Must(template.New("page").Parse(`<div>{{.UserInput}}</div>`))
    tmpl.Execute(w, data) // auto-escapes HTML
}

// For HTML that must be trusted
type SafeHTML string

func (s SafeHTML) HTML() template.HTML {
    return template.HTML(s) // only use with sanitized content
}
```

## CSRF Protection

```go
import "github.com/gorilla/csrf"

func main() {
    r := mux.NewRouter()
    r.Use(csrf.Protect(
        []byte("32-byte-long-auth-key"),
        csrf.Secure(true),
        csrf.Path("/"),
    ))
}

// Include CSRF token in forms
// <input type="hidden" name="gorilla.csrf.Token" value="{{.csrfToken}}">
```

## Secure Headers Middleware

```go
func SecureHeadersMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("X-Content-Type-Options", "nosniff")
        w.Header().Set("X-Frame-Options", "DENY")
        w.Header().Set("X-XSS-Protection", "0")
        w.Header().Set("Strict-Transport-Security", "max-age=63072000; includeSubDomains")
        w.Header().Set("Content-Security-Policy",
            "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'")
        w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")
        w.Header().Set("Permissions-Policy", "camera=(), microphone=()")
        next.ServeHTTP(w, r)
    })
}
```

## Rate Limiting

```go
type RateLimiter struct {
    visitors map[string]*visitor
    mu       sync.Mutex
    rate     rate.Limit
    burst    int
}

type visitor struct {
    limiter  *rate.Limiter
    lastSeen time.Time
}

func (rl *RateLimiter) Allow(ip string) bool {
    rl.mu.Lock()
    defer rl.mu.Unlock()
    v, exists := rl.visitors[ip]
    if !exists {
        v = &visitor{limiter: rate.NewLimiter(rl.rate, rl.burst)}
        rl.visitors[ip] = v
    }
    v.lastSeen = time.Now()
    return v.limiter.Allow()
}
```

## Dependency Security

```go
// Check for vulnerabilities
// go install golang.org/x/vuln/cmd/govulncheck@latest
// govulncheck ./...
```

## Practice
1. Security audit a Go web application
2. Implement CSRF tokens for API endpoints
3. Add input sanitization for user content
