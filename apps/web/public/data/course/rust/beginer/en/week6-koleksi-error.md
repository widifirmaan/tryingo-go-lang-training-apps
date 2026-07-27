# Collections (Vec, String, HashMap) & Error Handling

> Category: Rust, Programming Language | Level: Beginner | Week 6

## Learning Objectives

- Use Vec<T>: push, pop, iteration, indexing
- Manipulate String: push_str, format!, concatenation
- Use HashMap: insert, get, entry API
- Handle errors with Result<T, E>: Ok, Err
- Use unwrap, expect, and the ? operator

---

## Program: Koleksi & Error

```rust
use std::collections::HashMap;

fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("cannot divide by zero"))
    } else {
        Ok(a / b)
    }
}

fn main() {
    let mut numbers: Vec<i32> = vec![1, 2, 3];
    numbers.push(4);
    println!("Vec: {:?}", numbers);
    if let Some(last) = numbers.pop() {
        println!("Pop: {}", last);
    }

    let mut s = String::from("Hello");
    s.push_str(" Rust");
    println!("String: {}", s);
    let combined = format!("{} {}!", s, "world");
    println!("Format: {}", combined);

    let mut map = HashMap::new();
    map.insert("name", "Alice");
    map.insert("city", "Jakarta");
    println!("Map entry: {:?}", map.get("name"));

    match divide(10.0, 2.0) {
        Ok(h) => println!("10 / 2 = {}", h),
        Err(e) => println!("Error: {}", e),
    }
    match divide(1.0, 0.0) {
        Ok(_) => {}
        Err(e) => println!("Error: {}", e),
    }

    let result = divide(8.0, 4.0).unwrap();
    println!("8 / 4 = {}", result);

    let parsed = "42".parse::<i32>().expect("parse failed");
    println!("Parsed: {}", parsed);
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Vec<T>

`vec![]` macro. `push` adds, `pop` removes from the end. `get(index)` returns `Option`, safe from out-of-bounds.

### String

`push_str` appends a string. `format!` concatenates with formatting. `String` is heap-allocated and mutable.

### HashMap

Key-value storage. `insert`, `get` returns `Option<&V>`. `entry().or_insert()` is a powerful API for defaults.

### Result<T, E>

`Ok(T)` for success, `Err(E)` for errors. `unwrap()` panics on Err. `expect("message")` with custom message. The `?` operator for concise error propagation.

---

## Experiments

Try modifying the code:

1. **Vec ops** — try `numbers.insert(0, 0)` and `numbers.remove(1)`
2. **HashMap entry** — use `entry("name").or_insert("default")`
3. **Parse error** — try `"xyz".parse::<i32>()` and see the error

---

## Challenge

Create a program that takes a sentence, stores words in Vec<String>, counts frequency with HashMap, and handles number parsing errors. Use Result for a safe division function.

---

## Summary

Vec, String, HashMap are Rust's standard collections. Result<T, E> for safe error handling — unwrap, expect, and the ? operator. No exceptions in Rust, all errors are explicit. Next week: modules, crates, and testing.
