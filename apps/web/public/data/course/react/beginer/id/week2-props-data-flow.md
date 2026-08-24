# Props & Data Flow — Amplop dari Bos ke Staf

> **Kategori:** React | **Level:** Pemula | **Minggu 2:** Props & Data Flow

## Tujuan Pembelajaran

- Memahami props: **data yang dikirim induk → anak** (seperti amplop tugas)
- Destructuring `function Kartu({ nama, harga })` — buka amplop langsung
- Props itu **read-only**: anak tidak boleh ubah, hanya baca
- Kirim berbagai tipe: string, number, boolean, array, object, bahkan function
- Render daftar dengan `map()` dan `key` (KTP untuk tiap item agar React tidak bingung)

---

## Kenapa Ini Penting Buat Kamu?

Minggu lalu `KartuProduk` masih tulis manual `<KartuProduk nama="Beras" />`. Bayangkan warung punya 50 produk — masa tulis 50 baris? **Props + `map()` = 1 baris untuk 50 kartu**. Bos (App) bagi amplop ke 50 staf (Kartu) sekaligus.

Tanpa props, kamu duplikasi. Dengan props, 1 komponen melayani semua.

---

## Program: Katalog Dinamis dengan Props

Induk `App` simpan data, anak `KartuProduk` hanya tampilkan.

```jsx
// ── src/App.jsx ──

// Anak: terima amplop props, hanya baca — tidak boleh ubah
function KartuProduk({ nama, harga, tersedia, tag }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16, background: tersedia ? "white" : "#FFF5F5" }}>
      <h3>{nama}</h3>
      <p style={{ color: "#2E5B44", fontWeight: "bold" }}>Rp {harga.toLocaleString("id-ID")}</p>
      <span style={{
        background: tersedia ? "#E6F4EA" : "#FEE2E2",
        color: tersedia ? "#137333" : "#C53030",
        padding: "4px 8px", borderRadius: 8, fontSize: 12
      }}>
        {tersedia ? "✅ Tersedia" : "❌ Habis"}
      </span>
      <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
        {tag.map((t) => (
          <span key={t} style={{ background: "#EFECE6", padding: "2px 6px", borderRadius: 6, fontSize: 11 }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function LencanaDiskon({ persen }) {
  if (!persen) return null; // tidak ada diskon → tidak tampil
  return <span style={{ background: "#C53030", color: "white", padding: "4px 8px", borderRadius: 8 }}>Diskon {persen}%</span>;
}

// Induk: pegang data, bagi via props
export default function App() {
  const daftar = [
    { id: 1, nama: "Beras 5kg", harga: 62000, tersedia: true, tag: ["Sembako", "Pokok"], diskon: 10 },
    { id: 2, nama: "Bayam", harga: 5000, tersedia: true, tag: ["Sayur", "Segar"] },
    { id: 3, nama: "Telur 1kg", harga: 28000, tersedia: false, tag: ["Protein"] },
  ];

  return (
    <div style={{ fontFamily: "sans-serif", padding: 24, background: "#FBF9F5", minHeight: "100vh" }}>
      <h1>Katalog Warung — Props Demo</h1>
      <p style={{ color: "gray" }}>App kirim props → KartuProduk tampilkan. Ubah array daftar, kartu otomatis ikut.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {daftar.map((p) => (
          <div key={p.id} style={{ position: "relative" }}>
            <KartuProduk nama={p.nama} harga={p.harga} tersedia={p.tersedia} tag={p.tag} />
            <div style={{ position: "absolute", top: 8, right: 8 }}>
              <LencanaDiskon persen={p.diskon} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Poin:**
- `App` → `KartuProduk` via `nama={p.nama}` (seperti isi amplop)
- `tag.map(t => <span key={t}>)` — tiap tag butuh `key` unik
- `p.id` sebagai `key` di daftar — jangan pakai index `i` jika data bisa tambah/hapus (nanti tertukar).

---

## Konsep Kunci

### Props = Amplop Read-Only
Induk tulis, anak baca. Anak **tidak boleh** `props.nama = "baru"` — error filosofi React. Jika butuh ubah, induk yang ubah lalu kirim ulang (minggu 3 dengan state).

### Destructuring = Buka Amplop Langsung
`function Kartu({ nama, harga })` sama dengan `function Kartu(props) { const nama = props.nama }` tapi lebih pendek. Pakai yang pendek.

### Data Flow Satu Arah: Induk → Anak
Seperti air terjun: dari `App` mengalir ke `KartuProduk` ke `LencanaDiskon`. Anak tidak kirim balik (kecuali via function props, minggu 3).

### `key` = KTP untuk List
Saat `map()`, React butuh `key` untuk tahu mana yang tambah/hapus/geser. Pakai `id` dari data. Jangan pakai index `i` jika urutan bisa berubah — nanti input tertukar.

---

## Penjelasan untuk Pemula

### Analogi: Amplop Tugas

- **Induk `App` = Bos warung**: tulis 50 amplop (nama, harga, stok) → bagi ke 50 staf.
- **Anak `KartuProduk` = Staf**: terima 1 amplop, pajang di etalase sesuai isi. Tidak boleh coret amplop.
- **`map()` = mesin fotokopi**: 1 template kartu difotokopi 50x dengan isi amplop berbeda.
- **`key` = nomor KTP staf**: tanpa KTP, bos bingung siapa yang resign.

### Cara Komputer Membaca

1. `daftar.map(p => <KartuProduk key={p.id} nama={p.nama} ... />)` → loop 3x
2. Tiap loop: buat object props `{ nama: "Beras", harga: 62000, tersedia: true, tag: [...] }` → panggil `KartuProduk(props)`
3. `KartuProduk` return JSX → React ubah jadi HTML → tampil 3 kartu.

### 3 Istilah Wajib

1. **Props**: data dari induk ke anak.
2. **Destructuring**: buka props langsung `{ nama, harga }`.
3. **key**: ID unik untuk tiap item `map()`.

### Kesalahan Umum

- Lupa `key` → warning `Each child in a list should have a unique "key" prop`. Tambah `key={p.id}`.
- Pakai index `key={i}` lalu hapus item tengah → input tertukar (karena KTP palsu).
- Coba ubah props di anak: `props.harga = 0` → tidak update induk, React protes. Ubah di induk saja.

---

## Eksperimen

- **Hijau:** Tambah 2 produk di `daftar` (kopi, gula). Otomatis muncul kartu baru tanpa tulis JSX baru.
- **Kuning:** Kirim props baru `satuan="kg"` ke `KartuProduk` dan tampilkan `Rp 62.000 / kg`.
- **Merah:** Sengaja pakai `key={index}` lalu di `App` tambah tombol hapus item tengah (butuh state minggu depan, tapi coba dulu) — lihat bug tertukar.

---

## Tantangan

**Pilih satu:**

**A. Katalog Lengkap:** Tambah `FilterOpsi` komponen yang terima `kategori` dan tampilkan hanya produk kategori itu (hardcode filter dulu, belum interaktif).

**B. Daftar Siswa:** `KartuSiswa` terima `{ nama, nilai, lulus }` → warna hijau jika lulus, merah jika tidak. Render 10 siswa via `map()`.

Kriteria: 1 induk simpan array, 1 anak terima props via destructuring, dan `map()` pakai `key={id}` (bukan index).

---

## Glosarium Mini

- **Props**: amplop data induk→anak
- **Destructuring**: cara buka amplop `{ nama }`
- **key**: KTP list agar React tidak bingung
- **map()**: loop untuk bikin banyak komponen dari array

---

## Ringkasan

Minggu 2 dari 12: **Props & Data Flow** (Level: Pemula). Kamu sudah bisa bagi tugas via amplop (props) dan fotokopi kartu (`map()`). Minggu depan: **State & useState** — kotak yang bisa berubah saat diklik (counter, form).
