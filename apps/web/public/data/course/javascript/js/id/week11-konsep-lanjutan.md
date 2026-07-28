# Konsep Lanjutan

> JavaScript | Modul 11

## Tujuan Pembelajaran

- Memahami closure dan penggunaannya
- Menguasai binding this: call, apply, bind
- Mengenal prototype chain dan inheritance
- Menerapkan debounce dan throttle
- Menggunakan pola Module dan IIFE

---

## Program: Aplikasi Catatan

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

## Penjelasan

### Closure
Fungsi yang "mengingat" scope di mana ia dibuat. Berguna untuk data privat, factory functions, dan state persistence.

### this Binding
`this` tergantung cara fungsi dipanggil: method → objek, fungsi biasa → global/window, arrow → lexical scope. `call`, `apply`, `bind` untuk mengontrol this secara eksplisit.

### Prototype
Mekanisme inheritance JavaScript. Setiap objek memiliki prototype. Method di prototype dibagi antar semua instance (hemat memori).

### Debounce & Throttle
Debounce — tunggu jeda sebelum eksekusi. Throttle — eksekusi maksimal sekali per interval. Penting untuk performa (input, scroll, resize).

---

## Eksperimen

1. **Buat closure counter dengan fungsi increment, decrement, reset**
1. **Implementasi memoize function untuk caching**
1. **Gunakan prototype untuk menambah method ke built-in Array**
1. **Buat fungsi throttle (beda dengan debounce)**

---

## Tantangan

Buat library utilitas menggunakan Module Pattern (IIFE) dengan fungsi: deepClone(obj), isEmpty(obj), formatDate(date), generateId(), dan pipe(...fns). Gunakan closure untuk internal state. Implementasikan debounce untuk search input.

---

## Ringkasan

Konsep lanjutan seperti closure, this binding, prototype, dan pattern debounce/throttle adalah yang membedakan developer junior dari senior. Pahami ini untuk menulis kode yang lebih profesional. Modul selanjutnya: **Proyek Akhir** — gabungkan semua konsep dalam satu aplikasi.
