# Async/Await — Delivery Orders Without C# Freeze

> **Kategori:** C# | **Level:** Intermediate | **Minggu 6:** Async/Await
> **Prerequisites:** Week 5 — **LINQ**.

## Learning Objectives

- `async Task<T>` promises + `await` waits without freezing UI/threads (source: Microsoft Learn asynchronous programming)
- `Task.WhenAll` joint orders, `try/catch` for failed `await`

---

## Why This Matters (Non-IT)

Fetching 3 supplier prices sequentially = 3 waits (2.4 seconds). With `await` + `WhenAll` = 0.8 seconds. Without `async`, UI freezes (shop "hangs"). `async void` (except events) = errors vanish silently!

---

## Program: C# Price Rides

```csharp
async Task<Product> Fetch(string name) {
  await Task.Delay(800); // simulate 0.8s ride
  return new Product { Name = name, Price = 62000 };
}

async Task Buy() {
  Console.WriteLine("Ordering Rice...");
  var rice = await Fetch("Rice"); // wait without freezing
  Console.WriteLine("Got: " + rice.Name);

  // 3 together (not sequential!)
  var tasks = new[] { Fetch("Rice"), Fetch("Spinach"), Fetch("Eggs") };
  var all = await Task.WhenAll(tasks); // 0.8s for 3!
  Console.WriteLine($"Got {all.Length} at once");
}

await Buy();
Console.WriteLine("→ This line runs first (doesn't wait)");
```

---

## Key Concepts

### `async` + `await` = Promise + Wait
`async Task<T>` returns promises, `await` waits without blocking threads.

### `Task.WhenAll` = Joint Order
`await Task.WhenAll(t1, t2)` → 0.8s for 2 (not 1.6).

### `async Task` Not `async void`!
`async void` only for event handlers — errors inside vanish!

---

## Beginner Friendly Explanation

### Analogy: Food Rides
- **Sync = wait at shop** until the ride arrives (freeze).
- **await = go home first**, the ride calls on arrival.

### Step 0 — Prepare Device
- Same as C# W1: `dotnet run` (.NET 8+, top-level statements allow direct `await`).

### How the Computer Reads It
1. `await Fetch()` → returns thread → continues lines below.
2. Ride done → resumes function after `await`.

### 3 Must-Know Terms
1. **async/await/Task**: promise/wait/job
2. **WhenAll**: together

---

## Experiments

- **Green:** 3 sequential `await`s vs `WhenAll` → time differs? (Measure with `DateTime.Now`!)
- **Yellow:** Forgotten `await` → raw `Task` (not run)?
- **Red:** `async void` + `throw` inside → crash without message? Switch to `async Task`.

---

## Challenge

**Async Shop:** `Fetch(name)` 500ms + `Buy()` `WhenAll` 3 + total + `try/catch` when `name` empty.

---

## Mini Glossary

- **async/await/WhenAll**: promise/wait/together

---

## Summary

Week 6 of 12: **Orders Without Freeze** (Level: Intermediate). 3x fast. Next: **Generics** — multipurpose racks.
