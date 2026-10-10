# Variables, Data Types, and Operators

> **Category:** JavaScript | **Level:** JavaScript Basics & Logic | **Week 2:** Variables, Data Types, and Operators
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Distinguish variable keywords: const (immutable binding), let (reassignable), and obsolete var
- Master 7 primitive data types: string, number, boolean, null, undefined, symbol, bigint
- Deploy arithmetic (+, -, *, /, %, **) and assignment operators (+=, -=)
- Differentiate strict equality (===) from loose equality (==) to prevent coercion bugs
- Format expressive string interpolation using Template Literals (${})

---

## 1. Golden Declaration Rule: `const` vs `let` vs `var`

- **`const` (Default Standard)**: Assign to bindings that will never be reassigned. Eliminates accidental mutation bugs.
- **`let`**: Reserve strictly for bindings requiring mutable reassignment (counters, loop iterators).
- **`var` (Obsolete)**: Deprecated in modern engineering due to function-scoping leaks and unpredictable hoisting.

```javascript
const storeName = "Nusa Store";
let itemCount = 3;
itemCount = itemCount + 1; // Valid under let!
```

---

## 2. The 7 Primitive Types

```text
┌───────────┬───────────────────────────────┬────────────────────────────┐
│ Type      │ Description                   │ Example                    │
├───────────┼───────────────────────────────┼────────────────────────────┤
│ string    │ Textual sequences             │ "Hello", 'World', `Web`    │
│ number    │ Floats and integers           │ 42, 3.14, -10              │
│ boolean   │ Logical truth flags           │ true, false                │
│ null      │ Intentional absence of value  │ null                       │
│ undefined │ Uninitialized binding         │ let x; (evaluates undefined│
│ bigint    │ Arbitrary precision integers  │ 9007199254740991n          │
│ symbol    │ Unique immutable identifier   │ Symbol("id")               │
└───────────┴───────────────────────────────┴────────────────────────────┘
```

Inspect runtime types with `typeof`:
```javascript
console.log(typeof "Hello"); // "string"
console.log(typeof 100);     // "number"
```

---

## 3. Strict Equality: Why `===` is Mandatory

JavaScript performs implicit *Type Coercion* under loose equality (`==`):

```javascript
// HAZARDOUS (Loose Equality):
"5" == 5;   // true! (Implicit coercion string to number)
0 == false;  // true!

// STRICT (Safe Standard):
"5" === 5;   // false! (Types differ: string vs number)
0 === false;  // false!
```

**Inviolable Rule:** Always enforce strict equality (`===` and `!==`).

---

## Program: Retail Cashier Calculator with Runtime Type Verification

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Variabel dan Operator</title>
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

    .card {
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
      margin-bottom: 12px;
    }

    .bill-receipt {
      background-color: #F7FAFC;
      border: 1px solid #EDF2F7;
      border-radius: 8px;
      padding: 16px;
      font-family: "Courier New", Courier, monospace;
      font-size: 13px;
      white-space: pre-line;
      line-height: 1.7;
      margin-bottom: 16px;
    }

    .type-check-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      margin-top: 12px;
    }

    .type-check-table th, .type-check-table td {
      border: 1px solid #E2E8F0;
      padding: 6px 10px;
      text-align: left;
    }

    .type-check-table th {
      background-color: #EDF2F7;
      color: #4A5568;
    }
  </style>
</head>
<body>

  <div class="card">
    <h3>Struk Kasir: Kalkulasi Nilai Data</h3>
    <div id="receipt" class="bill-receipt">Memuat struk transaksi...</div>

    <table class="type-check-table">
      <thead>
        <tr>
          <th>Variabel</th>
          <th>Nilai</th>
          <th>typeof</th>
        </tr>
      </thead>
      <tbody id="type-tbody"></tbody>
    </table>
  </div>

  <script>
    // 1. Deklarasi Data Transaksi
    const namaProduk = "Buku Panduan Web";
    const hargaSatuan = 85000;
    let kuantitas = 2;
    const persentaseDiskon = 0.10; // Diskon 10%
    const statusMember = true;

    // 2. Operasi Aritmatika
    const subtotal = hargaSatuan * kuantitas;
    const nominalDiskon = subtotal * persentaseDiskon;
    const totalBayar = subtotal - nominalDiskon;

    // 3. Format Struk dengan Template Literals
    const struk = [
      "========================================",
      "             TOKO BUKU NUSA             ",
      "========================================",
      `Item        : ${namaProduk}`,
      `Harga       : Rp ${hargaSatuan.toLocaleString("id-ID")}`,
      `Jumlah      : ${kuantitas} pcs`,
      `Subtotal    : Rp ${subtotal.toLocaleString("id-ID")}`,
      `Diskon (10%): -Rp ${nominalDiskon.toLocaleString("id-ID")}`,
      "----------------------------------------",
      `TOTAL BAYAR : Rp ${totalBayar.toLocaleString("id-ID")}`,
      `Member VIP  : ${statusMember === true ? "YA (Aktif)" : "TIDAK"}`,
      "========================================"
    ].join("\n");

    document.getElementById("receipt").textContent = struk;

    // 4. Verifikasi Tipe Data Runtime (typeof)
    const inspeksiData = [
      { nama: "namaProduk", nilai: namaProduk, tipe: typeof namaProduk },
      { nama: "hargaSatuan", nilai: hargaSatuan, tipe: typeof hargaSatuan },
      { nama: "kuantitas", nilai: kuantitas, tipe: typeof kuantitas },
      { nama: "persentaseDiskon", nilai: persentaseDiskon, tipe: typeof persentaseDiskon },
      { nama: "statusMember", nilai: String(statusMember), tipe: typeof statusMember }
    ];

    const tbody = document.getElementById("type-tbody");
    inspeksiData.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><code>${item.nama}</code></td>
        <td>${item.nilai}</td>
        <td><strong>${item.tipe}</strong></td>
      `;
      tbody.appendChild(tr);
    });
  </script>

</body>
</html>
```

---

## Detailed Code Breakdown

- `const hargaSatuan = 85000`: Secures unit pricing immutably with `const` preventing accidental overwrite.
- `let kuantitas = 2`: Deploys mutable `let` for inventory quantities subject to alteration.
- `subtotal * persentaseDiskon`: Standard arithmetic multiplication computing percentage discounts.
- ``Item: ${namaProduk}``: Template literals streamlining inline expression interpolation inside backticks.
- `typeof`: Inspects runtime typing ensuring numeric values are not misclassified as strings.

---

## Playground Experiments

1. Adjust variable bindings, arguments, or strings inside the Playground editor and observe live runtime output shifts.
2. Introduce new conditional branches or helper functions relevant to your scenarios.
3. Inspect the browser Developer Console (F12) to trace runtime execution telemetry.

---

## Practical Challenge

Apply Week 2 core concepts inside your project's main.js file. Verify const vs let discipline, guard against null/undefined values, and maintain descriptive variable naming.

---

## Common Pitfalls & Debugging

- String arithmetic pitfalls: Adding "10" + 5 results in "105" instead of 15 due to implicit string concatenation.
- Using loose == equality: Introduces subtle bugs when evaluating falsy equivalents like 0 == "" or false == 0.
- Reassigning const variables: Attempting to assign new values to const triggers a fatal TypeError.
- Omitting braces in template literals: Writing $namaProduk instead of ${namaProduk} prints literal text.

---

## Summary

- Week 2 (Variables, Data Types, and Operators) delivers hands-on algorithmic and practical JavaScript development proficiencies.
- All code adheres strictly to standard ECMAScript specifications, immediately runnable inside browser viewports and CodePlayground.
- In subsequent modules, we progressively expand programmatic capabilities toward a complete interactive web application.
