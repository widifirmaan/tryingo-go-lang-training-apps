# Channels

## What is a Channel?
Channels are typed conduits for communicating between goroutines.

```go
// Create a channel
ch := make(chan int)

// Send
ch <- 42

// Receive
value := <-ch
```

## Unbuffered Channels
Sends and receives block until both sender and receiver are ready.

```go
func main() {
    ch := make(chan string)

    go func() {
        ch <- "Hello from goroutine"
    }()

    msg := <-ch // blocks until message is sent
    fmt.Println(msg)
}
```

## Channel Direction

```go
// Send-only channel
func producer(ch chan<- int) {
    for i := 0; i < 5; i++ {
        ch <- i
    }
    close(ch)
}

// Receive-only channel
func consumer(ch <-chan int) {
    for val := range ch {
        fmt.Println(val)
    }
}

func main() {
    ch := make(chan int)
    go producer(ch)
    consumer(ch)
}
```

## Closing Channels

```go
ch := make(chan int)

// Close indicates no more values will be sent
close(ch)

// Check if closed
val, ok := <-ch
if !ok {
    fmt.Println("Channel closed")
}
```

## Ranging Over a Channel

```go
ch := make(chan string)

go func() {
    for _, word := range []string{"hello", "world", "done"} {
        ch <- word
    }
    close(ch)
}()

for word := range ch {
    fmt.Println(word)
}
```

## Buffered Channels

```go
// Buffer of 3 — non-blocking until full
ch := make(chan int, 3)

ch <- 1 // no block
ch <- 2 // no block
ch <- 3 // no block
// ch <- 4 // block — buffer full
```

## Buffer Behavior

| Buffer Size | Send Blocks When | Receive Blocks When |
|-------------|------------------|---------------------|
| 0 (unbuffered) | Receiver not ready | Sender not ready |
| N | Buffer full | Buffer empty |

## Channel Length and Capacity

```go
ch := make(chan int, 5)
ch <- 1
ch <- 2

fmt.Println(len(ch)) // 2 (items in buffer)
fmt.Println(cap(ch)) // 5 (buffer capacity)
```

## Unidirectional Channels in Function Signatures

```go
// Accepts only send channel
func send(ch chan<- int, values ...int) {
    for _, v := range values {
        ch <- v
    }
    close(ch)
}

// Accepts only receive channel
func receive(ch <-chan int) {
    for v := range ch {
        fmt.Println(v)
    }
}
```

## Exercises

1. **Number Pipeline**: Create a pipeline: generate numbers → square them → print results.

2. **Worker Pool**: Create 3 worker goroutines that receive jobs from a channel and print them.

3. **Fan-Out**: Split work from a single producer channel to multiple consumer goroutines.

4. **Signal Processing**: Use an unbuffered channel to coordinate start/stop between goroutines.
