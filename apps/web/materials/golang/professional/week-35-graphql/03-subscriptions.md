# GraphQL Subscriptions

Real-time data with GraphQL subscriptions in Go.

## WebSocket Transport

```go
import (
    "github.com/99designs/gqlgen/graphql/handler"
    "github.com/99designs/gqlgen/graphql/handler/transport"
    "github.com/gorilla/websocket"
)

func main() {
    srv := handler.New(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

    srv.AddTransport(transport.Websocket{
        KeepAlivePingInterval: 10 * time.Second,
        Upgrader: websocket.Upgrader{
            CheckOrigin: func(r *http.Request) bool {
                return true
            },
        },
    })
    srv.AddTransport(transport.Options{})
    srv.AddTransport(transport.GET{})
    srv.AddTransport(transport.POST{})

    http.Handle("/query", srv)
    http.ListenAndServe(":8080", nil)
}
```

## Subscription Resolver

```go
type Resolver struct {
    mu          sync.RWMutex
    userCreated chan *models.User
    orderUpdated chan *models.Order
    observers    map[string]chan<- interface{}
}

func (r *Resolver) UserCreated(ctx context.Context) (<-chan *models.User, error) {
    userCh := make(chan *models.User, 1)
    go func() {
        <-ctx.Done()
        r.mu.Lock()
        delete(r.observers, "user_created")
        r.mu.Unlock()
    }()
    r.mu.Lock()
    r.observers["user_created"] = userCh
    r.mu.Unlock()
    return userCh, nil
}

func (r *Resolver) OrderUpdated(ctx context.Context, userID string) (<-chan *models.Order, error) {
    ch := make(chan *models.Order, 1)
    go func() {
        <-ctx.Done()
        close(ch)
    }()
    r.mu.Lock()
    r.observers[fmt.Sprintf("order_%s", userID)] = ch
    r.mu.Unlock()
    return ch, nil
}
```

## Publishing Events

```go
func (r *Resolver) PublishUserCreated(user *models.User) {
    r.mu.RLock()
    ch := r.observers["user_created"]
    r.mu.RUnlock()
    if ch != nil {
        select {
        case ch <- user:
        default:
            slog.Warn("dropping subscription event: slow consumer")
        }
    }
}
```

## Subscription Schema

```graphql
type Subscription {
    userCreated: User!
    orderUpdated(userId: ID!): Order!
    notification(userId: ID!): Notification!
}
```

## Practice
1. Build a real-time notification system
2. Implement filtering in subscriptions
3. Add subscription authentication
