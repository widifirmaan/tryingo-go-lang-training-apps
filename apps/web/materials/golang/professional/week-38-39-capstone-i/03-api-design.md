# API Design

Design comprehensive APIs for your capstone project.

## RESTful API Design

```go
type APIEndpoint struct {
    Method      string
    Path        string
    Description string
    Auth        bool
    RateLimit   int
    Request     interface{}
    Response    interface{}
    Errors      []APIError
}

type APIError struct {
    Status  int
    Code    string
    Message string
}

var endpoints = []APIEndpoint{
    {
        Method: "POST",
        Path:   "/api/v1/users",
        Description: "Create a new user",
        Auth:   false,
        RateLimit: 10,
        Request: CreateUserRequest{},
        Response: UserResponse{},
    },
    {
        Method: "GET",
        Path:   "/api/v1/users/:id",
        Description: "Get user by ID",
        Auth:   true,
        RateLimit: 100,
        Request: nil,
        Response: UserResponse{},
    },
    {
        Method: "GET",
        Path:   "/api/v1/products",
        Description: "Search products",
        Auth:   false,
        RateLimit: 60,
        Request: ProductSearchRequest{},
        Response: ProductSearchResponse{},
    },
}
```

## Request/Response Types

```go
type CreateUserRequest struct {
    Email    string `json:"email" validate:"required,email"`
    Password string `json:"password" validate:"required,min=8"`
    Name     string `json:"name" validate:"required"`
}

type UserResponse struct {
    ID        string    `json:"id"`
    Email     string    `json:"email"`
    Name      string    `json:"name"`
    CreatedAt time.Time `json:"created_at"`
}

type PaginatedResponse struct {
    Data       interface{} `json:"data"`
    Page       int         `json:"page"`
    PerPage    int         `json:"per_page"`
    Total      int64       `json:"total"`
    TotalPages int         `json:"total_pages"`
}

type ErrorResponse struct {
    Error   string            `json:"error"`
    Code    string            `json:"code"`
    Details map[string]string `json:"details,omitempty"`
}
```

## OpenAPI/Swagger Generation

```go
//go:generate swag init -g cmd/server/main.go -o docs

// @title E-Commerce API
// @version 1.0
// @description Production e-commerce platform API

// @contact.name API Support
// @contact.email support@example.com

// @license.name MIT

// @host api.example.com
// @BasePath /api/v1

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
```

## Practice
1. Design complete REST API for your capstone
2. Generate OpenAPI specification
3. Add request validation with struct tags
