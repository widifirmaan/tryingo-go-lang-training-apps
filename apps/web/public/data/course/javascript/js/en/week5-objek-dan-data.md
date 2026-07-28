# Objects & Data

> JavaScript | Module 5

## Learning Objectives

- Create and manage JavaScript objects
- Access properties with dot and bracket notation
- Use object destructuring
- Understand JSON.parse and JSON.stringify
- Apply object spread and computed keys

---

## Program: Address Book

```html
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Objek & Data</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}input{padding:.4rem;border:1px solid #ccc;border-radius:4px}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer;margin:2px}pre{background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px}</style></head>
<body>
<h1>Buku Alamat</h1>
<div class="card">
  <input type="text" id="nama" placeholder="Nama">
  <input type="email" id="email" placeholder="Email">
  <input type="tel" id="telp" placeholder="Telepon">
  <button onclick="simpanKontak()">Simpan</button>
</div>
<pre id="output"></pre>
<div class="card">
  <h2>Demo Objek</h2>
  <button onclick="demoDestructure()">Destructuring</button>
  <button onclick="demoSpread()">Spread Object</button>
  <button onclick="demoJson()">JSON Export</button>
</div>
<pre id="demoOut"></pre>
<script>
  let kontak = [];
  function buatKontak(nama, email, telp) {
    return { nama, email, telp, dibuat: new Date().toLocaleString() };
  }
  function simpanKontak() {
    let n = document.getElementById("nama").value.trim();
    let e = document.getElementById("email").value.trim();
    let t = document.getElementById("telp").value.trim();
    if (!n || !e) { alert("Nama dan email wajib!"); return; }
    kontak.push(buatKontak(n, e, t));
    render();
  }
  function render() {
    let out = kontak.map((k, i) =>
      `${i + 1}. ${k.nama} | ${k.email} | ${k.telp} (${k.dibuat})`
    ).join("\n");
    document.getElementById("output").textContent = out || "Belum ada kontak";
  }
  function demoDestructure() {
    if (!kontak.length) return alert("Tambah kontak dulu!");
    let { nama, email } = kontak[0];
    document.getElementById("demoOut").textContent =
      `Destructure: Nama = ${nama}, Email = ${email}`;
  }
  function demoSpread() {
    if (!kontak.length) return alert("Tambah kontak dulu!");
    let asli = kontak[0];
    let salinan = { ...asli, dimodifikasi: true };
    document.getElementById("demoOut").textContent =
      "Asli: " + JSON.stringify(asli) + "\nSalinan (spread): " + JSON.stringify(salinan);
  }
  function demoJson() {
    let json = JSON.stringify(kontak, null, 2);
    document.getElementById("demoOut").textContent = json;
    console.log("JSON export:", json);
  }
</script>
</body>
</html>
```

---

## Explanation

### Object Literals
The most common way to create objects: `{ key: value }`. Properties can be accessed with dot (`obj.key`) or bracket (`obj["key"]`) notation.

### Computed Keys
`[variable]` as property name. Useful for dynamic properties.

### JSON
`JSON.stringify()` converts an object to a JSON string. `JSON.parse()` converts it back.

### Object Spread
`{ ...obj, newProp: value }` — merges and copies objects immutably.

---

## Experiments

1. **Add an `address` property as a nested object**
1. **Use computed keys: create a property with a name from input**
1. **Try Object.keys(), Object.values(), Object.entries()**
1. **Clone an object with spread then modify one property**

---

## Challenge

Create a "Book Management" app: array of book objects (title, author, year, genre). Features: add, search by title/author, filter by genre, statistics (total books, books per genre). Use spread operator for editing books.

---

## Summary

Objects are the foundation of almost all data structures in JavaScript. With destructuring, spread, and JSON, you can manage complex data easily. Next module: **DOM Manipulation** — how JavaScript interacts with web pages.
