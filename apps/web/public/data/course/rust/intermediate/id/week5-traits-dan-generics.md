# Traits & Generics: Polimorfisme Nol Biaya (Zero-Cost Abstractions) & Trait Bounds

> **Kategori:** Rust | **Level:** Traits, Smart Pointers & Konkurensi Tanpa Takut | **Minggu 5:** Traits & Generics: Polimorfisme Nol Biaya (Zero-Cost Abstractions) & Trait Bounds
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami konsep Trait di Rust sebagai pendefinisian perilaku bersama yang mirip interface
- Menguasai konsep Zero-Cost Abstractions: abstraksi tingkat tinggi tanpa penalti performa saat dieksekusi
- Memahami Monomorphization pada Static Dispatch (<T: Trait>): compiler menggandakan kode biner tercepat untuk setiap tipe konkret
- Memahami Dynamic Dispatch menggunakan Trait Objects (Box<dyn Trait>) saat tipe baru diketahui pada runtime
- Menggunakan Derive Macros bawaan (#[derive(Clone, Debug, PartialEq)]) untuk implementasi trait otomatis

---

## Program: Abstraksi Antarmuka Mesin Penyimpanan (Storage Engine Trait)

```rust
// 1. Definisi Trait: Kontrak Kemampuan yang Dapat Diimplementasikan oleh Tipe Apapun
pub trait MesinPenyimpan {
    fn tulis(&mut self, kunci: &str, nilai: &[u8]) -> Result<(), String>;
    fn baca(&self, kunci: &str) -> Option<Vec<u8>>;
    fn nama_engine(&self) -> &'static str;
}

// 2. Implementasi Trait pada Struct Memori
pub struct RamEngine {
    data: std::collections::HashMap<String, Vec<u8>>,
}

impl RamEngine {
    pub fn new() -> Self {
        RamEngine { data: std::collections::HashMap::new() }
    }
}

impl MesinPenyimpan for RamEngine {
    fn tulis(&mut self, kunci: &str, nilai: &[u8]) -> Result<(), String> {
        self.data.insert(kunci.to_string(), nilai.to_vec());
        Ok(())
    }

    fn baca(&self, kunci: &str) -> Option<Vec<u8>> {
        self.data.get(kunci).cloned()
    }

    fn nama_engine(&self) -> &'static str {
        "High-Speed In-Memory RAM Engine"
    }
}

// 3. Static Dispatch (Generics + Trait Bounds: T: MesinPenyimpan)
// Zero-Cost Abstraction: Compiler menghasilkan kode mesin khusus per tipe tanpa overhead runtime!
fn simpan_konfigurasi_server<T: MesinPenyimpan>(engine: &mut T, cluster_id: &str) {
    println!("Menggunakan Engine: {}", engine.nama_engine());
    let _ = engine.tulis("cluster_id", cluster_id.as_bytes());
}

fn main() {
    println!("=== Rust Trait Architecture: Zero-Cost Abstractions ===");

    let mut ram = RamEngine::new();
    simpan_konfigurasi_server(&mut ram, "nusa-cluster-alpha-01");

    if let Some(val) = ram.baca("cluster_id") {
        println!("Verifikasi Baca: {}", String::from_utf8_lossy(&val));
    }
}
```

---

## Konsep Kunci

### Apa itu Trait di Rust?
Trait memberi tahu compiler Rust tentang fungsionalitas apa yang dimiliki oleh suatu tipe data.
Jika Anda pernah menggunakan interface di bahasa lain, Trait mirip dengan interface, namun **jauh lebih kuat**:
1. Trait dapat memiliki implementasi method bawaan (*Default Methods*).
2. Trait dapat diimplementasikan pada tipe data yang sudah ada (bahkan tipe data bawaan Rust seperti `i32`!).

### Keajaiban Zero-Cost Abstractions & Monomorphization
Di bahasa seperti Java, pemanggilan method interface selalu melalui *Virtual Method Table (vtable)* yang memiliki penalti kinerja *pointer chasing*.
Di Rust:
Ketika Anda menulis fungsi generic `fn simpan<T: MesinPenyimpan>(engine: &mut T)`:
Pada waktu kompilasi, compiler melakukan **Monomorphization**. Compiler menyalin fungsi tersebut dan membuat versi kode mesin khusus untuk `RamEngine`!
Ketika kode berjalan di CPU, **tidak ada overhead interface sama sekali**, eksekusi langsung melompat ke alamat fungsi asli secepat pemanggilan fungsi manual biasa!

### Static Dispatch vs Dynamic Dispatch (`dyn Trait`)
- **Static Dispatch (`<T: Trait>`)**: Default di Rust. Sangat cepat, ukuran binary sedikit lebih besar karena duplikasi kode mesin khusus.
- **Dynamic Dispatch (`&dyn Trait` atau `Box<dyn Trait>`)**: Digunakan jika Anda ingin menyimpan kumpulan engine yang berbeda dalam satu array: `Vec<Box<dyn MesinPenyimpan>>`.

---

---

## Penjelasan untuk Pemula

### Analogi: Kartu SIM Card Telepon & Mesin Cetak Khusus
1. **Trait** seperti ukuran standar micro-SIM card: kartu SIM apa pun yang memiliki ukuran micro-SIM bisa dipasang ke smartphone apa saja (*implementasi trait*).
2. **Monomorphization (Static Dispatch)** seperti pabrik mobil pintar: jika Anda memesan mobil bermesin diesel, pabrik mencetak bodi khusus diesel; jika memesan bensin, pabrik mencetak bodi khusus bensin. Hasilnya adalah mobil yang dirancang sempurna tanpa baut adaptor tambahan yang longgar.

## Eksperimen

- Buat struct DiskEngine dan implementasikan MesinPenyimpan; buktikan simpan_konfigurasi_server dapat menerima DiskEngine tanpa perubahan.
- Gunakan trait bawaan std::fmt::Display untuk memformat struct InMemStore agar bisa di-print dengan println!("{}", store).
- Buat vektor berisi Trait Objects: let engines: Vec<Box<dyn MesinPenyimpan>> = vec![...].
- Tambahkan default method fn ping(&self) -> bool { true } pada trait MesinPenyimpan.

---

## Tantangan

Implementasikan trait bawaan `std::ops::Drop` pada `RamEngine` yang mencetak pesan otomatis "[Engine Shutdown] Membersihkan memori RAM..." saat objek ram keluar dari scope main.

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

Kamu telah menguasai Traits, Static Dispatch monomorphization, dan Dynamic Dispatch dyn Trait. Minggu depan kita mempelajari Error Handling modern dan operator ?.
