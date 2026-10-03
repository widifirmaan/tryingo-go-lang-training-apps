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

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

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
