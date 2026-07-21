# Core Features

Implement the core business features of your capstone.

## Service Layer

```go
type OrderService struct {
    repo    OrderRepository
    product ProductServiceClient
    payment PaymentServiceClient
    event   EventBus
}

func (s *OrderService) CreateOrder(ctx context.Context, req CreateOrderRequest) (*Order, error) {
    // Validate products
    products, err := s.product.ValidateProducts(ctx, req.Items)
    if err != nil {
        return nil, fmt.Errorf("validate products: %w", err)
    }

    // Calculate total
    total := calculateTotal(products, req.Items)

    // Create order
    order := &Order{
        ID:        uuid.New().String(),
        UserID:    req.UserID,
        Items:     req.Items,
        Total:     total,
        Status:    OrderStatusPending,
        CreatedAt: time.Now(),
    }

    if err := s.repo.Create(ctx, order); err != nil {
        return nil, fmt.Errorf("create order: %w", err)
    }

    // Process payment
    payment, err := s.payment.Process(ctx, PaymentRequest{
        OrderID: order.ID,
        Amount:  total,
        Method:  req.PaymentMethod,
    })
    if err != nil {
        order.Status = OrderStatusFailed
        s.repo.Update(ctx, order)
        return nil, fmt.Errorf("payment failed: %w", err)
    }

    order.PaymentID = payment.ID
    order.Status = OrderStatusConfirmed

    if err := s.repo.Update(ctx, order); err != nil {
        return nil, err
    }

    // Publish event
    s.event.Publish(ctx, "order.created", order)

    return order, nil
}
```

## Handler Layer

```go
type OrderHandler struct {
    service *OrderService
}

func (h *OrderHandler) CreateOrder(w http.ResponseWriter, r *http.Request) {
    var req CreateOrderRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "invalid request", http.StatusBadRequest)
        return
    }

    claims := r.Context().Value("claims").(*Claims)
    req.UserID = claims.UserID

    order, err := h.service.CreateOrder(r.Context(), req)
    if err != nil {
        handleError(w, err)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(order)
}
```

## Router Setup

```go
func NewRouter(
    userHandler *handler.UserHandler,
    orderHandler *handler.OrderHandler,
    authMiddleware func(http.Handler) http.Handler,
) http.Handler {
    mux := http.NewServeMux()

    // Public routes
    mux.Handle("POST /api/v1/auth/login", userHandler.Login)
    mux.Handle("POST /api/v1/users", userHandler.Create)

    // Protected routes
    protected := authMiddleware(mux)

    mux.Handle("GET /api/v1/users/{id}", userHandler.GetByID)
    mux.Handle("POST /api/v1/orders", orderHandler.Create)
    mux.Handle("GET /api/v1/orders/{id}", orderHandler.GetByID)

    // Health
    mux.Handle("GET /health", healthHandler)

    return middleware.Chain(
        middleware.Logger,
        middleware.Recovery,
        middleware.CORS,
        middleware.RequestID,
    )(protected)
}
```

## Practice
1. Implement all service layer logic
2. Wire up handlers and routes
3. Add input validation and error handling
