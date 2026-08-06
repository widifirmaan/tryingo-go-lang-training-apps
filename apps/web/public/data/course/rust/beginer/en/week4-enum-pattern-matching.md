# Enums & Pattern Matching

> **Kategori:** Rust | **Level:** Beginner | **Minggu 4:** Enums & Pattern Matching

## Learning Objectives

- Enums with variants and data payloads
- Pattern matching with match expressions
- Destructuring: extract data from enum variants
- Option<T> and Result<T, E> standard enums
- if let and matches! macro for concise pattern matching

---

## Program: Order Status

```rust
#[derive(Debug)]
enum OrderStatus {
    Pending,
    Processing { started_at: String },
    Shipped { tracking_number: String },
    Delivered,
    Cancelled { reason: String },
}

impl OrderStatus {
    fn description(&self) -> String {
        match self {
            OrderStatus::Pending => "Menunggu pembayaran".to_string(),
            OrderStatus::Processing { started_at } => {
                format!("Diproses sejak {}", started_at)
            }
            OrderStatus::Shipped { tracking_number } => {
                format!("Dikirim, resi: {}", tracking_number)
            }
            OrderStatus::Delivered => "Terkirim".to_string(),
            OrderStatus::Cancelled { reason } => {
                format!("Dibatalkan: {}", reason)
            }
        }
    }

    fn is_terminal(&self) -> bool {
        matches!(self, OrderStatus::Delivered | OrderStatus::Cancelled { .. })
    }
}

fn main() {
    let orders = vec![
        OrderStatus::Pending,
        OrderStatus::Processing { started_at: "2024-01-15".to_string() },
        OrderStatus::Shipped { tracking_number: "JNE123".to_string() },
        OrderStatus::Delivered,
        OrderStatus::Cancelled { reason: "Stok habis".to_string() },
    ];

    for order in &orders {
        println!("{:?}", order);
        println!("  Status: {}", order.description());
        println!("  Terminal: {}", order.is_terminal());
        println!();
    }

    // if let pattern
    if let OrderStatus::Shipped { tracking_number } = &orders[2] {
        println!("Nomor resi: {}", tracking_number);
    }

    // Option enum
    let some_value: Option<i32> = Some(42);
    let none_value: Option<i32> = None;

    match some_value {
        Some(v) => println!("Value: {}", v),
        None => println!("No value"),
    }

    // unwrap_or
    let result = none_value.unwrap_or(0);
    println!("unwrap_or: {}", result);
}
```

---

## Key Concepts

### Enums
Variants can carry data: `Processing { field: Type }`.

### Match
Exhaustive — must handle all variants. `_` for catch-all.

### Destructuring
Extract fields from enum variants.

### Option<T>
`Some(T)` or `None`. No null in Rust.

### if let & matches!
Concis pattern matching shortcuts.

---

## Experiments

- Create new enum with 5+ variants
- Add method to enum using match
- Experiment with nested match
- Try matches! with guard clauses
- Create Result<T, E> and handle with match

---

## Challenge

Build a state machine: enum GameState (Menu, Playing, Paused, GameOver). Methods: transition, is_valid_transition. Use match for validation.

---

## Summary

Week 4 of 14: **Enums & Pattern Matching** (Level: Beginner). Rust's core strength. Next week: **Collections: Vec, HashMap, String**.
