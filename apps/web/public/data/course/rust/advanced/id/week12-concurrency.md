# Concurrency

> **Kategori:** Rust | **Level:** Lanjutan | **Minggu 12:** Concurrency

## Tujuan Pembelajaran

- thread::spawn untuk membuat thread baru
- move closure untuk transfer ownership ke thread
- mpsc::channel untuk komunikasi antar thread
- Arc<Mutex<T>> untuk shared mutable state yang aman
- join() untuk menunggu thread selesai

---

## Program: Thread & Channel

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

## Konsep Kunci

### Thread
`thread::spawn(|| { ... })` — buat thread baru. `join()` untuk tunggu.

### Move Closure
`move ||` — transfer ownership variabel ke closure/thread.

### Channel
`mpsc::channel()` — multiple producer, single consumer. `send()` dan `recv()`.

### Arc<Mutex<T>>
`Arc` untuk shared ownership, `Mutex` untuk mutual exclusion. `lock()` untuk akses.

### Thread Safety
Rust menjamin thread safety di compile time dengan Send dan Sync trait.

---

## Eksperimen

- Buat thread pool sederhana
- Eksperimen dengan channel timeout
- Coba deadlock dengan nested Mutex lock
- Buat producer-consumer pattern
- Eksperimen dengan scoped threads

---

## Tantangan

Buat web crawler concurrent: fetch multiple URLs secara paralel dengan thread + channel. Batasi concurrency.

---

## Ringkasan

Minggu 12 dari 14: **Concurrency** (Level: Lanjutan). Fearless concurrency ala Rust. Minggu depan: **Macros**.
