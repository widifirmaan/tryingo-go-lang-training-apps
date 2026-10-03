# Control Flow Idiomatik: if with Short Statement, switch & Error Handling Eksplisit

> **Kategori:** Go | **Level:** Pondasi Go & Sistem Tipe Statis | **Minggu 2:** Control Flow Idiomatik: if with Short Statement, switch & Error Handling Eksplisit

## Tujuan Pembelajaran

- Memahami filosofi penanganan eror Go: Errors Are Values (Eror adalah nilai biasa, bukan Exception/try-catch)
- Menggunakan pola standar idiomatik Go: if err != nil { return nil, err }
- Membuat Sentinel Errors menggunakan errors.New() dan membungkus eror dengan fmt.Errorf("%w")
- Menguasai sintaks if with short statement (if x, err := fn(); err != nil)
- Mengetahui bahwa Go hanya memiliki satu kata kunci perulangan yaitu for loop yang dapat berperan sebagai while atau foreach

---

## Program: Parser Konfigurasi Gateway & Validasi Format Port Jaringan

```go
package main

import (
	"errors"
	"fmt"
	"strconv"
	"strings"
)

// Definisi Kesalahan Baku (Sentinel Errors)
var (
	ErrPortTidakValid   = errors.New("port harus berada di antara 1 dan 65535")
	ErrHostKosong       = errors.New("host tujuan tidak boleh kosong")
	ErrProtokolDitolak = errors.New("protokol harus berupa http atau https")
)

// Fungsi Validasi Konfigurasi Target Gateway
func parseTargetURL(rawURL string) (string, int, error) {
	if strings.TrimSpace(rawURL) == "" {
		return "", 0, ErrHostKosong
	}

	parts := strings.Split(rawURL, ":")
	if len(parts) != 2 {
		return "", 0, fmt.Errorf("format URL salah: %s (harus host:port)", rawURL)
	}

	host := parts[0]
	portStr := parts[1]

	// strconv.Atoi mengembalikan (int, error)
	port, err := strconv.Atoi(portStr)
	if err != nil {
		return "", 0, fmt.Errorf("port bukan angka valid: %w", err)
	}

	if port < 1 || port > 65535 {
		return "", 0, ErrPortTidakValid
	}

	return host, port, nil
}

func main() {
	daftarTarget := []string{
		"auth-service.internal:8081",
		"payment-api.internal:99999", // Port invalid
		"billing-worker:invalid_port", // Bukan angka
		"analytics-service:443",
	}

	fmt.Println("=== Validasi Konfigurasi Gateway ===")

	// Go hanya memiliki 1 jenis perulangan: for loop!
	for _, target := range daftarTarget {
		// if with short statement: scope 'err' terisolasi hanya di dalam blok if
		if host, port, err := parseTargetURL(target); err != nil {
			fmt.Printf("[REJECT] Target '%s' GAGAL: %v\n", target, err)
		} else {
			fmt.Printf("[ACCEPT] Target '%s' -> Host: %s, Port: %d\n", target, host, port)
		}
	}
}
```

---

## Konsep Kunci

### Mengapa Go Tidak Memiliki `try-catch` / Exceptions?
Di bahasa seperti Java, Python, atau JavaScript, sebuah fungsi bisa melempar exception kapan saja secara tak terlihat (*invisible control flow*). Pengembang sering lupa membungkusnya dengan `try-catch`, menyebabkan aplikasi crash tiba-tiba di production.

**Prinsip Go: Eror adalah Nilai (*Errors are values*)**:
1. Eror adalah tipe interface bawaan biasa: `type error interface { Error() string }`.
2. Jika fungsi berisiko gagal, fungsi tersebut **wajib mengembalikan `error` sebagai nilai terakhir**.
3. Pemanggil fungsi wajib memeriksa `if err != nil`. Tidak ada keajaiban sembunyi-sembunyi!

### `if with short statement`
Go mengizinkan eksekusi satu instruksi sebelum evaluasi kondisi:
`if host, port, err := parseTargetURL(url); err != nil { ... }`
Variabel `host`, `port`, dan `err` **hanya hidup di dalam cakupan blok `if-else` tersebut**, menjaga namespace luar tetap bersih dan mencegah kebocoran variabel!

### Hanya Ada Satu Loop: `for`
Go membuang kata kunci `while` dan `do-while`.
- `for i := 0; i < 10; i++`: Loop standar.
- `for kondisi`: Berperan sebagai `while`.
- `for { ... }`: Loop tak terhingga (*infinite loop*).
- `for idx, val := range collection`: Berperan sebagai `foreach`.

---

---

## Penjelasan untuk Pemula

### Analogi: Pemeriksaan Bagasi Bandara & Resep Obat Dokter
1. **Try-Catch di bahasa lain** seperti granat tersembunyi di dalam koper: Anda tidak tahu koper mana yang meledak sampai Anda membukanya di tengah jalan (*aplikasi tiba-tiba crash*).
2. **Error di Go** seperti stempel bea cukai di paspor: setiap tas diperiksa satu per satu di loket meja (*if err != nil*). Jika tas membawa barang terlarang, petugas langsung mengembalikan tas ke pemiliknya di meja loket saat itu juga.

## Eksperimen

- Masukkan URL tanpa port (misal: "google.com") dan amati pesan eror kustom format URL salah.
- Gunakan errors.Is(err, ErrPortTidakValid) untuk memeriksa jenis sentinel error secara terprogram.
- Tulis for loop bergaya while dengan kondisi pencacah counter < 5.
- Uji pembungkusan eror menggunakan %w dan bongkar menggunakan errors.Unwrap(err).

---

## Tantangan

Buat fungsi `ValidasiHeaderAPI(headers map[string]string) error` yang memeriksa keberadaan header "Authorization" dan "X-Request-ID". Kembalikan error deskriptif jika salah satu header penting tersebut hilang.

---

## Ringkasan

Kamu telah menguasai error handling eksplisit, sentinel errors, dan loop for serbaguna. Minggu depan kita mempelajari Slices, Arrays, dan Maps mendalam.
