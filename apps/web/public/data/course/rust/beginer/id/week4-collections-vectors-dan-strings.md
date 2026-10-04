# Koleksi Inti: Vec<T>, String vs &str & HashMap In-Memory Storage

> **Kategori:** Rust | **Level:** Ownership, Borrowing & Sistem Tipe Aman | **Minggu 4:** Koleksi Inti: Vec<T>, String vs &str & HashMap In-Memory Storage
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai 3 koleksi data fundamental Rust: Vec<T> (array dinamis), String (teks dinamis), dan HashMap<K, V>
- Memahami perbedaan memori antara String (pemilik buffer di heap) vs &str (pinjaman window slice)
- Menggunakan metode idiomatik HashMap: insert(), get(), remove(), dan entry() API
- Mengonversi kumpulan byte Vec<u8> menjadi representasi string yang aman via String::from_utf8_lossy
- Membangun abstraksi mesin database penyimpanan in-memory dengan metode impl struct yang modular

---

## Program: Mesin Penyimpanan Data Key-Value In-Memory Berbasis HashMap

```rust
use std::collections::HashMap;

// Struktur Penyimpanan Inti Key-Value Engine
struct InMemStore {
    // Kunci bertipe String, Nilai berupa kumpulan byte mentah (Vec<u8>)
    tabel: HashMap<String, Vec<u8>>,
    total_operasi: u64,
}

impl InMemStore {
    // Konstruktor Baru
    fn new() -> Self {
        InMemStore {
            tabel: HashMap::new(),
            total_operasi: 0,
        }
    }

    // Operasi SET: Mengambil kepemilikan kunci dan nilai untuk disimpan ke HashMap
    fn set(&mut self, kunci: String, nilai: Vec<u8>) {
        self.tabel.insert(kunci, nilai);
        self.total_operasi += 1;
    }

    // Operasi GET: Mengembalikan referensi peminjaman (&[u8]) tanpa alokasi memori baru!
    fn get(&self, kunci: &str) -> Option<&[u8]> {
        // as_deref() atau meminjam nilai dari Option<&Vec<u8>> menjadi Option<&[u8]>
        self.tabel.get(kunci).map(|vec| vec.as_slice())
    }

    // Operasi DEL: Menghapus data dan mengembalikan nilai yang dihapus jika ada
    fn del(&mut self, kunci: &str) -> bool {
        self.total_operasi += 1;
        self.tabel.remove(kunci).is_some()
    }
}

fn main() {
    println!("=== In-Memory Key-Value Engine (Rust Collections) ===");

    let mut db = InMemStore::new();

    // 1. Simpan data biner (misal: JSON string yang dikonversi ke bytes)
    db.set(String::from("config:cluster_name"), b"nusa-asia-southeast1".to_vec());
    db.set(String::from("metrics:cpu_usage"), vec![42, 85, 91]);

    // 2. Ambil data dengan referensi slice (&[u8])
    if let Some(bytes) = db.get("config:cluster_name") {
        let teks = String::from_utf8_lossy(bytes);
        println!("[HIT] config:cluster_name = '{}'", teks);
    } else {
        println!("[MISS] Kunci tidak ditemukan.");
    }

    // 3. Hapus data
    let terhapus = db.del("metrics:cpu_usage");
    println!("Apakah metrics:cpu_usage terhapus? {}", terhapus);
    println!("Total Operasi Mutasi DB: {}", db.total_operasi);
}
```

---

## Konsep Kunci

### Tiga Koleksi Utama Standar Library Rust
1. **`Vec<T>`**: Array dinamis yang disimpan berurutan di heap. Elemen baru ditambahkan dengan `.push(item)`. Mendukung pengindeksan cepat dan alokasi memori beruntun (*cache locality* terbaik).
2. **`String`**: Pada dasarnya adalah pembungkus tipis di atas `Vec<u8>` yang dijamin **100% selalu berformat UTF-8 valid**. Anda tidak bisa sembarangan mengindeks string dengan angka `s[0]` karena karakter bahasa dunia memiliki ukuran byte yang berbeda (1 sampai 4 byte).
3. **`HashMap<K, V>`**: Tabel hash pencarian cepat berkecepatan *O(1)*. Secara bawaan menggunakan algoritma hashing *SipHash 1-3* yang kebal terhadap serangan keamanan siber *HashDoS (Denial of Service)*.

### Pola Emas: `entry()` API pada HashMap
Untuk menghindari dua kali lookup (cek ada tidaknya kunci lalu baru insert), Rust memiliki `entry()` API:
```rust
db.tabel.entry(kunci).or_insert_with(|| vec![0]);
```
Baris ini memeriksa apakah kunci ada; jika tidak ada, ia menginisialisasi nilai baru dalam satu operasi komputasi tunggal yang sangat efisien!

---

---

## Penjelasan untuk Pemula

### Analogi: Rak Buku Dokumen & Kamus Istilah Tebal
1. **`Vec<T>`** seperti rak buku horizontal: Anda meletakkan buku-buku berjejer dari kiri ke kanan. Anda bisa menambah buku baru di ujung kanan (*push*).
2. **`HashMap<K, V>`** seperti kamus istilah tebal: jika Anda ingin mencari arti kata 'Kriptografi' (*key*), Anda langsung membuka huruf K dan membaca definisinya (*value*) tanpa harus membaca seluruh kamus dari halaman pertama.

## Eksperimen

- Gunakan entry API: db.tabel.entry(kunci).or_insert(nilai_default) untuk memasukkan data hanya jika kunci belum ada.
- Coba simpan nilai string sembarangan yang bukan UTF-8 valid dan amati bagaimana String::from_utf8 memvalidasi byte.
- Ukur penggunaan memori tabel dengan memeriksa db.tabel.capacity().
- Iterasi seluruh data database menggunakan for (k, v) in &db.tabel dan cetak pasangan key-value.

---

## Tantangan

Tambahkan operasi `mget(&self, keys: &[&str]) -> Vec<Option<&[u8]>>` pada `InMemStore` yang dapat mengambil banyak nilai kunci sekaligus dalam satu panggilan efisien.

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
fn main() {
    let mut score = 50;
    score += 25;
    println!("Score: {}", score);
}
```
- **Hasil Output yang Diharapkan:**
```output
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

fn main() {
    let s = String::from("Tryngo Rust");
    print_len(&s);
    println!("Variabel s tetap valid: {}", s);
}
```
- **Hasil Output yang Diharapkan:**
```output
Panjang: 11
Variabel s tetap valid: Tryngo Rust
```

### 3. `match value { Pattern => Action }`
- **Fungsi Utama:** Pencocokan pola menyeluruh (Pattern Matching).
- **Parameter / Atribut:** `Expression, Arms`.
- **Perilaku & Efek Sistem:** Mengevaluasi setiap kemungkinan kondisi secara lengkap tanpa ada cabang yang terlewat..
- **Contoh Penggunaan Praktis:**
```rust
fn main() {
    let res: Option<i32> = Some(10);
    match res {
        Some(v) => println!("Nilai: {}", v),
        None => println!("Kosong"),
    }
}
```
- **Hasil Output yang Diharapkan:**
```output
Nilai: 10
```

### 4. `Result<T, E> & Operator ?`
- **Fungsi Utama:** Penanganan error idiomatik tanpa exception.
- **Parameter / Atribut:** `Ok(T), Err(E)`.
- **Perilaku & Efek Sistem:** Mengembalikan nilai sukses atau error terstruktur, dan operator `?` untuk propagasi error..
- **Contoh Penggunaan Praktis:**
```rust
fn parse_number(s: &str) -> Result<i32, std::num::ParseIntError> {
    let num: i32 = s.parse()?;
    Ok(num * 2)
}

fn main() {
    match parse_number("42") {
        Ok(val) => println!("Hasil kali dua: {}", val),
        Err(e) => println!("Gagal: {}", e),
    }
}
```
- **Hasil Output yang Diharapkan:**
```output
Hasil kali dua: 84
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

Kamu telah menguasai Vec, String vs &str, dan HashMap in-memory storage. Minggu depan kita memasuki Level 2: Traits, Generics, dan Error Handling.
