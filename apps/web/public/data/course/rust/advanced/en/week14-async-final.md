# Async/Await & Final Project

> Category: Rust, Programming Language | Level: Advanced | Week 14

## Learning Objectives

- Define async functions and use .await
- Use the tokio runtime with #[tokio::main]
- Run concurrent tasks with tokio::spawn
- Use tokio::time::sleep for async delay
- Build a concurrent task runner as final project

---

## Program: Async Final

```rust
use tokio::time::{sleep, Duration};

struct Task {
    id: u32,
    name: String,
}

async fn run_task(task: Task) -> String {
    println!("Starting: {} (ID {})", task.name, task.id);
    sleep(Duration::from_millis(50)).await;
    format!("Completed: {} (ID {})", task.name, task.id)
}

#[tokio::main]
async fn main() {
    println!("=== Concurrent Task Runner ===");

    let t1 = tokio::spawn(run_task(Task {
        id: 1,
        name: String::from("Download data"),
    }));
    let t2 = tokio::spawn(run_task(Task {
        id: 2,
        name: String::from("Process data"),
    }));
    let t3 = tokio::spawn(run_task(Task {
        id: 3,
        name: String::from("Save results"),
    }));

    println!("{}", t1.await.unwrap());
    println!("{}", t2.await.unwrap());
    println!("{}", t3.await.unwrap());

    println!("=== All tasks completed! ===");
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Async/Await

`async fn` returns a Future. `.await` waits for the result without blocking the thread. `tokio::spawn` runs tasks concurrently.

### Tokio Runtime

`#[tokio::main]` — macro that sets up the async runtime. `tokio::time::sleep` — async delay that does not block the thread.

### Concurrent Task Runner

`tokio::spawn` — multiple tasks run concurrently. `await` collects results. The basic pattern for production async applications.

---

## Experiments

Try modifying the code:

1. **Add tasks** — add a 4th and 5th task
2. **Change delay** — change Duration::from_millis(50) to 200ms
3. **Return value** — make tasks return numbers, collect all results

---

## Challenge

Build a concurrent task runner with tokio: 5 async tasks running concurrently, each with different delays (50ms, 100ms, 150ms, 200ms, 250ms). Collect results and print completion order.

---

## Summary

Async/await for I/O-bound concurrent programming. Tokio runtime with #[tokio::main]. tokio::spawn for concurrent tasks. Final project: concurrent task runner. Congratulations on completing the Rust curriculum!
