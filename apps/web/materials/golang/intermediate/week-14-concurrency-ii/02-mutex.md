# Mutex

## What is a Mutex?
Mutex (mutual exclusion) protects shared resources from concurrent access.

```go
import "sync"

type Counter struct {
    mu    sync.Mutex
    value int
}

func (c *Counter) Increment() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.value++
}

func (c *Counter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.value
}
```

## Using a Mutex

```go
func main() {
    var counter Counter
    var wg sync.WaitGroup

    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter.Increment()
        }()
    }

    wg.Wait()
    fmt.Println(counter.Value()) // 1000
}
```

## RWMutex (Read-Write Mutex)
Allows multiple readers or one writer.

```go
type SafeCache struct {
    mu   sync.RWMutex
    data map[string]string
}

func (c *SafeCache) Get(key string) (string, bool) {
    c.mu.RLock()
    defer c.mu.RUnlock()
    v, ok := c.data[key]
    return v, ok
}

func (c *SafeCache) Set(key, value string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.data[key] = value
}
```

## Mutex vs RWMutex

| Aspect | Mutex | RWMutex |
|--------|-------|---------|
| Readers block each other | Yes | No |
| Writer blocks readers | Yes | Yes |
| Writer blocks writers | Yes | Yes |
| Best for | Short critical sections | Read-heavy workloads |

## Common Pitfalls

```go
// WRONG: copy by value (copies mutex)
type Counter struct {
    mu    sync.Mutex
    value int
}

func process(c Counter) { // copies mutex — undefined behavior
    c.mu.Lock()
    defer c.mu.Unlock()
}

// CORRECT: use pointer
func process(c *Counter) {
    c.mu.Lock()
    defer c.mu.Unlock()
}

// WRONG: recursive locking
func (c *Counter) Bad() {
    c.mu.Lock()
    c.Increment() // tries to lock again — DEADLOCK
    c.mu.Unlock()
}
```

## Deadlock Prevention

```go
// Always lock in the same order
type Account struct {
    mu    sync.Mutex
    balance float64
}

func Transfer(a, b *Account, amount float64) {
    if a == b { return } // same account
    if a < b { // lock in order of address
        a.mu.Lock()
        b.mu.Lock()
    } else {
        b.mu.Lock()
        a.mu.Lock()
    }
    a.balance -= amount
    b.balance += amount
    a.mu.Unlock()
    b.mu.Unlock()
}
```

## Exercises

1. **Thread-Safe Counter**: Implement a counter that's safe for concurrent increment from 100 goroutines.

2. **Safe Map**: Build a thread-safe key-value store using `sync.RWMutex`.

3. **Bank Account**: Create a bank account system with deposit, withdraw, and balance operations, all thread-safe.

4. **Rate Limiter**: Implement a simple rate limiter using a mutex to track request counts per second.
