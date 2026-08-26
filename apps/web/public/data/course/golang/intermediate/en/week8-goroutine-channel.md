# Goroutine & Channel — Kasir Paralel

> **Kategori:** Go | **Level:** Menengah | **Minggu 8:** Goroutine & Channel

## Tujuan Pembelajaran

- `go hitung()` kasir paralel, `ch := make(chan int)` ban berjalan antar kasir

---

## Program

```go
package main
import "fmt"

func kasir(nama string, ch chan string){
  ch <- "Selesai " + nama
}

func main(){
  ch := make(chan string)
  go kasir("Budi", ch)
  go kasir("Siti", ch)
  fmt.Println(<-ch)
  fmt.Println(<-ch)

  // Pipeline warung
  pesanan := make(chan int, 2)
  pesanan <- 1; pesanan <- 2
  close(pesanan)
  for p := range pesanan { fmt.Println("Proses", p) }
}
```

**Aturan:** `go` = buka kasir baru, `ch <- data` kirim, `<-ch` terima.

---

## Ringkasan

Minggu 8: **Kasir Paralel** — Go cepat karena banyak kasir.
