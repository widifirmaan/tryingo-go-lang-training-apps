# Benchmarks

## What is a Benchmark?
Benchmarks measure the performance of your code.

## Writing a Benchmark

```go
func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(100, 200)
    }
}
```

## Running Benchmarks

```bash
# Run all benchmarks
go test -bench=.

# Run specific benchmark
go test -bench=BenchmarkAdd

# Run with memory allocation stats
go test -bench=. -benchmem

# Run multiple times
go test -bench=. -count=5
```

## Benchmark Output

```
BenchmarkAdd-8         1000000000           0.25 ns/op
BenchmarkMultiply-8    1000000000           0.30 ns/op
BenchmarkDivide-8      500000000            2.15 ns/op
```

Columns:
- `BenchmarkAdd-8` — name and CPU count
- `1000000000` — iterations (b.N)
- `0.25 ns/op` — time per operation

## Benchmark with Setup

```go
func BenchmarkComplexOp(b *testing.B) {
    // Setup (not measured)
    data := generateLargeDataset()

    // Reset timer
    b.ResetTimer()

    for i := 0; i < b.N; i++ {
        processData(data)
    }
}
```

## Benchmarks with Memory

```go
func BenchmarkSliceAlloc(b *testing.B) {
    b.ReportAllocs()

    for i := 0; i < b.N; i++ {
        s := make([]int, 0, 1000)
        for j := 0; j < 1000; j++ {
            s = append(s, j)
        }
    }
}
```

## Comparing Implementations

```go
func BenchmarkConcatBuilder(b *testing.B) {
    b.ReportAllocs()
    for i := 0; i < b.N; i++ {
        var sb strings.Builder
        for j := 0; j < 100; j++ {
            sb.WriteString("hello")
        }
        _ = sb.String()
    }
}

func BenchmarkConcatOperator(b *testing.B) {
    b.ReportAllocs()
    for i := 0; i < b.N; i++ {
        var s string
        for j := 0; j < 100; j++ {
            s += "hello"
        }
        _ = s
    }
}
```

## Benchmark Methods

| Method | Purpose |
|--------|---------|
| `b.ResetTimer()` | Reset benchmark timer |
| `b.StopTimer()` | Pause timing |
| `b.StartTimer()` | Resume timing |
| `b.ReportAllocs()` | Report allocation stats |
| `b.SetBytes(n)` | Set bytes processed per op |
| `b.Run(name, fn)` | Run sub-benchmark |

## Parallel Benchmarks

```go
func BenchmarkParallel(b *testing.B) {
    b.RunParallel(func(pb *testing.PB) {
        for pb.Next() {
            doWork()
        }
    })
}
```

## Sub-benchmarks

```go
func BenchmarkMath(b *testing.B) {
    b.Run("Add", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            Add(100, 200)
        }
    })

    b.Run("Multiply", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            Multiply(100, 200)
        }
    })
}

// Run: go test -bench=Math/Add
```

## Benchmark Comparisons

| Package | Operation | Iterations | Time/Op | Memory/Op |
|---------|-----------|------------|---------|-----------|
| `strings.Builder` | 100 concats | 100000 | 1.2µs | 480 B |
| `+` operator | 100 concats | 10000 | 12.5µs | 5400 B |

## Exercises

1. **Benchmark Functions**: Write benchmarks for `Add`, `Subtract`, `Multiply`, `Divide` and compare.

2. **Memory Comparison**: Benchmark `make([]int, 1000)` vs `make([]int, 0, 1000)` with append.

3. **String Builder vs Join**: Benchmark `strings.Builder` vs `strings.Join` vs `fmt.Sprintf`.

4. **Map vs Slice**: Benchmark key lookup in a map vs linear search in a slice.
