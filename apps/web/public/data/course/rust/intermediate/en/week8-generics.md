# Generics — Multipurpose Rust Racks

> **Kategori:** Rust | **Level:** Intermediate | **Minggu 8:** Generics
> **Prerequisites:** Week 7 — **Trait**.

## Learning Objectives

- `struct Cart<T> { items: Vec<T> }` any-type rack + `fn first<T>(v: &[T]) -> &T` (source: doc.rust-lang.org/book/ch10-01-syntax)
- `T: Cashier` bound (trait bound) — contracted only!

---

## Why This Matters (Non-IT)

Without generics, `StringCart` + `IntCart` duplicates. With `<T>` 1 rack + still strict (no loose `Any`). `T: Cashier` stops uncontracted goods entering the rack.

---

## Program: Generic Shop Rack

```rust
struct Cart<T> {
  items: Vec<T>,
}

impl<T> Cart<T> {
  fn new() -> Self { Self { items: Vec::new() } }
  fn add(&mut self, item: T) { self.items.push(item); }
  fn first(&self) -> Option<&T> { self.items.first() }
}

fn main() {
  let mut ks = Cart { items: vec!["Rice", "Sugar"] };
  ks.add("Coffee");
  println!("First: {:?}", ks.first());

  let mut ki: Cart<i32> = Cart::new();
  ki.add(62000);
  // ki.add("x"); // ERROR: not i32!

  // Trait bound: only contracted types (W7 Cashier trait summarized here so the example runs!)
  trait Cashier { fn calc(&self) -> u32; }
  struct Rice;
  impl Cashier for Rice {
    fn calc(&self) -> u32 { 25000 }
  }
  fn priciest<T: Cashier>(a: &T, b: &T) -> u32 {
    a.calc().max(b.calc())
  }
  println!("Priciest: {}", priciest(&Rice, &Rice));
}
```

---

## Key Concepts

### `<T>` = Temporary Label
`Cart<String>` → `T` becomes `String` everywhere.

### `T: Cashier` = Rack Requirement
Only contracted types may enter the function.

### `Option<&T>` = Safe Empty
`first()` → `Some`/`None` (not panic!).

---

## Beginner Friendly Explanation

### Analogy: Adjustable Rack
- **Generics = adjustable rack**: set `String`/`i32` — 1 rack.

### Step 0 — Prepare Device
- Same as W1: `cargo run`.

### How the Computer Reads It
1. `Cart { items: vec!["Rice"] }` → guesses `T = &str`.
2. `add(123)` → type error!

### 3 Must-Know Terms
1. **Generics/<T>/bound**: multipurpose/label/requirement

---

## Experiments

- **Green:** `Cart::new()` + guess type from `add`?
- **Yellow:** `first()` on empty rack → `None`? (Safe, no panic!)
- **Red:** Remove the `: Cashier` bound → calling `calc` inside → error?

---

## Challenge

**Generic Warehouse:** `Cart<T>` + `total<T: Priced>()` + 2 types + `Option` handles empty.
- **Link-up (Week 7 — Trait):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Generics/bound/Option**: multipurpose/requirement/safe

---

## Summary

Week 8 of 14: **Multipurpose Rack** (Level: Intermediate). 1 strict rack. Next: **Lifetimes**.
