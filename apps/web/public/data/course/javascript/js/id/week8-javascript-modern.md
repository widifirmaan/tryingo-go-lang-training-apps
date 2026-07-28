# JavaScript Modern

> JavaScript | Modul 8

## Tujuan Pembelajaran

- Mengimpor dan mengekspor modul ES6
- Membuat class dengan constructor dan method
- Menggunakan template literal untuk string
- Menerapkan optional chaining dan nullish coalescing
- Memahami Map, Set, dan struktur data modern

---

## Program: Demo Fitur ES6+

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

## Penjelasan

### Template Literal
Gunakan backtick `` untuk string multi-baris dan interpolasi `${}`.

### Class
Sintaks gula untuk constructor function. Mendukung `extends` untuk inheritance.

### Optional Chaining
`obj?.prop?.sub` — aman mengakses properti bertingkat tanpa error jika null.

### Nullish Coalescing
`val ?? defaultValue` — pakai default hanya jika val `null` atau `undefined` (tidak untuk falsy lain).

### Map & Set
`Map` — objek dengan key apa pun (bukan hanya string). `Set` — koleksi nilai unik.

---

## Eksperimen

1. **Buat class `Mobil` dengan properti merek, tahun, dan method info()**
1. **Gunakan template literal untuk membuat HTML dinamis**
1. **Implementasi private class field (#) untuk data sensitif**
1. **Buat chain method pada class (method mengembalikan this)**

---

## Tantangan

Buat class `RekeningBank` dengan properti: namaPemilik, nomorRekening, saldo. Method: setor(tambah), tarik(kurang), cekSaldo(). Buat class `RekeningTabungan` yang extends dengan method hitungBunga(). Implementasikan private field untuk saldo.

---

## Ringkasan

ES6+ membawa banyak fitur baru yang membuat JavaScript lebih ekspresif dan mudah dipelihara: template literal, class, modules, optional chaining. Modul selanjutnya: **Async JavaScript** — menangani operasi asynchronous seperti request jaringan.
