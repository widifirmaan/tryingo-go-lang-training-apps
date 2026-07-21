# Microservice Patterns

Understand the fundamental patterns that make microservices successful in production.

## Key Patterns

### API Gateway
```go
type Gateway struct {
    userService  UserServiceClient
    orderService OrderServiceClient
    cache        *redis.Client
}

func (g *Gateway) HandleRequest(w http.ResponseWriter, r *http.Request) {
    user, err := g.userService.GetUser(r.Context(), &UserRequest{Id: userID})
    if err != nil {
        http.Error(w, "service unavailable", http.StatusServiceUnavailable)
        return
    }
    json.NewEncoder(w).Encode(user)
}
```

### Circuit Breaker
```go
type CircuitBreaker struct {
    failures    int
    threshold   int
    state       string // closed, open, half-open
    lastFailure time.Time
    mu          sync.RWMutex
}

func (cb *CircuitBreaker) Call(fn func() error) error {
    cb.mu.RLock()
    if cb.state == "open" && time.Since(cb.lastFailure) < 30*time.Second {
        cb.mu.RUnlock()
        return ErrCircuitOpen
    }
    cb.mu.RUnlock()
    err := fn()
    cb.mu.Lock()
    defer cb.mu.Unlock()
    if err != nil {
        cb.failures++
        cb.lastFailure = time.Now()
        if cb.failures >= cb.threshold {
            cb.state = "open"
        }
        return err
    }
    cb.failures = 0
    cb.state = "closed"
    return nil
}
```

### Service Discovery
```go
type Registrar struct {
    client *consul.Client
    id     string
    name   string
    port   int
}

func (r *Registrar) Register() error {
    reg := &consul.AgentServiceRegistration{
        ID:      r.id,
        Name:    r.name,
        Port:    r.port,
        Check: &consul.AgentServiceCheck{
            HTTP:     fmt.Sprintf("http://localhost:%d/health", r.port),
            Interval: "10s",
        },
    }
    return r.client.Agent().ServiceRegister(reg)
}
```

## Patterns to Avoid
- Shared databases between services
- Synchronous call chains
- Distributed monoliths

## Practice
1. Implement a retry mechanism with exponential backoff
2. Build a rate limiter middleware
3. Create a health check aggregator
