# Traits & Generics: Zero-Cost Abstractions & Trait Bounds

> **Kategori:** Rust | **Level:** Traits, Smart Pointers & Fearless Concurrency | **Minggu 5:** Traits & Generics: Zero-Cost Abstractions & Trait Bounds
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Traits in Rust as contracts defining shared capabilities across heterogeneous types
- Internalize Zero-Cost Abstractions: high-level ergonomic constructs incurring zero runtime performance penalty
- Understand Monomorphization in Static Dispatch (<T: Trait>): compiler code duplication yielding native machine speed
- Understand Dynamic Dispatch utilizing Trait Objects (Box<dyn Trait>) for heterogenous runtime polymorphism
- Deploy native Derive Macros (#[derive(Clone, Debug, PartialEq)]) generating boilerplate trait implementations

---

## Program: Pluggable Storage Engine Trait with Static & Dynamic Dispatch

```rust
// 1. Definisi Trait: Kontrak Kemampuan yang Dapat Diimplementasikan oleh Tipe Apapun
pub trait MesinPenyimpan {
    fn tulis(&mut self, kunci: &str, nilai: &[u8]) -> Result<(), String>;
    fn baca(&self, kunci: &str) -> Option<Vec<u8>>;
    fn nama_engine(&self) -> &'static str;
}

// 2. Implementasi Trait pada Struct Memori
pub struct RamEngine {
    data: std::collections::HashMap<String, Vec<u8>>,
}

impl RamEngine {
    pub fn new() -> Self {
        RamEngine { data: std::collections::HashMap::new() }
    }
}

impl MesinPenyimpan for RamEngine {
    fn tulis(&mut self, kunci: &str, nilai: &[u8]) -> Result<(), String> {
        self.data.insert(kunci.to_string(), nilai.to_vec());
        Ok(())
    }

    fn baca(&self, kunci: &str) -> Option<Vec<u8>> {
        self.data.get(kunci).cloned()
    }

    fn nama_engine(&self) -> &'static str {
        "High-Speed In-Memory RAM Engine"
    }
}

// 3. Static Dispatch (Generics + Trait Bounds: T: MesinPenyimpan)
// Zero-Cost Abstraction: Compiler menghasilkan kode mesin khusus per tipe tanpa overhead runtime!
fn simpan_konfigurasi_server<T: MesinPenyimpan>(engine: &mut T, cluster_id: &str) {
    println!("Menggunakan Engine: {}", engine.nama_engine());
    let _ = engine.tulis("cluster_id", cluster_id.as_bytes());
}

fn main() {
    println!("=== Rust Trait Architecture: Zero-Cost Abstractions ===");

    let mut ram = RamEngine::new();
    simpan_konfigurasi_server(&mut ram, "nusa-cluster-alpha-01");

    if let Some(val) = ram.baca("cluster_id") {
        println!("Verifikasi Baca: {}", String::from_utf8_lossy(&val));
    }
}
```

---

## Key Concepts

### Demystifying Rust Traits
A Trait instructs the compiler regarding capabilities an entity exposes.
While conceptually analogous to interfaces in other languages, Traits are **substantially more expressive**:
1. Traits support Default Method Implementations.
2. Traits can be grafted onto existing types (even built-in primitives like `i32` or third-party structs!).

### The Magic of Zero-Cost Abstractions: Monomorphization
In Java, interface dispatches incur runtime indirection penalties via *Virtual Method Tables (vtables)*.
In Rust:
When declaring generic bounds `fn save<T: StorageEngine>(engine: &mut T)`:
During compilation, rustc executes **Monomorphization**. It stamps out dedicated machine code for `RamEngine` directly!
At runtime, **zero dynamic dispatch overhead exists**; executions call native assembly addresses as fast as raw function calls!

### Static vs Dynamic Dispatch (`dyn Trait`)
- **Static Dispatch (`<T: Trait>`)**: Rust default. Fastest execution, slightly larger binary footprints due to specialized monomorphized code.
- **Dynamic Dispatch (`Box<dyn Trait>`)**: Deployed when storing heterogenous implementations inside dynamic collections: `Vec<Box<dyn StorageEngine>>`.

---

---

## Beginner Friendly Explanation

### Analogy: Universal SIM Cards & Automated Tooling
1. **Traits** are Nano-SIM card dimensional standards: any cellular carrier manufacturing cards adhering to Nano-SIM geometry slots into any compliant smartphone (*trait implementation*).
2. **Monomorphization (Static Dispatch)** is an automated bespoke robotics line: if ordering an aluminum chassis, robots weld dedicated aluminum brackets; if titanium, dedicated titanium welds. Output cars perform flawlessly without rattle-prone adapter bolts.

## Experiments

- Create a DiskEngine struct implementing MesinPenyimpan, passing it to simpan_konfigurasi_server seamlessly.
- Implement std::fmt::Display for InMemStore enabling pretty printing via println!("{}", store).
- Construct a heterogeneous collection of Trait Objects: let engines: Vec<Box<dyn MesinPenyimpan>> = vec![...].
- Inject a default trait method fn ping(&self) -> bool { true } onto the MesinPenyimpan trait.

---

## Challenge

Implement `std::ops::Drop` for `RamEngine` printing "[Engine Shutdown] Clearing RAM memory..." when the instance leaves scope.

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

You have mastered Traits, Monomorphization, and dynamic Trait Objects. Next week, we examine modern Error Handling with the ? operator.
