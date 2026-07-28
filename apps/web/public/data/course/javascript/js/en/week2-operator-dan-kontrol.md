# Operators & Control Flow

> JavaScript | Module 2

## Learning Objectives

- Master arithmetic, comparison, and logical operators
- Use if/else and switch for decision making
- Understand for, while, and for...of loops
- Distinguish == vs === and truthy/falsy values
- Combine control flow in simple programs

---

## Program: Simple Calculator

```html
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Operator & Control Flow</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}input,select{padding:.4rem;border:1px solid #ccc;border-radius:4px}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer}</style></head>
<body>
<h1>Kalkulator & Control Flow</h1>
<div class="card">
  <h2>Operator Aritmatika</h2>
  <input type="number" id="num1" value="10">
  <input type="number" id="num2" value="3">
  <button onclick="hitung()">Hitung</button>
  <pre id="hasilArit" style="background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px;margin-top:.5rem"></pre>
</div>
<div class="card">
  <h2>Grade Nilai (if/else)</h2>
  <input type="number" id="nilai" placeholder="Masukkan nilai" min="0" max="100">
  <button onclick="cekGrade()">Cek Grade</button>
  <p id="hasilGrade"></p>
</div>
<div class="card">
  <h2>Tabel Perkalian (loop)</h2>
  <input type="number" id="tabel" value="5" min="1" max="10">
  <button onclick="buatTabel()">Buat Tabel</button>
  <pre id="hasilTabel" style="background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px"></pre>
</div>
<script>
  function hitung() {
    let a = Number(document.getElementById("num1").value);
    let b = Number(document.getElementById("num2").value);
    document.getElementById("hasilArit").textContent =
      `${a} + ${b} = ${a + b}\n${a} - ${b} = ${a - b}\n${a} × ${b} = ${a * b}\n${a} ÷ ${b} = ${(a / b).toFixed(2)}\n${a} % ${b} = ${a % b}`;
    console.log("Operator:", a, b, "→", a + b, a - b, a * b, a / b);
  }
  function cekGrade() {
    let n = Number(document.getElementById("nilai").value);
    let grade;
    if (n >= 90) grade = "A (Sempurna!)";
    else if (n >= 80) grade = "B (Baik)";
    else if (n >= 70) grade = "C (Cukup)";
    else if (n >= 60) grade = "D (Kurang)";
    else grade = "E (Remidi)";
    document.getElementById("hasilGrade").innerHTML = `Nilai ${n}: <strong>${grade}</strong>`;
  }
  function buatTabel() {
    let n = Number(document.getElementById("tabel").value);
    let out = "";
    for (let i = 1; i <= 10; i++) {
      out += `${n} × ${i} = ${n * i}\n`;
    }
    document.getElementById("hasilTabel").textContent = out;
  }
</script>
</body>
</html>
```

---

## Explanation

### Arithmetic Operators
`+`, `-`, `*`, `/`, `%` for basic calculations. `%` gives the remainder.

### Comparison Operators
`===` (strict equality) checks both value AND type. `==` only checks value (with coercion). Always use `===`.

### Truthy & Falsy
Falsy values: `false`, `0`, `""`, `null`, `undefined`, `NaN`. Everything else is truthy.

### Loops
`for` — iterate with a counter. `while` — while condition is true. `for...of` — for arrays.

---

## Experiments

1. **Change grade values: is the if/else correct?**
1. **Replace `===` with `==`** — see the difference
1. **Create a loop that only prints even numbers**
1. **Add logical operators: check values between 80-100**

---

## Challenge

Create a "Number Guessing" game: the computer picks a random number 1-100, user guesses. Give hints "higher" or "lower". Count the number of attempts. Use loops and conditionals.

---

## Summary

Operators and control flow are the foundation of programming logic. With if/else, switch, and loops, you can control code execution flow. Next module: **Functions** — reusable code building blocks.
