# Concurrency: Thread, Arc, Mutex

> Category: Rust, Programming Language | Level: Advanced | Week 12

## Learning Objectives

- Create threads with thread::spawn and JoinHandle
- Use move closures with threads
- Apply Arc<T> for atomic reference counting
- Use Mutex<T> for mutual exclusion
- Send messages with mpsc::channel

---

## Program: Parallel

```rust
use std::sync::{Arc, Mutex, mpsc};
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..=3 {
            println!("Child thread: {}", i);
            thread::sleep(Duration::from_millis(10));
        }
    });
    handle.join().unwrap();

    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let c = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            let mut num = c.lock().unwrap();
            *num += 1;
        }));
    }

    for h in handles {
        h.join().unwrap();
    }
    println!("Final counter: {}", *counter.lock().unwrap());

    let (tx, rx) = mpsc::channel();
    thread::spawn(move || {
        let msg = String::from("Hello from thread!");
        tx.send(msg).unwrap();
    });

    let received = rx.recv().unwrap();
    println!("Message received: {}", received);
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Threads

`thread::spawn(|| { ... })` — creates a new OS thread. `JoinHandle::join()` waits for thread completion. `move` transfers ownership to the thread closure.

### Arc<T>

`Arc` — Atomic Reference Counting. Thread-safe version of Rc. `Arc::clone()` for sharing data across threads.

### Mutex<T>

`lock()` — mutual exclusion. Only one thread can access data at a time. `unwrap()` because locks can poison.

### Channels

`mpsc::channel()` — Multiple Producer, Single Consumer. `send()` sends, `recv()` receives. Cloning tx enables multiple producers.

---

## Experiments

Try modifying the code:

1. **Change thread count** — from 10 to 100 threads and see the counter result
2. **Remove Arc** — try without Arc (compilation will fail due to Send trait)
3. **Multi-producer channel** — clone tx and create 3 producers

---

## Challenge

Build a worker pool: 5 threads reading from a job channel (numbers 1-20), calculate factorial, send results to a results channel. Use Arc<Mutex<>> for a shared task counter.

---

## Summary

Threads with thread::spawn and JoinHandle. Arc<T> for thread-safe data sharing. Mutex<T> for exclusive access. mpsc::channel for inter-thread communication. Next week: unsafe Rust and macros.
