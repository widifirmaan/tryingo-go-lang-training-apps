# Event Handling and Interactive Forms

> **Category:** JavaScript | **Level:** Data Structures & DOM Interaction | **Week 9:** Event Handling and Interactive Forms
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Master event listeners using addEventListener()
- Leverage the Event Object (e) and e.preventDefault() to suppress page reload
- Manage core user events: click, submit, input, change, keydown
- Understand Event Propagation: Event Bubbling and Event Delegation patterns
- Construct an interactive Task Manager application with form validation (Level 2 Capstone)

---

## 1. `addEventListener()` Mechanics

`addEventListener` binds discrete event listener callbacks to user interactions:

```javascript
const button = document.querySelector("#btn-save");

button.addEventListener("click", (event) => {
  console.log("Button clicked!");
});
```

Advantages over inline attributes:
1. Supports multiple discrete listeners on the same element.
2. Maintains pure separation between JavaScript logic and markup.

---

## 2. The Event Object (`e`) and `e.preventDefault()`

Browsers inject comprehensive metadata objects into every triggered callback:

```javascript
const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Suppresses default browser page reload
  console.log("Processing payload client-side");
});
```

- **`e.preventDefault()`**: Critical for form `submit` handlers to prevent full page reloads.
- **`e.target`**: The exact target element initiating the event dispatch.

---

## 3. Event Bubbling & Delegation

Events trigger on child elements then propagate upward through parent ancestor nodes:

```text
  Button click ──► Card parent ──► Grid container ──► Document
```

**Event Delegation**: Attach **a single listener** to the parent container rather than binding hundreds of redundant listeners to child items:

```javascript
listContainer.addEventListener("click", (e) => {
  if (e.target.matches(".btn-delete")) {
    e.target.closest("li").remove();
  }
});
```

---

## Program: Task Management App with Event Delegation and Form PreventDefault

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Event Handling dan Formulir</title>
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

    .task-form {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    input[type="text"] {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid #CBD5E0;
      border-radius: 6px;
      font-size: 14px;
    }

    button[type="submit"] {
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
    }

    .task-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .task-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 14px;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      background-color: #FFFFFF;
      transition: background-color 0.15s ease;
    }

    .task-item.completed {
      background-color: #F7FAFC;
      text-decoration: line-through;
      color: #A0AEC0;
      border-color: #EDF2F7;
    }

    .task-label {
      cursor: pointer;
      flex: 1;
      margin-left: 10px;
      font-size: 14px;
    }

    .btn-del {
      background: none;
      border: none;
      color: #E53E3E;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .btn-del:hover {
      background-color: #FFF5F5;
    }

    .stats-footer {
      margin-top: 16px;
      font-size: 13px;
      color: #718096;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Aplikasi Tugas Interaktif</h3>

    <!-- 1. Formulir Tugas dengan Event Submit -->
    <form id="task-form" class="task-form">
      <input type="text" id="task-input" placeholder="Tulis tugas baru..." required>
      <button type="submit">Tambah</button>
    </form>

    <!-- 2. Daftar Tugas dengan Event Delegation -->
    <ul id="task-list" class="task-list"></ul>

    <div class="stats-footer">
      <span id="task-counter">0 tugas tersimpan</span>
      <span>Klik teks untuk menandai selesai</span>
    </div>
  </div>

  <script>
    const form = document.getElementById("task-form");
    const input = document.getElementById("task-input");
    const list = document.getElementById("task-list");
    const counter = document.getElementById("task-counter");

    function updateCounter() {
      const total = list.children.length;
      counter.textContent = `${total} tugas aktif`;
    }

    // 1. EVENT SUBMIT FORM (Mencegah reload browser)
    form.addEventListener("submit", function(e) {
      e.preventDefault(); // Wajib! Mencegah halaman refresh
      
      const judulTugas = input.value.trim();
      if (!judulTugas) return;

      // Membuat elemen task item
      const li = document.createElement("li");
      li.className = "task-item";
      li.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span class="task-label">${judulTugas}</span>
        <button type="button" class="btn-del" title="Hapus Tugas">&times;</button>
      `;

      list.appendChild(li);
      input.value = "";
      input.focus();
      updateCounter();
    });

    // 2. EVENT DELEGATION PADA ELEMEN INDUK (ul#task-list)
    list.addEventListener("click", function(e) {
      const target = e.target;
      const li = target.closest(".task-item");
      if (!li) return;

      // Aksi A: Tombol Hapus diklik
      if (target.classList.contains("btn-del")) {
        li.remove();
        updateCounter();
        return;
      }

      // Aksi B: Checkbox atau label diklik (Tandai selesai)
      if (target.classList.contains("task-checkbox") || target.classList.contains("task-label")) {
        li.classList.toggle("completed");
        const checkbox = li.querySelector(".task-checkbox");
        if (target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
      }
    });
  </script>

</body>
</html>
```

---

## Detailed Code Breakdown

- `e.preventDefault()`: Suppresses default browser HTML form submission reload behavior.
- `list.addEventListener("click", ...)`: Implements Event Delegation routing child events through a single parent listener.
- `e.target.closest(".task-item")`: Climbs ancestors up to the matching parent `<li>` container.
- `li.classList.toggle("completed")`: Applies strikethrough typography and muted color states dynamically.
- `input.focus()`: Programmatically returns text focus to the input box streamlining rapid data entry.

---

## Playground Experiments

1. Adjust variable bindings, arguments, or strings inside the Playground editor and observe live runtime output shifts.
2. Introduce new conditional branches or helper functions relevant to your scenarios.
3. Inspect the browser Developer Console (F12) to trace runtime execution telemetry.

---

## Practical Challenge

Apply Week 9 core concepts inside your project's main.js file. Verify const vs let discipline, guard against null/undefined values, and maintain descriptive variable naming.

---

## Common Pitfalls & Debugging

- Omitting e.preventDefault() on submit: Form triggers full browser navigation immediately flushing runtime memory state.
- Attaching separate listeners per item: Binding separate listeners to dynamic nodes exhausts memory allocations.
- Unspecified button type in forms: Buttons inside forms default to type="submit"; deletion triggers unwanted form submissions.
- Nested e.target ambiguity: e.target points to internal icons; use e.target.closest() to resolve targeted parent elements.

---

## Summary

- Week 9 (Event Handling and Interactive Forms) delivers hands-on algorithmic and practical JavaScript development proficiencies.
- All code adheres strictly to standard ECMAScript specifications, immediately runnable inside browser viewports and CodePlayground.
- In subsequent modules, we progressively expand programmatic capabilities toward a complete interactive web application.
