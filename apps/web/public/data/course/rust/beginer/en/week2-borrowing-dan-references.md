# Borrowing & References: Shared (&T), Mutable (&mut T) & Aliasing Rules

> **Kategori:** Rust | **Level:** Ownership, Borrowing & Safe Types | **Minggu 2:** Borrowing & References: Shared (&T), Mutable (&mut T) & Aliasing Rules
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Borrowing semantics (reading data without relinquishing ownership) via references (&)
- Differentiate Immutable References (&T) from exclusive Mutable References (&mut T)
- Master the Fundamental Rust Law: Aliasing XOR Mutability (Many readers OR exactly one writer, never both concurrently)
- Eliminate Data Races and Dangling Pointers at compile time before execution
- Deploy String Slices (&str) for zero-copy string parsing without triggering heap allocations

---

## Program: Write-Ahead Log (WAL) Record Reader with References & Zero Allocations

```rust
// 1. Immutable Borrow (&T): Membaca data tanpa mengambil alih kepemilikan
fn hitung_panjang_catatan(log_entry: &String) -> usize {
    // log_entry hanya dipinjam! Pemilik aslinya di main() tetap memiliki memori
    log_entry.len()
}

// 2. Mutable Borrow (&mut T): Meminjam dengan hak akses untuk memutasi data
fn tambahkan_checksum(log_entry: &mut String, id_transaksi: u64) {
    let checksum = id_transaksi * 31 % 1000;
    log_entry.push_str(&format!(" | CRC:{:03}", checksum));
}

fn main() {
    println!("=== WAL Record Processor: Zero-Copy References ===");

    // String yang dapat dimutasi (mut)
    let mut catatan_wal = String::from("OP:SET key=session_user val=8829");
    println!("Catatan Awal: '{}'", catatan_wal);

    // Peminjaman Read-Only (Bisa banyak peminjam sekaligus)
    let ref1 = &catatan_wal;
    let ref2 = &catatan_wal;
    println!("Panjang via Ref1: {} bytes, Ref2: {} bytes", hitung_panjang_catatan(ref1), hitung_panjang_catatan(ref2));

    // ATURAN EMAS RUST: ALIASING XOR MUTABILITY
    // Peminjaman Mutable (&mut) HANYA boleh ada TEPAT SATU pada satu waktu!
    tambahkan_checksum(&mut catatan_wal, 1042);
    println!("Catatan Setelah Ditambah Checksum: '{}'", catatan_wal);

    // String Slice (&str): Referensi efisien ke sebagian potongan teks di memori
    let potongan_op = &catatan_wal[0..6]; // "OP:SET"
    println!("Operasi Terdeteksi: '{}' (Nol Alokasi Heap!)", potongan_op);
}
```

---

## Key Concepts

### Why Pure Ownership Is Insufficient
If every utility function calculating string lengths forced full ownership transfers, functions would endlessly return data tuples just to hand ownership back.
Rust introduces **Borrowing** through reference pointers (`&`).

### The Fundamental Rule: Aliasing XOR Mutability
At any given instant, you may hold EITHER:
1. **Arbitrary count of immutable references (`&T`)**. Multiple observers can read concurrently without corrupting state.
2. **EXACTLY ONE mutable reference (`&mut T`)**. While a writer mutates memory, no other readers or writers may exist concurrently.

### How This Rule Eradicates Concurrency Bugs
In C++ or Java, if Thread A iterates an ArrayList while Thread B prunes elements concurrently, the runtime corrupts pointers.
Rust's Aliasing XOR Mutability compile-time rule guarantees **Data Races are mathematically impossible in safe Rust!**

### The Power of String Slices (`&str`)
`String` is an expandable heap-allocated buffer.
`&str` is an immutable **window pointer view** into a slice of UTF-8 memory. Slicing with `&record[0..6]` allocates zero heap bytes (*Zero-Copy Architecture*), executing at bare-metal memory speeds!

---

---

## Beginner Friendly Explanation

### Analogy: Public Library Newspaper Displays
1. **Immutable Borrowing (`&T`)** is a broadsheet newspaper pinned to a public library board: 50 patrons can read the identical page concurrently (*many readers*). Zero conflict arises because readers do not alter the print.
2. **Mutable Borrowing (`&mut T`)** is the conservator restoring the document with permanent ink (*exclusive writer*): the conservator requests readers step behind the velvet rope. Zero reading occurs until the ink dries.

## Experiments

- Attempt declaring let r1 = &mut record alongside let r2 = &record concurrently to witness compile rejection.
- Author a function returning a reference to a stack-local variable to watch the borrow checker prevent a dangling pointer.
- Refactor hitung_panjang_catatan to accept &str instead of &String (the idiomatic Rust string parameter pattern).
- Attempt slicing across multi-byte UTF-8 boundaries observing Rust panic safety validations.

---

## Challenge

Author a `trim_whitespace_mut(text: &mut String)` function trimming leading and trailing spaces in-place on the mutable buffer with zero fresh allocations.

---

## Visual Mental Model & Architecture Flow

![Diagram Rust Ownership, Move Semantics & Borrowing Memory](/diagrams/rust-ownership.svg)

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `let x = 5; let mut y = 10;`
- **Core Functionality:** Default immutable and mutable binding.
- **Parameters / Attributes:** `Variable identifier, mut keyword`.
- **System Behavior & Return:** Rust defaults variables to read-only guarantees to eliminate race conditions and unexpected mutations.
- **Practical Code Example:**
```javascript
let mut health = 100;
health -= 20;
println!("Health: {}", health);
```
- **Expected Execution Output:**
```text
Health: 80
```

### 2. `&T (Borrow) vs &mut T (Mutable Borrow)`
- **Core Functionality:** Strict reference borrowing model.
- **Parameters / Attributes:** `Referenced memory location`.
- **System Behavior & Return:** Permits data inspection without moving ownership, enforcing either one mutable borrow OR multiple shared borrows.
- **Practical Code Example:**
```javascript
fn display_len(s: &String) {
  println!("Length: {}", s.len());
}
```
- **Expected Execution Output:**
```text
Inspects string length while preserving caller ownership
```

### 3. `match value { Pattern => Action }`
- **Core Functionality:** Exhaustive algebraic pattern matching.
- **Parameters / Attributes:** `Expression, Match arms`.
- **System Behavior & Return:** Evaluates all enum variants with compile-time verification ensuring no condition is left unhandled.
- **Practical Code Example:**
```javascript
let res: Option<i32> = Some(10);
match res {
  Some(v) => println!("Value: {}", v),
  None => println!("Empty"),
}
```
- **Expected Execution Output:**
```text
Value: 10
```

### 4. `Result<T, E> & Operator ?`
- **Core Functionality:** Deterministic functional error propagation.
- **Parameters / Attributes:** `Ok(T), Err(E)`.
- **System Behavior & Return:** Avoids runtime exceptions by passing structured errors upward using the concise `?` propagation operator.
- **Practical Code Example:**
```javascript
fn load_file() -> Result<String, std::io::Error> {
  let data = std::fs::read_to_string("app.log")?;
  Ok(data)
}
```
- **Expected Execution Output:**
```text
Returns file contents or bubbles I/O error upwards cleanly
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

You have mastered Borrowing, references, and string slices. Next week, we examine Structs, Enums with data payloads, and exhaustive Pattern Matching.
