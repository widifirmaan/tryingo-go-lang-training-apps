# Ownership & Borrowing — Borrowed Books Must Return

> **Kategori:** Rust | **Level:** Beginner | **Minggu 2:** Ownership & Borrowing
> **Prerequisites:** Week 1 — **Rust Setup & Syntax**.

## Learning Objectives

- 1 owner 1 book — `let s = String::from("hello"); let s2 = s;` → `s` unusable after (ownership moved)
- Borrow `&s` (read) and `&mut s` (read+write) — book borrowed, returns
- Rule: 1 mutable borrow **or** many read borrows, never mixed
- `s.len()` read-borrows, `s.push_str()` mut-borrows

---

## Why This Matters (Non-IT)

Shops lending ledger books to branches — if 2 branches write simultaneously, records overlap. Rust prevents **data races** at compile time — no books go missing. Fussy at first, but safe.

---

## Program: Borrowing Library

```rust
fn main() {
    // 1. Move ownership
    let s1 = String::from("Shop");
    let s2 = s1; // s1 moves to s2, s1 dead
    // println!("{}", s1); // ❌ error: value borrowed after move
    println!("s2: {}", s2);

    // 2. Read borrow &s
    let s = String::from("Siti");
    let len = calc_len(&s); // borrow, s stays
    println!("'{}' length {}", s, len);

    // 3. Write borrow &mut
    let mut t = String::from("Rice");
    add_sugar(&mut t);
    println!("After adding: {}", t);

    // 4. Borrow rules
    let mut u = String::from("coffee");
    let r1 = &u; // read borrow
    let r2 = &u;
    println!("{} and {}", r1, r2); // many reads allowed
    // let r3 = &mut u; // ❌ no mut while reads exist

    let mut v = String::from("tea");
    let w = &mut v; // 1 mut borrow
    // let w2 = &mut v; // ❌ no 2 muts
    w.push_str(" sweet");
    println!("{}", w);
}

fn calc_len(s: &String) -> usize {
    s.len() // read borrow
}

fn add_sugar(s: &mut String) {
    s.push_str(" + Sugar");
}
```

---

## Key Concepts

### Move = Ownership Transfer
`let s2 = s1` → `s1` dead. To copy, `let s2 = s1.clone()`.

### `&` vs `&mut`
- `&String` read borrow (many allowed)
- `&mut String` write borrow (1 only, never with reads)

### Golden Rule
Many reads **or** 1 write, never mixed — prevents overlap.

---

## Beginner Friendly Explanation

### Analogy: Branch Ledger Books

- **Move = book handover**: branch A hands to B, A has it no more.
- **`&` = read photocopy**: branch borrows a copy, original stays central.
- **`&mut` = borrow original to write**: only 1 may write.

### Step 0 — Prepare Device
- Same as W1: `cargo run`, deliberately trigger a move error.

### How the Computer Reads It
1. `let s2 = s1` → ownership moves → `s1` invalid after.
2. `&mut v` while `&v` exists → compile error before run.

### 3 Must-Know Terms
1. **Ownership/move**: owner/transfer
2. **Borrow &/&mut**: borrow
3. **Clone**: photocopy

---

## Experiments

- **Green:** `let s1 = String::from("hello"); let s2 = s1.clone(); println!("{} {}", s1, s2)` → both alive?
- **Yellow:** After `calc_len(&s)`, is `s` still usable? Yes.
- **Red:** `let r1=&s; let r2=&mut s;` → error?

---

## Challenge

**Borrowing Shop:** Build `fn print_it(s: &String)`, `fn add_stock(s: &mut String)`, call `print_it(&shop)` then `add_stock(&mut shop)` → order matters (read first, then mut).

---

## Mini Glossary

- **Ownership/move**: owner/transfer
- **Borrow &/&mut**: borrow
- **Clone**: photocopy

---

## Summary

Week 2: **Ownership** — borrows must return. Next: **Struct** — Rust cards.
