# Modern JavaScript

> JavaScript | Module 8

## Learning Objectives

- Import and export ES6 modules
- Create classes with constructor and methods
- Use template literals for strings
- Apply optional chaining and nullish coalescing
- Understand Map, Set, and modern data structures

---

## Program: ES6+ Features Demo

```html
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>JavaScript Modern</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer;margin:2px}pre{background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px}</style></head>
<body>
<h1>Demo Fitur ES6+</h1>
<div class="card">
  <button onclick="demoTemplate()">Template Literal</button>
  <button onclick="demoClass()">Class & Extends</button>
  <button onclick="demoOptional()">Optional Chaining</button>
  <button onclick="demoMapSet()">Map & Set</button>
  <button onclick="demoDestruct()">Destructuring</button>
</div>
<pre id="output">Klik tombol untuk demo fitur ES6+</pre>
<script>
  // TEMPLATE LITERAL
  function demoTemplate() {
    let name = "Budi", role = "Developer";
    let msg = `Halo, nama saya ${name}!\nSaya seorang ${role}.\nTahun ini saya berusia ${2026 - 2000} tahun.`;
    document.getElementById("output").textContent = msg;
  }
  // CLASS
  function demoClass() {
    class Animal {
      constructor(nama) { this.nama = nama; }
      bersuara() { return `${this.nama} membuat suara`; }
    }
    class Kucing extends Animal {
      bersuara() { return `${this.nama} mengeong: Meow!`; }
    }
    class Anjing extends Animal {
      bersuara() { return `${this.nama} menggonggong: Woof!`; }
    }
    let kucing = new Kucing("Mimi");
    let anjing = new Anjing("Doggy");
    document.getElementById("output").textContent =
      kucing.bersuara() + "\n" + anjing.bersuara();
  }
  // OPTIONAL CHAINING
  function demoOptional() {
    let user = { nama: "Siti", alamat: { kota: "Jakarta" } };
    let user2 = { nama: "Ali" };
    let kota1 = user?.alamat?.kota ?? "Tidak diketahui";
    let kota2 = user2?.alamat?.kota ?? "Tidak diketahui";
    document.getElementById("output").textContent =
      `user.alamat.kota: ${kota1}\nuser2.alamat.kota: ${kota2}`;
  }
  // MAP & SET
  function demoMapSet() {
    let skor = new Map();
    skor.set("Budi", 85); skor.set("Siti", 92); skor.set("Ali", 78);
    let nilaiUnik = new Set([85, 92, 78, 85, 92]);
    let out = "Map (Nilai Siswa):\n";
    skor.forEach((v, k) => { out += `  ${k}: ${v}\n`; });
    out += "\nSet (Nilai Unik): [" + [...nilaiUnik].join(", ") + "]";
    document.getElementById("output").textContent = out;
  }
  // DESTRUCTURING
  function demoDestruct() {
    let arr = [10, 20, 30, 40];
    let [a, b, ...sisa] = arr;
    let obj = { x: 100, y: 200 };
    let { x, y } = obj;
    document.getElementById("output").textContent =
      `Array: a=${a}, b=${b}, sisa=[${sisa}]\nObjek: x=${x}, y=${y}`;
  }
</script>
</body>
</html>
```

---

## Explanation

### Template Literals
Use backticks `` for multi-line strings and `${}` interpolation.

### Classes
Syntactic sugar for constructor functions. Supports `extends` for inheritance.

### Optional Chaining
`obj?.prop?.sub` — safely access nested properties without error on null.

### Nullish Coalescing
`val ?? defaultValue` — use default only if val is `null` or `undefined` (not other falsy values).

### Map & Set
`Map` — objects with any key type (not just strings). `Set` — collection of unique values.

---

## Experiments

1. **Create a `Car` class with brand, year properties and info() method**
1. **Use template literals to create dynamic HTML**
1. **Implement private class fields (#) for sensitive data**
1. **Create method chaining on a class (methods return this)**

---

## Challenge

Create a `BankAccount` class with properties: ownerName, accountNumber, balance. Methods: deposit(add), withdraw(subtract), checkBalance(). Create a `SavingsAccount` class that extends with a calculateInterest() method. Implement private fields for balance.

---

## Summary

ES6+ brings many new features that make JavaScript more expressive and maintainable: template literals, classes, modules, optional chaining. Next module: **Asynchronous JavaScript** — handling async operations like network requests.
