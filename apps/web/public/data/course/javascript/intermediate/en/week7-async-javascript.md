# Async JavaScript

> **Kategori:** JavaScript | **Level:** Intermediate | **Minggu 7:** Async JavaScript

## Learning Objectives

- Callbacks vs Promises vs Async/Await
- Promise states: pending, fulfilled, rejected
- Promise.all, Promise.race, Promise.allSettled
- Error handling: try/catch with async/await
- Parallel vs sequential execution

---

## Program: Promises & Async/Await

```javascript
// Simulasi Async Operations
function fetchData(url) {
    return new Promise((resolve, reject) => {
        console.log("Fetching:", url);
        setTimeout(() => {
            if (url.includes("error")) {
                reject(new Error("Network error"));
            } else {
                resolve({ data: "Response from " + url, status: 200 });
            }
        }, 100);
    });
}

// Promise Chain
console.log("=== Promise Chain ===")
fetchData("/api/users")
    .then(res => {
        console.log("Step 1:", res.data);
        return fetchData("/api/posts");
    })
    .then(res => {
        console.log("Step 2:", res.data);
        return fetchData("/api/comments");
    })
    .then(res => {
        console.log("Step 3:", res.data);
    })
    .catch(err => {
        console.error("Error:", err.message);
    });

// Async/Await
async function loadUserData() {
    try {
        console.log("\n=== Async/Await ===")
        const users = await fetchData("/api/users");
        console.log("Users:", users.data);

        const posts = await fetchData("/api/posts");
        console.log("Posts:", posts.data);

        return { users, posts };
    } catch (error) {
        console.error("Failed:", error.message);
    }
}

// Parallel Execution
async function loadDashboard() {
    console.log("\n=== Parallel Execution ===")
    const start = Date.now();

    const [users, posts, stats] = await Promise.all([
        fetchData("/api/users"),
        fetchData("/api/posts"),
        fetchData("/api/stats")
    ]);

    console.log("All loaded in", Date.now() - start, "ms");
    console.log("Results:", users.data, "|", posts.data, "|", stats.data);
}

// Run demos
setTimeout(() => {
    loadUserData().then(() => {
        loadDashboard();
    });
}, 200);

// Promise Utilities
console.log("\n=== Promise Utilities ===");
console.log("Promise.all — semua harus berhasil");
console.log("Promise.race — yang pertama selesai");
console.log("Promise.allSettled — semua hasil (success/fail)");
console.log("Promise.any — yang pertama berhasil");
```

---

## Key Concepts

### Callback → Promise → Async/Await
Callback hell → Promise chain → async/await (cleanest).

### Promise States
`pending` → `fulfilled` (resolve) or `rejected` (reject).

### Promise.all
All promises must succeed. If one fails, all fail.

### Promise.race
Returns first promise to complete (success or fail).

### Async/Await
`async function` returns Promise. `await` waits for Promise to complete.

### Parallel
`Promise.all([p1, p2, p3])` — run concurrently, not sequentially.

---

## Experiments

- Create Promise that rejects after timeout
- Try Promise.allSettled with mix success/fail
- Experiment Promise.race for timeout pattern
- Create retry logic with async/await
- Implement Promise.all with concurrency limit

---

## Challenge

Build a data loader: fetch 3 APIs in parallel, handle errors per-request, with retry logic.

---

## Summary

Week 7 of 14: **Async JavaScript** (Level: Intermediate). Non-blocking code. Next week: **ES6+ Features**.
