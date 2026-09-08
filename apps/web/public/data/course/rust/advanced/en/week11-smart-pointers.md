# Smart Pointers — Smart Rust Boxes

> **Kategori:** Rust | **Level:** Advanced | **Minggu 11:** Smart Pointers

## Learning Objectives

- `Box<T>` heap box (for recursion), `Rc<T>` owner counting, `RefCell<T>` mutate-through-borrow, `Arc<T>` thread version (source: doc.rust-lang.org/book/ch15)

---

## Why This Matters (Non-IT)

`enum List { Item(i32, List) }` without `Box` → `infinite size` error (endless size!). A shopping list shared by 2 cashiers needs `Rc`. Mutating through `&` needs `RefCell`.

---

## Program: Smart Shop Boxes

```rust
use std::rc::Rc;
use std::cell::RefCell;

// 1. Box: definite size (recursion needs it!)
#[derive(Debug)]
enum List {
  Empty,
  Item(i32, Box<List>), // Box = pointer size (8 bytes, definite!)
}

fn main() {
let d = List::Item(62000, Box::new(List::Empty));
println!("{:?}", d);

// 2. Rc: 2 owners (counting!)
let stock = Rc::new(RefCell::new(10));
let cashier1 = Rc::clone(&stock);
let cashier2 = Rc::clone(&stock);
cashier1.borrow_mut(); // mutate through & borrow (RefCell!)
*cashier1.borrow_mut() -= 1;
println!("Stock: {}, owners: {}", cashier2.borrow(), Rc::strong_count(&stock)); // 9, 3
}
```

---

## Key Concepts

### `Box<T>` = Definite Heap Box
Fixed pointer size → recursion works. `Deref` automatic (rarely write `*b`).

### `Rc<T>` + `RefCell<T>` = Count + Mutate-Through-Borrow
`Rc::clone` adds owners (cheap, not data copy!). `borrow_mut` mutates despite `&`.

### `Arc<T>` = Thread-Safe Rc
`Rc` for 1 thread, `Arc` (atomic) for many threads (W12!).

---

## Beginner Friendly Explanation

### Analogy: Shared Boxes & Keys
- **Box = definite cardboard**: known size, stackable.
- **Rc = duplicate keys + count**: 3 hold, all returned before the lock dies.
- **RefCell = change contents through glass**: read-borrow but writable (runtime rules!).

### Step 0 — Prepare Device
- Same as W1.

### How the Computer Reads It
1. `Rc::clone(&stock)` → count 2 → 3 (1 data!).
2. Count 0 → data dropped automatically.

### 3 Must-Know Terms
1. **Box/Rc/RefCell**: box/count/mutate-borrow
2. **Arc**: thread-count

---

## Experiments

- **Green:** `Rc::strong_count` after 2 clones → 3?
- **Yellow:** 2 simultaneous `borrow_mut` → runtime panic? (RefCell rules!)
- **Red:** Recursive enum without `Box` → `infinite size` error? Add Box.

---

## Challenge

**Shared Warehouse:** `Rc<RefCell<Stock>>` + 2 cashiers decrementing together + `strong_count` + print remainder.

---

## Mini Glossary

- **Box/Rc/RefCell/Arc**: box/count/mutate/cross-thread

---

## Summary

Week 11 of 14: **Smart Boxes** (Level: Advanced). Next: **Concurrency**.
