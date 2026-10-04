# Channels & Multiplexing: Buffered vs Unbuffered Channels, select & Timeouts

> **Kategori:** Go | **Level:** Interface, Konkurensi & Channel Pipes | **Minggu 7:** Channels & Multiplexing: Buffered vs Unbuffered Channels, select & Timeouts
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami filosofi konkurensi CSP (Communicating Sequential Processes): Berkomunikasi via Channel, bukan berbagi memori
- Membedakan Unbuffered Channel (sinkronisasi jabat tangan instan) vs Buffered Channel (antrean berkapasitas)
- Menggunakan directional channels (chan<- kirim saja, <-chan terima saja) untuk keamanan API fungsi
- Menguasai statement select untuk multiplexing banyak channel secara non-blocking
- Menerapkan pola Timeouts menggunakan time.After() di dalam blok select untuk mencegah kebuntuan (deadlock)

---

## Program: Pembatas Kecepatan Token Bucket & Antrean Permintaan Gateway

```go
package main

import (
	"fmt"
	"time"
)

// Pepatah Go: "Do not communicate by sharing memory; instead, share memory by communicating."

func produserTrafik(antreanReq chan<- string) {
	// Channel berarah kirim-saja (send-only: chan<-)
	for i := 1; i <= 6; i++ {
		reqID := fmt.Sprintf("REQ-HTTP-%03d", i)
		antreanReq <- reqID // Kirim ke channel (akan terblokir jika buffer penuh)
		fmt.Printf("[Client] Mengirimkan %s ke gateway...\n", reqID)
		time.Sleep(50 * time.Millisecond)
	}
	close(antreanReq) // Tutup channel setelah semua data dikirim
}

func main() {
	// 1. Buffered Channel dengan kapasitas penampung 3 request
	antreanReq := make(chan string, 3)

	// 2. Token Bucket Rate Limiter: Ticker menghasilkan token setiap 120 milidetik
	tokenBucket := time.NewTicker(120 * time.Millisecond)
	defer tokenBucket.Stop()

	// Jalankan produser di goroutine terpisah
	go produserTrafik(antreanReq)

	fmt.Println("=== Gateway Rate Limiter (Token Bucket Engine) ===")

	// 3. Loop Konsumsi Channel
	for req := range antreanReq {
		// 4. select Statement: Multiplexing saluran asinkron dengan batas waktu (Timeout)
		select {
		case <-tokenBucket.C:
			// Token tersedia: Izinkan request diproses
			fmt.Printf("  --> [GATEWAY 200 OK] Token diperoleh! Memproses %s\n", req)
		case <-time.After(150 * time.Millisecond):
			// Timeout: Token terlalu lama tidak tersedia (Overload)
			fmt.Printf("  --> [GATEWAY 429 TOO MANY REQUESTS] %s DITOLAK (Antrean Penuh)\n", req)
		}
	}

	fmt.Println("\nSeluruh antrean request berhasil diproses.")
}
```

---

## Konsep Kunci

### Slogan Emas Go: Komunikasi via Channels
Daripada mengunci variabel memori dengan Mutex yang rawan deadlock dan human error, Go menyediakan **Channels (`chan`)**: pipa komunikasi tipe data antar-goroutine.
*"Jangan berkomunikasi dengan berbagi memori (Mutex); melainkan bagilah memori dengan berkomunikasi (Channels)."*

### Unbuffered vs Buffered Channel
1. **Unbuffered (`make(chan int)`)**:
   Pengirim data akan **terblokir (menunggu)** sampai ada goroutine lain yang siap menerima data di ujung pipa. Ini adalah jabat tangan sinkron (*synchronous rendezvous*).
2. **Buffered (`make(chan int, 100)`)**:
   Pipa memiliki wadah penampung sebanyak 100 item. Pengirim data bisa terus memasukkan item tanpa terblokir, selama wadah penampung belum penuh.

### Kekuatan `select` Statement
Pernyataan `select` seperti `switch`, tetapi **khusus untuk mendengarkan komunikasi channel**.
`select` akan mengeksekusi *case* pertama yang salurannya sudah siap mengirim atau menerima data.
Jika tidak ada yang siap dan Anda menambahkan case `<-time.After(2 * time.Second)`, Anda otomatis memiliki perlindungan timeout jaringan yang sangat elegan!

---

---

## Penjelasan untuk Pemula

### Analogi: Pipa Pipa Tabung Bola Tenis
1. **Unbuffered Channel** seperti mengoper bola tenis langsung dari tangan ke tangan: orang pertama tidak boleh melepaskan bola sebelum tangan orang kedua benar-benar memegang bola tersebut (*jabat tangan instan*).
2. **Buffered Channel** seperti tabung silinder yang bisa menampung 3 bola tenis: Anda bisa melempar 3 bola ke dalam tabung (*buffer*). Anda baru terhenti melempar jika tabung sudah penuh 3 bola.
3. **select Statement** seperti kasir tol dengan 3 gerbang: kasir melayani mobil dari gerbang mana saja yang lebih dulu sampai di loket.

## Eksperimen

- Ubah kapasitas buffer make(chan string, 3) menjadi 0 (unbuffered) dan amati perubahan pola log antrean.
- Kecilkan timeout time.After menjadi 20ms dan saksikan pesan 429 TOO MANY REQUESTS mendominasi.
- Lupa memanggil close(antreanReq) pada goroutine produser dan amati for-range macet menanti data.
- Tambahkan default case pada select untuk melakukan operasi pengecekan non-blocking.

---

## Tantangan

Buat saluran sinyal pembatalan `batalChan := make(chan struct{})`. Tambahkan `case <-batalChan:` di dalam blok select untuk menghentikan seluruh pemrosesan antrean seketika.

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

Kamu telah menguasai Channels, buffered vs unbuffered, multiplexing select, dan timeout patterns. Minggu depan kita mempelajari Context dan pembatalan rantai request.
