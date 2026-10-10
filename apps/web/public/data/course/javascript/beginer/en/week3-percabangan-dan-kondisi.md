# Conditionals and Decision Making

> **Category:** JavaScript | **Level:** JavaScript Basics & Logic | **Week 3:** Conditionals and Decision Making
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Master conditional branching structures: if, else if, and else
- Deploy ternary operators (condition ? valA : valB) for concise inline logic
- Structure multi-way branching via switch-case with mandatory break statements
- Understand Truthy and Falsy evaluations across all JavaScript data types
- Deploy the Nullish Coalescing operator (??) for bulletproof default fallbacks

---

## 1. Branching with `if...else if...else`

Conditionals direct programmatic execution branches according to boolean logic:

```javascript
const score = 82;

if (score >= 85) {
  console.log("Grade: A");
} else if (score >= 70) {
  console.log("Grade: B");
} else {
  console.log("Grade: Needs Improvement");
}
```

---

## 2. Ternary Operator

Concise inline conditional assignment:

```javascript
// Format: condition ? valueIfTrue : valueIfFalse
const access = age >= 18 ? "Granted" : "Restricted";
```

---

## 3. Truthy vs Falsy

Every JavaScript value evaluates implicitly to a boolean posture inside conditions:

### The 8 Falsy Values:
1. `false`
2. `0` & `-0`
3. `0n`
4. `""` (Empty string)
5. `null`
6. `undefined`
7. `NaN`

*Every single other value evaluates to **Truthy** (including empty arrays `[]` and empty objects `{}`!)*

---

## 4. Nullish Coalescing (`??`) vs Logical OR (`||`)

- **`||`**: Fallbacks whenever the left operand is **Falsy** (including valid `0` or `""`).
- **`??`**: Fallbacks **strictly** when the left operand is `null` or `undefined`:

```javascript
const score = 0;

const orResult = score || 10;       // 10 (Faulty: 0 was treated as invalid!)
const nullishResult = score ?? 10;  // 0 (Accurate: 0 is preserved)
```

---

## Program: Academic Grading and Access Privilege Evaluator

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Percabangan Logika</title>
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
      max-width: 480px;
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

    .form-group {
      margin-bottom: 16px;
    }

    label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 6px;
    }

    input, select {
      width: 100%;
      padding: 10px;
      border: 1px solid #CBD5E0;
      border-radius: 6px;
      font-size: 14px;
    }

    .btn-eval {
      width: 100%;
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 8px;
    }

    .result-box {
      margin-top: 20px;
      padding: 16px;
      border-radius: 8px;
      font-size: 14px;
      line-height: 1.6;
      display: none;
    }

    .result-pass {
      background-color: #E2F2E9;
      color: #2E5B44;
      border: 1px solid #C6E6D5;
    }

    .result-fail {
      background-color: #FED7D7;
      color: #9B2C2C;
      border: 1px solid #FEB2B2;
    }
  </style>
</head>
<body>

  <div class="card">
    <h3>Evaluasi Kelulusan Siswa</h3>

    <div class="form-group">
      <label for="skor-input">Skor Ujian (0 - 100):</label>
      <input type="number" id="skor-input" value="78" min="0" max="100">
    </div>

    <div class="form-group">
      <label for="kehadiran-input">Persentase Kehadiran (%):</label>
      <input type="number" id="kehadiran-input" value="85" min="0" max="100">
    </div>

    <button class="btn-eval" onclick="evaluasi()">Evaluasi Status</button>

    <div id="result" class="result-box"></div>
  </div>

  <script>
    function evaluasi() {
      const skor = Number(document.getElementById("skor-input").value);
      const kehadiran = Number(document.getElementById("kehadiran-input").value);
      const resultBox = document.getElementById("result");

      // 1. Menentukan Huruf Mutu (if-else if-else)
      let grade = "E";
      let keterangan = "";

      if (skor >= 85) {
        grade = "A";
        keterangan = "Istimewa (Sangat Memuaskan)";
      } else if (skor >= 75) {
        grade = "B";
        keterangan = "Baik (Memuaskan)";
      } else if (skor >= 60) {
        grade = "C";
        keterangan = "Cukup (Lulus Standar)";
      } else {
        grade = "D";
        keterangan = "Kurang (Tidak Memenuhi Standar)";
      }

      // 2. Evaluasi Kelulusan Multi-Kondisi dengan Operator Logika (&&)
      const syaratLulus = (skor >= 60) && (kehadiran >= 75);

      // 3. Menentukan Pesan Akhir dengan Ternary Operator
      const statusTeks = syaratLulus ? "LULUS" : "TIDAK LULUS";

      // 4. Render Hasil ke DOM
      resultBox.style.display = "block";
      resultBox.className = "result-box " + (syaratLulus ? "result-pass" : "result-fail");

      resultBox.innerHTML = `
        <strong>STATUS: ${statusTeks}</strong><br>
        Grade Nilai: <strong>${grade}</strong> (${keterangan})<br>
        Skor: ${skor} | Kehadiran: ${kehadiran}%<br>
        ${!syaratLulus && kehadiran < 75 ? "<em>Peringatan: Kehadiran di bawah batas minimum 75%!</em>" : ""}
      `;
    }

    evaluasi();
  </script>

</body>
</html>
```

---

## Detailed Code Breakdown

- `Number(...)`: Explicitly casts string input values to numeric primitives preventing string comparison anomalies.
- `if (skor >= 85) ... else if ...`: Evaluates scoring bounds sequentially from highest to lowest thresholds.
- `(skor >= 60) && (kehadiran >= 75)`: Enforces strict conjunction where both sub-conditions must be true.
- `syaratLulus ? "LULUS" : "TIDAK LULUS"`: Inline ternary operator assigning concise conditional output.
- `resultBox.className = ...`: Dynamically shifts styling classes to render green (pass) or red (fail) feedback surfaces.

---

## Playground Experiments

1. Adjust variable bindings, arguments, or strings inside the Playground editor and observe live runtime output shifts.
2. Introduce new conditional branches or helper functions relevant to your scenarios.
3. Inspect the browser Developer Console (F12) to trace runtime execution telemetry.

---

## Practical Challenge

Apply Week 3 core concepts inside your project's main.js file. Verify const vs let discipline, guard against null/undefined values, and maintain descriptive variable naming.

---

## Common Pitfalls & Debugging

- Omitting Number() conversion on form inputs: Input values return strings ("80"). Under lexical string rules, "9" > "80" evaluates to true!
- Inverted condition ordering: Checking if (score >= 60) first intercepts score 90, preventing it from reaching the grade A branch.
- Accidental assignment with = instead of ===: Writing if (score = 100) reassigns the binding and evaluates truthy every time.
- Missing break in switch statements: Forgetting break triggers unintended case fall-through.

---

## Summary

- Week 3 (Conditionals and Decision Making) delivers hands-on algorithmic and practical JavaScript development proficiencies.
- All code adheres strictly to standard ECMAScript specifications, immediately runnable inside browser viewports and CodePlayground.
- In subsequent modules, we progressively expand programmatic capabilities toward a complete interactive web application.
