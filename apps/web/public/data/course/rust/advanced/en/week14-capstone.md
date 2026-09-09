# Capstone: Shop CLI + Library — Rust Grand Opening

> **Kategori:** Rust | **Level:** Advanced | **Minggu 14:** Capstone: CLI + Library
> **Prerequisites:** Week 13 — **Macros**.

## Learning Objectives

- Combine W1-W13: `struct` + `enum` + `trait` + `Result` + `Vec` + `test` into a tested cashier CLI + library

---

## Why This Matters (Non-IT)

13 separate weeks — capstone proves the combination: crash-proof terminal cashier + tested + 1 small binary. Your "production-ready Rust" portfolio.

---

## Program: Grand Opening Cashier CLI (Checklist)

```bash
cargo new shop --bin
```

```rust
// src/main.rs — combine all (W3 struct, W4 enum, W6 Result)
use std::env;

#[derive(Debug)]
struct Product { name: String, price: u32 }

enum Action { Add(String, u32), List }

fn parse(arg: &[String]) -> Result<Action, String> {
  match arg.get(1).map(|s| s.as_str()) {
    Some("--add") => Ok(Action::Add(
      arg.get(2).cloned().unwrap_or_default(),
      arg.get(3).and_then(|h| h.parse().ok()).unwrap_or(0),
    )),
    _ => Ok(Action::List),
  }
}

fn main() -> Result<(), String> {
  let arg: Vec<String> = env::args().collect();
  match parse(&arg)? {
    Action::Add(n, h) => println!("Add {} Rp{}", n, h),
    Action::List => println!("Listing..."),
  }
  Ok(())
}
```

```bash
cargo test   # GREEN? (W10: add 3 tests!)
cargo build --release  # 1 small binary!
./target/release/shop --add Rice 62000
```

**Capstone task:** Working CLI + 3 green tests + release binary + 1-min video. **Rust 0→Expert DONE!**

---

## Key Concepts

### Capstone = Combine 13 Weeks
Struct + enum + trait + Result + test = cashier.

---

## Beginner Friendly Explanation

### Analogy: Grand Opening
- **W1-W6 foundation** + **W7-W13 engine** = store. **W14 = open**.

### Step 0 — Prepare Device
- `cargo new shop --bin` + `cargo test` + `cargo build --release`.

### How the Computer Reads It
1. `--add Rice 62000` → `parse` → `Action::Add` → prints.
2. `cargo build --release` → optimized 1-file binary.

### 3 Must-Know Terms
1. **Capstone/binary**: combine/done

---

## Experiments

- **Green:** `--add Rice 62000` → "Add Rice Rp62000"?
- **Yellow:** No args → lists?
- **Red:** Non-number price → defaults 0? Validate input.

---

### Bonus: Split Modules (à la Rust Book Ch7 — mandatory for real projects!)

1 file of 500 lines = lost. Split: `mod cashier;` connects `src/cashier.rs`.

```rust
// src/cashier.rs — kitchen module
pub struct Product { pub name: String, pub price: u32 }

pub fn total(items: &[Product]) -> u32 {
    items.iter().map(|p| p.price).sum()
}
```

```rust
// src/main.rs — use the module
mod cashier; // connects cashier.rs! (without it: unresolved module)
use cashier::{Product, total};

fn main() {
    let rack = vec![
        Product { name: "Rice".to_string(), price: 62000 },
        Product { name: "Spinach".to_string(), price: 5000 },
    ];
    println!("Total: Rp{}", total(&rack)); // Total: Rp67000
}
```

- `mod cashier;` = plugs the file. `pub` = usable outside (without `pub` = private, error!).
- `use cashier::{Product, total};` = imports for short names.

---

## Challenge

**Grand Opening CLI:** Full program + 3 tests + release binary + video. **Rust 0→Expert DONE!**

---

## Mini Glossary

- **CLI/binary/test**: terminal/done/proven

---

## Summary

Week 14 of 14: **Rust Capstone** — CLI + library, **Rust 0→Expert DONE!** 🎉
