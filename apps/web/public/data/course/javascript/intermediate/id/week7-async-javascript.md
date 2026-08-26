# Async JavaScript — Pesan Antar Tanpa Nunggu di Warung

> **Kategori:** JavaScript | **Level:** Menengah | **Minggu 7:** Async JavaScript

## Tujuan Pembelajaran

- Paham `callback` → `Promise` (janji) → `async/await` (tunggu janji) — seperti pesan ojek
- `fetch` ambil data warung tanpa freeze, `then/catch` dan `try/catch` untuk `await`
- `Promise.all` pesan 3 warung sekaligus

---

## Kenapa Ini Penting Buat Kamu?

Warung ambil harga dari supplier via `fetch`. Tanpa async, layar freeze 3 detik. Dengan `async`, tulis `await fetch(...)` seperti pesan ojek: pesan, tunggu, lanjut.

---

## Program: Ambil Harga Supplier

```javascript
// Simulasi fetch tanpa internet (pakai Promise)
function ambilHarga(nama) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ nama, harga: nama === "Beras" ? 62000 : 5000 }), 800);
  });
}

// Cara lama: callback hell
// ambilHarga("Beras", (data) => { console.log(data); });

// Cara modern: async/await — seperti tunggu ojek
async function belanja() {
  console.log("Pesan Beras...");
  try {
    const beras = await ambilHarga("Beras"); // tunggu 0.8 detik, tidak freeze
    console.log("Dapat:", beras);

    const bayam = await ambilHarga("Bayam");
    console.log("Dapat:", bayam);

    // 2 pesan sekaligus (lebih cepat)
    const [a, b] = await Promise.all([ambilHarga("Beras"), ambilHarga("Bayam")]);
    console.log("Sekaligus:", a, b);
  } catch (err) {
    console.log("Gagal:", err);
  }
}

belanja();
console.log("→ Baris ini jalan duluan (tidak tunggu belanja)");

// Fetch beneran (jika ada internet):
// async function ambilAPI() {
//   const res = await fetch("https://api.warung.com/produk");
//   const data = await res.json();
//   console.log(data);
// }
```

---

## Konsep Kunci

### `Promise` = Janji Ojek
`new Promise((resolve) => setTimeout(() => resolve(data), 800))` — janji "800ms lagi saya antar".

### `async/await` = Tunggu Janji
`async function belanja(){ const data = await ambilHarga() }` — tulis seperti sync, tapi tidak freeze.

### `try/catch` untuk `await`
`await` yang gagal → `catch`.

### `Promise.all` = Pesan 3 Ojek Sekaligus
`await Promise.all([ambil("Beras"), ambil("Bayam")])` → 0.8 detik untuk 2, bukan 1.6 detik.

---

## Penjelasan untuk Pemula

### Analogi: Ojek

- **`fetch` = pesan ojek**: kamu pesan, ojek jalan 0.8 detik, kamu tunggu `await`.
- **`Promise.all` = pesan 2 ojek bareng**: 2 ojek jalan bersamaan, tiba hampir bareng.

---

## Eksperimen

- **Hijau:** `await ambilHarga("Beras")` → `harga` berapa?
- **Kuning:** `Promise.all` 3 ambil → waktu tetap 0.8 detik?
- **Merah:** Lupa `await` → `beras` jadi `Promise { <pending> }`, bukan data.

---

## Tantangan

**Warung Async:** `ambilStok(nama)` Promise 500ms return stok, `async belanja()` `await` 3 produk `Promise.all`, hitung total `harga*stok`, `try/catch` jika `nama` tidak ada.

---

## Glosarium Mini

- **Promise/async/await**: janji & tunggu
- **fetch**: ambil data
- **Promise.all**: bareng

---

## Ringkasan

Minggu 7: **Async** — pesan tanpa nunggu freeze. Minggu depan: **ES6+** — spread & destructuring singkat.
