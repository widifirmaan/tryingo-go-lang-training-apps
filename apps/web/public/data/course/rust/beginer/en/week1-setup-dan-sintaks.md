# Setup, Toolchain & Basic Syntax

> **Kategori:** Rust | **Level:** Beginner | **Minggu 1:** Setup, Toolchain & Basic Syntax

## Learning Objectives

- Understand Rust as a memory-safe systems programming language
- Install Rust (rustup) and toolchain: cargo, rustc, rustfmt
- Understand .rs file structure: fn main, println!, macros vs functions
- Learn basic types: i32, f64, bool, char, &str, tuples, arrays
- Immutability by default and type inference

---

## Program: Hello, Rust!

```rust
fn main() {
    println!("Selamat datang di Rust!");
    println!("Rust adalah bahasa systems programming yang aman dan cepat.");

    let nama: &str = "Ferris";
    let versi: f64 = 1.78;
    let aktif: bool = true;

    println!("Nama: {}", nama);
    println!("Versi: {:.2}", versi);
    println!("Aktif: {}", aktif);

    let x = 42;
    let y: i32 = 100;
    println!("Tipe x: i32 (inferensi)");
    println!("x + y = {}", x + y);

    let tuple: (i32, f64, &str) = (42, 3.14, "halo");
    println!("Tuple: {:?}", tuple);
    println!("Tuple.0 = {}", tuple.0);

    let arr: [i32; 5] = [1, 2, 3, 4, 5];
    println!("Array: {:?}", arr);
    println!("arr[0] = {}", arr[0]);
}
```

---

## Key Concepts

### Rust's Role
Systems programming language with memory safety via ownership system — no garbage collector needed.

### Toolchain
`rustc`, `cargo`, `rustfmt`, `clippy`

### Macros vs Functions
`println!` is a macro (note `!`). Macros generate code at compile time.

### Basic Types
Integers (i8-i128, u8-u128), floats (f32, f64), bool, char, tuples, arrays.

### Immutability
Immutable by default. Add `mut` for mutability.

---

## Experiments

- Change mutable variable values and observe
- Create tuples with different types
- Try arithmetic operations with different types
- Create 10-element array and access by index
- Experiment with type annotation vs inference

---

## Challenge

Build a temperature converter (Celsius ↔ Fahrenheit ↔ Kelvin) with menu. Use tuples to store conversion data.

---

## Summary

Week 1 of 14: **Setup, Toolchain & Basic Syntax** (Level: Beginner). Rust provides memory safety without GC. Next week: **Ownership & Borrowing**.
