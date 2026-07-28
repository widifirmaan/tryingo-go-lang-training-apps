# JavaScript Basics

> JavaScript | Module 1

## Learning Objectives

- Understand let, const variables and their differences
- Learn data types: string, number, boolean, null, undefined
- Use console.log for debugging
- Write comments and basic JavaScript syntax
- Understand case sensitivity and naming conventions

---

## Program: Hello JavaScript

```html
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Dasar JavaScript</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem;line-height:1.6}h2{color:#B8860B;border-bottom:2px solid #F7DF1E;padding-bottom:.3rem}pre{background:#1e1e1e;color:#f8f8f2;padding:1rem;border-radius:8px;overflow-x:auto}.output{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}button{background:#F7DF1E;color:#000;border:none;padding:.5rem 1.2rem;border-radius:6px;cursor:pointer;font-weight:bold}button:hover{background:#e6cf1a}</style></head>
<body>
<h1>Hello JavaScript!</h1>
<p>Buka <strong>Console</strong> (F12) untuk melihat output.</p>
<script>
  // VARIABEL
  let nama = "Aulia";
  const umur = 20;
  var kota = "Jakarta";

  // TIPE DATA
  let teks = "Halo Dunia";
  let angka = 42;
  let desimal = 3.14;
  let isActive = true;
  let kosong = null;
  let tidakDidefinisikan;

  console.log("Nama:", nama, "| Tipe:", typeof nama);
  console.log("Umur:", umur, "| Tipe:", typeof umur);
  console.log("Aktif:", isActive, "| Tipe:", typeof isActive);
  console.log("Null:", kosong, "| Tipe:", typeof kosong);
  console.log("Undefined:", tidakDidefinisikan, "| Tipe:", typeof tidakDidefinisikan);

  // OUTPUT KE HALAMAN
  document.getElementById("output").innerHTML = `
    <p><strong>Nama:</strong> ${nama}</p>
    <p><strong>Umur:</strong> ${umur}</p>
    <p><strong>Kota:</strong> ${kota}</p>
    <p><strong>Angka favorit:</strong> ${angka}</p>
  `;
</script>
<h2>Output</h2>
<div class="output" id="output"></div>
<button onclick="document.getElementById('output').innerHTML += '<p>Tombol diklik!</p>'">Klik Saya</button>
</body>
</html>
```

---

## Explanation

### Variables
Use `let` for changeable values, `const` for fixed values. Avoid `var` due to scope issues.

### Data Types
JavaScript has 7 primitive types: string, number, boolean, null, undefined, symbol, bigint. Everything else is an object.

### Console
`console.log()` is your primary debugging tool. Open DevTools (F12) to see output.

### Naming Conventions
Use camelCase for variables and functions. Names must start with a letter, `$`, or `_`.

---

## Experiments

1. **Change the `nama` variable to your name**
1. **Add a new variable: `hobi` as a string**
1. **Try `console.table()` to display data**
1. **Change `const` to `let`** — what happens?

---

## Challenge

Create a personal profile page that displays name, age, hobbies, and education using JavaScript variables. Display the data on the HTML page and in the browser console. Use at least 3 different data types.

---

## Summary

JavaScript is a dynamic and flexible language. You have learned variables, data types, and basic syntax. Next module: **Operators & Control Flow** — how to make decisions and loop in code.
