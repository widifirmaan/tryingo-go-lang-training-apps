# Form Handling: Controlled Components, Validasi Real-Time & useRef

> **Kategori:** React | **Level:** Pondasi Komponen, JSX & State | **Minggu 4:** Form Handling: Controlled Components, Validasi Real-Time & useRef
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami filosofi Controlled Components di mana state React menjadi sumber kebenaran tunggal
- Menghubungkan atribut value dan handler onChange pada elemen input, select, dan textarea
- Menggunakan satu fungsi handler generik untuk menangani banyak input formulir sekaligus
- Menerapkan validasi form real-time dan penanganan pesan eror pengguna
- Memanfaatkan hook useRef untuk menyimpan referensi DOM langsung tanpa memicu re-render

---

## Program: Formulir Pembuatan Ruang Kerja dengan Validasi Domain

```jsx
import { useState, useRef } from "react";

function FormBuatWorkspace({ onWorkspaceDibuat }) {
  // Controlled State: React memegang single source of truth untuk input
  const [formData, setFormData] = useState({
    namaWorkspace: "",
    slugUrl: "",
    visibilitas: "PRIVAT",
    deskripsi: ""
  });

  const [errors, setErrors] = useState({});
  // useRef: Mengakses elemen DOM langsung (misal untuk auto-focus) tanpa re-render
  const inputNamaRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      const update = { ...prev, [name]: value };
      // Auto-generate slug jika nama berubah
      if (name === "namaWorkspace") {
        update.slugUrl = value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      }
      return update;
    });

    // Reset error field saat user mengetik
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validasiForm = () => {
    const errs = {};
    if (!formData.namaWorkspace.trim()) {
      errs.namaWorkspace = "Nama workspace wajib diisi!";
    } else if (formData.namaWorkspace.length < 3) {
      errs.namaWorkspace = "Nama workspace minimal 3 karakter.";
    }

    if (!formData.slugUrl.trim()) {
      errs.slugUrl = "Slug URL tidak boleh kosong.";
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Cegah reload halaman browser standar
    const hasilValidasi = validasiForm();

    if (Object.keys(hasilValidasi).length > 0) {
      setErrors(hasilValidasi);
      inputNamaRef.current?.focus(); // Kembalikan kursor ke input bermasalah
      return;
    }

    onWorkspaceDibuat(formData);
    // Reset form
    setFormData({ namaWorkspace: "", slugUrl: "", visibilitas: "PRIVAT", deskripsi: "" });
    inputNamaRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "420px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h3>Buat Ruang Kerja Baru</h3>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "4px" }}>Nama Workspace *</label>
        <input
          ref={inputNamaRef}
          type="text"
          name="namaWorkspace"
          value={formData.namaWorkspace}
          onChange={handleInputChange}
          placeholder="contoh: Tim Finansial Core"
          style={{ width: "100%", padding: "8px", boxSizing: "border-box", border: errors.namaWorkspace ? "1px solid red" : "1px solid #cbd5e1", borderRadius: "4px" }}
        />
        {errors.namaWorkspace && <small style={{ color: "#ef4444" }}>{errors.namaWorkspace}</small>}
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "4px" }}>Slug URL</label>
        <input
          type="text"
          name="slugUrl"
          value={formData.slugUrl}
          onChange={handleInputChange}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box", border: "1px solid #cbd5e1", borderRadius: "4px", background: "#f8fafc" }}
        />
      </div>

      <button type="submit" style={{ width: "100%", padding: "10px", background: "#0f172a", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
        Buat Workspace Sekarang
      </button>
    </form>
  );
}

export default FormBuatWorkspace;
```

---

## Konsep Kunci

### Controlled vs Uncontrolled Components
- **Uncontrolled Component**: Input formulir menyimpan nilainya sendiri di dalam DOM internal browser (seperti HTML tradisional). Anda harus menarik nilainya menggunakan `ref.current.value`.
- **Controlled Component**: React memegang kendali penuh. Nilai input selalu di-drive oleh state (`value={state}`) dan setiap ketukan keyboard memicu `onChange` yang memperbarui state.
Keunggulan Controlled Components: Anda dapat melakukan validasi instan, masking format (misal format nomor kartu kredit), dan menonaktifkan tombol submit secara real-time.

### Kapan Menggunakan `useRef`?
Hook `useRef` menghasilkan objek `{ current: initialValue }` yang bertahan sepanjang siklus hidup komponen.
Berbeda dengan `useState`, **mengubah `ref.current` TIDAK memicu re-render komponen**.
Gunakan `useRef` untuk:
1. Mengakses node DOM browser langsung (misal: memanggil `.focus()`, `.select()`, atau mengukur tinggi elemen).
2. Menyimpan ID timer (`setTimeout` / `setInterval`) yang tidak memengaruhi tampilan UI.

---

---

## Penjelasan untuk Pemula

### Analogi: Kemudi Mobil Elektrik & Buku Memo di Saku
1. **Controlled Input** seperti kemudi mobil modern berbasis *drive-by-wire*: saat Anda memutar setir, sinyal dikirim ke komputer mobil terlebih dahulu (*state*), lalu komputer menggerakkan roda (*DOM*). Komputer punya kuasa penuh membatasi belokan tajam berbahaya (*validasi*).
2. **useRef** seperti secarik kertas memo di saku sopir: sopir bisa menulis catatan nomor pintu gerbang tanpa perlu mematikan dan menyalakan ulang mesin mobil (*tanpa re-render*).

## Eksperimen

- Ketik nama workspace dan amati slugUrl terisi secara otomatis berkat handler terpusat.
- Kosongkan nama workspace dan klik submit untuk mengamati kursor otomatis kembali fokus ke input nama via ref.
- Tambahkan input radio untuk memilih visibilitas: PUBLIK atau PRIVAT.
- Coba ubah state formData langsung tanpa setter dan perhatikan input terkunci tidak bisa diketik.

---

## Tantangan

Tambahkan validasi asinkron tiruan: saat user selesai mengetik slug URL, periksa apakah slug sudah dipakai ("demo", "admin", "test"). Tampilkan pesan "Slug ini sudah dipakai!" jika cocok.

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
- **Perilaku & Efek Sistem:** Menyimpan data reaktif komponen. Memanggil setter memicu re-render UI secara otomatis dan terisolasi.
- **Contoh Penggunaan Praktis:**
```javascript
const [count, setCount] = useState(0);
// Memanggil: setCount(prev => prev + 1);
```
- **Hasil Output yang Diharapkan:**
```text
Komponen memperbarui angka count di layar
```

### 2. `useEffect(() => { ... }, [dependencies])`
- **Fungsi Utama:** Hook efek samping (Lifecycle, Data Fetching, Subscription).
- **Parameter / Atribut:** `Effect Callback, Dependency Array`.
- **Perilaku & Efek Sistem:** Menjalankan logika sampingan setelah komponen di-render dan membersihkannya saat unmount.
- **Contoh Penggunaan Praktis:**
```javascript
useEffect(() => {
  const timer = setInterval(() => console.log('Ping'), 1000);
  return () => clearInterval(timer);
}, []);
```
- **Hasil Output yang Diharapkan:**
```text
Timer berjalan 1x saat mount dan dibersihkan saat unmount
```

### 3. `function Component(props) { return <JSX /> }`
- **Fungsi Utama:** Deklarasi Komponen Fungsi Dasar.
- **Parameter / Atribut:** `props object`.
- **Perilaku & Efek Sistem:** Blok bangunan independen dan dapat digunakan kembali yang mengubah data props menjadi elemen visual.
- **Contoh Penggunaan Praktis:**
```javascript
function Badge({ label }: { label: string }) {
  return <span className="badge">{label}</span>;
}
```
- **Hasil Output yang Diharapkan:**
```text
Elemen visual badge ter-render dengan teks label
```

### 4. `useContext(MyContext)`
- **Fungsi Utama:** Konsumsi state global tanpa prop-drilling.
- **Parameter / Atribut:** `React Context Object`.
- **Perilaku & Efek Sistem:** Membaca nilai state dari Context Provider terdekat di pohon hierarki komponen.
- **Contoh Penggunaan Praktis:**
```javascript
const { theme, toggleTheme } = useContext(ThemeContext);
```
- **Hasil Output yang Diharapkan:**
```text
Mendapatkan akses instan ke nilai tema global
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

Kamu telah menguasai controlled forms, validasi input, dan useRef. Minggu depan kita memasuki Level 2: useEffect, siklus hidup reaktif, dan integrasi API.
