# State & useState — Kotak yang Bisa Berubah Saat Diklik

> **Kategori:** React | **Level:** Pemula | **Minggu 3:** State & useState

## Tujuan Pembelajaran

- Memahami state: **data internal komponen yang bisa berubah** (seperti angka di layar kasir)
- `useState` → `const [nilai, setNilai] = useState(0)` — nilai + alat ubahnya
- State trigger re-render: panggil `setNilai`, React gambar ulang otomatis
- Controlled component: input yang nilainya dikunci state (`value` + `onChange`)
- Event: `onClick`, `onChange`, `onSubmit` + `e.preventDefault()`

---

## Kenapa Ini Penting Buat Kamu?

Minggu lalu katalog hanya pajangan. Pelanggan tidak bisa ketik cari, tambah keranjang. **State = memori komponen**. Tanpa state, tombol `+` tidak nambah. Dengan `useState`, klik = angka berubah, ketik = list saring.

Ini yang bikin website **hidup**, bukan poster.

---

## Program: Keranjang & Form Pendaftaran

Counter, form, dan keranjang belanja sederhana — semua pakai `useState`.

```jsx
// ── src/App.jsx ──
import { useState } from "react";

// 1. Counter — state angka
function Counter() {
  const [jumlah, setJumlah] = useState(0);

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 12, textAlign: "center" }}>
      <h3>Jumlah: {jumlah} karung</h3>
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <button onClick={() => setJumlah(jumlah - 1)} disabled={jumlah <= 0}>−</button>
        <button onClick={() => setJumlah(jumlah + 1)}>+</button>
        <button onClick={() => setJumlah(0)}>Reset</button>
      </div>
      <p style={{ color: "gray", fontSize: 12 }}>Klik + → setJumlah(jumlah+1) → React re-render → angka naik</p>
    </div>
  );
}

// 2. Form — state string + submit
function FormPelanggan() {
  const [nama, setNama] = useState("");
  const [daftar, setDaftar] = useState([]);

  function handleSubmit(e) {
    e.preventDefault(); // jangan reload halaman
    if (!nama.trim()) return;
    setDaftar([...daftar, { id: Date.now(), nama: nama.trim() }]);
    setNama(""); // kosongkan input setelah kirim
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 12 }}>
      <h3>Daftar Pelanggan Warung</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama pelanggan"
          style={{ flex: 1, padding: 8, border: "1px solid #ccc", borderRadius: 8 }}
        />
        <button type="submit">Tambah</button>
      </form>
      <ul>
        {daftar.map((p) => (
          <li key={p.id}>{p.nama}</li>
        ))}
      </ul>
      {daftar.length === 0 && <p style={{ color: "gray" }}>Belum ada pelanggan</p>}
    </div>
  );
}

// 3. Keranjang — state array of objects
function Keranjang() {
  const [keranjang, setKeranjang] = useState([
    { id: 1, nama: "Beras", harga: 62000, qty: 1 },
    { id: 2, nama: "Bayam", harga: 5000, qty: 2 },
  ]);

  function tambah(id) {
    setKeranjang(keranjang.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  }

  function hapus(id) {
    setKeranjang(keranjang.filter((item) => item.id !== id));
  }

  const total = keranjang.reduce((sum, item) => sum + item.harga * item.qty, 0);

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 12 }}>
      <h3>Keranjang</h3>
      {keranjang.map((item) => (
        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span>{item.nama} x{item.qty}</span>
          <span>Rp {(item.harga * item.qty).toLocaleString("id-ID")}</span>
          <span style={{ display: "flex", gap: 4 }}>
            <button onClick={() => tambah(item.id)}>+</button>
            <button onClick={() => hapus(item.id)}>Hapus</button>
          </span>
        </div>
      ))}
      <hr />
      <p style={{ fontWeight: "bold" }}>Total: Rp {total.toLocaleString("id-ID")}</p>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 24, background: "#FBF9F5", minHeight: "100vh", display: "grid", gap: 16 }}>
      <h1>Warung — State Demo</h1>
      <Counter />
      <FormPelanggan />
      <Keranjang />
    </div>
  );
}
```

**Pola:**
- `useState(0)` → `[jumlah, setJumlah]`
- Input: `value={nama}` + `onChange={e => setNama(e.target.value)}` — **controlled** (React kunci nilainya).
- Array: jangan `daftar.push()` langsung! Pakai `setDaftar([...daftar, baru])` atau `filter/map` yang return array baru.

---

## Konsep Kunci

### `useState` = Memori Komponen
`const [nilai, setNilai] = useState(0)` → `nilai` = yang tampil, `setNilai` = remote untuk ubah. Awal `0`.

### Re-render = Gambar Ulang Otomatis
Panggil `setJumlah(5)` → React ingat nilai baru → panggil fungsi komponen lagi → tampil `5`. Kamu tidak manual update DOM.

### Controlled Input
`<input value={nama} onChange={e => setNama(e.target.value)} />` — nilai input **selalu** sama dengan state. Ketik → `onChange` → `setNama` → re-render → `value` baru.

### Jangan Mutasi Langsung
- ❌ `keranjang.push(item)` → React tidak tahu berubah → tidak re-render.
- ✅ `setKeranjang([...keranjang, item])` → array baru → React re-render.

---

## Penjelasan untuk Pemula

### Analogi: Layar Kasir

- **State = angka di layar kasir**: awal `0`, kasir tekan `+` → layar `1`. Layar = `jumlah`, tombol `+` = `setJumlah(jumlah+1)`.
- **`useState` = kotak ajaib**: kamu taruh `0`, ia beri 2 benda: `jumlah` (layar) + `setJumlah` (tombol).
- **Re-render = kasir tulis ulang struk**: tiap ganti angka, struk dicetak ulang otomatis.
- **Controlled input = buku tulis yang dikunci**: kamu tidak tulis langsung di buku, tapi bilang ke sekretaris (`setNama`) → sekretaris tulis → kamu lihat hasilnya di `value`.

### Cara Komputer Membaca

1. Klik `+` → `onClick={() => setJumlah(jumlah+1)}` → `setJumlah(1)`
2. React: "state berubah 0→1, jadwalkan re-render"
3. React panggil `Counter()` lagi, `jumlah` sekarang `1` → return `<h3>Jumlah: 1</h3>` → browser update angka.

### 3 Istilah Wajib

1. **State**: data yang bisa berubah di komponen.
2. **setState**: satu-satunya cara ubah state (jangan `state = baru`).
3. **Controlled component**: input yang nilainya dari state.

### Kesalahan Umum

- Ubah state langsung: `jumlah = 5` → tidak re-render. Pakai `setJumlah(5)`.
- Lupa `useState` import → `useState is not defined`. Tambah `import { useState }`.
- `setJumlah(jumlah+1)` 2x berurutan → hanya +1 (karena batch). Pakai `setJumlah(prev => prev+1)` jika perlu +2.

---

## Eksperimen

- **Hijau:** Ubah `Counter` jadi `DISABLE` tombol `−` saat `jumlah <= 0` (sudah ada `disabled={jumlah <=0}`).
- **Kuning:** Di `FormPelanggan`, tambah input `hp` kedua, simpan sebagai `{ nama, hp }` di array.
- **Merah:** Sengaja tulis `keranjang.push({nama:"Kopi"})` lalu `setKeranjang(keranjang)` → daftar tidak update. Ganti jadi `setKeranjang([...keranjang, {nama:"Kopi"}])` → update.

---

## Tantangan

**Pilih satu:**

**A. Todo Harian:** Input + tombol Tambah, tiap todo bisa `Hapus` dan `Selesai` (coret). State `todos = [{id, teks, selesai}]`. Tampilkan `Sisa: 3 tugas`.

**B. Kalkulator Ongkir:** Input `berat` (kg) dan `jarak` (km), state `ongkir = berat*1000 + jarak*2000` tampil otomatis saat ketik (tanpa tombol).

Kriteria: minimal 2 `useState`, 1 controlled input, dan update array pakai spread/filter (bukan push).

---

## Glosarium Mini

- **State**: memori komponen yang bisa berubah
- **useState**: hook untuk buat state
- **Re-render**: React gambar ulang saat state berubah
- **Controlled input**: input yang dikontrol state
- **onClick/onChange**: event klik/ketik

---

## Ringkasan

Minggu 3 dari 12: **State & useState** (Level: Pemula). Kamu sudah bikin kotak ajaib yang berubah saat diklik/diketik. Minggu depan: **useEffect & Lifecycle** — alarm otomatis, ambil data saat halaman buka, dan bersihkan timer saat pindah.
