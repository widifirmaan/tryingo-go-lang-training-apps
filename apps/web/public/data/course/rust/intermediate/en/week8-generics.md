# Generics

> **Kategori:** Rust | **Level:** Intermediate | **Minggu 8:** Generics

## Learning Objectives

- Generic functions: fn name<T>(param: T)
- Generic structs: struct Stack<T> { items: Vec<T> }
- Trait bounds on generics: T: PartialOrd + Debug
- Multiple type parameters: struct Pair<T, U>
- Option<T> and Result<T, E> as generic enums

---

## Program: Generic Functions

```rust
use std::fmt::Debug;

// Generic function
fn first<T>(items: &[T]) -> Option<&T> {
    items.first()
}

// Generic struct
struct Stack<T> {
    items: Vec<T>,
}

impl<T> Stack<T> {
    fn new() -> Self {
        Stack { items: Vec::new() }
    }

    fn push(&mut self, item: T) {
        self.items.push(item);
    }

    fn pop(&mut self) -> Option<T> {
        self.items.pop()
    }

    fn peek(&self) -> Option<&T> {
        self.items.last()
    }

    fn is_empty(&self) -> bool {
        self.items.is_empty()
    }
}

// Generic dengan trait bound
fn largest<T: PartialOrd + Debug>(items: &[T]) -> Option<&T> {
    items.iter().reduce(|a, b| if a > b { a } else { b })
}

// Generic enum
enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}

// Multiple type parameters
struct Pair<T, U> {
    first: T,
    second: U,
}

impl<T: Debug, U: Debug> Pair<T, U> {
    fn display(&self) {
        println!("{:?} {:?}", self.first, self.second);
    }
}

fn main() {
    // Generic function
    let numbers = vec![10, 20, 30];
    println!("First int: {:?}", first(&numbers));

    let words = vec!["a", "b", "c"];
    println!("First str: {:?}", first(&words));

    // Generic struct
    let mut stack: Stack<String> = Stack::new();
    stack.push("Rust".to_string());
    stack.push("Go".to_string());
    stack.push("Python".to_string());

    println!("Stack peek: {:?}", stack.peek());
    while let Some(item) = stack.pop() {
        println!("Pop: {}", item);
    }

    // largest
    let nums = vec![3, 1, 4, 1, 5, 9, 2, 6];
    println!("Largest: {:?}", largest(&nums));

    let chars = vec!['a', 'z', 'm'];
    println!("Largest char: {:?}", largest(&chars));

    // Pair
    let pair = Pair { first: 42, second: "hello" };
    pair.display();
}
```

---

## Key Concepts

### Generic Functions
Type T determined at call site.

### Generic Structs
Structs with type parameters.

### Trait Bounds
Constrain generics with required traits.

### Multiple Type Parameters
Different types in one struct.

### Option & Result
Standard library generic enums.

---

## Experiments

- Create generic function max<T: PartialOrd>
- Create generic struct Queue<T>
- Try generics with where clauses
- Create trait with generic methods
- Experiment with PhantomData

---

## Challenge

Build generic Repository<T> with methods: find_all, find_by_id, save, delete. Implement for Product and User.

---

## Summary

Week 8 of 14: **Generics** (Level: Intermediate). Reusable code with type safety. Next week: **Lifetimes**.
