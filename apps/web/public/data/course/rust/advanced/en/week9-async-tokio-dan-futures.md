# Asynchronous Rust: The Tokio Runtime, async/await & Non-Blocking TCP

> **Kategori:** Rust | **Level:** Async Tokio, WAL Durability & KV Engine Capstone | **Minggu 9:** Asynchronous Rust: The Tokio Runtime, async/await & Non-Blocking TCP
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Rust's asynchronous philosophy: Zero-Cost Futures that remain completely passive until explicitly polled
- Contrast thread-per-connection models against asynchronous task topologies multiplexing millions of clients
- Deploy the Tokio runtime: a multi-threaded work-stealing scheduler powering low-latency network I/O
- Understand `.await` suspension mechanics yielding CPU execution cooperatively without halting native threads
- Appreciate Rust's cancellation safety: dropping a Future tears down associated async tasks immediately

---

## Program: High-Throughput Asynchronous TCP Key-Value Server with Tokio

```rust
// Catatan: Di proyek nyata, tambahkan tokio = { version = "1", features = ["full"] } di Cargo.toml

// Simulasi Arsitektur Asinkron Tokio Tanpa Ketergantungan Eksternal di Playground
use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};
use std::time::Duration;

// 1. Anatomi Inti Future di Rust: Trait yang Di-poll oleh Async Runtime
struct TimerAsync {
    waktu_selesai: std::time::Instant,
}

impl Future for TimerAsync {
    type Output = String;

    fn poll(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<Self::Output> {
        if std::time::Instant::now() >= self.waktu_selesai {
            Poll::Ready(String::from("Operasi I/O TCP Asinkron Selesai."))
        } else {
            Poll::Pending // Runtime akan menidurkan task ini dan memproses koneksi lain!
        }
    }
}

// 2. Fungsi async fn (Menghasilkan Future di Balik Layar)
async fn tangani_koneksi_client(client_id: u32) -> Result<String, String> {
    println!("[Tokio Worker] Menerima koneksi TCP dari Klien #{}...", client_id);
    
    // Simulasi non-blocking I/O
    let timer = TimerAsync {
        waktu_selesai: std::time::Instant::now() + Duration::from_millis(50),
    };

    // Kata kunci .await: Menyerahkan kendali CPU ke task lain jika I/O belum selesai!
    let hasil = timer.await;
    Ok(format!("Klien #{} diproses: {}", client_id, hasil))
}

fn main() {
    println!("=== Asynchronous Systems: Tokio Runtime & Futures ===");
    println!("Rust async tidak memerlukan OS thread per koneksi: jutaan koneksi berjalan di sedikit worker!");

    // Eksekusi blocking untuk mensimulasikan runner
    let mut timer = TimerAsync {
        waktu_selesai: std::time::Instant::now() + Duration::from_millis(10),
    };
    
    // Demonstrasi poll manual
    let waker = futures_lite_waker();
    let mut cx = Context::from_waker(&waker);
    let mut pin_timer = Pin::new(&mut timer);
    
    match pin_timer.as_mut().poll(&mut cx) {
        Poll::Ready(val) => println!("Hasil Poll: {}", val),
        Poll::Pending => println!("Status: Pending (I/O non-blocking sedang berjalan)"),
    }
}

// Helper stub waker sederhana
fn futures_lite_waker() -> std::task::Waker {
    use std::task::{RawWaker, RawWakerVTable};
    unsafe fn clone(_: *const ()) -> RawWaker { RawWaker::new(std::ptr::null(), &VTABLE) }
    unsafe fn wake(_: *const ()) {}
    unsafe fn wake_by_ref(_: *const ()) {}
    unsafe fn drop(_: *const ()) {}
    static VTABLE: RawWakerVTable = RawWakerVTable::new(clone, wake, wake_by_ref, drop);
    unsafe { std::task::Waker::from_raw(RawWaker::new(std::ptr::null(), &VTABLE)) }
}
```

---

## Key Concepts

### Why Async Rust Differs from JavaScript and Go
1. **JavaScript**: Promises are *eager* (executing immediately upon instantiation inside the V8 engine loop).
2. **Go**: Concurrency is managed via the language runtime, transparently multiplexing blocking code across M:N scheduler threads.
3. **In Rust**: **Futures are 100% LAZY (Pull-Based)!**
   Invoking an `async fn` constructs a passive state machine. It executes zero instructions until polled by `.await` or spawned onto an executor (Tokio). If an async block is dropped before completion, execution ceases instantly!

### The Role of Tokio
Rust deliberately **omitted an async runtime from its standard library**, preserving bare-metal deployment on microcontrollers without operating systems.
For high-scale cloud servers, the industry standard is **Tokio**:
- Work-Stealing Multi-Threaded Task Schedulers.
- Asynchronous Non-Blocking Networking (`tokio::net::TcpListener`).
- High-throughput asynchronous timers sustaining millions of concurrent TCP streams.

---

---

## Beginner Friendly Explanation

### Analogy: Drive-Thru Buzzers vs Frozen Cashiers
1. **Thread-per-Connection (Blocking)** is a cashier refusing to take the next customer order until kitchen chefs hand-toss, bake, and box a pizza: the line stalls for 20 minutes (*thread blocks on I/O*).
2. **Async Tokio (`.await`)** is an automated buzzer system: the clerk rings your order, hands you an electronic pager (*Future*), and serves the next 50 customers. When your meal clears the oven (*Poll::Ready*), the buzzer pulses, and you retrieve your tray without halting the counter line.

## Experiments

- Explore the #[tokio::main] attribute macro bootstrapping a multi-threaded async runtime under the hood.
- Observe that invoking async functions without .await generates: warning: unused implementor of `Future`.
- Evaluate tokio::spawn launching 100,000 concurrent async tasks auditing low RAM consumption.
- Compare tokio::select! multiplexing with Go select semantics.

---

## Challenge

Author a custom `Future` state machine incrementally accumulating 4 binary data packets until emitting Poll::Ready upon completion.

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

---

## Common Pitfalls & Debugging Tips

### 1. Multiple Mutable Borrows
- **Symptom / Issue:** Rejected by compiler: `cannot borrow as mutable more than once at a time`.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Narrow borrow scopes or adopt interior mutability constructs like `RefCell` or `Mutex`.

### 2. Unchecked `.unwrap()` in Production
- **Symptom / Issue:** Panics and terminates execution when encountering unexpected `Err` or `None` values.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use idiomatic `?` error propagation or pattern match with `match` / `if let`.

### 3. Over-Cloning to Escape Lifetime Checks
- **Symptom / Issue:** Degrades throughput by allocating redundant copies on the heap.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Prefer borrowed references like `&str` or `&[T]` instead of deep cloning full data structures.

---

## Summary

You have mastered async Rust, lazy Futures, polling semantics, and Tokio. Next week, we examine Write-Ahead Log (WAL) file durability and fsync.
