# Modules, Crates & Testing

> Category: Rust, Programming Language | Level: Intermediate | Week 7

## Learning Objectives

- Create module hierarchy with mod and pub
- Import paths with use and super
- Write unit tests with #[test] and assert_eq!
- Use #[cfg(test)] for test modules
- Write documentation with /// comments

---

## Program: Organisasi Kode

```rust
/// Utility module containing helper functions
mod utils {
    /// Math operation module
    pub mod math {
        pub fn add(a: i32, b: i32) -> i32 { a + b }
        pub fn multiply(a: i32, b: i32) -> i32 { a * b }
    }

    /// String manipulation module
    pub mod str_utils {
        pub fn greet(name: &str) -> String { format!("Hello, {}!", name) }
    }
}

use utils::math;
use utils::str_utils;

fn main() {
    println!("3 + 4 = {}", math::add(3, 4));
    println!("5 * 6 = {}", math::multiply(5, 6));
    println!("{}", str_utils::greet("John"));
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(math::add(2, 3), 5);
    }

    #[test]
    fn test_multiply() {
        assert_eq!(math::multiply(4, 5), 20);
    }

    #[test]
    fn test_greet() {
        assert_eq!(str_utils::greet("John"), "Hello, John!");
    }
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Modules

`mod utils { pub mod math { ... } }` — code hierarchy. `pub` makes items visible outside the module. `use` brings paths into scope.

### Testing

`#[cfg(test)]` — test code only compiled during testing. `#[test]` marks a test function. `assert_eq!`, `assert!` for assertions.

### Documentation

`///` documentation comments. `cargo doc` generates HTML docs from doc comments. Modules can contain docs for code organization.

---

## Experiments

Try modifying the code:

1. **New function** — add `pub fn subtract(a: i32, b: i32) -> i32` in math module
2. **New test** — add a test for the new function
3. **New module** — create `pub mod statistics` submodule with average function

---

## Challenge

Create a `geometry` module with submodules `two_d` (circle area, square area) and `three_d` (cube volume, sphere volume). Write at least 3 unit tests. Use /// doc comments.

---

## Summary

Modules organize code with mod/pub/use. Unit tests with #[test] and #[cfg(test)]. assert_eq! and assert! for assertions. /// for documentation comments. cargo test runs all tests. Next week: generics and traits.
