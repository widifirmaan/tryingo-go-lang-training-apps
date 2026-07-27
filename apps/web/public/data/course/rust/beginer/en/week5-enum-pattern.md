# Enums & Pattern Matching

> Category: Rust, Programming Language | Level: Beginner | Week 5

## Learning Objectives

- Define enums with data-carrying variants
- Use match with exhaustiveness checking
- Apply if let for concise matching
- Use Option<T> (Some, None)
- Write safe code without null pointers

---

## Program: Pencocokan Pola

```rust
enum Message {
    Text(String),
    Coordinate(i32, i32),
    Silent,
}

fn main() {
    let list = vec![
        Message::Text(String::from("hello world")),
        Message::Coordinate(10, 20),
        Message::Silent,
    ];

    for m in &list {
        match m {
            Message::Text(t) => println!("Text: {}", t),
            Message::Coordinate(x, y) => println!("Position: ({}, {})", x, y),
            Message::Silent => println!("silent..."),
        }
    }

    let number: Option<i32> = Some(42);
    if let Some(n) = number {
        println!("Number in Option: {}", n);
    }

    let empty: Option<i32> = None;
    println!("Default value: {}", empty.unwrap_or(0));
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Enums

`enum Message { Text(String), Coordinate(i32, i32), Silent }` — each variant can carry different data. `match` checks exhaustiveness.

### if let

`if let Some(n) = number` — concise pattern matching for one pattern. More compact than `match` for simple cases.

### Option<T>

`Some(T)` or `None` — a safe null alternative. `unwrap_or(default)` provides a default value. No NullPointerException in Rust.

---

## Experiments

Try modifying the code:

1. **New variant** — add `Image(Vec<u8>)` to the Message enum
2. **New match arm** — handle the new variant in match
3. **None handling** — change `unwrap_or(0)` to `unwrap_or_else(|| -1)`

---

## Challenge

Create an `enum Direction` with variants `North`, `South`, `East`, `West`. Use match to return a description string. Create a function that takes `Option<Direction>` and handle the None case with if let.

---

## Summary

Enums represent multiple possible variants, each can carry data. match checks exhaustiveness — all variants must be handled. if let for concise matching. Option<T> safely replaces null. Next week: collections (Vec, String, HashMap) and error handling.
