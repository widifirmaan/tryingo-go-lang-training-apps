# API Documentation

Generate and maintain comprehensive API documentation.

## Swagger/OpenAPI Generation

```go
// Package api provides REST API documentation.
//
// @title Order Management API
// @version 1.0.0
// @description API for managing customer orders
// @termsOfService https://example.com/terms

// @contact.name API Support
// @contact.url https://example.com/support
// @contact.email support@example.com

// @license.name MIT
// @license.url https://opensource.org/licenses/MIT

// @host api.example.com
// @BasePath /api/v1
// @schemes https

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description JWT token authentication
```

## Endpoint Documentation

```go
// CreateOrder creates a new order
//
// @Summary Create a new order
// @Description Create a new order with the provided items
// @Tags orders
// @Accept json
// @Produce json
// @Param request body CreateOrderRequest true "Order details"
// @Success 201 {object} OrderResponse
// @Failure 400 {object} ErrorResponse "Invalid request"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 500 {object} ErrorResponse "Internal error"
// @Router /orders [post]
// @Security BearerAuth
func (h *OrderHandler) CreateOrder(w http.ResponseWriter, r *http.Request) {
    // implementation
}

// ListOrders returns paginated orders
//
// @Summary List user orders
// @Description Returns a paginated list of orders
// @Tags orders
// @Accept json
// @Produce json
// @Param page query int false "Page number" default(1)
// @Param limit query int false "Items per page" default(20)
// @Success 200 {object} PaginatedResponse{data=[]OrderResponse}
// @Failure 401 {object} ErrorResponse
// @Router /orders [get]
// @Security BearerAuth
func (h *OrderHandler) ListOrders(w http.ResponseWriter, r *http.Request) {
    // implementation
}
```

## Generation Commands

```bash
# Install
go install github.com/swaggo/swag/cmd/swag@latest

# Generate
swag init -g cmd/server/main.go -o docs

# Serve
swag serve -p 8080 docs/swagger.json
```

## API Change Management

```go
// Versioning
type APIChange struct {
    Version    string
    Date       time.Time
    Change     string
    Breaking   bool
    Migration  string
}

var apiChangelog = []APIChange{
    {
        Version:  "2.0.0",
        Date:     time.Date(2026, 6, 1, 0, 0, 0, 0, time.UTC),
        Change:   "Removed deprecated /v1/orders endpoint",
        Breaking: true,
        Migration: "Use /v2/orders instead",
    },
}
```

## Practice
1. Add OpenAPI annotations to all endpoints
2. Generate Swagger UI documentation
3. Create an API versioning strategy
