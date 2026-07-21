# Pipelines

A pipeline is a series of stages connected by channels, where each stage is a group of goroutines.

## Basic Pipeline

```go
package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out)
    }()
    return out
}

func sq(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            out <- n * n
        }
        close(out)
    }()
    return out
}

func main() {
    // Set up pipeline
    c := gen(2, 3, 4)
    out := sq(c)

    // Consume output
    for n := range out {
        fmt.Println(n) // 4, 9, 16
    }
}
```

## Pipeline with Error Handling

```go
type Result struct {
    Value int
    Err   error
}

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

func safeSqrt(in <-chan int) <-chan Result {
    out := make(chan Result)
    go func() {
        defer close(out)
        for n := range in {
            if n < 0 {
                out <- Result{Err: fmt.Errorf("cannot sqrt negative: %d", n)}
                continue
            }
            out <- Result{Value: int(math.Sqrt(float64(n)))}
        }
    }()
    return out
}

func main() {
    c := gen(4, 9, -1, 16, 25)
    results := safeSqrt(c)

    for r := range results {
        if r.Err != nil {
            fmt.Printf("error: %v\n", r.Err)
            continue
        }
        fmt.Printf("result: %d\n", r.Value)
    }
}
```

## Pipeline with Cancellation

```go
func pipeline(ctx context.Context, nums []int) (<-chan int, <-chan error) {
    out := make(chan int)
    errc := make(chan error, 1)

    go func() {
        defer close(out)
        defer close(errc)

        for _, n := range nums {
            select {
            case out <- n * n:
            case <-ctx.Done():
                errc <- ctx.Err()
                return
            }
        }
    }()

    return out, errc
}
```

## Multi-Stage Pipeline

```go
func takeN(ctx context.Context, in <-chan int, n int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for i := 0; i < n; i++ {
            select {
            case v, ok := <-in:
                if !ok {
                    return
                }
                out <- v
            case <-ctx.Done():
                return
            }
        }
    }()
    return out
}

func filterOdd(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for v := range in {
            if v%2 == 0 {
                out <- v
            }
        }
    }()
    return out
}
```

## Practice

1. Build a pipeline that reads integers, doubles them, filters >10
2. Add cancellation to a multi-stage pipeline
3. Handle errors from any stage of a pipeline
4. Measure throughput of a pipeline with buffered channels
