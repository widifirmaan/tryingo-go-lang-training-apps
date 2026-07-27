# Pengenalan Rust & Toolchain

> Kategori: Rust, Bahasa Pemrograman | Level: Pemula | Week 1

## Tujuan Pembelajaran

- Memahami toolchain Rust: rustup, cargo, rustc
- Menulis program pertama dengan fn main() dan println!
- Mendeklarasikan variabel dengan let dan let mut
- Mengenal tipe dasar: i32, f64, bool, char
- Menerapkan shadowing dan konstanta

---

## Program: Halo Rust

```rust
fn main() {
    println!("Selamat datang di Rust!");
    println!("Program Rust pertama Anda.");

    let nama: &str = "Rustacean";
    let mut usia: i32 = 25;
    let tinggi: f64 = 175.5;
    let aktif: bool = true;
    let inisial: char = 'R';

    println!("Nama: {}", nama);
    println!("Usia: {}", usia);
    println!("Tinggi: {} cm", tinggi);
    println!("Aktif: {}", aktif);
    println!("Inisial: {}", inisial);

    usia += 1;
    println!("Tahun depan usia: {}", usia);

    let x = 5;
    let x = x + 2;
    println!("Shadowing x: {}", x);

    const VERSI: &str = "1.82";
    println!("Versi Rust: {}", VERSI);
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Struktur Program Rust

Setiap file .rs dimulai dengan `fn main()` sebagai entry point. `println!` adalah macro untuk mencetak teks dengan baris baru.

### Variabel dan Tipe Data

`let` mendeklarasikan variabel immutable. `let mut` untuk mutable. Rust punya type inference, tipe dasar: `i32`, `f64`, `bool`, `char`.

### Shadowing dan Konstanta

Shadowing: `let x = 5; let x = x + 2;` — deklarasi ulang dengan nama sama. `const` untuk konstanta compile-time dengan huruf besar.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Ubah nama** — ganti "Rustacean" dengan nama Anda
2. **Tambah variabel** — deklarasikan `let kota = "Jakarta";` dan cetak
3. **Shadowing** — coba shadowing dengan tipe berbeda: `let x = "teks";`

---

## Tantangan

Buat program yang mencetak biodata singkat: nama, umur, kota, dan hobi. Gunakan variabel dengan tipe berbeda (`&str`, `i32`, `bool`). Gunakan shadowing untuk mengubah nilai.

---

## Ringkasan

Rust adalah bahasa systems programming dengan toolchain: rustup (manajemen), cargo (build/run), rustc (kompilator). `let` dan `let mut` untuk variabel. Shadowing memungkinkan reuse nama. Minggu depan: control flow dan konsep ownership.
