# Setup, Toolchain & Basic Syntax

## Why This Matters

Rust guarantees memory safety without a garbage collector - used in the Linux kernel, blockchain, game engines, and high-performance tooling. Its compiler is strict but friendly: it is the best teacher you will have on ownership.

Practice program: *"Hello, Rust!"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- Understand Rust as a memory-safe systems programming language
- Install Rust (rustup) and toolchain: cargo, rustc, rustfmt
- Understand .rs file structure: fn main, println!, macros vs functions
- Learn basic types: i32, f64, bool, char, &str, tuples, arrays
- Immutability by default and type inference


## Foundations: Before Writing Code

This section is for readers who are **completely new** to programming. The concepts are identical across every language - learn them once, use them forever.

- **Files & folders = where programs live.** A program is plain text saved in a file (e.g. `lesson.md`). Files have **extensions** that indicate the language: `.md`, `.go`, `.py`, `.html`. A folder holding all of a program's files is called a **project**.
- **Terminal / command line.** A text window where you type commands: `cd folder` (change folder), `ls` / `dir` (list contents), `go run main.go` (run a program). Programs run from the folder containing their files.
- **Compiled vs interpreted.** **Compiled** languages (Go, Rust, C#) translate the whole program into machine instructions before running - fast, but require a build step. **Interpreted** languages (Python, PHP, JavaScript) execute line by line directly - great for learning and quick prototypes. The playgrounds on this site execute code **inside your browser**, so no installation is needed.
- **Statically typed vs dynamically typed.** **Statically typed** languages (Go, Rust, TypeScript) check data types (numbers, text) while you write - errors surface early. **Dynamically typed** languages (Python, PHP, JavaScript) check types while the program runs - more lenient, but errors appear at runtime.
- **How to read error messages.** Read the last line first: the error type plus a short explanation, then locate the **line number** it mentions. Errors are not tragedies - they are the computer telling you what to fix.
- **REPL / playground.** A REPL (Read-Eval-Print Loop) is a code "calculator": type one line, see the result instantly. Every code block on this site has a **Try in Playground** button letting you tweak and run the code live - the fastest way to learn: change a little, run, observe the difference.

> **Important note:** the browser playground has limitations - it cannot receive interactive keyboard input (stdin). If a challenge asks for "user input", simply write the value directly into a variable (e.g. `let name = "Budi"`; `rupiah = 250000`) and run.

---

---

## Quick Start Guide: Setup & Project Initialization

> **Try it directly in the browser without local setup.** All code blocks can run directly in the Playground.

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. Runtime & Dependency Installation (Rustup (Rust Toolchain Installer))
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

> **Prerequisite Note:** Rustup manages rustc compiler versions, the Cargo package manager, and stdlib.

---

### 2. Initializing a Blank Project (Scaffolding)
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

### 3. Running the Local Dev Server & First Entry File
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
    let message = format!("Halo, {}! Selamat datang di era Memory Safety.", name);
    println!("{}", message);

    let numbers = vec![1, 2, 3, 4, 5];
    let sum: i32 = numbers.iter().sum();
    println!("Hasil penjumlahan vector: {}", sum);
}
```
Simple Rust program showcasing vectors, iterators, and string formatting.

---

### 4. New Project Directory Structure
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

### 5. Beginner Tips & Best Practices
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
Systems programming language with memory safety via ownership system - no garbage collector needed.

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
