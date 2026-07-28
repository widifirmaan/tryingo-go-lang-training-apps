# Goroutine & WaitGroup

> Go | Modul 10

## Tujuan Pembelajaran

- Menjalankan goroutine dengan go keyword
- Mensinkronisasi dengan sync.WaitGroup
- Mengamankan akses dengan sync.Mutex
- Mendeteksi race condition dengan -race
- Memahami concurrency model Go

---

## Program: Unduhan Paralel

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Printf("Worker %d mulai\n", id)
    time.Sleep(100 * time.Millisecond)
    fmt.Printf("Worker %d selesai\n", id)
}

type Counter struct {
    mu    sync.Mutex
    value int
}

func (c *Counter) Increment() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.value++
}

func (c *Counter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.value
}

func main() {
    // WaitGroup
    var wg sync.WaitGroup
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }
    wg.Wait()
    fmt.Println("Semua worker selesai")

    // Mutex
    counter := Counter{}
    var wg2 sync.WaitGroup
    for i := 0; i < 1000; i++ {
        wg2.Add(1)
        go func() {
            defer wg2.Done()
            counter.Increment()
        }()
    }
    wg2.Wait()
    fmt.Printf("Counter: %d (seharusnya 1000)\n", counter.Value())
}
```

---

## Penjelasan

Goroutine: fungsi yang jalan concurrent dengan `go f()`. `sync.WaitGroup` menunggu goroutine selesai. `sync.Mutex` mencegah data race. Race detector `go run -race` mendeteksi akses concurrent berbahaya. Go's concurrency model: "Do not communicate by sharing memory; share memory by communicating."

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

Modul 10 dari 16: **Goroutine & WaitGroup**. Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **11. Channel & Select**.
