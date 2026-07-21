# Clean Architecture

Structure Go applications following Clean Architecture principles.

## Layer Structure

```
myapp/
├── domain/           # Inner layer - enterprise business rules
│   ├── entity/
│   ├── repository/
│   ├── service/
│   └── errors/
├── application/      # Middle layer - use cases
│   ├── usecase/
│   ├── dto/
│   └── port/
├── infrastructure/  # Outer layer - external concerns
│   ├── persistence/
│   ├── messaging/
│   └── cache/
├── interfaces/      # Interface adapters
│   ├── handler/
│   ├── middleware/
│   └── presenter/
└── main.go
```

## Domain Layer

```go
package domain

// Entity
type Order struct {
    ID        string
    UserID    string
    Items     []OrderItem
    Status    OrderStatus
    Total     Money
    CreatedAt time.Time
}

type OrderItem struct {
    ProductID string
    Quantity  int
    Price     Money
}

// Value Object
type Money struct {
    Amount   float64
    Currency string
}

// Domain Service
type OrderService struct {
    repo OrderRepository
}

func (s *OrderService) CalculateTotal(items []OrderItem) Money {
    var total float64
    for _, item := range items {
        total += item.Price.Amount * float64(item.Quantity)
    }
    return Money{Amount: total, Currency: "USD"}
}

// Repository Interface
type OrderRepository interface {
    Save(ctx context.Context, order *Order) error
    FindByID(ctx context.Context, id string) (*Order, error)
    FindByUserID(ctx context.Context, userID string, page, limit int) ([]*Order, error)
}
```

## Application Layer (Use Cases)

```go
package application

type CreateOrderUseCase struct {
    orderRepo    domain.OrderRepository
    productRepo  domain.ProductRepository
    orderService domain.OrderService
}

type CreateOrderRequest struct {
    UserID string
    Items  []CreateOrderItem
}

type CreateOrderResponse struct {
    OrderID string
    Total   domain.Money
    Status  domain.OrderStatus
}

func (uc *CreateOrderUseCase) Execute(ctx context.Context, req CreateOrderRequest) (*CreateOrderResponse, error) {
    var items []domain.OrderItem
    for _, item := range req.Items {
        product, err := uc.productRepo.FindByID(ctx, item.ProductID)
        if err != nil {
            return nil, err
        }
        items = append(items, domain.OrderItem{
            ProductID: item.ProductID,
            Quantity:  item.Quantity,
            Price:     product.Price,
        })
    }
    total := uc.orderService.CalculateTotal(items)
    order := &domain.Order{
        ID:     uuid.New().String(),
        UserID: req.UserID,
        Items:  items,
        Total:  total,
        Status: domain.StatusPending,
    }
    if err := uc.orderRepo.Save(ctx, order); err != nil {
        return nil, err
    }
    return &CreateOrderResponse{
        OrderID: order.ID,
        Total:   order.Total,
        Status:  order.Status,
    }, nil
}
```

## Infrastructure Layer

```go
package persistence

type PostgresOrderRepo struct {
    db *sql.DB
}

func (r *PostgresOrderRepo) Save(ctx context.Context, order *domain.Order) error {
    tx, err := r.db.BeginTx(ctx, nil)
    if err != nil {
        return err
    }
    defer tx.Rollback()

    _, err = tx.ExecContext(ctx, `INSERT INTO orders ...`)
    if err != nil {
        return err
    }
    return tx.Commit()
}
```

## Dependencies Direction

```go
// Dependencies point INWARD:
// interfaces → application → domain
// infrastructure → application → domain
// domain never depends on outer layers
```

## Practice
1. Structure an existing app into Clean Architecture layers
2. Keep domain layer free of external dependencies
3. Write tests that use domain entities without infrastructure
