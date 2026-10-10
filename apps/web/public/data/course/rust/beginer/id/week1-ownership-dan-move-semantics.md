# Ownership & Move Semantics: Keamanan Memori Tanpa Garbage Collector

> **Kategori:** Rust | **Level:** Ownership, Borrowing & Sistem Tipe Aman | **Minggu 1:** Ownership & Move Semantics: Keamanan Memori Tanpa Garbage Collector
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami 3 Hukum Keramat Ownership di Rust yang memecahkan masalah memory leak dan segmentation faults
- Membedakan alokasi memori Stack (cepat, ukuran tetap) vs Heap (dinamis, dikelola pointer)
- Memahami Move Semantics: pemindahan kepemilikan pointer yang mencegah celah keamanan Double-Free
- Membedakan tipe data Copy (primitif skalar) vs tipe data non-Copy (String, Vec)
- Menghargai fitur kompilator rustc dan borrow checker yang menjamin keamanan memori sebelum kode pernah dirilis

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **rust-analyzer** (`rust-lang.rust-analyzer`): Server bahasa Rust resmi dengan autocomplete, type inference, dan macro expansion
- **Even Better TOML** (`tamasfe.even-better-toml`): Syntax highlighting & validasi untuk file Cargo.toml

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension rust-lang.rust-analyzer --install-extension tamasfe.even-better-toml
```

---

### 2. Instalasi Runtime & Dependency (Rustup (Rust Toolchain Installer))
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install Rustlang.Rustup
```

**macOS (Terminal / Homebrew):**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**Linux (Ubuntu/Debian / bash):**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
rustc --version && cargo --version
```

Output yang diharapkan:
```output
rustc 1.8x.x ...
cargo 1.8x.x ...
```

> 💡 **Tips Prasyarat:** Rustup mengelola versi compiler (rustc), package manager (cargo), dan standard library.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
cargo new my-rust-app --bin
cd my-rust-app
```
- **Keterangan:** Cargo membuat struktur folder project binary lengkap dengan file Cargo.toml dan src/main.rs.
- **Pindah ke direktori project:**
```bash
cd my-rust-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
cargo run
```
Akses di browser atau terminal: `Terminal Console`

> ℹ️ Cargo otomatis mengunduh dependensi, mengompilasi kode, dan menjalankannya.

**File Titik Masuk Utama (`src/main.rs`):**
```rust
fn main() {
    let name = "Developer Rust";
    let message = format!("🦀 Halo, {}! Selamat datang di era Memory Safety.", name);
    println!("{}", message);

    let numbers = vec![1, 2, 3, 4, 5];
    let sum: i32 = numbers.iter().sum();
    println!("Hasil penjumlahan vector: {}", sum);
}
```
Program Rust sederhana mendemonstrasikan vector dan formatting string aman.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-rust-app/
├── src/
│   └── main.rs          # Titik masuk program Rust
├── Cargo.toml           # Metadata project & daftar crates
├── Cargo.lock           # Versi dependensi terkunci persis
└── target/              # Hasil kompilasi binary (di-git-ignore)
```
Struktur standar Cargo untuk aplikasi binary Rust.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan `cargo check` saat development untuk validasi kompilasi kilat tanpa membuat binary.
- Gunakan `cargo run --release` saat ingin menguji performa maksimal dengan optimasi kompilator.

---

## Program: Alokator Memori Key-Value & Pelacak Kepemilikan String

```rust
// 1. Tipe Primitif di Stack (Mengimplementasikan Copy Trait Otomatis)
fn demonstrasi_stack_copy() {
    let port: u16 = 6379;
    let salinan_port = port; // Copy: Data 2 byte disalin langsung di Stack

    println!("Stack: Port Asli = {}, Salinan = {}", port, salinan_port);
}

// 2. Tipe Dinamis di Heap (String, Vec) yang Tunduk pada Hukum Ownership
fn proses_kunci_database(kunci: String) {
    println!("Fungsi mengambil alih kepemilikan kunci: '{}'", kunci);
} // Di sini 'kunci' keluar dari scope: Memori Heap dibebaskan seketika via drop()!

fn main() {
    println!("=== Rust Engine: Demonstrasi Ownership & Move Semantics ===");
    demonstrasi_stack_copy();

    // Alokasi memori dinamis di Heap
    let user_token = String::from("usr_session_9921_secret");
    println!("Token awal dibuat di Heap: {}", user_token);

    // MOVE SEMANTICS: Kepemilikan pointer berpindah dari 'user_token' ke fungsi!
    proses_kunci_database(user_token);

    // KODE DI BAWAH INI AKAN DITOLAK COMPILER RUST DENGAN EROR KERAS:
    // println!("Coba akses token lagi: {}", user_token);
    // Eror: "borrow of moved value: `user_token`"
    
    println!("Memori Heap telah dibersihkan otomatis tanpa Garbage Collector!");
}
```

---

## Konsep Kunci

### Mengapa Rust Terpilih Sebagai Bahasa Paling Dicintai di Dunia?
Sebelum Rust, programmer sistem hanya memiliki dua pilihan pahit:
1. **Bahasa C / C++**: Kecepatan puncak tanpa batas, tetapi **sangat berbahaya**. Kesalahan pointer kecil menyebabkan *Segmentation Fault*, *Buffer Overflow*, atau peretasan keamanan memori bernilai miliaran rupiah.
2. **Bahasa Garbage Collector (Go, Java, C#)**: Aman dari kebocoran memori, tetapi **memiliki overhead runtime dan jeda GC** yang memakan memori RAM besar dan tidak cocok untuk sistem embedded atau OS kernel.

**Rust memecahkan dilema 50 tahun ini**:
Rust memberikan **kecepatan setara C/C++ dengan keamanan memori 100% TANPA GARBAGE COLLECTOR**, berkat sistem **Ownership**!

### Tiga Aturan Mutlak Ownership:
1. Setiap nilai di Rust memiliki satu variabel yang menjadi **pemiliknya (*owner*)**.
2. Hanya boleh ada **satu pemilik pada satu waktu**.
3. Ketika pemiliknya keluar dari cakupan kurung kurawal (*scope* `{}`), **nilai tersebut otomatis dihancurkan dan memorinya dikembalikan seketika (*drop*)**!

### Move Semantics (Bukan Shallow Copy)
Saat Anda menulis:
`let s1 = String::from("halo"); let s2 = s1;`
Rust **TIDAK menyalin data teks di heap** (karena boros memori). Rust hanya memindahkan pointer kepemilikan dari `s1` ke `s2`. Setelah baris tersebut, `s1` **dianggap mati dan dilarang diakses lagi oleh compiler**! Ini mencegah bug berbahaya di mana dua variabel mencoba menghapus memori yang sama dua kali (*Double Free Bug*).

---

---

## Penjelasan untuk Pemula

### Analogi: Sertifikat BPKB Mobil Asli
1. **Move Semantics** seperti sertifikat BPKB kendaraan asli: sebuah mobil hanya boleh memiliki 1 BPKB sah pada satu waktu. Jika Anda menjual mobil ke pembeli (*memanggil fungsi*), BPKB asli diserahkan ke pembeli. Anda (*variabel s1*) tidak lagi memiliki mobil tersebut dan dilarang mengendarainya.
2. **Copy Trait** seperti selembar uang kertas pecahan 5 ribu rupiah: Anda bisa memfotokopi atau memberikan uang receh tanpa perlu mencatat sertifikat kepemilikan rumit di kantor kepolisian.

## Eksperimen

- Buka komentar pada baris println!("Coba akses token lagi: {}", user_token) dan amati pesan eror compile-time yang sangat mendidik dari rustc.
- Gunakan user_token.clone() jika Anda memang berniat menyalin seluruh data heap secara eksplisit.
- Cetak ukuran memori pointer String menggunakan std::mem::size_of::<String>() (hanya 24 byte di Stack!).
- Perhatikan bahwa integer primitif i32 tidak mengalami Move karena mengimplementasikan Copy trait.

---

## Tantangan

Buat fungsi `hitung_panjang_dan_kembalikan(s: String) -> (String, usize)` yang menerima kepemilikan String, mengukur panjang karakternya, lalu mengembalikan kepemilikan string tersebut bersama angka panjangnya.

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

Kamu telah menguasai tiga hukum Ownership, alokasi Stack vs Heap, dan Move Semantics. Minggu depan kita mempelajari Borrowing dan References (& dan &mut).
