# Profiling Deep Dive

Master Go profiling with pprof and execution tracing.

## CPU Profiling

```go
import "runtime/pprof"

func main() {
    f, _ := os.Create("cpu.pprof")
    pprof.StartCPUProfile(f)
    defer pprof.StopCPUProfile()

    // Run your application
    runServer()
}

// Usage:
// go tool pprof -http=:8081 cpu.pprof
// OR
// import _ "net/http/pprof" // in main
// Then: http://localhost:8080/debug/pprof/profile
```

## Memory Profiling

```go
import "runtime/pprof"

func main() {
    f, _ := os.Create("mem.pprof")
    defer func() {
        runtime.GC() // Get up-to-date statistics
        pprof.WriteHeapProfile(f)
    }()
    runServer()
}

// Analyze:
// go tool pprof -alloc_space mem.pprof
// go tool pprof -alloc_objects mem.pprof
// top10 - shows top 10 allocations
// list <function> - shows line-by-line allocations
```

## Execution Tracing

```go
import "runtime/trace"

func main() {
    f, _ := os.Create("trace.out")
    trace.Start(f)
    defer trace.Stop()

    runServer()
}

// Analyze:
// go tool trace trace.out
// Shows: goroutine analysis, network blocking, syscalls, scheduler
```

## pprof HTTP Server

```go
package main

import (
    "net/http"
    _ "net/http/pprof" // Register pprof handlers
    "runtime"
)

func main() {
    runtime.SetBlockProfileRate(1)  // Enable block profiling
    runtime.SetMutexProfileFraction(1) // Enable mutex profiling

    http.ListenAndServe(":8080", nil)
    // /debug/pprof/ - Overview
    // /debug/pprof/goroutine - Stack traces of all goroutines
    // /debug/pprof/heap - Heap profile
    // /debug/pprof/block - Blocking profile
    // /debug/pprof/mutex - Mutex contention
}
```

## Practice
1. Profile CPU in a high-throughput service
2. Find and fix memory leaks with heap profiling
3. Analyze goroutine blocking with execution traces
