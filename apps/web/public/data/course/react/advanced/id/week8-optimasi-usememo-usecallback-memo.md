# Optimasi Performa: React.memo, useMemo, useCallback & Profiling

> **Kategori:** React | **Level:** Optimasi Performa, Custom Hooks & Capstone Editor | **Minggu 8:** Optimasi Performa: React.memo, useMemo, useCallback & Profiling
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami bagaimana dan kapan React melakukan re-render komponen secara mendalam
- Menggunakan React.memo() untuk mencegah re-render komponen presentasional murni
- Memanfaatkan useMemo() untuk meng-cache hasil perhitungan matematis atau pemfilteran data berat
- Menggunakan useCallback() untuk mempertahankan integritas referensi fungsi callback
- Menghindari optimasi prematur (Premature Optimization) dan mengetahui biaya komputasi memoization

---

## Program: Pencarian & Pemfilteran Blok Dokumen Berkecepatan Tinggi

```jsx
import { useState, useMemo, useCallback, memo } from "react";

// 1. React.memo: Mencegah re-render komponen anak jika props-nya tidak berubah
const BlokBarisTampilan = memo(function BlokBarisTampilan({ item, onPilih }) {
  console.log(`[Render Baris] Render item: ${item.id}`);

  return (
    <div
      onClick={() => onPilih(item.id)}
      style={{
        padding: "8px 12px",
        borderBottom: "1px solid #e2e8f0",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <span>{item.isi}</span>
      <span style={{ fontSize: "11px", color: "#64748b" }}>{item.kategori}</span>
    </div>
  );
});

export default function WorkspaceSearchOptimizer() {
  const [query, setQuery] = useState("");
  const [temaGelap, setTemaGelap] = useState(false);
  const [terpilih, setTerpilih] = useState(null);

  // Kumpulan 5000 data blok simulasi
  const semuaBlok = useMemo(() => {
    return Array.from({ length: 1000 }, (_, i) => ({
      id: `b-${i}`,
      isi: `Dokumen Catatan Teknis #${i} modul sistem`,
      kategori: i % 2 === 0 ? "Engineering" : "Operasional"
    }));
  }, []); // Hanya dibuat sekali saat mount

  // 2. useMemo: Menyimpan hasil komputasi berat (filter teks) agar tidak dihitung ulang saat state tema berubah
  const hasilFilter = useMemo(() => {
    console.log("[Komputasi Berat] Memfilter daftar blok...");
    return semuaBlok.filter((b) =>
      b.isi.toLowerCase().includes(query.toLowerCase())
    );
  }, [semuaBlok, query]);

  // 3. useCallback: Menjaga referensi fungsi tetap sama agar React.memo pada anak tidak jebol
  const handlePilihItem = useCallback((id) => {
    setTerpilih(id);
  }, []);

  return (
    <div style={{
      maxWidth: "500px",
      margin: "20px auto",
      fontFamily: "sans-serif",
      background: temaGelap ? "#1e293b" : "#ffffff",
      color: temaGelap ? "#ffffff" : "#000000",
      padding: "16px",
      borderRadius: "8px",
      border: "1px solid #cbd5e1"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
        <h3>Pencarian Blok ({hasilFilter.length} ditemukan)</h3>
        <button onClick={() => setTemaGelap(!temaGelap)}>
          Ganti Tema
        </button>
      </div>

      <input
        type="text"
        placeholder="Cari blok catatan..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "8px", boxSizing: "border-box", marginBottom: "12px" }}
      />

      <div style={{ maxHeight: "250px", overflowY: "auto", border: "1px solid #cbd5e1" }}>
        {hasilFilter.slice(0, 10).map((item) => (
          <BlokBarisTampilan
            key={item.id}
            item={item}
            onPilih={handlePilihItem}
          />
        ))}
      </div>
    </div>
  );
}
```

---

## Konsep Kunci

### Mengapa Komponen Me-render Ulang?
Secara bawaan di React: **ketika komponen induk me-render ulang, SELURUH komponen anaknya akan ikut me-render ulang**, meskipun props yang diterima anak tidak mengalami perubahan sama sekali!
Pada aplikasi kecil ini tidak terasa, namun pada aplikasi dengan ribuan baris data dokumen atau grafik kompleks, hal ini dapat menyebabkan lag antarmuka yang parah.

### Tiga Pilar Optimasi React
1. **`React.memo(Component)`**: Membungkus komponen anak. React akan melakukan perbandingan dangkal (*shallow compare*) terhadap props yang masuk. Jika props sama persis, render anak dilewati (*skipped*).
2. **`useCallback(fn, deps)`**: Mempertahankan referensi memori fungsi callback. Mengapa ini penting? Di JavaScript, `() => {} !== () => {}`. Setiap kali parent render, fungsi inline baru tercipta di memori, yang menyebabkan `React.memo` pada anak mengira props-nya berubah!
3. **`useMemo(() => compute(), deps)`**: Meng-cache hasil perhitungan data. Jika query pencarian tidak berubah, jangan lakukan filter pada 10.000 item berulang kali saat tombol ganti tema diklik.

### Peringatan: Jangan Memoize Semua Hal!
`useMemo` dan `useCallback` memiliki biaya memori dan overhead pemeriksaan dependensi. Gunakan hanya saat Anda memiliki data yang benar-benar besar atau komponen anak yang sering me-render ulang tanpa alasan.

---

---

## Penjelasan untuk Pemula

### Analogi: Meja Cetak Foto & Resep Kue Terkenal
1. **React.memo** seperti penjaga pintu bioskop: jika Anda sudah memegang tiket berstempel hari ini, penjaga mempersilakan Anda langsung duduk tanpa perlu wawancara ulang dari awal.
2. **useMemo** seperti koki yang mencatat berat takaran resep adonan 500 porsi di papan tulis: saat tamu baru datang, koki membaca angka di papan alih-alih menimbang ulang 500 butir telur dari awal.
3. **useCallback** seperti stempel tanda tangan basah pimpinan: bentuk tanda tangannya tetap sah dan sama sepanjang tahun, bukan tanda tangan baru yang terus berubah-ubah setiap hari.

## Eksperimen

- Buka konsol browser, klik tombol "Ganti Tema", dan perhatikan bahwa [Komputasi Berat] TIDAK dipanggil ulang berkat useMemo!
- Hapus useCallback dari handlePilihItem dan amati bahwa BlokBarisTampilan me-render ulang saat tema berganti.
- Ketik teks pencarian pada input dan perhatikan konsol memfilter secara reaktif hanya saat query berubah.
- Gunakan React DevTools Profiler untuk mengukur waktu render komponen sebelum dan sesudah optimasi.

---

## Tantangan

Bangun hook `useDebounce(value, delay)` yang menunda pemfilteran teks selama 300ms agar useMemo tidak berjalan pada setiap ketukan huruf yang terlalu cepat.

---

## Model Mental & Diagram Alur Visual

![Diagram Alur Data Satu Arah React (Props Down, Events Up)](/diagrams/react-data-flow.svg)

```diagram
     ┌────────────────────────┐
     │    PARENT COMPONENT    │ ◄─── Update State via Setter
     │  (Holds Single State)  │
     └───────────┬────────────┘
                 │ Props Turun (Data Flow 1 Arah ⬇)
     ┌───────────┴────────────┐
     ▼                        ▼
┌──────────────┐       ┌──────────────┐
│  Child Card  │       │ Action Btn   │ ─── Event Handler Naik (⬆)
│ (Reads Props)│       │ (Calls Prop) │
└──────────────┘       └──────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `const [state, setState] = useState(initialValue)`
- **Fungsi Utama:** Hook penyimpanan state lokal komponen.
- **Parameter / Atribut:** `initialValue`.
- **Perilaku & Efek Sistem:** Menyimpan data reaktif. Memanggil setter memicu re-render UI secara otomatis..
- **Contoh Penggunaan Praktis:**
```jsx
const [count, setCount] = useState(0);
// Eksekusi: setCount(prev => prev + 1);
```
- **Hasil Output yang Diharapkan:**
```text
Komponen memperbarui angka count di layar
```

### 2. `useEffect(() => { ... }, [dependencies])`
- **Fungsi Utama:** Hook efek samping (Lifecycle & Subscriptions).
- **Parameter / Atribut:** `Effect Callback, Dependency Array`.
- **Perilaku & Efek Sistem:** Menjalankan sinkronisasi data setelah render dan membersihkan resource saat unmount..
- **Contoh Penggunaan Praktis:**
```jsx
useEffect(() => {
  console.log('Komponen terpasang ke DOM');
  return () => console.log('Komponen dilepas');
}, []);
```
- **Hasil Output yang Diharapkan:**
```text
Log dicetak saat mount dan unmount
```

### 3. `function Component(props) { return <JSX /> }`
- **Fungsi Utama:** Deklarasi Komponen Fungsi Dasar.
- **Parameter / Atribut:** `props object`.
- **Perilaku & Efek Sistem:** Blok bangunan UI modular yang mengubah parameter data menjadi tampilan visual..
- **Contoh Penggunaan Praktis:**
```jsx
function UserCard({ name }: { name: string }) {
  return <div className="card"><h3>{name}</h3></div>;
}
```
- **Hasil Output yang Diharapkan:**
```text
Elemen kartu ter-render dengan nama pengguna
```

### 4. `useContext(MyContext)`
- **Fungsi Utama:** Akses state global tanpa prop-drilling.
- **Parameter / Atribut:** `React Context Object`.
- **Perilaku & Efek Sistem:** Membaca nilai state dari Context Provider terdekat dalam hierarki komponen..
- **Contoh Penggunaan Praktis:**
```jsx
const { theme, toggleTheme } = useContext(ThemeContext);
```
- **Hasil Output yang Diharapkan:**
```text
Mendapatkan nilai tema aktif secara instan
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Mutasi State Langsung (Direct Mutation)
- **Gejala / Masalah:** Komponen tidak melakukan re-render karena referensi memori tidak berubah.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan updater function dari setter state: `setCount(prev => prev + 1)` atau buat salinan baru.

### 2. Dependency Array useEffect yang Tidak Lengkap
- **Gejala / Masalah:** Terjadi stale closures (membaca nilai lama variabel) atau infinite re-render loop.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Cantumkan semua variabel luar yang dibaca di dalam useEffect ke dalam array dependency.

### 3. Lupa Memberi Unique 'key' pada List Rendering
- **Gejala / Masalah:** DOM reconciliation lambat dan status elemen input di dalam list bisa tertukar.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan ID unik database (`item.id`), jangan gunakan index array (`key={idx}`) jika list bisa diubah atau diurutkan.

---

## Ringkasan

Kamu telah menguasai teknik profiling performa, React.memo, useMemo, dan useCallback. Minggu depan kita mempelajari pembuatan Custom Hooks reusable.
