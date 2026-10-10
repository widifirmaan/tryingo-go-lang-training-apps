# LocalStorage and ES Modules

> **Category:** JavaScript | **Level:** Asynchronous, Storage & Final Project | **Week 13:** LocalStorage and ES Modules
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand Web Storage API mechanics: persistent localStorage vs ephemeral sessionStorage
- Master localStorage primitives: setItem(), getItem(), removeItem(), and clear()
- Store and deserialize complex object graphs using JSON stringification
- Modularize codebases using standard ES Modules: export, export default, and import
- Construct a persistent notebook app retaining state across browser refreshes

---

## 1. What is LocalStorage?

LocalStorage provides persistent key-value storage inside the client's browser sandbox:
- **Capacity**: Approximately 5MB per origin (far superior to 4KB Cookies).
- **Persistence**: Data survives across browser restarts and session terminations.
- **Constraint**: Values are stored strictly as **strings**.

---

## 2. Core LocalStorage Methods

```javascript
// 1. Write item
localStorage.setItem("theme", "dark");

// 2. Read item
const theme = localStorage.getItem("theme");

// 3. Delete item
localStorage.removeItem("theme");

// 4. Flush domain storage
localStorage.clear();
```

### Serializing Objects
Always pair serialization routines:

```javascript
// Write:
localStorage.setItem("notes", JSON.stringify(notesArray));

// Read:
const cached = JSON.parse(localStorage.getItem("notes") || "[]");
```

---

## 3. Code Modularization with ES Modules

Split sprawling scripts into single-responsibility modules:

```javascript
// storage.js
export function save(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// app.js
import { save } from "./storage.js";
save("user", { name: "Alex" });
```

Include using `type="module"`:
```html
<script type="module" src="app.js"></script>
```

---

## Program: Persistent Notes Application with LocalStorage Engine

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>LocalStorage dan Modularitas</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 32px;
      line-height: 1.5;
    }

    .container {
      max-width: 500px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.04);
    }

    h3 {
      color: #2E5B44;
      font-size: 20px;
      margin-bottom: 16px;
    }

    .note-form {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    input {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid #CBD5E0;
      border-radius: 6px;
      font-size: 14px;
    }

    .btn-save {
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
    }

    .notes-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .note-item {
      background-color: #F7FAFC;
      border: 1px solid #E2E8F0;
      border-left: 4px solid #2E5B44;
      border-radius: 6px;
      padding: 12px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
    }

    .btn-delete {
      background: none;
      border: none;
      color: #E53E3E;
      cursor: pointer;
      font-weight: bold;
      font-size: 16px;
    }

    .clear-bar {
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid #E2E8F0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: #718096;
    }

    .btn-clear-all {
      background: none;
      border: 1px solid #CBD5E0;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 12px;
      color: #4A5568;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Buku Catatan Persisten (LocalStorage)</h3>

    <form id="note-form" class="note-form">
      <input type="text" id="note-input" placeholder="Tulis catatan penting..." required>
      <button type="submit" class="btn-save">Simpan</button>
    </form>

    <ul id="notes-container" class="notes-list"></ul>

    <div class="clear-bar">
      <span id="note-stats">0 catatan tersimpan di browser</span>
      <button class="btn-clear-all" onclick="hapusSemuaCatatan()">Hapus Semua</button>
    </div>
  </div>

  <script>
    // ── MODUL PENYIMPANAN DATA (STORAGE HELPER) ──
    const STORAGE_KEY = "tryngo_user_notes";

    function ambilSemuaDariStorage() {
      const dataString = localStorage.getItem(STORAGE_KEY);
      return dataString ? JSON.parse(dataString) : [];
    }

    function simpanKeStorage(dataArray) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataArray));
    }

    // ── KONTROLER APLIKASI UTAMA ──
    let daftarCatatan = ambilSemuaDariStorage();

    function renderCatatan() {
      const container = document.getElementById("notes-container");
      const stats = document.getElementById("note-stats");

      stats.textContent = `${daftarCatatan.length} catatan tersimpan di browser`;

      if (daftarCatatan.length === 0) {
        container.innerHTML = '<li style="text-align: center; color: #A0AEC0; font-size: 13px; padding: 12px;">Belum ada catatan. Data yang Anda simpan tidak akan hilang meski halaman di-refresh.</li>';
        return;
      }

      container.innerHTML = daftarCatatan.map((note, index) => `
        <li class="note-item">
          <span>${note.teks}</span>
          <button class="btn-delete" onclick="hapusCatatan(${index})" title="Hapus">&times;</button>
        </li>
      `).join("");
    }

    // Event Submit Form Catatan Baru
    document.getElementById("note-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const input = document.getElementById("note-input");
      const teks = input.value.trim();

      if (!teks) return;

      daftarCatatan.push({
        id: Date.now(),
        teks: teks,
        dibuat: new Date().toISOString()
      });

      simpanKeStorage(daftarCatatan);
      renderCatatan();

      input.value = "";
      input.focus();
    });

    function hapusCatatan(index) {
      daftarCatatan.splice(index, 1);
      simpanKeStorage(daftarCatatan);
      renderCatatan();
    }

    function hapusSemuaCatatan() {
      if (confirm("Yakin ingin menghapus seluruh catatan di browser?")) {
        daftarCatatan = [];
        localStorage.removeItem(STORAGE_KEY);
        renderCatatan();
      }
    }

    // Render data awal saat halaman dibuka
    renderCatatan();
  </script>

</body>
</html>
```

---

## Detailed Code Breakdown

- `localStorage.setItem(...)`: Serializes notes array to JSON and commits it persistently to disk.
- `JSON.parse(...)`: Deserializes saved JSON strings from storage back into interactive memory.
- `daftarCatatan.splice(index, 1)`: Removes specific items at index and syncs updated state to storage.
- `localStorage.removeItem(...)`: Purges specific storage keys without wiping unrelated origin records.
- Persistent storage guarantee: Refreshing the page or closing browser tabs preserves all active user records.

---

## Playground Experiments

1. Adjust variable bindings, arguments, or strings inside the Playground editor and observe live runtime output shifts.
2. Introduce new conditional branches or helper functions relevant to your scenarios.
3. Inspect the browser Developer Console (F12) to trace runtime execution telemetry.

---

## Practical Challenge

Apply Week 13 core concepts inside your project's main.js file. Verify const vs let discipline, guard against null/undefined values, and maintain descriptive variable naming.

---

## Common Pitfalls & Debugging

- Storing objects without stringification: Writing localStorage.setItem("data", obj) commits "[object Object]" irreversibly destroying the payload.
- Missing fallback on initial parse: Unset keys return null; provide fallback JSON.parse(localStorage.getItem(k) || "[]") to avoid null crashes.
- Quota limits: LocalStorage caps at ~5MB; storing heavy media strings triggers a QuotaExceededError.
- Storing raw secrets in LocalStorage: Avoid storing unencrypted passwords or vulnerable session tokens subject to XSS theft.

---

## Summary

- Week 13 (LocalStorage and ES Modules) delivers hands-on algorithmic and practical JavaScript development proficiencies.
- All code adheres strictly to standard ECMAScript specifications, immediately runnable inside browser viewports and CodePlayground.
- In subsequent modules, we progressively expand programmatic capabilities toward a complete interactive web application.
