# Capstone: Editor Dokumen Modular Notion-Style & Ruang Kerja Terdistribusi

> **Kategori:** React | **Level:** Optimasi Performa, Custom Hooks & Capstone Editor | **Minggu 10:** Capstone: Editor Dokumen Modular Notion-Style & Ruang Kerja Terdistribusi
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengintegrasikan seluruh kurikulum React 19 dalam produk editor blok modular produksi
- Menerapkan arsitektur state terpusat via useReducer untuk mutasi multi-tipe blok
- Mengoptimalkan render list blok menggunakan React.memo dan referensi useCallback stabil
- Membangun mekanisme autosave reaktif dengan debounced effect cleanup
- Menghasilkan kode frontend reaktif berstandar industri siap ekspansi ke kolaborasi WebSocket

---

## Program: Editor Blok Modular Interaktif dengan Markdown Preview & Autosave

```jsx
// ============================================================================
// CAPSTONE PROJECT: NOTION-STYLE MODULAR BLOCK DOCUMENT WORKSPACE
// ============================================================================
import { useState, useReducer, useEffect, useCallback, memo } from "react";

const BLOK_AWAL = [
  { id: "b-1", tipe: "H1", teks: "Tryngo Engineering Workspace 2026" },
  { id: "b-2", tipe: "PARAGRAF", teks: "Selamat datang di editor blok modular berbasis React 19 deklaratif." },
  { id: "b-3", tipe: "KODE", teks: "const stack = ['React 19', 'Vite 6', 'Tailwind 4'];" },
  { id: "b-4", tipe: "TODO", teks: "Selesaikan kurikulum fullstack dari nol", selesai: true },
  { id: "b-5", tipe: "TODO", teks: "Deploy aplikasi ke Cloudflare Pages", selesai: false }
];

function editorReducer(state, action) {
  switch (action.type) {
    case "UPDATE_TEKS":
      return state.map((b) => (b.id === action.id ? { ...b, teks: action.teks } : b));
    case "TOGGLE_TODO":
      return state.map((b) => (b.id === action.id ? { ...b, selesai: !b.selesai } : b));
    case "TAMBAH_BLOK":
      return [...state, { id: `b-${Date.now()}`, tipe: action.tipe, teks: "", selesai: false }];
    case "HAPUS_BLOK":
      return state.filter((b) => b.id !== action.id);
    case "GESER_ATAS": {
      const idx = state.findIndex((b) => b.id === action.id);
      if (idx <= 0) return state;
      const copy = [...state];
      const target = copy[idx];
      copy[idx] = copy[idx - 1];
      copy[idx - 1] = target;
      return copy;
    }
    default:
      return state;
  }
}

const EditorBlockItem = memo(function EditorBlockItem({ blok, onUpdate, onToggle, onHapus, onGeser }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "6px 0",
      borderBottom: "1px solid #f1f5f9"
    }}>
      <button onClick={() => onGeser(blok.id)} style={{ cursor: "pointer", border: "none", background: "none", color: "#94a3b8" }}>▲</button>
      
      {blok.tipe === "TODO" && (
        <input
          type="checkbox"
          checked={blok.selesai || false}
          onChange={() => onToggle(blok.id)}
          style={{ cursor: "pointer" }}
        />
      )}

      <input
        type="text"
        value={blok.teks}
        onChange={(e) => onUpdate(blok.id, e.target.value)}
        placeholder={blok.tipe === "H1" ? "Judul Utama..." : "Ketik isi catatan..."}
        style={{
          flex: 1,
          padding: "6px 8px",
          border: "1px solid transparent",
          borderRadius: "4px",
          fontSize: blok.tipe === "H1" ? "18px" : "14px",
          fontWeight: blok.tipe === "H1" ? "bold" : "normal",
          fontFamily: blok.tipe === "KODE" ? "monospace" : "inherit",
          background: blok.tipe === "KODE" ? "#f8fafc" : "transparent",
          textDecoration: blok.selesai ? "line-through" : "none",
          color: blok.selesai ? "#94a3b8" : "inherit"
        }}
        onFocus={(e) => (e.target.style.borderColor = "#cbd5e1")}
        onBlur={(e) => (e.target.style.borderColor = "transparent")}
      />

      <span style={{ fontSize: "10px", color: "#94a3b8", background: "#f1f5f9", padding: "2px 6px", borderRadius: "3px" }}>
        {blok.tipe}
      </span>

      <button onClick={() => onHapus(blok.id)} style={{ cursor: "pointer", border: "none", background: "none", color: "#ef4444" }}>✕</button>
    </div>
  );
});

export default function NotionCapstoneApp() {
  const [blokList, dispatch] = useReducer(editorReducer, BLOK_AWAL);
  const [statusSimpan, setStatusSimpan] = useState("Tersimpan");

  // Autosave simulation effect
  useEffect(() => {
    setStatusSimpan("Menyimpan perubahan...");
    const t = setTimeout(() => {
      setStatusSimpan("Semua perubahan tersimpan di cloud.");
    }, 800);
    return () => clearTimeout(t);
  }, [blokList]);

  const handleUpdate = useCallback((id, teks) => dispatch({ type: "UPDATE_TEKS", id, teks }), []);
  const handleToggle = useCallback((id) => dispatch({ type: "TOGGLE_TODO", id }), []);
  const handleHapus = useCallback((id) => dispatch({ type: "HAPUS_BLOK", id }), []);
  const handleGeser = useCallback((id) => dispatch({ type: "GESER_ATAS", id }), []);

  return (
    <div style={{ maxWidth: "680px", margin: "24px auto", fontFamily: "system-ui, sans-serif", padding: "0 16px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px" }}>
        <div>
          <h2 style={{ margin: 0 }}>Notion Workspace Workspace</h2>
          <small style={{ color: "#64748b" }}>Status: {statusSimpan}</small>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <button onClick={() => dispatch({ type: "TAMBAH_BLOK", tipe: "PARAGRAF" })} style={{ padding: "6px 10px", cursor: "pointer" }}>+ Paragraf</button>
          <button onClick={() => dispatch({ type: "TAMBAH_BLOK", tipe: "TODO" })} style={{ padding: "6px 10px", cursor: "pointer" }}>+ To-Do</button>
          <button onClick={() => dispatch({ type: "TAMBAH_BLOK", tipe: "KODE" })} style={{ padding: "6px 10px", cursor: "pointer" }}>+ Kode</button>
        </div>
      </header>

      <main style={{ marginTop: "16px" }}>
        {blokList.map((b) => (
          <EditorBlockItem
            key={b.id}
            blok={b}
            onUpdate={handleUpdate}
            onToggle={handleToggle}
            onHapus={handleHapus}
            onGeser={handleGeser}
          />
        ))}
      </main>
    </div>
  );
}
```

---

## Konsep Kunci

### Arsitektur Capstone Notion-Style Editor
Aplikasi capstone ini menyatukan seluruh pilar utama pengembangan web modern dengan React:
1. **Representasi Konten Berbasis Blok Modular**: Setiap paragraf, to-do list, dan blok kode direpresentasikan sebagai node data independen dalam array state.
2. **useReducer untuk Integritas State**: Operasi seperti pengetikan teks, centang checkbox, reordering urutan ke atas, dan penambahan blok baru dikelola secara terpusat melalui fungsi reducer murni.
3. **Optimasi Render Per-Baris**: Setiap `EditorBlockItem` dibungkus dengan `React.memo` dan menerima handler stabil dari `useCallback`. Ketika pengguna mengetik di blok nomor 2, blok nomor 1, 3, 4, dan 5 sama sekali tidak me-render ulang!
4. **Autosave Reaktif**: `useEffect` memantau array `blokList` dan mensimulasikan sinkronisasi asinkron ke server cloud lengkap dengan pembatalan timer saat pengguna terus mengetik.

### Langkah Berikutnya: Ekosistem Fullstack Next.js
Dengan menyelesaikan proyek ini, Anda telah menguasai salah satu paradigma frontend paling dicari di industri teknologi global. Langkah selanjutnya adalah membawa kemampuan React ini ke framework Fullstack Next.js (App Router, Server Components, dan Server Actions).

---

---

## Penjelasan untuk Pemula

### Analogi: Majalah Dinding Magnetik Sekolah
1. **Editor Blok** seperti majalah dinding magnetik: setiap artikel berita, foto, dan pengumuman lomba ditempel menggunakan magnet terpisah.
2. **Reordering** seperti menggeser posisi magnet foto ke atas artikel tanpa perlu merobek atau menulis ulang seluruh kertas karton mading dari nol.
3. **Autosave** seperti fotografer dokumentasi yang memotret papan mading setiap kali susunan magnet selesai dirapikan.

## Eksperimen

- Tambah blok tipe To-Do baru, centang kotak to-do, dan amati teks tercoret rapi secara reaktif.
- Ketik teks baru dan perhatikan status berubah menjadi "Menyimpan..." lalu "Tersimpan" otomatis.
- Klik tombol panah ▲ untuk menggeser blok ke atas dan perhatikan urutan array bertukar dengan mulus.
- Buka React DevTools Profiler, centang "Highlight updates when components render", lalu ketik teks untuk membuktikan blok lain tidak berkedip.

---

## Tantangan

Tambahkan fungsionalitas ekspor: buat tombol "Ekspor Markdown" yang mengonversi seluruh blok di layar menjadi format string Markdown murni (# untuk H1, - [ ] untuk todo, ``` untuk kode) dan menyalinnya ke clipboard.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

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

Selamat! Kamu telah menyelesaikan seluruh kurikulum React 19 dari konsep dasar komponen hingga capstone Notion-Style Block Editor yang lengkap dan berkinerja tinggi.
