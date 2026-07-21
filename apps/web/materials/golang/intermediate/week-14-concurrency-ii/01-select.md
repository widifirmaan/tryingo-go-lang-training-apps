# Select

## What is Select?
`select` lets a goroutine wait on multiple channel operations simultaneously.

```go
func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() { time.Sleep(1 * time.Second); ch1 <- "one" }()
    go func() { time.Sleep(2 * time.Second); ch2 <- "two" }()

    select {
    case msg := <-ch1:
        fmt.Println("Received from ch1:", msg)
    case msg := <-ch2:
        fmt.Println("Received from ch2:", msg)
    case <-time.After(500 * time.Millisecond):
        fmt.Println("Timeout")
    }
}
```

## Select with Default
The `default` case runs immediately if no other case is ready.

```go
select {
case msg := <-ch:
    fmt.Println("Received:", msg)
default:
    fmt.Println("No message available")
}
```

## Non-Blocking Send

```go
select {
case ch <- msg:
    fmt.Println("Sent message")
default:
    fmt.Println("Channel full, dropping message")
}
```

## Infinite Loop with Select

```go
func main() {
    ch := make(chan int)
    done := make(chan bool)

    go func() {
        for {
            select {
            case v := <-ch:
                fmt.Println("Received:", v)
            case <-done:
                fmt.Println("Shutting down")
                return
            }
        }
    }()

    ch <- 1
    ch <- 2
    done <- true
}
```

## Select and Nil Channels
Sends/receives on nil channels block forever — useful for disabling cases.

```go
var ch1 chan int
var ch2 chan int = make(chan int)

select {
case v := <-ch1: // never selected (nil channel blocks)
    fmt.Println("ch1:", v)
case v := <-ch2:
    fmt.Println("ch2:", v)
}
```

## Dynamic Select with Reflect

```go
func merge(channels ...<-chan int) <-chan int {
    out := make(chan int)
    go func() {
        cases := make([]reflect.SelectCase, len(channels))
        for i, ch := range channels {
            cases[i] = reflect.SelectCase{
                Dir:  reflect.SelectRecv,
                Chan: reflect.ValueOf(ch),
            }
        }

        for len(cases) > 0 {
            chosen, value, ok := reflect.Select(cases)
            if !ok {
                cases = append(cases[:chosen], cases[chosen+1:]...)
                continue
            }
            out <- int(value.Int())
        }
        close(out)
    }()
    return out
}
```

## Select Patterns

| Pattern | Code |
|---------|------|
| Wait for any | `select { case <-ch1: ... case <-ch2: ... }` |
| Timeout | `select { case v := <-ch: ... case <-time.After(d): ... }` |
| Non-blocking | `select { case v := <-ch: ... default: ... }` |
| Priority | Two selects, first with priority channel |
| Done channel | `select { case <-done: return default: }` |

## Exercises

1. **Multiplexer**: Use select to read from 3 channels and print whichever has data first.

2. **Graceful Shutdown**: Create a server that processes requests and stops on a quit signal using select.

3. **Timeout Wrapper**: Build a function that wraps any channel operation with a timeout.

4. **Priority Queue**: Use two selects to prioritize high-priority messages over low-priority ones.
