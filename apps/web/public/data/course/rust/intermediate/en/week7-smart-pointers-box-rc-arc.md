# Smart Pointers & Interior Mutability: Box<T>, Arc<T>, Mutex<T> & RwLock<T>

> **Kategori:** Rust | **Level:** Traits, Smart Pointers & Fearless Concurrency | **Minggu 7:** Smart Pointers & Interior Mutability: Box<T>, Arc<T>, Mutex<T> & RwLock<T>
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand why raw references fall short and how Smart Pointers govern complex ownership lifecycles
- Deploy Box<T> for explicit heap allocations and recursive data structures
- Master Arc<T> (Atomic Reference Counting) enabling shared immutable ownership across threads
- Master Interior Mutability: safely mutating data wrapped inside shared references
- Combine Arc<RwLock<T>> or Arc<Mutex<T>> patterns for bulletproof thread-safe database architectures

---

## Program: Thread-Safe Shared Key-Value Index with Arc<RwLock<T>> Architecture

```rust
use std::collections::HashMap;
use std::sync::{Arc, RwLock};
use std::thread;

// 1. Arc (Atomic Reference Counting): Mengizinkan BANYAK PEMILIK data di multi-thread!
// 2. RwLock (Read-Write Lock): Mengizinkan banyak pembaca bersamaan, atau 1 penulis eksklusif
type SharedIndex = Arc<RwLock<HashMap<String, String>>>;

fn main() {
    println!("=== Thread-Safe Key-Value Index Engine (Arc + RwLock) ===");

    // Inisialisasi index database yang dibungkus Smart Pointer
    let index: SharedIndex = Arc::new(RwLock::new(HashMap::new()));

    // Masukkan data awal
    {
        let mut writer = index.write().unwrap();
        writer.insert(String::from("config:max_clients"), String::from("10000"));
        writer.insert(String::from("status:health"), String::from("OK"));
    } // writer lock otomatis dilepas (drop) di akhir kurung kurawal ini!

    let mut handles = vec![];

    // Luncurkan 3 thread pembaca konkuren
    for thread_id in 1..=3 {
        // Arc::clone HANYA menyalin pointer atomik dan menaikkan reference counter (Sangat Cepat!)
        let index_clone = Arc::clone(&index);

        let handle = thread::spawn(move || {
            // Peminjaman Read-Lock (Tidak saling memblokir antar pembaca!)
            let reader = index_clone.read().unwrap();
            if let Some(val) = reader.get("status:health") {
                println!("[Thread Pembaca #{}] status:health = '{}'", thread_id, val);
            }
        });
        handles.push(handle);
    }

    // Luncurkan 1 thread penulis konkuren
    {
        let index_clone = Arc::clone(&index);
        let handle = thread::spawn(move || {
            // Write-Lock: Memblokir pembaca lain sesaat saat menulis data
            let mut writer = index_clone.write().unwrap();
            writer.insert(String::from("status:health"), String::from("DEGRADED_HIGH_LOAD"));
            println!("[Thread Penulis] Memperbarui status kesehatan sistem!");
        });
        handles.push(handle);
    }

    // Tunggu semua thread selesai dieksekusi
    for h in handles {
        h.join().unwrap();
    }

    // Cetak status akhir dari thread utama
    let reader_akhir = index.read().unwrap();
    println!("\nStatus Akhir Database: {:?}", *reader_akhir);
}
```

---

## Key Concepts

### Why Multi-Threaded Architectures Require Smart Pointers
Rust's primary law states: *"Exactly ONE owner exists at a time"*.
Yet in production server runtimes:
A master Database Index or Cache must be read by **dozens of concurrent worker threads**. Who holds ownership?
**Smart Pointers solve this architectural dilemma**:

### The Essential Smart Pointer Triad:
1. **`Box<T>`**: Allocates memory onto the Heap with singular exclusive ownership. Crucial for recursive data structures (e.g. B-Trees).
2. **`Rc<T>` (Reference Counted)**: Enables **shared ownership** within a *single thread*. Automatically drops heap memory when the reference counter decrements to 0.
3. **`Arc<T>` (Atomic Reference Counted)**: The thread-safe evolution of `Rc`. Employs hardware-level atomic CPU instructions to synchronize counters safely across multiple threads.

### Interior Mutability: The `Arc<RwLock<T>>` Pattern
`Arc<T>` distributes read-only shared access. How do threads mutate shared state?
We envelop the inner collection in **`RwLock<T>`** or **`Mutex<T>`**!
The **`Arc<RwLock<HashMap<K, V>>>`** architecture is the **industry standard in Rust backend systems**:
- Countless threads invoke `.read()` concurrently without contention (*high read throughput*).
- Writers invoke `.write()` acquiring exclusive locks, mutating state safely before releasing locks upon drop.

---

---

## Beginner Friendly Explanation

### Analogy: Shared Hotel Guest Registers & Dry-Erase Boards
1. **`Arc<T>`** is a master corporate vault deed with authorized keycards: every department head carries a verified keycard. As long as at least one manager holds a card (*reference counter > 0*), the corporate vault cannot be decommissioned.
2. **`RwLock`** is a central announcement dry-erase whiteboard: 100 hotel guests read posted notifications simultaneously (*read lock*). When staff erase and write fresh flight announcements (*write lock*), patrons pause reading until the marker caps close.

## Experiments

- Replace Arc with plain Rc in the multi-threaded sample observing compiler rejection: "`Rc` cannot be sent between threads safely (lacks Send)".
- Induce a deadlock by calling index.write() twice consecutively within identical threads without releasing locks.
- Inspect active ownership reference counts deploying Arc::strong_count(&index).
- Benchmark read-heavy workloads comparing pure Mutex locking versus RwLock read concurrency.

---

## Challenge

Author a `ConcurrentCache<K, V>` struct encapsulating `Arc<RwLock<HashMap<K, V>>>` exposing clean `get(&self, key: &K)` and `set(&self, key: K, val: V)` APIs.

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

You have mastered Box, Arc, RwLock, and interior mutability. Next week, we examine Fearless Concurrency with OS Threads and Channels.
