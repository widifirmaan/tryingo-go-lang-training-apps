# Smart Pointers: Box, Rc, RefCell

> Category: Rust, Programming Language | Level: Advanced | Week 11

## Learning Objectives

- Use Box<T> for heap allocation
- Create recursive types with Box
- Apply Rc<T> for reference counting
- Use RefCell<T> for interior mutability
- Understand the Drop trait for cleanup

---

## Program: Manajemen Memori

```rust
use std::rc::Rc;
use std::cell::RefCell;

struct Node {
    name: String,
    children: Vec<Rc<RefCell<Node>>>,
}

impl Node {
    fn new(name: &str) -> Rc<RefCell<Node>> {
        Rc::new(RefCell::new(Node {
            name: String::from(name),
            children: vec![],
        }))
    }

    fn add_child(parent: &Rc<RefCell<Node>>, child: Rc<RefCell<Node>>) {
        parent.borrow_mut().children.push(child);
    }
}

fn main() {
    let root = Node::new("root");
    let a = Node::new("A");
    let b = Node::new("B");

    Node::add_child(&root, a);
    Node::add_child(&root, b);

    println!("Root children count: {}", root.borrow().children.len());
    println!("Reference count root: {}", Rc::strong_count(&root));

    let data = RefCell::new(42);
    *data.borrow_mut() += 10;
    println!("RefCell value: {}", data.borrow());
}

impl Drop for Node {
    fn drop(&mut self) {
        println!("Dropping node: {}", self.name);
    }
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Box<T>

`Box::new()` — heap allocation. Essential for recursive types and large data. The `Deref` trait allows use like regular references.

### Rc<T>

`Rc` — Reference Counting for multiple ownership in single-threaded contexts. `clone()` increments the reference counter. `strong_count()` to check reference count.

### RefCell<T>

Interior mutability: mutation through immutable references. `borrow()` and `borrow_mut()` with runtime checks. Panics if borrowing rules are violated at runtime.

### Drop

`Drop` trait — cleanup when a value goes out of scope. `drop()` is called automatically. Useful for resource management.

---

## Experiments

Try modifying the code:

1. **Add node** — add a third child to the root tree
2. **RefCell vs Cell** — change `RefCell` to `Cell` and see the API difference
3. **Without Rc** — try without Rc (will fail due to multiple ownership)

---

## Challenge

Build a simple binary tree: `Tree<T>` struct with `insert` and `contains` methods. Use Box for child nodes. Implement the Drop trait that prints a message when a node is dropped.

---

## Summary

Box<T> for heap allocation and recursive types. Rc<T> for reference counting (multiple ownership). RefCell<T> for interior mutability with runtime checks. Drop trait for automatic cleanup. Next week: concurrency (thread, Arc, Mutex).
