# Rust Setup & Syntax — Strict Library

> **Kategori:** Rust | **Level:** Beginner | **Minggu 1:** Setup & Sintaks Dasar

## Learning Objectives

- Install Rust via `rustup`, check `cargo --version`, create `cargo new shop --bin`, run `cargo run`
- Understand `let` (locked box) vs `let mut` (changeable box) — Rust is **immutable by default**
- Types explicit or guessed: `let x: i32 = 5`, `let y = 5` (guesses i32), `String` vs `&str`
- `println!` with `{}`, `{:?}` debug, and `cargo fmt` tidying

---

## Why This Matters (Non-IT)

Rust = a **very strict** library: every book has 1 owner; borrowing means returning. Feels fussy at first, but **no books go missing** (memory safety without garbage). Perfect for shops that refuse to lose money to bugs.

Today set up the library, write the first receipt.

---

## Program: First Rust Receipt

Save in `src/main.rs` after `cargo new shop`

```rust
fn main() {
    println!("Siti's Shop — Rust Library");

    // 1. let = locked box (can't change)
    let name = "Budi"; // &str, auto-guessed
    let rice_kg: i32 = 2; // i32 = 32-bit integer
    let price: i32 = 12500;

    // let mut = changeable box
    let mut total = rice_kg * price;
    println!("Customer: {}, Total: Rp {}", name, total);

    // Change mut
    total = total + 5000; // add delivery
    println!("After delivery: Rp {}", total);

    // let can't change: let x = 5; x = 6; // ❌ error: cannot assign twice

    // 2. String vs &str
    let s1: &str = "hello"; // borrowed text (doesn't own)
    let s2: String = String::from("hello"); // owned text (on heap)
    println!("s1: {}, s2: {}", s1, s2);

    // 3. Shadowing — same name, new box
    let x = 5;
    let x = x + 1; // new box, not a change
    println!("x shadow: {}", x);

    // 4. Express: if/loop/functions (à la Rust Book Ch3 — mandatory before W2!)
    let stock = 3;
    if stock > 0 {
        println!("Stock present: {}", stock);
    } else {
        println!("Gone!");
    }
    for i in 1..=3 {
        println!("Count: {}", i);
    }
    println!("Discount: {}", discount(62000, 10));

    println!("\nTool: cargo run (run), cargo fmt (tidy), cargo build (print binary)");
}

fn discount(price: i32, pct: i32) -> i32 {
    price - price * pct / 100 // no ; = return!
}
```

**How to run (5 minutes):**
1. Install from `rustup.rs` → `rustup` → Next → check `cargo --version` + `rustc --version`
2. `cargo new shop --bin; cd shop`
3. Replace `src/main.rs` with the code → `cargo run` → see receipt
4. Scramble spaces → `cargo fmt` → tidy

---

## Key Concepts

### `let` vs `let mut`
- `let x = 5` → **locked**, `x = 6` impossible (error)
- `let mut x = 5` → `x = 6` allowed → use `mut` when changes are needed

### Guessed vs Explicit Types
`let x = 5` guesses `i32`, `let x: i32 = 5` explicit. `String` owns heap, `&str` borrows.

### `println!("Hello {}", name)`
`!` macro, `{}` fills variable. `{:?}` debug.

### `cargo` — Library Worker
`cargo new`, `cargo run`, `cargo fmt`, `cargo build --release` (fast).

---

## Beginner Friendly Explanation

### Analogy: Strict Library

- **Rust = library**: every book 1 owner. `let` = book locked on shelf, `let mut` = writable book.
- **`cargo` = librarian**: `cargo new` builds a new library, `cargo run` opens and reads.

### Step 0 — Prepare Device
- Install `rustup` (rustup.rs), verify `cargo --version`, create `cargo new shop --bin`.

### How the Computer Reads It
1. `let x = 5; x = 6` → compile error `cannot assign twice` before run.
2. `cargo run` → compiles → runs binary → receipt prints.

### 3 Must-Know Terms

1. **let/mut**: locked/changeable
2. **String/&str**: own/borrow
3. **cargo**: worker
4. **if/for/fn**: decide/repeat/recipe (no `;` = return!)

---

## Experiments

- **Green:** `let mut rice = 2; rice += 3` → how much?
- **Yellow:** `let x = 5; let x = x+1` → shadowing 6?
- **Red:** `let x = 5; x = 6` without mut → `cannot assign` error.

---

## Challenge

**Rust Delivery Receipt:** `let weight: f64 = 2.5; let dist: i32 = 8; let fee = (weight * 5000.0) as i32 + dist * 2000; println!("Weight {}kg dist {}km → Rp {}", weight, dist, fee)` + `cargo fmt`.

---

## Mini Glossary

- **Rust/cargo**: language/librarian
- **let/mut**: locked/changeable
- **i32/f64**: numbers

---

## Summary

Week 1 of 14: **Rust Setup** (Level: Beginner). Library on, first receipt done. Next: **Ownership** — borrowed books must return.
