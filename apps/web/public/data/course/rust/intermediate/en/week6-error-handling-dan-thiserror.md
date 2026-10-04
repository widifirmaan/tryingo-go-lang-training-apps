# Production Error Handling: The ? Operator, Result<T, E> & thiserror

> **Kategori:** Rust | **Level:** Traits, Smart Pointers & Fearless Concurrency | **Minggu 6:** Production Error Handling: The ? Operator, Result<T, E> & thiserror
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Rust error classification: Recoverable Errors (Result<T, E>) versus Unrecoverable Panics (panic!)
- Master the ergonomic question mark operator (?) for clean automated error propagation
- Design custom domain Error Enums satisfying the standard std::error::Error trait contract
- Understand implicit error conversions governed by the native From trait (From<A> for B)
- Distinguish when to deploy `thiserror` (structured library errors) versus `anyhow` (application CLI binaries)

---

## Program: WAL Persistence Engine with Custom Typed Errors & ? Operator

```rust
use std::fmt;

// 1. Definisi Custom Error Enum (Meniru pola pustaka thiserror standar industri)
#[derive(Debug)]
pub enum WalError {
    KunciTerlaluPanjang { kunci: String, panjang: usize },
    PayloadKosong,
    DiskPenuh { sisa_bytes: u64 },
    IoGagal(String),
}

// Implementasi Display untuk pesan eror ramah pengguna
impl fmt::Display for WalError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            WalError::KunciTerlaluPanjang { kunci, panjang } => {
                write!(f, "Kunci '{}' melebihi batas maksimal 64 bytes (panjang: {})", kunci, panjang)
            }
            WalError::PayloadKosong => write!(f, "Payload data tidak boleh kosong"),
            WalError::DiskPenuh { sisa_bytes } => {
                write!(f, "Kapasitas disk penyimpanan kritis: tersisa {} bytes", sisa_bytes)
            }
            WalError::IoGagal(pesan) => write!(f, "I/O Disk error: {}", pesan),
        }
    }
}

impl std::error::Error for WalError {}

// 2. Fungsi Validasi Menggunakan Result<T, WalError>
fn validasi_record_wal(kunci: &str, nilai: &[u8]) -> Result<(), WalError> {
    if kunci.len() > 64 {
        return Err(WalError::KunciTerlaluPanjang {
            kunci: kunci.to_string(),
            panjang: kunci.len(),
        });
    }

    if nilai.is_empty() {
        return Err(WalError::PayloadKosong);
    }

    Ok(())
}

// 3. Operator Sakral Tanya (?): Propagasi Eror Bersih Seketika!
fn tulis_ke_wal_pipeline(kunci: &str, nilai: &[u8]) -> Result<u64, WalError> {
    // Jika validasi_record_wal gagal (Err), operator ? langsung me-return Err ke pemanggil!
    // Jika sukses (Ok), eksekusi lanjut ke baris berikutnya tanpa indentasi nested if!
    validasi_record_wal(kunci, nilai)?;

    println!("[WAL Pipeline] Menulis record '{}' ({} bytes) ke berkas log...", kunci, nilai.len());
    let offset_bytes = 1048576; // Simulasi offset penulisan
    Ok(offset_bytes)
}

fn main() {
    println!("=== WAL Error Pipeline Demonstration ===");

    // Uji 1: Sukses
    match tulis_ke_wal_pipeline("user:session_1", b"valid_token_data") {
        Ok(offset) => println!("[OK] Berhasil ditulis pada offset byte: {}", offset),
        Err(e) => println!("[ERROR] {}", e),
    }

    // Uji 2: Validasi Gagal (Kunci Terlalu Panjang)
    let kunci_raksasa = "a".repeat(80);
    match tulis_ke_wal_pipeline(&kunci_raksasa, b"data") {
        Ok(offset) => println!("[OK] Berhasil pada offset: {}", offset),
        Err(e) => println!("[DITOLAK] Terjadi kesalahan: {}", e),
    }
}
```

---

## Key Concepts

### Why Developers Revere the Question Mark Operator (`?`)
In Go, handling errors demands repeating 3 boilerplate lines at every step:
`if err != nil { return nil, err }`.
In **Rust**, you simply append the **`?`** symbol to any `Result` expression:
`let mut file = File::open("db.wal")?;`

**The semantics of `?`**:
- If the result resolves to `Ok(val)`: The operator unwraps the inner value, binding it cleanly to `file`.
- If the result resolves to `Err(e)`: The calling function **short-circuits immediately, returning `Err(From::from(e))` up the call stack**!
Your code reads as a clean, linear, un-nested happy path!

### `thiserror` vs `anyhow` Architecture
1. **`thiserror`**: Tailored for **libraries and core systems domain types** (like our database storage engine). Author strongly-typed enum variants enabling callers to match on discrete failure cases.
2. **`anyhow`**: Tailored for **application binaries / CLI entrypoints** where capturing dynamic error strings alongside rich contextual stack traces takes precedence over matching discrete enum types.

---

---

## Beginner Friendly Explanation

### Analogy: Factory Assembly Line Emergency Pull-Cords
1. **The `?` Operator** is an automated assembly line emergency pull-cord: if a robotic arm detects a stripped wheel bolt (*Err*), the station halts downstream operations instantly, routing the defective chassis off the line (*early return Err*). Workers never waste labor installing windshields onto a cracked chassis.
2. **Result<T, E>** is a tamper-evident courier box: if delivered safely, a green stamp confirms transit (*Ok*); if damaged, a red customs claim slip explains failure causes (*Err*).

## Experiments

- Invoke tulis_ke_wal_pipeline passing an empty byte buffer b"" verifying the PayloadKosong error branch.
- Add a new WalError::PermissionDenied variant and trigger it within the validation pipeline.
- Deploy unwrap() or expect("Custom message") to observe how Rust panics when encountering unhandled Err states.
- Chain 3 consecutive functions deploying ? operators to appreciate linear pipeline readability.

---

## Challenge

Implement `From<std::io::Error> for WalError` enabling automated conversion of standard std::io::Error instances into `WalError::IoGagal`.

---

## Visual Mental Model & Architecture Flow

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

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `let x = 5; let mut y = 10;`
- **Core Functionality:** Declaration of variabel immutable & mutable.
- **Parameters / Attributes:** `Identifier, mut keyword`.
- **System Behavior & Return:** Rust secara default mengunci variabel agar tidak bisa diubah demi keamanan memori..
- **Practical Code Example:**
```rust
let mut score = 50;
score += 25;
println!("Score: {}", score);
```
- **Expected Execution Output:**
```text
Score: 75
```

### 2. `&T (Borrow) vs &mut T (Mutable Borrow)`
- **Core Functionality:** Peminjaman referensi memori (Borrowing).
- **Parameters / Attributes:** `Referensi variabel`.
- **System Behavior & Return:** Mengizinkan pembacaan data tanpa memindahkan ownership dengan aturan ketat kompiler..
- **Practical Code Example:**
```rust
fn print_len(s: &String) {
  println!("Panjang: {}", s.len());
}
```
- **Expected Execution Output:**
```text
Membaca panjang string tanpa menghapus variabel asal
```

### 3. `match value { Pattern => Action }`
- **Core Functionality:** Pencocokan pola menyeluruh (Pattern Matching).
- **Parameters / Attributes:** `Expression, Arms`.
- **System Behavior & Return:** Mengevaluasi setiap kemungkinan kondisi secara lengkap tanpa ada cabang yang terlewat..
- **Practical Code Example:**
```rust
let res: Option<i32> = Some(10);
match res {
  Some(v) => println!("Nilai: {}", v),
  None => println!("Kosong"),
}
```
- **Expected Execution Output:**
```text
Nilai: 10
```

### 4. `Result<T, E> & Operator ?`
- **Core Functionality:** Penanganan error idiomatik tanpa exception.
- **Parameters / Attributes:** `Ok(T), Err(E)`.
- **System Behavior & Return:** Mengembalikan nilai sukses atau error terstruktur, dan operator `?` untuk propagasi error..
- **Practical Code Example:**
```rust
fn read_data() -> Result<String, std::io::Error> {
  let content = std::fs::read_to_string("app.log")?;
  Ok(content)
}
```
- **Expected Execution Output:**
```text
Mengembalikan isi file atau meneruskan kegagalan I/O
```

---

## Common Pitfalls & Debugging Tips

### 1. Multiple Mutable Borrows
- **Symptom / Issue:** Rejected by compiler: `cannot borrow as mutable more than once at a time`.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Narrow borrow scopes or adopt interior mutability constructs like `RefCell` or `Mutex`.

### 2. Unchecked `.unwrap()` in Production
- **Symptom / Issue:** Panics and terminates execution when encountering unexpected `Err` or `None` values.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use idiomatic `?` error propagation or pattern match with `match` / `if let`.

### 3. Over-Cloning to Escape Lifetime Checks
- **Symptom / Issue:** Degrades throughput by allocating redundant copies on the heap.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Prefer borrowed references like `&str` or `&[T]` instead of deep cloning full data structures.

---

## Summary

You have mastered Result<T, E>, the ? operator, and custom error design. Next week, we examine Smart Pointers: Box, Rc, Arc, and Mutex.
