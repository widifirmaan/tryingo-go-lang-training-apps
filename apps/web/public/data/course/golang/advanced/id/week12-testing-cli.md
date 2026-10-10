# Testing & CLI Tools

> **Kategori:** Go | **Level:** Lanjutan | **Minggu 12:** Testing & CLI Tools

## Tujuan Pembelajaran

- testing package: func TestXxx(t *testing.T)
- Table-driven tests: array struct input/expect (Effective Go)
- httptest.NewRecorder dan httptest.NewServer untuk HTTP test
- flag package: flag.String, flag.Int, flag.Parse
- go test -cover, -race, -bench untuk kualitas kode

---

## Program: Unit Test & Flag

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

## Konsep Kunci

### Testing
`func TestXxx(t *testing.T)`. Table-driven tests dengan `t.Run`.

### httptest
`NewRecorder()` mock ResponseWriter, `NewServer()` untuk integration test.

### flag Package
`flag.String`, `flag.Int`, `flag.Parse`.

---

## Eksperimen

- Buat table-driven test untuk Add dan Divide
- Coba benchmark: func BenchmarkAdd(b *testing.B)
- Buat test dengan httptest.NewRecorder
- Implementasikan sub-tests dengan t.Run

---

## Tantangan

Buat CLI tool dengan flag: calculator (add, sub, mul, div) dengan proper error handling dan unit tests.

---

## Ringkasan

Minggu 12 dari 13: **Testing & CLI Tools** (Level: Lanjutan). Kualitas kode dan tooling. Minggu depan: **Capstone Project**!
