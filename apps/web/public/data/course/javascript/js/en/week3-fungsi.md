# Functions

> JavaScript | Module 3

## Learning Objectives

- Create functions with declarations, expressions, and arrows
- Understand parameters, return values, and default parameters
- Learn global, local, and block scope
- Use callback functions
- Apply functions as first-class citizens

---

## Program: Grade Manager

```html
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Fungsi</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}input{padding:.4rem;border:1px solid #ccc;border-radius:4px}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer}pre{background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px}</style></head>
<body>
<h1>Manajemen Nilai Siswa</h1>
<div class="card">
  <h2>Tambah Nilai</h2>
  <input type="text" id="namaSiswa" placeholder="Nama siswa">
  <input type="number" id="nilaiSiswa" placeholder="Nilai">
  <button onclick="tambahNilai()">Tambah</button>
</div>
<div class="card">
  <button onclick="hitungRata()">Hitung Rata-rata</button>
  <button onclick="tampilkanLulus()">Siswa Lulus</button>
  <button onclick="resetNilai()">Reset</button>
</div>
<pre id="output">Data siswa akan tampil di sini</pre>
<script>
  let daftarNilai = [];

  // FUNCTION DECLARATION
  function tambahNilai() {
    let nama = document.getElementById("namaSiswa").value.trim();
    let nilai = Number(document.getElementById("nilaiSiswa").value);
    if (!nama || isNaN(nilai)) { alert("Isi nama dan nilai!"); return; }
    daftarNilai.push({ nama, nilai });
    render();
  }

  // ARROW FUNCTION
  const hitungRata = () => {
    if (daftarNilai.length === 0) return 0;
    let total = daftarNilai.reduce((sum, s) => sum + s.nilai, 0);
    return total / daftarNilai.length;
  };

  // FUNCTION WITH CALLBACK
  function filterNilai(kriteria) {
    return daftarNilai.filter(kriteria);
  }

  const tampilkanLulus = () => {
    let lulus = filterNilai(s => s.nilai >= 70);
    console.log("Siswa lulus:", lulus);
    alert(`Siswa lulus: ${lulus.length} orang`);
  };

  // HIGHER-ORDER FUNCTION
  function resetNilai() {
    daftarNilai = [];
    render();
    console.log("Data direset");
  }

  function render() {
    let out = `Total siswa: ${daftarNilai.length}\n`;
    daftarNilai.forEach((s, i) => {
      out += `${i + 1}. ${s.nama}: ${s.nilai}\n`;
    });
    if (daftarNilai.length > 0) {
      out += `\nRata-rata: ${hitungRata().toFixed(1)}`;
    }
    document.getElementById("output").textContent = out || "Belum ada data";
  }
</script>
</body>
</html>
```

---

## Explanation

### Declarations vs Expressions
Declarations can be called before definition (hoisting). Expressions cannot.

### Arrow Functions
More concise, do not have their own `this`. Great for callbacks.

### Scope
Variables inside a function are only accessible within that function. `let` and `const` have block scope.

### Callbacks
Functions passed as arguments to other functions. The foundation for async JavaScript.

---

## Experiments

1. **Create a `average(arr)` function that calculates array average**
1. **Convert arrow function to function declaration**
1. **Add default parameters to tambahNilai function**
1. **Create a calculator function that takes an operator parameter**

---

## Challenge

Create a scientific calculator with functions: add, subtract, multiply, divide, power, square root, and factorial. Use function declarations, arrow functions, and callbacks. Display results on the page.

---

## Summary

Functions are first-class citizens in JavaScript. You have learned declarations, arrow functions, scope, and callbacks. Next module: **Arrays & Methods** — data structures for collections of information.
