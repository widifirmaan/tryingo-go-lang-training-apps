# Arrays and Data Manipulation Methods

> **Category:** JavaScript | **Level:** Data Structures & DOM Interaction | **Week 6:** Arrays and Data Manipulation Methods
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Master Array zero-indexed sequences and dynamic length properties
- Differentiate mutating methods (push, pop, splice) from immutable operations (slice, concat)
- Transform data pipelines functionally using map()
- Filter collections using filter() and locate single items with find()
- Aggregate dataset values declaratively using reduce()

---

## 1. Array Sequence Anatomy

Arrays are zero-indexed ordered data structures:

```javascript
const fruits = ["Apple", "Orange", "Mango"];
console.log(fruits[0]); // "Apple" (First item)
console.log(fruits.length); // 3 (Item count)
```

---

## 2. Mutating vs Non-Mutating Methods

- **Mutating (Modifies original array in-place)**:
  - `push()`: Appends to the tail.
  - `pop()`: Removes trailing element.
  - `shift()`: Extracts leading element.
- **Non-Mutating (Returns new immutable instances)**:
  - `slice()`: Slices subsets without mutating the origin.
  - `concat()`: Merges distinct collections.

---

## 3. The Functional Triad: `map`, `filter`, `reduce`

### A. `map()`
Transforms each element one-to-one into a new array:
```javascript
const prices = [10000, 20000];
const withTax = prices.map(p => p * 1.11);
```

### B. `filter()`
Extracts items matching boolean predicates:
```javascript
const available = products.filter(p => p.stock > 0);
```

### C. `reduce()`
Condenses arrays down into single accumulated values:
```javascript
const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
```

---

## Program: Inventory Dataset Pipeline with Filters and Aggregations

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Array dan Metode Manipulasi</title>
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
      max-width: 560px;
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

    .toolbar {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
    }

    select, button {
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 13px;
    }

    select {
      border: 1px solid #CBD5E0;
      flex: 1;
    }

    button {
      background-color: #2E5B44;
      color: white;
      border: none;
      font-weight: 600;
      cursor: pointer;
    }

    .item-list {
      list-style: none;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 16px;
    }

    .item-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 14px;
      border-bottom: 1px solid #EDF2F7;
      font-size: 13px;
    }

    .item-row:last-child {
      border-bottom: none;
    }

    .item-row:nth-child(even) {
      background-color: #F7FAFC;
    }

    .badge-qty {
      background-color: #E2F2E9;
      color: #2E5B44;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
    }

    .metric-panel {
      background-color: #2E5B44;
      color: #FFFFFF;
      padding: 14px 18px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 600;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Pengolahan Data Inventaris (Array Pipeline)</h3>

    <div class="toolbar">
      <select id="kategori-filter" onchange="renderInventaris()">
        <option value="SEMUA">Semua Kategori</option>
        <option value="Elektronik">Elektronik</option>
        <option value="Pakaian">Pakaian</option>
        <option value="Buku">Buku</option>
      </select>
    </div>

    <ul id="list-container" class="item-list"></ul>

    <div class="metric-panel">
      <span>Total Nilai Inventaris:</span>
      <span id="total-val">Rp 0</span>
    </div>
  </div>

  <script>
    // 1. Kumpulan Data Mentah (Array of Objects)
    const inventaris = [
      { id: 1, nama: "Keyboard Mekanikal", kategori: "Elektronik", harga: 450000, stok: 8 },
      { id: 2, nama: "Mouse Ergonomis", kategori: "Elektronik", harga: 220000, stok: 15 },
      { id: 3, nama: "Kaos Polos Katun", kategori: "Pakaian", harga: 75000, stok: 30 },
      { id: 4, nama: "Jaket Parka Anti Air", kategori: "Pakaian", harga: 320000, stok: 5 },
      { id: 5, nama: "Buku Panduan JavaScript", kategori: "Buku", harga: 95000, stok: 20 },
      { id: 6, nama: "Buku Desain Web Modern", kategori: "Buku", harga: 110000, stok: 12 }
    ];

    function renderInventaris() {
      const filterKat = document.getElementById("kategori-filter").value;
      const listContainer = document.getElementById("list-container");

      // 2. Operasi FILTER: Menyaring berdasarkan kategori
      const dataTerfilter = filterKat === "SEMUA" 
        ? inventaris 
        : inventaris.filter(item => item.kategori === filterKat);

      // 3. Operasi MAP: Mengonversi data objek menjadi string HTML baris
      listContainer.innerHTML = dataTerfilter.map(item => `
        <li class="item-row">
          <div>
            <strong>${item.nama}</strong>
            <span style="color: #718096; font-size: 12px; margin-left: 6px;">(${item.kategori})</span>
          </div>
          <div>
            <span style="margin-right: 12px;">Rp ${item.harga.toLocaleString("id-ID")}</span>
            <span class="badge-qty">${item.stok} unit</span>
          </div>
        </li>
      `).join("");

      // 4. Operasi REDUCE: Menghitung total nilai seluruh barang terpilih
      const totalNilai = dataTerfilter.reduce((akumulator, item) => {
        return akumulator + (item.harga * item.stok);
      }, 0);

      document.getElementById("total-val").textContent = "Rp " + totalNilai.toLocaleString("id-ID");
    }

    renderInventaris();
  </script>

</body>
</html>
```

---

## Detailed Code Breakdown

- `inventaris.filter(...)`: Evaluates categories against selected dropdown filters non-destructively.
- `dataTerfilter.map(...)`: Transforms underlying data objects into HTML markup fragments.
- `reduce((acc, item) => ..., 0)`: Accumulator aggregating inventory valuation (price * quantity) starting from 0.
- `toLocaleString("id-ID")`: Formats numbers with locale-accurate Indonesian currency separators.
- Data immutability: The source array remains unmutated throughout filtering interactions.

---

## Playground Experiments

1. Adjust variable bindings, arguments, or strings inside the Playground editor and observe live runtime output shifts.
2. Introduce new conditional branches or helper functions relevant to your scenarios.
3. Inspect the browser Developer Console (F12) to trace runtime execution telemetry.

---

## Practical Challenge

Apply Week 6 core concepts inside your project's main.js file. Verify const vs let discipline, guard against null/undefined values, and maintain descriptive variable naming.

---

## Common Pitfalls & Debugging

- Omitting the initial value in reduce: Forgetting the initial 0 causes the first object to become the accumulator, leading to [object Object] concatenation bugs.
- Expecting filter to mutate in-place: filter generates a brand new array; failing to capture return values discards filtered results.
- Mutating arrays during forEach loops: Splicing items during active traversal causes erratic index shifts.
- Using find() when expecting multiple results: find returns strictly the single first match; use filter for collections.

---

## Summary

- Week 6 (Arrays and Data Manipulation Methods) delivers hands-on algorithmic and practical JavaScript development proficiencies.
- All code adheres strictly to standard ECMAScript specifications, immediately runnable inside browser viewports and CodePlayground.
- In subsequent modules, we progressively expand programmatic capabilities toward a complete interactive web application.
