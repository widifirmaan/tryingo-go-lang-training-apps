# context.Context: Propagasi Batas Waktu (WithTimeout), Pembatalan & Metadata

> **Kategori:** Go | **Level:** Interface, Konkurensi & Channel Pipes | **Minggu 8:** context.Context: Propagasi Batas Waktu (WithTimeout), Pembatalan & Metadata
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami peran vital paket `context.Context` sebagai standar nomor 1 di Go untuk mengelola lifecycle request
- Menggunakan context.WithTimeout() dan context.WithDeadline() untuk menegakkan Service Level Agreement (SLA)
- Memahami pentingnya selalu mengeksekusi `defer cancel()` untuk mencegah kebocoran timer di memori (*timer leak*)
- Mendengarkan saluran penutupan `<-ctx.Done()` di dalam select statement untuk menghentikan goroutine yang sia-sia
- Menyematkan metadata tracing aman menggunakan context.WithValue() dengan tipe kunci privat khusus

---

## Program: Klien HTTP Gateway dengan Propagasi Batas Waktu (Deadline Cancellation)

```go
package main

import (
	"context"
	"fmt"
	"time"
)

// 1. Tipe Kustom untuk Kunci Context (Mencegah Benturan Paket Lain)
type contextKey string

const (
	KeyTraceID   contextKey = "trace_id"
	KeyUserRole  contextKey = "user_role"
)

// Simulasi Pemanggilan Mikroservis Hulu (Upstream Database/Auth)
func panggilMicroserviceHulu(ctx context.Context, namaLayanan string, latency time.Duration) (string, error) {
	// Ekstrak metadata trace ID dari context
	traceID := "UNKNOWN"
	if tid, ok := ctx.Value(KeyTraceID).(string); ok {
		traceID = tid
	}

	fmt.Printf("[Trace: %s] Menghubungi %s (Ekspektasi: %v)...\n", traceID, namaLayanan, latency)

	// Saluran penampung hasil
	hasilChan := make(chan string, 1)

	go func() {
		time.Sleep(latency) // Simulasi kerja lambat hulu
		hasilChan <- fmt.Sprintf("Respons Sukses dari %s", namaLayanan)
	}()

	// 2. Dengarkan sinyal ctx.Done() untuk pembatalan instan!
	select {
	case <-ctx.Done():
		// Timeout terlampaui atau dibatalkan oleh parent!
		return "", fmt.Errorf("layanan %s DIBATALKAN oleh Context: %w", namaLayanan, ctx.Err())
	case hasil := <-hasilChan:
		return hasil, nil
	}
}

func main() {
	// 3. context.Background(): Akar dari seluruh pohon context
	ctxRoot := context.Background()

	// 4. context.WithValue: Menyematkan metadata penelusuran (Distributed Tracing ID)
	ctxDenganTrace := context.WithValue(ctxRoot, KeyTraceID, "TRX-NUSA-8899")

	// 5. context.WithTimeout: Menetapkan tenggat waktu keras (SLA Maksimal 200ms)
	ctxTimeout, cancel := context.WithTimeout(ctxDenganTrace, 200*time.Millisecond)
	defer cancel() // Sangat penting: Selalu panggil cancel() untuk membersihkan timer di memori!

	fmt.Println("=== Gateway Context Deadline Enforcement ===")

	// Uji 1: Layanan Cepat (Selesai dalam 80ms < 200ms) -> SUKSES
	if res, err := panggilMicroserviceHulu(ctxTimeout, "AuthService", 80*time.Millisecond); err != nil {
		fmt.Println("Eror:", err)
	} else {
		fmt.Printf("--> HASIL 1: %s\n\n", res)
	}

	// Uji 2: Layanan Lambat (Membutuhkan 400ms > 200ms) -> OTOMATIS TIMEOUT
	// Buat timeout baru untuk pengujian kedua
	ctxTimeout2, cancel2 := context.WithTimeout(ctxDenganTrace, 150*time.Millisecond)
	defer cancel2()

	if res, err := panggilMicroserviceHulu(ctxTimeout2, "LegacyPaymentWorker", 400*time.Millisecond); err != nil {
		fmt.Printf("--> HASIL 2: %v\n", err)
	} else {
		fmt.Printf("--> HASIL 2: %s\n", res)
	}
}
```

---

## Konsep Kunci

### Mengapa `context.Context` adalah Standar Wajib di Go?
Bayangkan pengguna browser membuka website Anda, lalu menutup tab browsernya setelah 1 detik.
Jika server Anda sedang menjalankan 5 query database berat yang membutuhkan waktu 10 detik:
**Tanpa Context, server Anda akan terus membuang-buang memori CPU selama 10 detik penuh untuk data yang sudah tidak dipedulikan oleh siapa pun!**

Dengan **`context.Context`**:
1. Setiap request HTTP masuk membawa `req.Context()`.
2. Jika tab browser ditutup oleh pengguna, sinyal penutupan otomatis menjalar ke seluruh pohon pemanggilan: database query dibatalkan seketika, panggilan mikroservis dihentikan, dan sumber daya dibebaskan detik itu juga!

### Tiga Pilar Penggunaan Context:
1. **`context.WithTimeout(parent, duration)`**: Menetapkan batas waktu maksimal. Jika waktu habis, `<-ctx.Done()` langsung terbuka dengan eror `context.DeadlineExceeded`.
2. **`context.WithCancel(parent)`**: Pembatalan manual kapan saja pemanggil memutuskan untuk berhenti.
3. **`context.WithValue(parent, key, value)`**: Membawa ID pelacakan (*Trace ID*), user claim, atau batas otorisasi melewati berbagai lapisan fungsi.

### Aturan Emas Context:
- Selalu letakkan `ctx context.Context` sebagai **parameter pertama** dalam deklarasi fungsi: `func DoWork(ctx context.Context, param string)`.
- Jangan simpan context di dalam struct! Context harus mengalir melewati parameter fungsi.

---

---

## Penjelasan untuk Pemula

### Analogi: Perintah Pembatalan dari Markas Militer
Bayangkan markas komando militer mengirim pasukan penjelajah ke hutan belantara (*menjalankan goroutine*):
1. **WithTimeout** seperti jam digital di pergelangan tangan prajurit yang diatur menghitung mundur 2 jam: jika dalam 2 jam misi belum selesai, prajurit wajib putar balik ke markas (*timeout*).
2. **ctx.Done()** seperti sinyal radio darurat dari komando: jika markas melihat badai topan datang, markas menekan tombol sirene (*cancel()*), radio prajurit berbunyi, dan mereka langsung berhenti melangkah detik itu juga tanpa membuang energi.

## Eksperimen

- Hapus defer cancel() dan jalankan go vet ./... untuk melihat linter mendeteksi peringatan the cancel function is not called.
- Ubah SLA timeout menjadi 500ms dan buktikan kedua layanan berhasil diselesaikan tanpa eror.
- Cetak ctx.Err() saat timeout terjadi untuk mengamati pesan context.DeadlineExceeded.
- Rangkai dua context berurutan untuk melihat bagaimana pembatalan parent otomatis membatalkan seluruh child context.

---

## Tantangan

Buat fungsi `QueryDatabaseDenganTimeout(ctx context.Context, sql string) error` yang menjalankan query simulasi 300ms, namun dibatasi oleh timeout context 100ms dengan penanganan rollback transaksi.

---

## Model Mental & Diagram Alur Visual

![Diagram CSP Goroutine & Channel Communication Pipeline](/diagrams/goroutine-channel.svg)

```diagram
┌────────────────┐                     ┌────────────────┐
│  GOROUTINE A   │                     │  GOROUTINE B   │
│  (Worker Thread)                     │  (Consumer)    │
│  ch <- 42      │ ─── Kirim Data ──► │  val := <-ch   │
└────────────────┘   [ CHANNEL: chan ] └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `var x int / x := 42`
- **Fungsi Utama:** Deklarasi variabel statis dan deklarasi pendek (Short Declaration).
- **Parameter / Atribut:** `Identifier, Type / Value`.
- **Perilaku & Efek Sistem:** `:=` menginferensi tipe data secara otomatis di dalam fungsi; `var` digunakan untuk deklarasi paket atau nilai default.
- **Contoh Penggunaan Praktis:**
```javascript
age := 25
name := "Alex Iskandar"
fmt.Printf("%s berusia %d tahun
", name, age);
```
- **Hasil Output yang Diharapkan:**
```text
Alex Iskandar berusia 25 tahun
```

### 2. `func (r Receiver) Method() ReturnType`
- **Fungsi Utama:** Penerapan Method pada Struct (OOP ala Go).
- **Parameter / Atribut:** `Receiver (value/pointer), Parameters`.
- **Perilaku & Efek Sistem:** Menghubungkan fungsi khusus ke tipe struct untuk membentuk perilaku objek tanpa class inheritance hierarki.
- **Contoh Penggunaan Praktis:**
```javascript
type User struct { Name string }
func (u User) Greet() string {
  return "Halo, " + u.Name
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan string sapaan personal
```

### 3. `go func() { ... }()`
- **Fungsi Utama:** Eksekusi thread ringan konkuren (Goroutine).
- **Parameter / Atribut:** `Fungsi anonim / fungsi bernama`.
- **Perilaku & Efek Sistem:** Menjalankan komputasi di thread runtime Go yang sangat ringan (hanya ~2KB memori awal).
- **Contoh Penggunaan Praktis:**
```javascript
go func() {
  fmt.Println("Berjalan konkuren di goroutine terpisah!")
}()
```
- **Hasil Output yang Diharapkan:**
```text
Dieksekusi asinkron tanpa memblokir alur utama program
```

### 4. `ch := make(chan string); ch <- val; val := <-ch`
- **Fungsi Utama:** Saluran komunikasi antar goroutine (Channel).
- **Parameter / Atribut:** `Tipe data channel, kapasitas buffer`.
- **Perilaku & Efek Sistem:** Mengirim dan menerima data antar goroutine dengan sinkronisasi bawaan tanpa perlu lock/mutex manual.
- **Contoh Penggunaan Praktis:**
```javascript
ch := make(chan int)
go func() { ch <- 100 }()
result := <-ch
fmt.Println("Diterima:", result);
```
- **Hasil Output yang Diharapkan:**
```text
Diterima: 100
```


---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Nil Pointer Dereference (Panic)
- **Gejala / Masalah:** Aplikasi panic dan crash seketika saat mengakses field struct pada pointer bernilai `nil`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu validasi `if ptr != nil { ... }` sebelum memanggil method atau membaca field.

### 2. Goroutine Leak (Macet Selamanya)
- **Gejala / Masalah:** Goroutine menunggu baca/tulis pada channel tanpa pernah dihentikan, menguras memori server.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `context.WithCancel` atau buffered channel untuk memastikan goroutine memiliki titik keluar pasti.

### 3. Shadowing Variabel dengan Operator :=
- **Gejala / Masalah:** Variabel luar tidak terisi karena variabel baru dengan nama yang sama dibuat di dalam blok `if/err`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Periksa kembali deklarasi pendek `:=` vs assignment biasa `=` saat menangani error.

---

## Ringkasan

Kamu telah menguasai context.Context, WithTimeout, WithValue, dan propagasi pembatalan. Minggu depan kita memasuki Level 3: net/http dan Arsitektur Middleware.
