# Setup, Toolchain & Sintaks Dasar

> **Kategori:** Rust | **Level:** Pemula | **Minggu 1:** Setup, Toolchain & Sintaks Dasar

## Tujuan Pembelajaran

- Memahami peran Rust sebagai bahasa systems programming yang aman memori
- Menginstall Rust (rustup) dan toolchain: cargo, rustc, rustfmt
- Memahami struktur file .rs: fn main, println!, macro vs fungsi
- Mengenal tipe dasar: i32, f64, bool, char, &str, tuple, array
- Immutability by default dan type inference

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

## Program: Halo, Rust!

```rust
fn main() {
    println!("Selamat datang di Rust!");
    println!("Rust adalah bahasa systems programming yang aman dan cepat.");

    let nama: &str = "Ferris";
    let versi: f64 = 1.78;
    let aktif: bool = true;

    println!("Nama: {}", nama);
    println!("Versi: {:.2}", versi);
    println!("Aktif: {}", aktif);

    let x = 42;
    let y: i32 = 100;
    println!("Tipe x: i32 (inferensi)");
    println!("x + y = {}", x + y);

    let tuple: (i32, f64, &str) = (42, 3.14, "halo");
    println!("Tuple: {:?}", tuple);
    println!("Tuple.0 = {}", tuple.0);

    let arr: [i32; 5] = [1, 2, 3, 4, 5];
    println!("Array: {:?}", arr);
    println!("arr[0] = {}", arr[0]);
}
```

---

## Konsep Kunci

### Peran Rust
Rust adalah bahasa systems programming yang menjamin memory safety tanpa garbage collector. Menggunakan ownership system untuk mencegah data race, dangling pointer, dan buffer overflow.

### Toolchain Utama
- `rustc`: kompilasi file .rs
- `cargo`: package manager & build system
- `rustfmt`: format kode
- `clippy`: linter

### Macro vs Fungsi
`println!` adalah macro (tanda `!`). Macro menghasilkan kode saat compile time.

### Tipe Dasar
- Integer: i8, i16, i32, i64, i128, u8, u16, dll
- Float: f32, f64
- Boolean: bool
- Char: char (4 bytes, Unicode)
- Tuple: (i32, f64, &str)
- Array: [T; N] fixed-size

### Immutability
Variabel immutable by default. Tambah `mut` untuk mutable.

---

## Eksperimen

- Ubah nilai variabel mutable dan lihat perubahannya
- Buat tuple dengan tipe berbeda
- Coba operasi aritmatika dengan tipe berbeda
- Buat array 10 elemen dan akses dengan index
- Eksperimen dengan type annotation vs inference

---

## Tantangan

Buat program konversi suhu (Celsius ↔ Fahrenheit ↔ Kelvin) dengan menu. Gunakan tuple untuk menyimpan data konversi.

---

## Ringkasan

Minggu 1 dari 14: **Setup, Toolchain & Sintaks Dasar** (Level: Pemula). Rust memberikan memory safety tanpa GC. Minggu depan: **Ownership & Borrowing**.
