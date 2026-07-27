# Generics & Traits

> Category: Rust, Programming Language | Level: Intermediate | Week 8

## Learning Objectives

- Create generic functions with type parameter <T>
- Define generic structs
- Create traits with methods
- Implement traits for custom types
- Use trait bounds and derive attributes

---

## Program: Kode Generik

```rust
use std::fmt::Debug;

#[derive(Debug, Clone, PartialEq)]
struct Point<T> {
    x: T,
    y: T,
}

impl<T: Debug> Point<T> {
    fn new(x: T, y: T) -> Point<T> {
        Point { x, y }
    }
}

trait Area {
    fn area(&self) -> f64;
}

struct Circle { r: f64 }

impl Area for Circle {
    fn area(&self) -> f64 { 3.14159 * self.r * self.r }
}

struct Square { s: f64 }

impl Area for Square {
    fn area(&self) -> f64 { self.s * self.s }
}

fn print_area<T: Area>(shape: &T) {
    println!("Area: {}", shape.area());
}

fn main() {
    let p = Point::new(3, 4);
    println!("Point: {:?}", p);
    println!("Clone: {:?}", p.clone());
    println!("Equal: {}", p == Point::new(3, 4));

    let circle = Circle { r: 5.0 };
    let square = Square { s: 4.0 };
    print_area(&circle);
    print_area(&square);
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Generics

`Point<T>` — generic struct with one type parameter. `fn print_area<T: Area>(shape: &T)` — generic function with trait bound.

### Traits

`trait Area { fn area(&self) -> f64; }` — collection of methods that multiple types can implement. Similar to interfaces in other languages.

### Derive

`#[derive(Debug, Clone, PartialEq)]` — automatic implementation of standard traits. Debug for formatting, Clone for duplication, PartialEq for comparison.

---

## Experiments

Try modifying the code:

1. **New type** — create `Triangle { b: f64, h: f64 }` implementing Area
2. **More derive** — add `Default` and `Copy` to the derive list
3. **Generic function** — create `largest<T: PartialOrd>(a: T, b: T) -> T`

---

## Challenge

Create a `Description` trait with method `to_string() -> String`. Implement it for `Book` and `Magazine` structs. Create a generic function `print_info<T: Description>(item: &T)`. Use #[derive(Debug)] for debugging.

---

## Summary

Generics enable flexible code with type parameter <T>. Traits = interfaces that multiple types can implement. Trait bounds constrain generic parameters. Derive attributes for automatic standard trait implementations. Next week: closures and iterators.
