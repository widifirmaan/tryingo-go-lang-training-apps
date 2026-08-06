# Error Handling

> **Kategori:** Rust | **Level:** Beginner | **Minggu 6:** Error Handling

## Learning Objectives

- Result<T, E>: Ok(T) for success, Err(E) for error
- Custom error enums with Debug and Display traits
- ? operator for automatic error propagation
- unwrap_or, expect, unwrap for Option/Result handling
- Convert Option to Result with ok_or

---

## Program: Error Handling

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

## Key Concepts

### Result<T, E>
`Ok(T)` success, `Err(E)` error. No exceptions in Rust.

### Custom Errors
Enums with variants. Implement Debug and Display.

### ? Operator
Auto-propagate errors. If Err, return immediately.

### unwrap_or
Provide default value for None.

### ok_or
Convert Option to Result.

---

## Experiments

- Create new custom error with 3+ variants
- Experiment with ? in nested functions
- Try thiserror crate (conceptual)
- Create function returning Result with multiple error types
- Experiment with anyhow::Error

---

## Challenge

Build a calculator with error handling: divide, sqrt, power. Custom error enum for each error type.

---

## Summary

Week 6 of 14: **Error Handling** (Level: Beginner). Beginner phase complete! Next week: **Traits** (Intermediate).
