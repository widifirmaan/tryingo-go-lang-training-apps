# Benchmarking

Write and analyze benchmarks to drive performance improvements.

## Basic Benchmarks

```go
func BenchmarkStringConcat(b *testing.B) {
    s1 := "Hello"
    s2 := "World"

    for i := 0; i < b.N; i++ {
        _ = s1 + " " + s2
    }
}

func BenchmarkStringBuilder(b *testing.B) {
    s1 := "Hello"
    s2 := "World"

    for i := 0; i < b.N; i++ {
        var buf strings.Builder
        buf.WriteString(s1)
        buf.WriteString(" ")
        buf.WriteString(s2)
        _ = buf.String()
    }
}

func BenchmarkStringFmt(b *testing.B) {
    s1 := "Hello"
    s2 := "World"

    for i := 0; i < b.N; i++ {
        _ = fmt.Sprintf("%s %s", s1, s2)
    }
}
```

## Comparing Benchmarks

```bash
# Run benchmarks
go test -bench=. -benchmem -count=5 > bench.txt

# Compare with benchstat
# go install golang.org/x/perf/cmd/benchstat@latest
benchstat bench.txt

# Output example:
# name                time/op
# StringConcat-8      2.34ns ± 2%
# StringBuilder-8     12.3ns ± 3%
# StringFmt-8         15.7ns ± 4%

# name                alloc/op
# StringConcat-8      0.00B
# StringBuilder-8     16.0B ± 0%
# StringFmt-8         32.0B ± 0%
```

## Benchmarking with Different Inputs

```go
func BenchmarkSort(b *testing.B) {
    sizes := []int{100, 1000, 10000}
    for _, size := range sizes {
        b.Run(fmt.Sprintf("size-%d", size), func(b *testing.B) {
            data := generateRandomSlice(size)
            b.ResetTimer()
            for i := 0; i < b.N; i++ {
                tmp := make([]int, len(data))
                copy(tmp, data)
                sort.Ints(tmp)
            }
        })
    }
}
```

## Profiling Benchmarks

```go
func BenchmarkComplexOperation(b *testing.B) {
    // CPU profile
    f, _ := os.Create("bench.cpu")
    pprof.StartCPUProfile(f)
    defer pprof.StopCPUProfile()

    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        complexOperation()
    }
}

// Run with:
// go test -bench=ComplexOperation -cpuprofile=cpu.prof
// go tool pprof -http=:8081 cpu.prof
```

## Practice
1. Write benchmarks for critical code paths
2. Use benchstat to compare improvements
3. Profile and optimize based on benchmark data
