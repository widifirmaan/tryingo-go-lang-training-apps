# Core Collections: Vec<T>, String vs &str & In-Memory HashMaps

> **Kategori:** Rust | **Level:** Ownership, Borrowing & Safe Types | **Minggu 4:** Core Collections: Vec<T>, String vs &str & In-Memory HashMaps
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master the foundational triad of Rust collections: Vec<T>, String, and HashMap<K, V>
- Internalize memory distinctions between String (heap-allocated buffer owner) and &str (borrowed slice view)
- Deploy idiomatic HashMap patterns: insert(), get(), remove(), and the atomic entry() API
- Convert raw byte streams Vec<u8> into UTF-8 strings safely via String::from_utf8_lossy
- Construct modular in-memory database storage engines using impl struct methods

---

## Program: In-Memory Key-Value Storage Engine with HashMap & Vector Buffers

```rust
use std::collections::HashMap;

// Struktur Penyimpanan Inti Key-Value Engine
struct InMemStore {
    // Kunci bertipe String, Nilai berupa kumpulan byte mentah (Vec<u8>)
    tabel: HashMap<String, Vec<u8>>,
    total_operasi: u64,
}

impl InMemStore {
    // Konstruktor Baru
    fn new() -> Self {
        InMemStore {
            tabel: HashMap::new(),
            total_operasi: 0,
        }
    }

    // Operasi SET: Mengambil kepemilikan kunci dan nilai untuk disimpan ke HashMap
    fn set(&mut self, kunci: String, nilai: Vec<u8>) {
        self.tabel.insert(kunci, nilai);
        self.total_operasi += 1;
    }

    // Operasi GET: Mengembalikan referensi peminjaman (&[u8]) tanpa alokasi memori baru!
    fn get(&self, kunci: &str) -> Option<&[u8]> {
        // as_deref() atau meminjam nilai dari Option<&Vec<u8>> menjadi Option<&[u8]>
        self.tabel.get(kunci).map(|vec| vec.as_slice())
    }

    // Operasi DEL: Menghapus data dan mengembalikan nilai yang dihapus jika ada
    fn del(&mut self, kunci: &str) -> bool {
        self.total_operasi += 1;
        self.tabel.remove(kunci).is_some()
    }
}

fn main() {
    println!("=== In-Memory Key-Value Engine (Rust Collections) ===");

    let mut db = InMemStore::new();

    // 1. Simpan data biner (misal: JSON string yang dikonversi ke bytes)
    db.set(String::from("config:cluster_name"), b"nusa-asia-southeast1".to_vec());
    db.set(String::from("metrics:cpu_usage"), vec![42, 85, 91]);

    // 2. Ambil data dengan referensi slice (&[u8])
    if let Some(bytes) = db.get("config:cluster_name") {
        let teks = String::from_utf8_lossy(bytes);
        println!("[HIT] config:cluster_name = '{}'", teks);
    } else {
        println!("[MISS] Kunci tidak ditemukan.");
    }

    // 3. Hapus data
    let terhapus = db.del("metrics:cpu_usage");
    println!("Apakah metrics:cpu_usage terhapus? {}", terhapus);
    println!("Total Operasi Mutasi DB: {}", db.total_operasi);
}
```

---

## Key Concepts

### The Triad of Standard Collections in Rust
1. **`Vec<T>`**: Contiguous expandable heap array. Appending via `.push(item)` enjoys excellent CPU cache locality.
2. **`String`**: Architecturally a zero-cost wrapper over `Vec<u8>` guaranteed to maintain **100% valid UTF-8 invariants**. Arbitrary numeric indexing `s[0]` is forbidden because variable-length UTF-8 glyphs span 1 to 4 bytes.
3. **`HashMap<K, V>`**: O(1) key-value hash table. Defaults to cryptographic *SipHash 1-3* algorithms, providing native immunity against HashDoS collision attacks.

### The Idiomatic `entry()` API
Avoid duplicate lookups (checking key existence followed by inserts). Deploy the atomic `entry()` API:
```rust
db.table.entry(key).or_insert_with(|| vec![0]);
```
This inspects and conditionally initializes entries in a single optimized pass!

---

---

## Beginner Friendly Explanation

### Analogy: Bookcase Shelves & Hardcover Dictionaries
1. **`Vec<T>`** is an expanding horizontal shelf: books stack from left to right; appending puts fresh volumes onto the right end (*push*).
2. **`HashMap<K, V>`** is an unabridged encyclopedic dictionary: looking up the term 'Cryptography' (*key*) navigates directly to letter C to read the definition (*value*) without paging through the entire book.

## Experiments

- Deploy the entry API: db.table.entry(key).or_insert(default_val) inserting records conditionally.
- Inject invalid UTF-8 byte sequences observing String::from_utf8 return an explicit Err variant.
- Audit memory bucket allocations by inspecting db.table.capacity().
- Iterate through the database via for (k, v) in &db.table printing all key-value entries.

---

## Challenge

Add an `mget(&self, keys: &[&str]) -> Vec<Option<&[u8]>>` method to `InMemStore` retrieving multiple values concurrently in a single call.

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

You have mastered Vec, String vs &str, and HashMap storage. Next week, we enter Level 2: Traits, Generics, and Error Handling.
