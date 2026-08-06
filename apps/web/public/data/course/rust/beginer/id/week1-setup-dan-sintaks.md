# Setup, Toolchain & Sintaks Dasar

> **Kategori:** Rust | **Level:** Pemula | **Minggu 1:** Setup, Toolchain & Sintaks Dasar

## Tujuan Pembelajaran

- Memahami peran Rust sebagai bahasa systems programming yang aman memori
- Menginstall Rust (rustup) dan toolchain: cargo, rustc, rustfmt
- Memahami struktur file .rs: fn main, println!, macro vs fungsi
- Mengenal tipe dasar: i32, f64, bool, char, &str, tuple, array
- Immutability by default dan type inference

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
