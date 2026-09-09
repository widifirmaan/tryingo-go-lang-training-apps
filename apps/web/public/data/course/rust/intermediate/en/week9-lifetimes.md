# Lifetimes — Rust Borrowing ID Cards

> **Kategori:** Rust | **Level:** Intermediate | **Minggu 9:** Lifetimes
> **Prerequisites:** Week 8 — **Generics**.

## Learning Objectives

- `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str` — result lives as long as the SHORTER (source: doc.rust-lang.org/book/ch10-03-lifetime-syntax)
- Elision: 1 input → output follows it (no need to write `'a`)

---

## Why This Matters (Non-IT)

Borrow book A (due Monday) + B (due Friday) → combined photocopy valid until... Monday (shorter!). Without lifetimes, Rust refuses (fearing a stale Friday photocopy!). With `'a`, the compiler proves safety BEFORE run (not a runtime segfault like C!).

---

## Program: Shortest Photocopy (Official Book Example)

```rust
// 'a = borrowing age. Result lives as long as the SHORTER of x, y.
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
  if x.len() > y.len() { x } else { y }
}

fn main() {
  let s1 = String::from("fluffy rice"); // lives until end of main
  let result;
  {
    let s2 = String::from("sugar"); // lives until end of this block
    result = longest(s1.as_str(), s2.as_str());
    println!("Longest: {}", result); // OK: s2 still alive!
  }
  // println!("{}", result); // ERROR! s2 already dead (borrow checker guards)
}
```

Elision (no need to write — compiler guesses):
```rust
fn first(text: &str) -> &str { text } // 1 input → output follows its age
```

---

## Key Concepts

### `'a` = Borrowing Age Stamp
`fn f<'a>(x: &'a str) -> &'a str` — output lives as long as `x`.

### Shortest Wins
2 inputs different ages → result follows the short one. The compiler rejects use past that.

### Elision = No Need to Write
1 input → automatic. Write `'a` for 2+ inputs or structs storing references.

---

## Beginner Friendly Explanation

### Analogy: Photocopy of 2 Books with Different Due Dates
- **'a = photocopy validity** = min(Monday, Friday) = Monday.
- **Borrow checker = fierce librarian**: rejects before books go stale (compile-time, not reading-time!).

### Step 0 — Prepare Device
- Same as W1. Read the `borrowed value does not live long enough` error — it's a HINT, not an enemy!

### How the Computer Reads It
1. `longest(s1, s2)` → result age = min(age s1, age s2).
2. Using `result` after s2 dies → REJECTED.

### 3 Must-Know Terms
1. **Lifetime/'a/elision**: age/stamp/automatic

---

## Experiments

- **Green:** Use `result` INSIDE the block → runs?
- **Yellow:** Remove `<'a>` → `missing lifetime specifier` error? (Needed for 2 inputs!)
- **Red:** Read the `does not live long enough` error → points at dead s2's line? Understand it!

---

## Challenge

**Safe Library:** `fn borrow<'a>(a: &'a str, b: &'a str) -> &'a str` + 2 different ages + prove use-past-death is rejected + 1-input elision.

---

## Mini Glossary

- **Lifetime/elision/borrow-checker**: age/automatic/librarian

---

## Summary

Week 9 of 14: **Borrowing ID** (Level: Intermediate). Safe before run. Next: **Testing**.
