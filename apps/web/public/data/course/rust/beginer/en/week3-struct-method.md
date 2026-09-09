# Struct & Method — Rust Product Cards

> **Kategori:** Rust | **Level:** Beginner | **Minggu 3:** Struct & Method
> **Prerequisites:** Week 2 — **Ownership & Borrowing**.

## Learning Objectives

- `struct Product { name: String, price: u32 }` — Rust product card (owns data)
- `impl Product { fn info(&self) }` — stamp on card, `&self` read-borrow, `&mut self` for discounts
- `Product::new()` constructor

---

## Why This Matters (Non-IT)

50 products as scattered `String`s get messy. `struct` = 1 card holding 3 rows, `impl` = stamps.

---

## Program: Rust Shop Card

```rust
struct Product {
    name: String,
    price: u32,
    stock: u32,
}

impl Product {
    fn new(name: String, price: u32) -> Self {
        Self { name, price, stock: 0 }
    }
    fn info(&self) -> String {
        format!("{}: Rp{} (stock {})", self.name, self.price, self.stock)
    }
    fn discount(&mut self, pct: u32) {
        self.price = self.price - self.price * pct / 100;
    }
}

fn main() {
    let mut rice = Product { name: "Rice".to_string(), price: 62000, stock: 10 };
    println!("{}", rice.info());
    rice.discount(10);
    println!("After discount: {}", rice.info());

    let sugar = Product::new("Sugar".to_string(), 15000);
    println!("{}", sugar.info());
}
```

---

## Key Concepts

### `struct` = Card
`struct Product { name: String, price: u32 }` → `Product { name: "Rice".to_string(), price: 62000 }`

### `impl` + `&self`/`&mut self`
- `&self` reads, `&mut self` writes. `Self` = Product.

---

## Beginner Friendly Explanation

### Analogy: Cards & Stamps
- `struct` = card, `impl` = stamps. `&mut self` price-cut stamp.

### Step 0 — Prepare Device
- Same as W1: `cargo run`, try calling `discount` on immutable binding.

### How the Computer Reads It
1. `rice.discount(10)` → `&mut self` = rice → price cut 10%.
2. Immutable `sugar.discount(10)` → compile error (needs `mut`).

### 3 Must-Know Terms
1. **struct/impl/self**: card/stamp/itself

---

## Experiments

- **Green:** `Product::new("Tea", 8000)` → `info()` shows stock 0?
- **Yellow:** `discount(50)` → price halved?
- **Red:** Call `discount` on non-`mut` binding → borrow error? Add `mut`.

---

## Challenge

**Cart:** `struct Cart { items: Vec<Product> }` + `fn add(&mut self, p: Product)` + `fn total(&self) -> u32`.
- **Link-up (Week 2 — Ownership & Borrowing):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **struct/impl**: card/stamp

---

## Summary

Week 3: **Struct** — Rust cards. Next: **Enum** — choices.
