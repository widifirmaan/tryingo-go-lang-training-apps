# CQRS

Implement Command Query Responsibility Segregation in Go.

## Command Side

```go
type CreateOrderCommand struct {
    UserID string
    Items  []OrderItem
}

type CommandHandler interface {
    Handle(ctx context.Context, cmd interface{}) error
}

type CreateOrderHandler struct {
    eventStore EventStore
    eventBus   EventBus
}

func (h *CreateOrderHandler) Handle(ctx context.Context, cmd CreateOrderCommand) error {
    aggregate := NewOrderAggregate(uuid.New().String())
    for _, item := range cmd.Items {
        aggregate.AddItem(item.ProductID, item.Quantity, item.Price)
    }
    aggregate.Confirm()
    if err := h.eventStore.Save(ctx, aggregate.GetChanges()); err != nil {
        return err
    }
    for _, event := range aggregate.GetChanges() {
        h.eventBus.Publish(ctx, event.Type, event)
    }
    return nil
}
```

## Query Side

```go
type OrderQuery struct {
    UserID string
    Status string
    Page   int
    Limit  int
}

type OrderReadModel struct {
    ID        string
    UserID    string
    Status    string
    Total     float64
    ItemCount int
    CreatedAt time.Time
}

type OrderQueryHandler struct {
    readDB *sql.DB
}

func (h *OrderQueryHandler) Handle(ctx context.Context, query OrderQuery) (*PaginatedResult[OrderReadModel], error) {
    offset := (query.Page - 1) * query.Limit
    rows, err := h.readDB.QueryContext(ctx, `
        SELECT id, user_id, status, total, item_count, created_at
        FROM order_read_model
        WHERE ($1 = '' OR user_id = $1)
        AND ($2 = '' OR status = $2)
        ORDER BY created_at DESC
        LIMIT $3 OFFSET $4`,
        query.UserID, query.Status, query.Limit, offset,
    )
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var orders []OrderReadModel
    for rows.Next() {
        var o OrderReadModel
        rows.Scan(&o.ID, &o.UserID, &o.Status, &o.Total, &o.ItemCount, &o.CreatedAt)
        orders = append(orders, o)
    }
    return &PaginatedResult[OrderReadModel]{
        Data:  orders,
        Total: len(orders),
        Page:  query.Page,
    }, nil
}
```

## Synchronization

```go
type OrderProjector struct {
    eventStore EventStore
    readDB     *sql.DB
}

func (p *OrderProjector) HandleEvent(ctx context.Context, event Event) error {
    switch event.Type {
    case "OrderCreated":
        var data OrderCreated
        json.Unmarshal(event.Data, &data)
        _, err := p.readDB.ExecContext(ctx, `
            INSERT INTO order_read_model (id, user_id, status, total, item_count, created_at)
            VALUES ($1, $2, $3, $4, $5, $6)`,
            event.AggregateID, data.UserID, "pending", data.Total, data.ItemCount, event.Timestamp,
        )
        return err
    case "OrderConfirmed":
        _, err := p.readDB.ExecContext(ctx,
            "UPDATE order_read_model SET status = 'confirmed' WHERE id = $1",
            event.AggregateID,
        )
        return err
    }
    return nil
}
```

## Practice
1. Separate command and query handlers
2. Implement separate read/write databases
3. Create event-based synchronization
