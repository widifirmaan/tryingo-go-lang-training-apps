# Timers & Tickers

## Timer Basics
A `Timer` sends a value on its channel after a specified duration.

```go
timer := time.NewTimer(2 * time.Second)

<-timer.C // blocks for 2 seconds
fmt.Println("Timer fired!")
```

## Timer Methods

```go
timer := time.NewTimer(10 * time.Second)

// Stop the timer (returns false if already expired)
if timer.Stop() {
    fmt.Println("Timer stopped before firing")
}

// Reset an existing timer
timer.Reset(5 * time.Second)
```

## Timer Use Case: Timeout

```go
func fetchWithTimeout(url string, timeout time.Duration) (*http.Response, error) {
    result := make(chan *http.Response, 1)
    
    go func() {
        resp, err := http.Get(url)
        if err != nil {
            return
        }
        result <- resp
    }()

    select {
    case resp := <-result:
        return resp, nil
    case <-time.After(timeout):
        return nil, fmt.Errorf("timeout after %v", timeout)
    }
}
```

## Ticker Basics
A `Ticker` sends values on its channel at regular intervals.

```go
ticker := time.NewTicker(1 * time.Second)

for i := 0; i < 5; i++ {
    <-ticker.C
    fmt.Println("Tick at", time.Now().Format(time.Stamp))
}

ticker.Stop()
```

## Ticker with Stop

```go
ticker := time.NewTicker(500 * time.Millisecond)
done := make(chan bool)

go func() {
    for {
        select {
        case <-done:
            return
        case t := <-ticker.C:
            fmt.Println("Tick at", t)
        }
    }
}()

time.Sleep(3 * time.Second)
ticker.Stop()
done <- true
fmt.Println("Ticker stopped")
```

## Time.After vs Time.NewTimer

| Feature | `time.After(d)` | `time.NewTimer(d)` |
|---------|-----------------|--------------------|
| Returns | `<-chan Time` | `*Timer` |
| Stoppable | No | Yes |
| Resettable | No | Yes |
| Memory leak | If not fired | Manageable |
| Use case | Simple timeout | Reschedule/cancel |

## Time.Tick vs Time.NewTicker

| Feature | `time.Tick(d)` | `time.NewTicker(d)` |
|---------|----------------|---------------------|
| Returns | `<-chan Time` | `*Ticker` |
| Stoppable | No | Yes |
| GC collected | No (leaks) | Yes |
| Use case | Quick demo | Production code |

## Periodic Task Pattern

```go
func PeriodicTask(interval time.Duration, task func()) *time.Ticker {
    ticker := time.NewTicker(interval)
    go func() {
        for range ticker.C {
            task()
        }
    }()
    return ticker
}

func main() {
    ticker := PeriodicTask(5*time.Second, func() {
        fmt.Println("Running periodic task at", time.Now())
    })
    
    time.Sleep(30 * time.Second)
    ticker.Stop()
}
```

## Exercises

1. **Countdown Timer**: Create a countdown from 10 to 0 that prints each second.

2. **Heartbeat**: Implement a heartbeat ticker that signals every 3 seconds, cancellable via CTRL+C.

3. **Retry with Backoff**: Use a timer to implement exponential backoff retry (1s, 2s, 4s, 8s...).

4. **Scheduler**: Build a simple cron-like scheduler that runs tasks at specified intervals.
