# Context & Sinkronisasi Lanjutan

> Go | Modul 12

## Tujuan Pembelajaran

- Menggunakan context untuk cancellation
- Menerapkan context.WithTimeout
- Menggunakan errgroup untuk error propagation
- Membuat worker pool pattern
- Menerapkan fan-in/fan-out

---

## Program: Worker Pool

```go
package main

import (
    "context"
    "fmt"
    "sync"
    "time"
)

func doWork(ctx context.Context, id int, wg *sync.WaitGroup) {
    defer wg.Done()
    select {
    case <-time.After(200 * time.Millisecond):
        fmt.Printf("Worker %d selesai\n", id)
    case <-ctx.Done():
        fmt.Printf("Worker %d dibatalkan: %v\n", id, ctx.Err())
    }
}

// Worker pool
type Pool struct {
    jobs    chan int
    results chan int
    wg      sync.WaitGroup
}

func NewPool(numWorkers int) *Pool {
    p := &Pool{
        jobs:    make(chan int, 100),
        results: make(chan int, 100),
    }
    for i := 0; i < numWorkers; i++ {
        p.wg.Add(1)
        go p.worker(i)
    }
    return p
}

func (p *Pool) worker(id int) {
    defer p.wg.Done()
    for job := range p.jobs {
        p.results <- job * job
    }
}

func main() {
    // Context timeout
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    var wg sync.WaitGroup
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go doWork(ctx, i, &wg)
    }
    wg.Wait()

    // Worker pool
    fmt.Println("\nWorker Pool:")
    pool := NewPool(3)
    go func() {
        for i := 1; i <= 5; i++ {
            pool.jobs <- i
        }
        close(pool.jobs)
    }()

    go func() {
        pool.wg.Wait()
        close(pool.results)
    }()

    for r := range pool.results {
        fmt.Printf("Hasil: %d\n", r)
    }
}
```

---

## Penjelasan

`context.Context` membawa cancellation, timeout, dan nilai. `WithCancel`, `WithTimeout`, `WithDeadline` untuk kontrol. `errgroup` menggabungkan error dari multiple goroutine. Worker pool membatasi concurrency. Fan-in menggabungkan channel, fan-out mendistribusikan.

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

Modul 12 dari 16: **Context & Sinkronisasi Lanjutan**. Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **13. Standard Library: I/O & Waktu**.
