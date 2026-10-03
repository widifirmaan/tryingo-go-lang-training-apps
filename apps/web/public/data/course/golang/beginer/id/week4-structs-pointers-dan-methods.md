# Structs, Pointer Memori (& dan *) & Value vs Pointer Receivers

> **Kategori:** Go | **Level:** Pondasi Go & Sistem Tipe Statis | **Minggu 4:** Structs, Pointer Memori (& dan *) & Value vs Pointer Receivers
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami Struct sebagai mekanisme utama pengelompokan data berstruktur di Go menggantikan class
- Memahami konsep Pointer memori: operator alamat (&) dan operator dereference (*)
- Membedakan Value Receiver (copy/read-only) vs Pointer Receiver (mutasi langsung & hemat alokasi)
- Menggunakan Struct Tags (`json:"..."`) untuk serialisasi dan deserialisasi data REST JSON
- Memahami Escape Analysis: bagaimana compiler Go memutuskan alokasi variabel di Stack vs Heap

---

## Program: Model Rute Gateway & Mesin Penyeimbang Beban (Load Balancer Route)

```go
package main

import (
	"encoding/json"
	"fmt"
	"time"
)

// 1. Struct: Komposisi Tipe Data Domain (Lengkap dengan JSON Tags)
type RuteGateway struct {
	ID            string    `json:"id"`
	Path          string    `json:"path"`
	TargetHost    string    `json:"target_host"`
	BebanKoneksi  int       `json:"beban_koneksi"`
	IsAktif       bool      `json:"is_aktif"`
	TerakhirDicek time.Time `json:"terakhir_dicek"`
}

// 2. Value Receiver: Menerima SALINAN objek (Tidak bisa memutasi struct asli)
func (r RuteGateway) FormatDisplay() string {
	status := "NONAKTIF"
	if r.IsAktif {
		status = "AKTIF"
	}
	return fmt.Sprintf("[%s] %s -> %s (Beban: %d koneksi)", status, r.Path, r.TargetHost, r.BebanKoneksi)
}

// 3. Pointer Receiver (*RuteGateway): Menerima ALAMAT MEMORI ASLI (Dapat memutasi data struct!)
func (r *RuteGateway) TambahBeban(tambahan int) {
	r.BebanKoneksi += tambahan
	r.TerakhirDicek = time.Now()
}

func (r *RuteGateway) Nonaktifkan() {
	r.IsAktif = false
	r.BebanKoneksi = 0
	r.TerakhirDicek = time.Now()
}

func main() {
	// 4. Inisialisasi Struct dengan Pointer (&)
	rute1 := &RuteGateway{
		ID:            "RT-001",
		Path:          "/api/v1/auth",
		TargetHost:    "http://auth-cluster.internal:8000",
		BebanKoneksi:  120,
		IsAktif:       true,
		TerakhirDicek: time.Now(),
	}

	fmt.Println("=== Status Rute Awal ===")
	fmt.Println(rute1.FormatDisplay())

	// Mutasi via Pointer Receiver
	rute1.TambahBeban(45)
	fmt.Println("\nSetelah Tambah Beban (Pointer Receiver Mutates State):")
	fmt.Println(rute1.FormatDisplay())

	// Serialisasi ke JSON standar
	jsonBytes, _ := json.MarshalIndent(rute1, "", "  ")
	fmt.Println("\nPayload JSON Rute:")
	fmt.Println(string(jsonBytes))

	// Bukti Alamat Pointer Memori
	fmt.Printf("\nAlamat Memori Rute di Heap/Stack: %p\n", rute1)
}
```

---

## Konsep Kunci

### Struct Menggantikan Class
Go tidak memiliki kata kunci `class`. Anda mendefinisikan bentuk data menggunakan **`struct`**:
`type User struct { Nama string; Umur int }`
Dan Anda menempelkan method pada struct tersebut menggunakan fungsi dengan **Receiver**:
`func (u *User) Sapa() string`

### Kapan Menggunakan Pointer Receiver (*T) vs Value Receiver (T)?
Ini adalah pertanyaan paling penting dalam pemrograman Go:
1. **Gunakan Pointer Receiver (`*T`) jika**:
   - Method perlu **mengubah (memutasi)** isi field struct (`r.BebanKoneksi += tambahan`).
   - Struct berukuran besar. Menerima pointer hanya menyalin alamat memori 8-byte, sedangkan value receiver akan menyalin seluruh struct berukuran kilobyte di memori!
2. **Gunakan Value Receiver (`T`) jika**:
   - Struct berukuran kecil (misal hanya 2 float seperti `Point{X, Y}`) dan method hanya membaca data (*read-only*).

### JSON Tags (`json:"field_name"`)
Di Go, nama field struct yang diawali **Huruf Besar (Kapital) bersifat Exported / Publik** (bisa dibaca package lain). Field berhuruf kecil bersifat privat.
Karena field publik harus kapital (`TargetHost`), kita menyematkan struct tag \`json:"target_host"\` agar encoder JSON menghasilkan format snake_case atau camelCase standar web!

---

---

## Penjelasan untuk Pemula

### Analogi: Fotokopi KTP vs Menulis di KTP Asli
1. **Value Receiver (`func (r Rute)`)** seperti tukang fotokopi yang membagikan lembaran fotokopi KTP Anda: jika Anda mencoret-coret lembaran fotokopi tersebut (*mengubah nilai*), KTP asli di dompet Anda sama sekali tidak berubah.
2. **Pointer Receiver (`func (r *Rute)`)** seperti menyerahkan KTP asli Anda ke petugas kelurahan: petugas menempelkan stiker hologram baru langsung di atas fisik kartu KTP asli Anda (*mutasi permanen di memori*).

## Eksperimen

- Ubah TambahBeban menjadi Value Receiver func (r RuteGateway) TambahBeban() dan amati bahwa beban rute TIDAK bertambah di main!
- Hapus tanda bintang * pada deklarasi pointer dan perhatikan perbedaan representasi alamat memori %p.
- Coba ubah huruf awal field ID menjadi huruf kecil id dan buktikan field tersebut menghilang dari payload JSON (karena unexported!).
- Gunakan json.Unmarshal untuk mengonversi string JSON kembali menjadi objek struct RuteGateway.

---

## Tantangan

Buat struct `ClusterNode` dengan field Host, Port, LatencyMs, dan IsHealthy. Tulis pointer receiver method `PeriksaKesehatan()` yang memperbarui IsHealthy menjadi false jika LatencyMs melebihi 500ms.

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

Kamu telah menguasai Structs, pointer memori, value vs pointer receivers, dan JSON tags. Minggu depan kita memasuki Level 2: Interfaces dan Konkurensi Goroutines.
