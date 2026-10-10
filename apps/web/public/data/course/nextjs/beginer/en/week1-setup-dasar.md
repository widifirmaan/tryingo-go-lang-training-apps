# Setup & Core Concepts

> **Kategori:** Next.js | **Level:** Beginner | **Minggu 1:** Setup & Core Concepts

## Learning Objectives

- Understand Next.js as React framework (SSR, SSG, routing)
- Setup project with create-next-app
- Understand App Router vs Pages Router
- Folder structure: app/, layout.js, page.js
- Metadata API for SEO

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **ESLint** (`dbaeumer.vscode-eslint`): Code linting for TypeScript/JS
- **Prettier** (`esbenp.prettier-vscode`): Opinionated code formatter
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`): Autocomplete & class preview for Tailwind

Or install all recommended extensions at once via terminal:
```bash
code --install-extension dbaeumer.vscode-eslint --install-extension esbenp.prettier-vscode --install-extension bradlc.vscode-tailwindcss
```

---

### 2. Runtime & Dependency Installation (Node.js LTS (v20+ / v22+))
Make sure the required runtime or SDK is installed on your machine:

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

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
node -v && npm -v
```

Expected output:
```output
v22.x.x
10.x.x
```

> 💡 **Prerequisite Note:** Always use Node.js LTS for maximum Turbopack stability and build compatibility.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```
- **Details:** Runs the official Next.js scaffolder configured with TypeScript, Tailwind CSS, App Router, and alias pathing.
- **Navigate to the project directory:**
```bash
cd my-app
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
npm run dev
```
Open in browser or terminal: `http://localhost:3000`

> ℹ️ Open http://localhost:3000 in your browser. Fast Refresh and HMR are enabled out of the box.

**Initial Entry File (`src/app/page.tsx`):**
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
Default Server Component for your landing route.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

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
The src/app directory uses file-system based routing where each folder maps to a URL route.

---

### 6. Beginner Tips & Best Practices
- Enable Turbopack for ultra-fast dev server: run `npm run dev -- --turbopack`.
- For interactive components with hooks (useState, onClick), add the `"use client";` directive at the top.

---

## Program: First App

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

## Key Concepts

### Next.js
React framework with SSR, built-in routing, auto optimization.

### App Router
Folder-based routing. app/ = root.

### Layout & Page
Layout = wrapper, Page = specific page.

### Metadata
Export metadata for SEO.

---

## Experiments

- Create new page with different route
- Change metadata title and description
- Add global CSS in layout
- Create nested layout

---

## Challenge

Build a portfolio website with: Home, About, Projects, Contact pages. Use root layout and individual pages.

---

## Summary

Week 1 of 12: **Setup & Core Concepts** (Level: Beginner). Next.js foundations. Next week: **Routing & Navigation**.
