# Channel & Select

> Go | Modul 11

## Tujuan Pembelajaran

- Membuat unbuffered dan buffered channel
- Mengirim (ch <-) dan menerima (<-ch) data
- Menggunakan select untuk multiplexing
- Menerapkan pipeline pattern
- Menggunakan close dan range channel

---

## Program: Pipeline Data

```go
package main

import (
    "fmt"
    "time"
)

func generate(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out)
    }()
    return out
}

func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            out <- n * n
        }
        close(out)
    }()
    return out
}

func main() {
    // Unbuffered channel
    ch := make(chan string)
    go func() {
        ch <- "Halo dari goroutine"
    }()
    msg := <-ch
    fmt.Println("Channel:", msg)

    // Buffered channel
    buf := make(chan int, 3)
    buf <- 1
    buf <- 2
    buf <- 3
    fmt.Println("Buffered:", <-buf, <-buf, <-buf)

    // Pipeline pattern
    fmt.Println("\nPipeline:")
    nums := generate(1, 2, 3, 4, 5)
    squares := square(nums)
    for s := range squares {
        fmt.Printf("%d ", s)
    }
    fmt.Println()

    // Select
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() {
        time.Sleep(50 * time.Millisecond)
        ch1 <- "satu"
    }()
    go func() {
        time.Sleep(100 * time.Millisecond)
        ch2 <- "dua"
    }()

    select {
    case msg := <-ch1:
        fmt.Println("Dari ch1:", msg)
    case msg := <-ch2:
        fmt.Println("Dari ch2:", msg)
    case <-time.After(200 * time.Millisecond):
        fmt.Println("Timeout")
    }
}
```

---

## Penjelasan

Channel adalah pipe komunikasi antar goroutine. Unbuffered: sinkron (pengirim menunggu penerima). Buffered: async sampai buffer penuh. `select` menunggu multiple channel. Pipeline pattern: generator → process → collector. `close(ch)` menandai channel selesai.

---

## Eksperimen

- Ubah nilai variabel dan lihat perubahannya
- Tambah fungsi baru dengan tipe return berbeda
- Ganti for loop dengan range
- Coba tipe data yang belum dicoba

---

## Tantangan

Buat program yang menerapkan konsep minggu ini dalam studi kasus nyata. Gunakan error handling yang baik. Pastikan kode bisa dijalankan dengan `go run`.

---

## Ringkasan

Modul 11 dari 16: **Channel & Select**. Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **12. Context & Sinkronisasi Lanjutan**.
