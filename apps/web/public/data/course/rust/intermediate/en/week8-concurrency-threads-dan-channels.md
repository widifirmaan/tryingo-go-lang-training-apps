# Fearless Concurrency: std::thread, Send/Sync & mpsc Channels

> **Kategori:** Rust | **Level:** Traits, Smart Pointers & Fearless Concurrency | **Minggu 8:** Fearless Concurrency: std::thread, Send/Sync & mpsc Channels
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Internalize Rust's "Fearless Concurrency" guarantee: compile-time proof of data-race freedom
- Spawn native operating system threads via std::thread::spawn utilizing move closures
- Master marker traits Send (ownership safe to transfer across threads) and Sync (safe to share references across threads)
- Construct inter-thread communication pipelines deploying mpsc channels (Multi-Producer, Single-Consumer)
- Architect a Dedicated Background Worker pattern isolating non-blocking disk I/O operations

---

## Program: Background WAL Disk Flusher with Cross-Thread mpsc Message Pipelines

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

// Pesan Transaksional yang Dikirim Melalui Saluran Pipa Antar-Thread
enum WalCommand {
    AppendRecord { id: u64, data: String },
    SyncDisk,
    Shutdown,
}

fn main() {
    println!("=== Fearless Concurrency: Background WAL Flusher Pipeline ===");

    // 1. mpsc: Multi-Producer, Single-Consumer Channel
    // tx = Transmitter (Pengirim), rx = Receiver (Penerima)
    let (tx, rx) = mpsc::channel::<WalCommand>();

    // 2. Thread Pekerja Latar Belakang (Dedicated Background Disk Flusher)
    let flusher_thread = thread::spawn(move || {
        println!("[Flusher Thread] Siaga mendengarkan instruksi penulisan...");

        let mut buffer = Vec::new();

        // Loop menerima pesan sampai channel ditutup atau menerima sinyal Shutdown
        while let Ok(cmd) = rx.recv() {
            match cmd {
                WalCommand::AppendRecord { id, data } => {
                    println!("[Flusher Disk] Menampung record #{}: '{}' ke buffer", id, data);
                    buffer.push((id, data));
                }
                WalCommand::SyncDisk => {
                    println!("[Flusher Disk] MELAKUKAN FSYNC KE DISK FISIK ({} records diamankan)!", buffer.len());
                    buffer.clear();
                }
                WalCommand::Shutdown => {
                    println!("[Flusher Disk] Sinyal shutdown diterima. Mengosongkan buffer akhir & keluar.");
                    break;
                }
            }
        }
    });

    // 3. Thread Klien Produser (Multi-Producer: Clone Transmitter tx)
    let tx1 = tx.clone();
    let client_1 = thread::spawn(move || {
        tx1.send(WalCommand::AppendRecord { id: 101, data: String::from("SET user=budi") }).unwrap();
        thread::sleep(Duration::from_millis(50));
        tx1.send(WalCommand::AppendRecord { id: 102, data: String::from("SET role=admin") }).unwrap();
    });

    let tx2 = tx.clone();
    let client_2 = thread::spawn(move || {
        thread::sleep(Duration::from_millis(20));
        tx2.send(WalCommand::AppendRecord { id: 103, data: String::from("DEL session_token") }).unwrap();
    });

    // Tunggu semua produser selesai mengirim
    client_1.join().unwrap();
    client_2.join().unwrap();

    // Perintahkan sinkronisasi dan shutdown
    tx.send(WalCommand::SyncDisk).unwrap();
    tx.send(WalCommand::Shutdown).unwrap();

    // Tunggu thread flusher selesai merapikan disk
    flusher_thread.join().unwrap();
    println!("\nPipeline konkurensi selesai dengan keamanan memori 100%!");
}
```

---

## Key Concepts

### The Concept of "Fearless Concurrency"
In legacy languages, multi-threaded programming triggers dread over undetected Data Races, intermittent Heisenbugs, and silent memory corruption.
In **Rust**, concurrency is termed **Fearless Concurrency**.
If concurrent routines introduce data races, **the program will never compile!** The compiler proves concurrency invariants mathematically during compilation.

### The Guardian Marker Traits: `Send` and `Sync`
Rust enforces thread safety through two core **Marker Traits**:
1. **`Send`**: Declares that ownership of this type can safely **transfer across thread boundaries**. Nearly all standard types satisfy `Send`, excluding thread-local raw pointers (e.g. `Rc<T>`).
2. **`Sync`**: Declares that references `&T` can safely **share across multiple concurrent threads**. A type `T` is `Sync` if and only if `&T` satisfies `Send`.

### The mpsc Pipeline (Multi-Producer, Single-Consumer)
The `mpsc::channel()` pattern enables multiple concurrent worker threads to dispatch tasks into a unified pipeline consumed sequentially by a dedicated background worker. This constitutes the architecture of high-performance database WAL logging engines!

---

---

## Beginner Friendly Explanation

### Analogy: Supermarket Pneumatic Cash Chutes
Consider a massive multi-level supermarket:
1. **Multi-Producer (tx.clone())** are 10 checkout registers across the sales floor: each cashier inserts completed receipt envelopes (*WalCommand*) into dedicated pneumatic chutes.
2. **Single-Consumer (rx.recv())** is the secure accounting vault in the basement: a single dedicated clerk reads arriving canisters sequentially (*flusher thread*), ledgering transactions into the master register (*SyncDisk*). Cashiers never brawl over the vault keys.

## Experiments

- Omit the move keyword on thread::spawn observing the compiler reject the closure for potentially outliving stack frames.
- Spawn 10 producer threads dispatching 100 concurrent messages into the shared channel.
- Deploy mpsc::sync_channel(bound) experimenting with bounded channels providing backpressure.
- Observe that all WAL records serialize smoothly without exposing raw Mutex primitives to producers.

---

## Challenge

Enhance the flusher thread to trigger automated `SyncDisk` flushes whenever internal buffers accumulate 10 records.

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

You have mastered Fearless Concurrency, Send/Sync traits, and mpsc channels. Next week, we enter Level 3: Asynchronous Systems with Tokio.
