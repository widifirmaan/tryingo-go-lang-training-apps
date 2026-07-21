# Generators

Generators produce values on-demand using channels, enabling lazy evaluation and infinite sequences.

## Basic Generator

```go
func count(start, step int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for i := start; ; i += step {
            out <- i
        }
    }()
    return out
}

func main() {
    c := count(0, 2)
    for i := 0; i < 5; i++ {
        fmt.Println(<-c) // 0, 2, 4, 6, 8
    }
}
```

## Finite Generator

```go
func fibonacci(n int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        a, b := 0, 1
        for i := 0; i < n; i++ {
            out <- a
            a, b = b, a+b
        }
    }()
    return out
}

func main() {
    for n := range fibonacci(10) {
        fmt.Println(n) // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
    }
}
```

## Generator with Cancellation

```go
func primeGenerator(ctx context.Context) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := 2; ; n++ {
            select {
            case out <- n:
                // Filter composite numbers in consumer
            case <-ctx.Done():
                return
            }
        }
    }()
    return out
}

func filterPrimes(ctx context.Context, in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            if isPrime(n) {
                select {
                case out <- n:
                case <-ctx.Done():
                    return
                }
            }
        }
    }()
    return out
}

func isPrime(n int) bool {
    if n < 2 {
        return false
    }
    for i := 2; i*i <= n; i++ {
        if n%i == 0 {
            return false
        }
    }
    return true
}
```

## Generator from Slice

```go
func sliceGenerator[T any](items []T) <-chan T {
    out := make(chan T)
    go func() {
        defer close(out)
        for _, item := range items {
            out <- item
        }
    }()
    return out
}

func mapGenerator[K comparable, V any](m map[K]V) <-chan Pair[K, V] {
    out := make(chan Pair[K, V])
    go func() {
        defer close(out)
        for k, v := range m {
            out <- Pair[K, V]{k, v}
        }
    }()
    return out
}

type Pair[K comparable, V any] struct {
    Key   K
    Value V
}
```

## Generator Transformers

```go
func mapGen[T, U any](in <-chan T, fn func(T) U) <-chan U {
    out := make(chan U)
    go func() {
        defer close(out)
        for v := range in {
            out <- fn(v)
        }
    }()
    return out
}

func filterGen[T any](in <-chan T, fn func(T) bool) <-chan T {
    out := make(chan T)
    go func() {
        defer close(out)
        for v := range in {
            if fn(v) {
                out <- v
            }
        }
    }()
    return out
}

func takeGen[T any](in <-chan T, n int) <-chan T {
    out := make(chan T)
    go func() {
        defer close(out)
        for i := 0; i < n; i++ {
            v, ok := <-in
            if !ok {
                return
            }
            out <- v
        }
    }()
    return out
}
```

## Practice

1. Create a generator for random numbers in a range
2. Build a generator that reads lines from a file
3. Implement a generator with throttling
4. Create a generator that produces permutations
