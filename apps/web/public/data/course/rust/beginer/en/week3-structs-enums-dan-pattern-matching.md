# Structs, Enums with Payloads & Exhaustive Pattern Matching (match)

> **Kategori:** Rust | **Level:** Ownership, Borrowing & Safe Types | **Minggu 3:** Structs, Enums with Payloads & Exhaustive Pattern Matching (match)
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Algebraic Data Types (Enums) in Rust encapsulating rich data payloads within each variant
- Master the exhaustive pattern matching semantics of the match keyword enforced by rustc
- Understand Option<T> (Some(T) vs None) eradicating Null Pointer Exceptions from the language
- Understand Result<T, E> (Ok(T) vs Err(E)) modeling explicit operational success or failure outcomes
- Deploy ergonomic if let idioms and pattern match guards for expressive conditional branches

---

## Program: Custom Key-Value Protocol Command Parser with Algebraic Enums

```rust
// 1. Enum Aljabar Modern: Setiap Varian Dapat Membawa Payload Tipe Data Berbeda!
#[derive(Debug)]
enum PerintahKV {
    Ping,
    Get { kunci: String },
    Set { kunci: String, nilai: Vec<u8> },
    Del { kunci: String },
    Flush,
}

// 2. Struct untuk Hasil Eksekusi
#[derive(Debug)]
struct ResponsKV {
    sukses: bool,
    pesan: String,
    durasi_mikrodetik: u64,
}

// 3. Pattern Matching Eksklusif (Exhaustive match)
fn eksekusi_perintah(cmd: PerintahKV) -> ResponsKV {
    // Rust mewajibkan SETIAP varian enum ditangani; lupa 1 varian = kompilasi gagal!
    match cmd {
        PerintahKV::Ping => ResponsKV {
            sukses: true,
            pesan: String::from("PONG"),
            durasi_mikrodetik: 5,
        },
        PerintahKV::Get { kunci } => ResponsKV {
            sukses: true,
            pesan: format!("Nilai dari '{}' ditemukan di cache", kunci),
            durasi_mikrodetik: 12,
        },
        PerintahKV::Set { kunci, nilai } => ResponsKV {
            sukses: true,
            pesan: format!("Tersimpan '{}' dengan ukuran {} bytes", kunci, nilai.len()),
            durasi_mikrodetik: 25,
        },
        PerintahKV::Del { kunci } => ResponsKV {
            sukses: true,
            pesan: format!("Kunci '{}' telah dihapus dari database", kunci),
            durasi_mikrodetik: 18,
        },
        PerintahKV::Flush => ResponsKV {
            sukses: true,
            pesan: String::from("Seluruh memori database telah dikosongkan"),
            durasi_mikrodetik: 150,
        },
    }
}

fn main() {
    println!("=== Parser Perintah Mesin Key-Value Rust ===");

    let cmd1 = PerintahKV::Set {
        kunci: String::from("session:token_901"),
        nilai: vec![0xDE, 0xAD, 0xBE, 0xEF],
    };
    let cmd2 = PerintahKV::Ping;

    let res1 = eksekusi_perintah(cmd1);
    let res2 = eksekusi_perintah(cmd2);

    println!("Hasil Eksekusi 1: {:?} ({} µs)", res1.pesan, res1.durasi_mikrodetik);
    println!("Hasil Eksekusi 2: {:?} ({} µs)", res2.pesan, res2.durasi_mikrodetik);
}
```

---

## Key Concepts

### Why Rust Enums Surpass All Other Languages
In C or TypeScript, enums are scalar integers or static strings (`enum Color { Red, Green }`).
**In Rust, Enums are Algebraic Data Types (Tagged Unions)**:
Each variant encapsulates completely disparate data schemas:
- `Ping` (zero-sized unit)
- `Get { key: String }` (holds a string payload)
- `Set { key: String, val: Vec<u8> }` (holds strings and raw byte buffers)

### Eradicating the Billion-Dollar Mistake: No Null
Tony Hoare called null pointers his *"Billion Dollar Mistake"* due to decades of production crashes.
**Rust has no `null` keyword!**
Instead, missing values model through the standard enum:
```rust
enum Option<T> {
    Some(T),
    None,
}
```
If an entity might be absent, its type is `Option<User>`.
The compiler **mandates unpacking the `None` branch before permitting access to the inner `User`**! Null dereference crashes are completely impossible.

### Exhaustive Pattern Matching
Evaluating `match cmd` mandates handling **every declared enum variant**.
If a teammate later introduces `PerintahKV::Backup`, the compiler halts with an explicit error identifying every unhandled match block across your codebase!

---

---

## Beginner Friendly Explanation

### Analogy: Industrial Dispatch Slips & Fire Exit Inspections
1. **Enums with Payloads** are dispatch boxes in an operations center: the slot stamped 'Letter Dispatch' holds paper envelopes (*String payload*), the slot stamped 'Cargo Dispatch' holds a pallet manifest (*Vec<u8> payload*), and the slot stamped 'Emergency Alarm' holds purely a button.
2. **Exhaustive Pattern Matching** is a certified fire inspector: inspectors are legally prohibited from signing facility occupancy permits until every single emergency hatch has an explicit inspected status on the clipboard.

## Experiments

- Delete the PerintahKV::Flush arm from eksekusi_perintah observing rustc: "pattern `Flush` not covered".
- Add a new PerintahKV::Exists { key: String } variant and update the exhaustive pattern match.
- Wrap command execution inside Result<ResponsKV, String> exploring error handling branches.
- Deploy the concise if let PerintahKV::Get { key } = cmd syntax matching single variants cleanly.

---

## Challenge

Author a `parse_command(text: &str) -> Option<PerintahKV>` parser converting "PING" to `Some(PerintahKV::Ping)` and "DEL token" to `Some(PerintahKV::Del { key: "token" })`.

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
fn main() {
    let mut score = 50;
    score += 25;
    println!("Score: {}", score);
}
```
- **Expected Execution Output:**
```output
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

fn main() {
    let s = String::from("Tryngo Rust");
    print_len(&s);
    println!("Variabel s tetap valid: {}", s);
}
```
- **Expected Execution Output:**
```output
Panjang: 11
Variabel s tetap valid: Tryngo Rust
```

### 3. `match value { Pattern => Action }`
- **Core Functionality:** Pencocokan pola menyeluruh (Pattern Matching).
- **Parameters / Attributes:** `Expression, Arms`.
- **System Behavior & Return:** Mengevaluasi setiap kemungkinan kondisi secara lengkap tanpa ada cabang yang terlewat..
- **Practical Code Example:**
```rust
fn main() {
    let res: Option<i32> = Some(10);
    match res {
        Some(v) => println!("Nilai: {}", v),
        None => println!("Kosong"),
    }
}
```
- **Expected Execution Output:**
```output
Nilai: 10
```

### 4. `Result<T, E> & Operator ?`
- **Core Functionality:** Penanganan error idiomatik tanpa exception.
- **Parameters / Attributes:** `Ok(T), Err(E)`.
- **System Behavior & Return:** Mengembalikan nilai sukses atau error terstruktur, dan operator `?` untuk propagasi error..
- **Practical Code Example:**
```rust
fn parse_number(s: &str) -> Result<i32, std::num::ParseIntError> {
    let num: i32 = s.parse()?;
    Ok(num * 2)
}

fn main() {
    match parse_number("42") {
        Ok(val) => println!("Hasil kali dua: {}", val),
        Err(e) => println!("Gagal: {}", e),
    }
}
```
- **Expected Execution Output:**
```output
Hasil kali dua: 84
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

You have mastered Structs, Algebraic Enums, Option/Result, and exhaustive matching. Next week, we examine Collections: Vectors, Strings, and HashMaps.
