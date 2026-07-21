# Service Boundaries

Learn to identify and define proper service boundaries using Domain-Driven Design principles.

## Bounded Contexts

```go
// Order Context
type Order struct {
    ID        string
    CustomerID string
    Items     []OrderItem
    Status    OrderStatus
    Total     Money
}

// Payment Context (separate service)
type Payment struct {
    ID            string
    OrderID       string
    Amount        Money
    Method        PaymentMethod
    TransactionID string
}
```

## Identifying Boundaries

```go
// Bad: Leaky abstraction
type UserService struct {
    db *sql.DB
}

func (s *UserService) GetUserOrders(id string) []Order {
    // Crossing context boundary - don't do this
}

// Good: Clear boundary
type UserService struct {
    db            *sql.DB
    orderClient   OrderServiceClient
}
```

## Communication Between Services

```go
type OrderEvent struct {
    Type    EventType
    Payload json.RawMessage
    Version int
    Timestamp time.Time
}

// Async communication
func (s *OrderService) CreateOrder(ctx context.Context, req *CreateOrderRequest) error {
    order, err := s.repo.Save(ctx, req.ToOrder())
    if err != nil {
        return fmt.Errorf("save order: %w", err)
    }
    event := OrderEvent{
        Type:    OrderCreated,
        Payload: order.ToJSON(),
        Version: 1,
    }
    return s.eventBus.Publish(ctx, "orders", event)
}
```

## Data Ownership
- Each service owns its database
- Expose data through APIs only
- Use event-driven updates for cross-service data needs

## Practice
1. Design service boundaries for an e-commerce system
2. Identify aggregate roots in a domain model
3. Map out event flows between bounded contexts
