# Struktur Data Inti: Slices (Header, Len, Cap), make, append & Hash Maps

> **Kategori:** Go | **Level:** Pondasi Go & Sistem Tipe Statis | **Minggu 3:** Struktur Data Inti: Slices (Header, Len, Cap), make, append & Hash Maps
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami perbedaan fundamental antara Fixed-Size Array vs Dynamic Slice di memori
- Menguasai anatomi internal Slice: Pointer ke underlying array, Length (len), dan Capacity (cap)
- Menggunakan make() untuk pre-alokasi kapasitas slice guna menghindari alokasi memori berulang
- Menggunakan fungsi bawaan append() dan memahami cara kerja doubling capacity saat memori penuh
- Membangun tabel hash menggunakan map dan menerapkan pola idiomatik Comma-Ok (val, ok := map[key])

---

## Program: Tabel Frekuensi IP & Pelacak Kuota Akses (Rate Limiting Table)

```go
package main

import "fmt"

func main() {
	// 1. Array Statis (Panjang kaku, jarang dipakai langsung)
	var subnetMask [4]byte = [4]byte{255, 255, 255, 0}
	fmt.Println("Subnet Mask Statis:", subnetMask)

	// 2. Slice Dinamis (Struktur data paling populer di Go!)
	// Anatomi Slice: Pointer ke backing array, Length (len), Capacity (cap)
	daftarIP := make([]string, 0, 5) // Panjang awal 0, Kapasitas memori 5
	fmt.Printf("Awal: len=%d, cap=%d, isi=%v\n", len(daftarIP), cap(daftarIP), daftarIP)

	// append(): Menambahkan elemen secara dinamis (otomatis memperbesar kapasitas)
	daftarIP = append(daftarIP, "192.168.1.1", "10.0.0.1", "172.16.0.5")
	fmt.Printf("Setelah Append: len=%d, cap=%d, isi=%v\n", len(daftarIP), cap(daftarIP), daftarIP)

	// Slice Slicing [start:end]
	subDaftar := daftarIP[1:3]
	fmt.Println("Sub-slice [1:3]:", subDaftar)

	// 3. Map (Hash Table bawaan Go: map[KeyType]ValueType)
	tabelHitRate := make(map[string]int)

	// Simulasi pencatatan kunjungan IP
	tabelHitRate["192.168.1.1"] = 15
	tabelHitRate["10.0.0.1"] = 82
	tabelHitRate["203.0.113.42"] = 140

	// 4. Pola Idiomatik "Comma Ok" untuk Memeriksa Keberadaan Kunci di Map
	ipUji := "172.16.0.5"
	if hit, ok := tabelHitRate[ipUji]; ok {
		fmt.Printf("IP %s tercatat: %d request\n", ipUji, hit)
	} else {
		fmt.Printf("IP %s belum pernah mengakses server (Aman).\n", ipUji)
	}

	// Iterasi Map menggunakan for-range
	fmt.Println("\n=== Rekapitulasi Trafik per IP ===")
	for ip, hit := range tabelHitRate {
		status := "NORMAL"
		if hit > 100 {
			status = "OVER_LIMIT (Blokir!)"
		}
		fmt.Printf("-> IP: %-15s | Hit: %3d | Status: %s\n", ip, hit, status)
	}
}
```

---

## Konsep Kunci

### Anatomi Mendalam Slice di Go
Di Go, **Array** memiliki ukuran tetap (`[4]int`). Ukuran array adalah bagian dari tipenya, sehingga `[4]int` dan `[5]int` adalah dua tipe yang berbeda sama sekali.
Dalam praktik sehari-hari, pengembang Go hampir selalu menggunakan **Slice** (`[]int`).

Sebuah Slice sebenarnya adalah struktur data mini 24-byte (*Slice Header*) yang berisi 3 hal:
1. **Pointer**: Alamat memori yang menunjuk ke *underlying backing array* tempat data fisik disimpan.
2. **Length (`len`)**: Jumlah elemen yang saat ini ada di dalam slice.
3. **Capacity (`cap`)**: Jumlah elemen maksimal yang bisa ditampung sebelum Go harus mengalokasikan array baru di memori.

### Keajaiban `append()`
Saat Anda memanggil `append(slice, item)` dan `len == cap`:
Go secara otomatis membuat backing array baru yang berukuran **2 kali lipat lebih besar**, menyalin data lama ke array baru, lalu menambahkan item baru.
**Praktik Terbaik Kinerja Tinggi**: Jika Anda tahu akan menampung 1.000 item, buat slice dengan `make([]int, 0, 1000)` agar Go tidak perlu mengalokasikan ulang memori 10 kali di tengah jalan!

### Pola "Comma Ok" pada Map
Jika Anda mengakses kunci yang tidak ada di map: `nilai := myMap["kunci_palsu"]`, Go **tidak akan melempar error atau crash**, melainkan mengembalikan *Zero Value* (`0` atau `""`).
Untuk membedakan apakah nilainya memang 0 atau kuncinya yang tidak ada, gunakan pola **Comma Ok**:
`val, ada := myMap[kunci]`
Jika `ada == true`, maka kunci benar-benar terdaftar di map.

---

---

## Penjelasan untuk Pemula

### Analogi: Karton Telur & Lemari Loker Berlabel
1. **Array** seperti kotak karton isi 6 butir telur: ukurannya kaku, tidak bisa dipaksa memuat 7 butir telur.
2. **Slice** seperti ikat pinggang karet elastis: jika pinggang bertambah besar (*append item*), ikat pinggang meregang otomatis menyesuaikan ukuran tubuh.
3. **Pola Comma-Ok Map** seperti memeriksa loker kantor: Anda membuka laci loker; jika di dalam laci kosong, Anda bertanya pada resepsionis: "Apakah loker ini memang tidak bertuan (*ok = false*), atau pemiliknya sengaja tidak menyimpan barang (*val = 0*)?

## Eksperimen

- Lakukan append 10 elemen satu per satu di loop dan cetak len dan cap pada setiap langkah untuk melihat doubling capacity (1, 2, 4, 8, 16).
- Ubah subDaftar[0] = "MUTASI" dan amati apakah daftarIP asli ikut berubah (karena berbagi backing array yang sama!).
- Hapus sebuah elemen dari map menggunakan fungsi bawaan delete(tabelHitRate, "10.0.0.1").
- Gunakan copy(dest, src) untuk membuat salinan slice independen yang aman dari mutasi backing array.

---

## Tantangan

Buat fungsi `FilterIPBlacklist(ipList []string, blacklist map[string]bool) []string` yang mengembalikan slice baru berisi hanya IP yang tidak tercantum di blacklist, dengan mengalokasikan slice secara efisien.

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

Kamu telah menguasai Slices, backing arrays, capacity doubling, dan map comma-ok. Minggu depan kita mempelajari Structs, Pointers, dan Methods.
