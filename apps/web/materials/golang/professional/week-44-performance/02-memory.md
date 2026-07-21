# Memory Optimization

Optimize memory allocation and reduce GC pressure in Go.

## Escape Analysis

```go
// Escapes to heap - avoid in hot paths
func NewUser() *User {
    return &User{Name: "John"} // Allocated on heap
}

// Stays on stack
func NewUser() User {
    return User{Name: "John"} // Allocated on stack
}

// Pre-allocate slices
// Bad
var data []int
for i := 0; i < 1000; i++ {
    data = append(data, i) // multiple allocations
}

// Good
data := make([]int, 0, 1000)
for i := 0; i < 1000; i++ {
    data = append(data, i) // single allocation
}
```

## Object Pooling

```go
type Buffer struct {
    data []byte
}

var bufferPool = sync.Pool{
    New: func() interface{} {
        return &Buffer{data: make([]byte, 0, 4096)}
    },
}

func processRequest(req *Request) {
    buf := bufferPool.Get().(*Buffer)
    defer bufferPool.Put(buf)

    buf.data = buf.data[:0] // Reset without reallocating
    buf.data = append(buf.data, req.Payload...)
    // Process buf.data
}
```

## Reduce Allocations

```go
// Bad: fmt.Sprintf in hot path
func formatUser(u User) string {
    return fmt.Sprintf("User %s (%s)", u.Name, u.Email)
}

// Good: Manual string building
func formatUser(u User) string {
    b := strings.Builder{}
    b.Grow(len(u.Name) + len(u.Email) + 10)
    b.WriteString("User ")
    b.WriteString(u.Name)
    b.WriteString(" (")
    b.WriteString(u.Email)
    b.WriteString(")")
    return b.String()
}

// Bad: bytes.Buffer for simple concatenation
var buf bytes.Buffer
buf.WriteString("prefix")
buf.WriteString(data)
buf.WriteString("suffix")

// Good: slice of bytes
n := len("prefix") + len(data) + len("suffix")
b := make([]byte, 0, n)
b = append(b, "prefix"...)
b = append(b, data...)
b = append(b, "suffix"...)
```

## GC Tuning

```go
import "runtime/debug"

func tuneGC() {
    // Default: 100, lower = more frequent GC
    debug.SetGCPercent(200)

    // Set soft memory limit
    debug.SetMemoryLimit(512 * 1024 * 1024) // 512MB

    // Force GC (rarely needed)
    runtime.GC()
}
```

## Practice
1. Use escape analysis to identify heap allocations
2. Implement object pooling for a hot path
3. Reduce allocations by 50% in a critical function
