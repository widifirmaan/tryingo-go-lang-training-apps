# Smart Pointers

> **Kategori:** Rust | **Level:** Advanced | **Minggu 11:** Smart Pointers

## Learning Objectives

- Box<T>: heap allocation for dynamic types and recursive types
- Rc<T>: reference counting for multiple ownership
- RefCell<T>: interior mutability — mutable borrow while immutable
- Arc<T>: atomic reference counting for thread-safe sharing
- Deref and Drop traits for custom smart pointers

---

## Program: Advanced Memory Management

```rust
use std::rc::Rc;
use std::cell::RefCell;
use std::sync::Arc;

// Box<T> — heap allocation
fn box_example() {
    let b = Box::new(42);
    println!("Box: {}", b);

    // Recursive type dengan Box
    #[derive(Debug)]
    enum List {
        Cons(i32, Box<List>),
        Nil,
    }

    let list = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));
    println!("List: {:?}", list);
}

// Rc<T> — reference counting
fn rc_example() {
    let a = Rc::new(42);
    let b = Rc::clone(&a);
    let c = Rc::clone(&a);

    println!("a = {}, b = {}, c = {}", a, b, c);
    println!("Reference count: {}", Rc::strong_count(&a));
}

// RefCell<T> — interior mutability
fn refcell_example() {
    let data = RefCell::new(42);

    // Borrow immutable
    println!("data = {}", data.borrow());

    // Borrow mutable
    *data.borrow_mut() = 100;
    println!("data after mutation = {}", data.borrow());
}

// Arc<T> — atomic reference counting (thread-safe)
fn arc_example() {
    let val = Arc::new(42);
    let val2 = Arc::clone(&val);
    println!("Arc: val={}, val2={}", val, val2);
    println!("Arc count: {}", Arc::strong_count(&val));
}

fn main() {
    println!("=== Box<T> ===");
    box_example();

    println!("
=== Rc<T> ===");
    rc_example();

    println!("
=== RefCell<T> ===");
    refcell_example();

    println!("
=== Arc<T> ===");
    arc_example();

    // Deref trait
    let x = Box::new(5);
    println!("
Deref: *x = {}", *x);

    // Drop trait
    struct CustomSmartPointer {
        data: String,
    }

    impl Drop for CustomSmartPointer {
        fn drop(&mut self) {
            println!("Dropping CustomSmartPointer with data: {}", self.data);
        }
    }

    let c = CustomSmartPointer { data: "my stuff".to_string() };
    let d = CustomSmartPointer { data: "other stuff".to_string() };
    println!("Created pointers");
    drop(c);
    println!("Dropped c");
}
```

---

## Key Concepts

### Box<T>
Heap allocation for dynamic types, recursive types, large data.

### Rc<T>
Reference counting for multiple ownership, single-threaded.

### RefCell<T>
Interior mutability with runtime borrow checking.

### Arc<T>
Atomic reference counting for thread-safe sharing.

### Deref & Drop
Deref for dereference operator, Drop for cleanup.

---

## Experiments

- Create linked list with Box<Cons>
- Experiment with Rc<RefCell<T>>
- Try RefCell borrow while already borrowed — observe panic
- Create custom smart pointer with Drop
- Experiment with Weak<T> to break cycles

---

## Challenge

Build graph structure: Node with Rc<RefCell<Node>> for edges. Methods: add_edge, dfs, bfs.

---

## Summary

Week 11 of 14: **Smart Pointers** (Level: Advanced). Advanced memory management. Next week: **Concurrency**.
