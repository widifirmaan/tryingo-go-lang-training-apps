# DOM Manipulation: querySelector, Element Creation & ClassList

> **Kategori:** JavaScript | **Level:** DOM, Events & Object Architecture | **Minggu 6:** DOM Manipulation: querySelector, Element Creation & ClassList
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand the Document Object Model (DOM) as an in-memory hierarchical node tree representing markup
- Select document elements precisely using document.querySelector() and document.querySelectorAll()
- Synthesize dynamic nodes safely using document.createElement() and appendChild() / append()
- Acknowledge Cross-Site Scripting (XSS) injection risks with innerHTML and prioritize textContent
- Manipulate CSS classes dynamically using classList.add(), classList.remove(), and classList.toggle()

---

## Program: Dynamic Note Taking App with Native DOM Element Synthesis

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DOM Manipulation Lab</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #F8FAFC; color: #1E293B; padding: 32px; }
    .card { background: white; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; max-width: 480px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .todo-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #F1F5F9; border-radius: 8px; margin-bottom: 8px; }
    .completed { text-decoration: line-through; opacity: 0.6; background: #E2E8F0; }
    .btn-del { background: #EF4444; color: white; border: none; padding: 4px 10px; border-radius: 6px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Daftar Catatan Sprint</h2>
    <div style="display: flex; gap: 8px; margin: 16px 0;">
      <input type="text" id="input-tugas" placeholder="Tulis tugas baru..." style="flex: 1; padding: 8px 12px; border-radius: 6px; border: 1px solid #CBD5E1;">
      <button id="btn-tambah" style="background: #2E5B44; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600;">+ Tambah</button>
    </div>
    <div id="daftar-tugas"></div>
  </div>

  <script>
    const inputTugas = document.getElementById("input-tugas");
    const btnTambah = document.getElementById("btn-tambah");
    const containerDaftar = document.querySelector("#daftar-tugas");

    function tambahTugasBaru(teks) {
      if (!teks.trim()) return;

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("todo-item");

      const teksSpan = document.createElement("span");
      teksSpan.textContent = teks;
      teksSpan.style.cursor = "pointer";

      teksSpan.addEventListener("click", () => {
        itemDiv.classList.toggle("completed");
      });

      const btnHapus = document.createElement("button");
      btnHapus.textContent = "Hapus";
      btnHapus.classList.add("btn-del");

      btnHapus.addEventListener("click", () => {
        itemDiv.remove();
      });

      itemDiv.appendChild(teksSpan);
      itemDiv.appendChild(btnHapus);
      containerDaftar.appendChild(itemDiv);

      inputTugas.value = "";
      inputTugas.focus();
    }

    btnTambah.addEventListener("click", () => {
      tambahTugasBaru(inputTugas.value);
    });

    inputTugas.addEventListener("keydown", (e) => {
      if (e.key === "Enter") tambahTugasBaru(inputTugas.value);
    });
  </script>
</body>
</html>
```

---

## Key Concepts

### The DOM Tree & XSS Prevention
Browsers parse markup into an in-memory node graph. Interpolating unescaped inputs via `innerHTML` invites Cross-Site Scripting (XSS) vulnerabilities. Always synthesize nodes explicitly via `document.createElement()` and bind string payloads using `textContent`.

---

---

## Beginner Friendly Explanation

### Analogy: A Living Oak Tree
The DOM is a living botanical tree: `<html>` is the root tap, `<body>` is the main trunk, and individual paragraphs `<p>` are branches that JavaScript can prune or sprout leaves upon at runtime.

## Experiments

- Submit <strong>Bold</strong> into the input to verify that it prints literally as text rather than bold markup.
- Click an existing task item to toggle completion strikes through classList.
- Mutate document.body.style.background live from the DevTools console.
- Query active note counts via document.querySelectorAll(".todo-item").length.

---

## Challenge

Add a "Clear All Tasks" button that purges the entire task container using `container.replaceChildren()`.

---

## Visual Mental Model & Architecture Flow

![Diagram JavaScript Event Loop & Asynchronous Architecture](/diagrams/js-event-loop.svg)

```diagram
┌──────────────┐     Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Coordinator)   │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operation (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variabel`
- **Core Functionality:** Declaration of variabel modern lingkup blok.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` untuk referensi konstan yang tidak diubah; `let` untuk nilai dinamis reassignable..
- **Practical Code Example:**
```javascript
const app = 'Tryngo';
let count = 0;
count += 1;
console.log(app, count);
```
- **Expected Execution Output:**
```output
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Sintaks fungsi ringkas dengan lexical this.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup luar..
- **Practical Code Example:**
```javascript
const square = (n) => n * n;
console.log(square(7));
```
- **Expected Execution Output:**
```output
49
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Penanganan operasi asinkron linear.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Membaca data HTTP API secara asinkron tanpa callback hell..
- **Practical Code Example:**
```javascript
async function loadData() {
  const res = Promise.resolve({ user: 'Alex', status: 'active' });
  return await res;
}
loadData().then(data => console.log(JSON.stringify(data)));
```
- **Expected Execution Output:**
```output
{"user":"Alex","status":"active"}
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Transformasi array fungsional immutable.
- **Parameters / Attributes:** `callback(item, index)`.
- **System Behavior & Return:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring data..
- **Practical Code Example:**
```javascript
const nums = [1, 2, 3, 4];
const evens = nums.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```output
[2, 4]
```

---

## Common Pitfalls & Debugging Tips

### 1. Loose Equality Bugs (== vs ===)
- **Symptom / Issue:** Unintended type coercion leads to subtle logic bugs (e.g. `0 == ''` is true).
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Consistently use strict equality operators (`===` and `!==`).

### 2. Direct State & Array Mutation
- **Symptom / Issue:** Prevents reactive UI frameworks from detecting updates and causes hard-to-track bugs.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Embrace immutable updates using spread syntax (`{ ...obj }`, `[...arr]`) or `.map()` and `.filter()`.

### 3. Unhandled Asynchronous Rejections
- **Symptom / Issue:** Uncaught promise failures crash backend processes or leave user interfaces frozen.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Wrap `await` calls in explicit `try { ... } catch (err) { ... }` blocks.

---

## Summary

You have mastered secure DOM manipulation and dynamic class management. Next week, we dive into event bubbling and event delegation.
