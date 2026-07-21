# Event Sourcing

Implement event sourcing patterns for audit trails and state reconstruction.

## Event Store

```go
type Event struct {
    ID        string
    AggregateID string
    Type      string
    Data      json.RawMessage
    Version   int
    Timestamp time.Time
    Metadata  map[string]string
}

type EventStore interface {
    Save(ctx context.Context, events []Event) error
    GetByAggregate(ctx context.Context, aggregateID string) ([]Event, error)
    GetByType(ctx context.Context, eventType string, since time.Time) ([]Event, error)
    GetByRange(ctx context.Context, from, to time.Time) ([]Event, error)
}

type PostgresEventStore struct {
    db *sql.DB
}

func (s *PostgresEventStore) Save(ctx context.Context, events []Event) error {
    tx, err := s.db.BeginTx(ctx, nil)
    if err != nil {
        return err
    }
    defer tx.Rollback()

    for _, event := range events {
        _, err := tx.ExecContext(ctx, `
            INSERT INTO events (id, aggregate_id, type, data, version, timestamp, metadata)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            event.ID, event.AggregateID, event.Type, event.Data,
            event.Version, event.Timestamp, event.Metadata,
        )
        if err != nil {
            return err
        }
    }
    return tx.Commit()
}
```

## Aggregate Root

```go
type OrderAggregate struct {
    ID      string
    Version int
    items   []OrderItem
    status  OrderStatus
    changes []Event
}

func (a *OrderAggregate) AddItem(productID string, quantity int, price float64) error {
    if a.status != StatusPending {
        return ErrOrderAlreadyConfirmed
    }
    a.items = append(a.items, OrderItem{
        ProductID: productID,
        Quantity:  quantity,
        Price:     price,
    })
    a.changes = append(a.changes, Event{
        AggregateID: a.ID,
        Type:        "ItemAdded",
        Data:        marshal(ItemAdded{ProductID: productID, Quantity: quantity, Price: price}),
        Version:     a.Version + len(a.changes) + 1,
    })
    return nil
}

func (a *OrderAggregate) Apply(event Event) {
    switch event.Type {
    case "ItemAdded":
        var data ItemAdded
        json.Unmarshal(event.Data, &data)
        a.items = append(a.items, OrderItem{
            ProductID: data.ProductID,
            Quantity:  data.Quantity,
            Price:     data.Price,
        })
    case "OrderConfirmed":
        a.status = StatusConfirmed
    }
}
```

## Projections

```go
type OrderProjection struct {
    store EventStore
    db    *sql.DB
    pos   int64
}

func (p *OrderProjection) Rebuild(ctx context.Context) error {
    events, err := p.store.GetByRange(ctx, time.Time{}, time.Now())
    if err != nil {
        return err
    }
    for _, event := range events {
        if err := p.apply(event); err != nil {
            return err
        }
    }
    return nil
}

func (p *OrderProjection) apply(event Event) error {
    switch event.Type {
    case "OrderCreated":
        _, err := p.db.ExecContext(ctx,
            "INSERT INTO order_read_model (id, status, total) VALUES ($1, $2, $3)",
            event.AggregateID, "pending", 0)
        return err
    }
    return nil
}
```

## Practice
1. Build an event store with PostgreSQL
2. Implement aggregate root with event sourcing
3. Create a read model projection
