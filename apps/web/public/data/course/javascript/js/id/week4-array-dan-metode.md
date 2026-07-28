# Array & Metode

> JavaScript | Modul 4

## Tujuan Pembelajaran

- Membuat dan memanipulasi array
- Menggunakan method: push, pop, shift, unshift
- Mengiterasi array dengan forEach, map, filter, reduce
- Menggunakan spread operator dan destructuring
- Memahami metode pencarian: find, some, every

---

## Program: Daftar Belanja

```html
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Array & Metode</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}input{padding:.4rem;border:1px solid #ccc;border-radius:4px}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer;margin:2px}pre{background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px}</style></head>
<body>
<h1>Daftar Belanja</h1>
<div class="card">
  <input type="text" id="itemBaru" placeholder="Nama item">
  <input type="number" id="qtyBaru" placeholder="Jumlah" value="1" min="1">
  <button onclick="tambahItem()">Tambah</button>
  <button onclick="hapusTerakhir()">Hapus Terakhir</button>
  <button onclick="urutkanItem()">Urutkan A-Z</button>
  <button onclick="filterBeli()">Yang Belum Dibeli</button>
</div>
<pre id="output">Daftar belanjaan akan muncul di sini</pre>
<div class="card">
  <h2>Demo Method Array</h2>
  <button onclick="demoMap()">map() — Nama Saja</button>
  <button onclick="demoFilter()">filter() — Qty > 2</button>
  <button onclick="demoReduce()">reduce() — Total Item</button>
  <button onclick="demoFind()">find() — Cari "Susu"</button>
</div>
<pre id="demoOutput"></pre>
<script>
  let belanja = [
    { nama: "Beras", qty: 2, beli: false },
    { nama: "Telur", qty: 12, beli: true },
  ];
  function render() {
    let out = belanja.map((item, i) =>
      `${i + 1}. [${item.beli ? "✓" : " "}] ${item.nama} × ${item.qty}`
    ).join("\n");
    document.getElementById("output").textContent = out || "Kosong";
    console.log("Daftar:", belanja);
  }
  function tambahItem() {
    let nama = document.getElementById("itemBaru").value.trim();
    let qty = Number(document.getElementById("qtyBaru").value);
    if (!nama) return;
    belanja.push({ nama, qty, beli: false });
    render();
  }
  function hapusTerakhir() { belanja.pop(); render(); }
  function urutkanItem() {
    belanja.sort((a, b) => a.nama.localeCompare(b.nama)); render();
  }
  function filterBeli() {
    let belum = belanja.filter(item => !item.beli);
    alert(`Belum dibeli: ${belum.length} item`);
  }
  function demoMap() {
    let namaSaja = belanja.map(i => i.nama);
    document.getElementById("demoOutput").textContent = "Nama item: " + namaSaja.join(", ");
  }
  function demoFilter() {
    let banyak = belanja.filter(i => i.qty > 2);
    document.getElementById("demoOutput").textContent = "Qty > 2: " + banyak.map(i => i.nama).join(", ");
  }
  function demoReduce() {
    let total = belanja.reduce((sum, i) => sum + i.qty, 0);
    document.getElementById("demoOutput").textContent = "Total item: " + total;
  }
  function demoFind() {
    let found = belanja.find(i => i.nama.toLowerCase().includes("susu"));
    document.getElementById("demoOutput").textContent = found ? `Ditemukan: ${found.nama} × ${found.qty}` : "Tidak ditemukan";
  }
  render();
</script>
</body>
</html>
```

---

## Penjelasan

### Method Array Penting
- `push()` / `pop()` — tambah/hapus dari akhir
- `shift()` / `unshift()` — tambah/hapus dari awal
- `map()` — transformasi setiap elemen
- `filter()` — seleksi elemen
- `reduce()` — akumulasi nilai
- `find()` — cari elemen pertama

### Spread Operator
`...array` menyebarkan elemen array. Berguna untuk menggabungkan atau menyalin array.

### Destructuring
Mengambil nilai dari array ke variabel terpisah: `[a, b] = array`

---

## Eksperimen

1. **Tambahkan item dengan spread: buat array baru dari array lama**
1. **Gunakan `some()` untuk cek apakah ada item dengan qty > 5**
1. **Implementasi undo dengan menyimpan snapshot array**
1. **Buat tombol random shuffle item**

---

## Tantangan

Buat aplikasi "Playlist Musik": array of objects dengan judul, artis, durasi. Fitur: tambah lagu, hapus, cari, urutkan berdasarkan artis, hitung total durasi dengan reduce. Tampilkan sebagai daftar di HTML.

---

## Ringkasan

Array adalah struktur data paling penting di JavaScript. Method seperti map, filter, dan reduce memungkinkan transformasi data yang ekspresif. Modul selanjutnya: **Objek & Data** — cara menyimpan dan mengelola data terstruktur.
