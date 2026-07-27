# Enum & Pattern Matching

> Kategori: Rust, Bahasa Pemrograman | Level: Pemula | Week 5

## Tujuan Pembelajaran

- Mendefinisikan enum dengan varian yang membawa data
- Menggunakan match dengan exhaustiveness checking
- Menerapkan if let untuk pencocokan singkat
- Menggunakan Option<T> (Some, None)
- Menulis kode yang aman tanpa null pointer

---

## Program: Pencocokan Pola

```rust
enum Pesan {
    Teks(String),
    Koordinat(i32, i32),
    Diam,
}

fn main() {
    let daftar = vec![
        Pesan::Teks(String::from("halo dunia")),
        Pesan::Koordinat(10, 20),
        Pesan::Diam,
    ];

    for p in &daftar {
        match p {
            Pesan::Teks(t) => println!("Teks: {}", t),
            Pesan::Koordinat(x, y) => println!("Posisi: ({}, {})", x, y),
            Pesan::Diam => println!("diam..."),
        }
    }

    let angka: Option<i32> = Some(42);
    if let Some(n) = angka {
        println!("Angka dalam Option: {}", n);
    }

    let kosong: Option<i32> = None;
    println!("Nilai default: {}", kosong.unwrap_or(0));
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Enum

`enum Pesan { Teks(String), Koordinat(i32, i32), Diam }` — setiap varian bisa membawa data berbeda. `match` memeriksa exhaustiveness.

### if let

`if let Some(n) = angka` — pattern matching singkat untuk satu pola. Lebih ringkas dari `match` untuk kasus sederhana.

### Option<T>

`Some(T)` atau `None` — pengganti null yang aman. `unwrap_or(default)` memberikan nilai default. Tidak ada NullPointerException di Rust.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Varian baru** — tambahkan `Gambar(Vec<u8>)` ke enum Pesan
2. **Match arm baru** — handle varian baru di match
3. **None handling** — ubah `unwrap_or(0)` jadi `unwrap_or_else(|| -1)`

---

## Tantangan

Buat enum `Arah` dengan varian `Utara`, `Selatan`, `Timur`, `Barat`. Gunakan match untuk mengembalikan string deskripsi. Buat fungsi yang menerima `Option<Arah>` dan handle kasus None dengan if let.

---

## Ringkasan

Enum mewakili beberapa kemungkinan varian, masing-masing bisa membawa data. match memeriksa exhaustiveness — semua varian harus di-handle. if let untuk pencocokan singkat. Option<T> menggantikan null dengan aman. Minggu depan: koleksi (Vec, String, HashMap) dan error handling.
