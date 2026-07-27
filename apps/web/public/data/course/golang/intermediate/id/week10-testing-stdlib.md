# Testing & Standard Library

> Kategori: Go, Bahasa Pemrograman | Level: Menengah | Week 10

## Tujuan Pembelajaran

- Menulis unit test dengan package testing
- Menerapkan table-driven test
- Menggunakan encoding/json
- Memanipulasi string dengan strings
- Menulis benchmark test

---

## Program: Pengujian & JSON

```go
package main

import (
    "fmt"
    "strings"
    "encoding/json"
)

func Tambah(a, b int) int { return a + b }

func Bagi(a, b float64) (float64, error) {
    if b == 0 { return 0, fmt.Errorf("cannot divide by zero") }
    return a / b, nil
}

type Orang struct {
    Nama  string `json:"nama"`
    Usia  int    `json:"usia"`
    Aktif bool   `json:"aktif"`
}

func main() {
    fmt.Println("2 + 3 =", Tambah(2, 3))
    fmt.Println("7 + 12 =", Tambah(7, 12))

    h, err := Bagi(10, 3)
    if err == nil { fmt.Printf("10 / 3 = %.2f\n", h) }

    kata := "  hello, Go!  "
    fmt.Println("Trim:", strings.TrimSpace(kata))
    fmt.Println("Upper:", strings.ToUpper(kata))
    fmt.Println("Contains Go:", strings.Contains(kata, "Go"))
    fmt.Println("Split:", strings.Split("a,b,c", ","))

    o := Orang{Nama: "Alice", Usia: 30, Aktif: true}
    jsonData, _ := json.MarshalIndent(o, "", "  ")
    fmt.Println("JSON output:")
    fmt.Println(string(jsonData))

    jsonStr := `{"nama":"Bob","usia":25,"aktif":false}`
    var o2 Orang
    json.Unmarshal([]byte(jsonStr), &o2)
    fmt.Printf("Decoded: %+v\n", o2)
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Unit Testing

File test: `*_test.go`. Fungsi: `func TestXxx(t *testing.T)`. Jalankan: `go test`.

**Table-driven test**: slice struct dengan input dan expected output -- pola standar Go.

### JSON

`encoding/json`: `Marshal` struct ke JSON, `Unmarshal` sebaliknya. Gunakan tag `json:"nama"`.

### Strings

Package `strings`: `TrimSpace`, `ToUpper`, `Contains`, `Split`, dll.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Ubah input Tambah** -- coba `Tambah(-5, 3)` atau `Tambah(0, 0)`
2. **Modifikasi JSON** -- tambah field `Email string` ke struct Orang
3. **Eksperimen strings** -- coba `strings.ReplaceAll(kata, "Go", "Golang")`

---

## Tantangan

Tulis fungsi `FilterGenap(angka []int) []int` (kembalikan slice genap). Tulis table-driven test dengan 5 test case.

---

## Ringkasan

Testing integral di Go. Table-driven test pola standar. JSON dengan struct tags. Strings untuk teks. Benchmark untuk optimasi. Minggu depan: CLI tools dan HTTP server.
