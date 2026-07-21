# Load Balancing

Design and implement load balancing strategies for Go services.

## Load Balancing Algorithms

```go
type LoadBalancer interface {
    Next(requests []Request) *Backend
}

type RoundRobin struct {
    backends []*Backend
    counter  int
    mu       sync.Mutex
}

func (lb *RoundRobin) Next(requests []Request) *Backend {
    lb.mu.Lock()
    defer lb.mu.Unlock()
    backend := lb.backends[lb.counter%len(lb.backends)]
    lb.counter++
    return backend
}

type LeastConnections struct {
    backends []*Backend
    mu       sync.RWMutex
}

func (lb *LeastConnections) Next(requests []Request) *Backend {
    lb.mu.RLock()
    defer lb.mu.RUnlock()
    var best *Backend
    min := math.MaxInt32
    for _, b := range lb.backends {
        if b.ActiveConnections < min {
            min = b.ActiveConnections
            best = b
        }
    }
    return best
}

type WeightedRoundRobin struct {
    backends []*WeightedBackend
    current  int
    mu       sync.Mutex
}

type WeightedBackend struct {
    *Backend
    Weight int
}
```

## Health-Based Routing

```go
type HealthAwareLB struct {
    backends []*Backend
    health   map[string]HealthStatus
}

func (lb *HealthAwareLB) Next(requests []Request) *Backend {
    healthy := lb.getHealthyBackends()
    if len(healthy) == 0 {
        return nil // no healthy backends
    }
    return healthy[rand.Intn(len(healthy))]
}

func (lb *HealthAwareLB) getHealthyBackends() []*Backend {
    var healthy []*Backend
    for _, b := range lb.backends {
        if lb.health[b.Addr] == Healthy {
            healthy = append(healthy, b)
        }
    }
    return healthy
}
```

## Connection Pooling

```go
type ConnectionPool struct {
    mu       sync.Mutex
    conns    []*grpc.ClientConn
    target   int
    max      int
    address  string
}

func (p *ConnectionPool) Get() (*grpc.ClientConn, error) {
    p.mu.Lock()
    defer p.mu.Unlock()

    if len(p.conns) > 0 {
        conn := p.conns[len(p.conns)-1]
        p.conns = p.conns[:len(p.conns)-1]
        return conn, nil
    }

    if len(p.conns) < p.max {
        conn, err := grpc.Dial(p.address, grpc.WithInsecure())
        if err != nil {
            return nil, err
        }
        return conn, nil
    }

    return nil, ErrNoAvailableConnection
}
```

## Practice
1. Implement consistent hashing load balancer
2. Build a health-checking proxy
3. Design a global load balancing strategy
