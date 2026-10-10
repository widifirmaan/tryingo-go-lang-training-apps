# Loops and Data Iteration

> **Category:** JavaScript | **Level:** JavaScript Basics & Logic | **Week 4:** Loops and Data Iteration
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Master standard for loops (initialization, condition, increment)
- Understand while and do-while loop mechanics and control distinctions
- Deploy modern for...of loops for clean array sequence traversal
- Direct loop interruption using break (terminate) and continue (skip)
- Implement accumulator patterns to compute aggregations across collections

---

## 1. Standard `for` Loop

Utilized when iteration boundaries are known in advance:

```javascript
// for (initialization; condition; increment)
for (let i = 1; i <= 5; i++) {
  console.log("Iteration " + i);
}
```

---

## 2. `while` vs `do...while`

- **`while`**: Evaluates conditions **before** execution. Skips entirely if initial condition is false.
- **`do...while`**: Evaluates conditions **after** execution. Guaranteed to run **at least once**.

```javascript
let balance = 100;
while (balance > 0) {
  balance -= 25;
}
```

---

## 3. Clean Traversal with `for...of`

The modern standard for iterating array items:

```javascript
const cities = ["Jakarta", "Bandung", "Surabaya"];

for (const city of cities) {
  console.log("City: " + city);
}
```

---

## 4. Loop Flow: `break` and `continue`

- **`break`**: Halts and terminates loop execution instantly.
- **`continue`**: Aborts current iteration and advances immediately to the next cycle.

```javascript
for (let i = 1; i <= 10; i++) {
  if (i === 3) continue; // Skips 3
  if (i === 8) break;    // Halts at 8
  console.log(i); // Outputs: 1, 2, 4, 5, 6, 7
}
```

---

## Program: Multiplication Table Generator and Sequence Analyzer

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Perulangan dan Iterasi</title>
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

    .controls {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
    }

    select, button {
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 14px;
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

    .table-display {
      background-color: #F7FAFC;
      border: 1px solid #EDF2F7;
      border-radius: 8px;
      padding: 16px;
      font-family: "Courier New", Courier, monospace;
      font-size: 13px;
      line-height: 1.6;
      white-space: pre-line;
      max-height: 260px;
      overflow-y: auto;
    }

    .summary-bar {
      margin-top: 16px;
      padding: 12px;
      background-color: #E2F2E9;
      color: #2E5B44;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Generator Tabel Perkalian Matematika</h3>

    <div class="controls">
      <select id="angka-select">
        <option value="5">Perkalian 5</option>
        <option value="7">Perkalian 7</option>
        <option value="8">Perkalian 8</option>
        <option value="12">Perkalian 12</option>
      </select>
      <button onclick="buatTabel()">Generate</button>
    </div>

    <div id="output" class="table-display"></div>
    <div id="summary" class="summary-bar"></div>
  </div>

  <script>
    function buatTabel() {
      const pengali = Number(document.getElementById("angka-select").value);
      const outputElem = document.getElementById("output");
      const summaryElem = document.getElementById("summary");

      const barisTabel = [];
      let totalAkumulator = 0;

      // 1. Perulangan for Klasik (1 sampai 10)
      for (let i = 1; i <= 10; i++) {
        const hasil = pengali * i;
        totalAkumulator += hasil; // Pola Akumulator

        // Formatting baris tabel
        const paddingI = i < 10 ? " " + i : i;
        barisTabel.push(`${pengali} x ${paddingI} = ${hasil}`);
      }

      outputElem.textContent = barisTabel.join("\n");

      // 2. Ringkasan Hasil
      summaryElem.textContent = `Total Akumulasi Seluruh Hasil (1 s/d 10): ${totalAkumulator.toLocaleString("id-ID")}`;
    }

    // Eksekusi awal
    buatTabel();
  </script>

</body>
</html>
```

---

## Detailed Code Breakdown

- `for (let i = 1; i <= 10; i++)`: Systematic iteration sequence marching index `i` from 1 through 10.
- `totalAkumulator += hasil`: Accumulator operator adding successive products into a persistent running total.
- `barisTabel.push(...)`: Appends each calculated calculation line into an array collection.
- `barisTabel.join("\n")`: Concatenates array items with newline delimiters in a single operational step.
- DOM optimization: Buffering strings inside an array and rendering once prevents repetitive browser paint cycles.

---

## Playground Experiments

1. Adjust variable bindings, arguments, or strings inside the Playground editor and observe live runtime output shifts.
2. Introduce new conditional branches or helper functions relevant to your scenarios.
3. Inspect the browser Developer Console (F12) to trace runtime execution telemetry.

---

## Practical Challenge

Apply Week 4 core concepts inside your project's main.js file. Verify const vs let discipline, guard against null/undefined values, and maintain descriptive variable naming.

---

## Common Pitfalls & Debugging

- Infinite loops: Forgetting iterator increments inside while loops freezes browser tabs permanently.
- Off-by-one boundaries: Using < 10 instead of <= 10 stops execution prematurely at 9.
- Mutating DOM inside loop bodies: Calling innerHTML += inside large loops degrades performance drastically.
- Using for...in on arrays: for...in iterates object keys; use for...of for sequential array item traversal.

---

## Summary

- Week 4 (Loops and Data Iteration) delivers hands-on algorithmic and practical JavaScript development proficiencies.
- All code adheres strictly to standard ECMAScript specifications, immediately runnable inside browser viewports and CodePlayground.
- In subsequent modules, we progressively expand programmatic capabilities toward a complete interactive web application.
