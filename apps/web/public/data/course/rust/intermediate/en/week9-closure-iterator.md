# Closures & Iterators

> Category: Rust, Programming Language | Level: Intermediate | Week 9

## Learning Objectives

- Create closures with |args| body syntax
- Understand environment capture by closures
- Use Iterator trait: next, map, filter
- Apply collect and fold for aggregation
- Chain iterator adapters together

---

## Program: Gaya Fungsional

```rust
fn main() {
    let add = |a: i32, b: i32| a + b;
    println!("5 + 3 = {}", add(5, 3));

    let factor = 3;
    let multiply = |n: i32| n * factor;
    println!("4 * 3 = {}", multiply(4));

    let numbers = vec![1, 2, 3, 4, 5, 6];
    let evens: Vec<i32> = numbers.iter()
        .filter(|&&x| x % 2 == 0)
        .copied()
        .collect();
    println!("Evens: {:?}", evens);

    let squares: Vec<i32> = numbers.iter()
        .map(|&x| x * x)
        .collect();
    println!("Squares: {:?}", squares);

    let sum: i32 = numbers.iter()
        .fold(0, |acc, &x| acc + x);
    println!("Sum: {}", sum);

    let mut counter = 0;
    let mut increment = || { counter += 1; counter };
    println!("Counter: {}", increment());
    println!("Counter: {}", increment());
    println!("Counter: {}", increment());
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Closures

`|a, b| a + b` — anonymous functions that capture their environment. `|n| n * factor` captures `factor` from outer scope. Three types: `Fn`, `FnMut`, `FnOnce`.

### Iterators

`.iter()` creates an iterator. `filter()` selects, `map()` transforms, `fold()` accumulates, `collect()` gathers. All lazy — executed when `collect` is called.

### For Loop

`for x in vec.iter()` — desugaring of `into_iter().next()`. Every collection can be looped over.

---

## Experiments

Try modifying the code:

1. **Different closure** — create a closure that multiplies three numbers
2. **Chain iterators** — combine filter, map, and fold in one chain
3. **Prime filter** — change even filter to prime number filter

---

## Challenge

Create a `filter_numbers` function that takes Vec<i32> and a predicate closure, returns filtered Vec<i32>. Create `odd` and `even` closures. Use iterator chains for data transformation.

---

## Summary

Closures = anonymous functions that capture their environment. Iterator trait with map, filter, fold, collect — idiomatic functional programming. Lazy evaluation: chains don't execute until collect is called. Next week: CLI project.
