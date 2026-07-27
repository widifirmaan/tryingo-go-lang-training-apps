# Structs, Methods & Associated Functions

> Category: Rust, Programming Language | Level: Beginner | Week 4

## Learning Objectives

- Define structs with named fields
- Implement methods in impl blocks
- Use &self and &mut self
- Create associated functions (constructor pattern)
- Learn about tuple structs

---

## Program: Data & Perilaku

```rust
struct Book {
    title: String,
    author: String,
    year: u32,
}

impl Book {
    fn new(title: &str, author: &str, year: u32) -> Book {
        Book {
            title: String::from(title),
            author: String::from(author),
            year,
        }
    }

    fn info(&self) -> String {
        format!("{} by {} ({})", self.title, self.author, self.year)
    }

    fn revise(&mut self, new_year: u32) {
        self.year = new_year;
    }
}

struct Color(u8, u8, u8);

fn main() {
    let mut book = Book::new("Rust Programming", "Anna", 2024);
    println!("{}", book.info());

    book.revise(2025);
    println!("After revision: {}", book.info());

    let black = Color(0, 0, 0);
    println!("Black: RGB({}, {}, {})", black.0, black.1, black.2);
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Structs

`struct Book { title: String, author: String }` — groups related fields. `impl` for methods. `&self` for immutable methods, `&mut self` for mutable.

### Associated Functions

Function without `self` — constructor pattern: `Book::new(...)`. Called with `::` syntax.

### Tuple Structs

`struct Color(u8, u8, u8)` — struct with unnamed fields. Accessed via `color.0`, `color.1`, etc.

---

## Experiments

Try modifying the code:

1. **Add field** — add `pages: u32` to the Book struct
2. **New method** — create `fn age(&self, current_year: u32) -> u32`
3. **Tuple struct** — create `Coordinate(f64, f64)` struct with a distance method

---

## Challenge

Create a `Product` struct (name, price, stock) with methods `total_price(quantity: u32) -> f64` and `discount(percent: f64) -> f64`. Use an associated function `new` as constructor. Add a tuple struct `Dimension(f64, f64, f64)`.

---

## Summary

Structs group related data with named fields. impl blocks for methods (with &self or &mut self). Associated functions as constructors. Tuple structs for simple wrappers. Next week: enums and pattern matching.
