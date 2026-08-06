# Goroutine & Channel

> **Kategori:** Go | **Level:** Menengah | **Minggu 8:** Goroutine & Channel

## Tujuan Pembelajaran

- Menjalankan goroutine dengan go keyword (Go Tour: Concurrency)
- Unbuffered channel: sinkron, pengirim menunggu penerima
- Buffered channel: async sampai buffer penuh
- select untuk multiplexing multiple channel
- Pipeline pattern: generator → processor → collector

---

## Program: Unduhan Paralel

```go
package main

import (
    "fmt"
    "time"
)

func generate(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums { out <- n }
        close(out)
    }()
    return out
}

func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in { out <- n * n }
        close(out)
    }()
    return out
}

func main() {
    ch := make(chan string)
    go func() { ch <- "Halo dari goroutine" }()
    msg := <-ch
    fmt.Println("Channel:", msg)

    buf := make(chan int, 3)
    buf <- 1; buf <- 2; buf <- 3
    fmt.Println("Buffered:", <-buf, <-buf, <-buf)

    fmt.Print("Pipeline: ")
    nums := generate(1, 2, 3, 4, 5)
    squares := square(nums)
    for s := range squares { fmt.Printf("%d ", s) }
    fmt.Println()

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
    case msg := <-ch1: fmt.Println("Dari ch1:", msg)
    case msg := <-ch2: fmt.Println("Dari ch2:", msg)
    case <-time.After(200 * time.Millisecond): fmt.Println("Timeout")
    }
}
```

---

## Konsep Kunci

### Goroutine
`go f()` — concurrent, ringan, dijadwalkan Go runtime.

### Channel
Unbuffered (sinkron) vs buffered (async). `ch <- v` kirim, `<-ch` terima.

### Select & Pipeline
`select` untuk multiplexing. Pipeline: generator → processor → collector.

---

## Eksperimen

- Buat pipeline 3 stage: generate → double → print
- Coba select dengan default case (non-blocking)
- Buat fan-in: gabungkan 2 channel ke 1
- Implementasikan worker pool dengan WaitGroup

---

## Tantangan

Buat web crawler concurrent: fetch multiple URLs secara paralel dengan goroutine + channel. Batasi concurrency dengan worker pool.

---

## Ringkasan

Minggu 8 dari 13: **Goroutine & Channel** (Level: Menengah). Ini yang membuat Go unik. Minggu depan: **Context & Sinkronisasi**.
