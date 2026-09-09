# Error Handling — No-Panic Rust Alarms

> **Kategori:** Rust | **Level:** Beginner | **Minggu 6:** Error Handling
> **Prerequisites:** Week 5 — **Collections**.

## Learning Objectives

- `Result<T, E>` = `Ok(v)` success or `Err(e)` failure — must handle, can't stay silent (source: doc.rust-lang.org/book/ch09)
- `match` catches, `?` throws to caller, `unwrap` (panics, avoid in production)

---

## Why This Matters (Non-IT)

Dividing stock `10/0` unchecked → shop crash. Rust forces it: fallible functions return `Result` — the compiler rejects unhandled ones. `?` propagates without nested `if`s.

---

## Program: Crash-Proof Rust Cashier

```rust
fn divide(a: f64, b: f64) -> Result<f64, String> {
  if b == 0.0 {
    Err("can't divide by 0 — check stock".to_string())
  } else {
    Ok(a / b)
  }
}

fn average(data: &[f64]) -> Result<f64, String> {
  if data.is_empty() {
    return Err("empty data".to_string());
  }
  let total: f64 = data.iter().sum();
  Ok(total / data.len() as f64)
}

fn main() {
  // 1. Catch with match
  match divide(10.0, 2.0) {
    Ok(v) => println!("10/2 = {}", v),
    Err(e) => println!("Error: {}", e),
  }

  // 2. ? throws (in main returning Result)
  println!("Divide 0: {:?}", divide(5.0, 0.0));
  println!("Empty avg: {:?}", average(&[]));
  println!("Avg: {:?}", average(&[80.0, 90.0]));

  // 3. unwrap = force (panics on Err — examples only!)
  // println!("{}", divide(10.0, 2.0).unwrap());
}
```

---

## Key Concepts

### `Result<T,E>` = `Ok` or `Err`
`Ok(v)` success carrying value, `Err(e)` failure carrying message. No silent `null`.

### `match` vs `?` vs `unwrap`
- `match` catches here.
- `?` throws to caller (function must return `Result`).
- `unwrap` force-takes (panics on `Err` — avoid in production).

---

## Beginner Friendly Explanation

### Analogy: Stove Alarm
- **`Result` = alarmed stove**: cooking `divide(5,0)` rings the alarm (`Err`), must switch off (`match`).
- **`?` = forward the alarm**: "I won't handle it, give it to the boss".

### Step 0 — Prepare Device
- Same as W1: `cargo run`.

### How the Computer Reads It
1. `divide(5.0, 0.0)` → `Err(...)` → `match` `Err` branch → prints.
2. `average(&[])` → `is_empty` → early `return Err`.

### 3 Must-Know Terms
1. **Result/Ok/Err**: result/success/failure
2. **?**: throw
3. **unwrap**: force (dangerous)

---

## Experiments

- **Green:** `divide(9.0, 3.0)` → `Ok(3.0)`?
- **Yellow:** `.unwrap()` on `Ok` → value? On `Err` → panic?
- **Red:** Function using `?` but returning `f64` (not `Result`) → compile error?

---

## Challenge

**Safe Cashier:** `fn discount(price: f64, pct: f64) -> Result<f64, String>` rejects `pct > 50` → `match` 3 cases (normal, reject, divide-0) + `?` propagating version. **Beginner Rust DONE!**
- **Link-up (Week 5 — Collections):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Result/Ok/Err/?**: result/success/failure/throw
- **panic/unwrap**: crash/force

---

## Summary

Week 6 of 6: **No-Panic Alarms** (Level: Beginner). **Beginner Rust DONE!** Next: **Advanced Ownership** (Intermediate).
