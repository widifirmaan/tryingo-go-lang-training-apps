# Collections — Dynamic Racks and Rust Address Books

> **Kategori:** Rust | **Level:** Beginner | **Minggu 5:** Collections

## Learning Objectives

- `Vec` dynamic rack `vec![]` + `push`, `HashMap` address book `insert`/`get` (source: doc.rust-lang.org/book/ch08)
- `prices["rice"]` vs `prices.get("coffee")` (`Option`, safe vs panic)

---

## Why This Matters (Non-IT)

30 products don't fit in manual variables. `Vec` = sliding rack, `HashMap` = price book. `get()` returns `Option` (present/missing) — forces handling "missing", never silent `null`.

---

## Program: Shop Racks & Books

```rust
use std::collections::HashMap;

fn main() {
  // Vec dynamic rack (mut to push)
  let mut stock = vec!["rice", "oil"];
  stock.push("sugar");
  println!("{:?} length {}", stock, stock.len());
  println!("First: {}", stock[0]);

  // HashMap address book
  let mut prices = HashMap::new();
  prices.insert("rice", 62000);
  prices.insert("sugar", 15000);
  println!("Rice price: Rp{}", prices["rice"]);

  // Safe: get() → Option
  match prices.get("coffee") {
    Some(h) => println!("Coffee Rp{}", h),
    None => println!("No coffee yet"),
  }

  // Loop racks & books
  for (i, b) in stock.iter().enumerate() {
    println!("{}. {}", i + 1, b);
  }
  for (name, h) in &prices {
    println!("{}: Rp{}", name, h);
  }
}
```

---

## Key Concepts

### `Vec` vs Array
`[&str; 2]` fixed, `vec![]` slides + `push`. Needs `mut` to change.

### `HashMap` + `Option`
`insert` fills, `["key"]` direct (panics when missing!), `get()` safe → `Some`/`None`.

### `{:?}` Debug
`println!("{:?}", stock)` prints arrays for debug.

---

## Beginner Friendly Explanation

### Analogy: Sliding Racks & Address Books
- **Vec = sliding IKEA rack**: `push` adds without buying a new rack.
- **HashMap = address book**: look up "Budi" → number. `get` = "present? → number / missing".

### Step 0 — Prepare Device
- Same as W1: `cargo run`.

### How the Computer Reads It
1. `stock.push("sugar")` → appends at back (needs `mut`!).
2. `prices.get("coffee")` → missing → `None` → `None` branch.

### 3 Must-Know Terms
1. **Vec/HashMap**: rack/book
2. **mut**: change permission
3. **Option Some/None**: present/missing

---

## Experiments

- **Green:** `stock.push("coffee")` → len 4?
- **Yellow:** Direct `prices["coffee"]` → `no entry` panic? Switch to `get` + `match`.
- **Red:** `let stock = vec![...]` without `mut` + `push` → `cannot borrow as mutable` error?

---

## Challenge

**Inventory:** `Vec` of 5 products + `HashMap` prices → loop print + `get` 1 missing (handle `None`) + delete `prices.remove("sugar")`.

---

## Mini Glossary

- **Vec/HashMap/mut**: rack/book/permission
- **Option/get**: safe/check

---

## Summary

Week 5 of 6: **Racks & Books** (Level: Beginner). Dynamic + safe. Next: **Error** — `Result` alarms.
