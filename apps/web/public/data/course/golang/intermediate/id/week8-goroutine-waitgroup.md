# Goroutine & WaitGroup

> Kategori: Go, Bahasa Pemrograman | Level: Menengah | Week 8

## Tujuan Pembelajaran

- Menjalankan goroutine dengan keyword go
- Menggunakan sync.WaitGroup
- Menerapkan sync.Mutex
- Mendeteksi race condition
- Memahami model concurrency Go

---

## Program: Eksekusi Paralel

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

func main() {
    go func() {
        fmt.Println("Hello dari goroutine!")
    }()
    time.Sleep(10 * time.Millisecond)

    var wg sync.WaitGroup
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            fmt.Printf("Worker %d mulai\n", id)
            time.Sleep(50 * time.Millisecond)
            fmt.Printf("Worker %d selesai\n", id)
        }(i)
    }
    wg.Wait()
    fmt.Println("Semua worker selesai!")

    type Akun struct {
        mu    sync.Mutex
        Saldo int
    }
    akun := &Akun{}
    var wg2 sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg2.Add(1)
        go func() {
            defer wg2.Done()
            akun.mu.Lock()
            akun.Saldo += 100
            akun.mu.Unlock()
        }()
    }
    wg2.Wait()
    fmt.Println("Saldo akhir:", akun.Saldo)
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Goroutine

`go func()` menjalankan fungsi sebagai goroutine -- thread ringan Go runtime. Jauh lebih ringan dari OS thread.

### WaitGroup

`sync.WaitGroup`: `Add(1)` sebelum launch, `Done()` di akhir, `Wait()` untuk menunggu semua selesai.

### Mutex

`sync.Mutex` mencegah race condition. `Lock()` sebelum akses, `Unlock()` setelah. Pola: `defer mu.Unlock()`.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Tambah worker** -- ubah loop dari 3 jadi 5 goroutine
2. **Hapus Mutex** -- komentari `Lock()/Unlock()`, lihat hasil tak terduga
3. **Ubah delay** -- ganti `50ms` jadi `100ms`

---

## Tantangan

Buat worker pool: 5 worker, 20 job (angka), worker menghitung kuadrat. Gunakan WaitGroup dan channel.

---

## Ringkasan

Goroutine = concurrent programming ringan. WaitGroup untuk sinkronisasi. Mutex untuk akses aman. `go run -race` deteksi race condition. Minggu depan: channel, select, context.
