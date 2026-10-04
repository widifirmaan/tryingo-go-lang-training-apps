# Interfaces & Duck Typing: Komposisi Implisit, Type Assertions & Tipe any

> **Kategori:** Go | **Level:** Interface, Konkurensi & Channel Pipes | **Minggu 5:** Interfaces & Duck Typing: Komposisi Implisit, Type Assertions & Tipe any
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami filosofi Duck Typing di Go: "If it walks like a duck and quacks like a duck, it is a duck"
- Mengetahui bahwa Go sama sekali tidak memiliki kata kunci `implements` (implementasi kontrak bersifat 100% implisit)
- Menerapkan prinsip Interface Segregation: membuat interface kecil berukuran 1-3 method (misal io.Reader, io.Writer)
- Menggunakan Type Assertion (val.(ConcreteType)) dan Type Switch untuk inspeksi tipe dinamis
- Memahami penggunaan tipe `any` (alias untuk interface{}) dan batas keamanannya

---

## Program: Adapter Penyimpanan Cache Gateway (Memory vs Redis Cache Adapter)

```go
package main

import (
	"fmt"
	"time"
)

// 1. Interface: Kontrak Perilaku Murni (Tanpa Implementasi)
// Aturan Go: "Interfaces should be small and discovered, not designed up-front."
type PenyimpanCache interface {
	Simpan(kunci string, nilai string, ttl time.Duration) error
	Ambil(kunci string) (string, bool)
	Hapus(kunci string) error
}

// 2. Implementasi 1: In-Memory Map Cache
type MemoryCache struct {
	storage map[string]string
}

func NewMemoryCache() *MemoryCache {
	return &MemoryCache{storage: make(map[string]string)}
}

// Implementasi implisit (Tidak ada kata kunci 'implements' di Go!)
func (m *MemoryCache) Simpan(kunci string, nilai string, ttl time.Duration) error {
	m.storage[kunci] = nilai
	return nil
}

func (m *MemoryCache) Ambil(kunci string) (string, bool) {
	val, ok := m.storage[kunci]
	return val, ok
}

func (m *MemoryCache) Hapus(kunci string) error {
	delete(m.storage, kunci)
	return nil
}

// 3. Fungsi Konsumen: Bergantung pada Interface, Bukan Implementasi Konkret
func daftarkanSesiUser(cache PenyimpanCache, token string, userId string) {
	err := cache.Simpan(token, userId, 15*time.Minute)
	if err != nil {
		fmt.Println("Gagal menyimpan sesi:", err)
		return
	}
	fmt.Printf("[Cache Engine] Sesi token '%s' tersimpan untuk user '%s'\n", token, userId)
}

func main() {
	// Membuktikan Duck Typing: MemoryCache otomatis dianggap sebagai PenyimpanCache
	cacheEngine := NewMemoryCache()
	daftarkanSesiUser(cacheEngine, "sess_abc123", "USR-9988")

	if val, ok := cacheEngine.Ambil("sess_abc123"); ok {
		fmt.Printf("Verifikasi Cache Hit: User ID = %s\n", val)
	}

	// 4. Type Switch & Type Assertion
	var objekBebas any = "Teks String Bebas"
	switch v := objekBebas.(type) {
	case string:
		fmt.Println("Tipe data terdeteksi: string, panjang =", len(v))
	case int:
		fmt.Println("Tipe data terdeteksi: integer =", v)
	default:
		fmt.Println("Tipe data tidak diketahui")
	}
}
```

---

## Konsep Kunci

### Mengapa Interface di Go Sangat Revolusioner?
Di Java, C#, atau TypeScript, Anda harus secara eksplisit menulis:
`class MemoryCache implements PenyimpanCache`.
Ini menciptakan ikatan kaku (*tight coupling*): jika library pihak ketiga tidak mengimplementasikan interface Anda, Anda tidak bisa menggunakannya.

**Di Go, Interface bersifat IMPLISIT**:
Jika struct Anda memiliki method `Simpan`, `Ambil`, dan `Hapus` dengan tanda tangan yang sama, struct Anda **secara otomatis dianggap telah mengimplementasikan `PenyimpanCache` tanpa deklarasi apapun**!
Penulis struct tidak perlu tahu bahwa interface tersebut ada. Pembuat interface-lah yang menentukan kontrak yang ia butuhkan.

### Pepatah Go: "Semakin Besar Interface, Semakin Lemah Abstraksinya"
Standard library Go terkenal dengan interface satu-method yang sangat kuat:
- `io.Reader`: `Read(p []byte) (n int, err error)`
- `io.Writer`: `Write(p []byte) (n int, err error)`
- `fmt.Stringer`: `String() string`
Hindari membuat interface raksasa dengan 20 method! Buat interface mini dan gabungkan jika diperlukan.

---

---

## Penjelasan untuk Pemula

### Analogi: Colokan Stopkontak Dinding Dua Lubang
Di rumah Anda, ada stopkontak listrik 2 lubang di dinding (*Interface PenyimpanCache*).
Pabrik kipas angin, pabrik kulkas, dan pabrik charger ponsel (*struct MemoryCache / RedisCache*) tidak pernah saling kenal. Namun asalkan steker kabel mereka memiliki 2 batang besi berjarak standar (*memiliki method yang cocok*), semua alat tersebut otomatis bisa dicolokkan ke stopkontak dinding tanpa perlu surat perjanjian pabrik (*tanpa implements*).

## Eksperimen

- Buat struct baru RedisCache dan implementasikan ketiga method-nya; oper ke daftarkanSesiUser untuk membuktikan polimorfisme instan.
- Hapus method Hapus dari MemoryCache dan amati pesan kompilasi compiler: "does not implement PenyimpanCache (missing method Hapus)".
- Gunakan Type Assertion val, ok := objekBebas.(string) untuk membaca nilai string secara aman.
- Gabungkan dua interface kecil menjadi satu interface gabungan menggunakan teknik Interface Embedding.

---

## Tantangan

Rancang interface `PenyaringTrafik` dengan method `Izinkan(ip string) bool`. Implementasikan dua struct: `WhiteListFilter` (hanya izinkan IP terdaftar) dan `RateLimitFilter` (batasi maksimal 5 hit).

---

## Model Mental & Diagram Alur Visual

![Diagram CSP Goroutine & Channel Communication Pipeline](/diagrams/goroutine-channel.svg)

```diagram
┌────────────────┐                     ┌────────────────┐
│  GOROUTINE A   │                     │  GOROUTINE B   │
│  (Worker Thread)                     │  (Consumer)    │
│  ch <- 42      │ ─── Kirim Data ──►  │  val := <-ch   │
└────────────────┘   [ CHANNEL: chan ] └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `var x int / x := 42`
- **Fungsi Utama:** Deklarasi variabel statis dan pendek.
- **Parameter / Atribut:** `Identifier, Type / Value`.
- **Perilaku & Efek Sistem:** `:=` menginferensi tipe data otomatis dalam fungsi; `var` untuk nilai default..
- **Contoh Penggunaan Praktis:**
```go
package main

import "fmt"

func main() {
	age := 25
	name := "Alex"
	fmt.Printf("%s berusia %d tahun\n", name, age)
}
```
- **Hasil Output yang Diharapkan:**
```output
Alex berusia 25 tahun
```

### 2. `func (r Receiver) Method() ReturnType`
- **Fungsi Utama:** Penerapan Method pada Struct (OOP ala Go).
- **Parameter / Atribut:** `Receiver (value/pointer), Parameters`.
- **Perilaku & Efek Sistem:** Menghubungkan fungsi khusus ke tipe struct untuk membentuk perilaku objek tanpa pewarisan..
- **Contoh Penggunaan Praktis:**
```go
package main

import "fmt"

type User struct {
	Name string
}

func (u User) Greet() string {
	return "Halo, " + u.Name
}

func main() {
	u := User{Name: "Budi"}
	fmt.Println(u.Greet())
}
```
- **Hasil Output yang Diharapkan:**
```output
Halo, Budi
```

### 3. `go func() { ... }()`
- **Fungsi Utama:** Eksekusi thread ringan konkuren (Goroutine).
- **Parameter / Atribut:** `Fungsi anonim / bernama`.
- **Perilaku & Efek Sistem:** Menjalankan komputasi di thread runtime Go yang sangat ringan (~2KB memori awal)..
- **Contoh Penggunaan Praktis:**
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	go func() {
		fmt.Println("Berjalan di goroutine terpisah!")
	}()
	time.Sleep(50 * time.Millisecond)
	fmt.Println("Selesai alur utama")
}
```
- **Hasil Output yang Diharapkan:**
```output
Berjalan di goroutine terpisah!
Selesai alur utama
```

### 4. `ch := make(chan int); ch <- 42; val := <-ch`
- **Fungsi Utama:** Saluran komunikasi antar goroutine (Channel).
- **Parameter / Atribut:** `Tipe data channel, kapasitas buffer`.
- **Perilaku & Efek Sistem:** Mengirim dan menerima data antar goroutine dengan sinkronisasi bawaan tanpa lock manual..
- **Contoh Penggunaan Praktis:**
```go
package main

import "fmt"

func main() {
	ch := make(chan int)
	go func() {
		ch <- 100
	}()
	result := <-ch
	fmt.Println("Diterima:", result)
}
```
- **Hasil Output yang Diharapkan:**
```output
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

Kamu telah menguasai Interfaces implisit, Duck Typing, dan Type Assertions. Minggu depan kita memasuki kekuatan terbesar Go: Goroutines dan Konkurensi sync.WaitGroup.
