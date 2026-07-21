# HTTP Testing with httptest

`httptest` provides utilities for testing HTTP servers and clients.

## Testing Handlers

```go
package main

import (
    "encoding/json"
    "net/http"
    "net/http/httptest"
    "testing"
)

func TestGetUserHandler(t *testing.T) {
    // Create a request
    req := httptest.NewRequest("GET", "/users/42", nil)
    rec := httptest.NewRecorder()

    // Call handler
    handler(rec, req)

    // Assert response
    if rec.Code != http.StatusOK {
        t.Errorf("expected status 200, got %d", rec.Code)
    }

    var user User
    if err := json.NewDecoder(rec.Body).Decode(&user); err != nil {
        t.Fatalf("failed to decode: %v", err)
    }

    if user.ID != 42 {
        t.Errorf("expected user ID 42, got %d", user.ID)
    }
}
```

## Testing Middleware

```go
func TestAuthMiddleware(t *testing.T) {
    tests := []struct {
        name       string
        authHeader string
        wantStatus int
    }{
        {"valid token", "Bearer valid-token", http.StatusOK},
        {"missing token", "", http.StatusUnauthorized},
        {"invalid token", "Bearer wrong", http.StatusUnauthorized},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            handler := AuthMiddleware("valid-token")(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
                w.WriteHeader(http.StatusOK)
            }))

            req := httptest.NewRequest("GET", "/", nil)
            if tt.authHeader != "" {
                req.Header.Set("Authorization", tt.authHeader)
            }
            rec := httptest.NewRecorder()

            handler.ServeHTTP(rec, req)

            if rec.Code != tt.wantStatus {
                t.Errorf("expected status %d, got %d", tt.wantStatus, rec.Code)
            }
        })
    }
}
```

## Testing HTTP Client

```go
func TestAPIClient(t *testing.T) {
    // Create a test server
    server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        switch r.URL.Path {
        case "/users":
            json.NewEncoder(w).Encode([]User{{ID: 1, Name: "John"}})
        case "/users/1":
            json.NewEncoder(w).Encode(User{ID: 1, Name: "John"})
        default:
            w.WriteHeader(http.StatusNotFound)
        }
    }))
    defer server.Close()

    // Use test server URL
    client := NewAPIClient(server.URL, "test-token")

    users, err := client.GetUsers()
    if err != nil {
        t.Fatalf("failed to get users: %v", err)
    }
    if len(users) != 1 {
        t.Errorf("expected 1 user, got %d", len(users))
    }
}
```

## Testing with Response Time

```go
func TestSlowEndpoint(t *testing.T) {
    handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        time.Sleep(100 * time.Millisecond)
        w.WriteHeader(http.StatusOK)
    })

    req := httptest.NewRequest("GET", "/slow", nil)
    rec := httptest.NewRecorder()

    start := time.Now()
    handler.ServeHTTP(rec, req)
    elapsed := time.Since(start)

    if elapsed < 100*time.Millisecond {
        t.Errorf("expected at least 100ms, got %v", elapsed)
    }
}
```

## Practice

1. Test a complete CRUD API with httptest
2. Write tests for middleware that modifies response
3. Test request body validation in handlers
4. Create a test helper that generates HTTP test cases
