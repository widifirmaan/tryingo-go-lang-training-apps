# Structs, Enums dengan Payload Data & Pattern Matching Eksklusif (match)

> **Kategori:** Rust | **Level:** Ownership, Borrowing & Sistem Tipe Aman | **Minggu 3:** Structs, Enums dengan Payload Data & Pattern Matching Eksklusif (match)
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami kekuatan Enums Aljabar di Rust yang dapat membawa payload data berbeda pada setiap variannya
- Menguasai pattern matching menggunakan keyword match yang dijamin kompilator bersifat menyeluruh (*exhaustive*)
- Memahami tipe sakral Option<T> (Some(T) vs None) yang menghapus konsep Null Pointer Exception di Rust
- Memahami tipe Result<T, E> (Ok(T) vs Err(E)) untuk representasi keberhasilan atau kegagalan operasi
- Menggunakan ekspresi if let dan match guard untuk percabangan kondisional ekspresif

---

## Program: Parser Perintah Protokol Key-Value (GET, SET, DEL, PING)

```rust
// 1. Enum Aljabar Modern: Setiap Varian Dapat Membawa Payload Tipe Data Berbeda!
#[derive(Debug)]
enum PerintahKV {
    Ping,
    Get { kunci: String },
    Set { kunci: String, nilai: Vec<u8> },
    Del { kunci: String },
    Flush,
}

// 2. Struct untuk Hasil Eksekusi
#[derive(Debug)]
struct ResponsKV {
    sukses: bool,
    pesan: String,
    durasi_mikrodetik: u64,
}

// 3. Pattern Matching Eksklusif (Exhaustive match)
fn eksekusi_perintah(cmd: PerintahKV) -> ResponsKV {
    // Rust mewajibkan SETIAP varian enum ditangani; lupa 1 varian = kompilasi gagal!
    match cmd {
        PerintahKV::Ping => ResponsKV {
            sukses: true,
            pesan: String::from("PONG"),
            durasi_mikrodetik: 5,
        },
        PerintahKV::Get { kunci } => ResponsKV {
            sukses: true,
            pesan: format!("Nilai dari '{}' ditemukan di cache", kunci),
            durasi_mikrodetik: 12,
        },
        PerintahKV::Set { kunci, nilai } => ResponsKV {
            sukses: true,
            pesan: format!("Tersimpan '{}' dengan ukuran {} bytes", kunci, nilai.len()),
            durasi_mikrodetik: 25,
        },
        PerintahKV::Del { kunci } => ResponsKV {
            sukses: true,
            pesan: format!("Kunci '{}' telah dihapus dari database", kunci),
            durasi_mikrodetik: 18,
        },
        PerintahKV::Flush => ResponsKV {
            sukses: true,
            pesan: String::from("Seluruh memori database telah dikosongkan"),
            durasi_mikrodetik: 150,
        },
    }
}

fn main() {
    println!("=== Parser Perintah Mesin Key-Value Rust ===");

    let cmd1 = PerintahKV::Set {
        kunci: String::from("session:token_901"),
        nilai: vec![0xDE, 0xAD, 0xBE, 0xEF],
    };
    let cmd2 = PerintahKV::Ping;

    let res1 = eksekusi_perintah(cmd1);
    let res2 = eksekusi_perintah(cmd2);

    println!("Hasil Eksekusi 1: {:?} ({} µs)", res1.pesan, res1.durasi_mikrodetik);
    println!("Hasil Eksekusi 2: {:?} ({} µs)", res2.pesan, res2.durasi_mikrodetik);
}
```

---

## Konsep Kunci

### Mengapa Enum di Rust Jauh Lebih Kuat dari Bahasa Lain?
Di C, Java, atau TypeScript, `enum` hanyalah kumpulan angka atau string sederhana (`enum Color { Red, Green }`).
**Di Rust, Enum adalah Algebraic Data Type (ADT)**:
Setiap varian enum bisa membawa struktur data yang berbeda sama sekali:
- `Ping` (tanpa data)
- `Get { kunci: String }` (membawa string)
- `Set { kunci: String, nilai: Vec<u8> }` (membawa string dan array byte)

### Pembunuhan Terbesar Rust: Kematian `NULL`
Pencipta pointer null (Tony Hoare) menyebut null sebagai *"The Billion Dollar Mistake"* karena menyebabkan miliaran kerugian akibat crash null pointer di production.
**Rust sama sekali tidak memiliki nilai `null`!**
Sebagai gantinya, Rust menggunakan enum bawaan:
```rust
enum Option<T> {
    Some(T),
    None,
}
```
Jika Anda ingin variabel bernilai kosong, tipenya adalah `Option<User>`.
Compiler **memaksa Anda menangani kasus `None` sebelum Anda diizinkan membaca nilai `User`-nya**! Anda tidak akan pernah bisa mengalami crash null pointer di Rust!

### Exhaustive Pattern Matching
Ketika Anda melakukan `match cmd`, Anda **wajib menangani semua kemungkinan varian**.
Jika di masa depan rekan tim Anda menambahkan varian baru `PerintahKV::Backup`, compiler akan **langsung menolak kompilasi di semua tempat yang menggunakan match**, memberi tahu Anda file dan baris mana saja yang belum menangani perintah Backup!

---

---

## Penjelasan untuk Pemula

### Analogi: Sakelar Lampu Ber-Kunci Pengaman
1. **Enum dengan Payload** seperti laci berkas kantor dengan label stempel berbeda: laci bertuliskan 'Kirim Dokumen' berisi amplop surat (*payload String*), laci bertuliskan 'Kirim Paket' berisi kotak kardus berat (*payload Vec<u8>*), dan laci bertuliskan 'Bunyikan Bel' tidak berisi barang apapun selain tombol sakelar.
2. **Exhaustive Match** seperti pemeriksa tiket bioskop yang wajib memeriksa semua pintu keluar darurat: juri tidak boleh meninggalkan gedung sebelum memastikan semua 5 pintu darurat telah diperiksa kuncinya.

## Eksperimen

- Hapus cabang PerintahKV::Flush dari fungsi eksekusi_perintah dan amati pesan eror rustc: "pattern `Flush` not covered".
- Tambahkan varian baru PerintahKV::Exists { kunci: String } dan perbaiki pattern match-nya.
- Bungkus hasil eksekusi dalam Result<ResponsKV, String> dan uji penanganan kasus eror.
- Gunakan sintaks if let PerintahKV::Get { kunci } = cmd untuk menangani hanya satu varian spesifik secara ringkas.

---

## Tantangan

Rancang parser string sederhana: buat fungsi `parse_command(teks: &str) -> Option<PerintahKV>` yang mengubah string "PING" menjadi `Some(PerintahKV::Ping)` dan "DEL token" menjadi `Some(PerintahKV::Del { kunci: "token" })`.

---

## Model Mental & Diagram Alur Visual

![Diagram Rust Ownership, Move Semantics & Borrowing Memory](/diagrams/rust-ownership.svg)

```diagram
┌──────────────────────────────┐
│ KEPEMILIKAN MEMORI (OWNERSHIP)│
│ let s1 = String::from("Hi"); │
│       │                      │
│       ▼ (Move Semantics)     │
│ let s2 = s1;                 │
│ • s1 menjadi INVALID         │
│ • s2 menjadi pemilik sah     │
│ • Bebas Data Race & Null     │
└──────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `let x = 5; let mut y = 10;`
- **Fungsi Utama:** Deklarasi variabel immutable & mutable.
- **Parameter / Atribut:** `Identifier, mut keyword`.
- **Perilaku & Efek Sistem:** Rust secara default mengunci variabel agar tidak bisa diubah demi keamanan memori..
- **Contoh Penggunaan Praktis:**
```rust
let mut score = 50;
score += 25;
println!("Score: {}", score);
```
- **Hasil Output yang Diharapkan:**
```text
Score: 75
```

### 2. `&T (Borrow) vs &mut T (Mutable Borrow)`
- **Fungsi Utama:** Peminjaman referensi memori (Borrowing).
- **Parameter / Atribut:** `Referensi variabel`.
- **Perilaku & Efek Sistem:** Mengizinkan pembacaan data tanpa memindahkan ownership dengan aturan ketat kompiler..
- **Contoh Penggunaan Praktis:**
```rust
fn print_len(s: &String) {
  println!("Panjang: {}", s.len());
}
```
- **Hasil Output yang Diharapkan:**
```text
Membaca panjang string tanpa menghapus variabel asal
```

### 3. `match value { Pattern => Action }`
- **Fungsi Utama:** Pencocokan pola menyeluruh (Pattern Matching).
- **Parameter / Atribut:** `Expression, Arms`.
- **Perilaku & Efek Sistem:** Mengevaluasi setiap kemungkinan kondisi secara lengkap tanpa ada cabang yang terlewat..
- **Contoh Penggunaan Praktis:**
```rust
let res: Option<i32> = Some(10);
match res {
  Some(v) => println!("Nilai: {}", v),
  None => println!("Kosong"),
}
```
- **Hasil Output yang Diharapkan:**
```text
Nilai: 10
```

### 4. `Result<T, E> & Operator ?`
- **Fungsi Utama:** Penanganan error idiomatik tanpa exception.
- **Parameter / Atribut:** `Ok(T), Err(E)`.
- **Perilaku & Efek Sistem:** Mengembalikan nilai sukses atau error terstruktur, dan operator `?` untuk propagasi error..
- **Contoh Penggunaan Praktis:**
```rust
fn read_data() -> Result<String, std::io::Error> {
  let content = std::fs::read_to_string("app.log")?;
  Ok(content)
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan isi file atau meneruskan kegagalan I/O
```

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

Kamu telah menguasai Structs, Algebraic Enums, Option/Result, dan pattern matching exhaustive. Minggu depan kita mempelajari Koleksi: Vectors, Strings, dan HashMaps.
