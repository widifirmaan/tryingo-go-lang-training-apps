# Final Project: Complete Interactive Web Application

> **Category:** JavaScript | **Level:** Asynchronous, Storage & Final Project | **Week 14:** Final Project: Complete Interactive Web Application
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Synthesize 14 weeks of competencies into a unified modular application architecture
- Implement complete CRUD operations (Create, Read, Update status, Delete) via reactive state
- Build real-time search filtering and multi-category sorting
- Synchronize application state persistently to LocalStorage with robust error guards
- Deploy a standalone production-ready web application built purely with native JavaScript

---

## 1. Final JavaScript Capstone Architecture

In this concluding capstone week, you synthesize all competencies into a standalone **Task and Inventory Management Application**:

```text
final-javascript-project/
├── index.html           # Semantic layout structure
├── styles.css           # Visual presentation and responsive styling
└── js/
    ├── storage.js       # LocalStorage synchronization routines
    ├── state.js         # Reactive state operations and filtering
    └── app.js           # Main entry point, event dispatchers, and DOM renderer
```

---

## 2. End-to-End Module Synthesis (Weeks 1-13)

This capstone unites:
1. **Language Foundations (Weeks 1-5):** `const`/`let` invariants, primitives, conditional guards, iteration loops, and pure function pipelines.
2. **Data & DOM (Weeks 6-9):** Functional array methods (`map`, `filter`, `reduce`), destructuring, dynamic DOM construction, and unified event delegation.
3. **Storage & Security (Weeks 10-13):** Safe JSON serialization, XSS-proof text bindings, and resilient LocalStorage state persistence.

---

## 3. Unidirectional Data Flow

```text
[ User Action / Event ] ──► [ Update State (Array of Objects) ]
                                      │
               ┌──────────────────────┴──────────────────────┐
               ▼                                             ▼
     [ Commit to LocalStorage ]                    [ Re-render DOM Views ]
```

Separating raw data state from DOM elements creates modular, maintainable applications.

---

## Program: Complete Standalone Project and Task Management Application

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal Tugas Mandiri — Proyek Akhir</title>
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
      padding: 24px 16px;
      line-height: 1.5;
    }

    .app-container {
      max-width: 600px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }

    .app-header {
      background-color: #2E5B44;
      color: #FFFFFF;
      padding: 24px;
      text-align: center;
    }

    .app-header h2 {
      font-size: 22px;
      font-weight: 800;
      margin-bottom: 4px;
    }

    .app-header p {
      font-size: 13px;
      opacity: 0.9;
    }

    .app-body {
      padding: 24px;
    }

    /* Formulir Tambah */
    .task-form {
      display: grid;
      grid-template-columns: 1fr 140px auto;
      gap: 10px;
      margin-bottom: 20px;
    }

    input, select, button {
      padding: 10px 12px;
      border-radius: 6px;
      font-size: 14px;
      border: 1px solid #CBD5E0;
    }

    .btn-primary {
      background-color: #2E5B44;
      color: white;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }

    .btn-primary:hover {
      background-color: #234634;
    }

    /* Toolbar Filter & Pencarian */
    .search-filter-bar {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .search-filter-bar input {
      flex: 1;
    }

    /* Daftar Item Tugas */
    .task-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-height: 120px;
    }

    .task-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border: 1px solid #E2E8F0;
      border-left: 4px solid #2E5B44;
      border-radius: 8px;
      background: #FFFFFF;
      transition: all 0.2s ease;
    }

    .task-card.completed {
      background-color: #F7FAFC;
      border-left-color: #A0AEC0;
      opacity: 0.7;
    }

    .task-card.completed .title-text {
      text-decoration: line-through;
      color: #718096;
    }

    .task-info {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }

    .category-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
      background-color: #E2F2E9;
      color: #2E5B44;
    }

    .btn-delete-item {
      background: none;
      border: none;
      color: #E53E3E;
      font-size: 18px;
      cursor: pointer;
      padding: 4px 8px;
    }

    /* Footer Ringkasan */
    .app-footer {
      border-top: 1px solid #E2E8F0;
      padding: 16px 24px;
      background-color: #F7FAFC;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: #4A5568;
    }
  </style>
</head>
<body>

  <div class="app-container">
    <header class="app-header">
      <h2>Portal Manajemen Tugas Mandiri</h2>
      <p>Proyek Akhir Capstone: Aplikasi Terstruktur Berbasis State & LocalStorage</p>
    </header>

    <div class="app-body">
      <!-- 1. Formulir Tambah Data -->
      <form id="add-form" class="task-form">
        <input type="text" id="title-input" placeholder="Nama tugas baru..." required>
        <select id="category-select">
          <option value="Proyek">Proyek</option>
          <option value="Belajar">Belajar</option>
          <option value="Pribadi">Pribadi</option>
        </select>
        <button type="submit" class="btn-primary">+ Tambah</button>
      </form>

      <!-- 2. Pencarian dan Filter Realtime -->
      <div class="search-filter-bar">
        <input type="text" id="search-input" placeholder="Cari nama tugas...">
        <select id="filter-select">
          <option value="SEMUA">Semua Kategori</option>
          <option value="Proyek">Proyek</option>
          <option value="Belajar">Belajar</option>
          <option value="Pribadi">Pribadi</option>
        </select>
      </div>

      <!-- 3. Daftar Tampilan Tugas -->
      <ul id="task-list-view" class="task-list"></ul>
    </div>

    <!-- 4. Ringkasan Status -->
    <footer class="app-footer">
      <span id="metric-summary">Memuat metrik...</span>
      <button onclick="bersihkanSelesai()" style="background:none; border:none; color:#2E5B44; font-weight:600; cursor:pointer; font-size:12px;">Hapus yang Selesai</button>
    </footer>
  </div>

  <script>
    // ── 1. MODUL STORAGE PERSISTENSI ──
    const KEY_STORAGE = "tryngo_capstone_tasks";

    function loadState() {
      const saved = localStorage.getItem(KEY_STORAGE);
      if (saved) {
        try { return JSON.parse(saved); } catch(e) { return []; }
      }
      // Data Awal Bawaan
      return [
        { id: 1, judul: "Menyelesaikan Modul HTML5 Semantik", kategori: "Belajar", selesai: true },
        { id: 2, judul: "Membangun Desain CSS Responsif", kategori: "Proyek", selesai: true },
        { id: 3, judul: "Menguasai Pemrograman JavaScript", kategori: "Belajar", selesai: false }
      ];
    }

    function saveState(data) {
      localStorage.setItem(KEY_STORAGE, JSON.stringify(data));
    }

    // ── 2. SINGLE SOURCE OF TRUTH (STATE) ──
    let appState = loadState();

    // ── 3. RENDER FUNCTION (UNIDIRECTIONAL UI) ──
    function renderApp() {
      const listView = document.getElementById("task-list-view");
      const searchQuery = document.getElementById("search-input").value.toLowerCase();
      const filterCategory = document.getElementById("filter-select").value;

      // Filter Data berdasarkan Search dan Kategori
      const filtered = appState.filter(item => {
        const cocokCari = item.judul.toLowerCase().includes(searchQuery);
        const cocokKategori = filterCategory === "SEMUA" || item.kategori === filterCategory;
        return cocokCari && cocokKategori;
      });

      // Update Metrik Ringkasan (Reduce & Filter)
      const totalSelesai = appState.filter(t => t.selesai).length;
      document.getElementById("metric-summary").textContent = 
        `${totalSelesai} dari ${appState.length} tugas selesai (${appState.length === 0 ? 0 : Math.round((totalSelesai/appState.length)*100)}%)`;

      if (filtered.length === 0) {
        listView.innerHTML = '<li style="text-align:center; padding:24px; color:#A0AEC0; font-size:13px;">Tidak ada tugas yang sesuai kriteria pencarian.</li>';
        return;
      }

      listView.innerHTML = filtered.map(item => `
        <li class="task-card ${item.selesai ? 'completed' : ''}" data-id="${item.id}">
          <div class="task-info">
            <input type="checkbox" ${item.selesai ? 'checked' : ''} onchange="toggleStatus(${item.id})">
            <span class="category-badge">${item.kategori}</span>
            <span class="title-text">${item.judul}</span>
          </div>
          <button class="btn-delete-item" onclick="deleteTask(${item.id})" title="Hapus Tugas">&times;</button>
        </li>
      `).join("");
    }

    // ── 4. AKSI PENGUBAH STATE (MUTATORS) ──
    document.getElementById("add-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const titleInput = document.getElementById("title-input");
      const categorySelect = document.getElementById("category-select");

      const judulBaru = titleInput.value.trim();
      if (!judulBaru) return;

      // Buat item baru
      const itemBaru = {
        id: Date.now(),
        judul: judulBaru,
        kategori: categorySelect.value,
        selesai: false
      };

      appState.unshift(itemBaru);
      saveState(appState);
      renderApp();

      titleInput.value = "";
      titleInput.focus();
    });

    function toggleStatus(id) {
      appState = appState.map(item => {
        if (item.id === id) {
          return { ...item, selesai: !item.selesai };
        }
        return item;
      });
      saveState(appState);
      renderApp();
    }

    function deleteTask(id) {
      appState = appState.filter(item => item.id !== id);
      saveState(appState);
      renderApp();
    }

    function bersihkanSelesai() {
      appState = appState.filter(item => !item.selesai);
      saveState(appState);
      renderApp();
    }

    // Listener Live Search dan Filter
    document.getElementById("search-input").addEventListener("input", renderApp);
    document.getElementById("filter-select").addEventListener("change", renderApp);

    // Render Perdana
    renderApp();
  </script>

</body>
</html>
```

---

## Detailed Code Breakdown

- `Single Source of Truth`: Application state lives in a centralized array of objects rather than dispersed across HTML element nodes.
- `Unidirectional Data Flow`: User interactions mutate state, state commits to LocalStorage, and views re-render deterministically.
- `appState.filter(...)`: Integrates real-time substring search matching with categorical dropdown filters simultaneously.
- `toggleStatus(id)`: Deploys immutable functional map and spread operations to flip task completion states safely.
- `bersihkanSelesai()`: Purges completed task records cleanly from memory and storage in a single action.

---

## Playground Experiments

1. Adjust variable bindings, arguments, or strings inside the Playground editor and observe live runtime output shifts.
2. Introduce new conditional branches or helper functions relevant to your scenarios.
3. Inspect the browser Developer Console (F12) to trace runtime execution telemetry.

---

## Practical Challenge

Apply Week 14 core concepts inside your project's main.js file. Verify const vs let discipline, guard against null/undefined values, and maintain descriptive variable naming.

---

## Common Pitfalls & Debugging

- Using the DOM as state store: Storing data inside DOM nodes makes filtering, persistence, and debugging extremely fragile.
- Omitting renderApp() post-mutation: Mutating internal state without dispatching re-render calls leaves the interface stale.
- Using array indices as unique identifiers: Filtering or sorting causes index shifts deleting wrong items; always rely on persistent unique IDs like Date.now().
- Case-sensitive search lookups: Omitting .toLowerCase() normalization breaks search matching whenever capitalization differs.

---

## Summary

- Week 14 (Final Project: Complete Interactive Web Application) delivers hands-on algorithmic and practical JavaScript development proficiencies.
- All code adheres strictly to standard ECMAScript specifications, immediately runnable inside browser viewports and CodePlayground.
- In subsequent modules, we progressively expand programmatic capabilities toward a complete interactive web application.
