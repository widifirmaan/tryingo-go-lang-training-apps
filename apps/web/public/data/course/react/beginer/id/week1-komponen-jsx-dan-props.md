# Arsitektur Komponen, Aturan JSX & Unidirectional Data Flow via Props

> **Kategori:** React | **Level:** Pondasi Komponen, JSX & State | **Minggu 1:** Arsitektur Komponen, Aturan JSX & Unidirectional Data Flow via Props
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami pergeseran paradigma dari imperatif DOM langsung ke deklaratif komponen React
- Menguasai aturan sintaksis JSX: penutupan tag, penamaan atribut (className, htmlFor), dan ekspresi kurung kurawal {}
- Menerapkan Unidirectional Data Flow (aliran data satu arah dari parent ke child via props)
- Menggunakan teknik render kondisional: ternary operator (?:) dan short-circuit evaluation (&&)
- Menulis komponen fungsional murni (Pure Functional Components) yang modular dan reusable

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **ESLint** (`dbaeumer.vscode-eslint`): Validasi sintaks & aturan React hooks
- **Prettier** (`esbenp.prettier-vscode`): Format kode otomatis

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension dbaeumer.vscode-eslint --install-extension esbenp.prettier-vscode
```

---

### 2. Instalasi Runtime & Dependency (Node.js LTS (v20+))
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install OpenJS.NodeJS.LTS
```

**macOS (Terminal / Homebrew):**
```bash
brew install node
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install nodejs npm
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
node -v && npm -v
```

Output yang diharapkan:
```output
v20.x.x
10.x.x
```

> 💡 **Tips Prasyarat:** Node.js dibutuhkan untuk menjalankan Vite build tool.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install
```
- **Keterangan:** Membuat starter template React TypeScript resmi dari tim Vite dengan HMR ultra cepat.
- **Pindah ke direktori project:**
```bash
cd my-react-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
npm run dev
```
Akses di browser atau terminal: `http://localhost:5173`

> ℹ️ Vite akan meluncurkan server lokal di port 5173 dalam milidetik.

**File Titik Masuk Utama (`src/App.tsx`):**
```tsx
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', padding: '4rem', fontFamily: 'sans-serif' }}>
      <h1>🚀 React + Vite App</h1>
      <p>Klik tombol di bawah untuk menguji state reaktif:</p>
      <button 
        onClick={() => setCount((c) => c + 1)}
        style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', cursor: 'pointer', borderRadius: '8px' }}
      >
        Hitungan: {count}
      </button>
    </div>
  );
}
```
Komponen counter interaktif untuk memverifikasi React state.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-react-app/
├── src/
│   ├── App.tsx          # Komponen root aplikasi
│   ├── main.tsx         # Entrypoint React DOM render
│   ├── App.css          # Styling komponen
│   └── index.css        # Styling dasar
├── index.html           # File HTML utama (root SPA)
├── vite.config.ts       # Konfigurasi plugin Vite
├── tsconfig.json        # Konfigurasi TypeScript
└── package.json         # Dependensi project
```
index.html terletak di root direktori karena Vite memprosesnya langsung sebagai entry point.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan Tailwind CSS untuk styling cepat: `npm install -D tailwindcss @tailwindcss/vite`.
- Untuk routing halaman, install React Router: `npm i react-router-dom`.

---

## Program: Hierarki Kartu Dokumen Workspace Interaktif

```jsx
// 1. Komponen Anak (Presentational / Pure Component)
function KartuDokumen({ judul, kategori, jumlahKata, isFavorit }) {
  return (
    <div style={{
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "12px",
      background: isFavorit ? "#f0fdf4" : "#ffffff"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, color: "#1e293b" }}>{judul}</h3>
        {isFavorit && <span style={{ color: "#16a34a", fontSize: "14px", fontWeight: "bold" }}>★ Favorit</span>}
      </div>
      <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: "13px" }}>
        Kategori: <strong>{kategori}</strong> • Estimasi: {Math.ceil(jumlahKata / 200)} menit baca
      </p>
    </div>
  );
}

// 2. Komponen Utama (Parent Tree)
function WorkspaceApp() {
  const namaRuangKerja = "Engineering Core Wiki";

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "480px", margin: "20px auto" }}>
      <header style={{ borderBottom: "2px solid #0f172a", paddingBottom: "8px", marginBottom: "16px" }}>
        <h2 style={{ margin: 0 }}>{namaRuangKerja}</h2>
        <small style={{ color: "#64748b" }}>Notion Workspace Clone • Versi 1.0</small>
      </header>

      <section>
        <KartuDokumen
          judul="Arsitektur Microfrontend 2026"
          kategori="Engineering"
          jumlahKata={1200}
          isFavorit={true}
        />
        <KartuDokumen
          judul="Panduan Onboarding Karyawan Baru"
          kategori="People Ops"
          jumlahKata={450}
          isFavorit={false}
        />
      </section>
    </div>
  );
}

// Export default komponen utama
export default WorkspaceApp;
```

---

## Konsep Kunci

### Mengapa Deklaratif Mengalahkan Imperatif?
Pada JavaScript tradisional (DOM imperatif), Anda harus menulis instruksi langkah demi langkah: `document.createElement`, `element.appendChild`, `element.classList.add`. Kode cepat menjadi semrawut dan rawan *state desynchronization*.
Pada React yang **deklaratif**, Anda hanya mendeskripsikan bagaimana antarmuka (UI) harus terlihat berdasarkan data yang ada: **UI = f(State)**. React menangani mutasi DOM di balik layar secara optimal menggunakan algoritma rekonsiliasi.

### Apa itu JSX Sebenarnya?
JSX bukanlah HTML yang ditulis di JavaScript, melainkan *syntactic sugar* untuk fungsi `React.createElement()`.
Kode `<h1 className="title">Halo</h1>` dikompilasi oleh compiler (Babel/Vite) menjadi `React.createElement('h1', { className: 'title' }, 'Halo')`.
Itulah mengapa kita wajib menggunakan `className` bukan `class`, dan membungkus ekspresi JavaScript di dalam `{ kurung kurawal }`.

### Unidirectional Data Flow (Aliran Satu Arah)
Props hanya mengalir dari atas ke bawah (Parent -> Child). Komponen anak **tidak boleh mengubah props yang diterimanya secara langsung** (*props are read-only*). Ini membuat alur data sistem Anda sangat mudah diprediksi dan di-debug.

---

---

## Penjelasan untuk Pemula

### Analogi: Resep Masakan & Cetak Biru Lego
1. **Komponen** seperti balok Lego: satu balok kecil pintu, satu balok jendela. Anda bisa menggabungkan ribuan balok kecil menjadi satu istana megah.
2. **Props** seperti instruksi pesanan makanan dari pelayan ke dapur: pelayan memberi tahu koki "Buat nasi goreng, pedas: Ya, telur: 2". Koki menerima instruksi tersebut (*read-only*) dan memasak hidangan sesuai pesanan.

## Eksperimen

- Ubah isFavorit pada kartu kedua menjadi true dan amati bintang favorit muncul otomatis.
- Coba ubah props langsung di dalam KartuDokumen (misal props.judul = "tes") dan amati erornya.
- Tambahkan properti baru "penulis" pada KartuDokumen dan tampilkan di bawah kategori.
- Gunakan ternary operator untuk menampilkan warna latar merah muda jika kategori adalah "Urgent".

---

## Tantangan

Buat komponen `WorkspaceBadge` yang menerima props `status` ("AKTIF" | "DRAFT" | "ARSIP") dan render dengan warna badge berbeda (Hijau, Kuning, Abu-abu) menggunakan komponen murni.

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
```output
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
```output
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
```output
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
```output
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

Kamu telah menguasai pola pikir deklaratif, arsitektur komponen, JSX, dan aliran props satu arah. Minggu depan kita mempelajari State reaktif dengan useState.
