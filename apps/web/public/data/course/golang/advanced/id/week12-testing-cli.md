# Testing & CLI — Uji & Tombol Warung

> **Kategori:** Go | **Level:** Lanjutan | **Minggu 12:** Testing & CLI Tools

## Tujuan Pembelajaran

- `go test` + `func TestHitung(t *testing.T)`, `flag.String` tombol `--nama Budi`

---

## Program

```go
// hitung.go
package main
func Hitung(a,b int) int { return a+b }

// hitung_test.go
package main
import "testing"
func TestHitung(t *testing.T){
  if Hitung(2,3) != 5 { t.Errorf("salah") }
}
// go test -v

// cli.go
package main
import ("flag"; "fmt")
func main(){
  nama := flag.String("nama", "Tamu", "nama pelanggan")
  flag.Parse()
  fmt.Printf("Halo %s\n", *nama)
}
// go run cli.go --nama Budi
```

---

## Ringkasan

Minggu 12: **Uji & Tombol** — `go test` dan `flag`.
