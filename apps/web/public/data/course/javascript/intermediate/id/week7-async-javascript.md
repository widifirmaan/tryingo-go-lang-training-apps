# Async JavaScript

> **Kategori:** JavaScript | **Level:** Menengah | **Minggu 7:** Async JavaScript

## Tujuan Pembelajaran

- Callback vs Promise vs Async/Await
- Promise states: pending, fulfilled, rejected
- Promise.all, Promise.race, Promise.allSettled
- Error handling: try/catch dengan async/await
- Parallel vs sequential execution

---

## Program: Promise & Async/Await

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

## Konsep Kunci

### Callback → Promise → Async/Await
Callback hell → Promise chain → async/await (cleanest).

### Promise States
`pending` → `fulfilled` (resolve) atau `rejected` (reject).

### Promise.all
Semua promise harus berhasil. Jika satu gagal, semua gagal.

### Promise.race
Return promise pertama yang selesai (success atau fail).

### Async/Await
`async function` return Promise. `await` tunggu Promise selesai.

### Parallel
`Promise.all([p1, p2, p3])` — jalankan bersamaan, bukan sequential.

---

## Eksperimen

- Buat Promise yang reject setelah timeout
- Coba Promise.allSettled dengan mix success/fail
- Eksperimen Promise.race untuk timeout pattern
- Buat retry logic dengan async/await
- Implementasikan Promise.all dengan concurrency limit

---

## Tantangan

Buat data loader: fetch 3 API secara parallel, handle errors per-request, dengan retry logic.

---

## Ringkasan

Minggu 7 dari 14: **Async JavaScript** (Level: Menengah). Non-blocking code. Minggu depan: **ES6+ Features**.
