# Channel, Select & Context

> Kategori: Go, Bahasa Pemrograman | Level: Menengah | Week 9

## Tujuan Pembelajaran

- Membuat unbuffered dan buffered channel
- Mengirim (ch <-) dan menerima (<-ch) data
- Menggunakan select untuk multiplexing
- Menerapkan context.WithTimeout
- Menggunakan close() dan range channel

---

## Program: Komunikasi Goroutine

```go
package main

import (
    "fmt"
    "time"
    "context"
)

func main() {
    ch := make(chan string)
    go func() {
        ch <- "pesan dari goroutine"
    }()
    msg := <-ch
    fmt.Println("Terima:", msg)

    buf := make(chan int, 3)
    buf <- 10; buf <- 20; buf <- 30
    close(buf)
    fmt.Print("Buffered: ")
    for v := range buf {
        fmt.Print(v, " ")
    }
    fmt.Println()

    ch1 := make(chan string)
    ch2 := make(chan string)
    go func() {
        time.Sleep(20 * time.Millisecond)
        ch1 <- "data dari ch1"
    }()
    go func() {
        time.Sleep(10 * time.Millisecond)
        ch2 <- "data dari ch2"
    }()
    select {
    case v := <-ch1:
        fmt.Println("ch1:", v)
    case v := <-ch2:
        fmt.Println("ch2:", v)
    case <-time.After(100 * time.Millisecond):
        fmt.Println("timeout!")
    }

    ctx, cancel := context.WithTimeout(context.Background(), 15*time.Millisecond)
    defer cancel()
    select {
    case <-time.After(30 * time.Millisecond):
        fmt.Println("Selesai tepat waktu")
    case <-ctx.Done():
        fmt.Println("Context timeout:", ctx.Err())
    }
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Channel

Pipa komunikasi antar goroutine. `make(chan int)` = unbuffered (sinkron), `make(chan int, 3)` = buffered.

`ch <- nilai` mengirim, `nilai := <-ch` menerima. `close(ch)` = tidak ada data lagi.

### Select

Menunggu beberapa channel -- case yang siap pertama dieksekusi. `time.After` untuk timeout.

### Context

`context.WithTimeout` -- batas waktu. `ctx.Done()` mengembalikan channel yang terkirim saat timeout.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Ubah buffer** -- ganti `make(chan int, 3)` jadi `make(chan int)`
2. **Tambah channel** -- buat ch3 dan tambahkan case select baru
3. **Ubah timeout** -- ganti `15ms` jadi lebih besar/kecil dari 30ms

---

## Tantangan

Buat pipeline 3 tahap: (1) generate angka 1-10, (2) kalikan 2, (3) cetak. Setiap tahap goroutine terhubung channel. Context timeout 50ms.

---

## Ringkasan

Channel untuk komunikasi goroutine. Select multiplexing channel. Context timeout/cancellation. Pipeline: goroutine + channel = streaming. Minggu depan: testing dan standard library.
