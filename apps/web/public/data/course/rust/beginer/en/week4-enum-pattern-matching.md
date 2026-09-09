# Enum & Pattern Matching — Shop Choices That Must Be Complete

> **Kategori:** Rust | **Level:** Beginner | **Minggu 4:** Enum & Pattern Matching
> **Prerequisites:** Week 3 — **Struct & Method**.

## Learning Objectives

- `enum Status { In, Out, Preorder }` limited choices (source: doc.rust-lang.org/book/ch06)
- `match` must handle ALL variants (compiler prevents forgetting), `if let` for 1 case

---

## Why This Matters (Non-IT)

Shop status is only 3: in/out/preorder. With free `String`s, typo `"iN"` slips → bug. With `enum`, typo = compile error. Complete `match` = adding a `Broken` variant without updating `match` → error, no forgotten branch.

---

## Program: Forget-Proof Shop Status

```rust
enum Status { In, Out, Preorder }

fn label(s: Status) -> String {
  match s {
    Status::In => "Available".to_string(),
    Status::Out => "Out".to_string(),
    Status::Preorder => "Preorder".to_string(),
    // Delete 1 line above → ERROR: non-exhaustive patterns! (compiler guards)
  }
}

fn main() {
  println!("{}", label(Status::In));

  let s = Status::Out;
  if let Status::In = s {
    println!("In");
  } else {
    println!("Not in");
  }

  // Enums carrying data (Rust special!)
  enum Pay { Cash(u32), Transfer { bank: String, amount: u32 } }
  let b = Pay::Transfer { bank: "BCA".to_string(), amount: 62000 };
  match b {
    Pay::Cash(n) => println!("Cash Rp{}", n),
    Pay::Transfer { bank, amount } => println!("{} Rp{}", bank, amount),
  }
}
```

---

## Key Concepts

### `enum` = Limited Choices
`enum Status { In, Out }` — only those, `"iN"` impossible.

### `match` Must Be Complete (Exhaustive)
Every variant needs a branch. The compiler rejects gaps — no `default` hiding bugs.

### `if let` = 1 Case
`if let Status::In = s` for caring about 1 variant only.

### Enums Carry Data
`Cash(u32)` / `Transfer { bank, amount }` — choice + data at once.

---

## Beginner Friendly Explanation

### Analogy: 3-Choice Stamps
- **enum = 3-stamp box**: In/Out/Preorder, no 4th stamp.
- **match = officer stamping all**: add a 4th stamp without updating the officer → rejected.

### Step 0 — Prepare Device
- Same as W1: `cargo run`.

### How the Computer Reads It
1. `label(Status::In)` → matches branch 1 → "Available".
2. Delete the `Preorder` branch → compile error `non-exhaustive`.

### 3 Must-Know Terms
1. **Enum**: limited choices
2. **match**: must be complete
3. **if let**: 1 case

---

## Experiments

- **Green:** Add variant `Broken` → error? Add branch → runs?
- **Yellow:** `Pay::Cash(50000)` → "Cash Rp50000"?
- **Red:** `match` without the `Preorder` branch → compile error (read the message!)?

---

## Challenge

**Order Status:** `enum Order { New, Ship(String), Done }` (`Ship` carries receipt!) + `match` info per status + `if let Order::Ship(receipt)`.
- **Link-up (Week 3 — Struct & Method):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **enum/match/if let**: choices/complete/one
- **Exhaustive**: all mandatory

---

## Summary

Week 4 of 6: **Forget-Proof Choices** (Level: Beginner). Compiler guards branches. Next: **Collections** — racks.
