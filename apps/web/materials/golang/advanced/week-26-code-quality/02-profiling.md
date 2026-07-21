# Profiling

Profiling helps identify performance bottlenecks in CPU usage, memory allocation, and concurrency.

## CPU Profiling

```go
package main

import (
    "os"
    "runtime/pprof"
)

func main() {
    f, _ := os.Create("cpu.prof")
    pprof.StartCPUProfile(f)
    defer pprof.StopCPUProfile()

    // Your program logic
    doWork()
}
```

## Memory Profiling

```go
import "runtime/pprof"

func main() {
    f, _ := os.Create("mem.prof")
    defer f.Close()

    doWork()

    // Write heap profile
    pprof.WriteHeapProfile(f)
}

// Alternative: runtime.MemStats
func printMemStats() {
    var m runtime.MemStats
    runtime.ReadMemStats(&m)
    fmt.Printf("Alloc = %v MiB\n", m.Alloc/1024/1024)
    fmt.Printf("TotalAlloc = %v MiB\n", m.TotalAlloc/1024/1024)
    fmt.Printf("Sys = %v MiB\n", m.Sys/1024/1024)
    fmt.Printf("NumGC = %v\n", m.NumGC)
}
```

## net/http/pprof

```go
import (
    "net/http"
    _ "net/http/pprof"
)

func main() {
    // Adds /debug/pprof/ endpoints
    go func() {
        http.ListenAndServe("localhost:6060", nil)
    }()

    // Your application
    runApp()
}
```

## Using pprof

```bash
# CPU profile (30 seconds)
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30

# Heap profile
go tool pprof http://localhost:6060/debug/pprof/heap

# Goroutine profile
go tool pprof http://localhost:6060/debug/pprof/goroutine

# pprof interactive commands
top10      # Show top 10 CPU consumers
web        # Open SVG in browser
list func  # Show source with line-by-line timing
traces     # Show call traces
```

## Benchmark Profiling

```go
func BenchmarkHeavyComputation(b *testing.B) {
    for i := 0; i < b.N; i++ {
        heavyComputation()
    }
}

// Run with profiling
// go test -bench=. -cpuprofile=cpu.prof -memprofile=mem.prof
```

## Identifying Bottlenecks

```go
func slowFunction() {
    defer trackTime(time.Now(), "slowFunction")
    // ...
}

func trackTime(start time.Time, name string) {
    elapsed := time.Since(start)
    if elapsed > time.Millisecond {
        fmt.Printf("%s took %v\n", name, elapsed)
    }
}

// Or use trace
import "runtime/trace"

func main() {
    f, _ := os.Create("trace.out")
    trace.Start(f)
    defer trace.Stop()

    // Run program
}
```

## Practice

1. Profile a web server under load
2. Find and fix memory leaks using heap profiles
3. Use goroutine profiles to detect leaks
4. Optimize a function based on profiling data
