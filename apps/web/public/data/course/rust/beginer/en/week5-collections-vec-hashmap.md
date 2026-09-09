# Collections — Dynamic Racks and Rust Address Books

> **Kategori:** Rust | **Level:** Beginner | **Minggu 5:** Collections
> **Prerequisites:** Week 4 — **Enum & Pattern Matching**.

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

  // Slices — borrow a part (à la Rust Book 4.3)!
  let all = vec![10, 20, 30, 40];
  let middle: &[i32] = &all[1..3]; // borrow indexes 1-2 → [20, 30]
  println!("Middle: {:?}", middle);

  // Strings deep — append, combine, careful slicing!
  let mut hi = String::from("Hello");
  hi.push_str(", Budi"); // append back
  hi.push('!');          // 1 char
  let joined = hi + " Yup!"; // + MOVES hi's ownership!
  println!("{}", joined);
  // &hi[0..5] → "Hello" safe; slicing mid-multibyte-char (é is 2 bytes) = PANIC!

  // Iterators + closures — functional conveyor (à la Rust Book Ch13)!
  let nums = vec![1, 2, 3, 4];
  let even_doubled: Vec<i32> = nums.iter().filter(|&&x| x % 2 == 0).map(|&x| x * 2).collect();
  println!("Even doubled: {:?}", even_doubled); // [4, 8]
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

### Slice `&all[1..3]` = Borrow a Part
`&[i32]` without owning. Bounds follow length (`1..3` = indexes 1,2).

### Strings: `push_str`/`push`/`+`
`+` MOVES left ownership! Slice strings ONLY at char boundaries (é = 2 bytes, mid-slice = panic).

### Iterators + Closures `|x| ...`
`.iter().filter().map().collect()` conveyor without `for`. Closure `|&x| x*2` quick function capturing surroundings.

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
- **Link-up (Week 4 — Enum & Pattern Matching):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Vec/HashMap/mut**: rack/book/permission
- **Option/get**: safe/check

---

## Summary

Week 5 of 6: **Racks & Books** (Level: Beginner). Dynamic + safe. Next: **Error** — `Result` alarms.
