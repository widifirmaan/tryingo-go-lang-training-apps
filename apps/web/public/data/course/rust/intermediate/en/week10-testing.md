# Testing — Real Rust Shop Taste-Test

> **Kategori:** Rust | **Level:** Intermediate | **Minggu 10:** Testing

## Learning Objectives

- `#[test]` + `assert_eq!` real tasting + `cargo test` runs (source: doc.rust-lang.org/book/ch11)
- `#[should_panic]` expects explosion + `///` doc-tests (auto-run in library crates!)

---

## Why This Matters (Non-IT)

`println` simulation isn't machine-checked. Real `cargo test`: change formula → red → fix. Doc-tests (examples in `///`) run too in library crates — docs never go stale!

---

## Program: Real Cashier Taste-Test

```rust
fn calc(a: i32, b: i32) -> i32 { a + b }

/// Safe divide.
///
/// Example (see doc-test note below!):
/// ```
/// assert_eq!(divide(10.0, 2.0), Ok(5.0));
/// ```
fn divide(a: f64, b: f64) -> Result<f64, String> {
  if b == 0.0 { Err("can't divide by 0".to_string()) } else { Ok(a / b) }
}

#[cfg(test)]
mod test {
  use super::*;

  #[test]
  fn calc_correct() {
    assert_eq!(calc(2, 3), 5);
  }

  #[test]
  fn divide_zero_errors() {
    assert!(divide(5.0, 0.0).is_err());
  }

  #[test]
  #[should_panic]
  fn index_overflow_panics() {
    let v = vec![1];
    let _ = v[5]; // expected panic!
  }
}
```

```bash
cargo test
# test result: ok. 3 passed — GREEN for real
```

> **Honest note (researched):** the `///` example above is called a **doc-test**, but `cargo test` ONLY runs those for **library crates** (`src/lib.rs` via `cargo new --lib`). In a binary crate (`src/main.rs` as here), the example is documentation only — never executed. Want real auto-running doc-tests? Move `calc`/`divide` into `src/lib.rs`, then `cargo test` shows a separate `Doc-tests` section. `#[test]` unit tests run in both.

---

## Key Concepts

### `#[test]` + `assert_eq!` = Machine Taste
`assert_eq!(calc(2,3), 5)` — mismatch → red + left-right values.

### `#[should_panic]` = Expect Explosion
For code that SHOULD panic.

### Doc-Test = Living Example
`/// ``` ` joins `cargo test` — stale examples caught instantly!

---

## Beginner Friendly Explanation

### Analogy: Kitchen Taste
- **test = taste**: cook → machine tastes.

### Step 0 — Prepare Device
- Same as W1: `cargo test` (no extra install!).

### How the Computer Reads It
1. `cargo test` → compiles in test mode → runs each `#[test]` in parallel → reports.

### 3 Must-Know Terms
1. **test/assert/doc-test**: taste/expect/living-example

---

## Experiments

- **Green:** Change formula → red? Fix it.
- **Yellow:** Move `divide` into `src/lib.rs`, break the `///` example → `cargo test` shows RED Doc-tests? (Stale docs caught!)
- **Red:** Test without `#[test]` → not run? Add attribute.

---

## Challenge

**Tested Shop:** `calc/discount/divide` + 4 GREEN tests + screenshot + (bonus) move to `lib.rs` until Doc-tests go GREEN too. **Intermediate Rust DONE!**

---

## Mini Glossary

- **test/assert/doc-test**: taste/expect/example

---

## Summary

Week 10 of 14: **Real Tasting** (Level: Intermediate). **Intermediate Rust DONE!** Next: **Smart Pointers** (Advanced).
