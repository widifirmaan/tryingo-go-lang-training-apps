# Struct, Method & Associated Function

> Kategori: Rust, Bahasa Pemrograman | Level: Pemula | Week 4

## Tujuan Pembelajaran

- Mendefinisikan struct dengan named fields
- Mengimplementasikan method dalam impl block
- Menggunakan &self dan &mut self
- Membuat associated function (constructor pattern)
- Mengenal tuple struct

---

## Program: Data & Perilaku

```rust
struct Buku {
    judul: String,
    penulis: String,
    tahun: u32,
}

impl Buku {
    fn baru(judul: &str, penulis: &str, tahun: u32) -> Buku {
        Buku {
            judul: String::from(judul),
            penulis: String::from(penulis),
            tahun,
        }
    }

    fn info(&self) -> String {
        format!("{} oleh {} ({})", self.judul, self.penulis, self.tahun)
    }

    fn terbitkan(&mut self, tahun_baru: u32) {
        self.tahun = tahun_baru;
    }
}

struct Warna(u8, u8, u8);

fn main() {
    let mut buku = Buku::baru("Pemrograman Rust", "Anna", 2024);
    println!("{}", buku.info());

    buku.terbitkan(2025);
    println!("Setelah revisi: {}", buku.info());

    let hitam = Warna(0, 0, 0);
    println!("Warna hitam: RGB({}, {}, {})", hitam.0, hitam.1, hitam.2);
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Struct

`struct Buku { judul: String, penulis: String }` — mengelompokkan field. `impl` untuk method. `&self` untuk immutable method, `&mut self` untuk mutable.

### Associated Function

Fungsi tanpa `self` — pola constructor: `Buku::baru(...)`. Dipanggil dengan `::`.

### Tuple Struct

`struct Warna(u8, u8, u8)` — struct dengan field tanpa nama. Diakses dengan `warna.0`, `warna.1`, dll.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Tambah field** — tambahkan `halaman: u32` ke struct Buku
2. **Method baru** — buat `fn usia(&self, tahun_sekarang: u32) -> u32`
3. **Tuple struct** — buat struct `Koordinat(f64, f64)` dengan method jarak

---

## Tantangan

Buat struct `Produk` (nama, harga, stok) dengan method `total_harga(jumlah: u32) -> f64` dan `diskon(persen: f64) -> f64`. Gunakan associated function `baru` sebagai constructor. Tambahkan tuple struct `Dimensi(f64, f64, f64)`.

---

## Ringkasan

Struct mengelompokkan data dengan named fields. impl block untuk method (dengan &self atau &mut self). Associated function sebagai constructor. Tuple struct untuk wrapper sederhana. Minggu depan: enum dan pattern matching.
