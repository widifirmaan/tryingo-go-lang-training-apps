# JSX & Komponen Dasar

> **Kategori:** React | **Level:** Pemula | **Minggu 1:** JSX & Komponen Dasar

## Tujuan Pembelajaran

- Memahami JSX sebagai extension syntax JavaScript (React Docs)
- Membuat function component sederhana yang me-return JSX
- Menggunakan curly braces {} untuk ekspresi JavaScript di JSX
- Membedakan JSX dengan HTML: className, htmlFor, camelCase
- Mengapa JSX bukan string HTML — compiled ke React.createElement

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

## Program: Halo React

```jsx
// JSX memungkinkan penulisan HTML-like syntax dalam JavaScript
// Setiap komponen React adalah function yang return JSX

function Welcome() {
  const name = "Tryngo";
  const isDark = true;

  return (
    <div className="card">
      <h1>Halo, {name}!</h1>
      <p>Mode: {isDark ? "Gelap" : "Terang"}</p>
      <ul>
        <li>JSX = JavaScript + XML</li>
        <li>Curly braces {} untuk ekspresi</li>
        <li>className (bukan class)</li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
    </div>
  );
}

// Render ke DOM
// ReactDOM.createRoot(document.getElementById('root')).render(<App />);
console.log("Komponen App berhasil didefinisikan");
```

---

## Konsep Kunci

### JSX
JSX = JavaScript XML. Syntactic sugar yang dikompilasi ke React.createElement(). Bisa menyisipkan ekspresi JS dengan {}.

### Komponen
Function yang return JSX. Harus dimulai huruf kapital (konvensi React). Komponen bisa dipakai berulang.

### Ekspresi JSX
- Ternary: {cond ? "yes" : "no"}
- Logical &&: {isLoggedIn && <Dashboard />}
- map(): {items.map(item => <li key={item.id}>{item.name}</li>)}

### Rules JSX
- Satu root element (atau Fragment <>)
- Semua tag harus ditutup
- className, htmlFor (reserved words)

---

## Eksperimen

- Buat komponen baru dengan data berbeda
- Ubah conditional rendering dari ternary ke logical &&
- Render list dengan map() dari array object
- Buat nested komponen 3 level

---

## Tantangan

Buat halaman profil pengguna dengan komponen: Avatar, UserInfo, SkillList. Gunakan conditional rendering untuk status online/offline.

---

## Ringkasan

Minggu 1 dari 12: **JSX & Komponen Dasar** (Level: Pemula). Fondasi React. Minggu depan: **Props & Data Flow**.
