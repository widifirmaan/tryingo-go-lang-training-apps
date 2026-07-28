# Advanced Concepts

> JavaScript | Module 11

## Learning Objectives

- Understand closures and their use cases
- Master this binding: call, apply, bind
- Learn prototype chain and inheritance
- Apply debounce and throttle
- Use Module pattern and IIFE

---

## Program: Notes App

```html
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Konsep Lanjutan</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}input{padding:.4rem;border:1px solid #ccc;border-radius:4px}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer;margin:2px}pre{background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px;min-height:60px}</style></head>
<body>
<h1>Aplikasi Catatan dengan Closure</h1>
<div class="card">
  <p>Catatan ini menggunakan <strong>closure</strong> untuk menyimpan state privat.</p>
  <input type="text" id="noteInput" placeholder="Isi catatan...">
  <button onclick="tambahCatatan()">Tambah</button>
</div>
<pre id="output"></pre>
<div class="card">
  <h2>Demo Konsep Lanjutan</h2>
  <button onclick="demoClosure()">Closure Counter</button>
  <button onclick="demoBind()">this & bind</button>
  <button onclick="demoPrototype()">Prototype</button>
  <button onclick="demoDebounce()">Debounce Input</button>
  <button onclick="demoModule()">Module Pattern</button>
</div>
<pre id="demoOutput"></pre>
<script>
  // CLOSURE: State privat
  function buatPengelolaCatatan() {
    let catatan = [];
    return {
      tambah: function(isi) {
        catatan.push({ isi, waktu: new Date().toLocaleTimeString() });
        return catatan;
      },
      semua: function() { return [...catatan]; },
      hapusSemua: function() { catatan = []; }
    };
  }
  const pengelola = buatPengelolaCatatan();
  function tambahCatatan() {
    let isi = document.getElementById("noteInput").value.trim();
    if (!isi) return;
    pengelola.tambah(isi);
    renderCatatan();
  }
  function renderCatatan() {
    let all = pengelola.semua();
    document.getElementById("output").textContent =
      all.map((c, i) => `${i + 1}. [${c.waktu}] ${c.isi}`).join("\n") || "Belum ada catatan";
  }

  // DEMO: Closure Counter
  function buatCounter() {
    let count = 0;
    return function() { return ++count; };
  }
  let counter = buatCounter();
  function demoClosure() {
    document.getElementById("demoOutput").textContent =
      `Counter dipanggil: ${counter()} | ${counter()} | ${counter()} | ${counter()}`;
  }

  // DEMO: this & bind
  function demoBind() {
    let user = {
      nama: "Budi", umur: 25,
      perkenalan: function(kota) {
        return `Halo, saya ${this.nama}, ${this.umur} tahun dari ${kota}`;
      }
    };
    let user2 = { nama: "Siti", umur: 22 };
    let bound = user.perkenalan.bind(user2, "Bandung");
    document.getElementById("demoOutput").textContent =
      "call: " + user.perkenalan.call(user2, "Jakarta") +
      "\napply: " + user.perkenalan.apply(user2, ["Surabaya"]) +
      "\nbind: " + bound();
  }

  // DEMO: Prototype
  function demoPrototype() {
    function Hewan(nama) { this.nama = nama; }
    Hewan.prototype.bersuara = function() {
      return `${this.nama} bersuara`;
    };
    function Kucing(nama) { Hewan.call(this, nama); }
    Kucing.prototype = Object.create(Hewan.prototype);
    Kucing.prototype.bersuara = function() {
      return `${this.nama}: Meow!`;
    };
    let k = new Kucing("Mimi");
    document.getElementById("demoOutput").textContent =
      k.bersuara() + "\ninstanceof Hewan: " + (k instanceof Hewan);
  }

  // DEMO: Debounce
  function debounce(fn, delay) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }
  let counterDebounce = 0;
  const debouncedLog = debounce(() => {
    document.getElementById("demoOutput").textContent += "✅ Eksekusi ke-" + (++counterDebounce) + "\n";
  }, 1000);
  function demoDebounce() {
    document.getElementById("demoOutput").textContent = "Klik cepat berkali-kali...\n";
    debouncedLog();
  }

  // DEMO: Module Pattern
  function demoModule() {
    const CounterModule = (function() {
      let _count = 0;
      return {
        increment: function() { return ++_count; },
        decrement: function() { return --_count; },
        getCount: function() { return _count; }
      };
    })();
    document.getElementById("demoOutput").textContent =
      `Counter: ${CounterModule.increment()} | ${CounterModule.increment()} | ${CounterModule.decrement()}`;
  }
</script>
</body>
</html>
```

---

## Explanation

### Closure
A function that "remembers" the scope where it was created. Useful for private data, factory functions, and state persistence.

### this Binding
`this` depends on how a function is called: method → object, regular function → global/window, arrow → lexical scope. `call`, `apply`, `bind` to explicitly control this.

### Prototype
JavaScript's inheritance mechanism. Every object has a prototype. Methods on the prototype are shared among all instances (memory efficient).

### Debounce & Throttle
Debounce — wait for a pause before executing. Throttle — execute at most once per interval. Important for performance (input, scroll, resize).

---

## Experiments

1. **Create a closure counter with increment, decrement, reset functions**
1. **Implement a memoize function for caching**
1. **Use prototype to add a method to built-in Array**
1. **Create a throttle function (different from debounce)**

---

## Challenge

Create a utility library using the Module Pattern (IIFE) with functions: deepClone(obj), isEmpty(obj), formatDate(date), generateId(), and pipe(...fns). Use closures for internal state. Implement debounce for search input.

---

## Summary

Advanced concepts like closures, this binding, prototypes, and debounce/throttle patterns distinguish junior from senior developers. Understand these to write more professional code. Next module: **Final Project** — combine all concepts in one application.
