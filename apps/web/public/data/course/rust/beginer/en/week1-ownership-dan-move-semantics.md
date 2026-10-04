# Ownership & Move Semantics: Memory Safety Without Garbage Collection

> **Kategori:** Rust | **Level:** Ownership, Borrowing & Safe Types | **Minggu 1:** Ownership & Move Semantics: Memory Safety Without Garbage Collection
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master the Three Inviolable Laws of Ownership in Rust eliminating memory leaks and segfaults
- Distinguish Stack allocations (contiguous, compile-time fixed) from Heap allocations (dynamic pointers)
- Understand Move Semantics: pointer ownership transfers eliminating Double-Free vulnerabilities
- Differentiate Copy types (stack primitives) from non-Copy heap types (String, Vec)
- Appreciate the rustc borrow checker guaranteeing absolute memory safety at compile time

---

## Program: Key-Value Memory Allocator & Ownership Tracking in Pure Rust

```rust
// 1. Tipe Primitif di Stack (Mengimplementasikan Copy Trait Otomatis)
fn demonstrasi_stack_copy() {
    let port: u16 = 6379;
    let salinan_port = port; // Copy: Data 2 byte disalin langsung di Stack

    println!("Stack: Port Asli = {}, Salinan = {}", port, salinan_port);
}

// 2. Tipe Dinamis di Heap (String, Vec) yang Tunduk pada Hukum Ownership
fn proses_kunci_database(kunci: String) {
    println!("Fungsi mengambil alih kepemilikan kunci: '{}'", kunci);
} // Di sini 'kunci' keluar dari scope: Memori Heap dibebaskan seketika via drop()!

fn main() {
    println!("=== Rust Engine: Demonstrasi Ownership & Move Semantics ===");
    demonstrasi_stack_copy();

    // Alokasi memori dinamis di Heap
    let user_token = String::from("usr_session_9921_secret");
    println!("Token awal dibuat di Heap: {}", user_token);

    // MOVE SEMANTICS: Kepemilikan pointer berpindah dari 'user_token' ke fungsi!
    proses_kunci_database(user_token);

    // KODE DI BAWAH INI AKAN DITOLAK COMPILER RUST DENGAN EROR KERAS:
    // println!("Coba akses token lagi: {}", user_token);
    // Eror: "borrow of moved value: `user_token`"
    
    println!("Memori Heap telah dibersihkan otomatis tanpa Garbage Collector!");
}
```

---

## Key Concepts

### Why Rust Conquered Systems Engineering
Historically, systems engineers faced a frustrating compromise:
1. **C / C++**: Raw native performance, yet plagued by catastrophic **memory safety vulnerabilities**: Segmentation Faults, Buffer Overflows, and Use-After-Free security exploits.
2. **Garbage Collected Languages (Go, Java, C#)**: Memory safe, yet encumbered by **runtime memory overhead and GC pauses** unsuitable for kernels, game engines, or hyper-scale databases.

**Rust solved this 50-year dilemma**:
Rust delivers **bare-metal C/C++ execution speeds with provable 100% memory safety WITHOUT a Garbage Collector**, powered by **Ownership**!

### The Three Inviolable Rules of Ownership:
1. Each value in Rust has an owner variable.
2. There can only be **one owner at a time**.
3. When the owner goes out of scope, Rust **reclaims memory immediately via the `drop()` destructor**!

### Move Semantics (Zero-Cost Ownership Transfer)
When executing:
`let s1 = String::from("hello"); let s2 = s1;`
Rust avoids deep heap copying. It transfers pointer ownership metadata from `s1` to `s2`. Crucially, `s1` **is invalidated at compile time**! This completely eliminates Double-Free memory corruption attacks at zero runtime cost.

---

---

## Beginner Friendly Explanation

### Analogy: Real Estate Master Deeds vs Cash Bills
1. **Move Semantics** is a master physical land title deed: a parcel of land maintains exactly one legal deed. When you deed the property to a buyer (*passing to a function*), the title transfers completely. You (*variable s1*) no longer hold legal ownership and are trespassing if you attempt entry.
2. **The Copy Trait** is loose change in your pocket: handing over a five-dollar coin requires no formal title transfer registry; integers and booleans copy instantly on the stack.

## Experiments

- Uncomment the println referencing moved user_token to inspect rustc's instructional compile diagnostic.
- Deploy user_token.clone() to deliberately allocate an explicit independent deep heap copy.
- Inspect stack memory sizes with std::mem::size_of::<String>() confirming it holds exactly 24 bytes.
- Confirm that primitive i32 integers never move because they implement the stack Copy trait.

---

## Challenge

Author a `calculate_length_and_return(s: String) -> (String, usize)` returning ownership of the original String alongside its character length tuple.

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

You have mastered the Three Laws of Ownership, Stack vs Heap, and Move Semantics. Next week, we examine Borrowing and References (& and &mut).
