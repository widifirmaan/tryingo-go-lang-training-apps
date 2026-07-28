# Final Project

> JavaScript | Module 12

## Learning Objectives

- Combine all JavaScript concepts in one project
- Design structured application architecture
- Manage application state effectively
- Build responsive and interactive UI
- Deploy a vanilla JavaScript project

---

## Program: Interactive Dashboard

```html
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Dashboard Interaktif</title><style>body{font-family:system-ui,sans-serif;max-width:900px;margin:2rem auto;padding:0 1rem;background:#f8f9fa}h1{color:#333;border-bottom:3px solid #F7DF1E;padding-bottom:.5rem}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;margin:1.5rem 0}.card{background:#fff;padding:1.2rem;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.08)}.card h3{color:#F7DF1E;margin:0 0 .8rem 0;font-size:1rem}input,select{padding:.5rem;border:1px solid #ddd;border-radius:6px;width:100%;box-sizing:border-box;margin-bottom:.5rem}button{background:#F7DF1E;color:#000;border:none;padding:.5rem 1rem;border-radius:6px;cursor:pointer;font-weight:bold;transition:opacity .2s}button:hover{opacity:.8}.todo-item{display:flex;align-items:center;gap:8px;padding:.4rem 0;border-bottom:1px solid #eee}.todo-item:last-child{border:0}.done{text-decoration:line-through;color:#999}.stats{display:flex;gap:1rem;flex-wrap:wrap}.stat{padding:.3rem .8rem;background:#f0f0f0;border-radius:20px;font-size:.85rem}.stat span{font-weight:bold}#clock{font-size:2.5rem;font-weight:bold;color:#333;text-align:center}</style></head>
<body>
<h1>Dashboard Interaktif</h1>
<div class="grid">
  <div class="card">
    <h3>⏰ Jam Digital</h3>
    <div id="clock">--:--:--</div>
  </div>
  <div class="card">
    <h3>📝 Todo List</h3>
    <div style="display:flex;gap:4px">
      <input type="text" id="todoInput" placeholder="Tambah tugas...">
      <button onclick="tambahTodo()" style="white-space:nowrap">+</button>
    </div>
    <div id="todoList"></div>
    <div class="stats" style="margin-top:8px">
      <span class="stat">Sisa: <span id="sisaCount">0</span></span>
      <span class="stat">Selesai: <span id="selesaiCount">0</span></span>
    </div>
  </div>
  <div class="card">
    <h3>🌤️ Cuaca (Simulasi)</h3>
    <select id="kotaSelect" onchange="updateCuaca()">
      <option value="Jakarta">Jakarta</option>
      <option value="Bandung">Bandung</option>
      <option value="Surabaya">Surabaya</option>
    </select>
    <div id="cuacaInfo" style="text-align:center;padding:1rem">
      <div style="font-size:3rem" id="cuacaIcon">☀️</div>
      <div style="font-size:1.2rem" id="cuacaTemp">32°C</div>
      <div id="cuacaDesc">Cerah</div>
    </div>
  </div>
  <div class="card">
    <h3>📊 Pengatur Warna</h3>
    <label>Merah <input type="range" min="0" max="255" value="100" oninput="updateBg()" id="red"></label>
    <label>Hijau <input type="range" min="0" max="255" value="180" oninput="updateBg()" id="green"></label>
    <label>Biru <input type="range" min="0" max="255" value="220" oninput="updateBg()" id="blue"></label>
    <div id="colorPreview" style="height:50px;border-radius:8px;margin-top:8px;border:1px solid #ddd"></div>
  </div>
</div>
<script>
  // ====== JAM DIGITAL ======
  function updateJam() {
    let now = new Date();
    document.getElementById("clock").textContent = now.toLocaleTimeString("id-ID");
  }
  setInterval(updateJam, 1000);
  updateJam();

  // ====== TODO LIST ======
  let todos = JSON.parse(localStorage.getItem("dashboardTodos") || "[]");
  function renderTodo() {
    let el = document.getElementById("todoList");
    el.innerHTML = todos.map((t, i) =>
      `<div class="todo-item">
        <input type="checkbox" ${t.done ? "checked" : ""} onchange="toggleTodo(${i})">
        <span class="${t.done ? "done" : ""}">${t.teks}</span>
        <button onclick="hapusTodo(${i})" style="margin-left:auto;padding:2px 8px;font-size:.8rem">✕</button>
      </div>`
    ).join("");
    document.getElementById("sisaCount").textContent = todos.filter(t => !t.done).length;
    document.getElementById("selesaiCount").textContent = todos.filter(t => t.done).length;
    localStorage.setItem("dashboardTodos", JSON.stringify(todos));
  }
  function tambahTodo() {
    let teks = document.getElementById("todoInput").value.trim();
    if (!teks) return;
    todos.push({ teks, done: false });
    document.getElementById("todoInput").value = "";
    renderTodo();
  }
  function toggleTodo(i) { todos[i].done = !todos[i].done; renderTodo(); }
  function hapusTodo(i) { todos.splice(i, 1); renderTodo(); }
  renderTodo();

  // ====== CUACA ======
  const dataCuaca = {
    Jakarta: { icon: "☀️", temp: "32°C", desc: "Cerah" },
    Bandung: { icon: "⛅", temp: "24°C", desc: "Berawan" },
    Surabaya: { icon: "🌤️", temp: "34°C", desc: "Cerah Berawan" },
  };
  function updateCuaca() {
    let kota = document.getElementById("kotaSelect").value;
    let d = dataCuaca[kota];
    document.getElementById("cuacaIcon").textContent = d.icon;
    document.getElementById("cuacaTemp").textContent = d.temp;
    document.getElementById("cuacaDesc").textContent = d.desc;
  }
  updateCuaca();

  // ====== PENGATUR WARNA ======
  function updateBg() {
    let r = document.getElementById("red").value;
    let g = document.getElementById("green").value;
    let b = document.getElementById("blue").value;
    document.getElementById("colorPreview").style.background = `rgb(${r},${g},${b})`;
  }
  updateBg();
</script>
</body>
</html>
```

---

## Explanation

### Application Architecture
Separate code into modules: data (state), UI (render), and logic (handlers). Use closures or classes for encapsulation.

### State Management
Store application state in one place (not scattered across the DOM). Use a centralized object. Store persistent state in localStorage.

### Reactivity
Use a render() function that reads the latest state and updates the UI. Call render() every time state changes.

### Deployment
Vanilla JS projects can be deployed to GitHub Pages, Netlify, Vercel, or Cloudflare Pages without a build step.

---

## Experiments

1. **Add todo edit feature (double-click to edit)**
1. **Implement filter: All / Active / Completed**
1. **Add a bar chart to the dashboard (canvas)**
1. **Save entire dashboard state to localStorage and restore on load**

---

## Challenge

Build a "Personal Finance Dashboard" that combines ALL concepts: objects for transactions, array methods for filter/sort, DOM for UI, events for interaction, localStorage for persistence, async for data export/import, closures for private state, and canvas for expense-by-category charts.

---

## Summary

Congratulations! You have completed the entire JavaScript curriculum. From basic variables to advanced patterns, from DOM to async — you now have a strong foundation. Next steps: learn TypeScript, React, or Node.js to expand your skills.
