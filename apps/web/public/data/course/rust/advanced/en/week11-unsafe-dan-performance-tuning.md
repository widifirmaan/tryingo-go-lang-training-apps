# Unsafe Rust & Performance Tuning: Raw Pointers & Zero-Copy Deserialization

> **Kategori:** Rust | **Level:** Async Tokio, WAL Durability & KV Engine Capstone | **Minggu 11:** Unsafe Rust & Performance Tuning: Raw Pointers & Zero-Copy Deserialization
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master the `unsafe` keyword contract: isolating regions where developers uphold memory invariants manually
- Distinguish safe references (&T) from Raw Pointers (*const T and *mut T)
- Deploy `#[repr(C)]` attributes enforcing C-ABI deterministic struct memory layouts without padding drift
- Implement Zero-Copy Deserialization: parsing network frames without allocating or copying single bytes
- Enforce Unsafe Encapsulation boundaries: wrapping unsafe internals inside impenetrable 100% safe public APIs

---

## Program: High-Performance Zero-Copy Binary Protocol Deserializer in Rust

```rust
// Peringatan: Blok 'unsafe' hanya digunakan untuk optimasi khusus di mana compiler tidak dapat membuktikan keamanan secara statis!

// Header Protokol Biner Transaksi Berukuran Tepat 16 Bytes
#[repr(C)] // Memastikan layout memori persis seperti struct bahasa C tanpa padding acak
#[derive(Debug, Clone, Copy)]
struct PaketHeaderKV {
    magic_number: u32, // 4 bytes (Harus 0x4E555341 = "NUSA")
    version: u16,      // 2 bytes
    command_id: u16,   // 2 bytes
    payload_len: u32,  // 4 bytes
    checksum: u32,     // 4 bytes
}

// Zero-Copy Casting: Mengonversi byte slice mentah langsung menjadi struct tanpa menyalin data!
fn parse_header_zero_copy(bytes: &[u8]) -> Option<&PaketHeaderKV> {
    if bytes.len() < std::mem::size_of::<PaketHeaderKV>() {
        return None;
    }

    // Blok UNSAFE: Pengembang mengambil tanggung jawab penuh atas keamanan pointer
    unsafe {
        // Ambil pointer mentah (*const u8) dan cast menjadi pointer struct (*const PaketHeaderKV)
        let ptr = bytes.as_ptr() as *const PaketHeaderKV;
        
        // Dereference pointer mentah menjadi referensi aman Rust (&PaketHeaderKV)
        let header_ref = &*ptr;

        if header_ref.magic_number != 0x4E555341 {
            return None; // Magic number tidak cocok, paket palsu
        }

        Some(header_ref)
    }
}

fn main() {
    println!("=== Rust Extreme Performance: Zero-Copy Deserializer ===");

    // Paket biner 16 bytes simulasi yang diterima dari soket jaringan
    let mut raw_packet = vec![
        0x41, 0x53, 0x55, 0x4E, // Magic "NUSA" (Little-endian byte order)
        0x01, 0x00,             // Versi 1
        0x02, 0x00,             // Command: SET (2)
        0x20, 0x00, 0x00, 0x00, // Payload Length: 32 bytes
        0x7B, 0x00, 0x00, 0x00, // Checksum: 123
    ];

    println!("Ukuran Buffer Biner: {} bytes", raw_packet.len());

    // Eksekusi parsing berkecepatan 0 nanodetik (Nol Salinan Memori!)
    if let Some(header) = parse_header_zero_copy(&raw_packet) {
        println!("[SUCCESS] Header Berhasil Di-Parse via Zero-Copy!");
        println!("  -> Magic Number: 0x{:X}", header.magic_number);
        println!("  -> Versi Protokol: {}", header.version);
        println!("  -> Command ID: {}", header.command_id);
        println!("  -> Panjang Payload: {} bytes", header.payload_len);
    } else {
        println!("[FAIL] Format paket biner tidak valid!");
    }
}
```

---

## Key Concepts

### Why Rust Ships the `unsafe` Escape Hatch
The rustc borrow checker is strictly conservative. Yet certain bare-metal primitives **cannot be mathematically proven at compile time**:
1. Interacting with hardware memory-mapped I/O registers (`0x0000FFFF`).
2. Interfacing with foreign C libraries (*Foreign Function Interface - FFI*).
3. Extreme zero-copy memory transmutes across binary network buffers.

Hence, Rust provides the **`unsafe`** boundary.
`unsafe` does NOT mean code is buggy!
It states: *"Compiler, step aside. The borrow checker cannot verify this pointer arithmetic. I, the systems architect, guarantee that this pointer is aligned, non-null, and bounds-checked."*

### The Superpower of Zero-Copy Deserialization
In traditional serialization (JSON, Protobuf), parsing a 1GB payload forces the CPU to allocate fresh heap buffers and deep-copy bytes (*saturating memory bandwidth*).
With **Zero-Copy (`#[repr(C)]`)**:
The engine interprets incoming network slice buffers **directly as the target struct in-place**!
Processing overhead drops to **zero milliseconds**, enabling saturating 100-Gigabit line rates!

---

---

## Beginner Friendly Explanation

### Analogy: Presidential Diplomatic Pouches vs Standard Security
1. **Safe Rust** is airport TSA baggage screening: every luggage piece opens, scans under X-ray, and undergoes manual inspection (*compiler verifies every lifetime and reference*). Impossibly secure; zero exploits pass.
2. **Unsafe Rust** is a diplomatic courier pouch: customs clears the pouch without unzipping seals (*unsafe block*), relying upon diplomatic oaths guaranteeing safety. If the diplomat makes an error (*pointer bug*), the security perimeter is breached.

## Experiments

- Shorten raw_packet to 10 bytes verifying the function gracefully yields None without memory faults.
- Tamper with the magic bytes observing immediate packet rejection.
- Execute under Miri (cargo miri test) auditing your unsafe block for undefined behavior.
- Benchmark zero-copy parsing against serde_json over 10,000 serialized payloads.

---

## Challenge

Author a safe `extract_payload_slice<'a>(bytes: &'a [u8], header: &PaketHeaderKV) -> Option<&'a [u8]>` returning payload slices bounded within memory limits.

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

You have mastered unsafe boundaries, raw pointers, #[repr(C)], and zero-copy parsing. Next week is our Capstone Project: In-Memory Key-Value Store with WAL.
