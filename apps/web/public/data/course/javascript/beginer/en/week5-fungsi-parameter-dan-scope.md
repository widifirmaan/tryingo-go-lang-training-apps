# Functions, Parameters, and Scope

> **Category:** JavaScript | **Level:** JavaScript Basics & Logic | **Week 5:** Functions, Parameters, and Scope
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Master Function Declarations vs Function Expressions vs Arrow Functions (=>)
- Manage input parameters, arguments, and Default Parameters
- Direct output data pipelines using the return statement
- Understand Scope boundaries: Global Scope vs Function Scope vs Block Scope
- Construct a utility function toolkit for geometry and currency formatting (Level 1 Capstone)

---

## 1. Three Function Syntaxes

Functions encapsulate reusable logic blocks:

### A. Function Declaration (Hoisted)
```javascript
function calculateArea(length, width) {
  return length * width;
}
```

### B. Function Expression
```javascript
const calculateArea = function(length, width) {
  return length * width;
};
```

### C. Arrow Function (Modern & Concise)
```javascript
const calculateArea = (length, width) => length * width;
```

---

## 2. Default Parameters & the `return` Pipeline

Assign baseline fallbacks to parameter signatures:

```javascript
function applyDiscount(price, discount = 0.05) {
  return price * (1 - discount);
}

applyDiscount(100000);       // Uses default 5% -> 95000
applyDiscount(100000, 0.20); // Uses explicit 20% -> 80000
```

- The **`return`** keyword halts execution and transmits output back to the caller. Without `return`, functions resolve to `undefined`.

---

## 3. Scope Boundaries: Where Do Variables Live?

```text
┌────────────────────────────────────────────────────────┐
│ GLOBAL SCOPE (Accessible universally)                  │
│ const tax = 0.11;                                      │
│                                                        │
│   function processOrder() {                            │
│     // FUNCTION SCOPE                                  │
│     const orderId = 101;                               │
│                                                        │
│     if (orderId > 100) {                               │
│       // BLOCK SCOPE ({ ... } with let/const)          │
│       const discount = 5000;                           │
│     }                                                  │
│     // discount is UNREACHABLE here!                   │
│   }                                                    │
│   // orderId is UNREACHABLE here!                      │
└────────────────────────────────────────────────────────┘
```

---

## Program: Mathematical Toolkit and Currency Formatting Utility

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Fungsi dan Scope</title>
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
      max-width: 520px;
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

    .grid-inputs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }

    label {
      font-size: 13px;
      font-weight: 600;
      display: block;
      margin-bottom: 4px;
    }

    input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #CBD5E0;
      border-radius: 6px;
      font-size: 14px;
    }

    .btn-calc {
      width: 100%;
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      margin-bottom: 16px;
    }

    .result-panel {
      background-color: #F7FAFC;
      border: 1px solid #EDF2F7;
      border-radius: 8px;
      padding: 16px;
      font-size: 14px;
      line-height: 1.8;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Pustaka Utilitas Finansial & Geometri</h3>

    <div class="grid-inputs">
      <div>
        <label>Harga Barang (Rp):</label>
        <input type="number" id="input-harga" value="150000">
      </div>
      <div>
        <label>Diskon (%):</label>
        <input type="number" id="input-diskon" value="15">
      </div>
      <div>
        <label>Panjang Ruang (m):</label>
        <input type="number" id="input-panjang" value="8">
      </div>
      <div>
        <label>Lebar Ruang (m):</label>
        <input type="number" id="input-lebar" value="5">
      </div>
    </div>

    <button class="btn-calc" onclick="jalankanKalkulasi()">Hitung Semua Nilai</button>

    <div id="output" class="result-panel"></div>
  </div>

  <script>
    // ── PUSTAKA FUNGSI UTILITY (MODULAR & REUSABLE) ──

    // 1. Fungsi Arrow: Format Rupiah
    const formatRupiah = (angka) => {
      return "Rp " + Number(angka).toLocaleString("id-ID");
    };

    // 2. Fungsi Deklarasi: Hitung Diskon dengan Default Parameter
    function hitungTotalSetelahDiskon(harga, persenDiskon = 0) {
      const potongan = harga * (persenDiskon / 100);
      return harga - potongan;
    }

    // 3. Fungsi Arrow Satu Baris: Hitung Luas Ruang
    const hitungLuasRuang = (p, l) => p * l;

    // 4. Fungsi Arrow: Hitung Keliling
    const hitungKeliling = (p, l) => 2 * (p + l);

    // ── EKSEKUSI INTEGRASI ──
    function jalankanKalkulasi() {
      const harga = Number(document.getElementById("input-harga").value);
      const diskon = Number(document.getElementById("input-diskon").value);
      const p = Number(document.getElementById("input-panjang").value);
      const l = Number(document.getElementById("input-lebar").value);

      const hargaAkhir = hitungTotalSetelahDiskon(harga, diskon);
      const luas = hitungLuasRuang(p, l);
      const keliling = hitungKeliling(p, l);

      document.getElementById("output").innerHTML = `
        <strong>Hasil Perhitungan Finansial:</strong><br>
        • Harga Awal: ${formatRupiah(harga)}<br>
        • Diskon (${diskon}%): -${formatRupiah(harga - hargaAkhir)}<br>
        • <strong>Total Bayar: ${formatRupiah(hargaAkhir)}</strong><br>
        <hr style="margin: 10px 0; border: 0; border-top: 1px solid #E2E8F0;">
        <strong>Hasil Perhitungan Geometri:</strong><br>
        • Luas Ruangan: <strong>${luas} m²</strong><br>
        • Keliling: <strong>${keliling} m</strong>
      `;
    }

    jalankanKalkulasi();
  </script>

</body>
</html>
```

---

## Detailed Code Breakdown

- `formatRupiah`: Arrow function encapsulating locale-sensitive currency formatting.
- `persenDiskon = 0`: Safe default parameter assignment preventing NaN calculation bugs.
- `return harga - potongan`: Emits computed values back into the application data flow.
- `(p, l) => p * l`: Concise arrow function with implicit return semantics.
- Pure Function architecture: Calculators operate exclusively on arguments without mutating global state.

---

## Playground Experiments

1. Adjust variable bindings, arguments, or strings inside the Playground editor and observe live runtime output shifts.
2. Introduce new conditional branches or helper functions relevant to your scenarios.
3. Inspect the browser Developer Console (F12) to trace runtime execution telemetry.

---

## Practical Challenge

Apply Week 5 core concepts inside your project's main.js file. Verify const vs let discipline, guard against null/undefined values, and maintain descriptive variable naming.

---

## Common Pitfalls & Debugging

- Missing return statement: Functions without explicit return statements resolve to undefined.
- Accessing variables outside block scope: Reading let/const declared inside if/for blocks triggers a ReferenceError.
- Inverted argument ordering: Calling (price, discount) with (10, 50000) causes incorrect math.
- Brace confusion with arrow functions: Wrapping arrow bodies in curly braces { } requires an explicit return statement.

---

## Summary

- Week 5 (Functions, Parameters, and Scope) delivers hands-on algorithmic and practical JavaScript development proficiencies.
- All code adheres strictly to standard ECMAScript specifications, immediately runnable inside browser viewports and CodePlayground.
- In subsequent modules, we progressively expand programmatic capabilities toward a complete interactive web application.
