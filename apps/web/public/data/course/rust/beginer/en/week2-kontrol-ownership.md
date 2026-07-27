# Control Flow & Ownership Concept

> Category: Rust, Programming Language | Level: Beginner | Week 2

## Learning Objectives

- Use if/else for branching
- Apply loop, while, and for for iteration
- Understand ownership concept: move semantics
- Distinguish String and &str
- Use basic match on integers

---

## Program: Alur & Kepemilikan

```rust
fn main() {
    let score = 85;
    if score >= 90 {
        println!("Grade: A");
    } else if score >= 75 {
        println!("Grade: B");
    } else {
        println!("Grade: C");
    }

    let mut count = 0;
    loop {
        count += 1;
        print!("loop{} ", count);
        if count >= 3 {
            break;
        }
    }
    println!();

    for i in 0..3 {
        print!("for{} ", i);
    }
    println!();

    let s1 = String::from("hello");
    let s2 = s1;
    println!("s2: {}", s2);

    let num = 2;
    match num {
        1 => println!("one"),
        2 => println!("two"),
        _ => println!("other"),
    }
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Control Flow

`if/else` for branching. `loop` for infinite iteration, `while` and `for` for controlled iteration.

### Basic Ownership

Every value has one owner. `let s2 = s1;` moves ownership — `s1` can no longer be used. `String` lives on the heap, `&str` on the stack.

### Match

`match` on integers: patterns are checked top to bottom. Must be exhaustive (cover all cases).

---

## Experiments

Try modifying the code:

1. **Change score** — try scores 92, 70, 45 and see different grades
2. **Match number** — change match number to 1 or 3
3. **Ownership** — try accessing `s1` after moving to `s2` (will error)

---

## Challenge

Create a simple calculator with a menu: input two numbers, pick operation (add/subtract/multiply/divide) via match. Use if/else for division-by-zero validation. Simulate ownership by moving a String.

---

## Summary

Control flow: if/else, loop, while, for. Ownership: every value has one owner, move transfers ownership. String vs &str. match for pattern matching. Next week: borrowing, references, and slices.
