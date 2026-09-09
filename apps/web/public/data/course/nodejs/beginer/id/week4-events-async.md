# Events & Async — Telinga dan Janji Warung Node

> **Kategori:** Node.js | **Level:** Pemula | **Minggu 4:** Events & Async Programming
> **Prasyarat:** Minggu 3 — **File System**.

## Tujuan Pembelajaran

- `EventEmitter`: `on` pasang telinga, `emit` bunyikan, `once` sekali (sumber: nodejs.org/api/events)
- `Promise` janji + `async/await` tunggu — pesan ojek tanpa freeze
- Aturan `callback(err, hasil)` error-dulu (konvensi Node)

---

## Kenapa Ini Penting Buat Kamu?

Warung: stok habis → beri tahu 3 kasir sekaligus (`emit`). Ambil harga supplier 2 detik → tanpa async layar freeze; dengan `await`, tulis seperti sync tapi tidak macet.

---

## Program: Telinga & Janji Warung

```javascript
const EventEmitter = require("events");

// 1. Telinga: stok habis beri tahu semua
class Warung extends EventEmitter {}
const warung = new Warung();

warung.on("habis", (nama) => console.log(`Kasir 1: ${nama} habis!`));
warung.on("habis", (nama) => console.log(`Kasir 2: pesan ${nama} ke supplier!`));
warung.emit("habis", "Beras"); // bunyikan → 2 kasir dengar

warung.once("buka", () => console.log("Buka sekali saja"));
warung.emit("buka");
warung.emit("buka"); // tidak bunyi lagi

// 2. Janji: ambil harga tanpa freeze
function ambilHarga(nama) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(nama === "Beras" ? 62000 : 5000), 500);
  });
}

async function belanja() {
  console.log("Pesan Beras...");
  const harga = await ambilHarga("Beras"); // tunggu 0.5 detik
  console.log("Dapat harga:", harga);
  const [a, b] = await Promise.all([ambilHarga("Beras"), ambilHarga("Bayam")]);
  console.log("Sekaligus:", a, b);
}
belanja();
console.log("→ Baris ini jalan duluan (tidak tunggu)");
```

---

## Konsep Kunci

### `on` / `emit` / `once` = Telinga/Bunyi/Sekali
`on("habis", fn)` pasang, `emit("habis", "Beras")` bunyikan ke semua, `once` hanya pertama.

### `Promise` + `async/await` = Janji + Tunggu
`new Promise((resolve) => ...)` janji, `await` tunggu tanpa freeze, `Promise.all` bareng.

### Error-First Callback = Aturan Node
`fs.readFile(f, (err, data) => ...)` — `err` dulu, baru hasil.

---

## Penjelasan untuk Pemula

### Analogi: Bel Warung & Ojek
- **EventEmitter = bel**: tekan `emit` → semua yang `on` dengar.
- **Promise = janji ojek**: `await` tunggu ojek datang.

### Langkah 0 — Siapkan Device
- Sama W1: `node telinga.js`.

### Cara Komputer Membaca
1. `emit("habis", "Beras")` → panggil semua fungsi `on("habis")` berurutan.
2. `await ambilHarga()` → jeda fungsi, kerjaan lain jalan → lanjut saat `resolve`.

### 3 Istilah Wajib
1. **on/emit**: dengar/bunyikan
2. **Promise/await**: janji/tunggu
3. **Callback err-dulu**: aturan Node

---

## Eksperimen

- **Hijau:** `emit("habis", "Gula")` → 2 kasir bunyi?
- **Kuning:** Lupa `await` → `harga` jadi `Promise {<pending>}`?
- **Merah:** `once` lalu `emit` 2x → hanya 1 log?

---

## Tantangan

**Warung Event Lengkap:** `Warung` emitter + `on("jual")` kurangi stok + `Promise` `ambilDiskon()` 300ms → `async jual()` `await` diskon → cetak total. **Selesai Beginner Node!**

---

### Bonus: Debug Node (tanpa tebak-tebakan!)

`console.log` di mana-mana = lambat. Cara pro: `node --inspect jual.js` → buka `chrome://inspect` di Chrome → klik **inspect** → Sources → klik nomor baris (breakpoint biru!) → kode JEDA → intip `await` sudah resolve apa belum. Async yang "misterius" langsung kelihatan!
- **Sambungan (Minggu 3 — File System):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Emitter/on/emit**: bel/dengar/bunyikan
- **Promise/async/await**: janji/tunggu
- **Error-first**: err dulu

---

## Ringkasan

Minggu 4 dari 4: **Telinga & Janji** (Level: Pemula). **Selesai Beginner Node!** Lanjut: **Express** (Menengah).
