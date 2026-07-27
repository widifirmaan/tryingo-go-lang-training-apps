# Pattern Lanjutan & Proyek Akhir

> Kategori: Go, Bahasa Pemrograman | Level: Lanjutan | Week 14

## Tujuan Pembelajaran

- Menerapkan worker pool pattern
- Menggunakan fan-in/fan-out
- Melakukan profiling dengan pprof
- Mengintegrasikan semua komponen
- Menulis kode Go production-ready

---

## Program: Proyek Akhir

```go
package main

import (
    "fmt"
    "sync"
)

func workerPool(numWorkers int, jobs <-chan int, results chan<- int) {
    var wg sync.WaitGroup
    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            for job := range jobs { results <- job * 2 }
        }(i)
    }
    wg.Wait()
    close(results)
}

func fanIn(channels ...<-chan string) <-chan string {
    out := make(chan string)
    var wg sync.WaitGroup
    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan string) {
            defer wg.Done()
            for msg := range c { out <- msg }
        }(ch)
    }
    go func() { wg.Wait(); close(out) }()
    return out
}

func main() {
    fmt.Println("-- Worker Pool --")
    jobs := make(chan int, 10)
    results := make(chan int, 10)
    for i := 1; i <= 5; i++ { jobs <- i }
    close(jobs)
    go workerPool(3, jobs, results)
    for r := range results { fmt.Printf("Hasil: %d\n", r) }

    fmt.Println("\n-- Fan-in --")
    ch1 := make(chan string)
    ch2 := make(chan string)
    go func() { ch1 <- "data A1"; ch1 <- "data A2"; close(ch1) }()
    go func() { ch2 <- "data B1"; ch2 <- "data B2"; close(ch2) }()
    merged := fanIn(ch1, ch2)
    for msg := range merged { fmt.Println(msg) }

    fmt.Println("\nProyek akhir siap dikembangkan!")
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Worker Pool

Memproses banyak job dengan jumlah worker tetap. Jobs via channel, results via channel lain.

### Fan-in

Menggabungkan beberapa channel jadi satu. Berguna untuk data dari multiple sumber.

### Final Project

Integrasi: CLI, REST API, middleware, database, Docker, testing -- seluruh stack Go production.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Ubah jumlah worker** -- ganti `3` jadi `5` atau `1`
2. **Tambah data fan-in** -- buat ch3 dengan data sendiri
3. **Ubah operasi** -- ganti `job * 2` jadi `job * job` (kuadrat)

---

## Tantangan

Bangun micro-blog: CLI `add "judul" "isi"` untuk menambah, `serve` untuk API. Gunakan middleware logging dan graceful shutdown dengan context.

---

## Ringkasan

Worker pool, fan-in, pipeline -- pola konkurensi esensial. Final project integrasi: CLI + API + database + Docker + testing. Selamat menyelesaikan kurikulum Go!
