# Unsafe Rust & Macros

> Category: Rust, Programming Language | Level: Advanced | Week 13

## Learning Objectives

- Understand unsafe blocks and functions
- Use raw pointers *const T and *mut T
- Know unsafe superpowers (dereference, FFI)
- Create declarative macros with macro_rules!
- Write simple macros for code generation

---

## Program: Unsafe

```rust
macro_rules! greet {
    ($name:expr) => {
        println!("Hello, {}!", $name);
    };
    ($name:expr, $year:expr) => {
        println!("Hello, {}! Year {}", $name, $year);
    };
}

fn main() {
    greet!("World");
    greet!("Rustacean", 2025);

    let mut x = 42;
    let r1: *const i32 = &x as *const i32;
    let r2: *mut i32 = &mut x as *mut i32;

    unsafe {
        println!("Value from raw pointer: {}", *r1);
        *r2 = 100;
        println!("After unsafe write: {}", *r2);
    }

    println!("Final x value: {}", x);

    let arr = [10, 20, 30, 40, 50];
    let p = arr.as_ptr();
    unsafe {
        for i in 0..3 {
            println!("arr[{}] = {}", i, *p.add(i));
        }
    }
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Unsafe

`unsafe {}` — blocks for operations Rust cannot guarantee safety. Superpowers: dereference raw pointers, call FFI, access unions, inline assembly.

### Raw Pointers

`*const T` (immutable) and `*mut T` (mutable). Can be null, dangling, or aliased. Only dereference inside unsafe blocks.

### Macros

`macro_rules!` — declarative macros for code generation. Pattern `$name:expr` matches an expression. Useful for reducing boilerplate.

---

## Experiments

Try modifying the code:

1. **New macro** — create a `add!(a, b)` macro that produces a + b
2. **Array pointer** — access arr[4] and arr[5] via unsafe pointer
3. **Without unsafe** — try dereferencing a raw pointer outside unsafe (fails)

---

## Challenge

Create a `vector![]` macro that creates a Vec with given elements. Use unsafe to access array elements via raw pointers. Implement an unsafe function `velocity` that calculates from raw pointers.

---

## Summary

Unsafe blocks provide access to raw pointers and FFI — safety responsibility is on the programmer. macro_rules! for declarative macros reducing boilerplate. Combining unsafe + macros for low-level abstractions. Next week: async/await and final project.
