# Smart Pointers

> **Kategori:** Rust | **Level:** Lanjutan | **Minggu 11:** Smart Pointers

## Tujuan Pembelajaran

- Box<T>: heap allocation untuk tipe dinamis dan recursive type
- Rc<T>: reference counting untuk multiple ownership
- RefCell<T>: interior mutability — mutable borrow saat immutable
- Arc<T>: atomic reference counting untuk thread-safe sharing
- Deref dan Drop trait untuk custom smart pointer

---

## Program: Manajemen Memori Lanjutan

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

## Konsep Kunci

### Box<T>
Heap allocation. Dipakai untuk: tipe dinamis (trait object), recursive type, large data.

### Rc<T>
Reference counting. Multiple owner, single-thread. `Rc::clone()` increment count.

### RefCell<T>
Interior mutability. Borrow rules dijalankan saat runtime, bukan compile time.

### Arc<T>
Atomic Rc — thread-safe. Dipakai bersama Mutex untuk shared mutable state.

### Deref & Drop
`Deref` untuk `*x`. `Drop` untuk cleanup saat keluar scope.

---

## Eksperimen

- Buat linked list dengan Box<Cons>
- Eksperimen dengan Rc<RefCell<T>>
- Coba RefCell borrow saat sudah borrowed — lihat panic
- Buat custom smart pointer dengan Drop
- Eksperimen dengan Weak<T> untuk break cycle

---

## Tantangan

Buat graph structure: Node dengan Rc<RefCell<Node>> untuk edges. Method: add_edge, dfs, bfs.

---

## Ringkasan

Minggu 11 dari 14: **Smart Pointers** (Level: Lanjutan). Manajemen memori lanjutan. Minggu depan: **Concurrency**.
