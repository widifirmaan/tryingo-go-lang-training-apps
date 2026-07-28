# Standard Library: I/O & Waktu

> Go | Modul 13

## Tujuan Pembelajaran

- Memahami io.Reader dan io.Writer
- Membaca file dengan os dan bufio
- Memanipulasi string dan strconv
- Menggunakan time (Duration, Format, Ticker)
- Menerapkan log dan log/slog

---

## Program: Pembaca Log

```go
package main

import (
    "bufio"
    "fmt"
    "log"
    "strings"
    "time"
)

// io.Reader with strings
func processData(data string) {
    scanner := bufio.NewScanner(strings.NewReader(data))
    lineNum := 1
    for scanner.Scan() {
        line := scanner.Text()
        fmt.Printf("%d: %s\n", lineNum, line)
        lineNum++
    }
}

func main() {
    // String manipulation
    text := "  Go Programming Language  "
    fmt.Println("Trimmed:", strings.TrimSpace(text))
    fmt.Println("Replace:", strings.ReplaceAll(text, "Go", "Go"))
    fmt.Println("Fields:", strings.Fields(text))

    // strconv (simulasi)
    numStr := "42"
    var num int = 0
    _, _ = fmt.Sscanf(numStr, "%d", &num)
    fmt.Printf("Parsed int: %d\n", num)

    // bufio.Scanner
    data := "baris pertama\nbaris kedua\nbaris ketiga"
    fmt.Println("\n=== Scanner ===")
    processData(data)

    // time
    now := time.Now()
    fmt.Println("\nSekarang:", now.Format("2006-01-02 15:04:05"))
    fmt.Println("Tanggal:", now.Format("Monday, 2 January 2006"))

    duration := 2*time.Hour + 30*time.Minute
    fmt.Printf("Durasi: %v (menit: %.0f)\n", duration, duration.Minutes())

    // log
    log.Println("Aplikasi berjalan")
    log.Printf("Memproses %d item\n", 10)
}
```

---

## Penjelasan

`io.Reader` dan `io.Writer` adalah interface fundamental untuk I/O. `bufio.Scanner` membaca baris per baris. `strings` package untuk manipulasi teks. `strconv` untuk konversi string⇄number. `time` untuk waktu, durasi, dan ticker. `log/slog` untuk structured logging.

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

Modul 13 dari 16: **Standard Library: I/O & Waktu**. Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **14. Encoding: JSON & Data**.
