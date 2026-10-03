# Borrowing & References: Peminjaman Aman (&T), Mutasi (&mut T) & Aturan Aliasing XOR Mutability

> **Kategori:** Rust | **Level:** Ownership, Borrowing & Sistem Tipe Aman | **Minggu 2:** Borrowing & References: Peminjaman Aman (&T), Mutasi (&mut T) & Aturan Aliasing XOR Mutability
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami konsep Borrowing (meminjam data tanpa memindahkan kepemilikan) menggunakan referensi (&)
- Membedakan Immutable Reference (&T) vs Mutable Reference (&mut T)
- Menguasai Hukum Sakral Rust: Aliasing XOR Mutability (Boleh banyak pembaca, ATAU tepat 1 penulis, tidak boleh keduanya bersamaan)
- Menghilangkan bug klasik sistem operasi: Data Races dan Dangling Pointers secara kompilasi
- Menggunakan String Slices (&str) untuk manipulasi teks berkecepatan tinggi dengan nol alokasi heap (*zero-copy*)

---

## Program: Pembaca Catatan Log Transaksi WAL (Write-Ahead Log Reader)

```rust
// 1. Immutable Borrow (&T): Membaca data tanpa mengambil alih kepemilikan
fn hitung_panjang_catatan(log_entry: &String) -> usize {
    // log_entry hanya dipinjam! Pemilik aslinya di main() tetap memiliki memori
    log_entry.len()
}

// 2. Mutable Borrow (&mut T): Meminjam dengan hak akses untuk memutasi data
fn tambahkan_checksum(log_entry: &mut String, id_transaksi: u64) {
    let checksum = id_transaksi * 31 % 1000;
    log_entry.push_str(&format!(" | CRC:{:03}", checksum));
}

fn main() {
    println!("=== WAL Record Processor: Zero-Copy References ===");

    // String yang dapat dimutasi (mut)
    let mut catatan_wal = String::from("OP:SET key=session_user val=8829");
    println!("Catatan Awal: '{}'", catatan_wal);

    // Peminjaman Read-Only (Bisa banyak peminjam sekaligus)
    let ref1 = &catatan_wal;
    let ref2 = &catatan_wal;
    println!("Panjang via Ref1: {} bytes, Ref2: {} bytes", hitung_panjang_catatan(ref1), hitung_panjang_catatan(ref2));

    // ATURAN EMAS RUST: ALIASING XOR MUTABILITY
    // Peminjaman Mutable (&mut) HANYA boleh ada TEPAT SATU pada satu waktu!
    tambahkan_checksum(&mut catatan_wal, 1042);
    println!("Catatan Setelah Ditambah Checksum: '{}'", catatan_wal);

    // String Slice (&str): Referensi efisien ke sebagian potongan teks di memori
    let potongan_op = &catatan_wal[0..6]; // "OP:SET"
    println!("Operasi Terdeteksi: '{}' (Nol Alokasi Heap!)", potongan_op);
}
```

---

## Konsep Kunci

### Mengapa Memindahkan Kepemilikan (Move) Tidak Cukup?
Jika setiap fungsi yang ingin membaca panjang string harus mengambil alih kepemilikan data, Anda terpaksa mengembalikan string tersebut berulang kali. Ini sangat merepotkan.
Rust menyediakan fitur **Borrowing (Peminjaman)** menggunakan simbol ampersand `&`.

### Aturan Emas Peminjaman di Rust (Aliasing XOR Mutability):
Anda boleh memilih salah satu dari dua kondisi ini pada satu waktu:
1. **Banyak referensi read-only (`&T`)** secara bersamaan. Siapa saja boleh membaca, karena membaca tidak akan merusak data.
2. **HANYA SATU referensi mutable (`&mut T`)** pada satu waktu. Jika ada yang sedang menulis, tidak boleh ada pihak lain yang membaca atau menulis!

### Mengapa Aturan Ini Menyelamatkan Industri Software?
Di C++ atau Java, jika Thread A sedang membaca array sementara Thread B menghapus elemen array tersebut di tengah jalan, terjadi *Race Condition* atau *Crash Memory Corrupt*.
Aturan kaku Rust menjamin 100% secara kompilasi bahwa **Data Race tidak akan pernah mungkin terjadi di kode safe Rust!**

### Apa itu String Slice (`&str`)?
`String` adalah buffer dinamis di heap yang memiliki kapasitas dan bisa membesar.
`&str` (*string slice*) adalah **pandangan read-only (*view*)** ke rentang memori teks tertentu. Memotong string dengan `&catatan[0..6]` tidak menyalin memori sama sekali (*Zero Copy*), menjadikannya instan secepat kecepatan cahaya!

---

---

## Penjelasan untuk Pemula

### Analogi: Membaca Koran di Perpustakaan Kota
1. **Immutable Borrow (`&T`)** seperti membaca koran yang ditempel di dinding perpustakaan: 50 orang boleh berdiri bersamaan membaca berita koran tersebut (*banyak pembaca*). Tidak ada yang bertengkar karena tidak ada yang mengubah tulisan koran.
2. **Mutable Borrow (`&mut T`)** seperti petugas perpustakaan yang sedang mencoret-coret dan mengganti lembaran koran dengan spidol hitam (*satu penulis*): petugas meminta 50 pengunjung mundur menjauh. Tidak boleh ada yang membaca koran saat spidol sedang digoreskan.

## Eksperimen

- Coba buat let r1 = &mut catatan_wal dan let r2 = &catatan_wal bersamaan di scope yang sama; amati rustc menolak kompilasi.
- Coba buat fungsi yang mengembalikan referensi ke variabel lokal (dangling pointer) dan saksikan compiler menyelamatkan Anda.
- Ubah fungsi hitung_panjang_catatan agar menerima &str alih-alih &String (idiom terbaik Rust).
- Potong slice teks di tengah karakter UTF-8 multi-byte (misal huruf Mandarin/Emoji) dan pelajari bagaimana Rust memvalidasi batas UTF-8.

---

## Tantangan

Buat fungsi `bersihkan_whitespace_mut(teks: &mut String)` yang memotong spasi di awal dan akhir secara langsung pada memori teks asli tanpa membuat alokasi heap baru.

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

### 1. Borrow Checker: Borrowing Mutably Lebih dari Sekali
- **Gejala / Masalah:** Kompiler menolak kompilasi dengan pesan `cannot borrow as mutable more than once at a time`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Batasi masa pakai peminjaman (*lifetime/scope*) atau gunakan tipe interior mutability seperti `RefCell`/`Mutex`.

### 2. Penyalahgunaan `.unwrap()` di Kode Produksi
- **Gejala / Masalah:** Program mengalami panic seketika saat menerima `Err` atau `None`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan operator `?` untuk propagasi error idiomatik atau tangani dengan blok `match`.

### 3. Kloning Berlebihan (`.clone()`) untuk Menghindari Lifetime
- **Gejala / Masalah:** Penurunan performa akibat alokasi heap baru secara redundan.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan referensi pinjaman `&str` atau `&[T]` alih-alih menduplikasi seluruh data.

---

## Ringkasan

Kamu telah menguasai Borrowing, referensi eksklusif vs bersama, dan string slices &str. Minggu depan kita mempelajari Structs, Enums, dan Pattern Matching.
