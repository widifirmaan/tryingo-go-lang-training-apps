# Traits & Generics: Zero-Cost Abstractions & Trait Bounds

> **Kategori:** Rust | **Level:** Traits, Smart Pointers & Fearless Concurrency | **Minggu 5:** Traits & Generics: Zero-Cost Abstractions & Trait Bounds

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

## Summary

You have mastered Traits, Monomorphization, and dynamic Trait Objects. Next week, we examine modern Error Handling with the ? operator.
