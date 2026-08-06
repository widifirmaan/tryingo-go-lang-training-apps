# Testing

> **Kategori:** Rust | **Level:** Intermediate | **Minggu 10:** Testing

## Learning Objectives

- #[test] attribute to mark test functions
- assert!, assert_eq!, assert_ne! macros for verification
- #[cfg(test)] module for test collections
- Doc tests: tests inside code documentation
- cargo test to run all tests

---

## Program: Unit & Integration Tests

```rust
// Fungsi yang akan diuji
fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("tidak bisa dibagi nol".to_string())
    } else {
        Ok(a / b)
    }
}

fn is_even(n: i32) -> bool {
    n % 2 == 0
}

fn fibonacci(n: u32) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => {
            let mut a = 0u64;
            let mut b = 1u64;
            for _ in 2..=n {
                let temp = a + b;
                a = b;
                b = temp;
            }
            b
        }
    }
}

fn main() {
    // Simulasi test
    println!("=== Simulasi Unit Test ===");

    // Test add
    let result = add(2, 3);
    assert_eq!(result, 5, "add(2,3) harus 5");
    println!("✓ add(2,3) = {}", result);

    let result = add(-1, -1);
    assert_eq!(result, -2, "add(-1,-1) harus -2");
    println!("✓ add(-1,-1) = {}", result);

    // Test divide
    let result = divide(10.0, 2.0);
    assert!(result.is_ok());
    println!("✓ divide(10,2) = {:?}", result);

    let result = divide(5.0, 0.0);
    assert!(result.is_err());
    println!("✓ divide(5,0) = {:?}", result);

    // Test is_even
    assert!(is_even(4));
    assert!(!is_even(3));
    println!("✓ is_even tests passed");

    // Test fibonacci
    assert_eq!(fibonacci(0), 0);
    assert_eq!(fibonacci(1), 1);
    assert_eq!(fibonacci(10), 55);
    println!("✓ fibonacci tests passed");

    println!("
=== Semua test passed! ===");
    println!("Cargo test: cargo test");
    println!("Doc test: cargo test --doc");
}
```

---

## Key Concepts

### Unit Tests
`#[test]` attribute. `assert_eq!` for equality checks.

### Test Modules
`#[cfg(test)] mod tests { ... }` — dedicated test module.

### Doc Tests
Tests inside documentation comments.

### cargo test
Run all tests. Filter with name.

---

## Experiments

- Create tests for add function with edge cases
- Try assert_ne! and assert! with custom messages
- Create test module with setup/teardown
- Experiment with should_panic
- Create doc tests for public functions

---

## Challenge

Build a calculator library with unit tests: add, subtract, multiply, divide, power, factorial. Minimum 10 test cases.

---

## Summary

Week 10 of 14: **Testing** (Level: Intermediate). Intermediate phase complete! Next week: **Smart Pointers** (Advanced).
