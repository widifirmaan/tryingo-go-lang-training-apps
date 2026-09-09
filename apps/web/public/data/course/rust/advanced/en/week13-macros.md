# Macros — Rust Code Stamps

> **Kategori:** Rust | **Level:** Advanced | **Minggu 13:** Macros
> **Prerequisites:** Week 12 — **Concurrency**.

## Learning Objectives

- `macro_rules!` code stamps: write patterns → generate code (source: doc.rust-lang.org/book/ch19-06-macros + The Little Book of Rust Macros)
- `vec!`, `println!`, `format!` used daily = built-in macros (`!` is the mark!)

---

## Why This Matters (Non-IT)

Writing `vec![1,2,3]` vs `Vec::new(); push; push; push` — macros save 4 lines. `println!("Hello {}", name)` checks `{}` vs argument counts AT COMPILE (not runtime!). Build your own stamps for repeated patterns (e.g. `hashmap!`).

---

## Program: Rust Shop Stamps

```rust
// Own stamp: stock! (not in std!)
macro_rules! stock {
  ($( $name:expr => $qty:expr ),*) => {{
    let mut m = std::collections::HashMap::new();
    $( m.insert($name, $qty); )*
    m
  }};
}

fn main() {
  let s = stock! { "rice" => 10, "sugar" => 5 };
  println!("{:?}", s);

  // Built-ins used daily (all macros!):
  let v = vec![1, 2, 3];                    // vec!
  println!("Hello {}!", "Budi");            // println!
  let text = format!("Rp{}", 62000);        // format!
  println!("{}", text);
}
```

---

## Key Concepts

### `macro_rules!` + `$name:expr` = Pattern + Capture
`$( ... ),*` repeats comma-separated. `$name:expr` captures expressions.

### `!` = Macro Mark
`vec!`, `println!` — not functions (free argument counts!).

---

## Beginner Friendly Explanation

### Analogy: Code Stamps
- **Macro = stamp**: `stock!{...}` stamps → becomes 10 lines of code.

### Step 0 — Prepare Device
- Same as W1. `cargo expand` (optional) peeks at stamp output.

### How the Computer Reads It
1. Compile → macro runs FIRST → generates code → then compiles generated code.

### 3 Must-Know Terms
1. **macro_rules/!**: stamp/mark
2. **$expr/$( )*:**: capture/repeat

---

## Experiments

- **Green:** Empty `stock!{}` → empty HashMap?
- **Yellow:** Pattern without trailing comma → pattern error? Add it.
- **Red:** Plain function replacing `vec!` (free args)? Impossible! (That's why macros.)

---

## Challenge

**Store Stamp:** `add_stock!(map, "rice", 5)` add-or-create macro + compare lines saved vs `vec!`.
- **Link-up (Week 12 — Concurrency):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **macro/!/expand**: stamp/mark/peek

---

## Summary

Week 13 of 14: **Code Stamps** (Level: Advanced). Line-saving and safe. Next: **Capstone**.
