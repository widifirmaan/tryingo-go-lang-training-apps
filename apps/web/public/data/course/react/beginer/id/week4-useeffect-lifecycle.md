# useEffect & Lifecycle — Alarm Otomatis & Ambil Data

> **Kategori:** React | **Level:** Pemula | **Minggu 4:** useEffect & Lifecycle

## Tujuan Pembelajaran

- Memahami `useEffect`: **kode yang jalan setelah render** — untuk fetch, timer, subscribe
- Dependency array: `[]` = sekali pas buka, `[nilai]` = saat nilai berubah, tanpa array = tiap render
- Cleanup: `return () => clearInterval(id)` — matikan alarm saat pindah halaman (anti bocor memori)
- Pola loading: `loading true → fetch → loading false`
- Kenapa fetch tidak langsung di body komponen (akan loop terus)

---

## Kenapa Ini Penting Buat Kamu?

Warung buka jam 7 — **alarm harus bunyi tepat waktu**, daftar produk harus muncul saat buka toko, bukan saat pelanggan tanya baru panik cari. `useEffect` = **alarm & asisten otomatis**: ambil data saat halaman buka, update judul tab, hidupkan timer, dan matikan saat tutup.

Tanpa ini, kamu fetch di body → tiap re-render fetch lagi → infinite loop, kuota habis.

---

## Program: Timer & Daftar Pengguna (Fetch Simulasi)

```jsx
import { useState, useEffect } from "react";

// 1. Timer — hidupkan interval saat mount, matikan saat unmount
function JamWarung() {
  const [detik, setDetik] = useState(0);
  const [jalan, setJalan] = useState(true);

  useEffect(() => {
    if (!jalan) return; // jika pause, jangan set interval
    const id = setInterval(() => {
      setDetik((s) => s + 1); // pakai updater function biar tidak stale
    }, 1000);

    // Cleanup: matikan timer saat komponen hilang atau jalan berubah
    return () => clearInterval(id);
  }, [jalan]); // ← jalan berubah → effect jalan lagi

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 12 }}>
      <h3>⏰ Jam Warung: {detik} detik sejak buka</h3>
      <button onClick={() => setJalan(!jalan)}>{jalan ? "Pause" : "Jalan"}</button>
      <button onClick={() => setDetik(0)} style={{ marginLeft: 8 }}>Reset</button>
      <p style={{ color: "gray", fontSize: 12 }}>useEffect dengan [jalan] → interval dibuat/dihapus saat jalan toggle</p>
    </div>
  );
}

// 2. Fetch — ambil data saat mount, tampilkan loading
function DaftarPelanggan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cari, setCari] = useState("");

  useEffect(() => {
    // [] = hanya sekali saat mount (seperti buka toko pagi)
    setLoading(true);
    const t = setTimeout(() => {
      // Simulasi API: nanti ganti dengan fetch("https://api.warung.com/pelanggan")
      setData([
        { id: 1, nama: "Budi Santoso" },
        { id: 2, nama: "Siti Aminah" },
        { id: 3, nama: "Andi Wijaya" },
        { id: 4, nama: "Dewi Lestari" },
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(t); // cleanup jika user pindah halaman sebelum 1 detik
  }, []); // ← kosong = sekali saja

  // Filter di render (bukan effect) — cukup saring, tidak perlu fetch lagi
  const hasil = data.filter((u) => u.nama.toLowerCase().includes(cari.toLowerCase()));

  if (loading) return <p>⏳ Memuat pelanggan...</p>;

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 12 }}>
      <h3>Daftar Pelanggan ({hasil.length})</h3>
      <input
        value={cari}
        onChange={(e) => setCari(e.target.value)}
        placeholder="Cari nama..."
        style={{ padding: 8, width: "100%", maxWidth: 300, border: "1px solid #ccc", borderRadius: 8 }}
      />
      <ul>
        {hasil.map((u) => (
          <li key={u.id}>{u.nama}</li>
        ))}
      </ul>
      {hasil.length === 0 && <p style={{ color: "red" }}>Tidak ada hasil</p>}
    </div>
  );
}

export default function App() {
  const [showJam, setShowJam] = useState(true);
  return (
    <div style={{ fontFamily: "sans-serif", padding: 24, background: "#FBF9F5", minHeight: "100vh", display: "grid", gap: 16 }}>
      <h1>Warung — useEffect Demo</h1>
      <button onClick={() => setShowJam(!showJam)}>{showJam ? "Sembunyikan Jam" : "Tampilkan Jam"}</button>
      {showJam && <JamWarung />}
      <DaftarPelanggan />
    </div>
  );
}
```

**Pola:**
- `useEffect(() => { fetch }, [])` → sekali
- `useEffect(() => { timer }, [jalan])` → saat `jalan` ganti
- `return () => clearInterval(id)` → bersihkan sebelum effect berikutnya atau unmount.

---

## Konsep Kunci

### `useEffect` = Setelah Render, Kerjakan Ini
`useEffect(() => { ... }, [dep])` — React render dulu, baru jalankan efek. Untuk yang **di luar React**: API, timer, `document.title`, `localStorage`.

### Dependency Array = Daftar Pemicu
- `[]` → **sekali** saat mount (buka toko).
- `[cari]` → **saat `cari` berubah**.
- **tanpa array** → **tiap render** (jarang dipakai, bahaya loop).

### Cleanup = Matikan Sebelum Pergi
`return () => clearInterval(id)` → dipanggil sebelum effect berikutnya jalan atau komponen hilang. Tanpa ini, timer jalan di belakang → bocor.

### Pola Fetch
```js
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  fetch(url).then(r => r.json()).then(d => { setData(d); setLoading(false); });
}, []);
if (loading) return <p>Memuat...</p>;
```

---

## Penjelasan untuk Pemula

### Analogi: Alarm & Buka Toko

- **`useEffect([], ...)` = buka toko jam 7**: alarm dipasang sekali saat buka, tidak dipasang tiap pelanggan masuk.
- **`useEffect([jalan], ...)` = saklar lampu**: lampu nyala/mati saat saklar `jalan` diganti.
- **Cleanup = matikan kompor saat pulang**: lupa → kompor nyala semalam → bahaya (memory leak).

### Cara Komputer Membaca

1. Render `DaftarPelanggan` pertama → `loading=true`
2. Setelah render, `useEffect` jalan → `setTimeout` 1 detik → `setData([...])` + `setLoading(false)` → re-render → tampil list.
3. User ketik `cari` → `setCari` → re-render, **effect tidak jalan lagi** (karena `[]`), hanya `hasil` filter yang update.

Jika fetch ditaruh langsung di body (tanpa effect):
```
function App() { fetch(...).then(setData) } // tiap render fetch → setData → render → fetch → loop!
```

### 3 Istilah Wajib

1. **Side effect**: kerja di luar React (API, timer).
2. **Dependency array**: daftar yang dipantau, jika berubah effect ulang.
3. **Cleanup**: fungsi bersih-bersih sebelum effect berikutnya.

### Kesalahan Umum

- Lupa `[]` → fetch tiap render → infinite loop, browser hang.
- Lupa cleanup `clearInterval` → timer jalan meski komponen sudah hilang → `setDetik` error.
- Tulis `useEffect(async () => { await fetch })` → effect tidak boleh async langsung. Pakai `useEffect(() => { async function load(){...}; load(); }, [])`.

---

## Eksperimen

- **Hijau:** Ubah `1000` di `setInterval` jadi `500` → jam lebih cepat. Ubah `setTimeout` 1 detik jadi 2 detik → loading lebih lama.
- **Kuning:** Di `DaftarPelanggan`, tambah `useEffect(() => { document.title = `Pelanggan: ${hasil.length}` }, [hasil.length])` → judul tab berubah saat filter.
- **Merah:** Hapus `return () => clearInterval(id)` lalu klik `Sembunyikan Jam` → buka console → warning? Timer masih jalan di belakang. Pasang lagi.

---

## Tantangan

**Pilih satu:**

**A. Cari Otomatis (Debounce):** Input cari yang fetch simulasi hanya setelah user berhenti ketik 500ms. Pakai `useEffect` dengan `setTimeout` dan cleanup `clearTimeout`.

**B. Jam Digital + Auto Fetch:** Tampilkan jam `new Date().toLocaleTimeString()` update tiap detik, dan daftar produk fetch sekali saat mount. 2 effect berbeda: 1 untuk jam `[ ]`? (interval), 1 untuk data `[]`.

Kriteria: 1 effect dengan `[]`, 1 effect dengan `[value]`, dan 1 cleanup yang benar.

---

## Glosarium Mini

- **useEffect**: hook untuk side effect setelah render
- **Dependency array**: pemicu kapan effect jalan
- **Cleanup**: fungsi matikan effect lama
- **Lifecycle**: mount (lahir) → update (ubah) → unmount (hilang)

---

## Ringkasan

Minggu 4 dari 12: **useEffect & Lifecycle** (Level: Pemula). Kamu sudah pasang alarm otomatis (fetch sekali) dan timer yang bisa dimatikan. **Selesai fase Pemula React!** Minggu depan naik ke Menengah: **React Router / Next.js routing & data fetching** — pindah halaman tanpa reload.
