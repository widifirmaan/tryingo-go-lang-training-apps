# Trait — Rust Shop Contract

> **Kategori:** Rust | **Level:** Intermediate | **Minggu 7:** Trait

## Learning Objectives

- `trait Cashier { fn calc(&self) -> u32; }` contract + `impl Cashier for Rice` fulfills (source: doc.rust-lang.org/book/ch10-02-traits)
- `fn pay(k: &impl Cashier)` accepts anything contracted + default methods

---

## Why This Matters (Non-IT)

Rice, Oil, Sugar must all `calc()` — without traits, write a function per type (duplicates!). With 1 trait contract, 1 `pay` function for all. Add `Coffee` without touching `pay`.

---

## Program: Rust Cashier Contract

```rust
trait Cashier {
  fn calc(&self) -> u32;
  fn name(&self) -> &str;
  // Default method (may skip rewriting!)
  fn receipt(&self) -> String {
    format!("{}: Rp{}", self.name(), self.calc())
  }
}

struct Rice { kg: u32, price: u32 }
impl Cashier for Rice {
  fn calc(&self) -> u32 { self.kg * self.price }
  fn name(&self) -> &str { "Rice" }
}

struct Oil { liter: u32, price: u32 }
impl Cashier for Oil {
  fn calc(&self) -> u32 { self.liter * self.price }
  fn name(&self) -> &str { "Oil" }
}

// Accepts ANYTHING contracted to Cashier!
fn pay(k: &impl Cashier) {
  println!("{}", k.receipt());
}

fn main() {
  pay(&Rice { kg: 2, price: 12500 });
  pay(&Oil { liter: 2, price: 17000 });
}
```

---

## Key Concepts

### `trait` + `impl ... for` = Contract + Fulfill
`trait Cashier { fn calc(...); }` contract, `impl Cashier for Rice` fulfills.

### `&impl Cashier` = Accept All Contracted
1 function for every fulfilling type (like Go interfaces).

### Default Method = Built-in Content
`receipt()` has a body in the trait — use directly.

---

## Beginner Friendly Explanation

### Analogy: Cashier Certificate
- **Trait = certificate**: "can calculate". Rice & Oil certified → may guard the cashier (`pay`).

### Step 0 — Prepare Device
- Same as Rust W1: `cargo run`.

### How the Computer Reads It
1. `pay(&Rice{...})` → check: does Rice fulfill Cashier? Yes → calls Rice's `calc`.

### 3 Must-Know Terms
1. **Trait/impl**: contract/fulfill
2. **impl Trait**: accept-contracted

---

## Experiments

- **Green:** Add `Sugar` + `impl Cashier` → `pay` works immediately?
- **Yellow:** Delete 1 `impl` method → `not all trait items implemented` error?
- **Red:** `fn pay(k: Rice)` (concrete type) → Oil rejected? Switch to `&impl Cashier`.

---

## Challenge

**Complete Contract:** `trait Discount { fn total(&self) -> u32; }` + 3 structs + `pay()` + default `receipt()`.

---

## Mini Glossary

- **Trait/impl**: contract/fulfill

---

## Summary

Week 7 of 14: **Contract** (Level: Intermediate). 1 function for all types. Next: **Generics**.
