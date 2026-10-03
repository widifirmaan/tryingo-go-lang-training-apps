# Channels & Multiplexing: Buffered vs Unbuffered Channels, select & Timeouts

> **Kategori:** Go | **Level:** Interface, Konkurensi & Channel Pipes | **Minggu 7:** Channels & Multiplexing: Buffered vs Unbuffered Channels, select & Timeouts

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

## Ringkasan

Kamu telah menguasai Channels, buffered vs unbuffered, multiplexing select, dan timeout patterns. Minggu depan kita mempelajari Context dan pembatalan rantai request.
