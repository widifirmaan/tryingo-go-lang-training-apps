# Documentation

Write effective Go documentation for users and contributors.

## Godoc Comments

```go
// Package order provides order management functionality.
//
// # Features
//
//   - Create, read, update, and delete orders
//   - Order status tracking
//   - Payment integration
//
// # Usage
//
//	svc := order.NewService(repo)
//	order, err := svc.CreateOrder(ctx, req)
package order

// Order represents a customer purchase order.
type Order struct {
    ID     string
    UserID string
    Items  []OrderItem
    Total  Money
    Status Status
}

// CreateOrder creates a new order and processes payment.
//
// It validates the request, creates the order, processes payment,
// and publishes an OrderCreated event.
//
// Returns ErrInvalidRequest if request validation fails.
// Returns ErrPaymentFailed if payment processing fails.
func (s *Service) CreateOrder(ctx context.Context, req CreateOrderRequest) (*Order, error) {
    // implementation
}

// Status constants for order lifecycle.
const (
    StatusPending   Status = "pending"
    StatusConfirmed Status = "confirmed"
    StatusShipped   Status = "shipped"
    StatusDelivered Status = "delivered"
    StatusCancelled Status = "cancelled"
)
```

## README Template

```markdown
# Project Name

Brief description of the project.

## Features
- Feature 1
- Feature 2
- Feature 3

## Quick Start

```bash
git clone https://github.com/user/project
cd project
make run
```

## Documentation

- [API Reference](docs/api.md)
- [Architecture](docs/architecture.md)
- [Contributing](CONTRIBUTING.md)

## License

MIT
```

## Example Documentation

```go
// ExampleOrder demonstrates order creation.
func ExampleOrder() {
    svc := NewService(nil)
    order, err := svc.CreateOrder(context.Background(), CreateOrderRequest{
        UserID: "user123",
        Items: []OrderItem{
            {ProductID: "prod1", Quantity: 2},
        },
    })
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("Order: %s", order.ID)
    // Output: Order: ...
}
```

## Practice
1. Add godoc comments to all exported types and functions
2. Write example tests for your packages
3. Create a comprehensive README
