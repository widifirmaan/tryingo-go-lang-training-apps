# NATS

Lightweight, high-performance messaging with NATS in Go.

## Connecting and Publishing

```go
import "github.com/nats-io/nats.go"

func main() {
    nc, err := nats.Connect(nats.DefaultURL,
        nats.Name("order-service"),
        nats.ReconnectWait(2*time.Second),
        nats.MaxReconnects(10),
    )
    if err != nil {
        log.Fatal(err)
    }
    defer nc.Close()

    // Publish
    data, _ := json.Marshal(Order{Created: time.Now()})
    if err := nc.Publish("orders.created", data); err != nil {
        log.Printf("publish error: %v", err)
    }

    // Request-Reply
    msg, err := nc.Request("orders.validate", data, 5*time.Second)
    if err != nil {
        log.Printf("request timeout: %v", err)
    }
    log.Printf("response: %s", string(msg.Data))
}
```

## Subscribing

```go
func main() {
    nc, _ := nats.Connect(nats.DefaultURL)

    // Queue group (competing consumers)
    nc.QueueSubscribe("orders.created", "order-workers", func(msg *nats.Msg) {
        var order Order
        json.Unmarshal(msg.Data, &order)
        log.Printf("processing order: %+v", order)
        msg.Ack()
    })

    // Wildcard subscriptions
    nc.Subscribe("orders.*", func(msg *nats.Msg) {
        log.Printf("order event on %s: %s", msg.Subject, string(msg.Data))
    })

    // JetStream for persistence
    js, _ := nc.JetStream()
    js.Subscribe("orders", func(msg *nats.Msg) {
        log.Printf("JetStream message: %s", string(msg.Data))
        msg.Ack()
    }, nats.Durable("order-processor"), nats.MaxDeliver(3))
}
```

## JetStream (Persistent Messaging)

```go
func setupJetStream(nc *nats.Conn) (nats.JetStreamContext, error) {
    js, err := nc.JetStream()
    if err != nil {
        return nil, err
    }
    // Create stream
    _, err = js.AddStream(&nats.StreamConfig{
        Name:      "ORDERS",
        Subjects:  []string{"orders.>"},
        Storage:   nats.FileStorage,
        MaxAge:    24 * time.Hour,
        Replicas:  3,
    })
    return js, err
}

func publishOrder(js nats.JetStreamContext, order Order) error {
    data, _ := json.Marshal(order)
    _, err := js.Publish("orders.created", data)
    return err
}
```

## Practice
1. Set up a NATS cluster with JetStream
2. Implement exactly-once delivery pattern
3. Build a key-value store using NATS KV
