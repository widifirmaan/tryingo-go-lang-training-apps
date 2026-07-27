# Borrowing, References & Slices

> Category: Rust, Programming Language | Level: Beginner | Week 3

## Learning Objectives

- Create shared references with &T
- Use mutable references &mut T
- Understand Rust borrowing rules
- Use slices &[T] and &str
- Prevent dangling references at compile time

---

## Program: Pinjaman & Irisan

```rust
fn main() {
    let s = String::from("hello world");
    let len = length(&s);
    println!("'{}' length: {}", s, len);

    let mut text = String::from("Rust");
    append(&mut text);
    println!("{}", text);

    let arr = [1, 2, 3, 4, 5];
    let slice = &arr[1..4];
    println!("Array slice: {:?}", slice);

    let word = String::from("programming");
    let slice_str = &word[0..5];
    println!("String slice: {}", slice_str);
}

fn length(s: &str) -> usize {
    s.len()
}

fn append(s: &mut String) {
    s.push_str(" is great");
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### References (&T and &mut T)

`&` creates a shared reference (borrow). `&mut` for mutable reference. Two rules: one &mut OR many &.

### Slices

`&arr[1..4]` — a reference to part of data. `&str` is a slice of String. Safe because checked at compile time.

### Dangling References

The Rust compiler prevents dangling references by checking lifetimes — references cannot outlive their data.

---

## Experiments

Try modifying the code:

1. **Remove length()** — try accessing `s` after the reference (still works)
2. **Change slice** — try `&arr[..3]` or `&arr[2..]`
3. **Break borrowing** — create both `&` and `&mut` simultaneously (will error)

---

## Challenge

Write a function `count_length(s: &str) -> usize` that counts string length without using .len(). Use slices and character iteration. Create another function that modifies a String via &mut ref.

---

## Summary

Borrowing: &T for shared references, &mut T for mutable. Rules: one mutable OR many immutable. Slices: &[T] and &str as references to data without ownership. The compiler prevents dangling references. Next week: structs, methods, and associated functions.
