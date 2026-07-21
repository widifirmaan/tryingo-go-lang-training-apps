# Durations

## Creating Durations

```go
import "time"

d1 := time.Duration(5) * time.Second
d2 := time.Minute * 30
d3 := time.Hour*2 + time.Minute*15
d4 := 100 * time.Millisecond
```

## Parsing Durations from Strings

```go
d, err := time.ParseDuration("1h30m15s")
if err != nil {
    log.Fatal(err)
}
fmt.Println(d) // 1h30m15s

// Valid units: ns, us/µs, ms, s, m, h
```

## Duration Operations

```go
start := time.Now()
// ... some work ...
elapsed := time.Since(start)

// Or equivalently:
elapsed = time.Now().Sub(start)

fmt.Printf("Took %v\n", elapsed)
```

## Duration Components

```go
d := 2*time.Hour + 30*time.Minute + 15*time.Second

hours := d.Hours()       // 2.504166...
minutes := d.Minutes()   // 150.25
seconds := d.Seconds()   // 9015
milliseconds := d.Milliseconds() // 9015000
nanoseconds := d.Nanoseconds()   // 9015000000000
```

## Duration Truncation

```go
d := 1*time.Hour + 37*time.Minute + 42*time.Second

fmt.Println(d.Truncate(time.Hour))    // 1h0m0s
fmt.Println(d.Truncate(time.Minute))  // 1h37m0s
fmt.Println(d.Round(time.Hour))       // 2h0m0s
```

## Sleeping

```go
time.Sleep(2 * time.Second)
fmt.Println("Woke up!")

// With channel (interruptible)
select {
case <-time.After(2 * time.Second):
    fmt.Println("Timed out")
case <-done:
    fmt.Println("Cancelled")
}
```

## Duration Comparison

| Operation | Code | Result |
|-----------|------|--------|
| Greater | `d1 > d2` | `bool` |
| Less | `d1 < d2` | `bool` |
| Equal | `d1 == d2` | `bool` |
| Add | `d1 + d2` | `Duration` |
| Subtract | `d1 - d2` | `Duration` |
| Multiply | `d1 * 2` | `Duration` |
| Division | `d1 / 2` | `Duration` |
| Integer div | `d1 / d2` | `int64` |

## Measuring Performance

```go
func timeFunction(fn func()) time.Duration {
    start := time.Now()
    fn()
    return time.Since(start)
}

func main() {
    elapsed := timeFunction(func() {
        time.Sleep(500 * time.Millisecond)
    })
    fmt.Printf("Function took %v\n", elapsed)
}
```

## Exercises

1. **Human-Readable Duration**: Write a function that converts a duration to "2 hours, 30 minutes, 15 seconds".

2. **Countdown Timer**: Accept a duration string (e.g., "5m30s") and count down second by second.

3. **Work Hours Calculator**: Given a start and end time, calculate total work hours (excluding breaks).

4. **Rate Limiter**: Implement a rate limiter that allows N operations per duration.
