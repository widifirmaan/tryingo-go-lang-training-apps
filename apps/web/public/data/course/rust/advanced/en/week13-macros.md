# Macros

> **Kategori:** Rust | **Level:** Advanced | **Minggu 13:** Macros

## Learning Objectives

- macro_rules! for declarative macros
- Pattern matching in macros: $expr, $ident, $ty
- Repetition: $(...)* for multiple arguments
- Custom derive macros (conceptual)
- Built-in macros: format!, println!, vec!, include_str!

---

## Program: Metaprogramming

```rust
// Declarative macro (macro_rules!)
macro_rules! say_hello {
    () => {
        println!("Halo dari macro!");
    };
}

macro_rules! create_function {
    ($func_name:ident) => {
        fn $func_name() {
            println!("Fungsi {} dipanggil", stringify!($func_name));
        }
    };
}

macro_rules! calculate {
    ($a:expr + $b:expr) => {
        $a + $b
    };
    ($a:expr * $b:expr) => {
        $a * $b
    };
}

// Vec! macro
macro_rules! my_vec {
    ($($x:expr),*) => {
        {
            let mut temp_vec = Vec::new();
            $(temp_vec.push($x);)*
            temp_vec
        }
    };
}

// Custom derive (konseptual)
// #[derive(Debug, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

impl std::fmt::Debug for Point {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "Point {{ x: {}, y: {} }}", self.x, self.y)
    }
}

fn main() {
    // Panggil macro
    say_hello!();

    // Macro buat fungsi
    create_function!(foo);
    foo();

    // Calculate macro
    let sum = calculate!(5 + 3);
    let product = calculate!(4 * 7);
    println!("5 + 3 = {}", sum);
    println!("4 * 7 = {}", product);

    // Vec macro
    let v = my_vec![1, 2, 3, 4, 5];
    println!("my_vec: {:?}", v);

    // Debug
    let p = Point { x: 10, y: 20 };
    println!("{:?}", p);

    // format! macro
    let s = format!("x={}, y={}", p.x, p.y);
    println!("format!: {}", s);

    // println! dan print!
    println!("println! dengan {} argumen", 2);
    print!("print! tanpa newline");
    println!();

    // stringify! dan concat!
    let ident = stringify!(hello_world);
    println!("stringify!: {}", ident);

    // include_str! (konseptual)
    // let content = include_str!("file.txt");
}
```

---

## Key Concepts

### Declarative Macros
`macro_rules!` for code generation via pattern matching.

### Fragment Specifiers
`$expr`, `$ident`, `$ty` for different token types.

### Repetition
`$(...),*` for repeating patterns.

### Custom Derive
Auto-generate trait implementations.

### Built-in Macros
Standard library macros for common tasks.

---

## Experiments

- Create macro to generate structs
- Experiment with macros for DSL
- Try macro with multiple pattern arms
- Create macro to generate tests
- Experiment with macros for logging

---

## Challenge

Create macro to generate builder pattern: builder_struct!(Name, field1: Type1, field2: Type2). Generate struct + impl + build method.

---

## Summary

Week 13 of 14: **Macros** (Level: Advanced). Metaprogramming in Rust. Next week: **Capstone Project**!
