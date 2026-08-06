# Generics

> **Kategori:** Rust | **Level:** Menengah | **Minggu 8:** Generics

## Tujuan Pembelajaran

- Generic function: fn name<T>(param: T)
- Generic struct: struct Stack<T> { items: Vec<T> }
- Trait bound pada generics: T: PartialOrd + Debug
- Multiple type parameters: struct Pair<T, U>
- Option<T> dan Result<T, E> sebagai generic enum

---

## Program: Fungsi Generik

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

## Konsep Kunci

### Generic Function
`fn first<T>(items: &[T])` — tipe T ditentukan saat dipanggil.

### Generic Struct
`struct Stack<T>` — struct dengan tipe parameter.

### Trait Bound
`T: PartialOrd` — T harus mengimplement PartialOrd. Bisa multiple: `T: A + B`.

### Multiple Type Params
`struct Pair<T, U>` — dua tipe berbeda.

### Option & Result
`Option<T>` dan `Result<T, E>` adalah generic enum standar Rust.

---

## Eksperimen

- Buat generic function max<T: PartialOrd>
- Buat generic struct Queue<T>
- Coba generic dengan where clause
- Buat trait dengan generic method
- Eksperimen dengan PhantomData

---

## Tantangan

Buat generic Repository<T> dengan method: find_all, find_by_id, save, delete. Implement untuk Product dan User.

---

## Ringkasan

Minggu 8 dari 14: **Generics** (Level: Menengah). Reusable code dengan type safety. Minggu depan: **Lifetimes**.
