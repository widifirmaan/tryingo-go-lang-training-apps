# Setup, Toolchain & Basic Syntax

> **Kategori:** Rust | **Level:** Beginner | **Minggu 1:** Setup, Toolchain & Basic Syntax

## Learning Objectives

- Understand Rust as a memory-safe systems programming language
- Install Rust (rustup) and toolchain: cargo, rustc, rustfmt
- Understand .rs file structure: fn main, println!, macros vs functions
- Learn basic types: i32, f64, bool, char, &str, tuples, arrays
- Immutability by default and type inference

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **rust-analyzer** (`rust-lang.rust-analyzer`): Official Rust language server with deep type inference and macro expansion
- **Even Better TOML** (`tamasfe.even-better-toml`): TOML syntax support for Cargo.toml

Or install all recommended extensions at once via terminal:
```bash
code --install-extension rust-lang.rust-analyzer --install-extension tamasfe.even-better-toml
```

---

### 2. Runtime & Dependency Installation (Rustup (Rust Toolchain Installer))
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
```powershell
winget install Rustlang.Rustup
```

**macOS (Terminal / Homebrew):**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**Linux (Ubuntu/Debian / bash):**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
rustc --version && cargo --version
```

Expected output:
```output
rustc 1.8x.x ...
cargo 1.8x.x ...
```

> 💡 **Prerequisite Note:** Rustup manages rustc compiler versions, the Cargo package manager, and stdlib.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
cargo new my-rust-app --bin
cd my-rust-app
```
- **Details:** Cargo scaffolds a complete binary project including Cargo.toml and src/main.rs.
- **Navigate to the project directory:**
```bash
cd my-rust-app
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
cargo run
```
Open in browser or terminal: `Terminal Console`

> ℹ️ Cargo fetches crates, compiles your code, and runs the output binary.

**Initial Entry File (`src/main.rs`):**
```rust
fn main() {
    let name = "Developer Rust";
    let message = format!("🦀 Halo, {}! Selamat datang di era Memory Safety.", name);
    println!("{}", message);

    let numbers = vec![1, 2, 3, 4, 5];
    let sum: i32 = numbers.iter().sum();
    println!("Hasil penjumlahan vector: {}", sum);
}
```
Simple Rust program showcasing vectors, iterators, and string formatting.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-rust-app/
├── src/
│   └── main.rs          # Titik masuk program Rust
├── Cargo.toml           # Metadata project & daftar crates
├── Cargo.lock           # Versi dependensi terkunci persis
└── target/              # Hasil kompilasi binary (di-git-ignore)
```
Standard Cargo structure for binary applications.

---

### 6. Beginner Tips & Best Practices
- Use `cargo check` during development for lightning-fast compilation verification without building binaries.
- Run `cargo run --release` to test code under maximum compiler optimizations.

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
