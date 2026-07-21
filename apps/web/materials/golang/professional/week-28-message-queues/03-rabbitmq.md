# RabbitMQ

Enterprise messaging with RabbitMQ and AMQP protocol in Go.

## Connection and Channel Management

```go
import amqp "github.com/rabbitmq/amqp091-go"

type RabbitClient struct {
    conn    *amqp.Connection
    channel *amqp.Channel
}

func NewRabbitClient(url string) (*RabbitClient, error) {
    conn, err := amqp.DialConfig(url, amqp.Config{
        Heartbeat: 10 * time.Second,
        Locale:    "en_US",
    })
    if err != nil {
        return nil, err
    }
    ch, err := conn.Channel()
    if err != nil {
        conn.Close()
        return nil, err
    }
    return &RabbitClient{conn: conn, channel: ch}, nil
}
```

## Exchange and Queue Setup

```go
func (c *RabbitClient) SetupExchanges() error {
    exchanges := []struct {
        Name string
        Kind string
    }{
        {"orders.direct", "direct"},
        {"orders.topic", "topic"},
        {"orders.fanout", "fanout"},
    }
    for _, e := range exchanges {
        err := c.channel.ExchangeDeclare(
            e.Name, e.Kind, true, false, false, false, nil,
        )
        if err != nil {
            return err
        }
    }
    return nil
}

func (c *RabbitClient) SetupQueues() error {
    q, err := c.channel.QueueDeclare(
        "order.processing", true, false, false, false,
        amqp.Table{"x-dead-letter-exchange": "orders.dlx"},
    )
    if err != nil {
        return err
    }
    return c.channel.QueueBind(
        q.Name, "order.created", "orders.topic", false, nil,
    )
}
```

## Publishing with Confirms

```go
func (c *RabbitClient) PublishWithConfirm(ctx context.Context, exchange, key string, msg []byte) error {
    confirms := c.channel.NotifyPublish(make(chan amqp.Confirmation, 1))
    err := c.channel.PublishWithContext(ctx,
        exchange, key, true, false,
        amqp.Publishing{
            ContentType:  "application/json",
            DeliveryMode: amqp.Persistent,
            Body:         msg,
            Timestamp:    time.Now(),
        },
    )
    if err != nil {
        return err
    }
    select {
    case confirmed := <-confirms:
        if !confirmed.Ack {
            return fmt.Errorf("publish not confirmed")
        }
    case <-time.After(10 * time.Second):
        return fmt.Errorf("publish confirmation timeout")
    }
    return nil
}
```

## Consumer with QOS

```go
func (c *RabbitClient) Consume(concurrency int) (<-chan amqp.Delivery, error) {
    err := c.channel.Qos(concurrency, 0, false)
    if err != nil {
        return nil, err
    }
    return c.channel.Consume(
        "order.processing", "", false, false, false, false, nil,
    )
}
```

## Practice
1. Set up a dead letter exchange with retry logic
2. Implement RPC pattern using reply-to queues
3. Build a consumer with manual acknowledgments
