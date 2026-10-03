# Idiomatic Testing & Benchmarking: Table-Driven Tests, Subtests & testing.B

> **Kategori:** Go | **Level:** HTTP Server, Profiling & Gateway Capstone | **Minggu 10:** Idiomatic Testing & Benchmarking: Table-Driven Tests, Subtests & testing.B

## Learning Objectives

- Master native Go testing architecture eliminating third-party testing framework dependencies (standard `testing` package)
- Master Table-Driven Testing recognized globally as the gold standard of Go test engineering
- Deploy subtests via t.Run() isolating failure domains per test variation
- Author high-precision benchmark suites leveraging *testing.B parameters and b.N iteration loops
- Audit memory allocations deploying benchmarking flags: `go test -bench=. -benchmem`

---

## Program: Automated Table-Driven Tests & Benchmark Suite with testing.B

```go
package main

import (
	"fmt"
	"strings"
	"testing"
)

// Unit yang Akan Diuji: Pembersih & Sanitasi Jalur URL Gateway
func SanitasiPathGateway(path string) string {
	if path == "" {
		return "/"
	}
	bersih := strings.TrimSpace(path)
	if !strings.HasPrefix(bersih, "/") {
		bersih = "/" + bersih
	}
	// Hapus trailing slash jika bukan root
	if len(bersih) > 1 && strings.HasSuffix(bersih, "/") {
		bersih = strings.TrimSuffix(bersih, "/")
	}
	return bersih
}

// 1. Table-Driven Test Idiomatik (Standar Emas Pengujian di Go)
func TestSanitasiPathGateway(t *testing.T) {
	// Definisi tabel kasus uji
	testCases := []struct {
		namaKasus      string
		inputPath      string
		ekspektasiPath string
	}{
		{namaKasus: "Path Kosong", inputPath: "", ekspektasiPath: "/"},
		{namaKasus: "Path Normal", inputPath: "/api/v1/users", ekspektasiPath: "/api/v1/users"},
		{namaKasus: "Tanpa Leading Slash", inputPath: "api/v1/products", ekspektasiPath: "/api/v1/products"},
		{namaKasus: "Dengan Trailing Slash", inputPath: "/api/v1/orders/", ekspektasiPath: "/api/v1/orders"},
		{namaKasus: "Spasi Ekstra", inputPath: "  /auth/login   ", ekspektasiPath: "/auth/login"},
	}

	for _, tc := range testCases {
		// t.Run(): Menjalankan subtest terisolasi untuk setiap baris kasus
		t.Run(tc.namaKasus, func(t *testing.T) {
			hasil := SanitasiPathGateway(tc.inputPath)
			if hasil != tc.ekspektasiPath {
				t.Errorf("GAGAL [%s]: input='%s', dapat='%s', ekspektasi='%s'",
					tc.namaKasus, tc.inputPath, hasil, tc.ekspektasiPath)
			}
		})
	}
}

// 2. Benchmark Pengukuran Kecepatan Operasi (testing.B)
func BenchmarkSanitasiPathGateway(b *testing.B) {
	samplePath := "   api/v1/distributed/gateway/routes/search/   "

	// b.ResetTimer(): Reset pencatat waktu setelah inisialisasi awal
	b.ResetTimer()

	// Loop b.N diatur otomatis oleh runtime Go hingga sampel statistik valid (biasanya ribuan/jutaan kali)
	for i := 0; i < b.N; i++ {
		_ = SanitasiPathGateway(samplePath)
	}
}

func main() {
	fmt.Println("=== Demo Pengujian Mandiri ===")
	input := "api/v1/status/"
	fmt.Printf("Input: '%s' -> Hasil Sanitasi: '%s'\n", input, SanitasiPathGateway(input))
	fmt.Println("Jalankan di terminal: 'go test -v -bench=.' untuk melihat pengujian dan benchmark resmi.")
}
```

---

## Key Concepts

### The Gold Standard: Table-Driven Tests
In other ecosystems, engineers construct dozens of redundant test methods testing identical logic under varied inputs (`testEmpty()`, `testSlash()`, `testTrim()`).
In **Go**, engineering culture mandates **Table-Driven Tests**:
1. Declare an anonymous struct slice listing test names, inputs, and expected outputs.
2. Iterate `for _, tc := range testCases`, delegating execution to `t.Run(tc.name, ...)`.
Expanding coverage to 50 edge cases requires appending 50 clean data rows without writing single-purpose test functions!

### Integrated Performance Benchmarking: `testing.B`
Go remains unique in shipping an **integrated statistical benchmarking engine directly inside its standard toolchain**:
Benchmark functions prefix with `BenchmarkFunctionName(b *testing.B)`.
The Go test harness iterates the function across millions of executions calculating:
- **Nanoseconds per operation (ns/op)**.
- **Bytes allocated per operation (B/op)**.
- **Heap allocations count per operation (allocs/op)**.

---

---

## Beginner Friendly Explanation

### Analogy: Automotive Crash Test Matrices & Precision Stopwatches
1. **Table-Driven Tests** are automotive crash-test data sheets: the matrix outlines impact velocities at 20 km/h, 50 km/h, and 100 km/h. Testing dummies buckle in, executing scenarios systematically row-by-row.
2. **Benchmarks (`testing.B`)** are Swiss watchmaker test chronometers: horologists cycle gear escapements 1,000,000 times in rapid succession, calculating nanosecond precision friction coefficients.

## Experiments

- Run go test -v to observe PASS confirmations across every individual subtest execution.
- Execute go test -bench=. -benchmem observing nanosecond timings alongside B/op memory consumption.
- Append an edge-case row handling double slashes "//double//slash//" to evaluate sanitizer behavior.
- Deliberately fail an expected output to inspect the clean error diagnostics emitted by t.Errorf.

---

## Challenge

Author a comparative benchmark comparing string concatenation via `+` operators versus `strings.Builder` across 1,000 iterations.

---

## Summary

You have mastered Table-Driven Tests, subtests, and testing.B benchmarks. Next week, we examine pprof memory profiling and escape analysis.
