# Concurrency — No-Fight Parallel Rust Cashiers

> **Kategori:** Rust | **Level:** Advanced | **Minggu 12:** Concurrency
> **Prerequisites:** Week 11 — **Smart Pointers**.

## Learning Objectives

- `thread::spawn` new cashier + `move` transfers ownership + `mpsc::channel` belt + `Arc<Mutex<T>>` shared safe (source: doc.rust-lang.org/book/ch16)
- Rule: "fearless concurrency" — fights REJECTED by the compiler!

---

## Why This Matters (Non-IT)

2 cashiers decrementing stock together unlocked = wrong result (race!). In C/Go, mistakes surface at run (sometimes!). In Rust, the compiler forces `Arc<Mutex>` — wrong code doesn't compile. Sleep well.

---

## Program: 2 Safe Rust Cashiers

```rust
use std::thread;
use std::sync::{Arc, Mutex, mpsc};

fn main() {
  // Shared safe (thread-count + lock)
  let stock = Arc::new(Mutex::new(10));

  // Belt for 2 cashiers
  let (send, receive) = mpsc::channel();

  for cashier in 1..=2 {
    let s = Arc::clone(&stock);      // add owner
    let k = send.clone();            // add sender
    thread::spawn(move || {          // move: transfers ownership into thread!
      let mut stock = s.lock().unwrap(); // lock! (1 holder)
      *stock -= 1;
      k.send(format!("Cashier {} sold, {} left", cashier, *stock)).unwrap();
    }); // lock auto-released here
  }
  drop(send);

  for msg in receive {
    println!("{}", msg);
  }
  println!("Final stock: {} (exactly 8!)", stock.lock().unwrap());
}
```

---

## Key Concepts

### `thread::spawn(move || ...)` = New Cashier Bringing Lunch
`move` moves ownership into the thread (without it, dying borrows → rejected!).

### `Arc<Mutex<T>>` = Shared Safe
`Arc` shares ownership across threads, `Mutex` locks (1 holder). `lock()` waits its turn.

### `mpsc::channel` = Message Belt
`send` sends, `for receive` receives until senders run out.

---

## Beginner Friendly Explanation

### Analogy: 2 Cashiers + 1 Safe
- **Mutex = safe lock**: 1 holds, others queue.
- **Arc = counted duplicate keys**: all used up → safe dies safely.

### Step 0 — Prepare Device
- Same as W1.

### How the Computer Reads It
1. `Arc::clone` → count 3 (main + 2 threads).
2. Each thread `lock`s → decrements → releases. Result EXACTLY 8 (never 9!).

### 3 Must-Know Terms
1. **spawn/move**: new-cashier/bring-lunch
2. **Arc/Mutex**: share/lock
3. **mpsc**: message-belt

---

## Experiments

- **Green:** Without `Mutex` (using `Rc<RefCell>`)? → `not Send` error! (Compiler guards! Switch to Arc.)
- **Yellow:** Forget `move` → borrow error? Add it.
- **Red:** Forget `drop(send)` → `for receive` waits forever? (Sender still alive!)

---

## Challenge

**Parallel Kitchen:** 3 cooking threads + `Arc<Mutex<Stock>>` + `channel` reports + exact result (no more!).

---

## Mini Glossary

- **spawn/Mutex/Arc**: cashier/lock/share
- **mpsc/move**: belt/carry

---

## Summary

Week 12 of 14: **No-Fight Parallel** (Level: Advanced). Compiler guards. Next: **Macros**.
