# DOM Manipulation and Element Selection

> **Category:** JavaScript | **Level:** Data Structures & DOM Interaction | **Week 8:** DOM Manipulation and Element Selection
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand the Document Object Model (DOM) as an in-memory node tree representing HTML
- Select elements accurately using document.getElementById() and querySelector() / querySelectorAll()
- Safely mutate text nodes using textContent rather than innerHTML
- Manage dynamic class states cleanly with classList (add, remove, toggle, contains)
- Instantiate and mount programmatic DOM nodes with document.createElement() and appendChild()

---

## 1. What is the DOM Tree?

The Document Object Model (DOM) is an object-oriented programmatic representation of the HTML document structured as an in-memory tree:

```text
                  document
                     │
                   <html>
                 ┌───┴───┐
              <head>   <body>
                         │
                      <header>
                     ┌───┴───┐
                    <h1>    <p>
```

---

## 2. Modern Selection APIs

- **`document.getElementById("id")`**: Queries an individual unique element by ID.
- **`document.querySelector("selector")`**: Retrieves the first matching element using standard CSS selectors (`.card`, `nav > a`).
- **`document.querySelectorAll("selector")`**: Returns a NodeList matching all instances.

---

## 3. Security: `textContent` vs `innerHTML`

- **`textContent` (Safe Standard)**: Parses and injects plain text strictly. Neutralizes Cross-Site Scripting (XSS) attacks.
- **`innerHTML`**: Injects raw HTML markup. Hazardous when handling user inputs without sanitization.

---

## 4. Class Manipulation via `classList`

Avoid verbose inline styles (`elem.style.background`). Manage state using `classList`:

```javascript
const card = document.querySelector(".card");

card.classList.add("active");
card.classList.remove("hidden");
card.classList.toggle("selected");
```

---

## Program: Dynamic Card Generator and DOM Mutation Controller

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Manipulasi DOM</title>
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
      max-width: 540px;
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

    .input-bar {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    input {
      flex: 1;
      padding: 10px;
      border: 1px solid #CBD5E0;
      border-radius: 6px;
      font-size: 14px;
    }

    .btn-add {
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 10px 18px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
    }

    .card-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .item-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-left: 4px solid #2E5B44;
      border-radius: 8px;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background-color 0.15s ease;
    }

    .item-card.highlight {
      background-color: #E2F2E9;
    }

    .card-actions button {
      background: none;
      border: 1px solid #CBD5E0;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
      margin-left: 6px;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Pembangun Kartu Dinamis (DOM Mutation)</h3>

    <div class="input-bar">
      <input type="text" id="judul-input" placeholder="Ketik nama tugas / catatan baru..." value="Mempelajari Seleksi Elemen DOM">
      <button class="btn-add" onclick="tambahKartu()">+ Tambah</button>
    </div>

    <div id="grid-kartu" class="card-grid"></div>
  </div>

  <script>
    function tambahKartu() {
      const inputElem = document.getElementById("judul-input");
      const teks = inputElem.value.trim();

      if (!teks) {
        alert("Harap masukkan teks judul terlebih dahulu!");
        return;
      }

      const gridContainer = document.getElementById("grid-kartu");

      // 1. Membuat Elemen Baru Secara Terprogram (createElement)
      const kartu = document.createElement("div");
      kartu.className = "item-card";

      // 2. Membuat Elemen Teks Judul
      const judulSpan = document.createElement("span");
      judulSpan.textContent = teks; // Aman dari XSS!

      // 3. Membuat Kontainer Tombol Aksi
      const aksiDiv = document.createElement("div");
      aksiDiv.className = "card-actions";

      // Tombol Sorot (classList.toggle)
      const btnSorot = document.createElement("button");
      btnSorot.textContent = "Sorot";
      btnSorot.onclick = function() {
        kartu.classList.toggle("highlight");
      };

      // Tombol Hapus (remove)
      const btnHapus = document.createElement("button");
      btnHapus.textContent = "Hapus";
      btnHapus.onclick = function() {
        kartu.remove(); // Menghapus elemen langsung dari pohon DOM
      };

      // 4. Menyusun Struktur Anak ke Induk
      aksiDiv.appendChild(btnSorot);
      aksiDiv.appendChild(btnHapus);

      kartu.appendChild(judulSpan);
      kartu.appendChild(aksiDiv);

      // 5. Menyisipkan Kartu ke Pohon DOM Utama (prepend/appendChild)
      gridContainer.prepend(kartu);

      // Bersihkan input dan kembalikan fokus
      inputElem.value = "";
      inputElem.focus();
    }

    // Buat kartu pertama otomatis
    tambahKartu();
  </script>

</body>
</html>
```

---

## Detailed Code Breakdown

- `document.createElement("div")`: Instantiates a fresh HTML element node in memory.
- `judulSpan.textContent = teks`: Injects user-provided string content safely without HTML parsing vulnerabilities.
- `kartu.classList.toggle("highlight")`: Toggles CSS class presence dynamically on button interaction.
- `kartu.remove()`: Unmounts and tears down the DOM node directly from the parent tree.
- `gridContainer.prepend(kartu)`: Mounts new elements at the top of the collection immediately.

---

## Playground Experiments

1. Adjust variable bindings, arguments, or strings inside the Playground editor and observe live runtime output shifts.
2. Introduce new conditional branches or helper functions relevant to your scenarios.
3. Inspect the browser Developer Console (F12) to trace runtime execution telemetry.

---

## Practical Challenge

Apply Week 8 core concepts inside your project's main.js file. Verify const vs let discipline, guard against null/undefined values, and maintain descriptive variable naming.

---

## Common Pitfalls & Debugging

- Injecting raw user input via innerHTML: Causes Cross-Site Scripting (XSS) vulnerabilities where malicious script payloads compromise applications.
- Forgetting appendChild or prepend: Creating nodes via createElement without appending leaves nodes detached in memory.
- Invoking methods on null selectors: Querying non-existent classes returns null; calling .remove() immediately throws a fatal TypeError.
- Selector syntax errors: Passing "btn" instead of ".btn" for class lookups queries non-existent HTML tags and returns null.

---

## Summary

- Week 8 (DOM Manipulation and Element Selection) delivers hands-on algorithmic and practical JavaScript development proficiencies.
- All code adheres strictly to standard ECMAScript specifications, immediately runnable inside browser viewports and CodePlayground.
- In subsequent modules, we progressively expand programmatic capabilities toward a complete interactive web application.
