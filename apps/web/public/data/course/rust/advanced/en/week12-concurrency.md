# Concurrency

> **Kategori:** Rust | **Level:** Advanced | **Minggu 12:** Concurrency

## Learning Objectives

- thread::spawn to create new threads
- move closures to transfer ownership to threads
- mpsc::channels for inter-thread communication
- Arc<Mutex<T>> for safe shared mutable state
- join() to wait for threads to finish

---

## Program: Threads & Channels

```rust
use std::thread;
use std::sync::mpsc;
use std::sync::{Arc, Mutex};
use std::time::Duration;

fn main() {
    // Thread sederhana
    let handle = thread::spawn(|| {
        for i in 1..=5 {
            println!("Thread: {}", i);
        }
    });

    for i in 1..=3 {
        println!("Main: {}", i);
    }

    handle.join().unwrap();

    // Move closure
    let data = vec![1, 2, 3];
    let handle = thread::spawn(move || {
        println!("Moved data: {:?}", data);
    });
    handle.join().unwrap();

    // Channel (mpsc)
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let messages = vec!["halo", "dari", "thread"];
        for msg in messages {
            tx.send(msg.to_string()).unwrap();
        }
    });

    for _ in 0..3 {
        let received = rx.recv().unwrap();
        println!("Received: {}", received);
    }

    // Arc + Mutex untuk shared state
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..5 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Counter: {}", *counter.lock().unwrap());

    // Multiple producers
    let (tx, rx) = mpsc::channel();
    let tx2 = tx.clone();

    thread::spawn(move || {
        tx.send("from thread 1").unwrap();
    });

    thread::spawn(move || {
        tx2.send("from thread 2").unwrap();
    });

    for _ in 0..2 {
        println!("Multi-producer: {}", rx.recv().unwrap());
    }
}
```

---

## Key Concepts

### Threads
`thread::spawn()` creates new threads. `join()` waits for completion.

### Move Closures
Transfer ownership to threads with `move`.

### Channels
`mpsc::channel()` for message passing between threads.

### Arc<Mutex<T>>
Shared ownership with Arc, mutual exclusion with Mutex.

### Thread Safety
Rust guarantees thread safety at compile time via Send and Sync traits.

---

## Experiments

- Create simple thread pool
- Experiment with channel timeouts
- Try deadlock with nested Mutex locks
- Create producer-consumer pattern
- Experiment with scoped threads

---

## Challenge

Build a concurrent web crawler: fetch multiple URLs in parallel with threads + channels. Limit concurrency.

---

## Summary

Week 12 of 14: **Concurrency** (Level: Advanced). Rust's fearless concurrency. Next week: **Macros**.
