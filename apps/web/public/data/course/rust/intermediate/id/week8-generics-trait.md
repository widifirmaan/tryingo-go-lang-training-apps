# Generics & Trait

> Kategori: Rust, Bahasa Pemrograman | Level: Menengah | Week 8

## Tujuan Pembelajaran

- Membuat fungsi generik dengan parameter tipe <T>
- Mendefinisikan struct generik
- Membuat trait dengan method
- Mengimplementasikan trait untuk tipe kustom
- Menggunakan trait bounds dan derive attributes

---

## Program: Kode Generik

```rust
use std::fmt::Debug;

#[derive(Debug, Clone, PartialEq)]
struct Titik<T> {
    x: T,
    y: T,
}

impl<T: Debug> Titik<T> {
    fn baru(x: T, y: T) -> Titik<T> {
        Titik { x, y }
    }
}

trait Luas {
    fn luas(&self) -> f64;
}

struct Lingkaran { r: f64 }

impl Luas for Lingkaran {
    fn luas(&self) -> f64 { 3.14159 * self.r * self.r }
}

struct Persegi { s: f64 }

impl Luas for Persegi {
    fn luas(&self) -> f64 { self.s * self.s }
}

fn cetak_luas<T: Luas>(b: &T) {
    println!("Luas: {}", b.luas());
}

fn main() {
    let t = Titik::baru(3, 4);
    println!("Titik: {:?}", t);
    println!("Clone: {:?}", t.clone());
    println!("Equal: {}", t == Titik::baru(3, 4));

    let lingkaran = Lingkaran { r: 5.0 };
    let persegi = Persegi { s: 4.0 };
    cetak_luas(&lingkaran);
    cetak_luas(&persegi);
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Generic

`Titik<T>` — struct generik dengan satu parameter tipe. `fn cetak_luas<T: Luas>(b: &T)` — fungsi generik dengan trait bound.

### Trait

`trait Luas { fn luas(&self) -> f64; }` — kumpulan method yang bisa diimplementasikan oleh berbagai tipe. Mirip interface di bahasa lain.

### Derive

`#[derive(Debug, Clone, PartialEq)]` — implementasi otomatis trait standar. Debug untuk formatting, Clone untuk duplikasi, PartialEq untuk perbandingan.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Tipe baru** — buat struct `Segitiga { a: f64, t: f64 }` impl Luas
2. **Derive lain** — tambahkan `Default` dan `Copy` ke derive
3. **Generic fungsi** — buat `terbesar<T: PartialOrd>(a: T, b: T) -> T`

---

## Tantangan

Buat trait `Deskripsi` dengan method `ke_string() -> String`. Implementasikan untuk struct `Buku` dan `Majalah`. Buat generic function `cetak_info<T: Deskripsi>(item: &T)`. Gunakan #[derive(Debug)] untuk debugging.

---

## Ringkasan

Generics memungkinkan kode fleksibel dengan parameter tipe <T>. Trait = antarmuka yang bisa diimplementasikan berbagai tipe. Trait bounds membatasi parameter generik. Derive attributes untuk implementasi otomatis trait standar. Minggu depan: closure dan iterator.
