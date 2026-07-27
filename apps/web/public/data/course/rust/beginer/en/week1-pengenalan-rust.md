# Introduction to Rust & Toolchain

> Category: Rust, Programming Language | Level: Beginner | Week 1

## Learning Objectives

- Understand the Rust toolchain: rustup, cargo, rustc
- Write your first program with fn main() and println!
- Declare variables with let and let mut
- Learn basic types: i32, f64, bool, char
- Apply shadowing and constants

---

## Program: Halo Rust

```rust
fn main() {
    println!("Welcome to Rust!");
    println!("Your first Rust program.");

    let name: &str = "Rustacean";
    let mut age: i32 = 25;
    let height: f64 = 175.5;
    let active: bool = true;
    let initial: char = 'R';

    println!("Name: {}", name);
    println!("Age: {}", age);
    println!("Height: {} cm", height);
    println!("Active: {}", active);
    println!("Initial: {}", initial);

    age += 1;
    println!("Next year age: {}", age);

    let x = 5;
    let x = x + 2;
    println!("Shadowing x: {}", x);

    const VERSION: &str = "1.82";
    println!("Rust version: {}", VERSION);
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Rust Program Structure

Every .rs file starts with `fn main()` as the entry point. `println!` is the macro for printing text with a newline.

### Variables and Data Types

`let` declares an immutable variable. `let mut` for mutable. Rust has type inference; basic types: `i32`, `f64`, `bool`, `char`.

### Shadowing and Constants

Shadowing: `let x = 5; let x = x + 2;` — re-declaring with the same name. `const` for compile-time constants in SCREAMING_CASE.

---

## Experiments

Try modifying the code:

1. **Change name** — replace "Rustacean" with your name
2. **Add variable** — declare `let city = "Jakarta";` and print it
3. **Shadowing** — try shadowing with a different type: `let x = "text";`

---

## Challenge

Create a program that prints a short bio: name, age, city, and hobby. Use different variable types (`&str`, `i32`, `bool`). Use shadowing to change values.

---

## Summary

Rust is a systems programming language with toolchain: rustup (management), cargo (build/run), rustc (compiler). `let` and `let mut` for variables. Shadowing allows name reuse. Next week: control flow and ownership concepts.
