# Context & Sinkronisasi

> **Kategori:** Go | **Level:** Menengah | **Minggu 9:** Context & Sinkronisasi

## Tujuan Pembelajaran

- context.Context untuk cancellation dan timeout
- context.WithCancel, WithTimeout, WithDeadline
- sync.WaitGroup untuk menunggu goroutine selesai
- sync.Mutex untuk proteksi data race
- Worker pool pattern dan fan-in/fan-out

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
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    var wg sync.WaitGroup
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go doWork(ctx, i, &wg)
    }
    wg.Wait()

    fmt.Println("\nWorker Pool:")
    pool := NewPool(3)
    go func() {
        for i := 1; i <= 5; i++ { pool.jobs <- i }
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

## Konsep Kunci

### context.Context
Cancellation, timeout, nilai antar API. `WithCancel`, `WithTimeout`.

### sync Package
`WaitGroup` untuk tunggu goroutine. `Mutex` untuk proteksi data race.

### Worker Pool
N worker proses jobs dari channel terbatas.

---

## Eksperimen

- Buat context dengan value: ctx = context.WithValue(ctx, "key", val)
- Coba race condition: hapus Mutex, jalankan dengan -race
- Buat fan-out: distribusikan jobs ke multiple workers
- Implementasikan graceful shutdown dengan signal handling

---

## Tantangan

Buat HTTP server dengan graceful shutdown: handle SIGINT, cancel context, tunggu active requests selesai.

---

## Ringkasan

Minggu 9 dari 13: **Context & Sinkronisasi** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Stdlib: I/O, Time & Encoding** (Advanced).
