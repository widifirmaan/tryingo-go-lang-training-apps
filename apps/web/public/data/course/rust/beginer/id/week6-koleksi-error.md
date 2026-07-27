# Koleksi (Vec, String, HashMap) & Error Handling

> Kategori: Rust, Bahasa Pemrograman | Level: Pemula | Week 6

## Tujuan Pembelajaran

- Menggunakan Vec<T>: push, pop, iterasi, indexing
- Memanipulasi String: push_str, format!, concatenation
- Menggunakan HashMap: insert, get, entry API
- Menangani error dengan Result<T, E>: Ok, Err
- Menggunakan unwrap, expect, dan operator ?

---

## Program: Koleksi & Error

```rust
use std::collections::HashMap;

fn bagi(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("tidak bisa membagi dengan nol"))
    } else {
        Ok(a / b)
    }
}

fn main() {
    let mut angka: Vec<i32> = vec![1, 2, 3];
    angka.push(4);
    println!("Vec: {:?}", angka);
    if let Some(akhir) = angka.pop() {
        println!("Pop: {}", akhir);
    }

    let mut s = String::from("Halo");
    s.push_str(" Rust");
    println!("String: {}", s);
    let gabung = format!("{} {}!", s, "hebat");
    println!("Format: {}", gabung);

    let mut map = HashMap::new();
    map.insert("nama", "Alice");
    map.insert("kota", "Jakarta");
    println!("Map entry: {:?}", map.get("nama"));

    match bagi(10.0, 2.0) {
        Ok(h) => println!("10 / 2 = {}", h),
        Err(e) => println!("Error: {}", e),
    }
    match bagi(1.0, 0.0) {
        Ok(_) => {}
        Err(e) => println!("Error: {}", e),
    }

    let hasil = bagi(8.0, 4.0).unwrap();
    println!("8 / 4 = {}", hasil);

    let parsed = "42".parse::<i32>().expect("gagal parse");
    println!("Parsed: {}", parsed);
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Vec<T>

`vec![]` macro. `push` menambah, `pop` menghapus dari akhir. `get(index)` mengembalikan `Option`, aman dari out-of-bounds.

### String

`push_str` menambah string. `format!` menggabungkan dengan format. `String` di-heap, bisa dimodifikasi.

### HashMap

Key-value storage. `insert`, `get` mengembalikan `Option<&V>`. `entry().or_insert()` API yang powerful.

### Result<T, E>

`Ok(T)` untuk sukses, `Err(E)` untuk error. `unwrap()` panik jika Err. `expect("pesan")` dengan pesan kustom. Operator `?` propagasi error singkat.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Vec ops** — coba `angka.insert(0, 0)` dan `angka.remove(1)`
2. **HashMap entry** — gunakan `entry("nama").or_insert("default")`
3. **Parse error** — coba `"xyz".parse::<i32>()` dan lihat error

---

## Tantangan

Buat program yang menerima kalimat, menyimpan kata-kata ke Vec<String>, menghitung frekuensi dengan HashMap, dan menangani error parsing angka. Gunakan Result untuk fungsi bagi yang aman.

---

## Ringkasan

Vec, String, HashMap adalah koleksi standar Rust. Result<T, E> untuk error handling yang aman — unwrap, expect, dan operator ?. Tidak ada exception di Rust, semua error explicit. Minggu depan: module, crate, dan testing.
