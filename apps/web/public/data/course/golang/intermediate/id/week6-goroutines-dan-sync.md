# Konkurensi: Jutaan Goroutines (go), sync.WaitGroup, Mutex & Race Detector

> **Kategori:** Go | **Level:** Interface, Konkurensi & Channel Pipes | **Minggu 6:** Konkurensi: Jutaan Goroutines (go), sync.WaitGroup, Mutex & Race Detector
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami perbedaan Konkurensi (menangani banyak hal sekaligus) vs Paralelisme (mengeksekusi banyak hal bersamaan di multi-core)
- Meluncurkan thread ringan (*goroutine*) menggunakan kata kunci sederhana `go` (hanya butuh ~2KB memori awal per goroutine)
- Menggunakan sync.WaitGroup (Add, Done, Wait) untuk mengoordinasikan selesainya sekelompok goroutine
- Mencegah fenomena Data Race menggunakan sync.Mutex (Lock, Unlock, defer Unlock)
- Menjalankan kompilasi dengan race detector aktif (-race flag: go run -race main.go) untuk mendeteksi bug konkurensi tersembunyi

---

## Program: Pemeriksa Kesehatan Ratusan Endpoint Paralel (Concurrent Health Checker)

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

// Struktur Data Hasil Pengecekan Aman-Thread (Thread-Safe)
type LaporanKluster struct {
	mu            sync.Mutex // Mutex mencegah Data Race saat banyak goroutine menulis bersamaan
	hasilPengecekan map[string]bool
	totalSukses   int
}

func (l *LaporanKluster) CatatHasil(endpoint string, sukses bool) {
	// Kunci akses memori eksklusif
	l.mu.Lock()
	defer l.mu.Unlock() // Otomatis lepas kunci saat fungsi selesai dieksekusi

	l.hasilPengecekan[endpoint] = sukses
	if sukses {
		l.totalSukses++
	}
}

func cekEndpoint(endpoint string, laporan *LaporanKluster, wg *sync.WaitGroup) {
	// Beri tahu WaitGroup bahwa goroutine ini telah selesai saat fungsi keluar
	defer wg.Done()

	// Simulasi request jaringan I/O
	time.Sleep(100 * time.Millisecond)
	isUp := len(endpoint)%2 == 0 // Simulasi acak kesehatan

	laporan.CatatHasil(endpoint, isUp)
	fmt.Printf("[Goroutine] Selesai memeriksa: %-30s | Status: %v\n", endpoint, isUp)
}

func main() {
	daftarEndpoint := []string{
		"http://auth-service.prod:8080/health",
		"http://payment-gateway.prod:8081/health",
		"http://notification-hub.prod:8082/health",
		"http://inventory-engine.prod:8083/health",
		"http://reporting-worker.prod:8084/health",
	}

	laporan := &LaporanKluster{
		hasilPengecekan: make(map[string]bool),
	}

	// sync.WaitGroup: Penghitung sinkronisasi untuk menunggu seluruh goroutine selesai
	var wg sync.WaitGroup

	waktuMulai := time.Now()
	fmt.Println("=== Memulai Pengecekan 5 Endpoint Secara Konkuren ===")

	for _, ep := range daftarEndpoint {
		wg.Add(1) // Tambah penghitung tugas
		
		// KATA KUNCI 'go': Meluncurkan fungsi sebagai Goroutine ringan independen!
		go cekEndpoint(ep, laporan, &wg)
	}

	// Tunggu sampai seluruh goroutine memanggil wg.Done() (penghitung kembali ke 0)
	wg.Wait()

	durasi := time.Since(waktuMulai)
	fmt.Printf("\nSeluruh pengecekan selesai dalam %v (Bukan 500ms, tapi paralel ~100ms!)\n", durasi)
	fmt.Printf("Total Layanan Sehat: %d / %d\n", laporan.totalSukses, len(daftarEndpoint))
}
```

---

## Konsep Kunci

### Mengapa Goroutine Jauh Lebih Unggul dari OS Thread?
Di bahasa tradisional (Java, C++, Python):
Satu thread sistem operasi (*OS Thread*) memakan memori **1 sampai 2 Megabyte**. Jika server Anda membuka 10.000 thread, memori RAM 16GB langsung habis terbakar dan server mengalami *Out Of Memory (OOM)*.

Di **Go**:
1. Sebuah **Goroutine** hanya membutuhkan memori awal **~2 Kilobyte**!
2. Go mengelola jatah waktu thread menggunakan runtime scheduler canggih berbasis model **M:N Scheduler** (ribuan goroutine dipetakan ke sedikit OS thread di CPU).
3. Anda bisa menyalakan **1.000.000 (satu juta) goroutines sekaligus** di laptop biasa tanpa kehabisan memori!

### Bahaya Fatal: Data Race & Solusi Mutex
Ketika 5 goroutine mencoba menulis atau menambah angka ke map yang sama secara bersamaan di memori, terjadi **Data Race**. Data Anda akan korup atau program crash dengan pesan: `fatal error: concurrent map writes`.
**`sync.Mutex`** menyelesaikan ini:
Sebelum menulis data, panggil `mu.Lock()`. Goroutine lain yang ingin menulis harus mengantre tertib sampai goroutine pertama memanggil `mu.Unlock()`.

### Detektor Balapan Bawaan Go (`-race`)
Go memiliki alat pendeteksi bug konkurensi terhebat di dunia industri: **Go Race Detector**.
Cukup jalankan: `go run -race main.go`.
Compiler akan menganalisis memori dan memberi tahu baris kode mana yang mengalami tabrakan data secara akurat!

---

---

## Penjelasan untuk Pemula

### Analogi: Truk Kontainer Raksasa vs Armada 10.000 Semut Pekerja
1. **OS Thread Tradisional** seperti truk kontainer 18 roda: jika Anda ingin mengantarkan satu lembar amplop surat, Anda harus menyalakan mesin truk 5000cc, membutuhkan jalan raya lebar (*2MB RAM*), dan menghabiskan bahan bakar besar.
2. **Goroutine** seperti kawanan semut kurir super cepat: semut sangat kecil (*2KB memori*), Anda bisa mengirim 1 juta semut sekaligus dalam satu detik, dan mereka membawa surat melewati celah kecil tanpa memacetkan jalan raya.
3. **Mutex** seperti kunci gerendel pintu toilet umum: jika satu orang sudah masuk dan mengunci gerendel (*mu.Lock()*), orang lain di luar harus menunggu sampai orang pertama keluar dan membuka gerendel (*mu.Unlock()*).

## Eksperimen

- Hapus mu.Lock() dan mu.Unlock() dari CatatHasil, jalankan go run -race main.go, dan saksikan detektor race mencetak peringatan merah WARNING: DATA RACE!
- Ganti jumlah endpoint menjadi 100 dan amati bahwa total waktu eksekusi tetap berada di kisaran ~100ms berkat paralelisme.
- Lupa memanggil wg.Done() dan amati aplikasi macet selamanya (fatal error: all goroutines are asleep - deadlock!).
- Pelajari sync.RWMutex (RLock untuk banyak pembaca bersamaan, Lock eksklusif hanya untuk penulis).

---

## Tantangan

Buat worker pool konkuren: buat 3 goroutine pekerja yang mengambil URL dari antrean tugas dan memeriksa statusnya secara paralel hingga seluruh tugas antrean selesai.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

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

Kamu telah menguasai Goroutines, sync.WaitGroup, Mutex, dan alat deteksi -race. Minggu depan kita mempelajari Channels dan multiplexing select.
