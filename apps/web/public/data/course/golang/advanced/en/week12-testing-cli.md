# Testing & CLI Tools

> **Kategori:** Go | **Level:** Advanced | **Minggu 12:** Testing & CLI Tools

## Learning Objectives

- testing package: func TestXxx(t *testing.T)
- Table-driven tests: struct array input/expect (Effective Go)
- httptest.NewRecorder and httptest.NewServer for HTTP tests
- flag package: flag.String, flag.Int, flag.Parse
- go test -cover, -race, -bench for code quality

---

## Program: Unit Test & Flags

```go
package main

import (
    "flag"
    "fmt"
)

func Add(a, b int) int { return a + b }

func Divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("cannot divide by zero")
    }
    return a / b, nil
}

func main() {
    name := flag.String("name", "World", "Nama untuk sapaan")
    count := flag.Int("count", 1, "Jumlah pengulangan")
    verbose := flag.Bool("v", false, "Mode verbose")

    fmt.Println("=== CLI Flag (simulasi) ===")
    fmt.Printf("Name: %s, Count: %d, Verbose: %v\n", *name, *count, *verbose)

    for i := 0; i < *count; i++ {
        fmt.Printf("Halo, %s! (%d)\n", *name, i+1)
    }

    fmt.Println("\n=== Test Simulation ===")
    fmt.Printf("Add(2,3) = %d (expected 5)\n", Add(2, 3))
    fmt.Printf("Add(-1,-1) = %d (expected -2)\n", Add(-1, -1))

    result, err := Divide(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Printf("Divide(10,2) = %.1f\n", result)
    }

    _, err = Divide(5, 0)
    if err != nil {
        fmt.Println("Divide(5,0) error:", err)
    }
}
```

---

## Key Concepts

### Testing
Test functions and table-driven tests.

### httptest
Mock ResponseWriter and test server.

### flag Package
CLI flag definitions.

---

## Experiments

- Create table-driven tests for Add and Divide
- Try benchmark: func BenchmarkAdd(b *testing.B)
- Create test with httptest.NewRecorder
- Implement sub-tests with t.Run

---

## Challenge

Build a CLI tool with flags: calculator (add, sub, mul, div) with proper error handling and unit tests.

---

## Summary

Week 12 of 13: **Testing & CLI Tools** (Level: Advanced). Code quality and tooling. Next week: **Capstone Project**!
