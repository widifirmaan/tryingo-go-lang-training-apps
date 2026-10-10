# Setup & Konsep Dasar

> **Kategori:** Next.js | **Level:** Pemula | **Minggu 1:** Setup & Konsep Dasar

## Tujuan Pembelajaran

- Memahami Next.js sebagai React framework (SSR, SSG, routing)
- Setup proyek dengan create-next-app
- Memahami App Router vs Pages Router
- Struktur folder: app/, layout.js, page.js
- Metadata API untuk SEO

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **ESLint** (`dbaeumer.vscode-eslint`): Linting kode TypeScript/JavaScript
- **Prettier** (`esbenp.prettier-vscode`): Formatter otomatis kode yang rapi
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`): Autocomplete & highlight class Tailwind

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension dbaeumer.vscode-eslint --install-extension esbenp.prettier-vscode --install-extension bradlc.vscode-tailwindcss
```

---

### 2. Instalasi Runtime & Dependency (Node.js LTS (v20+ / v22+))
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
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt-get install -y nodejs
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
node -v && npm -v
```

Output yang diharapkan:
```output
v22.x.x
10.x.x
```

> 💡 **Tips Prasyarat:** Gunakan Node.js LTS untuk kestabilan dependensi Turbopack dan build Next.js.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```
- **Keterangan:** Menjalankan wizard resmi Next.js dengan TypeScript, Tailwind CSS, App Router, dan alias import @/*.
- **Pindah ke direktori project:**
```bash
cd my-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
npm run dev
```
Akses di browser atau terminal: `http://localhost:3000`

> ℹ️ Buka http://localhost:3000 di browser. Hot Module Replacement (HMR) aktif otomatis.

**File Titik Masuk Utama (`src/app/page.tsx`):**
```tsx
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-zinc-950 text-white">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
          Halo dari Next.js!
        </h1>
        <p className="text-zinc-400 text-sm">
          Project Anda telah aktif dengan App Router, Tailwind CSS, dan TypeScript.
        </p>
        <button className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-sm shadow-lg transition-all">
          Mulai Coding
        </button>
      </div>
    </main>
  );
}
```
File komponen Server Component default untuk halaman utama.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-app/
├── src/
│   └── app/
│       ├── layout.tsx       # Root layout untuk semua halaman
│       ├── page.tsx         # Halaman utama (/)
│       └── globals.css      # Styling global Tailwind
├── public/                  # Aset statis (gambar, icon, fonts)
├── next.config.ts           # Konfigurasi Next.js
├── tailwind.config.ts       # Konfigurasi Tailwind CSS
├── tsconfig.json            # Konfigurasi TypeScript compiler
└── package.json             # Dependensi & skrip npm
```
Direktori src/app berisi struktur routing otomatis berdasarkan folder dan file page.tsx.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan Turbopack untuk dev server super cepat: jalankan `npm run dev -- --turbopack`.
- Untuk komponen yang membutuhkan interaksi pengguna (state, useEffect, onClick), tambahkan directive `"use client";` di baris pertama file.

---

## Program: App Pertama

```jsx
// Next.js = React framework dengan SSR, routing, dan optimasi built-in
// create-next-app = boilerplate untuk mulai proyek

// ── Struktur Folder Next.js (App Router) ──
// app/
//   layout.js      = Layout wrapper (html, body)
//   page.js        = Halaman utama (/)
//   loading.js     = Loading UI
//   error.js       = Error boundary
//   not-found.js   = 404 page
//   about/
//     page.js      = Halaman /about
//   blog/
//     [slug]/
//       page.js    = Dynamic route /blog/:slug

// ── app/layout.js (Root Layout) ──
export const metadata = {
  title: "Tryngo App",
  description: "Platform pembelajaran Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <header>Tryngo</header>
        <main>{children}</main>
        <footer>2026</footer>
      </body>
    </html>
  );
}

// ── app/page.js (Home Page) ──
export default function HomePage() {
  return (
    <div>
      <h1>Selamat Datang di Tryngo</h1>
      <p>Platform pembelajaran coding interaktif</p>
      <a href="/about">Tentang Kami</a>
    </div>
  );
}

// ── app/about/page.js ──
export default function AboutPage() {
  return (
    <div>
      <h1>Tentang Kami</h1>
      <p>Tryngo adalah platform pembelajaran coding dari nol.</p>
      <a href="/">Kembali</a>
    </div>
  );
}

console.log("App Next.js siap dijalankan dengan: npm run dev");
```

---

## Konsep Kunci

### Next.js
React framework dengan server-side rendering, routing built-in, dan optimasi otomatis.

### App Router
Struktur folder-based routing. app/ folder = root route.

### Layout & Page
Layout = wrapper (shared UI). Page = halaman spesifik.

### Metadata
Export metadata object untuk SEO title, description.

---

## Eksperimen

- Buat halaman baru dengan route berbeda
- Ubah metadata title dan description
- Tambah global CSS di layout
- Buat nested layout

---

## Tantangan

Buat website portfolio dengan: Home, About, Projects, Contact pages. Gunakan root layout dan masing-masing page.

---

## Ringkasan

Minggu 1 dari 12: **Setup & Konsep Dasar** (Level: Pemula). Fondasi Next.js. Minggu depan: **Routing & Navigation**.
