# Objek & Data

> JavaScript | Modul 5

## Tujuan Pembelajaran

- Membuat dan mengelola objek JavaScript
- Mengakses properti dengan dot dan bracket notation
- Menggunakan destrukturisasi objek
- Memahami JSON.parse dan JSON.stringify
- Menerapkan object spread dan computed keys

---

## Program: Buku Alamat

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

## Penjelasan

### Objek Literal
Cara paling umum membuat objek: `{ key: value }`. Properti bisa diakses dengan dot (`obj.key`) atau bracket (`obj["key"]`).

### Computed Key
`[variabel]` sebagai nama properti. Berguna untuk properti dinamis.

### JSON
`JSON.stringify()` mengubah objek ke string JSON. `JSON.parse()` mengembalikan ke objek.

### Object Spread
`{ ...obj, propertiBaru: nilai }` — menggabungkan dan menyalin objek secara immutable.

---

## Eksperimen

1. **Tambahkan properti `alamat` sebagai objek bersarang**
1. **Gunakan computed keys: buat properti dengan nama dari input**
1. **Coba Object.keys(), Object.values(), Object.entries()**
1. **Clone objek dengan spread lalu ubah salah satu properti**

---

## Tantangan

Buat aplikasi "Manajemen Buku": array of book objects (judul, penulis, tahun, genre). Fitur: tambah, cari berdasarkan judul/penulis, filter berdasarkan genre, statistik (total buku, buku per genre). Gunakan spread operator untuk edit buku.

---

## Ringkasan

Objek adalah fondasi hampir semua struktur data di JavaScript. Dengan destructuring, spread, dan JSON, Anda bisa mengelola data kompleks dengan mudah. Modul selanjutnya: **DOM Manipulation** — cara JavaScript berinteraksi dengan halaman web.
