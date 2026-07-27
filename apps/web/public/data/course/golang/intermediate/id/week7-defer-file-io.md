# Defer, Panic & File I/O

> Kategori: Go, Bahasa Pemrograman | Level: Menengah | Week 7

## Tujuan Pembelajaran

- Menggunakan defer untuk menjadwalkan eksekusi
- Memahami stack LIFO pada multiple defer
- Menerapkan panic dan recover
- Membaca dan menulis file dengan os package
- Menggunakan bufio.Scanner

---

## Program: Manajemen Sumber Daya

```go
package main

import "fmt"

func main() {
    fmt.Println("Mulai")
    defer fmt.Println("1. defer: pertama")
    defer fmt.Println("2. defer: kedua")
    defer fmt.Println("3. defer: ketiga")
    fmt.Println("Selesai -- defer akan dijalankan:")

    hasil := bagiAman(10, 2)
    fmt.Println("10 / 2 =", hasil)

    hasil = bagiAman(10, 0)
    fmt.Println("10 / 0 =", hasil)

    data := bacaFile("contoh.txt")
    fmt.Println("Isi file:", data)

    fmt.Println("Program selesai tanpa crash!")
}

func bagiAman(a, b int) (hasil int) {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recover dari panic:", r)
            hasil = 0
        }
    }()
    return a / b
}

func bacaFile(nama string) string {
    defer fmt.Println("(file ditutup di sini)")
    if nama == "" {
        return "Error: nama file kosong"
    }
    return "[simulasi konten file]"
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Defer

`defer` menjadwalkan fungsi setelah fungsi induk selesai. Sering untuk cleanup. **LIFO**: defer terakhir = dieksekusi pertama.

### Panic & Recover

`panic` menghentikan eksekusi. `recover()` dalam `defer` menangkap panic. Untuk error tak terduga.

### File I/O

Di Go: `os.ReadFile()`, `os.WriteFile()`, `bufio.NewScanner()`. Karena playground tidak punya akses file sistem, kode di sini menggunakan simulasi.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Ubah urutan defer** -- pindahkan posisi defer dan lihat urutan output
2. **Bagi dengan 0** -- coba pembagian lain yang menghasilkan panic
3. **File kosong** -- panggil `bacaFile("")` dan lihat error handling

---

## Tantangan

Buat simulasi operasi file: `saveData(filename, content string) error` dengan defer, `loadData(filename string) (string, error)` dengan error handling. Gunakan panic/recover untuk validasi.

---

## Ringkasan

Defer menjamin resource cleanup. Panic/recover untuk error tak terduga. `defer f.Close()` pola standar Go. Minggu depan: goroutine dan konkurensi.
