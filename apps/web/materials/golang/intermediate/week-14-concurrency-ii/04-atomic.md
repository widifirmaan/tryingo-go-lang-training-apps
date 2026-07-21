# Atomic Operations

## What is `sync/atomic`?
The `sync/atomic` package provides low-level atomic operations for lock-free concurrent programming.

## Atomic Counters

```go
import (
    "sync/atomic"
    "fmt"
)

var counter int64

func increment() {
    atomic.AddInt64(&counter, 1)
}

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            increment()
        }()
    }
    wg.Wait()
    fmt.Println(atomic.LoadInt64(&counter)) // 1000
}
```

## Load and Store

```go
var value int64

// Safe read
current := atomic.LoadInt64(&value)

// Safe write
atomic.StoreInt64(&value, 42)
```

## Compare and Swap (CAS)

```go
var flag int64

// Atomically set flag from 0 to 1
func tryAcquire() bool {
    return atomic.CompareAndSwapInt64(&flag, 0, 1)
}

// Returns true if flag was 0 (now set to 1)
// Returns false if flag was already 1
```

## Atomic Types (Go 1.19+)

```go
import "sync/atomic"

type Config struct {
    Host string
    Port int
}

var config atomic.Value // stores any type atomically

func SetConfig(cfg Config) {
    config.Store(cfg)
}

func GetConfig() Config {
    return config.Load().(Config)
}
```

## Atomic Int64 / Uint64 Helpers

| Function | Operation |
|----------|-----------|
| `AddInt64(ptr, delta)` | Add delta to *ptr |
| `LoadInt64(ptr)` | Return *ptr |
| `StoreInt64(ptr, val)` | Set *ptr = val |
| `SwapInt64(ptr, new)` | Return old, set new |
| `CompareAndSwapInt64(ptr, old, new)` | If *ptr == old, set new |

## Atomic vs Mutex

| Aspect | Atomic | Mutex |
|--------|--------|-------|
| Performance | Very fast (CPU instruction) | Slower (OS/goroutine scheduling) |
| Complexity | Simple operations only | Arbitrary critical sections |
| Use case | Counters, flags, stats | Complex shared state |
| Blocking | Non-blocking | Blocking |

## Real-World: Stats Collector

```go
type Stats struct {
    requests  atomic.Int64
    errors    atomic.Int64
    bytesSent atomic.Int64
}

func (s *Stats) RecordRequest(bytes int) {
    s.requests.Add(1)
    s.bytesSent.Add(int64(bytes))
}

func (s *Stats) RecordError() {
    s.errors.Add(1)
}

func (s *Stats) Snapshot() map[string]int64 {
    return map[string]int64{
        "requests": s.requests.Load(),
        "errors":   s.errors.Load(),
        "bytes":    s.bytesSent.Load(),
    }
}
```

## Atomic Pointer (Go 1.19+)

```go
type ServerConfig struct {
    Addr string
    Timeout time.Duration
}

var currentConfig atomic.Pointer[ServerConfig]

func UpdateConfig(cfg *ServerConfig) {
    currentConfig.Store(cfg)
}

func GetConfig() *ServerConfig {
    return currentConfig.Load()
}
```

## Exercises

1. **Atomic Counter**: Implement a counter using `atomic.Int64` and race it against a mutex-based counter.

2. **Connection Pool Stats**: Track active connections, total created, errors using atomic values.

3. **Spin Lock**: Implement a simple spin lock using `atomic.CompareAndSwapInt32`.

4. **Live Config**: Build a configuration system where config pointer is switched atomically without locking.
