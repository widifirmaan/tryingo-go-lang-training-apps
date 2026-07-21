# Queue Concepts

Fundamental messaging patterns and concepts for distributed systems.

## Core Patterns

### Point-to-Point (Work Queue)
```go
type WorkQueue struct {
    jobs     chan Job
    workers  int
    done     chan bool
}

func (q *WorkQueue) Start() {
    for i := 0; i < q.workers; i++ {
        go q.worker(i)
    }
}

func (q *WorkQueue) worker(id int) {
    for job := range q.jobs {
        log.Printf("worker %d processing job %s", id, job.ID)
        if err := job.Process(); err != nil {
            log.Printf("worker %d failed: %v", id, err)
        }
    }
    q.done <- true
}
```

### Pub/Sub
```go
type EventBus struct {
    subscribers map[string][]chan Event
    mu          sync.RWMutex
}

func (b *EventBus) Subscribe(topic string) <-chan Event {
    b.mu.Lock()
    defer b.mu.Unlock()
    ch := make(chan Event, 100)
    b.subscribers[topic] = append(b.subscribers[topic], ch)
    return ch
}

func (b *EventBus) Publish(topic string, event Event) {
    b.mu.RLock()
    defer b.mu.RUnlock()
    for _, ch := range b.subscribers[topic] {
        select {
        case ch <- event:
        default:
            log.Printf("dropping event on %s: slow consumer", topic)
        }
    }
}
```

### Message Reliability
```go
type DeliveryGuarantee int

const (
    AtMostOnce  DeliveryGuarantee = iota
    AtLeastOnce
    ExactlyOnce
)

type Message struct {
    ID        string
    Payload   []byte
    Ack       func() error
    Nack      func() error
    Redeliver bool
}
```

## Practice
1. Implement a priority queue pattern
2. Build a dead letter queue handler
3. Create a message deduplication system
