# Database Durability: File I/O, Write-Ahead Log (WAL), fsync & Crash Recovery

> **Kategori:** Rust | **Level:** Async Tokio, WAL Durability & KV Engine Capstone | **Minggu 10:** Database Durability: File I/O, Write-Ahead Log (WAL), fsync & Crash Recovery
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Database Durability (the D in ACID) via Write-Ahead Logging (WAL) architectures
- Understand OS write-buffer caching vulnerabilities and the critical role of fsync (sync_data / sync_all)
- Design compact binary serialization protocols specifying explicit byte-order endianness (Big-Endian)
- Construct Crash Recovery Replay algorithms: reconstituting in-memory indexes following sudden power losses
- Prevent partial write corruptions using CRC32 checksum frames appended to log entries

---

## Program: High-Durability WAL File Engine with Disk Sync (fsync) & Log Replay

```rust
use std::fs::{File, OpenOptions};
use std::io::{self, BufReader, Read, Write};
use std::path::Path;

// Format Biner Catatan WAL: [Tipe(1B)] [PanjangKunci(2B)] [Kunci] [PanjangNilai(4B)] [Nilai]
struct WalLogger {
    file: File,
}

impl WalLogger {
    fn open_or_create<P: AsRef<Path>>(path: P) -> io::Result<Self> {
        let file = OpenOptions::new()
            .create(true)
            .append(true)
            .read(true)
            .open(path)?;
        Ok(WalLogger { file })
    }

    // Penulisan Log Transaksi Sebelum State Memori Diubah (Write-Ahead Logging)
    fn log_set(&mut self, key: &str, val: &[u8]) -> io::Result<()> {
        let mut buffer = Vec::new();
        buffer.push(1u8); // OpCode 1 = SET

        // Tulis panjang kunci (u16 big-endian) dan kunci
        let key_bytes = key.as_bytes();
        buffer.extend_from_slice(&(key_bytes.len() as u16).to_be_bytes());
        buffer.extend_from_slice(key_bytes);

        // Tulis panjang nilai (u32 big-endian) dan nilai
        buffer.extend_from_slice(&(val.len() as u32).to_be_bytes());
        buffer.extend_from_slice(val);

        // Tulis ke buffer berkas
        self.file.write_all(&buffer)?;

        // FSYNC KRUSIAL: Memaksa kernel OS mengosongkan cache disk ke piringan SSD fisik!
        // Tanpa sync_all(), data bisa hilang jika listrik server mati mendadak!
        self.file.sync_data()?;

        Ok(())
    }
}

// Simulasi Pemulihan Bencana (Crash Recovery Replay)
fn replay_wal_log(raw_bytes: &[u8]) -> Vec<(String, String)> {
    println!("[Crash Recovery] Memulai pembacaan ulang berkas WAL untuk membangun kembali memori...");
    let mut hasil = Vec::new();
    let mut cursor = 0;

    while cursor < raw_bytes.len() {
        let opcode = raw_bytes[cursor];
        cursor += 1;

        if opcode == 1 { // SET
            let k_len = u16::from_be_bytes([raw_bytes[cursor], raw_bytes[cursor + 1]]) as usize;
            cursor += 2;
            let key = String::from_utf8_lossy(&raw_bytes[cursor..cursor + k_len]).to_string();
            cursor += k_len;

            let v_len = u32::from_be_bytes([
                raw_bytes[cursor], raw_bytes[cursor + 1], raw_bytes[cursor + 2], raw_bytes[cursor + 3]
            ]) as usize;
            cursor += 4;
            let val = String::from_utf8_lossy(&raw_bytes[cursor..cursor + v_len]).to_string();
            cursor += v_len;

            println!("  --> [REPLAY SET] Kunci: '{}' = '{}'", key, val);
            hasil.push((key, val));
        }
    }

    hasil
}

fn main() {
    println!("=== Durabilitas Transaksi Database: WAL & Crash Replay ===");

    // Simulasi byte stream WAL hasil penulisan
    let mut mock_wal_stream = Vec::new();

    // Entri 1: SET user=admin
    mock_wal_stream.push(1);
    mock_wal_stream.extend_from_slice(&(4u16).to_be_bytes());
    mock_wal_stream.extend_from_slice(b"user");
    mock_wal_stream.extend_from_slice(&(5u32).to_be_bytes());
    mock_wal_stream.extend_from_slice(b"admin");

    // Entri 2: SET quota=5000
    mock_wal_stream.push(1);
    mock_wal_stream.extend_from_slice(&(5u16).to_be_bytes());
    mock_wal_stream.extend_from_slice(b"quota");
    mock_wal_stream.extend_from_slice(&(4u32).to_be_bytes());
    mock_wal_stream.extend_from_slice(b"5000");

    let restored = replay_wal_log(&mock_wal_stream);
    println!("\nTotal State Pulih Setelah Crash: {} record terselamatkan!", restored.len());
}
```

---

## Key Concepts

### Why Databases Mandate Write-Ahead Logging (WAL)
If an in-memory database holds state exclusively in volatile RAM:
Sudden power interruptions mean customer financial records **evaporate irreversibly**!

**The Write-Ahead Logging (WAL) Contract**:
1. Before mutating in-memory indexes, the engine **must append an immutable audit log record to persistent disk storage first**.
2. Appends execute sequentially (*sequential disk I/O*), allowing NVMe SSDs to sustain hundreds of thousands of write IOPS.
3. Only after the append commits to disk does the engine mutate memory and acknowledge: "Transaction Committed".

### The Peril of Omitting `fsync` (`sync_data()`)
Invoking standard `file.write()` does NOT flush bytes directly to physical SSD flash cells; Linux buffers them in the OS Page Cache.
A power outage 500ms later vaporizes unwritten page caches!
Calling **`file.sync_data()` (fsync)** issues an uncompromising hardware directive: *"Halt execution until the SSD controller confirms bytes have committed to non-volatile flash cells!"*

---

---

## Beginner Friendly Explanation

### Analogy: Notary Indelible Ledgers vs Classroom Chalkboards
1. **In-Memory RAM** is an erasable classroom chalkboard: sales totals are written with chalk dust. A sudden burst of rain (*power cut*) washes the board clean.
2. **Write-Ahead Logging (WAL)** is an indelible notary ledger: before chalk dust is wiped, the notary records the transaction in permanent ink (*append to disk*).
3. **Crash Recovery Replay** is opening the shop the following morning: the clerk reads the notary ledger from line one (*replay log*), reconstructing the chalkboard totals to the exact state before the storm.

## Experiments

- Inspect the generated WAL file with a hex viewer examining OpCodes and big-endian lengths.
- Benchmark disk write throughput with fsync toggled on versus off (~100x latency divergence!).
- Simulate corrupted half-written log records observing how safe parsers catch truncated frames.
- Explore Log Compaction snapshots pruning WAL files exceeding 100 Megabytes.

---

## Challenge

Add OpCode `2` for `DEL` operations in the WAL logger, updating `replay_wal_log` to remove keys when processing deletion logs.

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

You have mastered database durability, append-only I/O, fsync, and crash recovery. Next week, we examine Unsafe Rust boundaries and zero-copy performance.
