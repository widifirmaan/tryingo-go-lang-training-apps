# Error Handling

> **Kategori:** Rust | **Level:** Pemula | **Minggu 6:** Error Handling

## Tujuan Pembelajaran

- Result<T, E>: Ok(T) untuk sukses, Err(E) untuk error
- Custom error enum dengan Debug dan Display trait
- ? operator untuk propagasi error otomatis
- unwrap_or, expect, unwrap untuk handle Option/Result
- Konversi Option ke Result dengan ok_or

---

## Program: Penanganan Error

```rust
use std::fmt;

#[derive(Debug)]
enum AppError {
    NotFound(String),
    InvalidInput(String),
    IoError(String),
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            AppError::NotFound(msg) => write!(f, "Not Found: {}", msg),
            AppError::InvalidInput(msg) => write!(f, "Invalid Input: {}", msg),
            AppError::IoError(msg) => write!(f, "IO Error: {}", msg),
        }
    }
}

fn bagi(a: f64, b: f64) -> Result<f64, AppError> {
    if b == 0.0 {
        Err(AppError::InvalidInput("tidak bisa dibagi nol".to_string()))
    } else {
        Ok(a / b)
    }
}

fn cari_produk(id: u32) -> Result<String, AppError> {
    if id == 0 {
        Err(AppError::InvalidInput("ID tidak valid".to_string()))
    } else if id > 100 {
        Err(AppError::NotFound(format!("Produk {} tidak ditemukan", id)))
    } else {
        Ok(format!("Produk {}", id))
    }
}

fn main() {
    // Result dengan match
    match bagi(10.0, 2.0) {
        Ok(hasil) => println!("10 / 2 = {:.1}", hasil),
        Err(e) => println!("Error: {}", e),
    }

    match bagi(5.0, 0.0) {
        Ok(hasil) => println!("Hasil: {}", hasil),
        Err(e) => println!("Error: {}", e),
    }

    // ? operator (propagasi error)
    fn hitung() -> Result<f64, AppError> {
        let a = bagi(10.0, 2.0)?;
        let b = bagi(a, 5.0)?;
        Ok(b)
    }

    match hitung() {
        Ok(v) => println!("Hitung: {}", v),
        Err(e) => println!("Error: {}", e),
    }

    // unwrap_or dan expect
    let hasil = bagi(10.0, 0.0).unwrap_or(0.0);
    println!("unwrap_or: {}", hasil);

    // Option ke Result
    let opt: Option<i32> = Some(42);
    let result: Result<i32, &str> = opt.ok_or("tidak ada nilai");
    println!("ok_or: {:?}", result);

    // cari_produk
    for id in [0, 50, 200] {
        match cari_produk(id) {
            Ok(nama) => println!("ID {}: {}", id, nama),
            Err(e) => println!("ID {}: Error: {}", id, e),
        }
    }
}
```

---

## Konsep Kunci

### Result<T, E>
`Ok(T)` sukses, `Err(E)` error. Tidak ada exception di Rust.

### Custom Error
Enum dengan variant. Implement `Debug` dan `Display`.

### ? Operator
`let x = func()?;` — jika Err, return langsung. Jika Ok, unwrap.

### unwrap_or
`opt.unwrap_or(default)` — nilai default jika None.

### ok_or
`opt.ok_or("msg")` — konversi Option ke Result.

---

## Eksperimen

- Buat custom error baru dengan 3+ variant
- Eksperimen dengan ? di fungsi bersarang
- Coba thiserror crate (konseptual)
- Buat fungsi yang return Result dengan multiple error type
- Eksperimen dengan anyhow::Error

---

## Tantangan

Buat program kalkulator dengan error handling: bagi, akar, pangkat. Custom error enum untuk setiap jenis error.

---

## Ringkasan

Minggu 6 dari 14: **Error Handling** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Trait** (Intermediate).
