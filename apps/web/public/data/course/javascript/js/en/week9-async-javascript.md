# Asynchronous JavaScript

> JavaScript | Module 9

## Learning Objectives

- Understand synchronous vs asynchronous concepts
- Create and use Promises
- Write async/await for asynchronous code
- Fetch data with the Fetch API
- Handle errors with try/catch

---

## Program: Data Fetcher

```html
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Async JavaScript</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer;margin:2px}pre{background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px;max-height:200px;overflow-y:auto}.spinner{display:inline-block;width:16px;height:16px;border:2px solid #F7DF1E;border-top-color:transparent;border-radius:50%;animation:spin .6s linear infinite;vertical-align:middle;margin-right:8px}@keyframes spin{to{transform:rotate(360deg)}}</style></head>
<body>
<h1>Async JavaScript Demo</h1>
<div class="card">
  <button onclick="demoPromise()">Promise Sederhana</button>
  <button onclick="demoAsync()">Async/Await</button>
  <button onclick="demoFetch()">Fetch API (JSON)</button>
  <button onclick="demoParallel()">Promise.all</button>
  <button onclick="clearOut()">Clear</button>
</div>
<pre id="status"></pre>
<pre id="output">Klik tombol untuk melihat async JavaScript dalam aksi</pre>
<script>
  function log(msg) {
    document.getElementById("output").textContent += msg + "\n";
  }
  function setStatus(msg) {
    document.getElementById("status").textContent = msg;
  }
  function clearOut() {
    document.getElementById("output").textContent = "";
    document.getElementById("status").textContent = "";
  }

  // PROMISE
  function demoPromise() {
    setStatus("⏳ Promise berjalan...");
    log("→ Promise dimulai");
    let janji = new Promise((resolve, reject) => {
      setTimeout(() => {
        let berhasil = Math.random() > 0.3;
        if (berhasil) resolve("✅ Data berhasil dimuat!");
        else reject("❌ Gagal memuat data");
      }, 1500);
    });
    janji
      .then(hasil => { log(hasil); setStatus("✅ Promise selesai"); })
      .catch(err => { log(err); setStatus("❌ Promise gagal"); });
  }

  // ASYNC/AWAIT
  function tunda(ms) {
    return new Promise(r => setTimeout(r, ms));
  }
  async function demoAsync() {
    setStatus("⏳ Async/Await berjalan...");
    log("→ Async function dimulai");
    try {
      await tunda(800);
      log("✅ Langkah 1: Koneksi database OK");
      await tunda(800);
      log("✅ Langkah 2: Data ditemukan (42 baris)");
      await tunda(800);
      log("✅ Langkah 3: Data diproses");
      setStatus("✅ Async/Await selesai!");
    } catch (err) {
      log("❌ Error: " + err);
      setStatus("❌ Gagal");
    }
  }

  // FETCH API
  async function demoFetch() {
    setStatus("⏳ Mengambil data...");
    log("→ Fetch API dimulai");
    try {
      let res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      if (!res.ok) throw new Error("HTTP " + res.status);
      let data = await res.json();
      log("✅ Data diterima:");
      log("  ID: " + data.id);
      log("  Judul: " + data.title);
      log("  Selesai: " + data.completed);
      setStatus("✅ Fetch selesai!");
    } catch (err) {
      log("❌ Fetch error: " + err.message);
      setStatus("❌ Fetch gagal (gunakan Live Server atau proxy)");
    }
  }

  // PROMISE.ALL
  async function demoParallel() {
    setStatus("⏳ Eksekusi paralel...");
    log("→ Promise.all dimulai");
    let mulai = Date.now();
    try {
      let hasil = await Promise.all([
        tunda(1000).then(() => "Tugas 1 (1s) selesai"),
        tunda(2000).then(() => "Tugas 2 (2s) selesai"),
        tunda(1500).then(() => "Tugas 3 (1.5s) selesai"),
      ]);
      let waktu = ((Date.now() - mulai) / 1000).toFixed(1);
      hasil.forEach(h => log("  " + h));
      log(`✅ Semua selesai dalam ${waktu}s (bukan 4.5s!)`);
      setStatus("✅ Paralel selesai!");
    } catch (err) {
      log("❌ " + err);
      setStatus("❌ Gagal");
    }
  }
</script>
</body>
</html>
```

---

## Explanation

### Synchronous vs Asynchronous
JS is single-threaded. Slow operations (fetch, timer) should not block the main thread.

### Promise
An object representing a future value. Has states: pending, fulfilled, rejected.

### async/await
Syntactic sugar for Promises. `async` functions always return a Promise. `await` waits for Promise resolution.

### Fetch API
Browser built-in function for HTTP requests. Returns a Promise. Needs two `await`s: response headers, then body.

### Error Handling
Always wrap async code in `try/catch` to handle errors gracefully.

---

## Experiments

1. **Replace Promise `.then()` with async/await**
1. **Add a loading state before fetching**
1. **Try Promise.allSettled() and compare with Promise.all()**
1. **Create a countdown timer using Promise and setTimeout**

---

## Challenge

Create a "Latest News" app that fetches data from a News API (or mock data). Display a news list with images, titles, and descriptions. Features: loading state, error handling, refresh, and infinite scroll (load more data on scroll).

---

## Summary

Asynchronous JavaScript is a key concept for modern web applications. Promises, async/await, and the Fetch API let you work with server data without blocking the UI. Next module: **Browser APIs** — leveraging built-in browser features.
